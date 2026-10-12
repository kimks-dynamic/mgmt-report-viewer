const REPORT = {};
// 경영회의 2026년 09월 보고서 - 페이지 4~8 데이터 추출
// 출처: D:\AI\경영회의\1.경영회의(2026년09월)_보고서.xlsx (openpyxl, data_only=True)
//   시트: "1.국내매출종합"(p4), "매출분석"(p5), "1-1.상세"(p6), "누적환율변동 Impact"(p7), "2.손익(09월)"(p8)
// 교차검증: D:\AI\경영회의\1.경영회의(2026년09월)_보고서_ver01.pdf (페이지 4~8) — 모든 수치 일치 확인
// 매출원가 행의 각주는 원본 PDF에는 보이지만 openpyxl로는 읽히지 않는 플로팅 텍스트박스였으며,
// xlsx 내부 drawing5.xml(시트9 "2.손익(09월)")에서 XML을 직접 파싱하여 복원했습니다.
// (REPORT 전역 객체는 이미 선언되어 있다고 가정 — 여기서는 속성만 대입)

// ---------------- Page 4: 매출/부가가치/인원 현황 ----------------
REPORT.page4 = {
  months: ["1월","2월","3월","4월","5월","6월","7월","8월","9월","10월","11월","12월"],
  forecastIndex: 9,
  revenue: {
    label: "매출\n(백만원)",
    plan:    { yr: 102679, avg: 8557,  m: [10333,8103,10873,10654,10013,9872,10586,5699,9210,10568,10113,10400], cum: 85342, total: 116422 },
    revised: { yr: 122780, avg: 10232, m: [12546,10108,13094,13598,11339,11949,11228,5533,9284,9866,9397,9739],  cum: 98679, total: 127681 },
    actual:  { yr: 122546, avg: 10212, m: [12546,10108,13094,13598,11339,11949,11513,6800,9789,10374,null,null], cum: 100737, total: 100737 },
    pct:     { yr: 119, avg: 119, m: [121,125,120,128,113,121,103,123,105,105,null,null], cum: 102, total: 79 },
  },
  valueAdded: {
    label: "부가가치\n(백만원)",
    plan:    { yr: 35232, avg: 2936, m: [3601,2845,3822,3729,3502,3451,3740,1958,3236,3729,3527,3621], cum: 29885, total: 40762 },
    revised: { yr: 40076, avg: 3340, m: [4258,3493,4781,4712,3919,4091,3876,1878,3345,3474,3230,3358],  cum: 34354, total: 44416 },
    actual:  { yr: 40323, avg: 3360, m: [4258,3493,4781,4712,3919,4091,4050,2373,3311,3563,null,null],  cum: 34989, total: 34989 },
    pct:     { yr: 114, avg: 114, m: [118,123,125,126,112,119,104,126,99,103,null,null], cum: 102, total: 79 },
  },
  headcount: {
    label: "인원현황\n(명)",
    plan:    { yr: 373, avg: 373, m: [369,366,371,368,369,365,360,357,371,371,366,366], cum: 366, total: 367 },
    revised: { yr: 370, avg: 370, m: [361,360,360,360,358,357,357,357,357,343,343,343], cum: 359, total: 355 },
    actual:  { yr: 368, avg: 368, m: [361,360,360,360,358,357,361,362,360,359,null,null], cum: 360, total: 360 },
    pct:     { yr: 99, avg: 99, m: [98,98,97,98,97,98,101,101,101,105,null,null], cum: 100, total: 101 },
  },
  laborCost: {
    label: "인건비",
    plan:    { yr: 26429, avg: 2202, m: [2413,2358,2437,2288,2502,2195,2251,2033,2424,2480,2265,2258], cum: 20901, total: 27904 },
    revised: { yr: 27906, avg: 2325, m: [2586,2294,2759,2652,2604,2806,2484,2084,2396,2377,2187,2175],  cum: 22665, total: 29403 },
    actual:  { yr: 28528, avg: 2377, m: [2586,2294,2759,2652,2604,2806,2482,2169,2456,2474,null,null],  cum: 22808, total: 22808 },
    pct:     { yr: 108, avg: 108, m: [107,97,113,116,104,128,100,104,103,104,null,null], cum: 101, total: 78 },
  },
  laborIndicators: {
    label: "인건비 지표\n(실적)",
    perCapita:   { yr: 77.5, avg: 6.5, m: [7.2,6.4,7.7,7.4,7.3,7.9,6.9,6.0,6.8,6.9,null,null], cum: 63.4, total: 63.4, unit: "" },
    laborRate:   { yr: 23.3, avg: 23.3, m: [20.6,22.7,21.1,19.5,23.0,23.5,21.6,31.9,25.1,23.8,null,null], cum: 22.6, total: 22.6, unit: "%" },
    distribRate: { yr: 70.7, avg: 70.7, m: [60.7,65.7,57.7,56.3,66.4,68.6,61.3,91.4,74.2,69.4,null,null], cum: 65.2, total: 65.2, unit: "%" },
    overtime:    { yr: 39.9, avg: 39.9, m: [62.3,45.4,57.4,61.2,62.7,50.6,37.6,10.6,28,50,null,null], cum: 48.5, total: 48.5, unit: "" },
    overtimePrevYear: { yr: 39.9, avg: 39.9, m: [38.0,31.2,44.3,32.0,62.6,50.8,38.4,10.8,16.3,55.9,39.8,58.7], cum: 38.5, total: 39.9, unit: "" },
  },
  annualBar: { labels: ["전년매출", "사업계획", "수정계획", "년간예상"], values: [1225, 1164, 1277, 1302] },
};

// ---------------- Page 5: 매출 상세 증감 현황 ----------------
// 출처: 시트 "매출분석" (PDF 페이지 5와 교차검증 완료)
// 열 순서: [9월 생산(수정계획,실적,증감,%)] [9월 매출(수정계획,실적,증감,%)] [10월 생산(수정계획,실행계획,증감,%)] [10월 매출(수정계획,실행계획,증감,%)] [전월대비 매출(증감,%)]
REPORT.page5 = {
  unitHeader: "수량\n단위",
  currentMonthLabel: "9월",
  nextMonthLabel: "10월",
  total: { label: "합 계", v: [135000,70801,-64199,-48, 9284,9789,505,5, 65808,86147,20339,31, 9866,10374,508,5, 585,6] },
  groups: [
    {
      label: "자동차",
      subtotal: { v: [135000,70656,-64344,-48, 9284,9663,379,4, 65808,86147,20339,31, 9866,10374,508,5, 710,7] },
      items: [
        { customer: "GMK 부평", customerRowspan: 1, model: "9BUX/9BQB", unit: "대분", v: [17481,19545,2064,12, 3501,3901,400,11, 21916,24183,2267,10, 4380,4812,432,10, 911,23] },
        { customer: "GMK 창원", customerRowspan: 1, model: "9BQC", unit: "대분", v: [17763,22089,4326,24, 3664,4463,799,22, 19108,22642,3534,18, 3962,4687,725,18, 224,5] },
        { customer: "GM", customerRowspan: 1, model: "C121", unit: "대분", v: [3348,697,-2651,-79, 784,176,-608,-78, 1747,0,-1747,-100, 409,0,-409,-100, -176,-100] },
        { customer: "RKM", customerRowspan: 3, model: "LJL", unit: "대분", v: [1303,1623,320,25, 44,54,11,25, 1060,1150,90,8, 35,38,3,8, -16,-29] },
        { customer: null, model: "AURORA-1", unit: "대분", v: [1999,1201,-798,-40, 213,125,-88,-41, 1679,550,-1129,-67, 189,59,-130,-69, -67,-53] },
        { customer: null, model: "AURORA-2", unit: "대분", v: [784,107,-677,-86, 79,11,-68,-86, 1415,274,-1141,-81, 141,27,-113,-81, 16,144] },
        { customer: "HMC", customerRowspan: 1, model: "US4", unit: "대분", v: [108,72,-36,-33, 307,205,-102,-33, 108,80,-28,-26, 307,227,-80,-26, 23,11] },
        { customer: "KGM", customerRowspan: 1, model: "Y450", unit: "대분", v: [542,447,-95,-18, 38,30,-7,-19, 497,490,-7,-1, 35,33,-2,-6, 2,7] },
        { customer: "EXPORT", customerRowspan: 2, model: "GSV-EM", unit: "대분", v: [11700,11153,-547,-5, 372,370,-2,-1, 11700,11056,-644,-6, 372,351,-20,-6, -18,-5] },
        { customer: null, model: "SEAT", unit: "대분", v: [9972,1722,-8250,-83, 133,91,-41,-31, 6578,1722,-4856,-74, 37,87,50,137, -4,-5] },
        { customer: "A/S", customerRowspan: 1, model: null, unit: null, v: [70000,12000,-58000,-83, 151,237,86,57, 0,24000,24000,0, 0,52,52,0, -185,-78] },
      ],
    },
    {
      label: "SOLAR",
      subtotal: { v: [0,145,145,0, 0,125,125,0, 0,0,0,0, 0,0,0,0, -125,-100] },
      items: [
        { merged: true, label: "AUSTEM AMERICA\n(STAMPING)", unit: "EA", v: [0,0,0,0, 0,0,0,0, 0,0,0,0, 0,0,0,0, 0,0] },
        { merged: true, label: "NOBULL ENERGY\n(H-BEAM)", unit: "EA", v: [0,145,145,0, 0,125,125,0, 0,0,0,0, 0,0,0,0, -125,-100] },
      ],
    },
  ],
};

// ---------------- Page 6: 사업부문별 상세현황 ----------------
// v: [8월실적, 9월수정계획,9월실적,9월%,9월전월대비, 10월수정계획,10월실행계획,10월%,10월전월대비]
REPORT.page6 = {
  prevMonthLabel: "8월",
  currentMonthLabel: "9월",
  nextMonthLabel: "10월",
  // 차량생산: 자체 합계 없음 (부평/창원/KGM/RKM 실적만)
  vehicleGroupLabel: "차량생산",
  vehicleRows: [
    { name: "부평", v: [5636, 17481,19545,112,347, 21916,24183,110,124], note8: "* 전공장 노후 설비교체 및 라인개선공사(8/1∼8/22)", note9: "", shift: "2shift" },
    { name: "창원", v: [17293, 17763,22089,124,128, 19108,22642,118,103], note8: "", note9: "", shift: "2shift" },
    { name: "KGM", v: [0, 542,447,82,0, 497,490,99,110], note8: "* 3조립 SE10(렉스턴 후속) 라인공사(8/1~8/20)", note9: "", shift: "2shift" },
    { name: "RKM", v: [2160, 4086,2931,72,136, 4154,1974,48,67], note8: "", note9: "", shift: "1shift" },
  ],
  // 매출: 총계(9,789 등) + Wheel/Body/Chassis/Module/Seat/Solar
  salesGroupLabel: "매출",
  salesTotal: { v: [6800, 9284,9789,105,144, 9866,10374,105,106] },
  salesRows: [
    { name: "Wheel", v: [494, 690,768,111,155, 799,808,101,105], note8: "* 증가(GMK)", note9: "* 증가(GMK)" },
    { name: "Body", v: [0, 151,45,30,0, 0,52,0,116], note8: "* D2UB B-Pin A/S 분할공급(9월∼12월)", note9: "" },
    { name: "Chassis", v: [4346, 5792,5985,103,138, 6174,6262,101,105], note8: "* 증가(GMK), 감소(C121, RKM)", note9: "* 증가(GMK), 감소(C121, RKM)" },
    { name: "Module", v: [171, 338,367,109,215, 401,433,108,118], note8: "* 증가(GMK)", note9: "* 증가(GMK)" },
    { name: "Seat", v: [1789, 2313,2499,108,140, 2493,2818,113,113], note8: "* 증가(GMK), 감소(US4, 직수출)", note9: "* 증가(GMK), 감소(US4)" },
    { name: "Solar", v: [0, 0,125,0,0, 0,0,0,0], note8: "* 증가(H-BEAM)", note9: "" },
  ],
  // 직접인원: 총계(193 등) + Wheel/Body/Chassis/Module/Seat
  headcountGroupLabel: "직접인원",
  headcountTotal: { v: [194, 196,193,98,null, 196,193,98,null] },
  headcountRows: [
    { name: "Wheel", v: [22, 22,22,100,null, 22,22,100,null] },
    { name: "Body", v: [22, 24,24,100,null, 24,24,100,null] },
    { name: "Chassis", v: [75, 74,75,101,null, 74,75,101,null] },
    { name: "Module", v: [30, 30,30,100,null, 30,30,100,null] },
    { name: "Seat", v: [45, 46,42,91,null, 46,42,91,null] },
  ],
};

// ---------------- Page 7: 환율 변동 Impact ----------------
// v: [년간(2025), 월평균(2025), 1월..12월, 누계]
REPORT.page7 = {
  months: ["1월","2월","3월","4월","5월","6월","7월","8월","9월","10월","11월","12월"],
  forecastIndex: 9,
  fxRate: {
    planYear2025: 1250, plan2026: 1300, // 사업계획 환율: 2025 년간 1,250원 / 2026 전체 1,300원(고정)
    actualYear2025: 1423, // 실적(월평균) 환율: 2025 년간 평균
    actualMonthly: [1457,1451,1492,1486,1490,1531,1489,1404,1356,1356,null,null], // 2026년 1~9월 실적, 10월은 예상(1,356원 동일)
  },
  revenue: {
    rows: [
      { name: "Wheel", v: [1,0, 0,0,0,0,0,0,0,0,0,0, null,null, 0] },
      { name: "Chassis", v: [763,64, 105,112,224,186,101,223,189,92,23,15, null,null, 1255], note: "GSV-EM, C121" },
      { name: "Seat", v: [276,23, 13,15,22,22,24,19,11,0,4,4, null,null, 130], note: "H62X, GMI31UX" },
      { name: "Solar", v: [1182,98, 99,45,19,68,36,25,73,0,5,0, null,null, 370] },
    ],
    total: { v: [2221,185, 217,172,265,276,161,268,273,92,32,19, null,null, 1755] },
  },
  valueAdded: {
    rows: [
      { name: "Wheel", v: [1,0, 0,0,0,0,0,0,0,0,0,0, null,null, 0] },
      { name: "Chassis", v: [667,56, 87,97,200,164,85,207,168,88,17,10, null,null, 1114], note: "9BUX & AURORA Bush" },
      { name: "Seat", v: [276,23, 13,15,22,22,24,19,11,0,4,4, null,null, 130] },
      { name: "Solar", v: [776,65, 59,26,10,43,21,17,11,0,1,0, null,null, 187], note: "관세 & DDP 운반비" },
    ],
    total: { v: [1719,143, 160,138,232,230,130,243,189,88,22,14, null,null, 1431] },
  },
  duty: {
    rateNote: "관세율: 25% → 50% (2025년 중 인상), 2026년 1~9월 50% 유지 (Steel 50%, 사출 15%)",
    rows: [
      { name: "Solar", v: [2669,222, 271,143,56,151,92,40,0,0,0,0, null,null, 753] },
    ],
  },
};

// ---------------- Page 8: 전월 실적 및 당월 예상 손익 현황 ----------------
REPORT.page8 = {
  columns: ["08월 실적","09월 실행계획","09월 실적","실행계획대비","누적 실적(~09월)","10월 실행계획","전월실적 대비"],
  rows: [
    { label: "매출액", level: 0, bold: true, note: "",
      cells: [[6800,100.0],[10269,100.0],[9789,100.0],[-480,-4.7],[100736,100.0],[10374,100.0],[585,6.0]] },
    { label: "자동차", level: 1,
      cells: [[6800,100.0],[10269,100.0],[9789,100.0],[-480,-4.7],[97684,97.0],[10374,100.0],[585,6.0]] },
    { label: "solar", level: 1,
      cells: [[0,0.0],[0,0.0],[0,0.0],[0,0.0],[3053,3.0],[0,0.0],[0,0.0]] },
    { label: "부가가치", level: 0, bold: true,
      cells: [[2373,34.9],[3592,35.0],[3311,33.8],[-281,-7.8],[34989,34.7],[3563,34.3],[252,7.6]],
      note: "※환율적용기준\n1)09월 환율효과: 22백만원(부가가치기준)_손익반영\n2)10월 환율(예상)효과: 14백만원_손익미반영(1,356원/$기준)",
      noteMergeSpan: 3 },
    { label: "자동차", level: 1,
      cells: [[2373,34.9],[3592,35.0],[3311,33.8],[-281,-7.8],[34915,34.7],[3563,34.3],[252,7.6]] },
    { label: "solar", level: 1,
      cells: [[0,0.0],[0,0.0],[0,0.0],[0,0.0],[74,0.1],[0,0.0],[0,0.0]] },
    { label: "매출원가", level: 0, bold: true,
      cells: [[7455,109.6],[9790,95.3],[9546,97.5],[-243,-2.5],[95851,95.1],[9891,95.3],[345,3.6]] },
    { label: "재료비", level: 1,
      cells: [[4427,65.1],[6677,65.0],[6478,66.2],[-199,-3.0],[65747,65.3],[6811,65.7],[333,5.1]] },
    { label: "노무비", level: 1,
      cells: [[1710,25.1],[1972,19.2],[1977,20.2],[5,0.3],[18585,18.4],[2008,19.4],[31,1.6]],
      note: "(9)월 학자금 140백만원 및 추석 귀성비(20→30%)포함",
      noteMergeSpan: 3 },
    { label: "정규", level: 2,
      cells: [[1490,21.9],[1670,16.3],[1677,17.1],[7,0.4],[15751,15.6],[1728,16.7],[51,3.0]] },
    { label: "도급", level: 2,
      cells: [[219,3.2],[302,2.9],[300,3.1],[-2,-0.7],[2833,2.8],[280,2.7],[-20,-6.7]] },
    { label: "제조경비", level: 1,
      cells: [[1318,19.4],[1140,11.1],[1091,11.1],[-49,-4.3],[11519,11.4],[1073,10.3],[-19,-1.7]] },
    { label: "인건비성 경비", level: 2,
      cells: [[232,3.4],[232,2.3],[221,2.3],[-11,-4.7],[2262,2.2],[240,2.3],[19,8.6]] },
    { label: "수선/소모품비", level: 2,
      cells: [[398,5.9],[210,2.0],[210,2.1],[0,-0.1],[2590,2.6],[236,2.3],[26,12.5]] },
    { label: "전력비", level: 2,
      cells: [[251,3.7],[260,2.5],[260,2.7],[0,0.0],[2548,2.5],[240,2.3],[-20,-7.7]] },
    { label: "감가상각", level: 2,
      cells: [[182,2.7],[182,1.8],[182,1.9],[0,0.0],[1638,1.6],[182,1.8],[0,0.0]] },
    { label: "포장비", level: 2,
      cells: [[66,1.0],[65,0.6],[27,0.3],[-38,-58.5],[648,0.6],[15,0.1],[-12,-44.4]] },
    { label: "연료비", level: 2,
      cells: [[39,0.6],[42,0.4],[42,0.4],[0,0.0],[670,0.7],[44,0.4],[2,4.4]] },
    { label: "기타", level: 2,
      cells: [[150,2.2],[150,1.5],[150,1.5],[0,0.0],[1162,1.2],[116,1.1],[-34,-22.6]],
      note: "9월 화재보험 41백만원" },
    { label: "고철매각", level: 1,
      cells: [[195,2.9],[363,3.5],[306,3.1],[-57,-15.8],[2835,2.8],[324,3.1],[18,6.0]] },
    { label: "매출총이익", level: 0, bold: true,
      cells: [[-460,-6.8],[843,8.2],[549,5.6],[-294,-34.9],[7721,7.7],[807,7.8],[258,47.0]] },
    { label: "판매관리비", level: 0, bold: true,
      cells: [[868,12.8],[886,8.6],[904,9.2],[18,2.0],[7971,7.9],[828,8.0],[-76,-8.4]] },
    { label: "인건비", level: 1,
      cells: [[459,6.7],[460,4.5],[479,4.9],[19,4.1],[4222,4.2],[466,4.5],[-13,-2.7]] },
    { label: "운반비", level: 1,
      cells: [[28,0.4],[34,0.3],[33,0.3],[-1,-2.9],[338,0.3],[37,0.4],[4,12.1]] },
    { label: "기타", level: 1,
      cells: [[381,5.6],[392,3.8],[392,4.0],[0,0.0],[3411,3.4],[325,3.1],[-67,-17.2]] },
    { label: "영업이익", level: 0, bold: true, emphasize: true,
      cells: [[-1328,-19.5],[-43,-0.4],[-356,-3.6],[-312,-718.1],[-250,-0.2],[-21,-0.2],[334,94.1]] },
  ],
  customerQty: {
    months: { current: "09월", next1: "10월", next2: "11월" },
    groups: [
      { customer: "부평#1", rows: [
        { model: "9BUX", cur: 13729, next1: 17744, next2: 16679, diff: 4015, pct: 29 },
        { model: "9BQB", cur: 5816, next1: 6439, next2: 6107, diff: 623, pct: 11 },
      ] },
      { customer: "창원", rows: [
        { model: "9BQC", cur: 22089, next1: 22642, next2: 21902, diff: 553, pct: 3 },
      ] },
      { customer: "RKM", rows: [
        { model: "LJL", cur: 1623, next1: 1150, next2: 114, diff: -473, pct: -29 },
        { model: "AURORA-1", cur: 1201, next1: 550, next2: 788, diff: -651, pct: -54 },
        { model: "AURORA-2", cur: 107, next1: 274, next2: 538, diff: 167, pct: 156 },
      ] },
    ],
  },
};
// 경영회의 2026년 09월 보고서 - 페이지 9~13 데이터
// 출처: D:\AI\경영회의\1.경영회의(2026년09월)_보고서.xlsx (openpyxl, data_only=True)
//       + D:\AI\경영회의\1.경영회의(2026년09월)_보고서_ver01.pdf (교차검증)
// 당월(9월) 기준: 9월까지 실적 반영, 10~12월은 null.
// REPORT 전역 객체는 다른 파일(1~8p 데이터)에서 이미 생성되어 있다고 가정하고 여기서는 속성만 추가합니다.

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
              tko: { v: "26-4-30", state: "green" }, d1: "26-11-18", line: { v: "26-10-30", note: "품질육성", state: "black" }, pvStart: "27-7-5",
              pvDone: "27-8-27", ppap: "27-12-1", run: "27-12-1", sorp: "28-1-2",
              recPlan: null, recActual: null, recDate: null,
              invPlan: 323, invActual: 323, invRate: 100,
              remarks: "부품가 감가상각" },
          ],
        },
      ],
    },
    {
      plant: "Cheon-an", commodity: "EV", customer: "삼성SDI",
      mergeGroupCols: true,
      groupRecovery: { plan: 1134, actual: null, date: "2026-10" },
      groupInvest: { plan: 2214, actual: 1992, rate: 90 },
      groupRemarks: "총 투자비 : 3,223.4\n1. 재료비 : 949.2\n2. 경비 : 59.8\n3. 투자비 : 2,214.4",
      projects: [
        {
          project: "E092 KF1\n(Proto)",
          rows: [
            { pname: "Housing UPR",
              tko: { v: "26-8-24", state: "green" }, d1: "27-1-29", line: { v: "26-12-11", note: "품의예정" }, pvStart: "TBD",
              pvDone: "TBD", ppap: "N/A", run: "N/A", sorp: "N/A" },
            { pname: "Housing LWR",
              tko: { v: "26-8-24", state: "green" }, d1: "27-1-29", line: { v: "26-12-11", note: "품의예정" }, pvStart: "TBD",
              pvDone: "TBD", ppap: "N/A", run: "N/A", sorp: "N/A" },
            { pname: "ENDPLATE FRT/RR",
              tko: { v: "26-8-24", state: "green" }, d1: "27-1-29", line: { v: "26-12-11", note: "품의예정" }, pvStart: "TBD",
              pvDone: "TBD", ppap: "N/A", run: "N/A", sorp: "N/A" },
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
              tko: "25-12-29", d1: { v: "26-7-9", state: "green" }, line: "26-5-15", pvStart: "N/A",
              pvDone: "N/A", ppap: { v: "26-9-30", note: "생산 안정화", state: "black" }, run: "N/A", sorp: "27-1-4",
              recPlan: 418, recActual: 365, recDate: "2026-08",
              invPlan: 418, invActual: 365, invRate: 87,
              remarks: "" },
            { pname: "Articulating Coupler",
              tko: "25-12-29", d1: { v: "26-7-20", state: "green" }, line: "26-6-19", pvStart: "N/A",
              pvDone: "N/A", ppap: { v: "26-11-30", note: "이관 T/O", state: "black" }, run: "N/A", sorp: "27-1-4",
              recPlan: 1643, recActual: 1212, recDate: "2026-08",
              invPlan: 1643, invActual: 1212, invRate: 74,
              remarks: "" },
            { pname: "Mechanical Stop",
              tko: { v: "26-5-6", state: "green" }, d1: "N/A", line: { v: "27-1-4", note: "해상 운송중", state: "black" }, pvStart: "N/A",
              pvDone: "N/A", ppap: "N/A", run: "N/A", sorp: "TBD",
              recPlan: 245, recActual: 67, recDate: "2026-08",
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
    monthlyActual: [2802, 92, 397, 2183, 203, 645, 88, 277, 69, null, null, null],
    cumPlan:       [3874, 4396, 4396, 4736, 4781, 4791, 4791, 4851, 4851, 4851, 4851, 4861],
    cumExecuted:   [3885, 4180, 4536, 7161, 7273, 7909, 7921, 8295, 8364, 8364, 8364, 8374],
    cumActual:     [2802, 2893, 3290, 5473, 5676, 6321, 6408, 6685, 6754, null, null, null],
  },
  remainingByCategory: {
    labels: ["Wheel", "북미", "EV", "Chassis", "Seat", "공통", "Module"],
    values: [355, 516, 222, 297, 0, 50, 0],
  },
  recoveryByYear: {
    years: ["2026년", "2027년"],
    plan:   [6092, 195],
    actual: [3254, 0],
  },
  table: {
    groups: [
      {
        label: "합계", labelSpan: 4, valsSpan: 4,
        planDelta: 3563, execSaving: -179, cancel: 50, remaining: 1441,
        rows: [
          { sub: "사업계획", y2025: 5071, months: [3874, 522, null, 340, 45, 10, null, 60, null, null, null, 10], total: 4861,
            recovery: { y2025: 15502, y2026: 4875, y2027: 23, total: 20399 } },
          { sub: "실행계획", y2025: 6031, months: [3885, 295, 355, 2625, 113, 636, 12, 374, 69, null, null, 10], total: 8374,
            recovery: { y2025: 15966, y2026: 6092, y2027: 195, total: 22252 } },
          { sub: "실적", y2025: 5710, months: [2802, 92, 397, 2183, 203, 645, 88, 277, 69, null, null, null], total: 6754,
            recovery: { y2025: 15966, y2026: 3254, y2027: null, total: 19220 } },
          { sub: "%", isPct: true, y2025: 95, months: [72, 31, 112, 83, 180, 101, 755, 74, 100, null, null, null], total: 81,
            recovery: { y2025: 100, y2026: 53, y2027: null, total: 86 } },
        ],
      },
      {
        label: "국내", labelSpan: 3, valsSpan: 3,
        planDelta: 3563, execSaving: -34, cancel: 50, remaining: 925,
        rows: [
          { sub: "사업계획", y2025: 5071, months: [1569, 522, null, 340, 45, 10, null, 60, null, null, null, 10], total: 2556,
            recovery: { y2025: 15502, y2026: 1864, y2027: 23, total: 17388 } },
          { sub: "실행계획", y2025: 5323, months: [1580, 295, 355, 2625, 113, 636, 12, 374, 69, null, null, 10], total: 6069,
            recovery: { y2025: 15966, y2026: 3081, y2027: 195, total: 19242 } },
          { sub: "실적", y2025: 5011, months: [1341, 92, 355, 2183, 128, 645, 21, 277, 69, null, null, null], total: 5110,
            recovery: { y2025: 15966, y2026: 903, y2027: null, total: 16869 } },
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
            recovery: { y2025: null, y2026: 2351, y2027: null, total: 2351 } },
        ],
      },
    ],
  },
  notes: [
    "1. 2026년 실행계획 투자비: 8,374백만원 (사업계획 4,861백만원 + 추가계획 3,563백만원 - 투자취소 50백만원)",
    "2. (08월~09월) 실적: 346백만원 — 9BXX LWR TRACK 용접라인 자동화 투자 226백만원, 3500톤 드라이브 긴급수리&원복 추가정산 57백만원, 노후 노트북 구매 12백만원, 유동금속 이관에 따른 이관금형 개선비 집행 35백만원",
    "3. 고객사 회수 계획: 6,092백만원 — 우즈벡 GSV EM RETOOL'G 잔금 10%(241.3백만원), UZAUTO GEM BSUV FRT CRADLE RETOOLING 중도금/잔금 50%(683백만원), C1xx Top cover B sample Tooling(38백만원), 9BQX FLANGE-EXH PIPE ASM 중도금2차(23백만원), 9BU/Qx TRACK ASM 2025 RETOOLING 금형비(83백만원), US4 설변 및 안전기준 강화 금형비(880백만원), 북미 오스템아메리카 선투자 회수(3,011백만원), KF1 B-Sample Tooling(1,110백만원)",
    "4. 고객사 회수 실적: 3,254백만원 — 국내 903백만원(MANO US4 설계변경 & 안전기준 강화 금형비+ED&D 100% 회수 880백만원, GNS솔리텍 22.5백만원), 해외(북미 선투자) 2,351백만원 회수(북미 태양광 조립라인 및 NEVADOS BEARING 투자 집행금액 전부 회수)",
  ],
};

// ---------------- Page 11: 투자비 상세 현황 ----------------
REPORT.page11 = {
  groups: [
    { category: "Wheel", item: "LW1", plan: 794, extra: 35, cancel: 50, total: 779, actual: 438, rate: 56, saving: 1, unexecuted: 340,
      remarks: "LW1 STEEL WHEEL 16인치 설계 변경 및 이원화 개발(180/180), LW1 STEEL WHEEL 14X4.5J 개발(224.1/223), LW1 STEEL WHEEL 16인치 설계 변경(13/13), TOP-COATING SPRAY BOOTH 개선(340), DISC 3.5TON 설계변경(15/15), DISC 3종 고객 납품 제품제작(7/7) / 투자취소: RIM LINE 2차 설비 개선(50)" },
    { category: "Wheel", item: "AX EV STYELD WHEEL", plan: null, extra: 323, cancel: null, total: 323, actual: 323, rate: 100, saving: null, unexecuted: null,
      remarks: "HKMC AX EV STYELD STEEL WHEEL DISC(15X5.5J) 양산개발(235/235), RIM(15X5.5J) 양산개발(75/75), 검사구(15X5.5J) 양산개발(8/8), ASSY(15X5.5J) 양산개발(5/5)" },
    { category: "Wheel", item: "기타", plan: 15, extra: 330, cancel: null, total: 345, actual: 330, rate: 96, saving: null, unexecuted: 15,
      remarks: "1공장 콤프레샤 연동시스템 설치 및 응축수 드레인 트랩 설치(15) / 추가: 3500T PRESS 동력전달계통(DRIVE GEAR PARTS) 수리(61/61), / 3500TON PRESS의 정상상태 복원을 위한 DRIVE GEAR 신착/교체(200/200), / 3500톤 450KW 메인모터 소손 수리(11.6/11.6) / 3500톤 드라이브 긴급수리&원복 추가정산(57/57)" },
    { category: "EV", item: "KF1 B-sample", plan: null, extra: 2214, cancel: null, total: 2214, actual: 1992, rate: 90, saving: null, unexecuted: 222,
      remarks: "KF1 B-SAMPLE 개발 투자비(전체 비용(원재료, 경비 포함) 3,168백만원중 투자비 금액 계획 2,159/실적 1,937), KF1 HOUSING&PLATE END CMM JIG 제작(55/55)" },
    { category: "Chassis", item: "9BXX", plan: 172, extra: null, cancel: null, total: 172, actual: 0, rate: 0, saving: null, unexecuted: 172,
      remarks: "FLCA WELD LINE 개조(성인화)(145), 9BQX/9BUX 용접라인 공통 용접기 노후 신품 구매(27)" },
    { category: "Chassis", item: "BSUV(UZ)", plan: 1100, extra: null, cancel: null, total: 1100, actual: 1100, rate: 100, saving: null, unexecuted: null,
      remarks: "우즈벡 B-SUV 신규 금형제작(1,100/1,100)" },
    { category: "Chassis", item: "기타", plan: 178, extra: 35, cancel: null, total: 213, actual: 86, rate: 41, saving: 2, unexecuted: 125,
      remarks: "2공장 콤프레샤 노후 신형으로 교체(45), 3공장 인버터 콤프레샤 교체(60), / E/D2 4LINE 트롤리 체인 노후 교체 공사(계획53/실적51), A/S 공급 ISSUE 대응(20), 유동금속 이관에 따른 이관금형 개선비(35/35)" },
    { category: "Module", item: "9BUX&9BQB", plan: null, extra: 12, cancel: null, total: 12, actual: 12, rate: 100, saving: null, unexecuted: null,
      remarks: "BRACKET-RAD LWR ASS'Y 체결 ETC TOOL 대체품 1개 구매(11.5/11.5)" },
    { category: "Seat", item: "9BUX", plan: 227, extra: 64, cancel: null, total: 291, actual: 290, rate: 100, saving: 1, unexecuted: null,
      remarks: "9BXX TRACK LWR WELD LINE 개조(성인화)(227), 9BQX SEAT 양산 RE-TOOLING 금형 개발(51/51) / 9BXX TRACK LWR 용접라인 자동화 투자(227/226)" },
    { category: "Seat", item: "기타", plan: 70, extra: 20, cancel: null, total: 90, actual: 61, rate: 100, saving: 29, unexecuted: null,
      remarks: "협력업체(정운) 반납 대응(계획70/실적40)종결, US4 설계변경 반영을 통한 조립성 개선 및 품질 안정화(20/20)" },
    { category: "공통", item: "총무비품", plan: null, extra: 184, cancel: null, total: 184, actual: 184, rate: 100, saving: null, unexecuted: null,
      remarks: "법인 업무용 차량 매입(183.9/183.9)" },
    { category: "공통", item: "전산 H/W, S/W", plan: null, extra: 346, cancel: null, total: 346, actual: 296, rate: 86, saving: null, unexecuted: 50,
      remarks: "KF1 추적관리 시스템 도입(50/50), 사무용노트북(14.4/14.4), 3D 설계도면 VIEWER 소프트웨어 구매(18/18), / 통합 정보 시스템 구축(250/200), 신규입사자 노트북(1.8/1.8), 노후노트북 교체(12/12)" },
    { category: "해외선투자", item: "북미 Nevados", plan: 2305, extra: null, cancel: null, total: 2305, actual: 1644, rate: 78, saving: 145, unexecuted: 516,
      remarks: "NEVADOS, BEARING ASM 북미 양산금형 개발(510/418), RETENTION 북미 양산금형 개발(145/145), / MACHANICAL STOP 북미 양산금형 개발(80), NEVADOS-BEARING CRADLE(1,037/725), / 북미오스템 LEVELER(400TON) 신규 투자(273/220), NEVADOS-MECHANICAL STOP(244.5/67), / BEARING CRADLE 개발 관련 C/F 제작(95/69)" },
  ],
  total: { plan: 4861, extra: 3563, cancel: 50, total: 8374, actual: 6755, rate: 83, saving: 179, unexecuted: 1441 },
};

// ---------------- Page 12: 품질지표 - 고객실적 / PPM ----------------
REPORT.page12 = {
  customerResult: {
    months: ["1월","2월","3월","4월","5월","6월","7월","8월","9월","10월","11월","12월"],
    spps: {
      target:  [0,0,0,0,0,0,0,0,0,0,0,0],
      wheel:   [0,0,0,0,0,0,0,0,0,null,null,null],
      chassis: [0,0,0,0,0,0,0,1,0,null,null,null],
      seat:    [0,0,0,0,0,0,0,0,0,null,null,null],
      incheon: [0,0,0,0,0,0,0,0,0,null,null,null],
    },
    lineStop: {
      target:  [0,0,0,0,0,0,0,0,0,0,0,0],
      wheel:   [0,0,0,0,0,0,0,0,0,null,null,null],
      chassis: [0,0,0,0,0,0,0,0,0,null,null,null],
      seat:    [0,0,0,0,0,0,0,0,0,null,null,null],
      incheon: [0,0,0,0,0,0,0,0,0,null,null,null],
    },
  },
  issue: "",
  ppm: {
    wheel:   { target: [175,120,120,120,100,100,100,100,100,100,80,80,80], actual: [140,117,47,26,72,83,27,39,62,11,null,null,null], cumTarget: 100, cumActual: 54 },
    chassis: { target: [148,40,40,40,35,35,35,35,35,35,30,30,30], actual: [49,38,28,31,28,19,17,21,29,14,null,null,null], cumTarget: 35, cumActual: 25 },
    seat:    { target: [12,1,1,1,1,1,1,1,1,1,1,1,1], actual: [2,0,0,0,0,0,0,0,0,0,null,null,null], cumTarget: 1, cumActual: 0 },
    module:  { target: [0,0,0,0,0,0,0,0,0,0,0,0,0], actual: [0,0,0,0,0,0,0,0,0,0,null,null,null], cumTarget: 0, cumActual: 0 },
  },
};

// ---------------- Page 13: 품질지표 - Q-COST ----------------
REPORT.page13 = {
  months: ["1월","2월","3월","4월","5월","6월","7월","8월","9월","10월","11월","12월"],
  groups: [
    {
      label: "Chassis\n&\nWheel\nQ-Cost",
      target:   { v2025: 2640, m: [1330,1330,1330,1280,1280,1280,1280,1280,1280,1180,1180,1180], total: 15210 },
      actual:   { v2025: 1798, m: [1260,759,947,1090,984,743,1216,1076,252,0,0,0], total: 8326 },
      failCost: { v2025: 1070, m: [851,225,343,650,575,476,689,651,252,null,null,null], total: 4711 },
      items: [
        { label: "9BUX",     v2025: 863, m: [851,186,195,488,509,437,689,591,252,0,0,0], total: 4198 },
        { label: "AURORA",   v2025: 75,  m: [0,39,57,0,66,31,0,0,0,null,null,null], total: 192 },
        { label: "LJL",      v2025: 15,  m: [0,0,0,0,0,0,0,0,0,null,null,null], total: 0 },
        { label: "C121",     v2025: 15,  m: [0,0,91,162,0,8,0,60,0,null,null,null], total: 321 },
        { label: "기타차종", v2025: 7,   m: [0,0,0,0,0,0,0,0,0,null,null,null], total: 0 },
        { label: "F/CLAIM",  v2025: 95,  m: [0,0,0,0,0,0,0,0,0,null,null,null], total: 0 },
      ],
      evalCost: { v2025: 637, m: [409,534,604,440,409,267,527,425,0,null,null,null], total: 3615 },
      prevCost: { v2025: 91,  m: [0,0,0,0,0,0,null,0,0,null,null,null], total: 0 },
      rate:     { v2025: 0.03, m: [0.01,0.01,0.01,0.02,0.01,0.01,0.01,0.02,null,null,null,null], total: 0.01 },
    },
    {
      label: "Seat\nQ-Cost",
      target:   { v2025: 555, m: [260,260,260,200,200,200,200,200,200,160,160,160], total: 2460 },
      actual:   { v2025: 292, m: [178,99,161,180,162,157,182,0,0,0,0,0], total: 1119 },
      failCost: { v2025: 90,  m: [0,0,0,0,0,0,0,null,null,null,null,null], total: 0 },
      items: [
        { label: "9BUX",     v2025: 26, m: [0,72,83,0,0,0,0,0,0,0,0,0], total: 155 },
        { label: "기타차종", v2025: 0,  m: [0,0,0,0,0,0,0,0,null,null,null,null], total: 0 },
        { label: "F/CLAIM",  v2025: 64, m: [0,28,0,0,0,0,0,0,null,null,null,null], total: 28 },
      ],
      evalCost: { v2025: 202, m: [178,99,161,180,162,157,182,0,null,null,null,null], total: 1119 },
      prevCost: { v2025: 0,   m: [0,0,0,0,0,0,0,0,null,null,null,null], total: 0 },
      rate:     { v2025: 0.01, m: [0.01,0.01,0.01,0.01,0.01,0.01,0.01,0,null,null,null,null], total: 0.01 },
    },
  ],
  eventTable: {
    rows: [
      { category: "사 내",
        issue: "1. 사내 품질시스템 개선 방안 보고\n  - 일상점검 현실화 방안",
        schedule: "9/21", remarks: "" },
    ],
  },
};
