const REPORT = {};
// 경영회의 2026년 02월 보고서 - 페이지 4~8 데이터
// 출처: D:\AI\경영회의\1.경영회의(2026년02월)_보고서.xlsx (openpyxl, data_only=True로 직접 추출)
// report-render.js의 renderPage4~renderPage8과 report-data.js(2026년08월)/report-data-2026-06,07.js와
// 동일한 필드명/구조를 사용합니다. 세부 참고사항(불확실한 값, 6월 대비 구조 변화, 검산용 합계)은
// report-data-2026-02-p4to8.notes.txt 참조.
// (REPORT 전역 객체는 이미 선언되어 있다고 가정 - 다른 파일에서 선언됨)

// ---------------- Page 4: 매출/부가가치/인원 현황 ----------------
// 출처: 시트 "1.국내매출종합"
REPORT.page4 = {
  months: ["1월","2월","3월","4월","5월","6월","7월","8월","9월","10월","11월","12월"],
  forecastIndex: 2,
  revenue: {
    label: "매출\n(백만원)",
    plan:    { yr: 102679, avg: 8557,  m: [10333,8103,10873,10654,10013,9872,10586,5699,9210,10568,10113,10400], cum: 18435, total: 116422 },
    revised: { yr: null, avg: null, m: [null,null,null,null,null,null,null,null,null,null,null,null], cum: null, total: null },
    actual:  { yr: 122546, avg: 10212, m: [12546,10040,12875,null,null,null,null,null,null,null,null,null], cum: 22586, total: 22586 },
    pct:     { yr: 119, avg: 119, m: [121,124,118,null,null,null,null,null,null,null,null,null], cum: 123, total: 19 },
  },
  valueAdded: {
    label: "부가가치\n(백만원)",
    plan:    { yr: 35232, avg: 2936, m: [3601,2845,3822,3729,3502,3451,3740,1958,3236,3729,3527,3621], cum: 6446, total: 40762 },
    revised: { yr: null, avg: null, m: [null,null,null,null,null,null,null,null,null,null,null,null], cum: null, total: null },
    actual:  { yr: 40323, avg: 3360, m: [4258,3497,4420,null,null,null,null,null,null,null,null,null], cum: 7756, total: 7756 },
    pct:     { yr: 114, avg: 114, m: [118,123,116,null,null,null,null,null,null,null,null,null], cum: 120, total: 19 },
  },
  headcount: {
    label: "인원현황\n(명)",
    plan:    { yr: 373, avg: 373, m: [369,366,371,368,369,365,360,357,371,371,366,366], cum: 368, total: 367 },
    revised: { yr: 370, avg: 370, m: [361,360,360,346,346,346,346,341,341,341,341,341], cum: 361, total: 348 },
    actual:  { yr: 368, avg: 368, m: [361,360,360,null,null,null,null,null,null,null,null,null], cum: 361, total: 361 },
    pct:     { yr: 99, avg: 99, m: [98,98,97,null,null,null,null,null,null,null,null,null], cum: 98, total: 98 },
  },
  laborCost: {
    label: "인건비",
    plan:    { yr: 26429, avg: 2202, m: [2413,2358,2437,2288,2502,2195,2251,2033,2424,2480,2265,2258], cum: 4770, total: 27904 },
    revised: { yr: null, avg: null, m: [null,null,null,null,null,null,null,null,null,null,null,null], cum: null, total: null },
    actual:  { yr: 28528, avg: 2377, m: [2586,2361,2729,null,null,null,null,null,null,null,null,null], cum: 4947, total: 4947 },
    pct:     { yr: 108, avg: 108, m: [107,100,112,null,null,null,null,null,null,null,null,null], cum: 104, total: 18 },
  },
  laborIndicators: {
    label: "인건비 지표\n(실적)",
    perCapita:   { yr: 77.5, avg: 6.5, m: [7.2,6.6,7.6,null,null,null,null,null,null,null,null,null], cum: 13.7, total: 13.7, unit: "" },
    laborRate:   { yr: 23.3, avg: 23.3, m: [20.6,23.5,21.2,null,null,null,null,null,null,null,null,null], cum: 21.9, total: 21.9, unit: "%" },
    distribRate: { yr: 70.7, avg: 70.7, m: [60.7,67.5,61.7,null,null,null,null,null,null,null,null,null], cum: 63.8, total: 63.8, unit: "%" },
    overtime:    { yr: 38.2, avg: 38.2, m: [62.3,48.0,53.0,null,null,null,null,null,null,null,null,null], cum: 55.2, total: 55.2, unit: "" },
    // 원본 시트("1.국내매출종합")에 "'25년 초과근로평균" 비교행 자체가 존재하지 않음(6/7/8월 원본에는 있음) → 전부 null 처리.
    overtimePrevYear: { yr: null, avg: null, m: [null,null,null,null,null,null,null,null,null,null,null,null], cum: null, total: null, unit: "" },
  },
  // 원본에는 전년매출/사업계획/년간예상 3개 막대만 존재(수정계획 연간값 셀이 비어 있어 수정계획 막대 없음 - 6월과 동일 패턴).
  annualBar: { labels: ["전년매출", "사업계획", "년간예상"], values: [1225, 1164, 1226] },
};

// ---------------- Page 5: 매출 상세 증감 현황 ----------------
// 출처: 시트 "매출분석"
// 열 순서: [2월 생산(사업계획,실적,증감,%)] [2월 매출(사업계획,실적,증감,%)] [3월 생산(사업계획,실행계획,증감,%)] [3월 매출(사업계획,실행계획,증감,%)] [전월대비 매출(증감,%)]
// (원본 시트 헤더의 "사업계획" 문구는 report-render.js가 "수정계획"으로 고정 출력 - 6월과 동일 관례)
REPORT.page5 = {
  unitHeader: "수량\n단위",
  currentMonthLabel: "2월",
  nextMonthLabel: "3월",
  total: { label: "합 계", v: [76391,105890,29500,39, 8103,10040,1937,24, 95603,136288,40685,43, 10873,12875,2002,18, 2835,28] },
  groups: [
    {
      label: "자동차",
      subtotal: { v: [55641,58370,2730,5, 7964,9560,1596,20, 74853,104032,29179,39, 10734,12569,1835,17, 3009,31] },
      items: [
        { customer: "GMK 부평", customerRowspan: 1, model: "9BUX/9BQB", unit: "대분", v: [15650,18206,2556,16, 3203,3748,545,17, 22381,24893,2512,11, 4541,4938,397,9, 1190,32] },
        { customer: "GMK 창원", customerRowspan: 1, model: "9BQC", unit: "대분", v: [15590,18763,3173,20, 3171,3854,683,22, 20313,22460,2147,11, 4128,4578,450,11, 724,19] },
        { customer: "GM", customerRowspan: 1, model: "C121", unit: "대분", v: [2511,2697,186,7, 559,680,122,22, 3159,4104,945,30, 703,925,222,32, 244,36] },
        { customer: "RKM", customerRowspan: 3, model: "LJL", unit: "대분", v: [809,894,85,11, 28,31,3,11, 1507,2099,592,39, 52,72,20,39, 41,135] },
        { customer: null, model: "AURORA-1", unit: "대분", v: [2135,1513,-622,-29, 241,162,-79,-33, 2427,2120,-307,-13, 267,235,-32,-12, 73,45] },
        { customer: null, model: "AURORA-2", unit: "대분", v: [1440,2778,1338,93, 145,297,152,105, 2880,3592,712,25, 290,398,107,37, 100,34] },
        { customer: "HMC", customerRowspan: 1, model: "US4", unit: "대분", v: [90,90,0,0, 240,240,0,0, 126,100,-26,-21, 336,267,-69,-21, 27,11] },
        { customer: "KGM", customerRowspan: 1, model: "Y450", unit: "대분", v: [509,288,-221,-43, 34,19,-15,-45, 625,460,-165,-26, 42,31,-11,-26, 12,65] },
        { customer: "EXPORT", customerRowspan: 2, model: "GSV-EM", unit: "대분", v: [11700,11056,-644,-6, 323,393,70,22, 11700,27698,15998,137, 323,880,557,172, 487,124] },
        { customer: null, model: "SEAT", unit: "대분", v: [5207,2085,-3121,-60, 19,121,103,546, 9735,16506,6771,70, 52,246,195,377, 125,103] },
        { customer: "A/S", customerRowspan: 1, model: null, unit: null, v: [null,null,null,null, 0,14,14,0, null,null,null,null, 0,0,0,0, -14,-100] },
      ],
    },
    {
      // 원본에 SOLAR 하위 항목이 "AUSTEM AMERICA" 1건만 존재 (NOBULL ENERGY 행 자체가 없음 - 6/7/8월에는 2건 존재, 구조적 차이).
      label: "SOLAR",
      subtotal: { v: [20750,47520,26770,129, 139,480,341,246, 20750,32256,11506,55, 139,306,167,120, -174,-36] },
      items: [
        { merged: true, label: "AUSTEM AMERICA\n(STAMPING)", unit: "EA", v: [20750,47520,26770,129, 139,480,341,246, 20750,32256,11506,55, 139,306,167,120, -174,-36] },
      ],
    },
  ],
};

// ---------------- Page 6: 사업부문별 상세현황 ----------------
// 출처: 시트 "1-1.상세"
// v: [1월실적, 2월수정계획,2월실적,%,전월대비, 3월수정계획,3월실행계획,%,전월대비]
REPORT.page6 = {
  prevMonthLabel: "1월",
  currentMonthLabel: "2월",
  nextMonthLabel: "3월",
  // 차량생산: 자체 합계 없음 (부평/창원/KG모빌리티/RKM 실적만). 원본 표기 그대로 "KG 모빌리티"(7/8월 자료의 "KGM 모빌리티"와 표기 차이).
  vehicleGroupLabel: "차량생산",
  vehicleRows: [
    { name: "부평", v: [24900, 15650,18206,116,73, 22381,24893,111,137], note8: "", note9: "", shift: "2shift" },
    { name: "창원", v: [23076, 15590,18763,120,81, 20313,22460,111,120], note8: "", note9: "", shift: "2shift" },
    { name: "KG 모빌리티", v: [700, 509,288,57,41, 625,460,74,160], note8: "", note9: "", shift: "2shift" },
    { name: "RKM", v: [5764, 4384,5185,118,90, 6814,7811,115,151], note8: "", note9: "", shift: "1shift" },
  ],
  // 매출: 총계(10,040 등) + Wheel/Body/Chassis/Module/Seat/Solar
  salesGroupLabel: "매출",
  salesTotal: { v: [12546, 8103,10040,124,80, 10873,12875,118,128] },
  salesRows: [
    { name: "Wheel", v: [876, 629,664,105,76, 833,805,97,121], note8: "* 증가(GMK)", note9: "* 감소(GMK)" },
    { name: "Body", v: [1, 0,0,0,0, 0,0,0,0], note8: "", note9: "" },
    { name: "Chassis", v: [7348, 5040,6072,120,83, 6772,8238,122,136], note8: "* 증가(GMK, C121, RKM)", note9: "* 증가(GMK, C121, RKM, UZ-AUTO)" },
    { name: "Module", v: [443, 312,349,112,79, 408,443,109,127], note8: "* 증가(GMK)", note9: "* 증가(GMK)" },
    { name: "Seat", v: [2984, 1983,2476,125,83, 2721,3083,113,125], note8: "* 증가(GMK, 직수출)", note9: "* 증가(GMK, 직수출)" },
    { name: "Solar", v: [894, 139,480,346,54, 139,306,220,64], note8: "* 증가(Stamping)", note9: "* 증가(Stamping)" },
  ],
  // 직접인원: 총계(192 등) + Wheel/Body/Chassis/Module/Seat
  // 주) 전월대비(index4,8)는 인원 "증감"이 %로 잘못 표시되는 문제를 피하기 위해 null 처리(과업 지시사항, 6월과 동일 관례).
  headcountGroupLabel: "직접인원",
  headcountTotal: { v: [193, 196,192,98,null, 196,192,98,null] },
  headcountRows: [
    { name: "Wheel", v: [22, 22,22,100,null, 22,22,100,null] },
    { name: "Body", v: [20, 24,19,79,null, 24,19,79,null] },
    { name: "Chassis", v: [75, 74,75,101,null, 74,75,101,null] },
    { name: "Module", v: [31, 30,31,103,null, 30,31,103,null] },
    { name: "Seat", v: [45, 46,45,98,null, 46,45,98,null] },
  ],
};

// ---------------- Page 7: 환율 변동 Impact ----------------
// 출처: 시트 "누적환율변동 Impact"
// v: [년간(2025), 월평균(2025), 1월..12월 실적/계획, 누계]  (2월 보고서: 1~2월 실적 + 3월 계획, 4월부터 null)
REPORT.page7 = {
  months: ["1월","2월","3월","4월","5월","6월","7월","8월","9월","10월","11월","12월"],
  forecastIndex: 2,
  fxRate: {
    planYear2025: 1250, plan2026: 1300,
    actualYear2025: 1423,
    actualMonthly: [1457,1455,1451,null,null,null,null,null,null,null,null,null],
  },
  revenue: {
    rows: [
      { name: "Wheel", v: [1,0, 0,0,0, null,null,null,null,null,null,null,null, 0] },
      { name: "Chassis", v: [763,64, 105,117,210, null,null,null,null,null,null,null,null, 222], note: "GSV-EM, C121" },
      { name: "Seat", v: [276,23, 13,15,30, null,null,null,null,null,null,null,null, 28], note: "H62X, GMI31UX" },
      { name: "Solar", v: [1182,98, 99,50,36, null,null,null,null,null,null,null,null, 148] },
    ],
    total: { v: [2221,185, 217,182,276, null,null,null,null,null,null,null,null, 398] },
  },
  valueAdded: {
    rows: [
      { name: "Wheel", v: [1,0, 0,0,0, null,null,null,null,null,null,null,null, 0] },
      { name: "Chassis", v: [667,56, 87,103,191, null,null,null,null,null,null,null,null, 190], note: "9BUX & AURORA Bush" },
      { name: "Seat", v: [276,23, 13,15,30, null,null,null,null,null,null,null,null, 28] },
      { name: "Solar", v: [776,65, 59,30,20, null,null,null,null,null,null,null,null, 89], note: "관세 & DDP 운반비" },
    ],
    total: { v: [1719,143, 160,147,240, null,null,null,null,null,null,null,null, 307] },
  },
  duty: {
    rateNote: "관세율: 25% → 50% (2025년 중 인상), 2026년 1~2월 50% 유지 (Steel 50%, 사출 15%)",
    rows: [
      { name: "Solar", v: [2669,222, 271,144,111, null,null,null,null,null,null,null,null, 415] },
    ],
  },
};

// ---------------- Page 8: 전월 실적 및 당월 예상 손익 현황 ----------------
// 출처: 시트 "2.손익(02월)"
REPORT.page8 = {
  columns: ["01월 실적","02월 실행계획","02월 실적","실행계획대비","누적 실적(~02월)","03월 실행계획","전월실적 대비"],
  rows: [
    { label: "매출액", level: 0, bold: true, note: "",
      cells: [[12546,100.0],[10045,100.0],[10040,100.0],[-5,-0.1],[22586,100.0],[12875,100.0],[2835,28.2]] },
    { label: "자동차", level: 1,
      cells: [[11652,92.9],[9012,89.7],[9560,95.2],[548,6.1],[21211,93.9],[12569,97.6],[3009,31.5]] },
    { label: "solar", level: 1,
      cells: [[894,7.1],[1033,10.3],[480,4.8],[-553,-53.5],[1374,6.1],[306,2.4],[-174,-36.3]] },
    { label: "부가가치", level: 0, bold: true,
      cells: [[4258,33.9],[3168,31.5],[3497,34.8],[330,10.4],[7756,34.3],[4420,34.3],[923,26.4]] },
    { label: "자동차", level: 1,
      cells: [[4248,33.9],[3236,32.2],[3493,34.8],[257,7.9],[7741,34.3],[4441,34.5],[948,27.1]] },
    { label: "solar", level: 1,
      cells: [[10,0.1],[-69,-0.7],[4,0.0],[73,106.4],[15,0.1],[-21,-0.2],[-25,578.4]] },
    { label: "매출원가", level: 0, bold: true,
      cells: [[11748,93.6],[10072,100.3],[9656,96.2],[-416,-4.1],[21405,94.8],[11922,92.6],[2265,23.5]],
      note: "※환율적용기준\n1)01월환율효과: 160백만원(부가가치기준)_손익반영\n2)02월환율효과: 147백만원(부가가치기준)_손익반영\n3)03월환율(예상)효과: 240백만원_손익미반영(1,451원/$기준)" },
    { label: "재료비", level: 1,
      cells: [[8288,66.1],[6878,68.5],[6542,65.2],[-335,-4.9],[14830,65.7],[8455,65.7],[1912,29.2]] },
    { label: "노무비", level: 1,
      cells: [[2100,16.7],[2011,20.0],[1889,18.8],[-122,-6.1],[3989,17.7],[2232,17.3],[343,18.2]] },
    { label: "정규", level: 2,
      cells: [[1781,14.2],[1743,17.3],[1609,16.0],[-134,-7.7],[3390,15.0],[1912,14.8],[303,18.8]],
      note: "대학학자금 180백만원(2월계획→3월급여시 지급)" },
    { label: "도급", level: 2,
      cells: [[318,2.5],[268,2.7],[280,2.8],[12,4.5],[598,2.6],[320,2.5],[40,14.3]] },
    { label: "제조경비", level: 1,
      cells: [[1361,10.8],[1184,11.8],[1225,12.2],[41,3.5],[2586,11.4],[1235,9.6],[10,0.8]] },
    { label: "인건비성 경비", level: 2,
      cells: [[216,1.7],[210,2.1],[212,2.1],[2,0.9],[428,1.9],[240,1.9],[28,13.1]] },
    { label: "수선/소모품비", level: 2,
      cells: [[257,2.1],[222,2.2],[224,2.2],[2,0.9],[481,2.1],[239,1.9],[15,6.6]] },
    { label: "전력비", level: 2,
      cells: [[339,2.7],[282,2.8],[284,2.8],[2,0.8],[623,2.8],[273,2.1],[-11,-4.0]] },
    { label: "감가상각", level: 2,
      cells: [[182,1.5],[182,1.8],[182,1.8],[0,0.0],[364,1.6],[182,1.4],[0,0.0]] },
    { label: "포장비", level: 2,
      cells: [[73,0.6],[59,0.6],[70,0.7],[11,18.6],[143,0.6],[102,0.8],[32,45.7]] },
    { label: "연료비", level: 2,
      cells: [[156,1.2],[119,1.2],[119,1.2],[0,0.1],[276,1.2],[88,0.7],[-31,-26.2]] },
    { label: "기타", level: 2,
      cells: [[137,1.1],[110,1.1],[134,1.3],[24,21.5],[270,1.2],[111,0.9],[-22,-16.7]] },
    { label: "고철매각", level: 1,
      cells: [[337,2.7],[243,2.4],[276,2.8],[33,13.7],[613,2.7],[363,2.8],[87,31.5]] },
    { label: "매출총이익", level: 0, bold: true,
      cells: [[1134,9.0],[216,2.1],[660,6.6],[444,205.9],[1794,7.9],[1317,10.2],[657,99.5]] },
    { label: "판매관리비", level: 0, bold: true,
      cells: [[920,7.3],[797,7.9],[853,8.5],[56,7.0],[1773,7.8],[863,6.7],[11,1.2]] },
    { label: "인건비", level: 1,
      cells: [[486,3.9],[465,4.6],[472,4.7],[7,1.5],[958,4.2],[497,3.9],[25,5.3]] },
    { label: "운반비", level: 1,
      cells: [[38,0.3],[32,0.3],[32,0.3],[0,0.0],[70,0.3],[42,0.3],[10,31.3]] },
    { label: "기타", level: 1,
      cells: [[396,3.2],[300,3.0],[349,3.5],[49,16.3],[745,3.3],[324,2.5],[-24,-7.0]] },
    { label: "영업이익", level: 0, bold: true, emphasize: true,
      cells: [[214,1.7],[-581,-5.8],[-193,-1.9],[389,66.9],[21,0.1],[454,3.5],[646,335.4]] },
  ],
};
// 경영회의 2026년 02월 보고서 - 페이지 9~13 데이터
// 출처: D:\AI\경영회의\1.경영회의(2026년02월)_보고서.xlsx (openpyxl, data_only=True로 직접 추출)
//   page9  <- 시트 '3.프로젝트(KOREA)'
//   page10 <- 시트 '3-1.투자비' (잔여투자현황 도넛차트만 '3-2.투자비_상세'!E25:L26 참조)
//   page11 <- 시트 '3-2.투자비_상세'
//   page12 <- 시트 '4-1.고객실적 및 사내공정불량율(26년)'
//   page13 <- 시트 '4-2.Q-COST 실적&주요이벤트 및 공지'
// report-render.js의 renderPage9~renderPage13과 report-data.js(2026년08월)/report-data-2026-06.js/
// report-data-2026-07.js의 REPORT.page9~page13과 동일한 필드명/구조를 사용합니다.
// 세부 참고사항(불확실한 값, 구조 차이, 검산용 합계)은 report-data-2026-02-p9to13.notes.txt 참조.
// (REPORT 전역 객체는 이미 선언되어 있다고 가정 - 다른 파일(report-data-2026-02-p4to8.js 등)에서 선언됨)

// ---------------- Page 9: 신규 Project 진행 현황 ----------------
// 2월 시점에는 EV/삼성SDI(KF1) 프로젝트가 아직 TKO 전(3월 예정)이라 존재하지 않고,
// Wheel/AX EV STYLED 프로젝트도 아직 없음(TKO 4월 예정). Nevados의 Mechanical Stop도
// 아직 없음(TKO 5월 예정). 따라서 2월 표는 6월 보고서 대비 프로젝트 수가 훨씬 적음.
REPORT.page9 = {
  groups: [
    {
      plant: "Cheon-an", commodity: "Wheel", customer: "현대/기아",
      projects: [
        {
          project: "LW1",
          rows: [
            { pname: "Steel Wheel (16×6.5J, 4.25T)",
              tko: { v: "25-9-17", state: "green" }, d1: "26-3-7", line: { v: "26-2-24", note: "품질육성", state: "black" }, pvStart: "26-2-27",
              pvDone: "28-7-15", ppap: "28-10-15", run: "28-12-18", sorp: "29-1-15",
              recPlan: null, recActual: null, recDate: null,
              invPlan: 252.5, invActual: 252.5, invRate: 100,
              remarks: "부품가 감가상각" },
            { pname: "Steel Wheel (16×6.5J, 3.5T)",
              tko: { v: "25-12-17", state: "green" }, d1: "26-6-26", line: { v: "26-5-15", note: "Tooling", state: "black" }, pvStart: "26-6-8",
              pvDone: "27-1-1", ppap: "27-3-15", run: "27-5-15", sorp: "27-6-30",
              recPlan: null, recActual: null, recDate: null,
              invPlan: 180, invActual: 180, invRate: 100,
              remarks: "부품가 감가상각" },
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
              tko: { v: "25-12-29", state: "green" }, d1: "N/A", line: { v: "26-5-8", note: "품질육성 / Tooling", state: "black" }, pvStart: "N/A",
              pvDone: "N/A", ppap: "26-5-15", run: "26-5-15", sorp: "26-5-18",
              recPlan: 350, recActual: null, recDate: "2026-06",
              invPlan: 418, invActual: 365, invRate: 87,
              remarks: "고객 회수\n2,228\n(350+1,878)" },
            { pname: "Articulating Coupler",
              tko: { v: "25-12-29", state: "green" }, d1: "N/A", line: { v: "26-6-12", note: "품질육성 / Tooling" }, pvStart: "N/A",
              pvDone: "N/A", ppap: "26-6-19", run: "26-6-26", sorp: "26-7-1",
              recPlan: null, recActual: null, recDate: "2026-08",
              invPlan: 1642.7, invActual: 1095.6, invRate: 67,
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
    monthlyActual: [2802, 74, null, null, null, null, null, null, null, null, null, null],
    cumPlan:       [3874, 4343, 4396, 4736, 4781, 4791, 4791, 4851, 4851, 4851, 4851, 4861],
    cumExecuted:   [3935, 4457, 4457, 4797, 4842, 4852, 4852, 4912, 4912, 4912, 4912, 4922],
    cumActual:     [2802, 2876, null, null, null, null, null, null, null, null, null, null],
  },
  remainingByCategory: {
    labels: ["Wheel", "Body", "Chassis", "Module", "Seat", "공통", "북미"],
    values: [629, 0, 299, 0, 227, 0, 700],
  },
  recoveryByYear: {
    years: ["2026년", "2027년"],
    plan:   [4958, 23],
    actual: [440, 0],
  },
  table: {
    groups: [
      {
        label: "합계", labelSpan: 4, valsSpan: 4,
        planDelta: 61, execSaving: -145, cancel: 0, remaining: 1902,
        rows: [
          { sub: "사업계획", y2025: 5071, months: [3874, 469, 53, 340, 45, 10, 0, 60, 0, 0, 0, 10], total: 4861,
            recovery: { y2025: 15502, y2026: 4875, y2027: 23, total: 20399 } },
          { sub: "실행계획", y2025: 6031, months: [3935, 522, 0, 340, 45, 10, 0, 60, 0, 0, 0, 10], total: 4922,
            recovery: { y2025: 15966, y2026: 4958, y2027: 23, total: 20946 } },
          { sub: "실적", y2025: 5710, months: [2802, 74, null, null, null, null, null, null, null, null, null, null], total: 2876,
            recovery: { y2025: 15966, y2026: 440, y2027: null, total: 16406 } },
          { sub: "%", isPct: true, y2025: 95, months: [71, 14, null, null, null, null, null, null, null, null, null, null], total: 58,
            recovery: { y2025: 100, y2026: 9, y2027: null, total: 78 } },
        ],
      },
      {
        label: "국내", labelSpan: 3, valsSpan: 3,
        planDelta: 61, execSaving: 0, cancel: 0, remaining: 1202,
        rows: [
          { sub: "사업계획", y2025: 5071, months: [1569, 469, 53, 340, 45, 10, 0, 60, 0, 0, 0, 10], total: 2556,
            recovery: { y2025: 15502, y2026: 1864, y2027: 23, total: 17388 } },
          { sub: "실행계획", y2025: 5323, months: [1630, 522, 0, 340, 45, 10, 0, 60, 0, 0, 0, 10], total: 2617,
            recovery: { y2025: 15966, y2026: 1947, y2027: 23, total: 17936 } },
          { sub: "실적", y2025: 5011, months: [1341, 74, null, null, null, null, null, null, null, null, null, null], total: 1415,
            recovery: { y2025: 15966, y2026: 440, y2027: null, total: 16406 } },
        ],
      },
      {
        label: "해외\n선투자", labelSpan: 3, valsSpan: 3,
        planDelta: null, execSaving: -145, cancel: null, remaining: 700,
        rows: [
          { sub: "사업계획", y2025: null, months: [2305, null, null, null, null, null, null, null, null, null, null, null], total: 2305,
            recovery: { y2025: null, y2026: 3011, y2027: null, total: 3011 } },
          { sub: "실행계획", y2025: 708, months: [2305, null, null, null, null, null, null, null, null, null, null, null], total: 2305,
            recovery: { y2025: null, y2026: 3011, y2027: null, total: 3011 } },
          { sub: "실적", y2025: 699, months: [1461, 0, null, null, null, null, null, null, null, null, null, null], total: 1461,
            recovery: { y2025: null, y2026: 0, y2027: null, total: 0 } },
        ],
      },
    ],
  },
  notes: [
    "1. 2026년 실행계획 투자비: 4,922백만원(사업계획 4,861백만원 + 추가계획: 61백만원)",
    "2. (02월) 실적: 74.1백만원 — E/D2 4LINE 트롤리 체인 노후 교체 공사 51백만원, 협력업체(정운) 반납 대응 23.1백만원",
    "3. 고객사 회수 계획: 4,958백만원 — 우즈벡 GSV EM RETOOL'G 잔금 10% 241.3백만원, UZAUTO GEM BSUV FRT CRADLE RETOOLING 중도금/잔금 50% 683백만원, C1xx Top cover B sample Tooling 38백만원, 9BQX FLANGE-EXH PIPE ASM 중도금2차 23백만원, 9BU/Qx TRACK ASM 2025 RETOOLING 금형비 83백만원, US4 설변 및 안전기준 강화 금형비 880백만원, 북미 오스템아메리카 선투자 회수 3,011백만원",
    "4. 고객사 회수 실적: 440백만원 — MANO US4 설계변경 & 안전기준 강화 금형비+ED&D 50% 회수(440백만원)",
  ],
};

// ---------------- Page 11: 투자비 상세 현황 ----------------
REPORT.page11 = {
  groups: [
    { category: "Wheel", item: "LW1", plan: 794, extra: 0, cancel: 0, total: 794, actual: 180, rate: 23, saving: null, unexecuted: 614,
      remarks: "HKMC LW1 STEEL WHEEL 16인치 설계 변경 및 이원화 개발(180/180), LW1 STEEL WHEEL 14X4.5J 개발(224.1), TOP-COATING SPRAY BOOTH 개선(340), RIM LINE 2차 설비 개선(50)" },
    { category: "Wheel", item: "기타", plan: 15, extra: 61, cancel: null, total: 76, actual: 61, rate: 80, saving: null, unexecuted: 15,
      remarks: "1공장 콤프레샤 연동시스템 설치 및 응축수 드레인 트랩 설치(15), 추가: 3500T PRESS 동력전달계통(DRIVE GEAR PARTS) 수리(61/61)" },
    { category: "Chassis", item: "9BXX", plan: 172, extra: 0, cancel: 0, total: 172, actual: 0, rate: 0, saving: null, unexecuted: 172,
      remarks: "FLCA WELD LINE 개조(성인화)(145), 9BQX,9BUX 용접라인 공통 용접기 노후 신품 구매(27)" },
    { category: "Chassis", item: "BSUV(UZ)", plan: 1100, extra: 0, cancel: 0, total: 1100, actual: 1100, rate: 100, saving: null, unexecuted: 0,
      remarks: "우즈벡 B-SUV 신규 금형제작(1,100/1,100)" },
    { category: "Chassis", item: "기타", plan: 178, extra: 0, cancel: 0, total: 178, actual: 51, rate: 29, saving: null, unexecuted: 127,
      remarks: "2공장 콤프레샤 노후 신형으로 교체(45), 3공장 인버터 콤프레샤 교체(60), E/D2 4LINE 트롤리 체인 노후 교체 공사(계획53/실적51), A/S 공급 ISSUE 대응(20)" },
    { category: "Seat", item: "9BUX", plan: 227, extra: 0, cancel: null, total: 227, actual: 0, rate: 0, saving: null, unexecuted: 227,
      remarks: "9BXX TRACK LWR WELD LINE 개조(성인화)(227)" },
    { category: "Seat", item: "기타", plan: 70, extra: 0, cancel: null, total: 70, actual: 23, rate: 33, saving: null, unexecuted: 47,
      remarks: "협력업체(정운) 반납 대응(계획70/실적23.1)" },
    { category: "해외선투자", item: "북미 Nevados", plan: 2305, extra: 0, cancel: 0, total: 2305, actual: 1461, rate: 70, saving: 145, unexecuted: 700,
      remarks: "NEVADOS, BEARING ASM 북미 양산금형 개발(510/418), RETENTION 북미 양산금형 개발(145/145) MACHANICAL STOP 북미 양산금형 개발(80), NEVADOS - BEARING CRADLE(1,037/650), 북미오스템 LEVELER (400TON) 신규 투자(273/220), NEVADOS - MECHANICAL STOP(164), BEARING CRADLE 개발 관련 C/F 제작(95/27.6)" },
  ],
  total: { plan: 4861, extra: 61, cancel: 0, total: 4922, actual: 2876, rate: 61, saving: 145, unexecuted: 1902 },
};

// ---------------- Page 12: 품질지표 - 고객실적 / PPM ----------------
REPORT.page12 = {
  customerResult: {
    months: ["1월","2월","3월","4월","5월","6월","7월","8월","9월","10월","11월","12월"],
    spps: {
      target:  [0,0,0,0,0,0,0,0,0,0,0,0],
      wheel:   [0,0,null,null,null,null,null,null,null,null,null,null],
      chassis: [0,0,null,null,null,null,null,null,null,null,null,null],
      seat:    [0,0,null,null,null,null,null,null,null,null,null,null],
      incheon: [0,0,null,null,null,null,null,null,null,null,null,null],
    },
    lineStop: {
      target:  [0,0,0,0,0,0,0,0,0,0,0,0],
      wheel:   [0,0,null,null,null,null,null,null,null,null,null,null],
      chassis: [0,0,null,null,null,null,null,null,null,null,null,null],
      seat:    [0,0,null,null,null,null,null,null,null,null,null,null],
      incheon: [0,0,null,null,null,null,null,null,null,null,null,null],
    },
  },
  issue: "",
  ppm: {
    wheel:   { target: [175,120,120,120,100,100,100,100,100,100,80,80,80], actual: [140,117,43,null,null,null,null,null,null,null,null,null,null], cumTarget: 100, cumActual: 92 },
    chassis: { target: [148,40,40,40,35,35,35,35,35,35,30,30,30], actual: [49,38,4,null,null,null,null,null,null,null,null,null,null], cumTarget: 35, cumActual: 27 },
    seat:    { target: [12,1,1,1,1,1,1,1,1,1,1,1,1], actual: [2,0,0,null,null,null,null,null,null,null,null,null,null], cumTarget: 1, cumActual: 0 },
    module:  { target: [0,0,0,0,0,0,0,0,0,0,0,0,0], actual: [0,0,0,null,null,null,null,null,null,null,null,null,null], cumTarget: 0, cumActual: 0 },
  },
};

// ---------------- Page 13: 품질지표 - Q-COST ----------------
REPORT.page13 = {
  months: ["1월","2월","3월","4월","5월","6월","7월","8월","9월","10월","11월","12월"],
  groups: [
    {
      label: "Chassis\n&\nWheel\nQ-Cost",
      target:   { v2025: 2640, m: [1330,1330,1330,1280,1280,1280,1280,1280,1280,1180,1180,1180], total: 15210 },
      actual:   { v2025: 1798, m: [1260,437,0,0,0,0,0,0,0,0,0,0], total: 1696 },
      failCost: { v2025: 1070, m: [851,118,null,null,null,null,null,null,null,null,null,null], total: 968 },
      items: [
        { label: "9BUX",     v2025: 863, m: [851,118,0,0,0,0,0,0,0,0,0,0], total: 968 },
        { label: "AURORA",   v2025: 75,  m: [0,0,null,null,null,null,null,null,null,null,null,null], total: 0 },
        { label: "LJL",      v2025: 15,  m: [0,0,null,null,null,null,null,null,null,null,null,null], total: 0 },
        { label: "C121",     v2025: 15,  m: [0,0,null,null,null,null,null,null,null,null,null,null], total: 0 },
        { label: "기타차종", v2025: 7,   m: [0,0,null,null,null,null,null,null,null,null,null,null], total: 0 },
        { label: "F/CLAIM",  v2025: 95,  m: [0,0,null,null,null,null,null,null,null,null,null,null], total: 0 },
      ],
      evalCost: { v2025: 637, m: [409,319,null,null,null,null,null,null,null,null,null,null], total: 728 },
      prevCost: { v2025: 91,  m: [0,0,null,null,null,null,null,null,null,null,null,null], total: 0 },
      rate:     { v2025: 0.03, m: [0.01,0.01,null,null,null,null,null,null,null,null,null,null], total: 0.01 },
    },
    {
      label: "Seat\nQ-Cost",
      target:   { v2025: 555, m: [260,260,260,200,200,200,200,200,200,160,160,160], total: 2460 },
      actual:   { v2025: 292, m: [178,76,0,0,0,0,0,0,0,0,0,0], total: 254 },
      failCost: { v2025: 90,  m: [0,0,null,null,null,null,null,null,null,null,null,null], total: 0 },
      items: [
        { label: "9BUX",     v2025: 26, m: [0,0,0,0,0,0,0,0,0,0,0,0], total: 0 },
        { label: "기타차종", v2025: 0,  m: [0,0,null,null,null,null,null,null,null,null,null,null], total: 0 },
        { label: "F/CLAIM",  v2025: 64, m: [0,0,null,null,null,null,null,null,null,null,null,null], total: 0 },
      ],
      evalCost: { v2025: 202, m: [178,76,null,null,null,null,null,null,null,null,null,null], total: 254 },
      prevCost: { v2025: 0,   m: [0,0,null,null,null,null,null,null,null,null,null,null], total: 0 },
      rate:     { v2025: 0.01, m: [0.01,0.01,null,null,null,null,null,null,null,null,null,null], total: 0.01 },
    },
  ],
  eventTable: {
    rows: [
      { category: "사내",
        issue: "IATF16949 심사 부적합사항 보고",
        schedule: "심사일 : 2026. 01. 08 ~ 09", remarks: "한국품질재단(KFQ)" },
    ],
  },
};
