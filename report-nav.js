(function () {
  const sheets = Array.from(document.querySelectorAll(".sheet[data-page]"));
  const totalPages = sheets.length;
  const indicator = document.getElementById("page-indicator");
  const toolbarEl = document.querySelector(".toolbar");
  const pagesRootEl = document.querySelector(".pages-root");
  const embedded = window.parent !== window;
  let currentPage = 1;

  function updateIndicator() {
    if (indicator) indicator.textContent = `${currentPage} / ${totalPages}`;
    if (embedded) notifyParent();
  }

  function gotoPage(n) {
    const clamped = Math.min(Math.max(1, n), totalPages);
    const target = sheets[clamped - 1];
    if (target) target.scrollIntoView({ behavior: "auto", block: "start" });
  }

  function notifyParent() {
    window.parent.postMessage({ source: "mgmt-report", type: "pageChange", page: currentPage, total: totalPages }, "*");
  }

  if (embedded) {
    // Embedded in the sidebar app: the outer shell owns the toolbar/navigation.
    if (toolbarEl) toolbarEl.hidden = true;
    if (pagesRootEl) pagesRootEl.classList.add("embedded");
    window.addEventListener("message", (e) => {
      const msg = e.data;
      if (!msg || msg.source !== "mgmt-report-host") return;
      if (msg.type === "prev") gotoPage(currentPage - 1);
      else if (msg.type === "next") gotoPage(currentPage + 1);
      else if (msg.type === "goto" && typeof msg.page === "number") gotoPage(msg.page);
    });
  } else {
    const prevBtn = document.getElementById("prev-page");
    const nextBtn = document.getElementById("next-page");
    if (prevBtn) prevBtn.addEventListener("click", () => gotoPage(currentPage - 1));
    if (nextBtn) nextBtn.addEventListener("click", () => gotoPage(currentPage + 1));
  }

  const observer = new IntersectionObserver((entries) => {
    let best = null;
    for (const entry of entries) {
      if (entry.isIntersecting) {
        if (!best || entry.intersectionRatio > best.intersectionRatio) best = entry;
      }
    }
    if (best) {
      const num = Number(best.target.dataset.page);
      if (num !== currentPage) {
        currentPage = num;
        updateIndicator();
      }
    }
  }, { threshold: [0.1, 0.25, 0.5, 0.75] });

  sheets.forEach(s => observer.observe(s));
  updateIndicator();
  if (embedded) {
    window.parent.postMessage({ source: "mgmt-report", type: "ready", page: currentPage, total: totalPages }, "*");
  }
})();
