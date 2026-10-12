// 경영회의 2026년 08월 보고서 - 전체 페이지 데이터
// 출처: D:\AI\경영회의\1.경영회의(2026년08월)_보고서.pdf (텍스트 추출 후 교차검증)
// 일부 표(페이지 8 우측 소표 등)는 원본 PDF의 텍스트 추출이 손상되어 있어 제외했습니다 (화면에 안내 문구 표시).

const REPORT = {};

// ---------------- Page 4: 매출/부가가치/인원 현황 ----------------
REPORT.page4 = {
  months: ["1월","2월","3월","4월","5월","6월","7월","8월","9월","10월","11월","12월"],
  forecastIndex: 8,
  revenue: {
    label: "매출\n(백만원)",
    plan:    { yr: 102679, avg: 8557,  m: [10333,8103,10873,10654,10013,9872,10586,5699,9210,10568,10113,10400], cum: 76132, total: 116422 },
    revised: { yr: 122780, avg: 10232, m: [12546,10108,13094,13598,11339,11949,11228,5533,9284,9866,9397,9739],  cum: 89395, total: 127681 },
    actual:  { yr: 122546, avg: 10212, m: [12546,10108,13094,13598,11339,11949,11513,6978,10269,null,null,null], cum: 91126, total: 91126 },
    pct:     { yr: 119, avg: 119, m: [121,125,120,128,113,121,103,126,111,null,null,null], cum: 102, total: 71 },
  },
  valueAdded: {
    label: "부가가치\n(백만원)",
    plan:    { yr: 35232, avg: 2936, m: [3601,2845,3822,3729,3502,3451,3740,1958,3236,3729,3527,3621], cum: 26649, total: 40762 },
    revised: { yr: 40076, avg: 3340, m: [4258,3493,4781,4712,3919,4091,3876,1878,3345,3474,3230,3358],  cum: 31009, total: 44416 },
    actual:  { yr: 40323, avg: 3360, m: [4258,3493,4781,4712,3919,4091,4050,2460,3592,null,null,null],  cum: 31765, total: 31765 },
    pct:     { yr: 114, avg: 114, m: [118,123,125,126,112,119,104,131,107,null,null,null], cum: 102, total: 72 },
  },
  headcount: {
    label: "인원현황\n(명)",
    plan:    { yr: 373, avg: 373, m: [369,366,371,368,369,365,360,357,371,371,366,366], cum: 366, total: 367 },
    revised: { yr: 370, avg: 370, m: [361,360,360,360,358,357,357,357,357,343,343,343], cum: 359, total: 355 },
    actual:  { yr: 368, avg: 368, m: [361,360,360,360,358,357,361,362,362,null,null,null], cum: 360, total: 360 },
    pct:     { yr: 99, avg: 99, m: [98,98,97,98,97,98,101,101,101,null,null,null], cum: 100, total: 101 },
  },
  laborCost: {
    label: "인건비",
    plan:    { yr: 26429, avg: 2202, m: [2413,2358,2437,2288,2502,2195,2251,2033,2424,2480,2265,2258], cum: 18477, total: 27904 },
    revised: { yr: 27906, avg: 2325, m: [2586,2294,2759,2652,2604,2806,2484,2084,2396,2377,2187,2175],  cum: 20269, total: 29403 },
    actual:  { yr: 28528, avg: 2377, m: [2586,2294,2759,2652,2604,2806,2482,2118,2432,null,null,null],  cum: 20302, total: 20302 },
    pct:     { yr: 108, avg: 108, m: [107,97,113,116,104,128,100,102,102,null,null,null], cum: 100, total: 69 },
  },
  laborIndicators: {
    label: "인건비 지표\n(실적)",
    perCapita:   { yr: 77.5, avg: 6.5, m: [7.2,6.4,7.7,7.4,7.3,7.9,6.9,5.9,6.7,null,null,null], cum: 56.4, total: 56.4, unit: "" },
    laborRate:   { yr: 23.3, avg: 23.3, m: [20.6,22.7,21.1,19.5,23.0,23.5,21.6,30.4,23.7,null,null,null], cum: 22.3, total: 22.3, unit: "%" },
    distribRate: { yr: 70.7, avg: 70.7, m: [60.7,65.7,57.7,56.3,66.4,68.6,61.3,86.1,67.7,null,null,null], cum: 63.9, total: 63.9, unit: "%" },
    overtime:    { yr: 39.9, avg: 39.9, m: [62.3,45.4,57.4,61.2,62.7,50.6,37.6,10,28.0,null,null,null], cum: 48.4, total: 48.4, unit: "" },
    overtimePrevYear: { yr: 40.0, avg: 40.0, m: [38.0,31.2,44.3,32.0,62.6,50.8,38.4,11.8,16.3,55.9,39.8,58.7], cum: 38.6, total: 40.0, unit: "" },
  },
  annualBar: { labels: ["전년매출", "사업계획", "수정계획", "년간예상"], values: [1225, 1164, 1277, 1304] },
};

// ---------------- Page 5: 매출 상세 증감 현황 ----------------
// 출처: D:\AI\경영회의\1.경영회의(2026년08월)_보고서.xlsx 시트 "매출분석" (원본 PDF 텍스트 추출 손상분 보정)
// 열 순서: [8월 생산(수정계획,실적,증감,%)] [8월 매출(수정계획,실적,증감,%)] [9월 생산(수정계획,실행계획,증감,%)] [9월 매출(수정계획,실행계획,증감,%)] [전월대비 매출(증감,%)]
REPORT.page5 = {
  unitHeader: "수량\n단위",
  currentMonthLabel: "8월",
  nextMonthLabel: "9월",
  total: { label: "합 계", v: [65591,46501,-19090,-29, 5533,6978,1445,26, 135000,97069,-37931,-28, 9284,10269,985,11, 3291,47] },
  groups: [
    {
      label: "자동차",
      subtotal: { v: [38991,46501,7510,19, 5355,6978,1623,30, 135000,97069,-37931,-28, 9284,10269,985,11, 3291,47] },
      items: [
        { customer: "GMK 부평", customerRowspan: 1, model: "9BUX/9BQB", unit: "대분", v: [4452,7077,2625,59, 967,1491,524,54, 17481,20886,3405,19, 3501,4075,573,16, 2584,173] },
        { customer: "GMK 창원", customerRowspan: 1, model: "9BQC", unit: "대분", v: [14065,17822,3757,27, 2841,3686,845,30, 17763,20629,2866,16, 3664,4266,602,16, 580,16] },
        { customer: "GM", customerRowspan: 1, model: "C121", unit: "대분", v: [2700,2700,0,0, 632,706,74,12, 3348,2606,-742,-22, 784,631,-153,-19, -75,-11] },
        { customer: "RKM", customerRowspan: 3, model: "LJL", unit: "대분", v: [1524,993,-531,-35, 51,33,-18,-35, 1303,1661,358,27, 44,56,12,27, 22,67] },
        { customer: null, model: "AURORA-1", unit: "대분", v: [1983,1229,-754,-38, 210,137,-73,-35, 1999,2005,6,0, 213,218,5,2, 81,59] },
        { customer: null, model: "AURORA-2", unit: "대분", v: [260,54,-206,-79, 27,5,-22,-80, 784,179,-605,-77, 79,18,-61,-77, 12,231] },
        { customer: "HMC", customerRowspan: 1, model: "US4", unit: "대분", v: [90,97,7,8, 256,276,20,8, 108,100,-8,-7, 307,284,-23,-7, 9,3] },
        { customer: "KGM", customerRowspan: 1, model: "Y450", unit: "대분", v: [0,0,0,0, 0,0,0,0, 542,600,58,11, 38,40,3,7, 40,0] },
        { customer: "EXPORT", customerRowspan: 2, model: "GSV-EM", unit: "대분", v: [8775,16529,7754,88, 279,566,287,103, 11700,16681,4981,43, 372,530,158,43, -36,-6] },
        { customer: null, model: "SEAT", unit: "대분", v: [5142,0,-5142,-100, 94,0,-94,-100, 9972,1722,-8250,-83, 133,87,-45,-34, 87,0] },
        { customer: "A/S", customerRowspan: 1, model: null, unit: null, v: [null,null,null,null, 0,78,78,0, 70000,30000,-40000,-57, 151,65,-86,-57, -13,-17] },
      ],
    },
    {
      label: "SOLAR",
      subtotal: { v: [26600,0,-26600,-100, 178,0,-178,-100, 0,0,0,0, 0,0,0,0, 0,0] },
      items: [
        { merged: true, label: "AUSTEM AMERICA\n(STAMPING)", unit: "EA", v: [26600,0,-26600,-100, 178,0,-178,-100, 0,0,0,0, 0,0,0,0, 0,0] },
        { merged: true, label: "NOBULL ENERGY\n(H-BEAM)", unit: "EA", v: [0,0,0,0, 0,0,0,0, 0,0,0,0, 0,0,0,0, 0,0] },
      ],
    },
  ],
};

// ---------------- Page 6: 사업부문별 상세현황 ----------------
// v: [7월실적, 8월수정계획,8월실적,8월%,8월전월대비, 9월수정계획,9월실행계획,9월%,9월전월대비]
REPORT.page6 = {
  prevMonthLabel: "7월",
  currentMonthLabel: "8월",
  nextMonthLabel: "9월",
  // 차량생산: 자체 합계 없음 (부평/창원/KGM/RKM 실적만)
  vehicleGroupLabel: "차량생산",
  vehicleRows: [
    { name: "부평", v: [20492, 4452,7077,159,35, 17481,20886,119,295], note8: "* 전공장 노후 설비교체 및 라인개선공사(8/1~8/22)", note9: "", shift: "2shift" },
    { name: "창원", v: [21238, 14065,17822,127,84, 17763,20629,116,116], note8: "", note9: "", shift: "2shift" },
    { name: "KGM 모빌리티", v: [264, null,null,0,0, 542,600,111,0], note8: "* 3조립 SE10(렉스턴 후속) 라인공사(8/1~8/20)", note9: "", shift: "2shift" },
    { name: "RKM", v: [6704, 3767,2276,60,34, 4086,3845,94,169], note8: "", note9: "", shift: "1shift" },
  ],
  // 매출: 총계(11,513 등) + Wheel/Body/Chassis/Module/Seat/Solar
  salesGroupLabel: "매출",
  salesTotal: { v: [11513, 5533,6978,126,61, 9284,10269,111,147] },
  salesRows: [
    { name: "Wheel", v: [768, 372,504,135,66, 690,726,105,144], note8: "* 증가(GMK)", note9: "* 증가(GMK)" },
    { name: "Body", v: [3, null,null,0,0, 151,65,43,0], note8: "", note9: "* D2UB B-Pin A/S 분할공급(2회)" },
    { name: "Chassis", v: [7238, 3401,4535,133,63, 5792,6551,113,144], note8: "* 증가(GMK), 감소(RKM)", note9: "* 증가(GMK), 감소(C121)" },
    { name: "Module", v: [381, 154,191,124,50, 338,386,114,202], note8: "* 증가(GMK)", note9: "* 증가(GMK)" },
    { name: "Seat", v: [2592, 1427,1748,122,67, 2313,2542,110,145], note8: "* 증가(GMK), 감소(직수출)", note9: "* 증가(GMK), 감소(직수출)" },
    { name: "Solar", v: [531, 178,null,0,0, null,0,0,0], note8: "* 감소(사출물)", note9: "" },
  ],
  // 직접인원: 총계(193 등) + Wheel/Body/Chassis/Module/Seat
  headcountGroupLabel: "직접인원",
  headcountTotal: { v: [193, 196,193,98,null, 196,193,98,null] },
  headcountRows: [
    { name: "Wheel", v: [22, 22,22,100,null, 22,22,100,null] },
    { name: "Body", v: [21, 24,21,88,null, 24,21,88,null] },
    { name: "Chassis", v: [75, 74,75,101,null, 74,75,101,null] },
    { name: "Module", v: [30, 30,30,100,null, 30,30,100,null] },
    { name: "Seat", v: [45, 46,45,98,null, 46,45,98,null] },
  ],
};

// ---------------- Page 7: 환율 변동 Impact ----------------
// v: [년간(2025), 월평균(2025), 1월..8월 실적, 9월(예상,forecast), 누계]
REPORT.page7 = {
  months: ["1월","2월","3월","4월","5월","6월","7월","8월","9월","10월","11월","12월"],
  forecastIndex: 8,
  fxRate: {
    planYear2025: 1250, plan2026: 1300, // 사업계획 환율: 2025 년간 1,250원 / 2026 전체 1,300원(고정)
    actualYear2025: 1423, // 실적(월평균) 환율: 2025 년간 평균
    actualMonthly: [1457,1451,1492,1486,1490,1531,1489,1406,1394,null,null,null], // 2026년 1~9월(9월은 예상)
  },
  revenue: {
    rows: [
      { name: "Wheel", v: [1,0, 0,0,0,0,0,0,0,0,0, null,null,null, 0] },
      { name: "Chassis", v: [763,64, 105,112,224,186,101,223,189,94,84, null,null,null, 1233], note: "GSV-EM, C121" },
      { name: "Seat", v: [276,23, 13,15,22,22,24,19,11,0,7, null,null,null, 126], note: "H62X, GMI31UX" },
      { name: "Solar", v: [1182,98, 99,45,19,68,36,25,73,0,0, null,null,null, 365] },
    ],
    total: { v: [2221,185, 217,172,265,276,161,268,273,94,91, null,null,null, 1725] },
  },
  valueAdded: {
    rows: [
      { name: "Wheel", v: [1,0, 0,0,0,0,0,0,0,0,0, null,null,null, 0] },
      { name: "Chassis", v: [667,56, 87,97,200,164,85,207,168,89,75, null,null,null, 1098], note: "9BUX & AURORA Bush" },
      { name: "Seat", v: [276,23, 13,15,22,22,24,19,11,0,7, null,null,null, 126] },
      { name: "Solar", v: [776,65, 59,26,10,43,21,17,11,0,0, null,null,null, 187], note: "관세 & DDP 운반비" },
    ],
    total: { v: [1719,143, 160,138,232,230,130,243,189,89,82, null,null,null, 1410] },
  },
  duty: {
    rateNote: "관세율: 25% → 50% (2025년 중 인상), 2026년 1~8월 50% 유지 (Steel 50%, 사출 15%)",
    rows: [
      { name: "Solar", v: [2669,222, 271,143,56,151,92,40,0,0,0, null,null,null, 753] },
    ],
  },
};

// ---------------- Page 8: 전월 실적 및 당월 예상 손익 현황 ----------------
REPORT.page8 = {
  columns: ["07월 실적","08월 실행계획","08월 실적","실행계획대비","누적 실적(~08월)","09월 실행계획","전월실적 대비"],
  rows: [
    { label: "매출액", level: 0, bold: true, note: "",
      cells: [[11513,100.0],[5945,100.0],[6978,100.0],[1034,17.4],[91126,100.0],[10269,100.0],[3291,47.2]] },
    { label: "자동차", level: 1,
      cells: [[10982,95.4],[5945,100.0],[6978,100.0],[1034,17.4],[88073,96.6],[10269,100.0],[3291,47.2]] },
    { label: "solar", level: 1,
      cells: [[531,4.6],[0,0.0],[0,0.0],[0,0.0],[3053,3.4],[0,0.0],[0,0.0]] },
    { label: "부가가치", level: 0, bold: true,
      cells: [[4050,35.2],[2118,35.6],[2460,35.2],[341,16.1],[31765,34.9],[3592,35.0],[1132,46.0]] },
    { label: "자동차", level: 1,
      cells: [[4012,34.8],[2118,35.6],[2460,35.2],[341,16.1],[31690,34.8],[3592,35.0],[1132,46.0]] },
    { label: "solar", level: 1,
      cells: [[38,0.3],[0,0.0],[0,0.0],[0,0.0],[74,0.1],[0,0.0],[0,0.0]] },
    { label: "매출원가", level: 0, bold: true,
      cells: [[10852,94.3],[6549,110.2],[7506,107.6],[957,14.6],[86355,94.8],[9790,95.3],[2284,30.4]],
      note: "※환율적용기준: 1)08월환율효과 89백만원(부가가치기준)_손익반영" },
    { label: "재료비", level: 1,
      cells: [[7463,64.8],[3826,64.4],[4519,64.8],[693,18.1],[59361,65.1],[6677,65.0],[2158,47.8]] },
    { label: "노무비", level: 1,
      cells: [[2019,17.5],[1676,28.2],[1666,23.9],[-10,-0.6],[16564,18.2],[1972,19.2],[306,18.4]] },
    { label: "정규", level: 2,
      cells: [[1681,14.6],[1482,24.9],[1436,20.6],[-46,-3.1],[14020,15.4],[1670,16.3],[234,16.3]],
      note: "(9)월 학자금 134백만원 포함" },
    { label: "도급", level: 2,
      cells: [[338,2.9],[194,3.3],[230,3.3],[36,18.4],[2544,2.8],[302,2.9],[72,31.3]] },
    { label: "제조경비", level: 1,
      cells: [[1370,11.9],[1047,17.6],[1321,18.9],[274,26.2],[10430,11.4],[1140,11.1],[-180,-13.7]] },
    { label: "인건비성 경비", level: 2,
      cells: [[274,2.4],[200,3.4],[256,3.7],[56,27.8],[2064,2.3],[232,2.3],[-24,-9.3]] },
    { label: "수선/소모품비", level: 2,
      cells: [[319,2.8],[244,4.1],[405,5.8],[161,66.2],[2388,2.6],[210,2.0],[-195,-48.1]],
      note: "하계휴가 공사비(225백만원) 외" },
    { label: "전력비", level: 2,
      cells: [[320,2.8],[220,3.7],[274,3.9],[54,24.5],[2311,2.5],[260,2.5],[-14,-5.1]] },
    { label: "감가상각", level: 2,
      cells: [[182,1.6],[182,3.1],[182,2.6],[0,0.0],[1456,1.6],[182,1.8],[0,0.0]] },
    { label: "포장비", level: 2,
      cells: [[96,0.8],[66,1.1],[67,1.0],[1,1.5],[622,0.7],[65,0.6],[-2,-3.0]] },
    { label: "연료비", level: 2,
      cells: [[52,0.5],[30,0.5],[25,0.4],[-5,-15.5],[615,0.7],[42,0.4],[16,64.6]] },
    { label: "기타", level: 2,
      cells: [[127,1.1],[105,1.8],[112,1.6],[7,6.4],[975,1.1],[150,1.5],[38,33.8]],
      note: "9월 화재보험 40백만원" },
    { label: "고철매각", level: 1,
      cells: [[389,3.4],[143,2.4],[247,3.5],[104,72.3],[2581,2.8],[363,3.5],[116,47.2]] },
    { label: "매출총이익", level: 0, bold: true,
      cells: [[1050,9.1],[-461,-7.8],[-280,-4.0],[181,-39.2],[7352,8.1],[843,8.2],[1123,-400.7]] },
    { label: "판매관리비", level: 0, bold: true,
      cells: [[1006,8.7],[730,12.3],[830,11.9],[100,13.6],[7103,7.8],[886,8.6],[57,6.8]] },
    { label: "인건비", level: 1,
      cells: [[461,4.0],[408,6.9],[452,6.5],[44,10.8],[3736,4.1],[460,4.5],[8,1.8]] },
    { label: "운반비", level: 1,
      cells: [[37,0.3],[22,0.4],[23,0.3],[1,4.5],[300,0.3],[34,0.3],[11,47.8]] },
    { label: "기타", level: 1,
      cells: [[508,4.4],[300,5.0],[355,5.1],[55,18.2],[3067,3.4],[392,3.8],[38,10.7]],
      note: "7월 감사보수료 중도금 75백만원" },
    { label: "영업이익", level: 0, bold: true, emphasize: true,
      cells: [[44,0.4],[-1191,-20.0],[-1110,-15.9],[81,6.8],[249,0.3],[-43,-0.4],[1066,96.1]] },
  ],
};

// ---------------- Page 9: 신규 Project 진행 현황 ----------------
REPORT.page9 = {
  groups: [
    {
      plant: "Cheon-an", commodity: "Wheel", customer: "현대/기아",
      projects: [
        {
          project: "LW1",
          rows: [
            { pname: "Steel Wheel (16×6.5J, 4.25T)",
              tko: "25-9-17", d1: { v: "26-4-6", state: "green" }, line: "26-3-19", pvStart: "26-3-30",
              pvDone: { v: "28-7-15", note: "품질 육성", state: "black" }, ppap: "28-10-15", run: "28-12-18", sorp: "29-1-15",
              recPlan: null, recActual: null, recDate: null,
              invPlan: 656, invActual: 266, invRate: 41,
              remarks: "부품가 감가상각" },
            { pname: "Steel Wheel (16×6.5J, 3.5T)",
              tko: "25-12-17", d1: { v: "26-7-1", state: "green" }, line: "26-5-15", pvStart: "26-6-8",
              pvDone: { v: "27-1-1", note: "품질 육성", state: "black" }, ppap: "27-3-15", run: "27-5-15", sorp: "27-6-30",
              recPlan: null, recActual: null, recDate: null,
              invPlan: 195, invActual: 195, invRate: 100,
              remarks: "부품가 감가상각" },
            { pname: "Steel Wheel (14×4.5J)",
              tko: "26-1-28", d1: { v: "26-7-1", state: "green" }, line: "26-6-19", pvStart: "26-6-29",
              pvDone: { v: "27-3-15", note: "품질 육성", state: "black" }, ppap: "27-6-15", run: "27-8-15", sorp: "27-9-15",
              recPlan: null, recActual: null, recDate: null,
              invPlan: 230, invActual: 230, invRate: 100,
              remarks: "부품가 감가상각" },
          ],
        },
        {
          project: "AX EV STYLED",
          rows: [
            { pname: "Steel Wheel (15x5.5J)",
              tko: { v: "26-4-30", state: "green" }, d1: "26-11-18", line: { v: "26-10-30", note: "Tooling", state: "black" }, pvStart: "27-7-5",
              pvDone: "27-8-27", ppap: "27-12-1", run: "27-12-1", sorp: "28-1-2",
              recPlan: null, recActual: null, recDate: null,
              invPlan: 323, invActual: 323, invRate: 100,
              remarks: "부품가 감가상각 · Tooling" },
          ],
        },
      ],
    },
    {
      plant: "Cheon-an", commodity: "EV", customer: "삼성SDI",
      mergeGroupCols: true,
      groupRecovery: { plan: 1134, actual: null, date: "2026-10" },
      groupInvest: { plan: 2214, actual: 1980, rate: 89 },
      groupRemarks: "총 투자비 : 3,223.4\n1. 재료비 : 949.2\n2. 경비 : 59.8\n3. 투자비 : 2,214.4",
      projects: [
        {
          project: "E092 KF1\n(Proto)",
          rows: [
            { pname: "Housing UPR",
              tko: "26-3-16", d1: { v: "26-7-10", state: "green" }, line: "26-5-22", pvStart: "26-6-24",
              pvDone: { v: "26-9-13", note: "B1 SPL 제작 완료", state: "black" }, ppap: "28-3-10", run: "28-9-8", sorp: "29-4-2" },
            { pname: "Housing LWR",
              tko: "26-3-16", d1: { v: "26-7-10", state: "green" }, line: "26-5-22", pvStart: "26-6-24",
              pvDone: { v: "26-9-13", note: "B1 SPL 제작 완료", state: "black" }, ppap: "28-3-10", run: "28-9-8", sorp: "29-4-2" },
            { pname: "ENDPLATE FRT/RR",
              tko: "26-3-16", d1: { v: "26-7-10", state: "green" }, line: "26-5-22", pvStart: "26-6-24",
              pvDone: { v: "26-8-28", note: "B1 SPL 제작 완료", state: "black" }, ppap: "28-3-10", run: "28-9-8", sorp: "29-4-2" },
          ],
        },
      ],
    },
    {
      plant: "Plymouth", commodity: "Solar", customer: "Nevados",
      projects: [
        {
          project: "Nevados",
          rows: [
            { pname: "Retention",
              tko: "25-12-29", d1: "26-7-9", line: { v: "26-5-15", state: "green" }, pvStart: "N/A",
              pvDone: "N/A", ppap: { v: "26-8-31", note: "생산 안정화", state: "black" }, run: "N/A", sorp: "26-11-2",
              recPlan: 418, recActual: null, recDate: "2026-10",
              invPlan: 418, invActual: 365, invRate: 87,
              remarks: "" },
            { pname: "Articulating Coupler",
              tko: "25-12-29", d1: "26-7-20", line: { v: "26-6-19", state: "green" }, pvStart: "N/A",
              pvDone: "N/A", ppap: { v: "26-8-31", note: "생산 안정화", state: "black" }, run: "N/A", sorp: "26-11-2",
              recPlan: 1643, recActual: null, recDate: "2026-10",
              invPlan: 1643, invActual: 1212, invRate: 74,
              remarks: "" },
            { pname: "Mechanical Stop",
              tko: { v: "26-5-6", state: "green" }, d1: { v: "26-9-11", note: "해상 운송중", state: "black" }, line: "26-9-30", pvStart: "N/A",
              pvDone: "N/A", ppap: "N/A", run: "N/A", sorp: "26-12-1",
              recPlan: 245, recActual: null, recDate: "2026-12",
              invPlan: 245, invActual: 67, invRate: 27,
              remarks: "" },
          ],
        },
      ],
    },
  ],
};

// ---------------- Page 10: 국내 투자비 현황 ----------------
REPORT.page10 = {
  months: ["1월", "2월", "3월", "4월", "5월", "6월", "7월", "8월", "9월", "10월", "11월", "12월"],
  chart: {
    monthlyActual: [2802, 121, 397, 2183, 203, 645, 88, 39, null, null, null, null],
    cumPlan:       [3874, 4396, 4396, 4736, 4781, 4791, 4791, 4851, 4851, 4851, 4851, 4861],
    cumExecuted:   [3885, 4407, 4763, 7388, 7500, 8136, 8148, 8295, 8295, 8295, 8295, 8305],
    cumActual:     [2802, 2923, 3319, 5502, 5705, 6350, 6438, 6477, null, null, null, null],
  },
  remainingByCategory: {
    labels: ["Wheel", "북미", "EV", "Chassis", "Seat", "공통", "Module"],
    values: [355, 516, 234, 297, 227, 50, 0],
  },
  recoveryByYear: {
    years: ["2026년", "2027년"],
    plan:   [6092, 195],
    actual: [2789, 0],
  },
  table: {
    groups: [
      {
        label: "합계", labelSpan: 4, valsSpan: 4,
        planDelta: 3494, execSaving: -148, cancel: 50, remaining: 1680,
        rows: [
          { sub: "사업계획", y2025: 5071, months: [3874, 522, null, 340, 45, 10, null, 60, null, null, null, 10], total: 4861,
            recovery: { y2025: 15502, y2026: 4875, y2027: 23, total: 20399 } },
          { sub: "실행계획", y2025: 6031, months: [3885, 522, 355, 2625, 113, 636, 12, 147, null, null, null, 10], total: 8305,
            recovery: { y2025: 15966, y2026: 6092, y2027: 195, total: 22252 } },
          { sub: "실적", y2025: 5710, months: [2802, 121, 397, 2183, 203, 645, 88, 39, null, null, null, null], total: 6477,
            recovery: { y2025: 15966, y2026: 2789, y2027: null, total: 18755 } },
          { sub: "%", isPct: true, y2025: 95, months: [72, 23, 112, 83, 180, 101, 755, 27, null, null, null, null], total: 78,
            recovery: { y2025: 100, y2026: 46, y2027: null, total: 84 } },
        ],
      },
      {
        label: "국내", labelSpan: 3, valsSpan: 3,
        planDelta: 3494, execSaving: -3, cancel: 50, remaining: 1163,
        rows: [
          { sub: "사업계획", y2025: 5071, months: [1569, 522, null, 340, 45, 10, null, 60, null, null, null, 10], total: 2556,
            recovery: { y2025: 15502, y2026: 1864, y2027: 23, total: 17388 } },
          { sub: "실행계획", y2025: 5323, months: [1580, 522, 355, 2625, 113, 636, 12, 147, null, null, null, 10], total: 6000,
            recovery: { y2025: 15966, y2026: 3081, y2027: 195, total: 19242 } },
          { sub: "실적", y2025: 5011, months: [1341, 121, 355, 2183, 128, 645, 21, 39, null, null, null, null], total: 4833,
            recovery: { y2025: 15966, y2026: 880, y2027: null, total: 16846 } },
        ],
      },
      {
        label: "해외\n선투자", labelSpan: 3, valsSpan: 3,
        planDelta: null, execSaving: -145, cancel: null, remaining: 516,
        rows: [
          { sub: "사업계획", y2025: null, months: [2305, null, null, null, null, null, null, null, null, null, null, null], total: 2305,
            recovery: { y2025: null, y2026: 3011, y2027: null, total: 3011 } },
          { sub: "실행계획", y2025: 708, months: [2305, null, null, null, null, null, null, null, null, null, null, null], total: 2305,
            recovery: { y2025: null, y2026: 3011, y2027: null, total: 3011 } },
          { sub: "실적", y2025: 699, months: [1461, null, 41, null, 75, null, 67, null, null, null, null, null], total: 1644,
            recovery: { y2025: null, y2026: 1909, y2027: null, total: 1909 } },
        ],
      },
    ],
  },
  notes: [
    "1. 2026년 실행계획 투자비: 8,305백만원 (사업계획 4,861백만원 + 추가계획 3,494백만원 - 투자취소 50백만원)",
    "2. (08월) 실적: 39.3백만원 — 유동금속 이관에 따른 이관금형 개선비 35백만원, KF1 B-SPL 개발 2.5백만원, 영업팀 신규입사자 노트북 구매 1.8백만원",
    "3. 고객사 회수 계획: 6,092백만원 — 우즈벡 GSV EM RETOOL'G 잔금 10%(241.3백만원), UZAUTO GEM BSUV FRT CRADLE RETOOLING 중도금/잔금 50%(683백만원), C1xx Top cover B sample Tooling(38백만원), 9BQX FLANGE-EXH PIPE ASM 중도금2차(23백만원), 9BU/Qx TRACK ASM 2025 RETOOLING 금형비(83백만원), US4 설변 및 안전기준 강화 금형비(880백만원), 북미 오스템아메리카 선투자 회수(3,011백만원), KF1 B-Sample Tooling(1,110백만원)",
    "4. 고객사 회수 실적: 2,789백만원 — 국내 880백만원(US4 설계변경 & 안전기준 강화 금형비+ED&D 100% 회수), 해외(북미 선투자) 1,909백만원(태양광 조립라인 및 NEVADOS BEARING 투자 일부 회수)",
  ],
};

// ---------------- Page 11: 투자비 상세 현황 ----------------
REPORT.page11 = {
  groups: [
    { category: "Wheel", item: "LW1", plan: 794, extra: 35, cancel: 50, total: 779, actual: 438, rate: 56, saving: 340, unexecuted: 1,
      remarks: "LW1 STEEL WHEEL 16인치 설계 변경 및 이원화 개발(180/180), LW1 STEEL WHEEL 14X4.5J 개발(224.1/223), LW1 STEEL WHEEL 16인치 설계 변경(13/13), TOP-COATING SPRAY BOOTH 개선(340), DISC 3.5TON 설계변경(15/15), DISC 3종 고객 납품 제품제작(7/7) / 투자취소: RIM LINE 2차 설비 개선(50)" },
    { category: "Wheel", item: "AX EV STYELD", plan: null, extra: 323, cancel: null, total: 323, actual: 323, rate: 100, saving: null, unexecuted: null,
      remarks: "HKMC AX EV STYELD STEEL WHEEL DISC(15X5.5J) 양산개발(235/235), RIM(15X5.5J) 양산개발(75/75), 검사구(15X5.5J) 양산개발(8/8), ASSY(15X5.5J) 양산개발(5/5)" },
    { category: "Wheel", item: "기타", plan: 15, extra: 273, cancel: null, total: 288, actual: 273, rate: 95, saving: null, unexecuted: 15,
      remarks: "1공장 콤프레샤 연동시스템 설치 및 응축수 드레인 트랩 설치(15) / 추가: 3500T PRESS 동력전달계통(DRIVE GEAR PARTS) 수리(61/61), 3500TON PRESS의 정상상태 복원을 위한 DRIVE GEAR 신착/교체(200/200), 3500톤 450KW 메인모터 소손 수리(11.6/11.6)" },
    { category: "EV", item: "KF1 B-sample", plan: null, extra: 2214, cancel: null, total: 2214, actual: 1980, rate: 89, saving: null, unexecuted: 234,
      remarks: "KF1 B-SAMPLE 개발 투자비(전체 비용(원재료,경비포함) 3,168백만원 중 투자비 금액 계획 2,159/실적 1,995.5), KF1 HOUSING&PLATE END CMM JIG 제작(55/55)" },
    { category: "Chassis", item: "9BXX", plan: 172, extra: null, cancel: null, total: 172, actual: 0, rate: 0, saving: null, unexecuted: 172,
      remarks: "FLCA WELD LINE 개조(성인화)(145), 9BQX/9BUX 용접라인 공통 용접기 노후 신품 구매(27)" },
    { category: "Chassis", item: "BSUV(UZ)", plan: 1100, extra: null, cancel: null, total: 1100, actual: 1100, rate: 100, saving: null, unexecuted: null,
      remarks: "우즈벡 B-SUV 신규 금형제작(1,100/1,100)" },
    { category: "Chassis", item: "기타", plan: 178, extra: 35, cancel: null, total: 213, actual: 86, rate: 41, saving: null, unexecuted: 125,
      remarks: "2공장 콤프레샤 노후 신형으로 교체(45), 3공장 인버터 콤프레샤 교체(60), E/D2 4LINE 트롤리 체인 노후 교체 공사(계획53/실적51), A/S 공급 ISSUE 대응(20), 유동금속 이관에 따른 이관금형 개선비(35/35)" },
    { category: "Module", item: "9BUX&9BQB", plan: null, extra: 12, cancel: null, total: 12, actual: 12, rate: 100, saving: null, unexecuted: null,
      remarks: "BRACKET-RAD LWR ASS'Y 체결 ETC TOOL 대체품 1개 구매(11.5/11.5)" },
    { category: "Seat", item: "9BUX", plan: 227, extra: 64, cancel: null, total: 291, actual: 64, rate: 22, saving: null, unexecuted: 227,
      remarks: "9BXX TRACK LWR WELD LINE 개조(성인화)(227), 9BQX SEAT 양산 RE-TOOLING 금형 개발(64/64)" },
    { category: "Seat", item: "기타", plan: 70, extra: 20, cancel: null, total: 90, actual: 90, rate: 100, saving: null, unexecuted: null,
      remarks: "협력업체(정운) 반납 대응(계획70/실적70), US4 설계변경 반영을 통한 조립성 개선 및 품질 안정화(20/20)" },
    { category: "공통", item: "총무비품", plan: null, extra: 184, cancel: null, total: 184, actual: 184, rate: 100, saving: null, unexecuted: null,
      remarks: "법인 업무용 차량 매입(183.9/183.9)" },
    { category: "공통", item: "전산 H/W, S/W", plan: null, extra: 334, cancel: null, total: 334, actual: 284, rate: 85, saving: null, unexecuted: 50,
      remarks: "KF1 추적관리 시스템 도입(50/50), 사무용노트북(14.4/14.4), 3D 설계도면 VIEWER 소프트웨어 구매(18/18), 통합 정보 시스템 구축(250/200), 신규입사자 노트북(1.8/1.8)" },
    { category: "해외선투자", item: "북미 Nevados", plan: null, extra: 2305, cancel: null, total: 2305, actual: 1644, rate: 71, saving: 145, unexecuted: 516,
      remarks: "NEVADOS, BEARING ASM 북미 양산금형 개발(510/418), RETENTION 북미 양산금형 개발(145/145), MACHANICAL STOP 북미 양산금형 개발(80), NEVADOS-BEARING CRADLE(1,037/725), 북미오스템 LEVELER(400TON) 신규 투자(273/220), NEVADOS-MECHANICAL STOP(244.5/67), BEARING CRADLE 개발 관련 C/F 제작(95/69)" },
  ],
  total: { plan: 4861, extra: 3494, cancel: 50, total: 8305, actual: 6477, rate: 80, saving: 148, unexecuted: 1680 },
};

// ---------------- Page 12: 품질지표 - 고객실적 / PPM ----------------
REPORT.page12 = {
  customerResult: {
    months: ["1월","2월","3월","4월","5월","6월","7월","8월","9월","10월","11월","12월"],
    spps: {
      target:  [0,0,0,0,0,0,0,0,0,0,0,0],
      wheel:   [0,0,0,0,0,0,0,0,null,null,null,null],
      chassis: [0,0,0,0,0,0,1,0,null,null,null,null],
      seat:    [0,0,0,0,0,0,0,0,null,null,null,null],
      incheon: [0,0,0,0,0,0,0,0,null,null,null,null],
    },
    lineStop: {
      target:  [0,0,0,0,0,0,0,0,0,0,0,0],
      wheel:   [0,0,0,0,0,0,0,0,null,null,null,null],
      chassis: [0,0,0,0,0,0,0,0,null,null,null,null],
      seat:    [0,0,0,0,0,0,0,0,null,null,null,null],
      incheon: [0,0,0,0,0,0,0,0,null,null,null,null],
    },
  },
  issue: "1. GMKOREA 창원공장 조립 ISSUE (2026년 8월 14일)\n- SPPS NO: 224602 / PART NAME: 9BXX FCM / ISSUE 내용: 용접 용락(Burn Through) 발생 - 2대 (GMKOREA)",
  ppm: {
    wheel:   { target: [175,120,120,120,100,100,100,100,100,100,80,80,80], actual: [140,117,47,26,72,83,27,39,16,null,null,null,null], cumTarget: 100, cumActual: 59 },
    chassis: { target: [148,40,40,40,35,35,35,35,35,35,30,30,30], actual: [49,38,28,31,28,19,17,21,7,null,null,null,null], cumTarget: 35, cumActual: 26 },
    seat:    { target: [12,1,1,1,1,1,1,1,1,1,1,1,1], actual: [2,0,0,0,0,0,0,0,0,null,null,null,null], cumTarget: 1, cumActual: 0 },
    module:  { target: [0,0,0,0,0,0,0,0,0,0,0,0,0], actual: [0,0,0,0,0,0,0,0,0,null,null,null,null], cumTarget: 0, cumActual: 0 },
  },
};

// ---------------- Page 13: 품질지표 - Q-COST ----------------
REPORT.page13 = {
  months: ["1월","2월","3월","4월","5월","6월","7월","8월","9월","10월","11월","12월"],
  groups: [
    {
      label: "Chassis\n&\nWheel\nQ-Cost",
      target:   { v2025: 2640, m: [1330,1330,1330,1280,1280,1280,1280,1280,1280,1180,1180,1180], total: 15210 },
      actual:   { v2025: 1798, m: [1260,759,947,1090,984,743,1216,698,0,0,0,0], total: 7696 },
      failCost: { v2025: 1070, m: [851,225,343,650,575,476,689,78,null,null,null,null], total: 3886 },
      items: [
        { label: "9BUX",     v2025: 863, m: [851,186,195,488,509,437,689,78,0,0,0,0], total: 3433 },
        { label: "AURORA",   v2025: 75,  m: [0,39,57,0,66,31,0,null,null,null,null,null], total: 192 },
        { label: "LJL",      v2025: 15,  m: [0,0,0,0,0,0,0,null,null,null,null,null], total: 0 },
        { label: "C121",     v2025: 15,  m: [0,0,91,162,0,8,0,null,null,null,null,null], total: 261 },
        { label: "기타차종", v2025: 7,   m: [0,0,0,0,0,0,0,null,null,null,null,null], total: 0 },
        { label: "F/CLAIM",  v2025: 95,  m: [0,0,0,0,0,0,0,null,null,null,null,null], total: 0 },
      ],
      evalCost: { v2025: 637, m: [409,534,604,440,409,267,527,620,null,null,null,null], total: 3810 },
      prevCost: { v2025: 91,  m: [0,0,0,0,0,0,null,null,null,null,null,null], total: 0 },
      rate:     { v2025: 0.03, m: [0.01,0.01,0.01,0.02,0.01,0.01,0.01,0.01,null,null,null,null], total: 0.01 },
    },
    {
      label: "Seat\nQ-Cost",
      target:   { v2025: 555, m: [260,260,260,200,200,200,200,200,200,160,160,160], total: 2460 },
      actual:   { v2025: 292, m: [178,99,161,180,162,157,182,155,0,0,0,0], total: 1274 },
      failCost: { v2025: 90,  m: [0,0,0,0,0,0,0,null,null,null,null,null], total: 0 },
      items: [
        { label: "9BUX",     v2025: 26, m: [0,72,83,0,0,0,0,0,0,0,0,0], total: 155 },
        { label: "기타차종", v2025: 0,  m: [0,0,0,0,0,0,0,null,null,null,null,null], total: 0 },
        { label: "F/CLAIM",  v2025: 64, m: [0,28,0,0,0,0,0,null,null,null,null,null], total: 28 },
      ],
      evalCost: { v2025: 202, m: [178,99,161,180,162,157,182,155,null,null,null,null], total: 1274 },
      prevCost: { v2025: 0,   m: [0,0,0,0,0,0,null,null,null,null,null,null], total: 0 },
      rate:     { v2025: 0.01, m: [0.01,0.01,0.01,0.01,0.01,0.01,0.01,0.01,null,null,null,null], total: 0.01 },
    },
  ],
  eventTable: {
    rows: [
      { category: "고객 (GMK)",
        issue: "1. GMKOREA 창원공장 조립 ISSUE관련 발표보고\n   - 생산팀 : 발생원인 보고 및 개선방안\n   - 생산지원팀 : 선입선출 관련 보고 및 개선방안",
        schedule: "8/24", remarks: "" },
    ],
  },
};
