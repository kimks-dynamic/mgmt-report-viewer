import * as pdfjsLib from "./vendor/pdf.min.mjs";

pdfjsLib.GlobalWorkerOptions.workerSrc = "./vendor/pdf.worker.min.mjs";

// ---------- Server-side upload storage ----------
async function fetchUploads() {
  const res = await fetch("/api/uploads?_=" + Date.now());
  if (!res.ok) throw new Error("fetch failed: /api/uploads");
  return await res.json();
}

async function uploadReport(file, year, month, label) {
  const res = await fetch("/api/upload", {
    method: "POST",
    headers: {
      "Content-Type": "application/pdf",
      "X-Year": String(year),
      "X-Month": String(month),
      "X-Filename": encodeURIComponent(file.name),
      "X-Label": encodeURIComponent(label),
    },
    body: file,
  });
  if (!res.ok) throw new Error("upload failed: HTTP " + res.status);
  return await res.json();
}

async function deleteUpload(id) {
  const res = await fetch("/api/delete", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ id }),
  });
  if (!res.ok) throw new Error("delete failed: HTTP " + res.status);
  return await res.json();
}

// ---------- State ----------
const state = {
  reports: [],       // merged list: {id, label, year, month, builtin, file?, addedAt?}
  activeId: null,
  expandedYear: null,
  chatMessages: [],  // {role, content} turns for the currently active report
  chatBusy: false,
  mode: "none",       // "none" | "pdf" | "native"
  pdfDoc: null,
  zoom: 1.0,
  pageWraps: [],      // DOM elements per page, for nav/observer
  currentPage: 1,
  observer: null,
  nativeZoom: 1.0,
  nativeTotal: 0,
};

// ---------- DOM refs ----------
const appEl = document.querySelector(".app");
const reportListEl = document.getElementById("report-list");
const docTitleEl = document.getElementById("doc-title");
const pagesContainer = document.getElementById("pages-container");
const emptyStateEl = document.getElementById("empty-state");
const zoomLevelEl = document.getElementById("zoom-level");
const pageIndicatorEl = document.getElementById("page-indicator");
const viewerScrollEl = document.getElementById("viewer-scroll");
const uploadInput = document.getElementById("upload-input");
const deleteBtn = document.getElementById("delete-report");
const toastEl = document.getElementById("toast");
const sidebarToggleBtn = document.getElementById("sidebar-toggle");
const prevBtn = document.getElementById("prev-page");
const nextBtn = document.getElementById("next-page");
const chatFab = document.getElementById("chat-fab");
const chatPanel = document.getElementById("chat-panel");
const chatPanelTitle = document.getElementById("chat-panel-title");
const chatPanelClose = document.getElementById("chat-panel-close");
const chatMessagesEl = document.getElementById("chat-messages");
const chatInput = document.getElementById("chat-input");
const chatSendBtn = document.getElementById("chat-send");

// location.hostname을 그대로 써서, 이 노트북에서 직접 열든(localhost) 다른 PC에서
// 네트워크로 열든(예: 220.89.247.77) 항상 이 서버(=Ollama가 실제로 도는 이 PC)를 가리키게 함
const OLLAMA_URL = `http://${location.hostname}:11434/api/chat`;
const OLLAMA_MODEL = "qwen2.5:7b";

document.getElementById("zoom-in").addEventListener("click", () => {
  if (state.mode === "native") setNativeZoom(state.nativeZoom + 0.1);
  else setZoom(state.zoom + 0.1);
});
document.getElementById("zoom-out").addEventListener("click", () => {
  if (state.mode === "native") setNativeZoom(state.nativeZoom - 0.1);
  else setZoom(state.zoom - 0.1);
});
prevBtn.addEventListener("click", () => {
  if (state.mode === "native") nativeGoto("prev");
  else gotoPage(state.currentPage - 1);
});
nextBtn.addEventListener("click", () => {
  if (state.mode === "native") nativeGoto("next");
  else gotoPage(state.currentPage + 1);
});
deleteBtn.addEventListener("click", onDeleteActive);
uploadInput.addEventListener("change", onUploadFile);
sidebarToggleBtn.addEventListener("click", () => {
  appEl.classList.toggle("sidebar-collapsed");
});

window.addEventListener("message", (e) => {
  const msg = e.data;
  if (!msg || msg.source !== "mgmt-report") return;
  if (msg.type === "ready" || msg.type === "pageChange") {
    state.nativeTotal = msg.total;
    pageIndicatorEl.textContent = `${msg.page} / ${msg.total}`;
    prevBtn.disabled = msg.page <= 1;
    nextBtn.disabled = msg.page >= msg.total;
  }
});

function showToast(msg, isError) {
  toastEl.textContent = msg;
  toastEl.className = "toast" + (isError ? " error" : "");
  toastEl.hidden = false;
  clearTimeout(showToast._t);
  showToast._t = setTimeout(() => { toastEl.hidden = true; }, 3200);
}

function sortKey(r) {
  const ym = (r.year || 0) * 100 + (r.month || 0);
  return ym * 1e13 + (r.addedAt || 0);
}

async function loadReports() {
  let manifest = [];
  try {
    const res = await fetch("manifest.json?_=" + Date.now());
    manifest = await res.json();
  } catch (e) {
    console.warn("manifest.json 로드 실패", e);
  }

  let uploads = [];
  try {
    uploads = await fetchUploads();
  } catch (e) {
    console.warn("업로드 목록 로드 실패", e);
  }

  const merged = [
    ...manifest.map(m => ({ ...m, builtin: true })),
    ...uploads.map(u => ({
      id: u.id,
      label: u.label,
      year: u.year,
      month: u.month,
      file: u.file,
      builtin: false,
      addedAt: u.addedAt,
    })),
  ];

  merged.sort((a, b) => sortKey(b) - sortKey(a));
  state.reports = merged;

  if (state.expandedYear === null && state.reports.length > 0) {
    state.expandedYear = state.reports[0].year;
  }

  renderReportList();
}

function renderReportList() {
  reportListEl.innerHTML = "";
  if (state.reports.length === 0) {
    const li = document.createElement("li");
    li.className = "empty-list-msg";
    li.textContent = "표시할 자료가 없습니다.";
    reportListEl.appendChild(li);
    return;
  }

  const years = [];
  for (const r of state.reports) {
    if (!years.includes(r.year)) years.push(r.year);
  }

  for (const year of years) {
    const yearReports = state.reports.filter(r => r.year === year);
    const expanded = year === state.expandedYear;

    const groupLi = document.createElement("li");
    groupLi.className = "year-group";

    const headerBtn = document.createElement("button");
    headerBtn.type = "button";
    headerBtn.className = "year-header" + (expanded ? " expanded" : "");
    headerBtn.innerHTML = `<span class="year-label">${year}년</span><span class="year-chevron">${expanded ? "▾" : "▸"}</span>`;
    headerBtn.addEventListener("click", () => {
      state.expandedYear = expanded ? null : year;
      renderReportList();
    });
    groupLi.appendChild(headerBtn);

    const monthsUl = document.createElement("ul");
    monthsUl.className = "year-months";
    monthsUl.hidden = !expanded;

    for (const r of yearReports) {
      monthsUl.appendChild(buildReportItem(r));
    }

    groupLi.appendChild(monthsUl);
    reportListEl.appendChild(groupLi);
  }
}

function buildReportItem(r) {
  const li = document.createElement("li");
  li.className = "report-item" + (r.id === state.activeId ? " active" : "");
  li.dataset.id = r.id;

  const labelCol = document.createElement("div");
  labelCol.className = "label-col";
  const nameEl = document.createElement("div");
  nameEl.className = "name";
  nameEl.textContent = `${r.month}월 경영회의`;
  const metaEl = document.createElement("div");
  metaEl.className = "meta";
  metaEl.textContent = r.builtin ? "보관 자료" : "업로드";
  labelCol.appendChild(nameEl);
  labelCol.appendChild(metaEl);

  li.appendChild(labelCol);

  if (!r.builtin) {
    const badge = document.createElement("span");
    badge.className = "badge";
    badge.textContent = "NEW";
    li.appendChild(badge);
  }

  li.addEventListener("click", () => selectReport(r.id));
  return li;
}

async function selectReport(id) {
  if (state.activeId === id) return;
  const report = state.reports.find(r => r.id === id);
  if (!report) return;

  if (state.observer) {
    state.observer.disconnect();
    state.observer = null;
  }
  state.pdfDoc = null;

  state.activeId = id;
  state.expandedYear = report.year;
  renderReportList();
  docTitleEl.textContent = report.label;
  resetChat(report);
  deleteBtn.hidden = report.builtin;

  emptyStateEl.hidden = true;

  if (report.kind === "native") {
    renderNative(report);
    return;
  }

  state.mode = "pdf";
  viewerScrollEl.classList.remove("native-mode");
  pagesContainer.innerHTML = "";
  pagesContainer.insertAdjacentHTML("beforeend", '<div class="loading-msg">자료를 불러오는 중입니다…</div>');

  try {
    const arrayBuffer = await getReportBytes(report);
    pagesContainer.innerHTML = "";
    await renderPdf(arrayBuffer);
  } catch (e) {
    console.error(e);
    pagesContainer.innerHTML = '<div class="loading-msg">파일을 불러오지 못했습니다.</div>';
    showToast("PDF를 여는 중 오류가 발생했습니다.", true);
  }
}

function renderNative(report) {
  state.mode = "native";
  state.nativeZoom = 1.0;
  state.nativeTotal = 0;
  zoomLevelEl.textContent = "100%";
  pageIndicatorEl.textContent = "- / -";
  prevBtn.disabled = false;
  nextBtn.disabled = false;
  viewerScrollEl.classList.add("native-mode");
  pagesContainer.innerHTML = "";
  const iframe = document.createElement("iframe");
  iframe.className = "native-frame";
  iframe.src = report.file + (report.file.includes("?") ? "&" : "?") + "_=" + Date.now();
  iframe.title = report.label;
  pagesContainer.appendChild(iframe);
}

function nativeGoto(dir) {
  const iframe = document.querySelector(".native-frame");
  if (!iframe || !iframe.contentWindow) return;
  iframe.contentWindow.postMessage({ source: "mgmt-report-host", type: dir }, "*");
}

function setNativeZoom(z) {
  const iframe = document.querySelector(".native-frame");
  if (!iframe) return;
  const clamped = Math.min(Math.max(z, 0.4), 2.5);
  if (Math.abs(clamped - state.nativeZoom) < 0.001) return;
  state.nativeZoom = clamped;
  iframe.style.transform = `scale(${clamped})`;
  zoomLevelEl.textContent = Math.round(clamped * 100) + "%";
}

async function getReportBytes(report) {
  const res = await fetch(report.file + "?_=" + Date.now());
  if (!res.ok) throw new Error("fetch failed: " + report.file);
  return await res.arrayBuffer();
}

async function renderPdf(arrayBuffer) {
  if (state.observer) {
    state.observer.disconnect();
    state.observer = null;
  }

  const loadingTask = pdfjsLib.getDocument({ data: arrayBuffer });
  const pdf = await loadingTask.promise;
  state.pdfDoc = pdf;
  state.pageWraps = [];
  state.currentPage = 1;

  const containerWidth = viewerScrollEl.clientWidth - 48;
  const firstPage = await pdf.getPage(1);
  const naturalWidth = firstPage.getViewport({ scale: 1 }).width;
  const baseScale = Math.max(0.3, containerWidth / naturalWidth);
  state.baseScale = baseScale;

  await renderAllPages();
  updatePageIndicator();
  setupPageObserver();
}

async function renderAllPages() {
  const pdf = state.pdfDoc;
  pagesContainer.innerHTML = "";
  state.pageWraps = [];

  const scale = state.baseScale * state.zoom;

  for (let i = 1; i <= pdf.numPages; i++) {
    const page = await pdf.getPage(i);
    const viewport = page.getViewport({ scale });

    const wrap = document.createElement("div");
    wrap.className = "pdf-page-wrap";
    wrap.dataset.pageNum = String(i);
    wrap.style.width = viewport.width + "px";
    wrap.style.height = viewport.height + "px";

    const canvas = document.createElement("canvas");
    canvas.width = viewport.width;
    canvas.height = viewport.height;
    wrap.appendChild(canvas);

    const tag = document.createElement("div");
    tag.className = "page-number-tag";
    tag.textContent = `${i} / ${pdf.numPages}`;
    wrap.appendChild(tag);

    pagesContainer.appendChild(wrap);
    state.pageWraps.push(wrap);

    const ctx = canvas.getContext("2d");
    await page.render({ canvasContext: ctx, viewport }).promise;
  }

  zoomLevelEl.textContent = Math.round(state.zoom * 100) + "%";
}

function setupPageObserver() {
  state.observer = new IntersectionObserver((entries) => {
    let best = null;
    for (const entry of entries) {
      if (entry.isIntersecting) {
        if (!best || entry.intersectionRatio > best.intersectionRatio) best = entry;
      }
    }
    if (best) {
      const num = Number(best.target.dataset.pageNum);
      state.currentPage = num;
      updatePageIndicator();
    }
  }, { root: viewerScrollEl, threshold: [0.1, 0.25, 0.5, 0.75, 1] });

  state.pageWraps.forEach(w => state.observer.observe(w));
}

function updatePageIndicator() {
  const total = state.pdfDoc ? state.pdfDoc.numPages : 0;
  pageIndicatorEl.textContent = total ? `${state.currentPage} / ${total}` : "- / -";
  document.getElementById("prev-page").disabled = state.currentPage <= 1;
  document.getElementById("next-page").disabled = state.currentPage >= total;
}

function gotoPage(n) {
  if (!state.pdfDoc) return;
  const total = state.pdfDoc.numPages;
  const clamped = Math.min(Math.max(1, n), total);
  const wrap = state.pageWraps[clamped - 1];
  if (wrap) wrap.scrollIntoView({ behavior: "auto", block: "start" });
}

async function setZoom(z) {
  if (!state.pdfDoc) return;
  const clamped = Math.min(Math.max(z, 0.4), 2.5);
  if (Math.abs(clamped - state.zoom) < 0.001) return;
  state.zoom = clamped;
  const anchorPage = state.currentPage;
  await renderAllPages();
  setupPageObserver();
  const wrap = state.pageWraps[anchorPage - 1];
  if (wrap) wrap.scrollIntoView({ block: "start" });
  updatePageIndicator();
}

// ---------- Upload ----------
function parseYearMonth(filename) {
  let m = filename.match(/(\d{4})[^\d]{0,2}(\d{1,2})월/);
  if (m) return { year: Number(m[1]), month: Number(m[2]) };
  m = filename.match(/(\d{4})[-_.](\d{1,2})/);
  if (m) return { year: Number(m[1]), month: Number(m[2]) };
  return null;
}

async function onUploadFile(e) {
  const file = e.target.files && e.target.files[0];
  uploadInput.value = "";
  if (!file) return;

  if (file.type !== "application/pdf" && !file.name.toLowerCase().endsWith(".pdf")) {
    showToast("PDF 파일만 업로드할 수 있습니다.", true);
    return;
  }

  const ym = parseYearMonth(file.name);
  const year = ym ? ym.year : new Date().getFullYear();
  const month = ym ? ym.month : new Date().getMonth() + 1;
  const label = ym
    ? `${ym.year}년 ${ym.month}월 경영회의 (업로드)`
    : file.name.replace(/\.pdf$/i, "") + " (업로드)";

  const hasNativeBuiltin = state.reports.some(
    r => r.builtin && r.kind === "native" && r.year === year && r.month === month
  );

  if (!hasNativeBuiltin) {
    // 이미 HTML로 변환된 정식 자료가 있는 달이 아닐 때만 같은 연/월의 기존 업로드를 덮어쓸지 검토
    const dup = state.reports.find(r => !r.builtin && r.year === year && r.month === month);
    if (dup) {
      const ok = confirm(`이미 업로드된 ${year}년 ${month}월 자료가 있습니다.\n덮어쓰시겠습니까?`);
      if (!ok) {
        showToast("업로드가 취소되었습니다.");
        return;
      }
    }
  }

  try {
    const entry = await uploadReport(file, year, month, label);
    showToast("업로드가 완료되었습니다: " + label);
    state.activeId = null;
    await loadReports();
    await selectReport(entry.id);
  } catch (err) {
    console.error(err);
    showToast("업로드 저장 중 오류가 발생했습니다.", true);
  }
}

async function onDeleteActive() {
  const report = state.reports.find(r => r.id === state.activeId);
  if (!report || report.builtin) return;
  const ok = confirm(`"${report.label}" 자료를 삭제할까요?\n서버에 저장된 업로드 파일이 삭제되며, 같은 네트워크의 다른 사람에게도 더 이상 보이지 않게 됩니다.`);
  if (!ok) return;

  await deleteUpload(report.id);
  showToast("삭제되었습니다.");
  state.activeId = null;
  state.pdfDoc = null;
  state.mode = "none";
  viewerScrollEl.classList.remove("native-mode");
  pagesContainer.innerHTML = "";
  emptyStateEl.hidden = false;
  docTitleEl.textContent = "자료를 선택하세요";
  deleteBtn.hidden = true;
  pageIndicatorEl.textContent = "- / -";
  await loadReports();
}

// ---------- Q&A chat (local Ollama) ----------
chatFab.addEventListener("click", () => {
  chatPanel.hidden = !chatPanel.hidden;
  if (!chatPanel.hidden) chatInput.focus();
});
chatPanelClose.addEventListener("click", () => { chatPanel.hidden = true; });
chatSendBtn.addEventListener("click", sendChatMessage);
chatInput.addEventListener("keydown", (e) => {
  if (e.key === "Enter" && !e.shiftKey) {
    e.preventDefault();
    sendChatMessage();
  }
});

function resetChat(report) {
  state.chatMessages = [];
  chatMessagesEl.innerHTML = "";
  chatPanelTitle.textContent = report ? `${report.label} 질문하기` : "이 달 자료에 대해 질문하기";
  addChatBubble("system", "PDF 원본 자료(업로드/보관 PDF)는 아직 질문할 수 없고, HTML로 변환된 자료만 질문할 수 있습니다.");
}

function addChatBubble(role, text) {
  const div = document.createElement("div");
  div.className = "chat-msg " + role;
  div.textContent = text;
  chatMessagesEl.appendChild(div);
  chatMessagesEl.scrollTop = chatMessagesEl.scrollHeight;
  return div;
}

function getActiveReportData() {
  const report = state.reports.find(r => r.id === state.activeId);
  if (!report || report.kind !== "native") return null;
  const iframe = document.querySelector(".native-frame");
  if (!iframe || !iframe.contentWindow || !iframe.contentWindow.REPORT) return null;
  return { report, data: iframe.contentWindow.REPORT };
}

// 질문 내용에 따라 관련 페이지 데이터만 추려서 모델에 넘김 (전체 14페이지를 통째로 주면
// 토큰이 너무 많아져 CPU 추론이 느려지고, 모델이 관련 없는 숫자와 혼동하는 문제가 있었음)
const PAGE_ROUTING_RULES = [
  { keys: ["매출", "부가가치", "인원", "인건비", "헤드카운트"], pages: ["page4", "page5", "page6"] },
  { keys: ["환율", "관세", "fx"], pages: ["page7"] },
  { keys: ["손익", "영업이익", "매출원가", "판관비", "매출총이익"], pages: ["page8"] },
  { keys: ["프로젝트", "마일스톤", "진행현황", "project"], pages: ["page9"] },
  { keys: ["투자"], pages: ["page10", "page11"] },
  { keys: ["품질", "고객실적", "불량율", "ppm"], pages: ["page12"] },
  { keys: ["q-cost", "큐코스트", "이벤트", "공지"], pages: ["page13"] },
];

function selectRelevantPages(question, data) {
  const picks = new Set();
  const q = question.toLowerCase();
  PAGE_ROUTING_RULES.forEach((rule) => {
    if (rule.keys.some((k) => q.includes(k.toLowerCase()))) {
      rule.pages.forEach((p) => picks.add(p));
    }
  });
  if (picks.size === 0) {
    picks.add("page4"); // 기본값: 매출/부가가치 현황
    picks.add("page8"); // 기본값: 손익 현황
  }
  const subset = {};
  picks.forEach((p) => {
    if (data[p]) subset[p] = data[p];
  });
  return subset;
}

async function sendChatMessage() {
  if (state.chatBusy) return;
  const question = chatInput.value.trim();
  if (!question) return;

  const ctx = getActiveReportData();
  if (!ctx) {
    addChatBubble("user", question);
    chatInput.value = "";
    addChatBubble("system", "이 자료는 구조화된 데이터가 없어 질문에 답할 수 없습니다. HTML로 변환된 달의 자료를 선택한 뒤 다시 물어봐 주세요.");
    return;
  }

  addChatBubble("user", question);
  chatInput.value = "";
  state.chatBusy = true;
  chatSendBtn.disabled = true;
  const thinkingEl = addChatBubble("system", "답변 생성 중…");

  const relevantData = selectRelevantPages(question, ctx.data);
  const systemPrompt =
    "당신은 회사 내부 경영회의 보고서를 분석해주는 도우미입니다. " +
    `아래는 "${ctx.report.label}" 자료 중 질문과 관련성이 높은 일부 페이지 데이터(JSON)입니다. ` +
    "반드시 이 데이터에 근거해서만 한국어로 간결하게 답변하고, 데이터에 없는 내용은 모른다고 답하세요.\n\n" +
    JSON.stringify(relevantData);

  const messages = [
    { role: "system", content: systemPrompt },
    ...state.chatMessages,
    { role: "user", content: question },
  ];

  try {
    const res = await fetch(OLLAMA_URL, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        model: OLLAMA_MODEL,
        messages,
        stream: false,
        options: { num_ctx: 4096 },
      }),
    });
    if (!res.ok) throw new Error("HTTP " + res.status);
    const json = await res.json();
    const answer = json.message && json.message.content ? json.message.content : "(빈 응답)";
    thinkingEl.remove();
    addChatBubble("assistant", answer);
    state.chatMessages.push({ role: "user", content: question });
    state.chatMessages.push({ role: "assistant", content: answer });
  } catch (err) {
    console.error(err);
    thinkingEl.remove();
    addChatBubble("system", "Ollama 서버에 연결할 수 없습니다. 로컬에서 Ollama가 실행 중인지 확인해 주세요.");
  } finally {
    state.chatBusy = false;
    chatSendBtn.disabled = false;
  }
}

// ---------- Init ----------
(async function init() {
  await loadReports();
  if (state.reports.length > 0) {
    await selectReport(state.reports[0].id);
  }
})();
