// 경영회의 2026년 06월 보고서 - 전체 페이지 데이터
// 출처: D:\AI\경영회의\1.경영회의(2026년06월)_보고서.xlsx (엑셀 원본 직접 추출, openpyxl data_only=True; 일부 특이사항은 PDF 텍스트 좌표 대조로 보강)

const REPORT = {};

// 경영회의 2026년 06월 보고서 - 페이지 4~8 데이터
// 출처: D:\AI\경영회의\1.경영회의(2026년06월)_보고서.xlsx (openpyxl, data_only=True로 직접 추출)
// report-render.js의 renderPage4~renderPage8과 report-data.js(2026년08월)/report-data-2026-07.js(2026년07월)의
// REPORT.page4~page8과 동일한 필드명/구조를 사용합니다. 세부 참고사항은 report-data-2026-06-p4to8.notes.txt 참조.
// (REPORT 전역 객체는 이미 선언되어 있다고 가정 - report-data.js 등에서 선언)

// ---------------- Page 4: 매출/부가가치/인원 현황 ----------------
REPORT.page4 = {
  months: ["1월","2월","3월","4월","5월","6월","7월","8월","9월","10월","11월","12월"],
  forecastIndex: 6,
  revenue: {
    label: "매출\n(백만원)",
    plan:    { yr: 102679, avg: 8557,  m: [10333,8103,10873,10654,10013,9872,10586,5699,9210,10568,10113,10400], cum: 59847, total: 116422 },
    revised: { yr: null, avg: null, m: [null,null,null,null,null,null,null,null,null,null,null,null], cum: null, total: null },
    actual:  { yr: 122546, avg: 10212, m: [12546,10108,13094,13598,11339,12222,12227,null,null,null,null,null], cum: 72907, total: 72907 },
    pct:     { yr: 119, avg: 119, m: [121,125,120,128,113,124,116,null,null,null,null,null], cum: 122, total: 63 },
  },
  valueAdded: {
    label: "부가가치\n(백만원)",
    plan:    { yr: 35232, avg: 2936, m: [3601,2845,3822,3729,3502,3451,3740,1958,3236,3729,3527,3621], cum: 20951, total: 40762 },
    revised: { yr: null, avg: null, m: [null,null,null,null,null,null,null,null,null,null,null,null], cum: null, total: null },
    actual:  { yr: 40323, avg: 3360, m: [4258,3493,4781,4712,3919,4420,4209,null,null,null,null,null], cum: 25584, total: 25584 },
    pct:     { yr: 114, avg: 114, m: [118,123,125,126,112,113,113,null,null,null,null,null], cum: 122, total: 63 },
  },
  headcount: {
    label: "인원현황\n(명)",
    plan:    { yr: 373, avg: 373, m: [369,366,371,368,369,365,360,357,371,371,366,366], cum: 368, total: 367 },
    revised: { yr: 370, avg: 370, m: [361,360,360,346,346,346,346,341,341,341,341,341], cum: 353, total: 348 },
    actual:  { yr: 368, avg: 368, m: [361,360,360,360,358,357,357,null,null,null,null,null], cum: 359, total: 359 },
    pct:     { yr: 99, avg: 99, m: [98,98,97,98,97,98,99,null,null,null,null,null], cum: 98, total: 98 },
  },
  laborCost: {
    label: "인건비",
    plan:    { yr: 26429, avg: 2202, m: [2413,2358,2437,2288,2502,2195,2251,2033,2424,2480,2265,2258], cum: 14193, total: 27904 },
    revised: { yr: null, avg: null, m: [null,null,null,null,null,null,null,null,null,null,null,null], cum: null, total: null },
    actual:  { yr: 28528, avg: 2377, m: [2586,2294,2759,2652,2604,2746,2496,null,null,null,null,null], cum: 15641, total: 15641 },
    pct:     { yr: 108, avg: 108, m: [107,97,113,116,104,125,111,null,null,null,null,null], cum: 110, total: 56 },
  },
  laborIndicators: {
    label: "인건비 지표\n(실적)",
    perCapita:   { yr: 77.5, avg: 6.5, m: [7.2,6.4,7.7,7.4,7.3,7.7,7.0,null,null,null,null,null], cum: 43.5, total: 43.5, unit: "" },
    laborRate:   { yr: 23.3, avg: 23.3, m: [20.6,22.7,21.1,19.5,23.0,22.5,20.4,null,null,null,null,null], cum: 21.5, total: 21.5, unit: "%" },
    distribRate: { yr: 70.7, avg: 70.7, m: [60.7,65.7,57.7,56.3,66.4,62.1,59.3,null,null,null,null,null], cum: 61.1, total: 61.1, unit: "%" },
    overtime:    { yr: 39.9, avg: 39.9, m: [62.3,45.4,57.4,61.2,62.7,45.0,43.0,null,null,null,null,null], cum: 55.7, total: 55.7, unit: "" },
    overtimePrevYear: { yr: 39.9, avg: 39.9, m: [38.0,31.2,44.3,32.0,62.6,50.8,38.4,10.8,16.3,55.9,39.8,58.7], cum: 43.1, total: 39.9, unit: "" },
  },
  // 참고: 2026년 06월 보고서 원본(PDF)에는 매출/부가가치/인건비의 "수정계획" 행이 존재하지 않음(사업계획/실적/% 3행만 인쇄).
  // 인원현황만 사업계획/수정계획/실적/% 4행이 모두 존재. 위 revised 항목은 원본에 없는 데이터이므로 null로 채움(렌더 시 "-" 표시).
  // 우측 연간 막대그래프도 원본에는 전년매출/사업계획/년간예상 3개 막대만 존재(수정계획 막대 없음).
  annualBar: { labels: ["전년매출", "사업계획", "년간예상"], values: [1225, 1164, 1311] },
};

// ---------------- Page 5: 매출 상세 증감 현황 ----------------
// 출처: D:\AI\경영회의\1.경영회의(2026년06월)_보고서.xlsx 시트 "매출분석"
// 열 순서: [6월 생산(계획,실적,증감,%)] [6월 매출(계획,실적,증감,%)] [7월 생산(계획,실행계획,증감,%)] [7월 매출(계획,실행계획,증감,%)] [전월대비 매출(증감,%)]
// (원본 시트 헤더는 "6월 실적" 섹션의 계획 열을 "사업계획"으로 표기하나, report-render.js는 헤더 문구를 "수정계획"으로 고정 출력함 — 데이터 값 자체는 동일)
REPORT.page5 = {
  unitHeader: "수량\n단위",
  currentMonthLabel: "6월",
  nextMonthLabel: "7월",
  total: { label: "합 계", v: [89622,95355,5733,6, 9872,12222,2350,24, 88754,84121,-4633,-5, 10586,12227,1642,16, 6,0] },
  groups: [
    {
      label: "자동차",
      subtotal: { v: [68872,78063,9191,13, 9733,12059,2326,24, 68004,83778,15774,23, 10447,11769,1322,13, -290,-2] },
      items: [
        { customer: "GMK 부평", customerRowspan: 1, model: "9BUX/9BQB", unit: "대분", v: [19377,23413,4036,21, 3931,4678,747,19, 21300,24092,2792,13, 4318,4801,483,11, 123,3] },
        { customer: "GMK 창원", customerRowspan: 1, model: "9BQC", unit: "대분", v: [19086,23295,4209,22, 3881,4810,929,24, 20647,23004,2357,11, 4198,4768,569,14, -43,-1] },
        { customer: "GM", customerRowspan: 1, model: "C121", unit: "대분", v: [2700,3240,540,20, 601,887,286,48, 2862,3132,270,9, 637,733,96,15, -154,-17] },
        { customer: "RKM", customerRowspan: 3, model: "LJL", unit: "대분", v: [511,488,-23,-5, 18,16,-1,-7, 1552,2148,596,38, 53,72,19,35, 56,340] },
        { customer: null, model: "AURORA-1", unit: "대분", v: [3180,434,-2746,-86, 346,44,-302,-87, 4550,3062,-1488,-33, 495,332,-163,-33, 288,657] },
        { customer: null, model: "AURORA-2", unit: "대분", v: [1864,2070,206,11, 192,209,17,9, 1944,1509,-435,-22, 200,164,-37,-18, -46,-22] },
        { customer: "HMC", customerRowspan: 1, model: "US4", unit: "대분", v: [126,137,11,9, 336,389,53,16, 99,120,21,21, 264,341,77,29, -48,-12] },
        { customer: "KGM", customerRowspan: 1, model: "Y450", unit: "대분", v: [656,516,-140,-21, 44,31,-13,-29, 656,460,-196,-30, 44,31,-13,-30, 0,-1] },
        { customer: "EXPORT", customerRowspan: 2, model: "GSV-EM", unit: "대분", v: [11700,22154,10454,89, 323,823,500,155, 7200,11250,4050,56, 199,357,159,80, -466,-57] },
        { customer: null, model: "SEAT", unit: "대분", v: [9672,2316,-7356,-76, 60,138,77,128, 7194,15001,7807,109, 38,170,132,350, 32,23] },
        { customer: "A/S", customerRowspan: 1, model: null, unit: null, v: [null,null,null,null, 0,33,33,0, null,null,null,null, 0,0,0,0, -33,-100] },
      ],
    },
    {
      label: "SOLAR",
      subtotal: { v: [20750,17292,-3458,-17, 139,163,24,17, 20750,343,-20407,-98, 139,459,320,231, 296,182] },
      items: [
        { merged: true, label: "AUSTEM AMERICA\n(STAMPING)", unit: "EA", v: [20750,17292,-3458,-17, 139,163,24,17, 20750,0,-20750,-100, 139,0,-139,-100, -163,-100] },
        { merged: true, label: "NOBULL ENERGY\n(H-BEAM)", unit: "EA", v: [0,0,0,0, 0,0,0,0, 0,343,343,0, 0,459,459,0, 459,0] },
      ],
    },
  ],
};

// ---------------- Page 6: 사업부문별 상세현황 ----------------
// 출처: D:\AI\경영회의\1.경영회의(2026년06월)_보고서.xlsx 시트 "1-1.상세"
// v: [5월실적, 6월수정계획,6월실적,%,전월대비, 7월수정계획,7월실행계획,%,전월대비]
REPORT.page6 = {
  prevMonthLabel: "5월",
  currentMonthLabel: "6월",
  nextMonthLabel: "7월",
  // 차량생산: 자체 합계 없음 (부평/창원/KG모빌리티/RKM 실적만)
  vehicleGroupLabel: "차량생산",
  vehicleRows: [
    { name: "부평", v: [21893, 19377,23413,121,107, 21300,24092,113,103], note8: "* 2026년 임단협 교섭 진행 중", note9: "", shift: "2shift" },
    { name: "창원", v: [23589, 19086,23295,122,99, 20647,23004,111,99], note8: "", note9: "", shift: "2shift" },
    { name: "KG 모빌리티", v: [504, 656,516,79,102, 656,460,70,89], note8: "", note9: "", shift: "2shift" },
    { name: "RKM", v: [3552, 5555,2992,54,84, 8046,6719,84,225], note8: "* 2026년 임단협 교섭 진행 중\n* 6월 : TPS(11일), 7월 : TPS(1일)", note9: "", shift: "1shift" },
  ],
  // 매출: 총계 + Wheel/Body/Chassis/Module/Seat/Solar
  salesGroupLabel: "매출",
  salesTotal: { v: [11339, 9872,12222,124,108, 10586,12227,116,100] },
  salesRows: [
    { name: "Wheel", v: [793, 769,769,100,97, 845,854,101,111], note8: "", note9: "" },
    { name: "Body", v: [1, 0,18,0,2333, 0,0,0,0], note8: "* TWB A/S", note9: "" },
    { name: "Chassis", v: [6584, 6079,7687,126,117, 6599,7380,112,96], note8: "* 증가(GMK, UZ-AUTO, C121)\n* 감소(RKM)", note9: "* 증가(GMK, UZ-AUTO, C121)\n* 감소(RKM)" },
    { name: "Module", v: [401, 365,422,116,105, 392,432,110,102], note8: "* 증가(GMK)", note9: "* 증가(GMK)" },
    { name: "Seat", v: [3270, 2520,3163,125,97, 2611,3103,119,98], note8: "* 증가(GMK, US4, 직수출)", note9: "* 증가(GMK, 직수출)" },
    { name: "Solar", v: [290, 139,163,117,56, 139,459,331,282], note8: "* 감소(Stamping)", note9: "* 증가(H-Beam)" },
  ],
  // 직접인원: 총계 + Wheel/Body/Chassis/Module/Seat
  headcountGroupLabel: "직접인원",
  headcountTotal: { v: [190, 196,190,97,null, 196,190,97,null] },
  headcountRows: [
    { name: "Wheel", v: [22, 22,22,100,null, 22,22,100,null] },
    { name: "Body", v: [19, 24,19,79,null, 24,19,79,null] },
    { name: "Chassis", v: [75, 74,75,101,null, 74,75,101,null] },
    { name: "Module", v: [30, 30,30,100,null, 30,30,100,null] },
    { name: "Seat", v: [44, 46,44,96,null, 46,44,96,null] },
  ],
};

// ---------------- Page 7: 환율 변동 Impact ----------------
// 출처: D:\AI\경영회의\1.경영회의(2026년06월)_보고서.xlsx 시트 "누적환율변동 Impact"
// v: [년간(2025), 월평균(2025), 1월..12월 실적/계획, 누계]  (6월 보고서: 1~6월 실적 + 7월 계획, 8월부터 null)
REPORT.page7 = {
  months: ["1월","2월","3월","4월","5월","6월","7월","8월","9월","10월","11월","12월"],
  forecastIndex: 6,
  fxRate: {
    planYear2025: 1250, plan2026: 1300,
    actualYear2025: 1423,
    actualMonthly: [1457,1451,1492,1486,1490,1520,1500,null,null,null,null,null],
  },
  revenue: {
    rows: [
      { name: "Wheel", v: [1,0, 0,0,0,0,0,0,0, null,null,null,null,null, 0] },
      { name: "Chassis", v: [763,64, 105,112,224,186,101,247,168, null,null,null,null,null, 974], note: "GSV-EM, C121" },
      { name: "Seat", v: [276,23, 13,15,22,22,24,19,23, null,null,null,null,null, 116], note: "H62X, GMI31UX" },
      { name: "Solar", v: [1182,98, 99,45,19,68,36,24,71, null,null,null,null,null, 291] },
    ],
    total: { v: [2221,185, 217,172,265,276,161,290,261, null,null,null,null,null, 1381] },
  },
  valueAdded: {
    rows: [
      { name: "Wheel", v: [1,0, 0,0,0,0,0,0,0, null,null,null,null,null, 0] },
      { name: "Chassis", v: [667,56, 87,97,200,164,85,231,145, null,null,null,null,null, 865], note: "9BUX & AURORA Bush" },
      { name: "Seat", v: [276,23, 13,15,22,22,24,19,23, null,null,null,null,null, 116] },
      { name: "Solar", v: [776,65, 59,26,10,43,21,16,11, null,null,null,null,null, 175], note: "관세 & DDP 운반비" },
    ],
    total: { v: [1719,143, 160,138,232,230,130,266,179, null,null,null,null,null, 1155] },
  },
  duty: {
    rateNote: "관세율: 25% → 50% (2025년 중 인상), 2026년 1~7월 50% 유지 (Steel 50%, 사출 15%)",
    rows: [
      { name: "Solar", v: [2669,222, 271,143,56,151,92,38,0, null,null,null,null,null, 751] },
    ],
  },
};

// ---------------- Page 8: 전월 실적 및 당월 예상 손익 현황 ----------------
// 출처: D:\AI\경영회의\1.경영회의(2026년06월)_보고서.xlsx 시트 "2.손익(06월)"
REPORT.page8 = {
  columns: ["05월 실적","06월 실행계획","06월 실적","실행계획대비","누적 실적(~06월)","07월 실행계획","전월실적 대비"],
  rows: [
    { label: "매출액", level: 0, bold: true, note: "",
      cells: [[11339,100.0],[11570,100.0],[12222,100.0],[651,5.6],[72907,100.0],[12227,100.0],[6,0.0]] },
    { label: "자동차", level: 1,
      cells: [[11049,97.4],[11540,99.7],[12059,98.7],[519,4.5],[70392,96.6],[11769,96.2],[-290,-2.4]] },
    { label: "solar", level: 1,
      cells: [[290,2.6],[30,0.3],[163,1.3],[132,437.5],[2515,3.4],[459,3.8],[296,181.9]] },
    { label: "부가가치", level: 0, bold: true,
      cells: [[3919,34.6],[4045,35.0],[4420,36.2],[376,9.3],[25584,35.1],[4209,34.4],[-212,-4.8]] },
    { label: "자동차", level: 1,
      cells: [[3916,34.5],[4047,35.0],[4411,36.1],[364,9.0],[25547,35.0],[4181,34.2],[-230,-5.2]] },
    { label: "solar", level: 1,
      cells: [[3,0.0],[-3,0.0],[9,0.1],[12,462.2],[37,0.1],[28,0.2],[18,193.1]] },
    { label: "매출원가", level: 0, bold: true,
      cells: [[10746,94.8],[10707,92.5],[11245,92.0],[539,5.0],[67821,93.0],[11253,92.0],[8,0.1]],
      note: "※환율적용기준\n1)05월환율효과: 130백만원(부가가치기준)_손익반영\n2)06월환율효과: 266백만원(부가가치기준)_손익반영\n3)07월환율(예상)효과: 179백만원_손익미반영(1,500원/$기준)" },
    { label: "재료비", level: 1,
      cells: [[7420,65.4],[7526,65.0],[7801,63.8],[276,3.7],[47323,64.9],[8019,65.6],[217,2.8]] },
    { label: "노무비", level: 1,
      cells: [[2151,19.0],[2024,17.5],[2259,18.5],[234,11.6],[12790,17.5],[2034,16.6],[-225,-10.0]] },
    { label: "정규", level: 2,
      cells: [[1819,16.0],[1654,14.3],[1927,15.8],[272,16.4],[10832,14.9],[1704,13.9],[-223,-11.6]],
      note: "2026년 임금교섭 반영(6월~)\n- 5월 소급분 6월급여에 소급지급: 28백만원 및 일시금 6월급여에 포함" },
    { label: "도급", level: 2,
      cells: [[332,2.9],[370,3.2],[332,2.7],[-38,-10.3],[1959,2.7],[330,2.7],[-2,-0.6]] },
    { label: "제조경비", level: 1,
      cells: [[1175,10.4],[1156,10.0],[1185,9.7],[29,2.5],[7708,10.6],[1201,9.8],[16,1.3]] },
    { label: "인건비성 경비", level: 2,
      cells: [[236,2.1],[230,2.0],[255,2.1],[25,10.9],[1583,2.2],[243,2.0],[-12,-4.7]] },
    { label: "수선/소모품비", level: 2,
      cells: [[281,2.5],[246,2.1],[263,2.1],[16,6.6],[1650,2.3],[270,2.2],[7,2.8]] },
    { label: "전력비", level: 2,
      cells: [[269,2.4],[260,2.2],[265,2.2],[5,1.9],[1693,2.3],[273,2.2],[8,3.0]] },
    { label: "감가상각", level: 2,
      cells: [[182,1.6],[182,1.6],[182,1.5],[0,0.0],[1092,1.5],[182,1.5],[0,0.0]] },
    { label: "포장비", level: 2,
      cells: [[54,0.5],[80,0.7],[65,0.5],[-15,-18.8],[436,0.6],[79,0.6],[14,21.5]] },
    { label: "연료비", level: 2,
      cells: [[49,0.4],[50,0.4],[48,0.4],[-2,-4.3],[523,0.7],[44,0.4],[-4,-8.0]] },
    { label: "기타", level: 2,
      cells: [[104,0.9],[108,0.9],[108,0.9],[0,0.0],[731,1.0],[110,0.9],[2,1.9]] },
    { label: "고철매각", level: 1,
      cells: [[333,2.9],[345,3.0],[364,3.0],[19,5.4],[2052,2.8],[355,2.9],[-9,-2.4]] },
    { label: "매출총이익", level: 0, bold: true,
      cells: [[926,8.2],[1209,10.4],[1340,11.0],[131,10.8],[7138,9.8],[1329,10.9],[-11,-0.8]] },
    { label: "판매관리비", level: 0, bold: true,
      cells: [[842,7.4],[824,7.1],[829,6.8],[6,0.7],[5341,7.3],[805,6.6],[-24,-2.9]] },
    { label: "인건비", level: 1,
      cells: [[453,4.0],[475,4.1],[476,3.9],[2,0.4],[2840,3.9],[451,3.7],[-25,-5.3]] },
    { label: "운반비", level: 1,
      cells: [[43,0.4],[39,0.3],[43,0.4],[4,10.3],[243,0.3],[44,0.4],[1,2.3]] },
    { label: "기타", level: 1,
      cells: [[346,3.1],[310,2.7],[310,2.5],[0,0.0],[2258,3.1],[310,2.5],[0,0.0]] },
    { label: "영업이익", level: 0, bold: true, emphasize: true,
      cells: [[84,0.7],[385,3.3],[511,4.2],[125,32.5],[1796,2.5],[524,4.3],[13,-2.6]] },
  ],
};

// 경영회의 2026년 06월 보고서 - 페이지 9~13 데이터
// 출처: D:\AI\경영회의\1.경영회의(2026년06월)_보고서.xlsx (openpyxl, data_only=True로 직접 추출)
//   page9  <- 시트 '3.프로젝트(KOREA)'
//   page10 <- 시트 '3-1.투자비' (잔여투자현황 도넛차트만 '3-2.투자비_상세'!E26:L27 참조)
//   page11 <- 시트 '3-2.투자비_상세'
//   page12 <- 시트 '4-1.고객실적 및 사내공정불량율(26년)'
//   page13 <- 시트 '4-2.Q-COST 실적&주요이벤트 및 공지'
// report-render.js의 renderPage9~renderPage13과 report-data-2026-07.js의 필드명/구조를 그대로 따릅니다.
// 세부 참고사항(불확실한 값, 전월 대비 구조 변화, 검산용 합계)은 report-data-2026-06-p9to13.notes.txt 참조.
// (REPORT 전역 객체는 이미 선언되어 있다고 가정 - 다른 파일에서 선언됨)

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
              invPlan: 655.5, invActual: 265.5, invRate: 41,
              remarks: "부품가 감가상각" },
            { pname: "Steel Wheel (16×6.5J, 3.5T)",
              tko: "25-12-17", d1: { v: "26-7-1", note: "품질육성", state: "black" }, line: "26-5-15", pvStart: { v: "26-6-8", state: "green" },
              pvDone: "27-1-1", ppap: "27-3-15", run: "27-5-15", sorp: "27-6-30",
              recPlan: null, recActual: null, recDate: null,
              invPlan: 195, invActual: 195, invRate: 100,
              remarks: "부품가 감가상각" },
            { pname: "Steel Wheel (14×4.5J)",
              tko: "26-1-28", d1: { v: "26-7-1", note: "품질육성", state: "black" }, line: { v: "26-6-19", state: "green" }, pvStart: "26-6-29",
              pvDone: "27-3-15", ppap: "27-6-15", run: "27-8-15", sorp: "27-9-15",
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
              invPlan: 322.9, invActual: 322.9, invRate: 100,
              remarks: "부품가 감가상각" },
          ],
        },
      ],
    },
    {
      plant: "Cheon-an", commodity: "EV", customer: "삼성SDI",
      mergeGroupCols: true,
      groupRecovery: { plan: 1353, actual: null, date: "2027-10" },
      groupInvest: { plan: 2159.4, actual: 1913.6, rate: 89 },
      groupRemarks: "총 투자비 : 3168.4\n1. 재료비 : 949.2\n2. 경비 : 59.8\n3. 투자비 : 2,159.4",
      projects: [
        {
          project: "E092\nKF1\n(Proto)",
          rows: [
            { pname: "Housing UPR",
              tko: "26-3-16", d1: "26-7-10", line: { v: "26-5-22", state: "green" }, pvStart: { v: "26-6-24", note: "품질육성", state: "black" },
              pvDone: "26-9-13", ppap: "28-3-10", run: "28-9-8", sorp: "29-4-2" },
            { pname: "Housing LWR",
              tko: "26-3-16", d1: "26-7-10", line: { v: "26-5-22", state: "green" }, pvStart: { v: "26-6-24", note: "품질육성", state: "black" },
              pvDone: "26-9-13", ppap: "28-3-10", run: "28-9-8", sorp: "29-4-2" },
            { pname: "ENDPLATE FRT/RR",
              tko: "26-3-16", d1: "26-7-10", line: { v: "26-5-22", state: "green" }, pvStart: { v: "26-6-24", note: "품질육성", state: "black" },
              pvDone: "26-8-17", ppap: "28-3-10", run: "28-9-8", sorp: "29-4-2" },
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
              pvDone: "N/A", ppap: { v: "26-6-30", note: "현지 Trial", state: "black" }, run: "26-6-30", sorp: "26-7-9",
              recPlan: 418, recActual: null, recDate: "2026-07",
              invPlan: 418, invActual: 365, invRate: 87,
              remarks: "고객 회수\n2,228\n(350+1,878)" },
            { pname: "Articulating Coupler",
              tko: "25-12-29", d1: "26-7-20", line: { v: "26-6-19", state: "green" }, pvStart: "N/A",
              pvDone: "N/A", ppap: { v: "26-7-10", note: "현지 Trial", state: "black" }, run: "26-7-10", sorp: "26-7-20",
              recPlan: 1642.7, recActual: null, recDate: "2026-08",
              invPlan: 1642.7, invActual: 1212, invRate: 74,
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
    monthlyActual: [2802, 121, 397, 2183, 203, 364, null, null, null, null, null, null],
    cumPlan:       [3874, 4396, 4396, 4736, 4781, 4791, 4791, 4851, 4851, 4851, 4851, 4861],
    cumExecuted:   [3885, 4407, 4763, 7388, 7500, 7863, 7863, 7923, 7923, 7923, 7923, 7933],
    cumActual:     [2802, 2923, 3319, 5502, 5705, 6069, null, null, null, null, null, null],
  },
  remainingByCategory: {
    labels: ["Wheel", "북미", "EV", "Chassis", "Seat", "공통", "Module"],
    values: [355, 583, 246, 297, 227, 8, 0],
  },
  recoveryByYear: {
    years: ["2026년", "2027년"],
    plan:   [6311, 23],
    actual: [2789, 0],
  },
  table: {
    groups: [
      {
        label: "합계", labelSpan: 4, valsSpan: 4,
        planDelta: 3122, execSaving: -148, cancel: 50, remaining: 1717,
        rows: [
          { sub: "사업계획", y2025: 5071, months: [3874, 522, null, 340, 45, 10, null, 60, null, null, null, 10], total: 4861,
            recovery: { y2025: 15502, y2026: 4875, y2027: 23, total: 20399 } },
          { sub: "실행계획", y2025: 6031, months: [3885, 522, 355, 2625, 113, 363, null, 60, null, null, null, 10], total: 7933,
            recovery: { y2025: 15966, y2026: 6311, y2027: 23, total: 22300 } },
          { sub: "실적", y2025: 5710, months: [2802, 121, 397, 2183, 203, 364, null, null, null, null, null, null], total: 6069,
            recovery: { y2025: 15966, y2026: 2789, y2027: null, total: 18755 } },
          { sub: "%", isPct: true, y2025: 95, months: [72, 23, 112, 83, 180, null, null, null, null, null, null, null], total: 76,
            recovery: { y2025: 100, y2026: 44, y2027: null, total: 84 } },
        ],
      },
      {
        label: "국내", labelSpan: 3, valsSpan: 3,
        planDelta: 3122, execSaving: -3, cancel: 50, remaining: 1133,
        rows: [
          { sub: "사업계획", y2025: 5071, months: [1569, 522, null, 340, 45, 10, null, 60, null, null, null, 10], total: 2556,
            recovery: { y2025: 15502, y2026: 1864, y2027: 23, total: 17388 } },
          { sub: "실행계획", y2025: 5323, months: [1580, 522, 355, 2625, 113, 363, null, 60, null, null, null, 10], total: 5628,
            recovery: { y2025: 15966, y2026: 3300, y2027: 23, total: 19289 } },
          { sub: "실적", y2025: 5011, months: [1341, 121, 355, 2183, 128, 364, null, null, null, null, null, null], total: 4492,
            recovery: { y2025: 15966, y2026: 880, y2027: null, total: 16846 } },
        ],
      },
      {
        label: "해외\n선투자", labelSpan: 3, valsSpan: 3,
        planDelta: null, execSaving: -145, cancel: null, remaining: 583,
        rows: [
          { sub: "사업계획", y2025: null, months: [2305, null, null, null, null, null, null, null, null, null, null, null], total: 2305,
            recovery: { y2025: null, y2026: 3011, y2027: null, total: 3011 } },
          { sub: "실행계획", y2025: 708, months: [2305, null, null, null, null, null, null, null, null, null, null, null], total: 2305,
            recovery: { y2025: null, y2026: 3011, y2027: null, total: 3011 } },
          { sub: "실적", y2025: 699, months: [1461, null, 41, null, 75, null, null, null, null, null, null, null], total: 1577,
            recovery: { y2025: null, y2026: 1909, y2027: null, total: 1909 } },
        ],
      },
    ],
  },
  notes: [
    "1. 2026년 실행계획 투자비: 7,933백만원(사업계획 4,861백만원 +  추가계획: 3,122백만원 - 투자취소 50백만원)",
    "2. (06월) 실적: 364백만원 (LW1 STEEL WHEEL DISC 3.5TON 설계변경 15백만원, LW1 STEEL WHEEL DISC 3종 고객 납품 제품제작 7백만원, HKMC AX EV STYELD STEEL WHEEL 양산 개발 322.9백만원, KF1 B-SAMPLE 개발 투자비 19백만원)",
    "3. 고객사 회수 계획: 6,311백만원 ( 우즈벡 GSV EM RETOOL'G 잔금 10% 241.3백만원, UZAUTO GEM BSUV FRT CRADLE RETOOLING 중도금/잔금 50% 683백만원, C1xx Top cover B sample Tooling 38백만원, 9BQX FLANGE-EXH PIPE ASM 중도금2차 23백만원, 9BU/Qx TRACK ASM 2025 RETOOLING 금형비 83백만원, US4 설변 및 안전기준 강화 금형비 880백만원, 북미 오스템아메리카 선투자 회수 3,011백만원, KF1 B-Sample Tooling 1,110백만원(Housing UPR & UPR 1,072백만원, End Plate FRT & RR 209백만원, CMM JIG PO 72백만원))",
    "4. 고객사 회수 실적: 2,789백만원 국내 880백만원(MANO US4 설계변경 & 안전기준 강화 금형비+ED&D 100% 회수(880백만원)) 해외(북미 선투자) 1,909백만원 회수, 북미 태양광 조립라인 및 NEVADOS BEARING 투자 일부 회수",
  ],
};

// ---------------- Page 11: 투자비 상세 현황 ----------------
REPORT.page11 = {
  groups: [
    { category: "Wheel", item: "LW1", plan: 794, extra: 35, cancel: 50, total: 779, actual: 438, rate: 56, saving: 1, unexecuted: 340,
      remarks: "LW1 STEEL WHEEL 16인치 설계 변경 및 이원화 개발(180/180), LW1 STEEL WHEEL 14X4.5J 개발(224.1/223), LW1 STEEL WHEEL 16인치 설계 변경(13/13), TOP-COATING SPRAY BOOTH 개선(340), DISC 3.5TON 설계변경(15/15), DISC 3종 고객 납품 제품제작(7/7) / 투자취소: RIM LINE 2차 설비 개선(50)" },
    { category: "Wheel", item: "AX EV STYELD WHEEL", plan: null, extra: 323, cancel: null, total: 323, actual: 323, rate: 100, saving: null, unexecuted: null,
      remarks: "HKMC AX EV STYELD STEEL WHEEL DISC (15X5.5J) 양산개발(235/235), RIM (15X5.5J) 양산개발(75/75), 검사구 (15X5.5J) 양산개발(8/8), ASSY (15X5.5J) 양산개발(5/5)" },
    { category: "Wheel", item: "기타", plan: 15, extra: 261, cancel: null, total: 276, actual: 261, rate: 95, saving: null, unexecuted: 15,
      remarks: "1공장 콤프레샤 연동시스템 설치 및 응축수 드레인 트랩 설치(15) / 추가: 3500T PRESS 동력전달계통(DRIVE GEAR PARTS) 수리(61/61), 3500TON PRESS의 정상상태 복원을 위한 DRIVE GEAR 신착/교체(200/200)" },
    { category: "EV", item: "KF1 B-sample", plan: null, extra: 2159, cancel: null, total: 2159, actual: 1914, rate: 89, saving: null, unexecuted: 246,
      remarks: "KF1 B-SAMPLE 개발 투자비(전체 비용(원재료, 경비 포함) 3,168백만원중 투자비 금액 2,159백만원" },
    { category: "Chassis", item: "9BXX", plan: 172, extra: null, cancel: null, total: 172, actual: 0, rate: 0, saving: null, unexecuted: 172,
      remarks: "FLCA WELD LINE 개조(성인화)(145), 9BQX/9BUX 용접라인 공통 용접기 노후 신품 구매(27)" },
    { category: "Chassis", item: "BSUV(UZ)", plan: 1100, extra: null, cancel: null, total: 1100, actual: 1100, rate: 100, saving: null, unexecuted: null,
      remarks: "우즈벡 B-SUV 신규 금형제작(1,100/1,100)" },
    { category: "Chassis", item: "기타", plan: 178, extra: null, cancel: null, total: 178, actual: 51, rate: 30, saving: 2, unexecuted: 125,
      remarks: "2공장 콤프레샤 노후 신형으로 교체(45), 3공장 인버터 콤프레샤 교체(60), / E/D2 4LINE 트롤리 체인 노후 교체 공사(계획53/실적51), A/S 공급 ISSUE 대응(20)" },
    { category: "Module", item: "9BUX&9BQB", plan: null, extra: 12, cancel: null, total: 12, actual: 12, rate: 100, saving: null, unexecuted: null,
      remarks: "BRACKET-RAD LWR ASS'Y 체결 ETC TOOL 대체품 1개 구매(11.5/11.5)" },
    { category: "Seat", item: "9BUX", plan: 227, extra: 64, cancel: null, total: 291, actual: 64, rate: 22, saving: null, unexecuted: 227,
      remarks: "9BXX TRACK LWR WELD LINE 개조(성인화)(227), 9BQX SEAT 양산 RE-TOOLING 금형 개발(64/64)" },
    { category: "Seat", item: "기타", plan: 70, extra: 20, cancel: null, total: 90, actual: 90, rate: 100, saving: null, unexecuted: null,
      remarks: "협력업체(정운) 반납 대응(계획70/실적70), US4 설계변경 반영을 통한 조립성 개선 및 품질 안정화(20/20)" },
    { category: "공통", item: "총무비품", plan: null, extra: 248, cancel: null, total: 248, actual: 240, rate: 97, saving: null, unexecuted: 8,
      remarks: "법인 업무용 차량 매입(183.9/183.9), KF1 추적관리 시스템 도입(50/50), 사무용노트북(14.4/6.1)" },
    { category: "해외선투자", item: "북미 Nevados", plan: 2305, extra: null, cancel: null, total: 2305, actual: 1577, rate: 75, saving: 145, unexecuted: 583,
      remarks: "NEVADOS, BEARING ASM 북미 양산금형 개발(510/418), RETENTION 북미 양산금형 개발(145/145) / MACHANICAL STOP 북미 양산금형 개발(80), NEVADOS - BEARING CRADLE(1,037/725), / 북미오스템 LEVELER (400TON) 신규 투자(273/220), NEVADOS - MECHANICAL STOP(164), / BEARING CRADLE 개발 관련 C/F 제작(95/69)" },
  ],
  total: { plan: 4861, extra: 3122, cancel: 50, total: 7933, actual: 6069, rate: 78, saving: 148, unexecuted: 1717 },
};

// ---------------- Page 12: 품질지표 - 고객실적 / PPM ----------------
REPORT.page12 = {
  customerResult: {
    months: ["1월","2월","3월","4월","5월","6월","7월","8월","9월","10월","11월","12월"],
    spps: {
      target:  [0,0,0,0,0,0,0,0,0,0,0,0],
      wheel:   [0,0,0,0,0,0,null,null,null,null,null,null],
      chassis: [0,0,0,0,0,0,null,null,null,null,null,null],
      seat:    [0,0,0,0,0,0,null,null,null,null,null,null],
      incheon: [0,0,0,0,0,0,null,null,null,null,null,null],
    },
    lineStop: {
      target:  [0,0,0,0,0,0,0,0,0,0,0,0],
      wheel:   [0,0,0,0,0,0,null,null,null,null,null,null],
      chassis: [0,0,0,0,0,0,null,null,null,null,null,null],
      seat:    [0,0,0,0,0,0,null,null,null,null,null,null],
      incheon: [0,0,0,0,0,0,null,null,null,null,null,null],
    },
  },
  issue: "",
  ppm: {
    wheel:   { target: [175,120,120,120,100,100,100,100,100,100,80,80,80], actual: [140,117,47,26,72,83,4,null,null,null,null,null,null], cumTarget: 100, cumActual: 58 },
    chassis: { target: [148,40,40,40,35,35,35,35,35,35,30,30,30], actual: [49,38,28,31,28,19,13,null,null,null,null,null,null], cumTarget: 35, cumActual: 26 },
    seat:    { target: [12,1,1,1,1,1,1,1,1,1,1,1,1], actual: [2,0,0,0,0,0,0,null,null,null,null,null,null], cumTarget: 1, cumActual: 0 },
    module:  { target: [0,0,0,0,0,0,0,0,0,0,0,0,0], actual: [0,0,0,0,0,0,0,null,null,null,null,null,null], cumTarget: 0, cumActual: 0 },
  },
};

// ---------------- Page 13: 품질지표 - Q-COST ----------------
REPORT.page13 = {
  months: ["1월","2월","3월","4월","5월","6월","7월","8월","9월","10월","11월","12월"],
  groups: [
    {
      label: "Chassis\n&\nWheel\nQ-Cost",
      target:   { v2025: 2640, m: [1330,1330,1330,1280,1280,1280,1280,1280,1280,1180,1180,1180], total: 15210 },
      actual:   { v2025: 1798, m: [1260,759,947,1090,984,435,0,0,0,0,0,0], total: 5474 },
      failCost: { v2025: 1070, m: [851,225,343,650,575,168,null,null,null,null,null,null], total: 2811 },
      items: [
        { label: "9BUX",     v2025: 863, m: [851,186,195,488,509,160,0,0,0,0,0,0], total: 2389 },
        { label: "AURORA",   v2025: 75,  m: [0,39,57,0,66,0,null,null,null,null,null,null], total: 161 },
        { label: "LJL",      v2025: 15,  m: [0,0,0,0,0,0,null,null,null,null,null,null], total: 0 },
        { label: "C121",     v2025: 15,  m: [0,0,91,162,0,8,null,null,null,null,null,null], total: 261 },
        { label: "기타차종", v2025: 7,   m: [0,0,0,0,0,0,null,null,null,null,null,null], total: 0 },
        { label: "F/CLAIM",  v2025: 95,  m: [0,0,0,0,0,0,null,null,null,null,null,null], total: 0 },
      ],
      evalCost: { v2025: 637, m: [409,534,604,440,409,267,null,null,null,null,null,null], total: 2663 },
      prevCost: { v2025: 91,  m: [0,0,0,0,0,0,null,null,null,null,null,null], total: 0 },
      rate:     { v2025: 0.03, m: [0.01,0.01,0.01,0.02,0.01,0.01,null,null,null,null,null,null], total: 0.01 },
    },
    {
      label: "Seat\nQ-Cost",
      target:   { v2025: 555, m: [260,260,260,200,200,200,200,200,200,160,160,160], total: 2460 },
      actual:   { v2025: 292, m: [178,99,161,180,162,157,0,0,0,0,0,0], total: 937 },
      failCost: { v2025: 90,  m: [0,0,0,0,null,null,null,null,null,null,null,null], total: 0 },
      items: [
        { label: "9BUX",     v2025: 26, m: [0,72,83,0,0,0,0,0,0,0,0,0], total: 155 },
        { label: "기타차종", v2025: 0,  m: [0,0,0,0,0,0,null,null,null,null,null,null], total: 0 },
        { label: "F/CLAIM",  v2025: 64, m: [0,28,0,0,0,0,null,null,null,null,null,null], total: 28 },
      ],
      evalCost: { v2025: 202, m: [178,99,161,180,162,157,null,null,null,null,null,null], total: 937 },
      prevCost: { v2025: 0,   m: [0,0,0,0,0,0,null,null,null,null,null,null], total: 0 },
      rate:     { v2025: 0.01, m: [0.01,0.01,0.01,0.01,0.01,0.01,null,null,null,null,null,null], total: 0.01 },
    },
  ],
  eventTable: {
    rows: [],
  },
};
