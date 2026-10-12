const REPORT = {};
// 경영회의 2026년 01월 보고서 - 페이지 4~8 데이터
// 출처: D:\AI\경영회의\1.경영회의(2026년01월)_보고서.xlsx (openpyxl, data_only=True)
//   시트: "1.국내매출종합(2026년)"(p4), "매출분석"(p5), "1-1.상세"(p6), "누적환율변동 Impact"(p7), "2.손익(01월)"(p8)
//   ※ 1월 보고서는 연초(年初) 보고서로, 다른 달과 시트 구조가 다릅니다 (아래 notes.txt 참조).
// 교차검증: D:\AI\경영회의\1.경영회의(2026년01월)_보고서.pdf — 페이지 4~7(pdf 6~9p)은 xlsx와 일치.
//   단, 페이지 8(pdf 11p, "2.손익(01월)")은 xlsx 값과 PDF 인쇄값이 다수 행에서 불일치(수치가 xlsx가 더 최신/정합적) — notes.txt 참조.
// (REPORT 전역 객체는 이미 선언되어 있다고 가정 — 여기서는 속성만 대입)

// ---------------- Page 4: 매출/부가가치/인원 현황 ----------------
// 1월은 연초라 "수정계획" 행이 시트상 연간/월평균(D/E열)만 있고 월별(F:Q)·합계(S)가 전부 공란 →
// PDF 인쇄본에도 수정계획 행이 아예 나타나지 않음. 정책: revenue/valueAdded/headcount/laborCost의
// revised는 yr/avg/m/cum/total 전부 null 처리(= report-render.js가 해당 행을 자동으로 숨김).
REPORT.page4 = {
  months: ["1월","2월","3월","4월","5월","6월","7월","8월","9월","10월","11월","12월"],
  forecastIndex: 1,
  revenue: {
    label: "매출\n(백만원)",
    plan:    { yr: 102679, avg: 8557, m: [10333,8103,10873,10654,10013,9872,10586,5699,9210,10568,10113,10400], cum: 10333, total: 116422 },
    revised: { yr: null, avg: null, m: [null,null,null,null,null,null,null,null,null,null,null,null], cum: null, total: null },
    actual:  { yr: 122546, avg: 10212, m: [12609,10045,null,null,null,null,null,null,null,null,null,null], cum: 12609, total: 12609 },
    pct:     { yr: 119, avg: 119, m: [122,124,null,null,null,null,null,null,null,null,null,null], cum: 122, total: 11 },
  },
  valueAdded: {
    label: "부가가치\n(백만원)",
    plan:    { yr: 35232, avg: 2936, m: [3601,2845,3822,3729,3502,3451,3740,1958,3236,3729,3527,3621], cum: 3601, total: 40762 },
    revised: { yr: null, avg: null, m: [null,null,null,null,null,null,null,null,null,null,null,null], cum: null, total: null },
    actual:  { yr: 40323, avg: 3360, m: [4313,3168,null,null,null,null,null,null,null,null,null,null], cum: 4313, total: 4313 },
    pct:     { yr: 114, avg: 114, m: [120,111,null,null,null,null,null,null,null,null,null,null], cum: 120, total: 11 },
  },
  headcount: {
    label: "인원현황\n(명)",
    plan:    { yr: 373, avg: 373, m: [369,366,371,368,369,365,360,357,371,371,366,366], cum: 369, total: 367 },
    revised: { yr: null, avg: null, m: [null,null,null,null,null,null,null,null,null,null,null,null], cum: null, total: null },
    actual:  { yr: 368, avg: 368, m: [361,361,null,null,null,null,null,null,null,null,null,null], cum: 361, total: 361 },
    pct:     { yr: 99, avg: 99, m: [98,99,null,null,null,null,null,null,null,null,null,null], cum: 98, total: 98 },
  },
  laborCost: {
    label: "인건비",
    plan:    { yr: 26429, avg: 2202, m: [2413,2358,2437,2288,2502,2195,2251,2033,2424,2480,2265,2258], cum: 2413, total: 27904 },
    revised: { yr: null, avg: null, m: [null,null,null,null,null,null,null,null,null,null,null,null], cum: null, total: null },
    actual:  { yr: 28528, avg: 2377, m: [2561,2476,null,null,null,null,null,null,null,null,null,null], cum: 2561, total: 2561 },
    pct:     { yr: 108, avg: 108, m: [106,105,null,null,null,null,null,null,null,null,null,null], cum: 106, total: 9 },
  },
  laborIndicators: {
    label: "인건비 지표\n(실적)",
    perCapita:   { yr: 77.5, avg: 6.5, m: [7.1,6.9,null,null,null,null,null,null,null,null,null,null], cum: 7.1, total: 7.1, unit: "" },
    laborRate:   { yr: 23.3, avg: 23.3, m: [20.3,24.6,null,null,null,null,null,null,null,null,null,null], cum: 20.3, total: 20.3, unit: "%" },
    distribRate: { yr: 70.7, avg: 70.7, m: [59.4,78.2,null,null,null,null,null,null,null,null,null,null], cum: 59.4, total: 59.4, unit: "%" },
    overtime:    { yr: 39.9, avg: 39.9, m: [61.0,42.0,null,null,null,null,null,null,null,null,null,null], cum: 61.0, total: 61.0, unit: "" },
    overtimePrevYear: { yr: 39.9, avg: 39.9, m: [38.0,31.2,44.3,32.0,62.6,50.8,38.4,10.8,16.3,55.9,39.8,58.7], cum: 38.0, total: 39.9, unit: "" },
  },
  // 수정계획 막대가 시트상 값이 없어(U9/V9 공란) 3개 막대만 존재 (전년매출/사업계획/년간예상)
  annualBar: { labels: ["전년매출", "사업계획", "년간예상"], values: [1225, 1164, 1206] },
};

// ---------------- Page 5: 매출 상세 증감 현황 ----------------
// 출처: D:\AI\경영회의\1.경영회의(2026년01월)_보고서.xlsx 시트 "매출분석"
// 1월은 "수정계획" 대신 "사업계획"이 비교 기준입니다 (시트 헤더: F6/N6='사업계획'). report-render.js의
// thead는 "수정계획" 문자열을 하드코딩하므로, 실제로는 "사업계획" 기준 수치이나 화면 라벨은 "수정계획"으로
// 표시됩니다 (렌더 템플릿 공용 파일이라 이 데이터 파일에서 고칠 수 없음 — notes.txt 참조).
// 열 순서: [1월 생산(사업계획,실적,증감,%)] [1월 매출(사업계획,실적,증감,%)] [2월 생산(사업계획,실행계획,증감,%)] [2월 매출(사업계획,실행계획,증감,%)] [전월대비 매출(증감,%)]
// SOLAR 그룹은 1월 시트에 AUSTEM AMERICA 1건만 존재(NOBULL ENERGY 행 없음).
REPORT.page5 = {
  unitHeader: "수량\n단위",
  currentMonthLabel: "1월",
  nextMonthLabel: "2월",
  total: { label: "합 계", v: [92294,153353,61058,66, 10333,12609,2276,22, 76391,176818,100428,131, 8103,10045,1942,24, -2564,-20] },
  groups: [
    {
      label: "자동차",
      subtotal: { v: [71544,65513,-6032,-8, 10194,11681,1487,15, 55641,62770,7130,13, 7964,9012,1048,13, -2668,-23] },
      items: [
        { customer: "GMK 부평", customerRowspan: 1, model: "9BUX/9BQB", unit: "대분", v: [21087,25240,4153,20, 4287,4974,687,16, 15650,17527,1877,12, 3203,3594,390,12, -1381,-28] },
        { customer: "GMK 창원", customerRowspan: 1, model: "9BQC", unit: "대분", v: [20224,22965,2741,14, 4128,4728,599,15, 15590,17334,1744,11, 3171,3565,393,12, -1163,-25] },
        { customer: "GM", customerRowspan: 1, model: "C121", unit: "대분", v: [1836,3240,1404,76, 409,822,413,101, 2511,2376,-135,-5, 559,535,-23,-4, -287,-35] },
        { customer: "RKM", customerRowspan: 3, model: "LJL", unit: "대분", v: [1583,997,-586,-37, 54,34,-20,-37, 809,906,97,12, 28,31,3,12, -3,-9] },
        { customer: null, model: "AURORA-1", unit: "대분", v: [4074,4563,489,12, 448,494,46,10, 2135,2056,-79,-4, 241,233,-9,-4, -262,-53] },
        { customer: null, model: "AURORA-2", unit: "대분", v: [360,266,-94,-26, 36,27,-9,-26, 1440,2069,629,44, 145,211,66,46, 185,688] },
        { customer: "HMC", customerRowspan: 1, model: "US4", unit: "대분", v: [126,100,-26,-21, 336,267,-69,-21, 90,68,-22,-24, 240,182,-59,-24, -85,-32] },
        { customer: "KGM", customerRowspan: 1, model: "Y450", unit: "대분", v: [581,585,4,1, 39,40,1,3, 509,504,-5,-1, 34,34,0,-1, -6,-16] },
        { customer: "EXPORT", customerRowspan: 2, model: "GSV-EM", unit: "대분", v: [6300,5587,-713,-11, 174,174,0,0, 11700,16584,4884,42, 323,458,135,42, 284,164] },
        { customer: null, model: "SEAT", unit: "대분", v: [15373,1970,-13403,-87, 281,114,-167,-59, 5207,3346,-1860,-36, 19,170,151,803, 56,49] },
        { customer: "A/S", customerRowspan: 1, model: null, unit: null, v: [null,null,null,null, 0,6,6,0, null,null,null,null, 0,0,0,0, -6,-100] },
      ],
    },
    {
      label: "SOLAR",
      subtotal: { v: [20750,87840,67090,323, 139,928,790,569, 20750,114048,93298,450, 139,1033,894,645, 104,11] },
      items: [
        { merged: true, label: "AUSTEM AMERICA\n(STAMPING)", unit: "EA", v: [20750,87840,67090,323, 139,928,790,569, 20750,114048,93298,450, 139,1033,894,645, 104,11] },
      ],
    },
  ],
};

// ---------------- Page 6: 사업부문별 상세현황 ----------------
// 출처: 시트 "1-1.상세" (다른 달과 동일 시트명, 구조도 동일). 단 1월은 "수정계획" 대신 "사업계획"이
// 비교 기준(시트 헤더 F5/J5='사업계획') — page5와 동일한 라벨 이슈.
// v: [12월실적, 1월사업계획,1월실적,1월%,1월전월대비, 2월사업계획,2월실행계획,2월%,2월전월대비]
REPORT.page6 = {
  prevMonthLabel: "12월",
  currentMonthLabel: "1월",
  nextMonthLabel: "2월",
  vehicleGroupLabel: "차량생산",
  vehicleRows: [
    { name: "부평", v: [25031, 21087,25240,120,101, 15650,17527,112,69], note8: "", note9: "", shift: "2shift" },
    { name: "창원", v: [25217, 20224,22965,114,91, 15590,17334,111,75], note8: "", note9: "", shift: "2shift" },
    { name: "KGM 모빌리티", v: [600, 581,585,101,98, 509,504,99,86], note8: "", note9: "", shift: "2shift" },
    { name: "RKM", v: [1928, 6017,5826,97,302, 4384,5031,115,86], note8: "* 근무형태 1shift 전환(1/5~ ), AURORA-2 SOP(1/22~ )", note9: "", shift: "1shift" },
  ],
  salesGroupLabel: "매출",
  salesTotal: { v: [12459, 10333,12609,122,101, 8103,10045,124,80] },
  salesRows: [
    { name: "Wheel", v: [967, 829,843,102,87, 629,615,98,73], note8: "* 증가(GMK)", note9: "* 감소(GMK)" },
    { name: "Body", v: [20, 0,1,0,3, 0,0,0,0], note8: "", note9: "" },
    { name: "Chassis", v: [6944, 6092,7426,122,107, 5040,5695,113,77], note8: "* 증가(GMK, C121)", note9: "* 증가(GMK, RKM, UZ-AUTO)" },
    { name: "Module", v: [445, 389,448,115,101, 312,339,108,76], note8: "* 증가(GMK)", note9: "* 증가(GMK)" },
    { name: "Seat", v: [3450, 2884,2963,103,86, 1983,2364,119,80], note8: "* 증가(GMK), 감소(직수출)", note9: "* 증가(GMK, 직수출), 감소(US4)" },
    { name: "Solar", v: [633, 139,928,669,147, 139,1033,745,111], note8: "* 증가(Stamping)", note9: "* 증가(Stamping)" },
  ],
  headcountGroupLabel: "직접인원",
  headcountTotal: { v: [192, 198,193,97,null, 198,193,97,null] },
  headcountRows: [
    { name: "Wheel", v: [22, 22,22,100,null, 22,22,100,null] },
    { name: "Body", v: [19, 23,20,87,null, 23,20,87,null] },
    { name: "Chassis", v: [76, 77,75,97,null, 77,75,97,null] },
    { name: "Module", v: [31, 31,31,100,null, 31,31,100,null] },
    { name: "Seat", v: [44, 45,45,100,null, 45,45,100,null] },
  ],
};

// ---------------- Page 7: 환율 변동 Impact ----------------
// 출처: 시트 "누적환율변동 Impact". 1월은 연초라 이 시트 자체가 "2025년 12개월 실적 + 2026년 1월(실적)
// ·2월(계획) 2개 컬럼"만 가진 구조입니다(2026년 3~12월 컬럼은 아직 시트에 존재하지 않음). yr/avg는
// 2025년 합계/월평균(시트 R열 합계를 12로 나눈 값)을 사용해 다른 달 스키마의 "년간(2025)/월평균(2025)"
// 의미와 동일하게 맞췄습니다. m 배열은 2026년 1월(실적)·2월(계획)만 채우고 나머지 10개월은 null.
// v: [년간(2025), 월평균(2025), 1월..12월(2026), 누계]
REPORT.page7 = {
  months: ["1월","2월","3월","4월","5월","6월","7월","8월","9월","10월","11월","12월"],
  forecastIndex: 1,
  fxRate: {
    planYear2025: 1250, plan2026: 1300,
    actualYear2025: 1423,
    actualMonthly: [1464,1464,null,null,null,null,null,null,null,null,null,null],
  },
  revenue: {
    rows: [
      { name: "Wheel", v: [1,0, 0,0,null,null,null,null,null,null,null,null,null,null, 0] },
      { name: "Chassis", v: [763,64, 111,125,null,null,null,null,null,null,null,null,null,null, 111], note: "GSV-EM, C121" },
      { name: "Seat", v: [276,23, 14,23,null,null,null,null,null,null,null,null,null,null, 14] },
      { name: "Solar", v: [1182,98, 104,130,null,null,null,null,null,null,null,null,null,null, 104] },
    ],
    total: { v: [2221,185, 229,278,null,null,null,null,null,null,null,null,null,null, 229] },
  },
  valueAdded: {
    rows: [
      { name: "Wheel", v: [1,0, 0,0,null,null,null,null,null,null,null,null,null,null, 0] },
      { name: "Chassis", v: [667,56, 93,111,null,null,null,null,null,null,null,null,null,null, 93], note: "9BUX & AURORA Bush" },
      { name: "Seat", v: [276,23, 14,23,null,null,null,null,null,null,null,null,null,null, 14] },
      { name: "Solar", v: [776,65, 61,77,null,null,null,null,null,null,null,null,null,null, 61], note: "관세 & DDP 운반비" },
    ],
    total: { v: [1719,143, 168,211,null,null,null,null,null,null,null,null,null,null, 168] },
  },
  duty: {
    rateNote: "관세율: 25% → 50% (2025년 중 인상), 2026년 1월 50% 유지 (Steel 50%, 사출 15%)",
    rows: [
      { name: "Solar", v: [2669,222, 283,350,null,null,null,null,null,null,null,null,null,null, 283] },
    ],
  },
};

// ---------------- Page 8: 전월 실적 및 당월 예상 손익 현황 ----------------
// 출처: 시트 "2.손익(01월)" — 1월은 연초 특수 구조로, 최근 5개년(2021~2025) 실적 + 2026년 사업계획
// + 01월 사업계획/실적 + 실행계획대비 + 누적실적 + 02월 실행계획 + 전월실적대비 (총 8개 컬럼군)이
// 시트/PDF에 모두 존재합니다. report-render.js가 정확히 7개 컬럼(4-blue+3-green)을 전제로 하드코딩되어
// 있어 8개를 그대로 넣을 수 없으므로, "2026년 사업계획"(연간) 컬럼은 생략하고 "2025년 실적"(전년 실적)을
// 1번째 컬럼으로 채택했습니다 — notes.txt의 판단 근거 참조.
// ⚠ 이 시트는 PDF 인쇄본과 xlsx 저장값이 다수 행에서 불일치합니다 (예: 01월 실적 매출액: PDF 12,013 vs
// xlsx 12,609). xlsx의 SUM 수식이 자기 참조로 정합적이며, page4/page5 시트의 독립적인 1월 실적 매출액
// (12,609)과도 일치하므로 xlsx 값을 채택했습니다. notes.txt 참조.
REPORT.page8 = {
  columns: ["2025년 실적","01월 사업계획","01월 실적","실행계획대비","누적 실적(~01월)","02월 실행계획","전월실적 대비"],
  rows: [
    { label: "매출액", level: 0, bold: true, note: "",
      cells: [[122546,100.0],[10333,100.0],[12609,100.0],[2276,22.0],[12609,100.0],[10045,100.0],[-2564,-20.3]] },
    { label: "자동차", level: 1,
      cells: [[112660,91.9],[10194,98.7],[11681,92.6],[1487,14.6],[11681,92.6],[9012,89.7],[-2668,-22.8]] },
    { label: "solar", level: 1,
      cells: [[9886,8.1],[139,1.3],[928,7.4],[790,569.3],[928,7.4],[1033,10.3],[104,11.2]] },
    { label: "부가가치", level: 0, bold: true,
      cells: [[40323,32.9],[3601,34.9],[4313,34.2],[711,19.8],[4313,34.2],[3168,31.5],[-1145,-26.6]],
      note: "※환율적용기준\n1)01월환율효과: 118백만원(부가가치기준)_손익반영\n2)02월환율(예상)효과: 211백만원_손익미반영(1,464원/$기준)",
      noteMergeSpan: 3 },
    { label: "자동차", level: 1,
      cells: [[39775,32.5],[3604,34.9],[4309,34.2],[705,19.5],[4309,34.2],[3236,32.2],[-1073,-24.9]] },
    { label: "solar", level: 1,
      cells: [[548,0.4],[-3,0.0],[4,0.0],[7,232.0],[4,0.0],[-69,-0.7],[-73,1913.2]] },
    { label: "매출원가", level: 0, bold: true,
      cells: [[119176,97.2],[9891,95.7],[11667,92.5],[1776,18.0],[11667,92.5],[10072,100.3],[-1594,-13.7]] },
    { label: "재료비", level: 1,
      cells: [[82223,67.1],[6731,65.1],[8296,65.8],[1565,23.3],[8296,65.8],[6878,68.5],[-1419,-17.1]] },
    { label: "노무비", level: 1,
      cells: [[22993,18.8],[1938,18.8],[2080,16.5],[142,7.3],[2080,16.5],[2011,20.0],[-69,-3.3]] },
    { label: "정규", level: 2,
      cells: [[19231,15.7],[1620,15.7],[1766,14.0],[146,9.0],[1766,14.0],[1743,17.3],[-23,-1.3]],
      note: "(2)월 학자금 180백만원 감안" },
    { label: "도급", level: 2,
      cells: [[3762,3.1],[318,3.1],[314,2.5],[-4,-1.2],[314,2.5],[268,2.7],[-46,-14.6]] },
    { label: "제조경비", level: 1,
      cells: [[13960,11.4],[1222,11.8],[1291,10.2],[68,5.6],[1291,10.2],[1184,11.8],[-107,-8.3]] },
    { label: "인건비성 경비", level: 2,
      cells: [[2860,2.3],[221,2.1],[214,1.7],[-7,-3.1],[214,1.7],[210,2.1],[-4,-2.0]] },
    { label: "수선/소모품비", level: 2,
      cells: [[3250,2.7],[232,2.2],[232,1.8],[0,0.0],[232,1.8],[222,2.2],[-10,-4.2]] },
    { label: "전력비", level: 2,
      cells: [[3227,2.6],[284,2.7],[340,2.7],[56,19.7],[340,2.7],[282,2.8],[-58,-17.1]] },
    { label: "감가상각", level: 2,
      cells: [[2019,1.6],[182,1.8],[182,1.4],[0,0.0],[182,1.4],[182,1.8],[0,0.0]] },
    { label: "포장비", level: 2,
      cells: [[355,0.3],[54,0.5],[73,0.6],[19,35.2],[73,0.6],[59,0.6],[-14,-19.2]] },
    { label: "연료비", level: 2,
      cells: [[857,0.7],[138,1.3],[138,1.1],[0,0.0],[138,1.1],[119,1.2],[-19,-13.8]] },
    { label: "기타", level: 2,
      cells: [[1393,1.1],[112,1.1],[112,0.9],[0,0.0],[112,0.9],[110,1.1],[-2,-1.4]] },
    { label: "고철매각", level: 1,
      cells: [[3329,2.7],[283,2.7],[315,2.5],[32,11.1],[315,2.5],[243,2.4],[-72,-22.8]] },
    { label: "매출총이익", level: 0, bold: true,
      cells: [[6699,5.5],[725,7.0],[1257,10.0],[532,73.5],[1257,10.0],[216,2.1],[-1041,-82.8]] },
    { label: "판매관리비", level: 0, bold: true,
      cells: [[10430,8.5],[898,8.7],[873,6.9],[-25,-2.8],[873,6.9],[797,7.9],[-76,-8.7]] },
    { label: "인건비", level: 1,
      cells: [[5535,4.5],[475,4.6],[481,3.8],[6,1.3],[481,3.8],[465,4.6],[-16,-3.3]] },
    { label: "운반비", level: 1,
      cells: [[413,0.3],[39,0.4],[38,0.3],[-1,-2.9],[38,0.3],[32,0.3],[-6,-15.8]] },
    { label: "기타", level: 1,
      cells: [[4482,3.7],[384,3.7],[354,2.8],[-30,-7.8],[354,2.8],[300,3.0],[-54,-15.2]] },
    { label: "영업이익", level: 0, bold: true, emphasize: true,
      cells: [[-3730,-3.0],[-173,-1.7],[384,3.0],[557,322.1],[384,3.0],[-581,-5.8],[-966,251.3]] },
  ],
};
// 경영회의 2026년 01월 보고서 - 페이지 9~13 데이터
// 출처: D:\AI\경영회의\1.경영회의(2026년01월)_보고서.xlsx (openpyxl, data_only=True)
//       + D:\AI\경영회의\1.경영회의(2026년01월)_보고서.pdf (교차검증)
// ※ 1월 보고서는 연초 보고서로 시트 구성이 다른 달과 다릅니다 (지시사항 참고):
//   page9  <- '3.프로젝트(KOREA)'
//   page10 <- '3-2.투자비_2026년'              (※ '3-1.투자비'가 아님 — 그건 2025년 시트)
//   page11 <- '3-3.투자비_상세(2026년)'         (※ '3-2.투자비_상세'가 아님)
//   page12 <- '4-3.고객실적 및 사내공정불량율(26년)' (※ '4-1...'이 아님)
//   page13 <- '4-4.Q-COST 실적&주요이벤트 및 공지'   (※ '4-2...'이 아님)
// 당월(1월) 기준: 1월까지 실적 반영, 2~12월은 null (단, 연간 사업계획/실행계획처럼
// 연초에 이미 확정된 계획성 수치는 12개월 전체가 채워져 있습니다).
// 세부 판단/불확실 사항은 report-data-2026-01-p9to13.notes.txt 참고.
// REPORT 전역 객체는 다른 파일(1~8p 데이터)에서 이미 생성되어 있다고 가정하고 여기서는 속성만 추가합니다.

// ---------------- Page 9: 신규 Project 진행 현황 ----------------
// customer(고객사) 필드: 소스 시트의 D열(Customer)이 전 구간 공란이라 모든 그룹에서 null 처리.
// commodity: 시트 원문은 "Solor"로 오기(typo) 되어 있어 다른 달과의 일관성을 위해 "Solar"로 교정.
REPORT.page9 = {
  groups: [
    {
      plant: "Cheon-an", commodity: "Chassis", customer: null,
      projects: [
        {
          project: "9BQX",
          rows: [
            { pname: "FLANGE-EXH PIPE ASM",
              tko: "25-2-17", d1: { v: "25-5-16", state: "green" }, line: "25-4-18", pvStart: "N/A",
              pvDone: "N/A", ppap: { v: "26-2-27", state: "black", note: "품질육성" }, run: "26-7-10", sorp: "27-2-1",
              recPlan: 75, recActual: 30, recDate: "2027-03",
              invPlan: 59, invActual: 59, invRate: 100,
              remarks: "" },
          ],
        },
        {
          project: "C1XX",
          rows: [
            { pname: "TOP COVER\n(PROTO)",
              tko: "25-7-14", d1: { v: "25-10-31", state: "green" }, line: "N/A", pvStart: "N/A",
              pvDone: "N/A", ppap: "N/A", run: "N/A", sorp: "N/A",
              recPlan: 77, recActual: null, recDate: "2026-01",
              invPlan: 45, invActual: 45, invRate: 100,
              remarks: "SOP 연기\n(Q4/2027 → Q2/2029)" },
          ],
        },
      ],
    },
    {
      plant: "Cheon-an", commodity: "Seat", customer: null,
      projects: [
        {
          project: "US4",
          rows: [
            { pname: "어린이 시트\n11 인승",
              tko: "25-3-24", d1: "25-6-28", line: "25-6-20", pvStart: "25-7-25",
              pvDone: "25-9-18", ppap: { v: "25-11-7", state: "green" }, run: "N/A", sorp: { v: "26-2-15", state: "black", note: "품질 육성" },
              recPlan: 880, recActual: null, recDate: "2026-03",
              invPlan: 538, invActual: 484, invRate: 90,
              remarks: "" },
          ],
        },
      ],
    },
    {
      plant: "Cheon-an", commodity: "Wheel", customer: null,
      projects: [
        {
          project: "LW1",
          rows: [
            { pname: "Steel Wheel\n(16×6.5J, 4.25T)",
              tko: { v: "25-9-17", state: "green" }, d1: "26-3-7", line: { v: "26-1-29", state: "black", note: "품질 육성" }, pvStart: "26-2-23",
              pvDone: "28-7-15", ppap: "28-10-15", run: "28-12-18", sorp: "29-1-15",
              recPlan: 0, recActual: null, recDate: "2029-01",
              invPlan: 253, invActual: 253, invRate: 100,
              remarks: "부품가 감가상각" },
            { pname: "Steel Wheel\n(16×6.5J, 3.5T)",
              tko: { v: "25-12-17", state: "green" }, d1: "26-6-26", line: { v: "26-5-15", state: "black", note: "Tooling" }, pvStart: "26-6-8",
              pvDone: "27-1-1", ppap: "27-3-15", run: "27-5-15", sorp: "27-6-30",
              recPlan: 0, recActual: null, recDate: "2027-06",
              invPlan: 180, invActual: 180, invRate: 100,
              remarks: "부품가 감가상각" },
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
              tko: { v: "25-12-29", state: "green" }, d1: "N/A", line: { v: "26-5-8", state: "black", note: "Tooling" }, pvStart: "N/A",
              pvDone: "N/A", ppap: "26-5-15", run: "26-5-15", sorp: "26-5-18",
              recPlan: 350, recActual: null, recDate: "2026-06",
              invPlan: 418, invActual: 365, invRate: 87,
              remarks: "고객 회수\n2,228\n(350+1,878)" },
            { pname: "Articulating Coupler",
              tko: { v: "25-12-29", state: "green" }, d1: "N/A", line: "26-6-12", pvStart: "N/A",
              pvDone: "N/A", ppap: "26-6-19", run: "26-6-26", sorp: "26-7-1",
              recPlan: null, recActual: null, recDate: "2026-08",
              invPlan: 1643, invActual: 1068, invRate: 65,
              remarks: null },
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
    monthlyActual: [2774, null, null, null, null, null, null, null, null, null, null, null],
    cumPlan:       [3874, 4343, 4396, 4736, 4781, 4791, 4791, 4851, 4851, 4851, 4851, 4861],
    cumExecuted:   [3935, 4404, 4457, 4797, 4842, 4852, 4852, 4912, 4912, 4912, 4912, 4922],
    cumActual:     [2774, null, null, null, null, null, null, null, null, null, null, null],
  },
  remainingByCategory: {
    labels: ["Wheel", "Body", "Chassis", "Chassis", "Module", "Seat", "공통", "북미"],
    values: [629, 0, 0, 350, 0, 227, 0, 727],
  },
  recoveryByYear: {
    years: ["2026년", "2027년"],
    plan:   [4875, 23],
    actual: [0, 0],
  },
  table: {
    groups: [
      {
        label: "합계", labelSpan: 4, valsSpan: 4,
        planDelta: 61, execSaving: -145, cancel: 0, remaining: 2003,
        rows: [
          { sub: "사업계획", y2025: 5071, months: [3874, 469, 53, 340, 45, 10, 0, 60, 0, 0, 0, 10], total: 4861,
            recovery: { y2025: 15502, y2026: 4875, y2027: 23, total: 20399 } },
          { sub: "실행계획", y2025: 6031, months: [3935, 469, 53, 340, 45, 10, 0, 60, 0, 0, 0, 10], total: 4922,
            recovery: { y2025: 15966, y2026: 4875, y2027: 23, total: 20863 } },
          { sub: "실적", y2025: 5710, months: [2774, null, null, null, null, null, null, null, null, null, null, null], total: 2774,
            recovery: { y2025: 15966, y2026: 0, y2027: 0, total: 15966 } },
          { sub: "%", isPct: true, y2025: 95, months: [70, null, null, null, null, null, null, null, null, null, null, null], total: 56,
            recovery: { y2025: 100, y2026: 0, y2027: null, total: 77 } },
        ],
      },
      {
        label: "국내", labelSpan: 3, valsSpan: 3,
        planDelta: 61, execSaving: 0, cancel: 0, remaining: 1276,
        rows: [
          { sub: "사업계획", y2025: 5071, months: [1569, 469, 53, 340, 45, 10, 0, 60, 0, 0, 0, 10], total: 2556,
            recovery: { y2025: 15502, y2026: 1864, y2027: 23, total: 17388 } },
          { sub: "실행계획", y2025: 5323, months: [1630, 469, 53, 340, 45, 10, 0, 60, 0, 0, 0, 10], total: 2617,
            recovery: { y2025: 15966, y2026: 1864, y2027: 23, total: 17853 } },
          { sub: "실적", y2025: 5011, months: [1341, null, null, null, null, null, null, null, null, null, null, null], total: 1341,
            recovery: { y2025: 15966, y2026: 0, y2027: 0, total: 15966 } },
        ],
      },
      {
        label: "해외\n선투자", labelSpan: 3, valsSpan: 3,
        planDelta: 0, execSaving: -145, cancel: 0, remaining: 727,
        rows: [
          { sub: "사업계획", y2025: 0, months: [2305, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0], total: 2305,
            recovery: { y2025: 0, y2026: 3011, y2027: 0, total: 3011 } },
          { sub: "실행계획", y2025: 708, months: [2305, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0], total: 2305,
            recovery: { y2025: 0, y2026: 3011, y2027: 0, total: 3011 } },
          { sub: "실적", y2025: 699, months: [1433, null, null, null, null, null, null, null, null, null, null, null], total: 1433,
            recovery: { y2025: 0, y2026: 0, y2027: 0, total: 0 } },
        ],
      },
    ],
  },
  notes: [
    "1. 2026년 실행계획 투자비: 4,922백만원(사업계획 4,861백만원 + 추가계획: 61백만원)",
    "2. (01월) 실적: 2,774백만원 — 3,500T PRESS 동력전달계통(DRIVE GEAR PARTS) 수리 61백만원, HKMC LW1 STEEL WHEEL 16인치 설계 변경 및 이원화 개발 180백만원, 우즈벡 B-SUV 신규 금형제작 진행 1,100백만원, 북미 NEVADOS 관련 선투자 집행 1,433백만원",
    "3. 고객사 회수 계획: 4,875백만원 — 우즈벡 GSV EM RETOOL'G 잔금 10%(241.3백만원), UZAUTO GEM BSUV FRT CRADLE RETOOLING 중도금/잔금 50%(683백만원), C1xx Top cover B sample Tooling(38백만원), 9BQX FLANGE-EXH PIPE ASM 중도금2차(23백만원), US4 설변 및 안전기준 강화 금형비(880백만원), 북미 오스템아메리카 선투자 회수(3,011백만원)",
  ],
};

// ---------------- Page 11: 투자비 상세 현황 ----------------
// 1월은 연초라 Body/Module/공통/EV 카테고리의 실행 라인이 전부 0·공란(특기사항 없음)이라 생략했습니다.
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
    { category: "Chassis", item: "기타", plan: 178, extra: 0, cancel: 0, total: 178, actual: 0, rate: 0, saving: null, unexecuted: 178,
      remarks: "2공장 콤프레샤 노후 신형으로 교체(45), 3공장 인버터 콤프레샤 교체(60), E/D2 4LINE 트롤리 체인 노후 교체 공사(53), A/S 공급 ISSUE 대응(20)" },
    { category: "Seat", item: "9BUX", plan: 227, extra: 0, cancel: null, total: 227, actual: 0, rate: 0, saving: null, unexecuted: 227,
      remarks: "9BXX TRACK LWR WELD LINE 개조(성인화)(227)" },
    { category: "Seat", item: "기타", plan: 70, extra: 0, cancel: null, total: 70, actual: 0, rate: 0, saving: null, unexecuted: 70,
      remarks: "협력업체(정운) 반납 대응(70)" },
    { category: "해외선투자", item: "북미 Nevados", plan: 2305, extra: 0, cancel: 0, total: 2305, actual: 1433, rate: 68, saving: 145, unexecuted: 727,
      remarks: "NEVADOS, BEARING ASM 북미 양산금형 개발(510/418), RETENTION 북미 양산금형 개발(145/145), MACHANICAL STOP 북미 양산금형 개발(80), NEVADOS - BEARING CRADLE(1,037/650), 북미오스템 LEVELER(400TON) 신규 투자(273/220), NEVADOS - MECHANICAL STOP(164), BEARING CRADLE 개발 관련 C/F 제작(95)" },
  ],
  total: { plan: 4861, extra: 61, cancel: 0, total: 4922, actual: 2774, rate: 59, saving: 145, unexecuted: 2003 },
};

// ---------------- Page 12: 품질지표 - 고객실적 / PPM ----------------
REPORT.page12 = {
  customerResult: {
    months: ["1월","2월","3월","4월","5월","6월","7월","8월","9월","10월","11월","12월"],
    spps: {
      target:  [0,0,0,0,0,0,0,0,0,0,0,0],
      wheel:   [0,null,null,null,null,null,null,null,null,null,null,null],
      chassis: [0,null,null,null,null,null,null,null,null,null,null,null],
      seat:    [0,null,null,null,null,null,null,null,null,null,null,null],
      incheon: [0,null,null,null,null,null,null,null,null,null,null,null],
    },
    lineStop: {
      target:  [0,0,0,0,0,0,0,0,0,0,0,0],
      wheel:   [0,null,null,null,null,null,null,null,null,null,null,null],
      chassis: [0,null,null,null,null,null,null,null,null,null,null,null],
      seat:    [0,null,null,null,null,null,null,null,null,null,null,null],
      incheon: [0,null,null,null,null,null,null,null,null,null,null,null],
    },
  },
  issue: "",
  ppm: {
    wheel:   { target: [175,120,120,120,100,100,100,100,100,100,80,80,80], actual: [140,95,null,null,null,null,null,null,null,null,null,null,null], cumTarget: 100, cumActual: null },
    chassis: { target: [148,40,40,40,35,35,35,35,35,35,30,30,30], actual: [49,21,null,null,null,null,null,null,null,null,null,null,null], cumTarget: 35, cumActual: 21 },
    seat:    { target: [12,1,1,1,1,1,1,1,1,1,1,1,1], actual: [2,0,null,null,null,null,null,null,null,null,null,null,null], cumTarget: 1, cumActual: 0 },
    module:  { target: [0,0,0,0,0,0,0,0,0,0,0,0,0], actual: [0,0,null,null,null,null,null,null,null,null,null,null,null], cumTarget: 0, cumActual: 0 },
  },
};

// ---------------- Page 13: 품질지표 - Q-COST ----------------
REPORT.page13 = {
  months: ["1월","2월","3월","4월","5월","6월","7월","8월","9월","10월","11월","12월"],
  groups: [
    {
      label: "Chassis\n&\nWheel\nQ-Cost",
      target:   { v2025: 2640, m: [1330,1330,1330,1280,1280,1280,1280,1280,1280,1180,1180,1180], total: 15210 },
      actual:   { v2025: 1798, m: [1081,null,null,null,null,null,null,null,null,null,null,null], total: 1081 },
      failCost: { v2025: 1070, m: [622,null,null,null,null,null,null,null,null,null,null,null], total: 622 },
      items: [
        { label: "9BUX",     v2025: 863, m: [591,null,null,null,null,null,null,null,null,null,null,null], total: 591 },
        { label: "AURORA",   v2025: 75,  m: [24,null,null,null,null,null,null,null,null,null,null,null], total: 24 },
        { label: "LJL",      v2025: 15,  m: [0,null,null,null,null,null,null,null,null,null,null,null], total: 0 },
        { label: "C121",     v2025: 15,  m: [7,null,null,null,null,null,null,null,null,null,null,null], total: 7 },
        { label: "기타차종", v2025: 7,   m: [0,null,null,null,null,null,null,null,null,null,null,null], total: 0 },
        { label: "F/CLAIM",  v2025: 95,  m: [0,null,null,null,null,null,null,null,null,null,null,null], total: 0 },
      ],
      evalCost: { v2025: 637, m: [459,null,null,null,null,null,null,null,null,null,null,null], total: 459 },
      prevCost: { v2025: 91,  m: [0,null,null,null,null,null,null,null,null,null,null,null], total: 0 },
      rate:     { v2025: 0.03, m: [0.02,null,null,null,null,null,null,null,null,null,null,null], total: 0.02 },
    },
    {
      label: "Seat\nQ-Cost",
      target:   { v2025: 555, m: [260,260,260,200,200,200,200,200,200,160,160,160], total: 2460 },
      actual:   { v2025: 292, m: [0,null,null,null,null,null,null,null,null,null,null,null], total: 0 },
      failCost: { v2025: 90,  m: [0,null,null,null,null,null,null,null,null,null,null,null], total: 0 },
      items: [
        { label: "9BUX",     v2025: 26, m: [0,null,null,null,null,null,null,null,null,null,null,null], total: 0 },
        { label: "기타차종", v2025: 0,  m: [0,null,null,null,null,null,null,null,null,null,null,null], total: 0 },
        { label: "F/CLAIM",  v2025: 64, m: [0,null,null,null,null,null,null,null,null,null,null,null], total: 0 },
      ],
      evalCost: { v2025: 202, m: [0,null,null,null,null,null,null,null,null,null,null,null], total: 0 },
      prevCost: { v2025: 0,   m: [0,null,null,null,null,null,null,null,null,null,null,null], total: 0 },
      rate:     { v2025: 0.01, m: [0,null,null,null,null,null,null,null,null,null,null,null], total: 0 },
    },
  ],
  eventTable: {
    rows: [],
  },
};
