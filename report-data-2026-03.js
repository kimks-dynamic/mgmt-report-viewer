const REPORT = {};
// 경영회의 2026년 03월 보고서 - 페이지 4~8 데이터
// 출처: D:\AI\경영회의\1.경영회의(2026년03월)_보고서.xlsx (openpyxl, data_only=True로 직접 추출)
//   page4 <- 시트 '1.국내매출종합'
//   page5 <- 시트 '매출분석'
//   page6 <- 시트 '1-1.상세'
//   page7 <- 시트 '누적환율변동 Impact'
//   page8 <- 시트 '2.손익(03월)'
// report-render.js의 renderPage4~renderPage8과 report-data.js(2026년08월)/report-data-2026-07.js/
// report-data-2026-06-p4to8.js의 REPORT.page4~page8과 동일한 필드명/구조를 사용합니다.
// 모든 수치는 원본 PDF(D:/AI/경영회의/1.경영회의(2026년03월)_보고서.pdf) 페이지 4~8과 교차검증하여 일치를 확인했습니다.
// 세부 참고사항(불확실한 값, 구조 차이, 검산용 합계)은 report-data-2026-03-p4to8.notes.txt 참조.
// (REPORT 전역 객체는 이미 선언되어 있다고 가정 - 다른 파일에서 선언됨)

// ---------------- Page 4: 매출/부가가치/인원 현황 ----------------
REPORT.page4 = {
  months: ["1월","2월","3월","4월","5월","6월","7월","8월","9월","10월","11월","12월"],
  forecastIndex: 3,
  revenue: {
    label: "매출\n(백만원)",
    plan:    { yr: 102679, avg: 8557, m: [10333,8103,10873,10654,10013,9872,10586,5699,9210,10568,10113,10400], cum: 29308, total: 116422 },
    revised: { yr: null, avg: null, m: [null,null,null,null,null,null,null,null,null,null,null,null], cum: null, total: null },
    actual:  { yr: 122546, avg: 10212, m: [12546,10040,13087,12319,null,null,null,null,null,null,null,null], cum: 47991, total: 47991 },
    pct:     { yr: 119, avg: 119, m: [121,124,120,116,null,null,null,null,null,null,null,null], cum: 164, total: 41 },
  },
  valueAdded: {
    label: "부가가치\n(백만원)",
    plan:    { yr: 35232, avg: 2936, m: [3601,2845,3822,3729,3502,3451,3740,1958,3236,3729,3527,3621], cum: 10268, total: 40762 },
    revised: { yr: null, avg: null, m: [null,null,null,null,null,null,null,null,null,null,null,null], cum: null, total: null },
    actual:  { yr: 40323, avg: 3360, m: [4258,3497,4769,4201,null,null,null,null,null,null,null,null], cum: 16726, total: 16726 },
    pct:     { yr: 114, avg: 114, m: [118,123,125,113,null,null,null,null,null,null,null,null], cum: 163, total: 41 },
  },
  headcount: {
    label: "인원현황\n(명)",
    plan:    { yr: 373, avg: 373, m: [369,366,371,368,369,365,360,357,371,371,366,366], cum: 369, total: 367 },
    revised: { yr: 370, avg: 370, m: [361,360,360,346,346,346,346,341,341,341,341,341], cum: 360, total: 348 },
    actual:  { yr: 368, avg: 368, m: [361,360,360,360,null,null,null,null,null,null,null,null], cum: 360, total: 360 },
    pct:     { yr: 99, avg: 99, m: [98,98,97,98,null,null,null,null,null,null,null,null], cum: 98, total: 98 },
  },
  laborCost: {
    label: "인건비",
    plan:    { yr: 26429, avg: 2202, m: [2413,2358,2437,2288,2502,2195,2251,2033,2424,2480,2265,2258], cum: 7207, total: 27904 },
    revised: { yr: null, avg: null, m: [null,null,null,null,null,null,null,null,null,null,null,null], cum: null, total: null },
    actual:  { yr: 28528, avg: 2377, m: [2586,2294,2730,2476,null,null,null,null,null,null,null,null], cum: 7610, total: 7610 },
    pct:     { yr: 108, avg: 108, m: [107,97,112,108,null,null,null,null,null,null,null,null], cum: 106, total: 27 },
  },
  laborIndicators: {
    label: "인건비 지표\n(실적)",
    perCapita:   { yr: 77.5, avg: 6.5, m: [7.2,6.4,7.6,6.9,null,null,null,null,null,null,null,null], cum: 21.1, total: 21.1, unit: "" },
    laborRate:   { yr: 23.3, avg: 23.3, m: [20.6,22.9,20.9,20.1,null,null,null,null,null,null,null,null], cum: 15.9, total: 15.9, unit: "%" },
    distribRate: { yr: 70.7, avg: 70.7, m: [60.7,65.6,57.2,58.9,null,null,null,null,null,null,null,null], cum: 45.5, total: 45.5, unit: "%" },
    overtime:    { yr: 38.2, avg: 38.2, m: [62.3,45.4,58.0,50.0,null,null,null,null,null,null,null,null], cum: 55.3, total: 55.3, unit: "" },
    overtimePrevYear: { yr: null, avg: null, m: [null,null,null,null,null,null,null,null,null,null,null,null], cum: null, total: null, unit: "" },
  },
  // 참고: 원본 PDF/엑셀에는 "'25년 초과근로평균" 행 자체가 존재하지 않음(다른 달 보고서에는 있었음) → 전부 null 처리(렌더 시 "-" 표시).
  annualBar: { labels: ["전년매출", "사업계획", "년간예상"], values: [1225, 1164, 1245] },
};

// ---------------- Page 5: 매출 상세 증감 현황 ----------------
// 출처: D:\AI\경영회의\1.경영회의(2026년03월)_보고서.xlsx 시트 "매출분석"
// 열 순서: [3월 생산(사업계획,실적,증감,%)] [3월 매출(사업계획,실적,증감,%)] [4월 생산(사업계획,실행계획,증감,%)] [4월 매출(사업계획,실행계획,증감,%)] [전월대비 매출(증감,%)]
// (원본 시트 헤더는 3월 열의 계획을 "사업계획"으로 표기하나, report-render.js는 헤더 문구를 "수정계획"으로 고정 출력함 — 데이터 값 자체는 동일)
REPORT.page5 = {
  unitHeader: "수량\n단위",
  currentMonthLabel: "3월",
  nextMonthLabel: "4월",
  total: { label: "합 계", v: [95603,131689,36086,38, 10873,13087,2214,20, 92728,117188,24460,26, 10654,12319,1664,16, -768,-6] },
  groups: [
    {
      label: "자동차",
      subtotal: { v: [74853,110953,36100,48, 10734,12848,2115,20, 71978,91556,19578,27, 10516,12060,1545,15, -788,-6] },
      items: [
        { customer: "GMK 부평", customerRowspan: 1, model: "9BUX/9BQB", unit: "대분", v: [22381,26587,4206,19, 4541,5234,693,15, 21152,24081,2929,14, 4291,4821,530,12, -413,-8] },
        { customer: "GMK 창원", customerRowspan: 1, model: "9BQC", unit: "대분", v: [20313,23497,3184,16, 4128,4747,619,15, 20530,23087,2557,12, 4176,4773,597,14, 26,1] },
        { customer: "GM", customerRowspan: 1, model: "C121", unit: "대분", v: [3159,3888,729,23, 703,997,294,42, 2835,2700,-135,-5, 631,608,-23,-4, -389,-39] },
        { customer: "RKM", customerRowspan: 3, model: "LJL", unit: "대분", v: [1507,1686,179,12, 52,58,6,12, 1401,1848,447,32, 48,63,15,32, 6,10] },
        { customer: null, model: "AURORA-1", unit: "대분", v: [2427,1617,-810,-33, 267,180,-87,-33, 2806,2901,95,3, 319,319,0,0, 139,77] },
        { customer: null, model: "AURORA-2", unit: "대분", v: [2880,3759,879,31, 290,418,128,44, 2880,3091,211,7, 290,340,49,17, -78,-19] },
        { customer: "HMC", customerRowspan: 1, model: "US4", unit: "대분", v: [126,24,-102,-81, 336,64,-272,-81, 126,120,-6,-5, 336,320,-16,-5, 256,400] },
        { customer: "KGM", customerRowspan: 1, model: "Y450", unit: "대분", v: [625,264,-361,-58, 42,21,-22,-51, 656,700,44,7, 44,47,3,7, 27,129] },
        { customer: "EXPORT", customerRowspan: 2, model: "GSV-EM", unit: "대분", v: [11700,22110,10410,89, 323,800,477,148, 11700,16642,4942,42, 323,529,206,64, -271,-34] },
        { customer: null, model: "SEAT", unit: "대분", v: [9735,27521,17786,183, 52,229,178,344, 7892,16386,8494,108, 57,240,183,320, 10,5] },
        { customer: "A/S", customerRowspan: 1, model: null, unit: null, v: [null,null,null,null, 0,100,100,0, null,null,null,null, 0,0,0,0, -100,-100] },
      ],
    },
    {
      label: "SOLAR",
      subtotal: { v: [20750,20736,-14,0, 139,238,99,72, 20750,25632,4882,24, 139,259,120,86, 20,9] },
      items: [
        { merged: true, label: "AUSTEM AMERICA", unit: "EA", v: [20750,20736,-14,0, 139,238,99,72, 20750,25632,4882,24, 139,259,120,86, 20,9] },
      ],
    },
  ],
};
// 참고: 이번 달은 SOLAR 그룹에 "AUSTEM AMERICA" 항목만 존재(다른 달에 있던 "NOBULL ENERGY(H-BEAM)" 행은 원본에 없음).
// AUSTEM AMERICA 라벨도 다른 달과 달리 "(STAMPING)" 줄바꿈 없이 한 줄("AUSTEM AMERICA")로만 기재되어 있음.

// ---------------- Page 6: 사업부문별 상세현황 ----------------
// 출처: D:\AI\경영회의\1.경영회의(2026년03월)_보고서.xlsx 시트 "1-1.상세"
// v: [2월실적, 3월사업계획,3월실적,%,전월대비, 4월사업계획,4월실행계획,%,전월대비]
REPORT.page6 = {
  prevMonthLabel: "2월",
  currentMonthLabel: "3월",
  nextMonthLabel: "4월",
  // 차량생산: 자체 합계 없음 (부평/창원/KG모빌리티/RKM 실적만)
  vehicleGroupLabel: "차량생산",
  vehicleRows: [
    { name: "부평", v: [18047, 22381,26587,119,147, 21152,24081,114,91], note8: "", note9: "", shift: "2shift" },
    { name: "창원", v: [18915, 20313,23497,116,124, 20530,23087,112,98], note8: "", note9: "", shift: "2shift" },
    { name: "KG 모빌리티", v: [312, 625,264,42,85, 656,700,107,265], note8: "", note9: "", shift: "2shift" },
    { name: "RKM", v: [5260, 6814,7062,104,134, 7087,7840,111,111], note8: "", note9: "", shift: "1shift" },
  ],
  // 매출: 총계 + Wheel/Body/Chassis/Module/Seat/Solar
  salesGroupLabel: "매출",
  salesTotal: { v: [10108, 10873,13087,120,129, 10654,12319,116,94] },
  salesRows: [
    { name: "Wheel", v: [703, 833,830,100,118, 840,844,100,102], note8: "", note9: "" },
    { name: "Body", v: [2, 0,43,0,1981, 0,0,0,0], note8: "* 증가(TWB A/S)", note9: "" },
    { name: "Chassis", v: [6092, 6772,8547,126,140, 6597,7531,114,88], note8: "* 증가(GMK, C121, UZ-AUTO)", note9: "* 증가(GMK, UZ-AUTO)" },
    { name: "Module", v: [346, 408,467,115,135, 390,432,111,92], note8: "* 증가(GMK)", note9: "* 증가(GMK)" },
    { name: "Seat", v: [2504, 2721,2962,109,118, 2688,3254,121,110], note8: "* 증가(GMK, 직수출), 감소(US4)", note9: "* 증가(GMK, 직수출)" },
    { name: "Solar", v: [460, 139,238,172,52, 139,259,186,109], note8: "* 증가(Stamping)", note9: "* 증가(Stamping)" },
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
// 출처: D:\AI\경영회의\1.경영회의(2026년03월)_보고서.xlsx 시트 "누적환율변동 Impact"
// v: [년간(2025), 월평균(2025), 1월..12월 실적/계획, 누계]  (3월 보고서: 1~3월 실적 + 4월 계획, 5월부터 null)
REPORT.page7 = {
  months: ["1월","2월","3월","4월","5월","6월","7월","8월","9월","10월","11월","12월"],
  forecastIndex: 3,
  fxRate: {
    planYear2025: 1250, plan2026: 1300,
    actualYear2025: 1423,
    actualMonthly: [1457,1451,1480,1480,null,null,null,null,null,null,null,null],
  },
  revenue: {
    rows: [
      { name: "Wheel", v: [1,0, 0,0,0,0,null,null,null,null,null,null,null,null, 0] },
      { name: "Chassis", v: [763,64, 105,112,219,157,null,null,null,null,null,null,null,null, 435], note: "GSV-EM, C121" },
      { name: "Seat", v: [276,23, 13,15,21,30,null,null,null,null,null,null,null,null, 48], note: "H62X, GMI31UX" },
      { name: "Solar", v: [1182,98, 99,45,29,36,null,null,null,null,null,null,null,null, 173] },
    ],
    total: { v: [2221,185, 217,172,268,223,null,null,null,null,null,null,null,null, 657] },
  },
  valueAdded: {
    rows: [
      { name: "Wheel", v: [1,0, 0,0,0,0,null,null,null,null,null,null,null,null, 0] },
      { name: "Chassis", v: [667,56, 87,97,196,134,null,null,null,null,null,null,null,null, 381], note: "9BUX & AURORA Bush" },
      { name: "Seat", v: [276,23, 13,15,21,30,null,null,null,null,null,null,null,null, 48] },
      { name: "Solar", v: [776,65, 59,26,15,18,null,null,null,null,null,null,null,null, 100], note: "관세 & DDP 운반비" },
    ],
    total: { v: [1719,143, 160,138,232,182,null,null,null,null,null,null,null,null, 529] },
  },
  duty: {
    rateNote: "관세율: 25% → 50% (2025년 중 인상), 2026년 1~4월 50% 유지 (Steel 50%, 사출 15%)",
    rows: [
      { name: "Solar", v: [2669,222, 271,143,85,105,null,null,null,null,null,null,null,null, 498] },
    ],
  },
};

// ---------------- Page 8: 전월 실적 및 당월 예상 손익 현황 ----------------
// 출처: D:\AI\경영회의\1.경영회의(2026년03월)_보고서.xlsx 시트 "2.손익(03월)"
REPORT.page8 = {
  columns: ["02월 실적","03월 실행계획","03월 실적","실행계획대비","누적 실적(~03월)","04월 실행계획","전월실적 대비"],
  rows: [
    { label: "매출액", level: 0, bold: true, note: "",
      cells: [[10108,100.0],[12875,100.0],[13087,100.0],[212,1.6],[35740,100.0],[12319,100.0],[-768,-5.9]] },
    { label: "자동차", level: 1,
      cells: [[9648,95.5],[12569,97.6],[12848,98.2],[279,2.2],[34148,95.5],[12060,97.9],[-788,-6.1]] },
    { label: "solar", level: 1,
      cells: [[460,4.5],[306,2.4],[238,1.8],[-68,-22.1],[1592,4.5],[259,2.1],[20,8.6]] },
    { label: "부가가치", level: 0, bold: true,
      cells: [[3493,34.6],[4420,34.3],[4769,36.4],[349,7.9],[12520,35.0],[4201,34.1],[-568,-11.9]] },
    { label: "자동차", level: 1,
      cells: [[3496,34.6],[4441,34.5],[4777,36.5],[335,7.6],[12521,35.0],[4229,34.3],[-548,-11.5]] },
    { label: "solar", level: 1,
      cells: [[-3,0.0],[-21,-0.2],[-8,-0.1],[13,63.0],[-1,0.0],[-28,-0.2],[-20,-257.7]] },
    { label: "매출원가", level: 0, bold: true,
      cells: [[9667,95.6],[11922,92.6],[11829,90.4],[-93,-0.8],[33244,93.0],[11491,93.3],[-338,-2.9]],
      note: "※환율적용기준\n1)02월환율효과: 138백만원(부가가치기준)_손익반영\n2)03월환율효과: 232백만원(부가가치기준)_손익반영\n3)04월환율(예상)효과: 182백만원_손익미반영(1,480원/$기준)" },
    { label: "재료비", level: 1,
      cells: [[6615,65.4],[8455,65.7],[8318,63.6],[-137,-1.6],[23220,65.0],[8118,65.9],[-200,-2.4]] },
    { label: "노무비", level: 1,
      cells: [[1826,18.1],[2232,17.3],[2223,17.0],[-9,-0.4],[6149,17.2],[1990,16.2],[-232,-10.5]] },
    { label: "정규", level: 2,
      cells: [[1576,15.6],[1912,14.8],[1880,14.4],[-31,-1.6],[5238,14.7],[1687,13.7],[-193,-10.3]],
      note: "대학학자금 132백만원(2월계획→3월급여시 지급)" },
    { label: "도급", level: 2,
      cells: [[251,2.5],[320,2.5],[342,2.6],[22,7.0],[911,2.5],[303,2.5],[-39,-11.5]] },
    { label: "제조경비", level: 1,
      cells: [[1226,12.1],[1235,9.6],[1288,9.8],[53,4.3],[3875,10.8],[1383,11.2],[95,7.3]] },
    { label: "인건비성 경비", level: 2,
      cells: [[211,2.1],[240,1.9],[251,1.9],[11,4.8],[678,1.9],[392,3.2],[141,56.2]],
      note: "(4)월 건강보험/고용,산재 보험 정산" },
    { label: "수선/소모품비", level: 2,
      cells: [[228,2.3],[239,1.9],[280,2.1],[41,17.3],[765,2.1],[270,2.2],[-10,-3.6]],
      note: "고객방문 환경개선 비용으로 일시 증가 예상" },
    { label: "전력비", level: 2,
      cells: [[275,2.7],[273,2.1],[273,2.1],[0,0.0],[888,2.5],[280,2.3],[7,2.6]],
      note: "산업용전기료 단가 변경(6/1~ , 주간인하, 야간인상)" },
    { label: "감가상각", level: 2,
      cells: [[182,1.8],[182,1.4],[182,1.4],[0,0.0],[546,1.5],[182,1.5],[0,0.0]] },
    { label: "포장비", level: 2,
      cells: [[68,0.7],[102,0.8],[101,0.8],[-1,-1.0],[242,0.7],[74,0.6],[-27,-26.7]] },
    { label: "연료비", level: 2,
      cells: [[134,1.3],[88,0.7],[88,0.7],[0,0.0],[379,1.1],[70,0.6],[-18,-21.0]] },
    { label: "기타", level: 2,
      cells: [[128,1.3],[111,0.9],[113,0.9],[2,1.4],[378,1.1],[115,0.9],[2,1.6]] },
    { label: "고철매각", level: 1,
      cells: [[268,2.7],[363,2.8],[357,2.7],[-6,-1.8],[962,2.7],[335,2.7],[-22,-6.1]],
      note: "2월 불용제품 고철매각 제외(156.51백만원)" },
    { label: "매출총이익", level: 0, bold: true,
      cells: [[708,7.0],[1317,10.2],[1615,12.3],[298,22.6],[3457,9.7],[1163,9.4],[-452,-28.0]] },
    { label: "판매관리비", level: 0, bold: true,
      cells: [[843,8.3],[863,6.7],[902,6.9],[38,4.5],[2665,7.5],[1026,8.3],[124,13.8]] },
    { label: "인건비", level: 1,
      cells: [[468,4.6],[497,3.9],[507,3.9],[10,2.0],[1461,4.1],[486,3.9],[-21,-4.1]] },
    { label: "운반비", level: 1,
      cells: [[34,0.3],[42,0.3],[40,0.3],[-2,-4.8],[112,0.3],[42,0.3],[2,5.0]] },
    { label: "기타", level: 1,
      cells: [[341,3.4],[324,2.5],[355,2.7],[31,9.4],[1092,3.1],[498,4.0],[143,40.3]],
      note: "(4)월 회계감사, 세무조정수수료 비용" },
    { label: "영업이익", level: 0, bold: true, emphasize: true,
      cells: [[-134,-1.3],[454,3.5],[713,5.4],[259,-57.2],[793,2.2],[137,1.1],[-576,80.8]] },
  ],
};
// 경영회의 2026년 03월 보고서 - 페이지 9~13 데이터
// 출처: D:\AI\경영회의\1.경영회의(2026년03월)_보고서.xlsx (openpyxl, data_only=True)
//       + D:\AI\경영회의\1.경영회의(2026년03월)_보고서.pdf (pdfplumber 텍스트/좌표 추출로 전량 교차검증)
//   시트: "3.프로젝트(KOREA)"(p9), "3-1.투자비"(p10, 표 + 3개 내장 차트 캐시값), "3-2.투자비_상세"(p11),
//         "4-1.고객실적 및 사내공정불량율(26년)"(p12, 표 + 4개 내장 차트 캐시값), "4-2.Q-COST 실적&주요이벤트 및 공지"(p13)
// 당월(3월) 기준: 3월까지 실적 반영, 4~12월은 null.
// REPORT 전역 객체는 다른 파일(1~8p 및 4~8p 데이터)에서 이미 생성되어 있다고 가정하고 여기서는 속성만 추가합니다.
// 상세 판단 근거/불확실 항목은 report-data-2026-03-p9to13.notes.txt 참조.

// ---------------- Page 9: 신규 Project 진행 현황 ----------------
REPORT.page9 = {
  groups: [
    {
      plant: "Cheon-an", commodity: "Wheel", customer: "",
      projects: [
        {
          project: "LW1",
          rows: [
            { pname: "Steel Wheel (16×6.5J, 4.25T)",
              tko: "25-9-17", d1: "26-4-6", line: "26-3-19",
              pvStart: { v: "26-3-30", state: "green", note: "품질 육성" },
              pvDone: "28-7-15", ppap: "28-10-15", run: "28-12-18", sorp: "29-1-15",
              recPlan: null, recActual: null, recDate: "2029-01",
              invPlan: 253, invActual: 253, invRate: 100,
              remarks: "부품가 감가 상각" },
            { pname: "Steel Wheel (16×6.5J, 3.5T)",
              tko: { v: "25-12-17", state: "green" }, d1: "26-6-26",
              line: { v: "26-5-15", note: "Tooling" }, pvStart: "26-6-8",
              pvDone: "27-1-1", ppap: "27-3-15", run: "27-5-15", sorp: "27-6-30",
              recPlan: null, recActual: null, recDate: "2027-06",
              invPlan: 180, invActual: 180, invRate: 100,
              remarks: "부품가 감가 상각" },
          ],
        },
      ],
    },
    {
      plant: "Cheon-an", commodity: "EV", customer: "",
      mergeGroupCols: true,
      groupRecovery: { plan: null, actual: null, date: "2027-10" },
      groupInvest: { plan: null, actual: null, rate: null },
      groupRemarks: "",
      projects: [
        {
          project: "E092 KF1\n(Proto)",
          rows: [
            { pname: "Housing UPR",
              tko: { v: "26-3-16", state: "green" }, d1: "26-7-3",
              line: { v: "26-5-22", note: "Tooling" }, pvStart: "TBD",
              pvDone: "TBD", ppap: "28-3-10", run: "28-9-8", sorp: "29-4-2" },
            { pname: "Housing LWR",
              tko: { v: "26-3-16", state: "green" }, d1: "26-7-3",
              line: { v: "26-5-22", note: "Tooling" }, pvStart: "TBD",
              pvDone: "TBD", ppap: "28-3-10", run: "28-9-8", sorp: "29-4-2" },
            { pname: "ENDPLATE FRT/RR",
              tko: { v: "26-3-16", state: "green" }, d1: "26-7-3",
              line: { v: "26-5-22", note: "Tooling" }, pvStart: "TBD",
              pvDone: "TBD", ppap: "28-3-10", run: "28-9-8", sorp: "29-4-2" },
          ],
        },
      ],
    },
    {
      plant: "Plymouth", commodity: "Solor", customer: "",
      projects: [
        {
          project: "Nevados",
          rows: [
            { pname: "Retention",
              tko: { v: "25-12-29", state: "green" }, d1: "N/A",
              line: { v: "26-5-8", note: "품질육성" }, pvStart: "N/A",
              pvDone: "N/A", ppap: "26-5-15", run: "26-5-15", sorp: "26-5-18",
              recPlan: 350, recActual: null, recDate: "2026-06",
              invPlan: 418, invActual: 365, invRate: 87,
              remarks: "고객 회수\n2,228\n(350+1,878)" },
            { pname: "Articulating Coupler",
              tko: { v: "25-12-29", state: "green" }, d1: "N/A",
              line: { v: "26-6-12", note: "Tooling" }, pvStart: "N/A",
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
    monthlyActual: [2802, 121, 333, null, null, null, null, null, null, null, null, null],
    cumPlan:       [3874, 4396, 4396, 4736, 4781, 4791, 4791, 4851, 4851, 4851, 4851, 4861],
    cumExecuted:   [3935, 4457, 4749, 5089, 5134, 5144, 5144, 5204, 5204, 5204, 5204, 5214],
    cumActual:     [2802, 2923, 3255, null, null, null, null, null, null, null, null, null],
  },
  remainingByCategory: {
    labels: ["Wheel", "Body", "Chassis", "Module", "Seat", "공통", "북미"],
    values: [629, 0, 299, 0, 227, 0, 658],
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
        planDelta: 352, execSaving: -145, cancel: null, remaining: 1813,
        rows: [
          { sub: "사업계획", y2025: 5071, months: [3874, 522, null, 340, 45, 10, null, 60, null, null, null, 10], total: 4861,
            recovery: { y2025: 15502, y2026: 4875, y2027: 23, total: 20399 } },
          { sub: "실행계획", y2025: 6031, months: [3935, 522, 291, 340, 45, 10, null, 60, null, null, null, 10], total: 5214,
            recovery: { y2025: 15966, y2026: 4958, y2027: 23, total: 20946 } },
          { sub: "실적", y2025: 5710, months: [2802, 121, 333, null, null, null, null, null, null, null, null, null], total: 3255,
            recovery: { y2025: 15966, y2026: 440, y2027: null, total: 16406 } },
          { sub: "%", isPct: true, y2025: 95, months: [71, 23, 114, null, null, null, null, null, null, null, null, null], total: 62,
            recovery: { y2025: 100, y2026: 9, y2027: null, total: 78 } },
        ],
      },
      {
        label: "국내", labelSpan: 3, valsSpan: 3,
        planDelta: 352, execSaving: null, cancel: null, remaining: 1155,
        rows: [
          { sub: "사업계획", y2025: 5071, months: [1569, 522, null, 340, 45, 10, null, 60, null, null, null, 10], total: 2556,
            recovery: { y2025: 15502, y2026: 1864, y2027: 23, total: 17388 } },
          { sub: "실행계획", y2025: 5323, months: [1630, 522, 291, 340, 45, 10, null, 60, null, null, null, 10], total: 2909,
            recovery: { y2025: 15966, y2026: 1947, y2027: 23, total: 17936 } },
          { sub: "실적", y2025: 5011, months: [1341, 121, 291, null, null, null, null, null, null, null, null, null], total: 1753,
            recovery: { y2025: 15966, y2026: 440, y2027: null, total: 16406 } },
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
    "1. 2026년 실행계획 투자비: 5,214백만원 (사업계획 4,861백만원 + 추가계획: 352백만원)",
    "2. (03월) 실적: 332.8백만원 — 3500TON PRESS의 정상상태 복원을 위한 DRIVE GEAR 신착/교체 200백만원, NEVADOS BEARING CRADLE 개발 관련 C/F 제작 41.4백만원, 법인 업무용 차량 매입 91백만원",
    "3. 고객사 회수 계획: 4,958백만원 — 우즈벡 GSV EM RETOOL'G 잔금 10%(241.3백만원), UZAUTO GEM BSUV FRT CRADLE RETOOLING 중도금/잔금 50%(683백만원), C1xx Top cover B sample Tooling(38백만원), 9BQX FLANGE-EXH PIPE ASM 중도금2차(23백만원), 9BU/Qx TRACK ASM 2025 RETOOLING 금형비(83백만원), US4 설변 및 안전기준 강화 금형비(880백만원), 북미 오스템아메리카 선투자 회수(3,011백만원)",
    "4. 고객사 회수 실적: 440백만원 — MANO US4 설계변경 & 안전기준 강화 금형비+ED&D 50% 회수(440백만원)",
  ],
};

// ---------------- Page 11: 투자비 상세 현황 ----------------
REPORT.page11 = {
  groups: [
    { category: "Wheel", item: "LW1", plan: 794, extra: null, cancel: null, total: 794, actual: 180, rate: 23, saving: null, unexecuted: 614,
      remarks: "HKMC LW1 STEEL WHEEL 16인치 설계 변경 및 이원화 개발(180/180), LW1 STEEL WHEEL 14X4.5J 개발(224.1), TOP-COATING SPRAY BOOTH 개선(340), RIM LINE 2차 설비 개선(50)" },
    { category: "Wheel", item: "기타", plan: 15, extra: 261, cancel: null, total: 276, actual: 261, rate: 95, saving: null, unexecuted: 15,
      remarks: "1공장 콤프레샤 연동시스템 설치 및 응축수 드레인 트랩 설치(15) / 추가: 3500T PRESS 동력전달계통(DRIVE GEAR PARTS) 수리(61/61), 3500TON PRESS의 정상상태 복원을 위한 DRIVE GEAR 신착/교체(200/200)" },
    { category: "Chassis", item: "9BXX", plan: 172, extra: null, cancel: null, total: 172, actual: null, rate: null, saving: null, unexecuted: 172,
      remarks: "FLCA WELD LINE 개조(성인화)(145), 9BQX/9BUX 용접라인 공통 용접기 노후 신품 구매(27)" },
    { category: "Chassis", item: "BSUV(UZ)", plan: 1100, extra: null, cancel: null, total: 1100, actual: 1100, rate: 100, saving: null, unexecuted: null,
      remarks: "우즈벡 B-SUV 신규 금형제작(1,100/1,100)" },
    { category: "Chassis", item: "기타", plan: 178, extra: null, cancel: null, total: 178, actual: 51, rate: 29, saving: null, unexecuted: 127,
      remarks: "2공장 콤프레샤 노후 신형으로 교체(45), 3공장 인버터 콤프레샤 교체(60), E/D2 4LINE 트롤리 체인 노후 교체 공사(계획53/실적51), A/S 공급 ISSUE 대응(20)" },
    { category: "Seat", item: "9BUX", plan: 227, extra: null, cancel: null, total: 227, actual: null, rate: null, saving: null, unexecuted: 227,
      remarks: "9BXX TRACK LWR WELD LINE 개조(성인화)(227)" },
    { category: "Seat", item: "기타", plan: 70, extra: null, cancel: null, total: 70, actual: 70, rate: 100, saving: null, unexecuted: null,
      remarks: "협력업체(정운) 반납 대응(계획70/실적70)" },
    { category: "공통", item: "총무비품", plan: null, extra: 91, cancel: null, total: 91, actual: 91, rate: 100, saving: null, unexecuted: null,
      remarks: "법인 업무용 차량 매입(91/91)" },
    { category: "해외선투자", item: "북미 Nevados", plan: 2305, extra: null, cancel: null, total: 2305, actual: 1502, rate: 71, saving: 145, unexecuted: 658,
      remarks: "NEVADOS, BEARING ASM 북미 양산금형 개발(510/418), RETENTION 북미 양산금형 개발(145/145), MACHANICAL STOP 북미 양산금형 개발(80), NEVADOS - BEARING CRADLE(1,037/650), 북미오스템 LEVELER (400TON) 신규 투자(273/220), NEVADOS - MECHANICAL STOP(164), BEARING CRADLE 개발 관련 C/F 제작(95/69)" },
  ],
  total: { plan: 4861, extra: 352, cancel: null, total: 5214, actual: 3255, rate: 65, saving: 145, unexecuted: 1813 },
};

// ---------------- Page 12: 품질지표 - 고객실적 / PPM ----------------
REPORT.page12 = {
  customerResult: {
    months: ["1월","2월","3월","4월","5월","6월","7월","8월","9월","10월","11월","12월"],
    spps: {
      target:  [0,0,0,0,0,0,0,0,0,0,0,0],
      wheel:   [0,0,0,null,null,null,null,null,null,null,null,null],
      chassis: [0,0,0,null,null,null,null,null,null,null,null,null],
      seat:    [0,0,0,null,null,null,null,null,null,null,null,null],
      incheon: [0,0,0,null,null,null,null,null,null,null,null,null],
    },
    lineStop: {
      target:  [0,0,0,0,0,0,0,0,0,0,0,0],
      wheel:   [0,0,0,null,null,null,null,null,null,null,null,null],
      chassis: [0,0,0,null,null,null,null,null,null,null,null,null],
      seat:    [0,0,0,null,null,null,null,null,null,null,null,null],
      incheon: [0,0,0,null,null,null,null,null,null,null,null,null],
    },
  },
  issue: "",
  ppm: {
    wheel:   { target: [175,120,120,120,100,100,100,100,100,100,80,80,80], actual: [140,117,47,21,null,null,null,null,null,null,null,null,null], cumTarget: 100, cumActual: 69 },
    chassis: { target: [148,40,40,40,35,35,35,35,35,35,30,30,30], actual: [49,38,28,25,null,null,null,null,null,null,null,null,null], cumTarget: 35, cumActual: 37 },
    seat:    { target: [12,1,1,1,1,1,1,1,1,1,1,1,1], actual: [2,0,0,0,null,null,null,null,null,null,null,null,null], cumTarget: 1, cumActual: 0 },
    module:  { target: [0,0,0,0,0,0,0,0,0,0,0,0,0], actual: [0,0,0,0,null,null,null,null,null,null,null,null,null], cumTarget: 0, cumActual: 0 },
  },
};

// ---------------- Page 13: 품질지표 - Q-COST ----------------
REPORT.page13 = {
  months: ["1월","2월","3월","4월","5월","6월","7월","8월","9월","10월","11월","12월"],
  groups: [
    {
      label: "Chassis\n&\nWheel\nQ-Cost",
      target:   { v2025: 2640, m: [1330,1330,1330,1280,1280,1280,1280,1280,1280,1180,1180,1180], total: 15210 },
      actual:   { v2025: 1798, m: [1260,759,584,null,null,null,null,null,null,null,null,null], total: 2602 },
      failCost: { v2025: 1070, m: [851,225,224,null,null,null,null,null,null,null,null,null], total: 1300 },
      items: [
        { label: "9BUX",     v2025: 863, m: [851,186,224,null,null,null,null,null,null,null,null,null], total: 1261 },
        { label: "AURORA",   v2025: 75,  m: [0,39,0,null,null,null,null,null,null,null,null,null], total: 39 },
        { label: "LJL",      v2025: 15,  m: [0,0,0,null,null,null,null,null,null,null,null,null], total: 0 },
        { label: "C121",     v2025: 15,  m: [0,0,0,null,null,null,null,null,null,null,null,null], total: 0 },
        { label: "기타차종", v2025: 7,   m: [0,0,0,null,null,null,null,null,null,null,null,null], total: 0 },
        { label: "F/CLAIM",  v2025: 95,  m: [0,0,0,null,null,null,null,null,null,null,null,null], total: 0 },
      ],
      evalCost: { v2025: 637, m: [409,534,360,null,null,null,null,null,null,null,null,null], total: 1303 },
      prevCost: { v2025: 91,  m: [0,0,0,null,null,null,null,null,null,null,null,null], total: 0 },
      rate:     { v2025: 0.03, m: [0.01,0.01,0.01,null,null,null,null,null,null,null,null,null], total: 0.01 },
    },
    {
      label: "Seat\nQ-Cost",
      target:   { v2025: 555, m: [260,260,260,200,200,200,200,200,200,160,160,160], total: 2460 },
      actual:   { v2025: 292, m: [178,99,90,null,null,null,null,null,null,null,null,null], total: 367 },
      failCost: { v2025: 90,  m: [0,0,0,null,null,null,null,null,null,null,null,null], total: 0 },
      items: [
        { label: "9BUX",     v2025: 26, m: [0,0,0,null,null,null,null,null,null,null,null,null], total: 0 },
        { label: "기타차종", v2025: 0,  m: [0,0,0,null,null,null,null,null,null,null,null,null], total: 0 },
        { label: "F/CLAIM",  v2025: 64, m: [0,0,0,null,null,null,null,null,null,null,null,null], total: 0 },
      ],
      evalCost: { v2025: 202, m: [178,99,90,null,null,null,null,null,null,null,null,null], total: 367 },
      prevCost: { v2025: 0,   m: [0,0,0,null,null,null,null,null,null,null,null,null], total: 0 },
      rate:     { v2025: 0.01, m: [0.01,0.01,0.01,null,null,null,null,null,null,null,null,null], total: 0.01 },
    },
  ],
  eventTable: {
    rows: [],
  },
};
