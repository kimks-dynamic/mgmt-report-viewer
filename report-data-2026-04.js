const REPORT = {};
// 경영회의 2026년 04월 보고서 - 페이지 4~8 데이터
// 출처: D:\AI\경영회의\1.경영회의(2026년04월)_보고서.xlsx (openpyxl, data_only=True로 직접 추출)
// report-render.js의 renderPage4~renderPage8과 report-data.js(2026년08월)/report-data-2026-07.js/
// report-data-2026-06.js의 REPORT.page4~page8과 동일한 필드명/구조를 사용합니다.
// 전 항목을 D:\AI\경영회의\1.경영회의(2026년04월)_보고서.pdf(pdfplumber 텍스트 추출)와 전량 대조하여
// 인쇄본 숫자와 정확히 일치함을 확인했습니다. 세부 참고사항은 report-data-2026-04-p4to8.notes.txt 참조.
// (REPORT 전역 객체는 이미 선언되어 있다고 가정 - report-data.js 등에서 선언)

// ---------------- Page 4: 매출/부가가치/인원 현황 ----------------
REPORT.page4 = {
  months: ["1월","2월","3월","4월","5월","6월","7월","8월","9월","10월","11월","12월"],
  forecastIndex: 4,
  revenue: {
    label: "매출\n(백만원)",
    plan:    { yr: 102679, avg: 8557,  m: [10333,8103,10873,10654,10013,9872,10586,5699,9210,10568,10113,10400], cum: 39962, total: 116422 },
    revised: { yr: null, avg: null, m: [null,null,null,null,null,null,null,null,null,null,null,null], cum: null, total: null },
    actual:  { yr: 122546, avg: 10212, m: [12546,10108,13094,13461,11003,null,null,null,null,null,null,null], cum: 49208, total: 49208 },
    pct:     { yr: 119, avg: 119, m: [121,125,120,126,110,null,null,null,null,null,null,null], cum: 123, total: 42 },
  },
  valueAdded: {
    label: "부가가치\n(백만원)",
    plan:    { yr: 35232, avg: 2936, m: [3601,2845,3822,3729,3502,3451,3740,1958,3236,3729,3527,3621], cum: 13998, total: 40762 },
    revised: { yr: null, avg: null, m: [null,null,null,null,null,null,null,null,null,null,null,null], cum: null, total: null },
    actual:  { yr: 40323, avg: 3360, m: [4258,3493,4781,4715,3723,null,null,null,null,null,null,null], cum: 17248, total: 17248 },
    pct:     { yr: 114, avg: 114, m: [118,123,125,126,106,null,null,null,null,null,null,null], cum: 123, total: 42 },
  },
  headcount: {
    label: "인원현황\n(명)",
    plan:    { yr: 373, avg: 373, m: [369,366,371,368,369,365,360,357,371,371,366,366], cum: 369, total: 367 },
    revised: { yr: 370, avg: 370, m: [361,360,360,346,346,346,346,341,341,341,341,341], cum: 357, total: 348 },
    actual:  { yr: 368, avg: 368, m: [361,360,360,360,360,null,null,null,null,null,null,null], cum: 360, total: 360 },
    pct:     { yr: 99, avg: 99, m: [98,98,97,98,98,null,null,null,null,null,null,null], cum: 98, total: 98 },
  },
  laborCost: {
    label: "인건비",
    plan:    { yr: 26429, avg: 2202, m: [2413,2358,2437,2288,2502,2195,2251,2033,2424,2480,2265,2258], cum: 9496, total: 27904 },
    revised: { yr: null, avg: null, m: [null,null,null,null,null,null,null,null,null,null,null,null], cum: null, total: null },
    actual:  { yr: 28528, avg: 2377, m: [2586,2294,2759,2637,2565,null,null,null,null,null,null,null], cum: 10276, total: 10276 },
    pct:     { yr: 108, avg: 108, m: [107,97,113,115,103,null,null,null,null,null,null,null], cum: 108, total: 37 },
  },
  laborIndicators: {
    label: "인건비 지표\n(실적)",
    perCapita:   { yr: 77.5, avg: 6.5, m: [7.2,6.4,7.7,7.3,7.1,null,null,null,null,null,null,null], cum: 28.5, total: 28.5, unit: "" },
    laborRate:   { yr: 23.3, avg: 23.3, m: [20.6,22.7,21.1,19.6,23.3,null,null,null,null,null,null,null], cum: 20.9, total: 20.9, unit: "%" },
    distribRate: { yr: 70.7, avg: 70.7, m: [60.7,65.7,57.7,55.9,68.9,null,null,null,null,null,null,null], cum: 59.6, total: 59.6, unit: "%" },
    overtime:    { yr: 39.9, avg: 39.9, m: [62.3,45.4,57.4,65,53,null,null,null,null,null,null,null], cum: 57.6, total: 57.6, unit: "" },
    // 참고: 원본 엑셀의 '25년 초과근로평균' 행은 F28:Q28(1~12월)은 모두 값이 있으나 R28(누계)/S28(합계) 셀
    // 자체가 수식 없이 완전히 비어 있음(다른 4개 지표 행과 달리). 임의로 계산하지 않고 null 처리함(PDF에도
    // 이 행의 누계/합계 칸은 공란으로 인쇄되어 있음).
    overtimePrevYear: { yr: 39.9, avg: 39.9, m: [38,31.2,44.3,32,62.6,50.8,38.4,10.8,16.3,55.9,39.8,58.7], cum: null, total: null, unit: "" },
  },
  // 참고: 2026년 04월 보고서 원본(PDF)에도 매출/부가가치/인건비의 "수정계획" 행이 존재하지 않음(사업계획/실적/% 3행만 인쇄).
  // 인원현황만 사업계획/수정계획/실적/% 4행이 모두 존재. 위 revised 항목은 원본에 없는 데이터이므로 null로 채움(렌더 시 "-" 표시).
  // 우측 연간 막대그래프도 원본에는 전년매출/사업계획/년간예상 3개 막대만 존재(수정계획 막대 없음).
  annualBar: { labels: ["전년매출", "사업계획", "년간예상"], values: [1225, 1164, 1267] },
};

// ---------------- Page 5: 매출 상세 증감 현황 ----------------
// 출처: D:\AI\경영회의\1.경영회의(2026년04월)_보고서.xlsx 시트 "매출분석"
// 열 순서: [4월 생산(계획,실적,증감,%)] [4월 매출(계획,실적,증감,%)] [5월 생산(계획,실행계획,증감,%)] [5월 매출(계획,실행계획,증감,%)] [전월대비 매출(증감,%)]
// (원본 시트 헤더는 "4월 실적" 섹션의 계획 열을 "사업계획"으로 표기하나, report-render.js는 헤더 문구를 "수정계획"으로 고정 출력함 — 데이터 값 자체는 동일)
REPORT.page5 = {
  unitHeader: "수량\n단위",
  currentMonthLabel: "4월",
  nextMonthLabel: "5월",
  total: { label: "합 계", v: [92728,149517,56789,61, 10654,13461,2806,26, 88919,119016,30097,34, 10013,11003,990,10, -2458,-18] },
  groups: [
    {
      label: "자동차",
      subtotal: { v: [71978,93789,21811,30, 10516,12912,2396,23, 68169,76630,8461,12, 9874,10666,792,8, -2246,-17] },
      items: [
        { customer: "GMK 부평", customerRowspan: 1, model: "9BUX/9BQB", unit: "대분", v: [21152,25420,4268,20, 4291,5015,724,17, 19594,21642,2048,10, 3977,4302,325,8, -714,-14] },
        { customer: "GMK 창원", customerRowspan: 1, model: "9BQC", unit: "대분", v: [20530,25310,4780,23, 4176,5182,1006,24, 19751,21745,1994,10, 4011,4623,612,15, -559,-11] },
        { customer: "GM", customerRowspan: 1, model: "C121", unit: "대분", v: [2835,3240,405,14, 631,866,235,37, 2862,1836,-1026,-36, 637,430,-207,-33, -436,-50] },
        { customer: "RKM", customerRowspan: 3, model: "LJL", unit: "대분", v: [1401,1699,298,21, 48,57,9,18, 736,402,-334,-45, 25,13,-12,-47, -43,-76] },
        { customer: null, model: "AURORA-1", unit: "대분", v: [2806,1150,-1656,-59, 319,123,-196,-61, 2698,664,-2034,-75, 282,66,-216,-76, -57,-46] },
        { customer: null, model: "AURORA-2", unit: "대분", v: [2880,3540,660,23, 290,379,88,30, 1911,3206,1295,68, 197,321,124,63, -58,-15] },
        { customer: "HMC", customerRowspan: 1, model: "US4", unit: "대분", v: [126,126,0,0, 336,336,0,0, 126,126,0,0, 336,336,0,0, 0,0] },
        { customer: "KGM", customerRowspan: 1, model: "Y450", unit: "대분", v: [656,276,-380,-58, 44,21,-23,-53, 536,392,-144,-27, 36,27,-9,-25, 6,29] },
        { customer: "EXPORT", customerRowspan: 2, model: "GSV-EM", unit: "대분", v: [11700,16642,4942,42, 323,606,283,88, 11700,11023,-677,-6, 323,350,27,8, -256,-42] },
        { customer: null, model: "SEAT", unit: "대분", v: [7892,16386,8494,108, 57,272,215,377, 8255,15594,7339,89, 49,197,148,304, -75,-28] },
        { customer: "A/S", customerRowspan: 1, model: null, unit: null, v: [null,null,null,null, 0,54,54,0, null,null,null,null, 0,0,0,0, -54,-100] },
      ],
    },
    {
      label: "SOLAR",
      // 참고: 06월 보고서에는 SOLAR에 AUSTEM AMERICA(STAMPING)/NOBULL ENERGY(H-BEAM) 2개 품목이 있었으나,
      // 04월 원본 시트에는 AUSTEM AMERICA 1개 품목만 존재함(NOBULL ENERGY는 이 시점 아직 없음).
      subtotal: { v: [20750,55728,34978,169, 139,549,410,296, 20750,42386,21636,104, 139,337,198,143, -212,-39] },
      items: [
        { merged: true, label: "AUSTEM AMERICA", unit: "EA", v: [20750,55728,34978,169, 139,549,410,296, 20750,42386,21636,104, 139,337,198,143, -212,-39] },
      ],
    },
  ],
};

// ---------------- Page 6: 사업부문별 상세현황 ----------------
// 출처: D:\AI\경영회의\1.경영회의(2026년04월)_보고서.xlsx 시트 "1-1.상세"
// v: [3월실적, 4월수정계획,4월실적,%,전월대비, 5월수정계획,5월실행계획,%,전월대비]
REPORT.page6 = {
  prevMonthLabel: "3월",
  currentMonthLabel: "4월",
  nextMonthLabel: "5월",
  // 차량생산: 자체 합계 없음 (부평/창원/KG모빌리티/RKM 실적만)
  vehicleGroupLabel: "차량생산",
  vehicleRows: [
    { name: "부평", v: [26219, 21152,25420,120,97, 19594,21642,110,85], note8: "* 5월 18일(월) : 노조창립기념일, 5월 30일(토) : 체육대회", note9: "", shift: "2shift" },
    { name: "창원", v: [23576, 20530,25310,123,107, 19751,21745,110,86], note8: "", note9: "", shift: "2shift" },
    { name: "KG 모빌리티", v: [424, 656,276,42,65, 536,392,73,142], note8: "", note9: "", shift: "2shift" },
    { name: "RKM", v: [7256, 7087,6389,90,88, 5345,4272,80,67], note8: "* 4월 : 가동(20일), TPS(2일), 5월 : 가동(13일), TPS(6일)", note9: "", shift: "1shift" },
  ],
  // 매출: 총계 + Wheel/Body/Chassis/Module/Seat/Solar
  salesGroupLabel: "매출",
  salesTotal: { v: [13094, 10654,13461,126,103, 10013,11003,110,82] },
  salesRows: [
    { name: "Wheel", v: [837, 840,900,107,108, 769,806,105,90], note8: "* 증가(GMK)", note9: "* 증가(GMK)" },
    { name: "Body", v: [74, 0,37,0,50, 0,0,0,0], note8: "* 증가(TWB A/S)", note9: "" },
    { name: "Chassis", v: [8560, 6597,8161,124,95, 6185,6421,104,79], note8: "* 증가(GMK, C121, UZ-AUTO)\n* 감소(RKM)", note9: "* 증가(GMK)\n* 감소(C121, RKM)" },
    { name: "Module", v: [462, 390,450,115,98, 368,397,108,88], note8: "* 증가(GMK)", note9: "* 증가(GMK)" },
    { name: "Seat", v: [3003, 2688,3363,125,112, 2552,3042,119,90], note8: "* 증가(GMK, 직수출)", note9: "* 증가(GMK, 직수출)" },
    { name: "Solar", v: [158, 139,549,396,346, 139,337,243,61], note8: "* 증가(Stamping)", note9: "* 증가(Stamping)" },
  ],
  // 직접인원: 총계 + Wheel/Body/Chassis/Module/Seat
  headcountGroupLabel: "직접인원",
  headcountTotal: { v: [192, 196,192,98,null, 196,192,98,null] },
  headcountRows: [
    { name: "Wheel", v: [22, 22,22,100,null, 22,22,100,null] },
    { name: "Body", v: [19, 24,19,79,null, 24,19,79,null] },
    { name: "Chassis", v: [75, 74,75,101,null, 74,75,101,null] },
    { name: "Module", v: [31, 30,31,103,null, 30,31,103,null] },
    { name: "Seat", v: [45, 46,45,98,null, 46,45,98,null] },
  ],
};

// ---------------- Page 7: 환율 변동 Impact ----------------
// 출처: D:\AI\경영회의\1.경영회의(2026년04월)_보고서.xlsx 시트 "누적환율변동 Impact"
// v: [년간(2025), 월평균(2025), 1월..12월 실적/계획, 누계]  (4월 보고서: 1~4월 실적 + 5월 계획, 6월부터 null)
REPORT.page7 = {
  months: ["1월","2월","3월","4월","5월","6월","7월","8월","9월","10월","11월","12월"],
  forecastIndex: 4,
  fxRate: {
    planYear2025: 1250, plan2026: 1300,
    actualYear2025: 1423,
    actualMonthly: [1457,1451,1492,1481,1470,null,null,null,null,null,null,null],
  },
  revenue: {
    rows: [
      { name: "Wheel", v: [1,0, 0,0,0,0,0,null,null,null,null,null,null,null, 0] },
      { name: "Chassis", v: [763,64, 105,112,224,185,102,null,null,null,null,null,null,null, 626], note: "GSV-EM, C121" },
      { name: "Seat", v: [276,23, 13,15,22,32,27,null,null,null,null,null,null,null, 82], note: "H62X, GMI31UX" },
      { name: "Solar", v: [1182,98, 99,45,19,67,44,null,null,null,null,null,null,null, 231] },
    ],
    total: { v: [2221,185, 217,172,265,285,173,null,null,null,null,null,null,null, 938] },
  },
  valueAdded: {
    rows: [
      { name: "Wheel", v: [1,0, 0,0,0,0,0,null,null,null,null,null,null,null, 0] },
      { name: "Chassis", v: [667,56, 87,97,200,164,85,null,null,null,null,null,null,null, 548], note: "9BUX & AURORA Bush" },
      { name: "Seat", v: [276,23, 13,15,22,32,27,null,null,null,null,null,null,null, 82] },
      { name: "Solar", v: [776,65, 59,26,10,43,31,null,null,null,null,null,null,null, 138], note: "관세 & DDP 운반비" },
    ],
    total: { v: [1719,143, 160,138,232,239,142,null,null,null,null,null,null,null, 769] },
  },
  duty: {
    rateNote: "관세율: 25% → 50% (2025년 중 인상), 2026년 1~5월 50% 유지 (Steel 50%, 사출 15%)",
    rows: [
      { name: "Solar", v: [2669,222, 271,143,56,151,86,null,null,null,null,null,null,null, 621] },
    ],
  },
};

// ---------------- Page 8: 전월 실적 및 당월 예상 손익 현황 ----------------
// 출처: D:\AI\경영회의\1.경영회의(2026년04월)_보고서.xlsx 시트 "2.손익(04월)"
REPORT.page8 = {
  columns: ["03월 실적","04월 실행계획","04월 실적","실행계획대비","누적 실적(~04월)","05월 실행계획","전월실적 대비"],
  rows: [
    { label: "매출액", level: 0, bold: true, note: "",
      cells: [[13094,100.0],[12319,100.0],[13461,100.0],[1142,9.3],[49208,100.0],[11003,100.0],[-2458,-18.3]] },
    { label: "자동차", level: 1,
      cells: [[12936,98.8],[12060,97.9],[12912,95.9],[852,7.1],[47147,95.8],[10666,96.9],[-2246,-17.4]] },
    { label: "solar", level: 1,
      cells: [[158,1.2],[259,2.1],[549,4.1],[290,112.2],[2061,4.2],[337,3.1],[-212,-38.6]] },
    { label: "부가가치", level: 0, bold: true,
      cells: [[4781,36.5],[4201,34.1],[4715,35.0],[514,12.2],[17248,35.0],[3723,33.8],[-992,-21.0]] },
    { label: "자동차", level: 1,
      cells: [[4785,36.5],[4229,34.3],[4692,34.9],[464,11.0],[17221,35.0],[3729,33.9],[-964,-20.5]] },
    { label: "solar", level: 1,
      cells: [[-4,0.0],[-28,-0.2],[23,0.2],[51,182.5],[26,0.1],[-6,-0.1],[-28,-124.7]] },
    { label: "매출원가", level: 0, bold: true,
      cells: [[11894,90.8],[11491,93.3],[12296,91.4],[805,7.0],[45606,92.7],[10490,95.3],[-1806,-14.7]],
      note: "※환율적용기준\n1)03월환율효과: 232백만원(부가가치기준)_손익반영\n2)04월환율효과: 239백만원(부가가치기준)_손익반영\n3)05월환율(예상)효과: 142백만원_손익미반영(1,470원/$기준)" },
    { label: "재료비", level: 1,
      cells: [[8313,63.5],[8118,65.9],[8746,65.0],[628,7.7],[31961,65.0],[7280,66.2],[-1466,-16.8]] },
    { label: "노무비", level: 1,
      cells: [[2265,17.3],[1990,16.2],[2137,15.9],[146,7.3],[8328,16.9],[2082,18.9],[-55,-2.6]] },
    { label: "정규", level: 2,
      cells: [[1914,14.6],[1687,13.7],[1767,13.1],[79,4.7],[7038,14.3],[1732,15.7],[-35,-2.0]],
      note: "대학학자금 134백만원(3월급여 지급)" },
    { label: "도급", level: 2,
      cells: [[351,2.7],[303,2.5],[370,2.7],[67,22.1],[1290,2.6],[350,3.2],[-20,-5.4]] },
    { label: "제조경비", level: 1,
      cells: [[1316,10.1],[1383,11.2],[1414,10.5],[32,2.3],[5318,10.8],[1128,10.3],[-286,-20.2]] },
    { label: "인건비성 경비", level: 2,
      cells: [[253,1.9],[392,3.2],[420,3.1],[28,7.0],[1100,2.2],[220,2.0],[-200,-47.6]],
      note: "(4)월 건강보험/고용,산재 보험 정산(158백만원)" },
    { label: "수선/소모품비", level: 2,
      cells: [[319,2.4],[270,2.2],[270,2.0],[0,0.1],[1075,2.2],[234,2.1],[-36,-13.5]] },
    { label: "전력비", level: 2,
      cells: [[272,2.1],[280,2.3],[275,2.0],[-5,-1.8],[1162,2.4],[273,2.5],[-2,-0.7]],
      note: "산업용전기료 단가 변경(6/1~ , 주간인하, 야간인상)" },
    { label: "감가상각", level: 2,
      cells: [[182,1.4],[182,1.5],[182,1.4],[0,0.0],[728,1.5],[182,1.7],[0,0.0]] },
    { label: "포장비", level: 2,
      cells: [[93,0.7],[74,0.6],[85,0.6],[11,14.9],[319,0.6],[52,0.5],[-33,-38.8]] },
    { label: "연료비", level: 2,
      cells: [[76,0.6],[70,0.6],[70,0.5],[0,0.0],[436,0.9],[60,0.5],[-10,-13.7]] },
    { label: "기타", level: 2,
      cells: [[121,0.9],[115,0.9],[112,0.8],[-2,-2.1],[498,1.0],[107,1.0],[-5,-4.5]] },
    { label: "고철매각", level: 1,
      cells: [[360,2.7],[335,2.7],[359,2.7],[24,7.2],[1324,2.7],[297,2.7],[-62,-17.4]],
      note: "3월 불용제품 고철매각 제외(200백만원)" },
    { label: "매출총이익", level: 0, bold: true,
      cells: [[1560,11.9],[1163,9.4],[1523,11.3],[361,31.0],[4926,10.0],[809,7.4],[-714,-46.9]] },
    { label: "판매관리비", level: 0, bold: true,
      cells: [[878,6.7],[1026,8.3],[1042,7.7],[16,1.6],[3683,7.5],[809,7.4],[-233,-22.3]] },
    { label: "인건비", level: 1,
      cells: [[494,3.8],[486,3.9],[500,3.7],[14,2.9],[1948,4.0],[472,4.3],[-28,-5.5]] },
    { label: "운반비", level: 1,
      cells: [[40,0.3],[42,0.3],[42,0.3],[0,0.0],[154,0.3],[37,0.3],[-5,-11.9]] },
    { label: "기타", level: 1,
      cells: [[345,2.6],[498,4.0],[500,3.7],[2,0.4],[1582,3.2],[300,2.7],[-200,-40.0]],
      note: "(4)월 회계감사, 세무조정수수료 비용" },
    { label: "영업이익", level: 0, bold: true, emphasize: true,
      cells: [[681,5.2],[137,1.1],[481,3.6],[345,-251.8],[1243,2.5],[0,0.0],[-482,100.0]] },
  ],
};
// 경영회의 2026년 04월 보고서 - 페이지 9~13 데이터
// 출처: D:\AI\경영회의\1.경영회의(2026년04월)_보고서.xlsx (openpyxl, data_only=True)
//       시트: "3.프로젝트(KOREA)"(p9), "3-1.투자비"(p10), "3-2.투자비_상세"(p11),
//             "4-1.고객실적 및 사내공정불량율(26년)"(p12), "4-2.Q-COST 실적&주요이벤트 및 공지"(p13)
//       + D:\AI\경영회의\1.경영회의(2026년04월)_보고서.pdf (pdfplumber 텍스트 추출로 교차검증)
// 당월(4월) 기준: 4월까지 실적 반영, 5~12월은 null.
// 세부 판단 근거/구조적 차이/스팟체크 수치는 report-data-2026-04-p9to13.notes.txt 참조.
// REPORT 전역 객체는 다른 파일(1~8p, 4~8p 데이터)에서 이미 생성되어 있다고 가정하고 여기서는 속성만 추가합니다.

// ---------------- Page 9: 신규 Project 진행 현황 ----------------
REPORT.page9 = {
  groups: [
    {
      plant: "Cheon-an", commodity: "Wheel", customer: null,
      projects: [
        {
          project: "LW1",
          rows: [
            { pname: "Steel Wheel (16×6.5J, 4.25T)",
              tko: "25-9-17", d1: { v: "26-4-6", state: "green" }, line: "26-3-19", pvStart: "26-3-30",
              pvDone: { v: "28-7-15", note: "품질 육성", state: "black" }, ppap: "28-10-15", run: "28-12-18", sorp: "29-1-15",
              recPlan: null, recActual: null, recDate: "2029-01",
              invPlan: 656, invActual: 266, invRate: 41,
              remarks: "부품가 감가상각" },
            { pname: "Steel Wheel (16×6.5J, 3.5T)",
              tko: { v: "25-12-17", state: "green" }, d1: "26-6-26", line: { v: "26-5-15", note: "품질육성", state: "black" }, pvStart: "26-6-8",
              pvDone: "27-1-1", ppap: "27-3-15", run: "27-5-15", sorp: "27-6-30",
              recPlan: null, recActual: null, recDate: "2027-06",
              invPlan: 180, invActual: 180, invRate: 100,
              remarks: "부품가 감가상각" },
            { pname: "Steel Wheel (14×4.5J)",
              tko: { v: "26-1-28", state: "green" }, d1: "26-7-15", line: { v: "26-6-12", note: "Tooling", state: "black" }, pvStart: "26-6-29",
              pvDone: "27-3-15", ppap: "27-6-15", run: "27-8-15", sorp: "27-9-15",
              recPlan: null, recActual: null, recDate: "2027-09",
              invPlan: 223, invActual: 223, invRate: 100,
              remarks: "부품가 감가상각" },
          ],
        },
      ],
    },
    {
      plant: "Cheon-an", commodity: "EV", customer: null,
      mergeGroupCols: true,
      groupRecovery: { plan: 2364, actual: null, date: "2027-10" },
      groupInvest: { plan: 1908, actual: null, rate: 0 },
      groupRemarks: "총 투자비 : 3168.4\n1. 재료비 : 1200.6\n2. 경비 : 59.8\n3. 투자비 : 1,908",
      projects: [
        {
          project: "E092 KF1\n(Proto)",
          rows: [
            { pname: "Housing UPR",
              tko: { v: "26-3-16", state: "green" }, d1: "26-7-3", line: { v: "26-5-22", note: "Tooling", state: "black" }, pvStart: "TBD",
              pvDone: "TBD", ppap: "28-3-10", run: "28-9-8", sorp: "29-4-2" },
            { pname: "Housing LWR",
              tko: { v: "26-3-16", state: "green" }, d1: "26-7-3", line: { v: "26-5-22", note: "Tooling", state: "black" }, pvStart: "TBD",
              pvDone: "TBD", ppap: "28-3-10", run: "28-9-8", sorp: "29-4-2" },
            { pname: "ENDPLATE FRT/RR",
              tko: { v: "26-3-16", state: "green" }, d1: "26-7-3", line: { v: "26-5-22", note: "Tooling", state: "black" }, pvStart: "TBD",
              pvDone: "TBD", ppap: "28-3-10", run: "28-9-8", sorp: "29-4-2" },
          ],
        },
      ],
    },
    {
      plant: "Plymouth", commodity: "Solar", customer: null,
      projects: [
        {
          project: "Nevados",
          rows: [
            { pname: "Retention",
              tko: { v: "25-12-29", state: "green" }, d1: "N/A", line: { v: "26-5-15", note: "Shipping", state: "black" }, pvStart: "N/A",
              pvDone: "N/A", ppap: "26-5-29", run: "26-5-29", sorp: "26-6-1",
              recPlan: null, recActual: null, recDate: "2026-07",
              invPlan: 418, invActual: 365, invRate: 87,
              remarks: "고객 회수\n2,228\n(350+1,878)" },
            { pname: "Articulating Coupler",
              tko: { v: "25-12-29", state: "green" }, d1: "N/A", line: { v: "26-6-12", note: "품질육성", state: "black" }, pvStart: "N/A",
              pvDone: "N/A", ppap: "26-6-19", run: "26-6-26", sorp: "26-7-1",
              recPlan: null, recActual: null, recDate: "2026-08",
              invPlan: 1643, invActual: 1137, invRate: 69,
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
    monthlyActual: [2802, 121, 397, 256, null, null, null, null, null, null, null, null],
    cumPlan:       [3874, 4396, 4396, 4736, 4781, 4791, 4791, 4851, 4851, 4851, 4851, 4861],
    cumExecuted:   [3935, 4457, 4813, 7186, 7231, 7241, 7241, 7301, 7301, 7301, 7301, 7311],
    cumActual:     [2802, 2923, 3319, 3575, null, null, null, null, null, null, null, null],
  },
  remainingByCategory: {
    labels: ["Wheel", "북미", "Body", "Chassis", "Seat", "공통", "Module"],
    values: [405, 658, 1908, 297, 227, 93, 0],
  },
  recoveryByYear: {
    years: ["2026년", "2027년"],
    plan:   [6239, 23],
    actual: [880, 0],
  },
  table: {
    groups: [
      {
        label: "합계", labelSpan: 4, valsSpan: 4,
        planDelta: 2450, execSaving: -148, cancel: null, remaining: 3588,
        rows: [
          { sub: "사업계획", y2025: 5071, months: [3874, 522, null, 340, 45, 10, null, 60, null, null, null, 10], total: 4861,
            recovery: { y2025: 15502, y2026: 4875, y2027: 23, total: 20399 } },
          { sub: "실행계획", y2025: 6031, months: [3935, 522, 355, 2374, 45, 10, null, 60, null, null, null, 10], total: 7311,
            recovery: { y2025: 15966, y2026: 6239, y2027: 23, total: 22228 } },
          { sub: "실적", y2025: 5710, months: [2802, 121, 397, 256, null, null, null, null, null, null, null, null], total: 3575,
            recovery: { y2025: 15966, y2026: 880, y2027: null, total: 16846 } },
          { sub: "%", isPct: true, y2025: 95, months: [71, 23, 112, 11, 0, null, null, null, null, null, null, null], total: 49,
            recovery: { y2025: 100, y2026: 14, y2027: null, total: 76 } },
        ],
      },
      {
        label: "국내", labelSpan: 3, valsSpan: 3,
        planDelta: 2450, execSaving: -3, cancel: null, remaining: 2930,
        rows: [
          { sub: "사업계획", y2025: 5071, months: [1569, 522, null, 340, 45, 10, null, 60, null, null, null, 10], total: 2556,
            recovery: { y2025: 15502, y2026: 1864, y2027: 23, total: 17388 } },
          { sub: "실행계획", y2025: 5323, months: [1630, 522, 355, 2374, 45, 10, null, 60, null, null, null, 10], total: 5006,
            recovery: { y2025: 15966, y2026: 3228, y2027: 23, total: 19217 } },
          { sub: "실적", y2025: 5011, months: [1341, 121, 355, 256, null, null, null, null, null, null, null, null], total: 2073,
            recovery: { y2025: 15966, y2026: 880, y2027: null, total: 16846 } },
        ],
      },
      {
        label: "해외\n선투자", labelSpan: 3, valsSpan: 3,
        planDelta: null, execSaving: -145, cancel: null, remaining: 658,
        rows: [
          { sub: "사업계획", y2025: null, months: [2305, null, null, null, null, null, null, null, null, null, null, null], total: 2305,
            recovery: { y2025: null, y2026: 3011, y2027: null, total: 3011 } },
          { sub: "실행계획", y2025: 708, months: [2305, null, null, null, null, null, null, null, null, null, null, null], total: 2305,
            recovery: { y2025: null, y2026: 3011, y2027: null, total: 3011 } },
          { sub: "실적", y2025: 699, months: [1461, null, 41, null, null, null, null, null, null, null, null, null], total: 1502,
            recovery: { y2025: null, y2026: null, y2027: null, total: null } },
        ],
      },
    ],
  },
  notes: [
    "1. 2026년 실행계획 투자비: 7,311백만원 (사업계획 4,861백만원 + 추가계획 2,450백만원)",
    "2. (04월) 실적: 256백만원 — HKMC LW1 STEEL WHEEL 14X4.5J 개발 223백만원, HKMC LW1 STEEL WHEEL 16인치 설계 변경 13백만원, US4 설계변경 반영을 통한 조립성 개선 및 품질 안정화 20백만원",
    "3. 고객사 회수 계획: 6,239백만원 — 우즈벡 GSV EM RETOOL'G 잔금 10%(241.3백만원), UZAUTO GEM BSUV FRT CRADLE RETOOLING 중도금/잔금 50%(683백만원), C1xx Top cover B sample Tooling(38백만원), 9BQX FLANGE-EXH PIPE ASM 중도금2차(23백만원), 9BU/Qx TRACK ASM 2025 RETOOLING 금형비(83백만원), US4 설변 및 안전기준 강화 금형비(880백만원), 북미 오스템아메리카 선투자 회수(3,011백만원), KF1 B-Sample Tooling(1,281백만원: Housing UPR/LWR 1,072백만원 + End Plate FRT/RR 210백만원)",
    "4. 고객사 회수 실적: 880백만원 — 국내 880백만원(MANO US4 설계변경 & 안전기준 강화 금형비+ED&D 100% 회수)",
  ],
};

// ---------------- Page 11: 투자비 상세 현황 ----------------
REPORT.page11 = {
  groups: [
    { category: "Wheel", item: "LW1", plan: 794, extra: 13, cancel: 0, total: 807, actual: 416, rate: 52, saving: 1, unexecuted: 390,
      remarks: "LW1 STEEL WHEEL 16인치 설계 변경 및 이원화 개발(180/180), LW1 STEEL WHEEL 14X4.5J 개발(224.1/223), LW1 STEEL WHEEL 16인치 설계 변경(13/13), TOP-COATING SPRAY BOOTH 개선(340)" },
    { category: "Wheel", item: "기타", plan: 15, extra: 261, cancel: null, total: 276, actual: 261, rate: 95, saving: null, unexecuted: 15,
      remarks: "1공장 콤프레샤 연동시스템 설치 및 응축수 드레인 트랩 설치(15) / 추가: 3500T PRESS 동력전달계통(DRIVE GEAR PARTS) 수리(61/61), 3500TON PRESS의 정상상태 복원을 위한 DRIVE GEAR 신착/교체(200/200)" },
    { category: "Body", item: "KF1 B-sample", plan: null, extra: 1908, cancel: null, total: 1908, actual: null, rate: 0, saving: null, unexecuted: 1908,
      remarks: "KF1 B-SAMPLE 개발 투자비(전체 비용(원재료, 경비 포함) 3,168백만원중 투자비 금액 1,908백만원)" },
    { category: "Chassis", item: "9BXX", plan: 172, extra: null, cancel: null, total: 172, actual: null, rate: 0, saving: null, unexecuted: 172,
      remarks: "FLCA WELD LINE 개조(성인화)(145), 9BQX/9BUX 용접라인 공통 용접기 노후 신품 구매(27)" },
    { category: "Chassis", item: "BSUV(UZ)", plan: 1100, extra: null, cancel: null, total: 1100, actual: 1100, rate: 100, saving: null, unexecuted: null,
      remarks: "우즈벡 B-SUV 신규 금형제작(1,100/1,100)" },
    { category: "Chassis", item: "기타", plan: 178, extra: null, cancel: null, total: 178, actual: 51, rate: 30, saving: 2, unexecuted: 125,
      remarks: "2공장 콤프레샤 노후 신형으로 교체(45), 3공장 인버터 콤프레샤 교체(60), E/D2 4LINE 트롤리 체인 노후 교체 공사(계획53/실적51), A/S 공급 ISSUE 대응(20)" },
    { category: "Seat", item: "9BUX", plan: 227, extra: 64, cancel: null, total: 291, actual: 64, rate: 22, saving: null, unexecuted: 227,
      remarks: "9BXX TRACK LWR WELD LINE 개조(성인화)(227), 9BQX SEAT 양산 RE-TOOLING 금형 개발(64/64)" },
    { category: "Seat", item: "기타", plan: 70, extra: 20, cancel: null, total: 90, actual: 90, rate: 100, saving: null, unexecuted: null,
      remarks: "협력업체(정운) 반납 대응(계획70/실적70), US4 설계변경 반영을 통한 조립성 개선 및 품질 안정화(20/20)" },
    { category: "공통", item: "총무비품", plan: null, extra: 184, cancel: null, total: 184, actual: 91, rate: 50, saving: null, unexecuted: 93,
      remarks: "법인 업무용 차량 매입(183.9/91)" },
    { category: "해외선투자", item: "북미 Nevados", plan: 2305, extra: null, cancel: null, total: 2305, actual: 1502, rate: 71, saving: 145, unexecuted: 658,
      remarks: "NEVADOS, BEARING ASM 북미 양산금형 개발(510/418), RETENTION 북미 양산금형 개발(145/145), MACHANICAL STOP 북미 양산금형 개발(80), NEVADOS - BEARING CRADLE(1,037/650), 북미오스템 LEVELER(400TON) 신규 투자(273/220), NEVADOS - MECHANICAL STOP(164), BEARING CRADLE 개발 관련 C/F 제작(95/69)" },
  ],
  total: { plan: 4861, extra: 2450, cancel: null, total: 7311, actual: 3575, rate: 51, saving: 148, unexecuted: 3588 },
};

// ---------------- Page 12: 품질지표 - 고객실적 / PPM ----------------
REPORT.page12 = {
  customerResult: {
    months: ["1월","2월","3월","4월","5월","6월","7월","8월","9월","10월","11월","12월"],
    spps: {
      target:  [0,0,0,0,0,0,0,0,0,0,0,0],
      wheel:   [0,0,0,0,null,null,null,null,null,null,null,null],
      chassis: [0,0,0,0,null,null,null,null,null,null,null,null],
      seat:    [0,0,0,0,null,null,null,null,null,null,null,null],
      incheon: [0,0,0,0,null,null,null,null,null,null,null,null],
    },
    lineStop: {
      target:  [0,0,0,0,0,0,0,0,0,0,0,0],
      wheel:   [0,0,0,0,null,null,null,null,null,null,null,null],
      chassis: [0,0,0,0,null,null,null,null,null,null,null,null],
      seat:    [0,0,0,0,null,null,null,null,null,null,null,null],
      incheon: [0,0,0,0,null,null,null,null,null,null,null,null],
    },
  },
  issue: "",
  ppm: {
    wheel:   { target: [175,120,120,120,100,100,100,100,100,100,80,80,80], actual: [140,117,47,26,43,null,null,null,null,null,null,null,null], cumTarget: 100, cumActual: 64 },
    chassis: { target: [148,40,40,40,35,35,35,35,35,35,30,30,30], actual: [49,38,28,31,22,null,null,null,null,null,null,null,null], cumTarget: 35, cumActual: 26 },
    seat:    { target: [12,1,1,1,1,1,1,1,1,1,1,1,1], actual: [2,0,0,0,0,null,null,null,null,null,null,null,null], cumTarget: 1, cumActual: 0 },
    module:  { target: [0,0,0,0,0,0,0,0,0,0,0,0,0], actual: [0,0,0,0,0,null,null,null,null,null,null,null,null], cumTarget: 0, cumActual: 0 },
  },
};

// ---------------- Page 13: 품질지표 - Q-COST ----------------
REPORT.page13 = {
  months: ["1월","2월","3월","4월","5월","6월","7월","8월","9월","10월","11월","12월"],
  groups: [
    {
      label: "Chassis\n&\nWheel\nQ-Cost",
      target:   { v2025: 2640, m: [1330,1330,1330,1280,1280,1280,1280,1280,1280,1180,1180,1180], total: 15210 },
      actual:   { v2025: 1798, m: [1260,759,947,855,null,null,null,null,null,null,null,null], total: 3820 },
      failCost: { v2025: 1070, m: [851,225,343,605,null,null,null,null,null,null,null,null], total: 2023 },
      items: [
        { label: "9BUX",     v2025: 863, m: [851,186,195,443,null,null,null,null,null,null,null,null], total: 1675 },
        { label: "AURORA",   v2025: 75,  m: [null,39,57,null,null,null,null,null,null,null,null,null], total: 95 },
        { label: "LJL",      v2025: 15,  m: [null,null,null,null,null,null,null,null,null,null,null,null], total: null },
        { label: "C121",     v2025: 15,  m: [null,null,91,162,null,null,null,null,null,null,null,null], total: 253 },
        { label: "기타차종", v2025: 7,   m: [null,null,null,null,null,null,null,null,null,null,null,null], total: null },
        { label: "F/CLAIM",  v2025: 95,  m: [null,null,null,null,null,null,null,null,null,null,null,null], total: null },
      ],
      evalCost: { v2025: 637, m: [409,534,604,250,null,null,null,null,null,null,null,null], total: 1797 },
      prevCost: { v2025: 91,  m: [null,null,null,null,null,null,null,null,null,null,null,null], total: null },
      rate:     { v2025: 0.03, m: [0.01,0.01,0.01,0.02,null,null,null,null,null,null,null,null], total: 0.02 },
    },
    {
      label: "Seat\nQ-Cost",
      target:   { v2025: 555, m: [260,260,260,200,200,200,200,200,200,160,160,160], total: 2460 },
      actual:   { v2025: 292, m: [178,99,161,90,null,null,null,null,null,null,null,null], total: 528 },
      failCost: { v2025: 90,  m: [null,null,null,null,null,null,null,null,null,null,null,null], total: null },
      items: [
        { label: "9BUX",     v2025: 26, m: [null,null,null,null,null,null,null,null,null,null,null,null], total: null },
        { label: "기타차종", v2025: null, m: [null,null,null,null,null,null,null,null,null,null,null,null], total: null },
        { label: "F/CLAIM",  v2025: 64, m: [null,null,null,null,null,null,null,null,null,null,null,null], total: null },
      ],
      evalCost: { v2025: 202, m: [178,99,161,90,null,null,null,null,null,null,null,null], total: 528 },
      prevCost: { v2025: null, m: [null,null,null,null,null,null,null,null,null,null,null,null], total: null },
      rate:     { v2025: 0.01, m: [0.01,0.01,0.01,0.01,null,null,null,null,null,null,null,null], total: 0.01 },
    },
  ],
  eventTable: {
    rows: [
      { category: "고객",
        issue: "1. GMK SQE 김재민 팀장, 정영진 차장 방문예정\n  - 방문일자 : 2026년 4월 23일\n  - 방문목적 : LPA(Layered Process Audit) 및 양산 라인 점검",
        schedule: "4/23", remarks: "" },
    ],
  },
};
