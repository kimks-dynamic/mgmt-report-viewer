const D = REPORT_PAGE4;
const FORECAST_IDX = D.forecastIndex;

function fmtNum(v, unit) {
  if (v === null || v === undefined) return null;
  const s = Number.isInteger(v) ? v.toLocaleString("ko-KR") : v.toLocaleString("ko-KR", { maximumFractionDigits: 1 });
  return unit ? s + unit : s;
}

function cellHtml(v, colIdx, unit, noForecast) {
  const isForecast = !noForecast && colIdx === FORECAST_IDX;
  if (v === null || v === undefined) {
    return `<td class="num blank">-</td>`;
  }
  const text = fmtNum(v, unit);
  if (isForecast) {
    return `<td class="num forecast">${text}</td>`;
  }
  return `<td class="num">${text}</td>`;
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

function buildGroup(groupLabel, group, sectionStart) {
  const rows = [
    { key: "사업계획", data: group.plan, pct: false, noForecast: true },
    { key: "수정계획", data: group.revised, pct: false, noForecast: true },
    { key: "실적", data: group.actual, pct: false, noForecast: false },
    { key: "%", data: group.pct, pct: true, noForecast: false },
  ];
  let html = "";
  rows.forEach((r, idx) => {
    const trClass = (idx === 0 && sectionStart ? "section-start " : "") + (r.pct ? "pct-row" : "");
    html += `<tr class="${trClass.trim()}">`;
    if (idx === 0) {
      html += `<th class="row-group-label" rowspan="4">${groupLabel}</th>`;
    }
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
    if (idx === 0) {
      html += `<th class="row-group-label" rowspan="5">${group.label}</th>`;
    }
    html += `<th class="row-sub-label">${r.key}</th>`;
    html += dataRowHtml(r.data, r.data.unit || "", { noForecast: r.noForecast });
    html += `</tr>`;
  });
  return html;
}

function renderTable() {
  const body = document.getElementById("table-body");
  let html = "";
  html += buildGroup(D.revenue.label, D.revenue, true);
  html += buildGroup(D.valueAdded.label, D.valueAdded, true);
  html += buildGroup(D.headcount.label, D.headcount, true);
  html += buildGroup(D.laborCost.label, D.laborCost, true);
  html += buildLaborIndicatorGroup(D.laborIndicators);
  body.innerHTML = html;
}

// ---------- Charts ----------
function actualWithForecastDataset(m) {
  // returns array length 12, values through last actual month kept, forecast month kept (drawn dashed via segment fn), rest null
  return m.slice();
}

function buildMainChart() {
  const ctx = document.getElementById("mainChart").getContext("2d");

  const revenuePlan = D.revenue.plan.m;
  const vaPlan = D.valueAdded.plan.m;
  const revenueRevised = D.revenue.revised.m;
  const vaRevised = D.valueAdded.revised.m;
  const revenueActual = actualWithForecastDataset(D.revenue.actual.m);
  const vaActual = actualWithForecastDataset(D.valueAdded.actual.m);

  const dashSegment = (ctx2) => (ctx2.p0DataIndex === FORECAST_IDX - 1 ? [6, 4] : undefined);

  new Chart(ctx, {
    type: "line",
    data: {
      labels: D.months,
      datasets: [
        {
          label: "사업계획매출",
          data: revenuePlan,
          borderColor: "#e08a86",
          backgroundColor: "#e08a86",
          borderWidth: 2,
          pointRadius: 0,
          tension: 0.3,
        },
        {
          label: "사업계획부가가치",
          data: vaPlan,
          borderColor: "#d46b66",
          backgroundColor: "#d46b66",
          borderWidth: 2,
          pointRadius: 0,
          tension: 0.3,
        },
        {
          label: "수정계획매출",
          data: revenueRevised,
          borderColor: "#7cb342",
          backgroundColor: "#7cb342",
          borderWidth: 2,
          pointRadius: 0,
          tension: 0.3,
        },
        {
          label: "수정계획부가가치",
          data: vaRevised,
          borderColor: "#558b2f",
          backgroundColor: "#558b2f",
          borderWidth: 2,
          pointRadius: 0,
          tension: 0.3,
        },
        {
          label: "매출실적",
          data: revenueActual,
          borderColor: "#2f6fed",
          backgroundColor: "#2f6fed",
          borderWidth: 3,
          pointRadius: (c) => (c.dataIndex === FORECAST_IDX ? 5 : 4),
          pointStyle: (c) => (c.dataIndex === FORECAST_IDX ? "circle" : "rectRot"),
          pointBackgroundColor: (c) => (c.dataIndex === FORECAST_IDX ? "#fff" : "#2f6fed"),
          pointBorderColor: "#2f6fed",
          pointBorderWidth: 2,
          segment: { borderDash: dashSegment },
          tension: 0.3,
          spanGaps: true,
        },
        {
          label: "부가가치실적",
          data: vaActual,
          borderColor: "#1a3fa0",
          backgroundColor: "#1a3fa0",
          borderWidth: 3,
          pointRadius: (c) => (c.dataIndex === FORECAST_IDX ? 5 : 4),
          pointStyle: (c) => (c.dataIndex === FORECAST_IDX ? "circle" : "triangle"),
          pointBackgroundColor: (c) => (c.dataIndex === FORECAST_IDX ? "#fff" : "#1a3fa0"),
          pointBorderColor: "#1a3fa0",
          pointBorderWidth: 2,
          segment: { borderDash: dashSegment },
          tension: 0.3,
          spanGaps: true,
        },
      ],
    },
    options: {
      responsive: true,
      maintainAspectRatio: false,
      interaction: { mode: "index", intersect: false },
      plugins: {
        legend: { display: false },
        tooltip: {
          callbacks: {
            label: (c) => `${c.dataset.label}: ${c.parsed.y === null ? "-" : c.parsed.y.toLocaleString()} 백만원`,
          },
        },
        title: { display: false },
      },
      scales: {
        y: {
          title: { display: true, text: "억원" },
          ticks: {
            callback: (v) => v.toLocaleString(),
          },
          grid: { color: "#eee" },
        },
        x: { grid: { display: false } },
      },
    },
    plugins: [valueLabelPlugin()],
  });
}

function valueLabelPlugin() {
  return {
    id: "actualValueLabels",
    afterDatasetsDraw(chart) {
      const { ctx } = chart;
      [4, 5].forEach((dsIndex) => {
        const meta = chart.getDatasetMeta(dsIndex);
        const dataset = chart.data.datasets[dsIndex];
        meta.data.forEach((point, i) => {
          const v = dataset.data[i];
          if (v === null || v === undefined) return;
          ctx.save();
          ctx.font = "bold 11px sans-serif";
          ctx.fillStyle = i === FORECAST_IDX ? "#c62828" : "#333";
          ctx.textAlign = "center";
          const label = i === FORECAST_IDX ? `(${v.toLocaleString()})` : v.toLocaleString();
          ctx.fillText(label, point.x, point.y - 10);
          ctx.restore();
        });
      });
    },
  };
}

function buildLegend() {
  const items = [
    { label: "사업계획매출", color: "#e08a86", dashed: false, marker: null },
    { label: "사업계획부가가치", color: "#d46b66", dashed: false, marker: null },
    { label: "매출실적", color: "#2f6fed", dashed: true, marker: "◆" },
    { label: "부가가치실적", color: "#1a3fa0", dashed: false, marker: "▲" },
    { label: "수정계획매출", color: "#7cb342", dashed: false, marker: null },
    { label: "수정계획부가가치", color: "#558b2f", dashed: false, marker: null },
  ];
  const wrap = document.getElementById("main-legend");
  wrap.innerHTML = items.map(it => `
    <div class="legend-item">
      <span class="legend-swatch${it.dashed ? " dashed" : ""}" style="border-color:${it.color}">
        ${it.marker ? `<span class="marker" style="color:${it.color}">${it.marker}</span>` : ""}
      </span>
      <span>${it.label}</span>
    </div>
  `).join("");
}

function buildSideChart() {
  const ctx = document.getElementById("sideChart").getContext("2d");
  new Chart(ctx, {
    type: "bar",
    data: {
      labels: D.annualBar.labels,
      datasets: [{
        data: D.annualBar.values,
        backgroundColor: ["#4472c4", "#c0504d", "#77933c", "#8064a2"],
        borderRadius: 2,
        maxBarThickness: 60,
      }],
    },
    options: {
      responsive: true,
      maintainAspectRatio: false,
      plugins: {
        legend: { display: false },
        tooltip: { enabled: true },
      },
      scales: {
        y: { beginAtZero: true, grid: { color: "#eee" } },
        x: { grid: { display: false } },
      },
    },
    plugins: [{
      id: "barValueLabels",
      afterDatasetsDraw(chart) {
        const { ctx } = chart;
        const meta = chart.getDatasetMeta(0);
        meta.data.forEach((bar, i) => {
          const v = chart.data.datasets[0].data[i];
          ctx.save();
          ctx.font = "bold 12px sans-serif";
          ctx.fillStyle = "#333";
          ctx.textAlign = "center";
          ctx.fillText(v.toLocaleString(), bar.x, bar.y - 8);
          ctx.restore();
        });
      },
    }],
  });
}

renderTable();
buildLegend();
buildMainChart();
buildSideChart();
