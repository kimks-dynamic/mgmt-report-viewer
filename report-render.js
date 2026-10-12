// ============ Shared helpers ============
function fmtNum(v, unit) {
  if (v === null || v === undefined) return null;
  const s = Number.isInteger(v) ? v.toLocaleString("ko-KR") : v.toLocaleString("ko-KR", { maximumFractionDigits: 2 });
  return unit ? s + unit : s;
}
function td(v, opts) {
  opts = opts || {};
  if (v === null || v === undefined) return `<td class="num blank">-</td>`;
  const text = fmtNum(v, opts.unit || "");
  const cls = ["num"];
  if (opts.forecast) cls.push("forecast");
  if (opts.neg && v < 0) cls.push("neg");
  return `<td class="${cls.join(" ")}">${text}</td>`;
}
function esc(s) { return (s === null || s === undefined) ? "" : String(s); }

// ============ Page 4 ============
function renderPage4() {
  const D = REPORT.page4;
  const FORECAST_IDX = D.forecastIndex;

  function cellHtml(v, colIdx, unit, noForecast) {
    const isForecast = !noForecast && colIdx === FORECAST_IDX;
    if (v === null || v === undefined) return `<td class="num blank">-</td>`;
    const text = fmtNum(v, unit);
    return isForecast ? `<td class="num forecast">${text}</td>` : `<td class="num">${text}</td>`;
  }
  function dataRowHtml(row, unit, opts) {
    const noForecast = opts && opts.noForecast;
    let html = "";
    html += cellHtml(row.yr, -1, unit, noForecast);
    html += cellHtml(row.avg, -1, unit, noForecast);
    row.m.forEach((v, i) => { html += cellHtml(v, i, unit, noForecast); });
    html += cellHtml(row.cum, -1, unit, noForecast);
    html += cellHtml(row.total, -1, unit, noForecast);
    return html;
  }
  function isEmptyRowData(data) {
    if (!data) return true;
    if (data.yr !== null && data.yr !== undefined) return false;
    if (data.avg !== null && data.avg !== undefined) return false;
    if (data.cum !== null && data.cum !== undefined) return false;
    if (data.total !== null && data.total !== undefined) return false;
    return !(data.m || []).some(v => v !== null && v !== undefined);
  }
  function buildGroup(groupLabel, group, sectionStart) {
    const rows = [
      { key: "사업계획", data: group.plan, pct: false, noForecast: true },
      { key: "수정계획", data: group.revised, pct: false, noForecast: true },
      { key: "실적", data: group.actual, pct: false, noForecast: false },
      { key: "%", data: group.pct, pct: true, noForecast: false },
    ].filter(r => r.key !== "수정계획" || !isEmptyRowData(r.data));
    let html = "";
    rows.forEach((r, idx) => {
      const trClass = (idx === 0 && sectionStart ? "section-start " : "") + (r.pct ? "pct-row" : "");
      html += `<tr class="${trClass.trim()}">`;
      if (idx === 0) html += `<th class="row-group-label" rowspan="${rows.length}">${groupLabel}</th>`;
      html += `<th class="row-sub-label">${r.key}</th>`;
      html += dataRowHtml(r.data, r.pct ? "%" : "", { noForecast: r.noForecast });
      html += `</tr>`;
    });
    return html;
  }
  function buildLaborIndicatorGroup(group) {
    const rows = [
      { key: "인당인건비", data: group.perCapita },
      { key: "인건비율", data: group.laborRate },
      { key: "노동분배율", data: group.distribRate },
      { key: "인당초과근로(시간)", data: group.overtime },
      { key: "'25년 초과근로평균", data: group.overtimePrevYear, noForecast: true },
    ];
    let html = "";
    rows.forEach((r, idx) => {
      html += `<tr class="${idx === 0 ? 'section-start' : ''}">`;
      if (idx === 0) html += `<th class="row-group-label" rowspan="5">${group.label}</th>`;
      html += `<th class="row-sub-label">${r.key}</th>`;
      html += dataRowHtml(r.data, r.data.unit || "", { noForecast: r.noForecast });
      html += `</tr>`;
    });
    return html;
  }

  const body = document.getElementById("p4-table-body");
  body.innerHTML =
    buildGroup(D.revenue.label, D.revenue, true) +
    buildGroup(D.valueAdded.label, D.valueAdded, true) +
    buildGroup(D.headcount.label, D.headcount, true) +
    buildGroup(D.laborCost.label, D.laborCost, true) +
    buildLaborIndicatorGroup(D.laborIndicators);

  // legend
  const hasRevenueRevised = !isEmptyRowData(D.revenue.revised);
  const hasValueAddedRevised = !isEmptyRowData(D.valueAdded.revised);
  const items = [
    { label: "사업계획매출", color: "#e08a86", dashed: false, marker: null },
    { label: "사업계획부가가치", color: "#d46b66", dashed: false, marker: null },
    { label: "매출실적", color: "#2f6fed", dashed: true, marker: "◆" },
    { label: "부가가치실적", color: "#1a3fa0", dashed: false, marker: "▲" },
    ...(hasRevenueRevised ? [{ label: "수정계획매출", color: "#7cb342", dashed: false, marker: null }] : []),
    ...(hasValueAddedRevised ? [{ label: "수정계획부가가치", color: "#558b2f", dashed: false, marker: null }] : []),
  ];
  document.getElementById("p4-legend").innerHTML = items.map(it => `
    <div class="legend-item">
      <span class="legend-swatch${it.dashed ? " dashed" : ""}" style="border-color:${it.color}">
        ${it.marker ? `<span class="marker" style="color:${it.color}">${it.marker}</span>` : ""}
      </span>
      <span>${it.label}</span>
    </div>`).join("");

  const dashSegment = (ctx2) => (ctx2.p0DataIndex === FORECAST_IDX - 1 ? [6, 4] : undefined);
  const revenueActual = D.revenue.actual.m.slice();
  const vaActual = D.valueAdded.actual.m.slice();

  new Chart(document.getElementById("p4-mainChart").getContext("2d"), {
    type: "line",
    data: {
      labels: D.months,
      datasets: [
        { label: "사업계획매출", data: D.revenue.plan.m, borderColor: "#e08a86", borderWidth: 2, pointRadius: 0, tension: 0.3 },
        { label: "사업계획부가가치", data: D.valueAdded.plan.m, borderColor: "#d46b66", borderWidth: 2, pointRadius: 0, tension: 0.3 },
        ...(hasRevenueRevised ? [{ label: "수정계획매출", data: D.revenue.revised.m, borderColor: "#7cb342", borderWidth: 2, pointRadius: 0, tension: 0.3 }] : []),
        ...(hasValueAddedRevised ? [{ label: "수정계획부가가치", data: D.valueAdded.revised.m, borderColor: "#558b2f", borderWidth: 2, pointRadius: 0, tension: 0.3 }] : []),
        {
          label: "매출실적", data: revenueActual, borderColor: "#2f6fed", borderWidth: 3,
          pointRadius: (c) => (c.dataIndex === FORECAST_IDX ? 5 : 4),
          pointStyle: (c) => (c.dataIndex === FORECAST_IDX ? "circle" : "rectRot"),
          pointBackgroundColor: (c) => (c.dataIndex === FORECAST_IDX ? "#fff" : "#2f6fed"),
          pointBorderColor: "#2f6fed", pointBorderWidth: 2,
          segment: { borderDash: dashSegment }, tension: 0.3, spanGaps: true,
        },
        {
          label: "부가가치실적", data: vaActual, borderColor: "#1a3fa0", borderWidth: 3,
          pointRadius: (c) => (c.dataIndex === FORECAST_IDX ? 5 : 4),
          pointStyle: (c) => (c.dataIndex === FORECAST_IDX ? "circle" : "triangle"),
          pointBackgroundColor: (c) => (c.dataIndex === FORECAST_IDX ? "#fff" : "#1a3fa0"),
          pointBorderColor: "#1a3fa0", pointBorderWidth: 2,
          segment: { borderDash: dashSegment }, tension: 0.3, spanGaps: true,
        },
      ],
    },
    options: {
      responsive: true, maintainAspectRatio: false,
      layout: { padding: { top: 22 } },
      interaction: { mode: "index", intersect: false },
      plugins: {
        legend: { display: false },
        tooltip: { callbacks: { label: (c) => `${c.dataset.label}: ${c.parsed.y === null ? "-" : c.parsed.y.toLocaleString()} 백만원` } },
      },
      scales: {
        y: { title: { display: true, text: "백만원", color: "#000" }, ticks: { callback: (v) => v.toLocaleString(), color: "#000" }, grid: { color: "#eee" } },
        x: { ticks: { color: "#000" }, grid: { display: false } },
      },
    },
    plugins: [{
      id: "p4ValueLabels",
      afterDatasetsDraw(chart) {
        const { ctx } = chart;
        const labelDsIndexes = chart.data.datasets
          .map((ds, i) => ({ ds, i }))
          .filter(({ ds }) => ds.label === "매출실적" || ds.label === "부가가치실적")
          .map(({ i }) => i);
        labelDsIndexes.forEach((dsIndex) => {
          const meta = chart.getDatasetMeta(dsIndex);
          const dataset = chart.data.datasets[dsIndex];
          meta.data.forEach((point, i) => {
            const v = dataset.data[i];
            if (v === null || v === undefined) return;
            ctx.save();
            ctx.font = "bold 11px sans-serif";
            ctx.fillStyle = i === FORECAST_IDX ? "#c62828" : "#333";
            ctx.textAlign = "center";
            ctx.fillText(i === FORECAST_IDX ? `(${v.toLocaleString()})` : v.toLocaleString(), point.x, point.y - 10);
            ctx.restore();
          });
        });
      },
    }],
  });

  const annualMin = Math.min(...D.annualBar.values);
  const annualMax = Math.max(...D.annualBar.values);
  const annualAxisMin = Math.max(0, Math.floor((annualMin - (annualMax - annualMin) * 1.2) / 50) * 50);

  new Chart(document.getElementById("p4-sideChart").getContext("2d"), {
    type: "bar",
    data: { labels: D.annualBar.labels, datasets: [{ data: D.annualBar.values, backgroundColor: ["#4472c4", "#c0504d", "#77933c", "#8064a2"], borderRadius: 2, maxBarThickness: 60 }] },
    options: {
      responsive: true, maintainAspectRatio: false,
      plugins: { legend: { display: false } },
      scales: {
        y: { min: annualAxisMin, ticks: { color: "#000" }, grid: { color: "#eee" } },
        x: { ticks: { color: "#000" }, grid: { display: false } },
      },
    },
    plugins: [{
      id: "p4BarLabels",
      afterDatasetsDraw(chart) {
        const { ctx } = chart;
        const meta = chart.getDatasetMeta(0);
        meta.data.forEach((bar, i) => {
          const v = chart.data.datasets[0].data[i];
          ctx.save(); ctx.font = "bold 12px sans-serif"; ctx.fillStyle = "#333"; ctx.textAlign = "center";
          ctx.fillText(v.toLocaleString(), bar.x, bar.y - 8); ctx.restore();
        });
      },
    }],
  });
}

// ============ Page 5 ============
function renderPage5() {
  const D = REPORT.page5;
  const table = document.getElementById("p5-table");
  let thead = `<thead>
    <tr>
      <th rowspan="3">구분</th><th rowspan="3">고객사</th><th rowspan="3">차종</th><th rowspan="3" class="p5-unit-head">${D.unitHeader}</th>
      <th colspan="8">${D.currentMonthLabel} 실적</th><th colspan="8">${D.nextMonthLabel} 계획</th><th colspan="2">전월대비</th>
    </tr>
    <tr>
      <th colspan="4">생산수량</th><th colspan="4">매출액</th>
      <th colspan="4">생산수량</th><th colspan="4">매출액</th>
      <th colspan="2">매출액</th>
    </tr>
    <tr>
      <th>수정계획</th><th>실적</th><th>증감</th><th>%</th>
      <th>수정계획</th><th>실적</th><th>증감</th><th>%</th>
      <th>수정계획</th><th>실행계획</th><th>증감</th><th>%</th>
      <th>수정계획</th><th>실행계획</th><th>증감</th><th>%</th>
      <th>증감</th><th>%</th>
    </tr>
  </thead>`;

  function dataCells(v) {
    let html = "";
    html += td(v[0]) + td(v[1]) + td(v[2], { neg: true }) + td(v[3], { unit: "%", neg: true });
    html += td(v[4]) + td(v[5]) + td(v[6], { neg: true }) + td(v[7], { unit: "%", neg: true });
    html += td(v[8]) + td(v[9], { forecast: true }) + td(v[10], { neg: true }) + td(v[11], { unit: "%", neg: true });
    html += td(v[12]) + td(v[13], { forecast: true }) + td(v[14], { neg: true }) + td(v[15], { unit: "%", neg: true });
    html += td(v[16], { neg: true }) + td(v[17], { unit: "%", neg: true });
    return html;
  }

  let rows = "";
  // 합계: 구분/고객사/차종/단위 4열을 한 줄로 병합
  rows += `<tr class="p5-total-row"><th class="p5-section-label" colspan="4">${D.total.label}</th>${dataCells(D.total.v)}</tr>`;

  // 자동차 / SOLAR: 구분 열을 그룹 전체 높이로 세로 병합, 그룹 첫 행에 소계 표시
  D.groups.forEach(group => {
    const groupRowspan = 1 + group.items.length;
    rows += `<tr class="p5-section-row"><th class="p5-section-label-v" rowspan="${groupRowspan}">${group.label}</th>`;
    rows += `<td class="txt-left p5-subtotal-label" colspan="3">소계</td>`;
    rows += dataCells(group.subtotal.v);
    rows += `</tr>`;

    group.items.forEach(r => {
      rows += `<tr>`;
      if (r.merged) {
        rows += `<td class="txt-left p5-customer" colspan="2">${esc(r.label).replace("\n", "<br>")}</td><td class="p5-customer">${esc(r.unit)}</td>`;
      } else {
        if (r.customer !== null && r.customer !== undefined) {
          rows += `<td class="txt-left p5-customer"${r.customerRowspan > 1 ? ` rowspan="${r.customerRowspan}"` : ""}>${esc(r.customer)}</td>`;
        }
        rows += `<td class="txt-left p5-customer">${esc(r.model)}</td><td class="p5-customer">${esc(r.unit)}</td>`;
      }
      rows += dataCells(r.v);
      rows += `</tr>`;
    });
  });

  table.innerHTML = thead + `<tbody>${rows}</tbody>`;

  fillPage5Height(table);
}

function fillPage5Height(table) {
  const wrap = table.closest(".table-wrap");
  const thead = table.querySelector("thead");
  const tbodyRows = table.querySelectorAll("tbody tr");
  if (!wrap || !tbodyRows.length) return;
  const available = wrap.clientHeight - thead.getBoundingClientRect().height;
  const rowHeight = Math.floor(available / tbodyRows.length);
  const minRowHeight = 30;
  tbodyRows.forEach(tr => { tr.style.height = Math.max(rowHeight, minRowHeight) + "px"; });
}

// ============ Page 6 ============
function renderPage6() {
  const D = REPORT.page6;
  const table = document.getElementById("p6-table");

  let colgroup = `<colgroup>
    <col style="width:9%"><col style="width:14%">
    <col style="width:4.3%"><col style="width:4.3%"><col style="width:4.3%"><col style="width:4.3%"><col style="width:4.3%">
    <col style="width:4.3%"><col style="width:4.3%"><col style="width:4.3%"><col style="width:4.3%">
    <col style="width:15%"><col style="width:15%"><col style="width:8.3%">
  </colgroup>`;

  let thead = `<thead>
    <tr>
      <th rowspan="2" colspan="2">구분</th><th rowspan="2">${D.prevMonthLabel} 실적</th>
      <th colspan="4">${D.currentMonthLabel}</th><th colspan="4">${D.nextMonthLabel}</th>
      <th colspan="2">주요내용</th><th rowspan="2">비고</th>
    </tr>
    <tr>
      <th>수정계획</th><th>실적</th><th>%</th><th>전월대비</th><th>수정계획</th><th>실행계획</th><th>%</th><th>전월대비</th>
      <th>${D.currentMonthLabel}</th><th>${D.nextMonthLabel}</th>
    </tr>
  </thead>`;

  function dataRow(v) {
    // v: [7월, 8sc,8실,8pct,8mom, 9sc,9exec,9pct,9mom]
    let html = td(v[0]);
    html += td(v[1]) + td(v[2]) + td(v[3], { unit: "%" }) + td(v[4], { unit: "%" });
    html += td(v[5]) + td(v[6], { forecast: true }) + td(v[7], { unit: "%", forecast: true }) + td(v[8], { unit: "%", forecast: true });
    return html;
  }
  function noteCells(r) {
    return `<td class="txt-left">${esc(r.note8)}</td><td class="txt-left">${esc(r.note9)}</td>`;
  }

  let rows = "";
  // 차량생산 (자체 합계 없음)
  D.vehicleRows.forEach((r, idx) => {
    rows += `<tr class="${idx === 0 ? 'section-start' : ''}">`;
    if (idx === 0) rows += `<th class="row-group-label" rowspan="${D.vehicleRows.length}">${D.vehicleGroupLabel}</th>`;
    rows += `<th class="row-sub-label">${r.name}</th>`;
    rows += dataRow(r.v);
    rows += noteCells(r);
    rows += `<td>${esc(r.shift)}</td>`;
    rows += `</tr>`;
  });

  // 매출 (총계 + Wheel/Body/Chassis/Module/Seat/Solar)
  const salesGroupSpan = 1 + D.salesRows.length;
  rows += `<tr class="section-start total-row"><th class="row-group-label" rowspan="${salesGroupSpan}">${D.salesGroupLabel}</th><th class="row-sub-label">합계</th>${dataRow(D.salesTotal.v)}<td></td><td></td><td></td></tr>`;
  D.salesRows.forEach((r) => {
    rows += `<tr><th class="row-sub-label">${r.name}</th>${dataRow(r.v)}${noteCells(r)}<td></td></tr>`;
  });

  // 직접인원 (총계 + Wheel/Body/Chassis/Module/Seat)
  const headcountGroupSpan = 1 + D.headcountRows.length;
  rows += `<tr class="section-start total-row"><th class="row-group-label" rowspan="${headcountGroupSpan}">${D.headcountGroupLabel}</th><th class="row-sub-label">합계</th>${dataRow(D.headcountTotal.v)}<td></td><td></td><td></td></tr>`;
  D.headcountRows.forEach((r) => {
    rows += `<tr><th class="row-sub-label">${r.name}</th>${dataRow(r.v)}<td></td><td></td><td></td></tr>`;
  });

  table.innerHTML = colgroup + thead + `<tbody>${rows}</tbody>`;
}

// ============ Page 7 ============
const FX_COLGROUP = `<colgroup>
  <col style="width:7%">
  <col style="width:5.33%"><col style="width:5.33%">
  <col style="width:5.33%"><col style="width:5.33%"><col style="width:5.33%"><col style="width:5.33%">
  <col style="width:5.33%"><col style="width:5.33%"><col style="width:5.33%"><col style="width:5.33%">
  <col style="width:5.33%"><col style="width:5.33%"><col style="width:5.33%"><col style="width:5.33%">
  <col style="width:5.33%">
  <col style="width:13%">
</colgroup>`;

function renderFxTable(elId, monthsHeader, rows, totalRow, forecastIdx) {
  const el = document.getElementById(elId);
  let thead = `<thead><tr><th>구분</th><th>년간(2025)</th><th>월평균(2025)</th>${monthsHeader.map((m, i) => `<th${i === forecastIdx ? ' class="forecast"' : ''}>${m}</th>`).join("")}<th>누계</th><th>비고</th></tr></thead>`;
  function rowHtml(label, v, isTotal, note) {
    let html = `<tr class="${isTotal ? 'total-row' : ''}"><th class="row-sub-label">${label}</th>`;
    html += td(v[0]) + td(v[1]);
    for (let i = 0; i < monthsHeader.length; i++) html += td(v[2 + i], { neg: true, forecast: i === forecastIdx });
    html += td(v[2 + monthsHeader.length]);
    html += `<td class="txt-left note-cell">${esc(note)}</td>`;
    html += `</tr>`;
    return html;
  }
  let body = rows.map(r => rowHtml(r.name, r.v, false, r.note)).join("");
  body += rowHtml("합계", totalRow.v, true, null);
  el.innerHTML = FX_COLGROUP + thead + `<tbody>${body}</tbody>`;
}

function renderPage7() {
  const D = REPORT.page7;
  renderFxTable("p7-revenue-table", D.months, D.revenue.rows, D.revenue.total, D.forecastIndex);
  renderFxTable("p7-va-table", D.months, D.valueAdded.rows, D.valueAdded.total, D.forecastIndex);

  const el = document.getElementById("p7-duty-table");
  const r = D.duty.rows[0];
  let thead = `<thead><tr><th>구분</th><th>년간(2025)</th><th>월평균(2025)</th>${D.months.map((m, i) => `<th${i === D.forecastIndex ? ' class="forecast"' : ''}>${m}</th>`).join("")}<th>누계</th><th>비고</th></tr></thead>`;
  let rowHtml = `<tr><th class="row-sub-label">${r.name}</th>` + td(r.v[0]) + td(r.v[1]);
  for (let i = 0; i < D.months.length; i++) rowHtml += td(r.v[2 + i], { forecast: i === D.forecastIndex });
  rowHtml += td(r.v[2 + D.months.length]) + `<td class="txt-left note-cell"></td></tr>`;
  el.innerHTML = FX_COLGROUP + thead + `<tbody>${rowHtml}</tbody><tfoot><tr><td colspan="17" class="txt-left" style="padding:8px;">${D.duty.rateNote}</td></tr></tfoot>`;

  renderFxRateChart(D);
}

function renderFxRateChart(D) {
  const fx = D.fxRate;
  const planSeries = D.months.map(() => fx.plan2026);
  const actualSeries = fx.actualMonthly.slice();
  const forecastIdx = D.forecastIndex;
  const dashSegment = (ctx2) => (ctx2.p0DataIndex === forecastIdx - 1 ? [6, 4] : undefined);

  document.getElementById("p7-fx-legend").innerHTML = [
    { label: `사업계획 환율 (2026년 고정 1$=${fx.plan2026.toLocaleString()}원, 2025년 1$=${fx.planYear2025.toLocaleString()}원)`, color: "#e08a86", dashed: false },
    { label: `실적(월평균) 환율 (2025년 평균 1$=${fx.actualYear2025.toLocaleString()}원)`, color: "#1a4fa0", dashed: true, marker: "◆" },
  ].map(it => `
    <div class="legend-item">
      <span class="legend-swatch${it.dashed ? " dashed" : ""}" style="border-color:${it.color}">
        ${it.marker ? `<span class="marker" style="color:${it.color}">${it.marker}</span>` : ""}
      </span>
      <span>${it.label}</span>
    </div>`).join("");

  new Chart(document.getElementById("p7-fxChart").getContext("2d"), {
    type: "line",
    data: {
      labels: D.months,
      datasets: [
        { label: "사업계획 환율", data: planSeries, borderColor: "#e08a86", borderWidth: 2, pointRadius: 0, borderDash: [4, 3], tension: 0 },
        {
          label: "실적(월평균) 환율", data: actualSeries, borderColor: "#1a4fa0", backgroundColor: "#1a4fa0", borderWidth: 2.5,
          pointRadius: (c) => (c.dataIndex === forecastIdx ? 4 : 3),
          pointStyle: (c) => (c.dataIndex === forecastIdx ? "circle" : "circle"),
          pointBackgroundColor: (c) => (c.dataIndex === forecastIdx ? "#fff" : "#1a4fa0"),
          pointBorderColor: "#1a4fa0", pointBorderWidth: 1.5,
          segment: { borderDash: dashSegment }, tension: 0.25, spanGaps: true,
        },
      ],
    },
    options: {
      responsive: true, maintainAspectRatio: false,
      layout: { padding: { top: 6 } },
      plugins: {
        legend: { display: false },
        tooltip: { callbacks: { label: (c) => `${c.dataset.label}: ${c.parsed.y === null ? "-" : c.parsed.y.toLocaleString()}원` } },
      },
      scales: {
        y: { title: { display: true, text: "원/$" }, ticks: { callback: (v) => v.toLocaleString(), font: { size: 8 } }, grid: { color: "#eee" } },
        x: { grid: { display: false }, ticks: { font: { size: 8 } } },
      },
    },
    plugins: [{
      id: "p7FxLabels",
      afterDatasetsDraw(chart) {
        const { ctx } = chart;
        const meta = chart.getDatasetMeta(1);
        meta.data.forEach((point, i) => {
          const v = actualSeries[i];
          if (v === null || v === undefined) return;
          ctx.save();
          ctx.font = "bold 8px sans-serif";
          ctx.fillStyle = i === forecastIdx ? "#c62828" : "#333";
          ctx.textAlign = "center";
          ctx.fillText(i === forecastIdx ? `(${v.toLocaleString()})` : v.toLocaleString(), point.x, point.y - 7);
          ctx.restore();
        });
      },
    }],
  });
}

// ============ Page 8 ============
function renderPage8() {
  const D = REPORT.page8;
  const table = document.getElementById("p8-table");

  const colGroupClass = ["p8-grp-blue", "p8-grp-blue", "p8-grp-blue", "p8-grp-blue", "p8-grp-green", "p8-grp-green", "p8-grp-green"];
  const groupStart = [false, true, false, true, true, false, true];

  const colgroup = `<colgroup>
    <col style="width:6.5%"><col style="width:8%"><col style="width:9.5%">
    ${D.columns.map(() => `<col style="width:4.57%"><col style="width:4.57%">`).join("")}
    <col style="width:12%">
  </colgroup>`;

  let thead = `<thead>
    <tr><th colspan="3" rowspan="2">항목</th>${D.columns.map((c, i) => `<th colspan="2" class="${colGroupClass[i]}${groupStart[i] ? " p8-divider" : ""}">${c}</th>`).join("")}<th rowspan="2" class="p8-divider">특이사항</th></tr>
    <tr>${D.columns.map((c, i) => `<th class="${colGroupClass[i]}${groupStart[i] ? " p8-divider" : ""}">금액</th><th class="${colGroupClass[i]}">%</th>`).join("")}</tr>
  </thead>`;

  function dataCells(cells) {
    let html = "";
    cells.forEach(([amt, pct], i) => {
      const cls = colGroupClass[i].replace("p8-grp-", "p8-cell-");
      const divider = groupStart[i] ? " p8-divider" : "";
      html += `<td class="num ${cls}${divider}${amt < 0 ? " neg" : ""}">${fmtNum(amt)}</td>`;
      html += `<td class="num ${cls}${pct < 0 ? " neg" : ""}">${fmtNum(pct, "%")}</td>`;
    });
    return html;
  }

  const rows = D.rows;
  let body = "";
  let i = 0;
  while (i < rows.length) {
    const r = rows[i];
    // find extent of this level-0 block (itself + all following level>0 rows)
    let j = i + 1;
    while (j < rows.length && rows[j].level > 0) j++;
    const span = j - i; // includes r itself
    const pairACls = (r.label === "매출액" || r.label === "부가가치") ? " p8-row-pairA" : "";
    const pairBCls = (r.label === "매출원가" || r.label === "판매관리비") ? " p8-row-pairB" : "";
    const sectionCls = "section-start" + (r.emphasize ? " p8-row-emphasize" : "") + pairACls + pairBCls + (r.label === "매출총이익" ? " p8-row-rose" : "");

    const noteTd = (note, rowspan) => `<td class="txt-left note-cell p8-divider"${rowspan ? ` rowspan="${rowspan}"` : ""}>${esc(note || "")}</td>`;
    const qtyTriggerTd = () => `<td class="txt-left note-cell p8-divider"><button type="button" class="p8-qty-btn" onclick="window.__p8OpenQtyModal && window.__p8OpenQtyModal()">📊 생산수량</button></td>`;
    const isRevenueBlock = r.label === "매출액" && !!D.customerQty;

    if (span === 1) {
      // standalone row (매출총이익, 영업이익): label spans all 3 columns
      body += `<tr class="${sectionCls}"><th class="row-sub-label txt-left" colspan="3">${r.label}</th>${dataCells(r.cells)}${noteTd(r.note)}</tr>`;
      i = j;
    } else {
      // group: level-0 row gets col1 rowspan; its own totals shown as "합계" in col2(colspan2)
      const rNoteTd = isRevenueBlock ? qtyTriggerTd() : noteTd(r.note, r.noteMergeSpan);
      body += `<tr class="${sectionCls}"><th class="row-group-label" rowspan="${span}">${r.label}</th><th class="row-sub-label txt-left" colspan="2">합계</th>${dataCells(r.cells)}${rNoteTd}</tr>`;
      let mergedRemaining = r.noteMergeSpan ? r.noteMergeSpan - 1 : 0;
      let k = i + 1;
      while (k < j) {
        const c = rows[k];
        // does c (level 1) have its own level-2 children?
        let m = k + 1;
        while (m < j && rows[m].level === 2) m++;
        const childSpan = m - k;
        if (childSpan > 1) {
          const pairCCls = (c.label === "노무비" || c.label === "제조경비") ? " p8-row-pairC" : "";
          const cNoteTd = noteTd(c.note, c.noteMergeSpan);
          body += `<tr class="${pairCCls.trim()}"><th class="row-group-label p8-subgroup-label" rowspan="${childSpan}">${c.label}</th><th class="row-sub-label txt-left">합계</th>${dataCells(c.cells)}${cNoteTd}</tr>`;
          let subMergedRemaining = c.noteMergeSpan ? c.noteMergeSpan - 1 : 0;
          for (let n = k + 1; n < m; n++) {
            const cc = rows[n];
            const ccNoteTd = subMergedRemaining > 0 ? "" : noteTd(cc.note);
            if (subMergedRemaining > 0) subMergedRemaining--;
            body += `<tr><th class="row-sub-label txt-left">${cc.label}</th>${dataCells(cc.cells)}${ccNoteTd}</tr>`;
          }
        } else {
          const rowCls = c.label === "재료비" ? " p8-row-pairC" : "";
          let cNoteTd;
          if (mergedRemaining > 0) { cNoteTd = ""; mergedRemaining--; }
          else cNoteTd = noteTd(c.note);
          body += `<tr class="${rowCls.trim()}"><th class="row-sub-label txt-left" colspan="2">${c.label}</th>${dataCells(c.cells)}${cNoteTd}</tr>`;
        }
        k = m;
      }
      i = j;
    }
  }

  table.innerHTML = colgroup + thead + `<tbody>${body}</tbody>`;

  if (D.customerQty) renderP8QtyModal(D.customerQty);
}

function renderP8QtyModal(qty) {
  let modal = document.getElementById("p8-qty-modal");
  if (!modal) {
    modal = document.createElement("div");
    modal.id = "p8-qty-modal";
    modal.className = "p8-qty-modal";
    modal.hidden = true;
    modal.innerHTML = `
      <div class="p8-qty-backdrop"></div>
      <div class="p8-qty-card">
        <div class="p8-qty-card-header">
          <span>고객사별 월별 생산수량</span>
          <button type="button" class="p8-qty-close">✕</button>
        </div>
        <div class="p8-qty-card-body"></div>
      </div>`;
    document.body.appendChild(modal);
    const close = () => { modal.hidden = true; };
    modal.querySelector(".p8-qty-backdrop").addEventListener("click", close);
    modal.querySelector(".p8-qty-close").addEventListener("click", close);
  }

  const rowsHtml = qty.groups.map(g => g.rows.map((r, idx) => `
    <tr>
      ${idx === 0 ? `<th rowspan="${g.rows.length}">${esc(g.customer)}</th>` : ""}
      <th>${esc(r.model)}</th>
      <td class="num">${fmtNum(r.cur)}</td>
      <td class="num">${fmtNum(r.next1)}</td>
      <td class="num">${fmtNum(r.next2)}</td>
      <td class="num${r.diff < 0 ? " neg" : ""}">${fmtNum(r.diff)}</td>
      <td class="num${r.pct < 0 ? " neg" : ""}">${fmtNum(r.pct, "%")}</td>
    </tr>`).join("")).join("");

  modal.querySelector(".p8-qty-card-body").innerHTML = `
    <table class="report-table dense-table p8-qty-table">
      <thead>
        <tr><th rowspan="2" colspan="2">고객사</th><th colspan="3">월별 생산수량</th><th colspan="2">전월대비</th></tr>
        <tr><th>${esc(qty.months.current)}실적</th><th>${esc(qty.months.next1)}계획</th><th>${esc(qty.months.next2)}계획</th><th>수량</th><th>%</th></tr>
      </thead>
      <tbody>${rowsHtml}</tbody>
    </table>`;

  window.__p8OpenQtyModal = () => { modal.hidden = false; };
}

// ============ Page 9 ============
function renderPage9() {
  const D = REPORT.page9;
  const table = document.getElementById("p9-table");

  function msCell(m, divider) {
    const dCls = divider ? " p9-divider" : "";
    if (m === "N/A" || m === null || m === undefined) return `<td class="p9-ms p9-ms-na${dCls}">N/A</td>`;
    if (typeof m === "string") return `<td class="p9-ms${dCls}">${esc(m)}</td>`;
    const cls = m.state === "green" ? " p9-ms-green" : m.state === "black" ? " p9-ms-black" : "";
    if (m.note) {
      return `<td class="p9-ms${cls}${dCls}"><div class="p9-ms-date">${esc(m.v)}</div><div class="p9-ms-note">${esc(m.note)}</div></td>`;
    }
    return `<td class="p9-ms${cls}${dCls}">${esc(m.v)}</td>`;
  }
  function numTd(v, rowspan, blueText, divider) {
    const rs = rowspan ? ` rowspan="${rowspan}"` : "";
    const dCls = divider ? " p9-divider" : "";
    if (v === null || v === undefined) return `<td class="num blank${dCls}"${rs}>-</td>`;
    const cls = (blueText ? "num p9-actual" : "num") + dCls;
    return `<td class="${cls}"${rs}>${fmtNum(v)}</td>`;
  }
  function dateTd(v, rowspan) {
    const rs = rowspan ? ` rowspan="${rowspan}"` : "";
    return `<td class="p9-date p9-actual"${rs}>${esc(v || "-")}</td>`;
  }
  function rateTd(v, rowspan) {
    const rs = rowspan ? ` rowspan="${rowspan}"` : "";
    if (v === null || v === undefined) return `<td class="num blank"${rs}>-</td>`;
    return `<td class="progress-cell"${rs}><div class="progress-bar"><div class="progress-fill" style="width:${v}%"></div></div><span>${v}%</span></td>`;
  }
  function remarksTd(text, rowspan) {
    const rs = rowspan ? ` rowspan="${rowspan}"` : "";
    return `<td class="txt-left p9-remarks p9-divider"${rs}>${esc(text || "").split("\n").map(esc).join("<br>")}</td>`;
  }

  const colgroup = `<colgroup>
    <col style="width:4.0%"><col style="width:4.5%"><col style="width:5.5%">
    <col style="width:6.5%"><col style="width:9.5%">
    <col style="width:4.5%"><col style="width:4.6%"><col style="width:4.6%"><col style="width:4.5%"><col style="width:5.0%"><col style="width:4.6%"><col style="width:4.6%"><col style="width:4.5%">
    <col style="width:4.3%"><col style="width:4.0%"><col style="width:5.2%">
    <col style="width:4.0%"><col style="width:4.0%"><col style="width:5.0%">
    <col style="width:6.6%">
  </colgroup>`;

  const thead = `<thead>
    <tr>
      <th rowspan="2">Plant</th><th rowspan="2">Commodity</th><th rowspan="2">Customer</th>
      <th colspan="2" class="p9-divider">Program</th>
      <th colspan="8" class="p9-divider">Miestone / Main Issue</th>
      <th colspan="3" class="p9-divider">고객회수</th>
      <th colspan="3" class="p9-divider">투자현황</th>
      <th rowspan="2" class="p9-divider">Remarks</th>
    </tr>
    <tr>
      <th>Project</th><th>P/Name</th>
      <th class="p9-divider">T.K.O</th><th>1ST<br>Delivery</th><th>Line<br>Install</th><th>P.V<br>Start</th><th>P.V<br>Completed</th><th>PPAP<br>App.</th><th>RUN<br>@Rate</th><th>S.O.R.P</th>
      <th class="p9-divider">일시불<br>계획</th><th>실적</th><th>회수<br>시점</th>
      <th class="p9-divider">계획</th><th>실적</th><th>진도율</th>
    </tr>
  </thead>`;

  let body = "";
  D.groups.forEach(group => {
    const totalRows = group.projects.reduce((s, p) => s + p.rows.length, 0);
    let groupFirstRow = true;
    group.projects.forEach(project => {
      let projFirstRow = true;
      project.rows.forEach((r, ri) => {
        const sectionCls = (groupFirstRow || projFirstRow) ? " section-start" : "";
        body += `<tr class="${sectionCls.trim()}">`;
        if (groupFirstRow) {
          body += `<th class="row-group-label" rowspan="${totalRows}">${esc(group.plant)}</th>`;
          body += `<th class="row-group-label" rowspan="${totalRows}">${esc(group.commodity)}</th>`;
          body += `<th class="row-group-label" rowspan="${totalRows}">${esc(group.customer)}</th>`;
          groupFirstRow = false;
        }
        if (projFirstRow) {
          body += `<th class="row-sub-label txt-left p9-divider" rowspan="${project.rows.length}">${esc(project.project).split("\n").map(esc).join("<br>")}</th>`;
          projFirstRow = false;
        }
        body += `<td class="txt-left">${esc(r.pname)}</td>`;
        body += msCell(r.tko, true) + msCell(r.d1) + msCell(r.line) + msCell(r.pvStart) + msCell(r.pvDone) + msCell(r.ppap) + msCell(r.run) + msCell(r.sorp);
        if (group.mergeGroupCols) {
          if (ri === 0) {
            const gr = group.groupRecovery, gi = group.groupInvest;
            body += numTd(gr.plan, project.rows.length, false, true) + numTd(gr.actual, project.rows.length, true) + dateTd(gr.date, project.rows.length);
            body += numTd(gi.plan, project.rows.length, false, true) + numTd(gi.actual, project.rows.length, true) + rateTd(gi.rate, project.rows.length);
            body += remarksTd(group.groupRemarks, project.rows.length);
          }
        } else {
          body += numTd(r.recPlan, null, false, true) + numTd(r.recActual, null, true) + dateTd(r.recDate);
          body += numTd(r.invPlan, null, false, true) + numTd(r.invActual, null, true) + rateTd(r.invRate);
          body += remarksTd(r.remarks);
        }
        body += `</tr>`;
      });
    });
  });

  table.innerHTML = colgroup + thead + `<tbody>${body}</tbody>`;
}

// ============ Page 10 ============
function renderPage10() {
  const D = REPORT.page10;

  // ---- legend ----
  document.getElementById("p10-legend").innerHTML = `
    <div class="legend-item"><span class="legend-swatch p10-bar-swatch" style="background:#f2a640;"></span><span>월실적</span></div>
    <div class="legend-item"><span class="legend-swatch" style="border-color:#8fc1e3;"></span><span>누적 사업계획</span></div>
    <div class="legend-item"><span class="legend-swatch" style="border-color:#1f6f78;"></span><span>누적 실행계획</span></div>
    <div class="legend-item"><span class="legend-swatch" style="border-color:#c0392b;"></span><span>누적 실적</span></div>`;

  // ---- main combo chart: monthly bar + 3 cumulative lines ----
  new Chart(document.getElementById("p10-mainChart").getContext("2d"), {
    data: {
      labels: D.months,
      datasets: [
        { type: "bar", label: "월실적", data: D.chart.monthlyActual, backgroundColor: "#f2a640", order: 4, yAxisID: "y" },
        { type: "line", label: "누적 사업계획", data: D.chart.cumPlan, borderColor: "#8fc1e3", backgroundColor: "#8fc1e3", pointRadius: 3, borderWidth: 2, tension: 0, order: 3, yAxisID: "y" },
        { type: "line", label: "누적 실행계획", data: D.chart.cumExecuted, borderColor: "#1f6f78", backgroundColor: "#1f6f78", pointRadius: 3, borderWidth: 2, tension: 0, order: 1, yAxisID: "y" },
        { type: "line", label: "누적 실적", data: D.chart.cumActual, borderColor: "#c0392b", backgroundColor: "#c0392b", pointRadius: 3, borderWidth: 2, tension: 0, order: 2, yAxisID: "y" },
      ],
    },
    options: {
      responsive: true, maintainAspectRatio: false,
      layout: { padding: { top: 16 } },
      plugins: {
        legend: { display: false },
        tooltip: { callbacks: { label: (c) => `${c.dataset.label}: ${c.parsed.y === null ? "-" : c.parsed.y.toLocaleString()} 백만원` } },
      },
      scales: {
        y: { beginAtZero: true, title: { display: true, text: "백만원" }, ticks: { callback: (v) => v.toLocaleString() }, grid: { color: "#eee" } },
        x: { grid: { display: false } },
      },
    },
    plugins: [{
      id: "p10ValueLabels",
      afterDatasetsDraw(chart) {
        const { ctx } = chart;
        [1, 2, 3].forEach((dsIndex) => {
          const meta = chart.getDatasetMeta(dsIndex);
          const dataset = chart.data.datasets[dsIndex];
          meta.data.forEach((point, i) => {
            const v = dataset.data[i];
            if (v === null || v === undefined) return;
            ctx.save();
            ctx.font = "bold 9px sans-serif";
            ctx.fillStyle = dsIndex === 3 ? "#c0392b" : "#333";
            ctx.textAlign = "center";
            ctx.fillText(v.toLocaleString(), point.x, point.y - 8);
            ctx.restore();
          });
        });
        const barMeta = chart.getDatasetMeta(0);
        chart.data.datasets[0].data.forEach((v, i) => {
          if (v === null || v === undefined) return;
          const bar = barMeta.data[i];
          ctx.save();
          ctx.font = "bold 9px sans-serif"; ctx.fillStyle = "#7a4a15"; ctx.textAlign = "center";
          ctx.fillText(v.toLocaleString(), bar.x, bar.y - 6);
          ctx.restore();
        });
      },
    }],
  });

  // ---- 잔여 투자 현황 (doughnut, labels drawn directly on chart) ----
  new Chart(document.getElementById("p10-sideChart").getContext("2d"), {
    type: "doughnut",
    data: {
      labels: D.remainingByCategory.labels,
      datasets: [{ data: D.remainingByCategory.values, backgroundColor: ["#2f6fa0", "#a9cbe8", "#3f8fa6", "#5aa668", "#8ec86a", "#c9c766", "#bbbbbb"] }],
    },
    options: {
      responsive: true, maintainAspectRatio: false,
      radius: "62%",
      layout: { padding: 26 },
      plugins: {
        legend: { display: false },
        tooltip: { callbacks: { label: (c) => `${c.label}: ${c.parsed.toLocaleString()} 백만원` } },
      },
    },
    plugins: [{
      id: "p10PieLabels",
      afterDatasetsDraw(chart) {
        const { ctx } = chart;
        const meta = chart.getDatasetMeta(0);
        const data = chart.data.datasets[0].data;
        meta.data.forEach((arc, i) => {
          const v = data[i];
          if (!v) return;
          const label = chart.data.labels[i];
          const angle = (arc.startAngle + arc.endAngle) / 2;
          const cx = arc.x, cy = arc.y, rOuter = arc.outerRadius;
          const sx = cx + Math.cos(angle) * rOuter;
          const sy = cy + Math.sin(angle) * rOuter;
          const kx = cx + Math.cos(angle) * (rOuter + 8);
          const ky = cy + Math.sin(angle) * (rOuter + 8);
          const alignRight = Math.cos(angle) >= 0;
          const lx = kx + (alignRight ? 8 : -8);
          ctx.save();
          ctx.strokeStyle = "#999"; ctx.lineWidth = 0.6;
          ctx.beginPath(); ctx.moveTo(sx, sy); ctx.lineTo(kx, ky); ctx.lineTo(lx, ky); ctx.stroke();
          ctx.fillStyle = "#333"; ctx.font = "6.5px sans-serif"; ctx.textAlign = alignRight ? "left" : "right";
          ctx.fillText(`${label} ${v.toLocaleString()}`, lx + (alignRight ? 2 : -2), ky + 2);
          ctx.restore();
        });
      },
    }],
  });

  // ---- 회수 현황 (grouped bar, by year) ----
  new Chart(document.getElementById("p10-recoveryChart").getContext("2d"), {
    type: "bar",
    data: {
      labels: D.recoveryByYear.years,
      datasets: [
        { label: "실행계획", data: D.recoveryByYear.plan, backgroundColor: "#a9cbe8" },
        { label: "실적", data: D.recoveryByYear.actual, backgroundColor: "#f2a640" },
      ],
    },
    options: {
      responsive: true, maintainAspectRatio: false,
      layout: { padding: { top: 12 } },
      plugins: {
        legend: { position: "bottom", labels: { boxWidth: 8, font: { size: 7.5 }, padding: 4 } },
        tooltip: { callbacks: { label: (c) => `${c.dataset.label}: ${c.parsed.y.toLocaleString()} 백만원` } },
      },
      scales: {
        y: { beginAtZero: true, ticks: { callback: (v) => v.toLocaleString(), font: { size: 6.5 } }, grid: { color: "#eee" } },
        x: { grid: { display: false }, ticks: { font: { size: 7 } } },
      },
    },
    plugins: [{
      id: "p10RecoveryLabels",
      afterDatasetsDraw(chart) {
        const { ctx } = chart;
        chart.data.datasets.forEach((ds, dsIndex) => {
          const meta = chart.getDatasetMeta(dsIndex);
          ds.data.forEach((v, i) => {
            if (!v) return;
            const bar = meta.data[i];
            ctx.save();
            ctx.font = "bold 9px sans-serif"; ctx.fillStyle = "#333"; ctx.textAlign = "center";
            ctx.fillText(v.toLocaleString(), bar.x, bar.y - 6);
            ctx.restore();
          });
        });
      },
    }],
  });

  // ---- detail table ----
  const table = document.getElementById("p10-table");

  function cell(v, opts) {
    opts = opts || {};
    const rs = opts.rowspan ? ` rowspan="${opts.rowspan}"` : "";
    const cls = ["num"];
    if (opts.divider) cls.push("p10-divider");
    if (v === null || v === undefined) { cls.push("blank"); return `<td class="${cls.join(" ")}"${rs}>-</td>`; }
    if (v < 0) cls.push("neg");
    const text = opts.pct ? fmtNum(v, "%") : fmtNum(v);
    return `<td class="${cls.join(" ")}"${rs}>${text}</td>`;
  }

  const colgroup = `<colgroup>
    <col style="width:3.5%"><col style="width:7.5%"><col style="width:4.6%">
    ${Array(12).fill('<col style="width:3.6%">').join("")}
    <col style="width:4.6%">
    <col style="width:4.6%"><col style="width:4.6%"><col style="width:4.3%"><col style="width:4.8%">
    <col style="width:4.6%"><col style="width:4.6%"><col style="width:4.3%"><col style="width:4.8%">
  </colgroup>`;

  const thead = `<thead>
    <tr>
      <th colspan="2" rowspan="2">구분</th>
      <th rowspan="2">2025년<br>실적</th>
      <th colspan="13" class="p10-divider">2026년 투자 계획/실적</th>
      <th rowspan="2" class="p10-divider">계획<br>증감</th>
      <th rowspan="2">실행<br>절감</th>
      <th rowspan="2">투자<br>취소</th>
      <th rowspan="2">잔여</th>
      <th colspan="3" class="p10-divider">회수</th>
      <th rowspan="2" class="p10-divider">합계</th>
    </tr>
    <tr>
      ${D.months.map((m, i) => `<th${i === 0 ? ' class="p10-divider"' : ""}>${m}</th>`).join("")}
      <th>합계</th>
      <th class="p10-divider">2025년</th><th>2026년</th><th>2027년</th>
    </tr>
  </thead>`;

  let body = "";
  D.table.groups.forEach(group => {
    group.rows.forEach((r, ri) => {
      body += `<tr class="${ri === 0 ? "section-start" : ""}">`;
      if (ri === 0) {
        body += `<th class="row-group-label" rowspan="${group.labelSpan}">${esc(group.label).split("\n").map(esc).join("<br>")}</th>`;
      } else if (ri === group.labelSpan) {
        body += `<th class="row-group-label"></th>`;
      }
      body += `<th class="row-sub-label txt-left">${esc(r.sub)}</th>`;
      body += cell(r.y2025, { pct: r.isPct });
      r.months.forEach((v, mi) => { body += cell(v, { pct: r.isPct, divider: mi === 0 }); });
      body += cell(r.total, { pct: r.isPct });
      if (ri === 0) {
        body += cell(group.planDelta, { rowspan: group.valsSpan, divider: true });
        body += cell(group.execSaving, { rowspan: group.valsSpan });
        body += cell(group.cancel, { rowspan: group.valsSpan });
        body += cell(group.remaining, { rowspan: group.valsSpan });
      }
      body += cell(r.recovery.y2025, { pct: r.isPct, divider: true });
      body += cell(r.recovery.y2026, { pct: r.isPct });
      body += cell(r.recovery.y2027, { pct: r.isPct });
      body += cell(r.recovery.total, { pct: r.isPct, divider: true });
      body += `</tr>`;
    });
  });

  table.innerHTML = colgroup + thead + `<tbody>${body}</tbody>`;

  document.getElementById("p10-notes").innerHTML = D.notes.map(n => {
    const emIdx = n.indexOf(" — ");
    let head, rest;
    if (emIdx !== -1) {
      head = n.slice(0, emIdx);
      rest = n.slice(emIdx);
    } else {
      const colonIdx = n.indexOf(":");
      head = colonIdx === -1 ? n : n.slice(0, colonIdx + 1);
      rest = colonIdx === -1 ? "" : n.slice(colonIdx + 1);
    }
    return `<strong>${esc(head)}</strong>${esc(rest)}`;
  }).join("\n\n");
}

// ============ Page 11 ============
function renderPage11() {
  const D = REPORT.page11;
  const table = document.getElementById("p11-table");
  const colgroup = `<colgroup>
    <col style="width:6%"><col style="width:11%">
    <col style="width:6.5%"><col style="width:6.5%"><col style="width:6.5%"><col style="width:6.5%">
    <col style="width:6.5%"><col style="width:6.5%"><col style="width:6.5%"><col style="width:6.5%">
    <col style="width:31%">
  </colgroup>`;
  let thead = `<thead><tr>
    <th>구분</th><th>세부항목</th><th>사업계획</th><th>추가계획</th><th>투자취소</th><th>합계</th>
    <th>실적</th><th>집행율</th><th>절감금액</th><th>미집행금액</th><th>특기사항</th>
  </tr></thead>`;

  const groupsOrder = [];
  const seen = {};
  D.groups.forEach(g => { if (!seen[g.category]) { seen[g.category] = true; groupsOrder.push(g.category); } });

  let rows = "";
  groupsOrder.forEach(cat => {
    const items = D.groups.filter(g => g.category === cat);
    items.forEach((g, idx) => {
      rows += `<tr class="${idx === 0 ? 'section-start' : ''}">`;
      if (idx === 0) rows += `<th class="row-group-label" rowspan="${items.length}">${cat}</th>`;
      rows += `<th class="row-sub-label">${g.item}</th>`;
      rows += td(g.plan) + td(g.extra) + td(g.cancel) + td(g.total) + td(g.actual) + td(g.rate, { unit: "%" }) + td(g.saving) + td(g.unexecuted);
      rows += `<td class="txt-left" style="font-size:10.3px;">${g.remarks}</td>`;
      rows += `</tr>`;
    });
  });

  const t = D.total;
  rows += `<tr class="total-row section-start"><th class="row-group-label" colspan="2">합계</th>
    ${td(t.plan)}${td(t.extra)}${td(t.cancel)}${td(t.total)}${td(t.actual)}${td(t.rate, { unit: "%" })}${td(t.saving)}${td(t.unexecuted)}<td></td></tr>`;

  table.innerHTML = colgroup + thead + `<tbody>${rows}</tbody>`;
}

// ============ Page 12 ============
function renderPage12() {
  const D = REPORT.page12;
  const months = D.customerResult.months;

  function sumOrNull(arr) {
    const vals = arr.filter(v => v !== null && v !== undefined);
    return vals.length ? vals.reduce((a, b) => a + b, 0) : null;
  }

  // ---------- Table 1: 4-1. 고객 실적 (SPPS / LINE STOP + 주요 품질 Issue) ----------
  const table1 = document.getElementById("p12-table-customer");
  const colgroup1 = `<colgroup>
    <col style="width:7%"><col style="width:5%"><col style="width:8%">
    ${Array(12).fill('<col style="width:5.75%">').join("")}
    <col style="width:11%">
  </colgroup>`;
  const thead1 = `<thead><tr><th>구 분</th><th>단위</th><th></th>${months.map(m => `<th>${m}</th>`).join("")}<th>평균&amp;누계</th></tr></thead>`;

  function custGroupRows(label, unit, obj) {
    const spec = [["목표", obj.target], ["WHEEL", obj.wheel], ["CHASSIS", obj.chassis], ["SEAT", obj.seat], ["인천공장", obj.incheon]];
    return spec.map(([rlabel, arr], idx) => {
      let html = `<tr class="${idx === 0 ? "section-start" : ""}">`;
      if (idx === 0) {
        html += `<th class="row-group-label" rowspan="5">${esc(label).split("\n").map(esc).join("<br>")}</th>`;
        html += `<th class="row-sub-label" rowspan="5">${esc(unit).split("\n").map(esc).join("<br>")}</th>`;
      }
      html += `<th class="row-sub-label txt-left">${rlabel}</th>`;
      arr.forEach(v => { html += td(v); });
      html += td(sumOrNull(arr));
      html += `</tr>`;
      return html;
    }).join("");
  }

  let rows1 = custGroupRows("SPPS\n(Supplier Practical\nProblem Solving)", "횟수", D.customerResult.spps);
  rows1 += custGroupRows("LINE STOP", "시간\n(분)", D.customerResult.lineStop);
  rows1 += `<tr class="section-start"><th class="row-group-label" colspan="3">주요 품질 Issue</th>
    <td colspan="13" class="txt-left p12-issue-cell">${esc(D.issue)}</td></tr>`;

  table1.innerHTML = colgroup1 + thead1 + `<tbody>${rows1}</tbody>`;

  // ---------- Section 2: 사내 실적(공정불량율) charts ----------
  const chartsWrap = document.getElementById("p12-charts");
  const specs = [
    { key: "wheel", title: "휠" },
    { key: "chassis", title: "샤시" },
    { key: "seat", title: "시트" },
    { key: "module", title: "모듈생산팀" },
  ];
  chartsWrap.innerHTML = specs.map(s => `
    <div class="chart-card small-chart">
      <div class="chart-title">(${s.title})</div>
      <div class="chart-canvas-wrap2"><canvas id="p12-chart-${s.key}"></canvas></div>
    </div>`).join("");

  const chartLabels = ["2025년", ...months];
  specs.forEach(s => {
    const d = D.ppm[s.key];
    new Chart(document.getElementById(`p12-chart-${s.key}`).getContext("2d"), {
      type: "bar",
      data: {
        labels: chartLabels,
        datasets: [
          { label: "목표", data: d.target, backgroundColor: "#6b8fc9", grouped: false, barPercentage: 0.85, categoryPercentage: 0.9, order: 2 },
          { label: "실적", data: d.actual, backgroundColor: "#d9534f", grouped: false, barPercentage: 0.45, categoryPercentage: 0.9, order: 1 },
        ],
      },
      options: {
        responsive: true, maintainAspectRatio: false,
        plugins: { legend: { display: true, position: "top", align: "end", labels: { boxWidth: 8, font: { size: 7 }, padding: 3 } } },
        scales: {
          y: { beginAtZero: true, ticks: { font: { size: 6.5 } }, grid: { color: "#eee" } },
          x: { ticks: { font: { size: 6.2 } }, grid: { display: false } },
        },
      },
      plugins: [{
        id: `p12Labels-${s.key}`,
        afterDatasetsDraw(chart) {
          const { ctx } = chart;
          [0, 1].forEach(dsIndex => {
            const meta = chart.getDatasetMeta(dsIndex);
            const data = chart.data.datasets[dsIndex].data;
            meta.data.forEach((bar, i) => {
              const v = data[i];
              if (v === null || v === undefined) return;
              ctx.save();
              ctx.font = "bold 6px sans-serif";
              ctx.fillStyle = dsIndex === 1 ? "#a02622" : "#2c4770";
              ctx.textAlign = "center";
              ctx.fillText(v.toLocaleString(), bar.x, bar.y - 3);
              ctx.restore();
            });
          });
        },
      }],
    });
  });

  // ---------- Table 2: PPM 목표/실적 ----------
  const table2 = document.getElementById("p12-table-ppm");
  const colgroup2 = `<colgroup>
    <col style="width:8%"><col style="width:6%"><col style="width:6%">
    ${Array(12).fill('<col style="width:5.75%">').join("")}
    <col style="width:9%">
  </colgroup>`;
  const thead2 = `<thead><tr><th>구 분</th><th></th><th>2025년</th>${months.map(m => `<th>${m}</th>`).join("")}<th>누계</th></tr></thead>`;
  let rows2 = "";
  specs.forEach(s => {
    const d = D.ppm[s.key];
    rows2 += `<tr class="section-start"><th class="row-group-label" rowspan="2">${s.title}</th><th class="row-sub-label">목표</th>${td(d.target[0])}${d.target.slice(1).map(v => td(v)).join("")}${td(d.cumTarget)}</tr>`;
    rows2 += `<tr><th class="row-sub-label">실적</th>${td(d.actual[0])}${d.actual.slice(1).map(v => td(v)).join("")}${td(d.cumActual)}</tr>`;
  });
  table2.innerHTML = colgroup2 + thead2 + `<tbody>${rows2}</tbody>`;
}

// ============ Page 13 ============
function renderPage13() {
  const D = REPORT.page13;
  const months = D.months;
  const chartLabels = ["2025년", ...months];

  // ---------- Charts ----------
  const chartsWrap = document.getElementById("p13-charts");
  chartsWrap.innerHTML = D.groups.map((g, i) => `
    <div class="chart-card small-chart">
      <div class="chart-title p13-chart-title">${esc(g.label).replace(/\n/g, " ").replace(/\s+/g, " ").trim()}(Q-COST)</div>
      <div class="chart-canvas-wrap2"><canvas id="p13-chart-${i}"></canvas></div>
    </div>`).join("");

  const RATE_MAX = 0.1;
  D.groups.forEach((g, i) => {
    const rateOriginal = [g.rate.v2025, ...g.rate.m];
    const rateClamped = rateOriginal.map(v => (v === null || v === undefined) ? null : Math.min(v, RATE_MAX));
    new Chart(document.getElementById(`p13-chart-${i}`).getContext("2d"), {
      data: {
        labels: chartLabels,
        datasets: [
          { type: "bar", label: "목표", data: [g.target.v2025, ...g.target.m], backgroundColor: "#cfd8dc", order: 1, yAxisID: "y" },
          { type: "bar", label: "실적", data: [g.actual.v2025, ...g.actual.m], backgroundColor: "#c0392b", order: 2, yAxisID: "y" },
          { type: "line", label: "Q-cost Rate", data: rateClamped, borderColor: "#e07b39", backgroundColor: "#e07b39", borderDash: [4, 3], yAxisID: "y1", tension: 0.3, pointRadius: 3, order: 3 },
        ],
      },
      options: {
        responsive: true, maintainAspectRatio: false,
        layout: { padding: { top: 14 } },
        plugins: {
          legend: { display: true, position: "top", align: "end", labels: { boxWidth: 9, font: { size: 8.5 }, padding: 4 } },
          tooltip: {
            callbacks: {
              label: (c) => {
                if (c.dataset.label === "Q-cost Rate") {
                  const orig = rateOriginal[c.dataIndex];
                  return `Q-cost Rate: ${orig === null ? "-" : orig + "%"}`;
                }
                return `${c.dataset.label}: ${c.parsed.y === null ? "-" : c.parsed.y.toLocaleString()}`;
              },
            },
          },
        },
        scales: {
          y: { beginAtZero: true, position: "left", title: { display: true, text: "천원", font: { size: 8.5 } }, ticks: { font: { size: 7.5 } }, grid: { color: "#eee" } },
          y1: { min: 0, max: RATE_MAX, position: "right", grid: { display: false }, ticks: { callback: (v) => v + "%", font: { size: 7.5 } }, title: { display: true, text: "Q-cost Rate", font: { size: 8.5 } } },
          x: { ticks: { font: { size: 7 } } },
        },
      },
      plugins: [{
        id: `p13Labels${i}`,
        afterDatasetsDraw(chart) {
          const { ctx } = chart;
          [0, 1].forEach(dsIndex => {
            const meta = chart.getDatasetMeta(dsIndex);
            chart.data.datasets[dsIndex].data.forEach((v, idx) => {
              if (v === null || v === undefined) return;
              const bar = meta.data[idx];
              ctx.save();
              ctx.font = "bold 7.5px sans-serif";
              ctx.fillStyle = dsIndex === 1 ? "#8a231f" : "#555";
              ctx.textAlign = "center";
              ctx.fillText(v.toLocaleString(), bar.x, bar.y - 4);
              ctx.restore();
            });
          });
        },
      }],
    });
  });

  // ---------- Q-Cost table ----------
  const table = document.getElementById("p13-table");
  const colgroup = `<colgroup>
    <col style="width:6%"><col style="width:9%"><col style="width:7%">
    ${Array(12).fill('<col style="width:5.6%">').join("")}
    <col style="width:8.8%">
  </colgroup>`;
  const thead = `<thead>
    <tr><th colspan="2" rowspan="2">구 분</th><th rowspan="2">2025년<br>(월평균)</th><th colspan="12">2026년</th><th rowspan="2">2026년<br>합계</th></tr>
    <tr>${months.map(m => `<th>${m}</th>`).join("")}</tr>
  </thead>`;

  function rowCells(item, opts) {
    opts = opts || {};
    return `${td(item.v2025, opts)}${item.m.map(v => td(v, opts)).join("")}${td(item.total, opts)}`;
  }

  let rows = "";
  D.groups.forEach(g => {
    const totalRows = 2 + 1 + g.items.length + 1 + 1 + 1;
    rows += `<tr class="section-start"><th class="row-group-label" rowspan="${totalRows}">${esc(g.label).split("\n").map(esc).join("<br>")}</th><th class="row-sub-label">목표</th>${rowCells(g.target)}</tr>`;
    rows += `<tr><th class="row-sub-label">실적</th>${rowCells(g.actual)}</tr>`;
    rows += `<tr><th class="row-sub-label txt-left p13-indent1">실패비용</th>${rowCells(g.failCost)}</tr>`;
    g.items.forEach(it => {
      rows += `<tr><th class="row-sub-label txt-left p13-indent2">${esc(it.label)}</th>${rowCells(it)}</tr>`;
    });
    rows += `<tr><th class="row-sub-label txt-left p13-indent1">평가비용</th>${rowCells(g.evalCost)}</tr>`;
    rows += `<tr><th class="row-sub-label txt-left p13-indent1">예방비용</th>${rowCells(g.prevCost)}</tr>`;
    rows += `<tr class="pct-row"><th class="row-sub-label">Q-cost Rate</th>${rowCells(g.rate, { unit: "%" })}</tr>`;
  });
  table.innerHTML = colgroup + thead + `<tbody>${rows}</tbody>`;

  function stackStickyHead(tbl) {
    const theadRows = tbl.querySelectorAll("thead tr");
    if (theadRows.length < 2) return;
    const row1Height = theadRows[0].getBoundingClientRect().height;
    theadRows[1].querySelectorAll("th").forEach(th => { th.style.top = `${row1Height}px`; });
  }
  requestAnimationFrame(() => stackStickyHead(table));
  let p13ResizeTimer;
  window.addEventListener("resize", () => {
    clearTimeout(p13ResizeTimer);
    p13ResizeTimer = setTimeout(() => stackStickyHead(table), 120);
  });

  // ---------- 4) 주요 이벤트 및 공지 사항 table ----------
  const eventTable = document.getElementById("p13-event-table");
  const eColgroup = `<colgroup><col style="width:12%"><col style="width:56%"><col style="width:14%"><col style="width:18%"></colgroup>`;
  const eThead = `<thead><tr><th>구 분</th><th>주요 업무 및 ISSUE</th><th>일정</th><th>비고</th></tr></thead>`;
  const eRows = D.eventTable.rows.map(r => `
    <tr>
      <th class="row-sub-label">${esc(r.category)}</th>
      <td class="txt-left p13-event-issue">${esc(r.issue).split("\n").map(esc).join("<br>")}</td>
      <td>${esc(r.schedule)}</td>
      <td>${esc(r.remarks)}</td>
    </tr>`).join("");
  eventTable.innerHTML = eColgroup + eThead + `<tbody>${eRows}</tbody>`;
}

// 부모 창(경영회의 뷰어)의 Q&A 기능이 iframe.contentWindow.REPORT로 데이터를 읽을 수 있도록 노출
window.REPORT = REPORT;

// ============ Init ============
renderPage4();
renderPage5();
renderPage6();
renderPage7();
renderPage8();
renderPage9();
renderPage10();
renderPage11();
renderPage12();
renderPage13();
