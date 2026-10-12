// 경영회의 2026년 07월 보고서 - 전체 페이지 데이터
// 출처: D:\AI\경영회의\1.경영회의(2026년07월)_보고서.xlsx (엑셀 원본 직접 추출, openpyxl data_only=True)

const REPORT = {};

// 경영회의 2026년 07월 보고서 - 페이지 4~8 데이터
// 출처: D:\AI\경영회의\1.경영회의(2026년07월)_보고서.xlsx (openpyxl, data_only=True로 직접 추출)
// report-render.js의 renderPage4~renderPage8과 report-data.js(2026년08월)의 REPORT.page4~page8과
// 동일한 필드명/구조를 사용합니다. 세부 참고사항은 report-data-2026-07-p4to8.notes.txt 참조.

// ---------------- Page 4: 매출/부가가치/인원 현황 ----------------
REPORT.page4 = {
  months: ["1월","2월","3월","4월","5월","6월","7월","8월","9월","10월","11월","12월"],
  forecastIndex: 7,
  revenue: {
    label: "매출\n(백만원)",
    plan:    { yr: 102679, avg: 8557,  m: [10333,8103,10873,10654,10013,9872,10586,5699,9210,10568,10113,10400], cum: 70432, total: 116422 },
    revised: { yr: 122780, avg: 10232, m: [12546,10108,13094,13598,11339,11949,11228,5533,9284,9866,9397,9739],  cum: 83862, total: 127681 },
    actual:  { yr: 122546, avg: 10212, m: [12546,10108,13094,13598,11339,11949,11541,5945,null,null,null,null], cum: 84175, total: 84175 },
    pct:     { yr: 119, avg: 119, m: [121,125,120,128,113,121,103,107,null,null,null,null], cum: 100, total: 66 },
  },
  valueAdded: {
    label: "부가가치\n(백만원)",
    plan:    { yr: 35232, avg: 2936, m: [3601,2845,3822,3729,3502,3451,3740,1958,3236,3729,3527,3621], cum: 24691, total: 40762 },
    revised: { yr: 40076, avg: 3340, m: [4258,3493,4781,4712,3919,4091,3876,1878,3345,3474,3230,3358],  cum: 29131, total: 44416 },
    actual:  { yr: 40323, avg: 3360, m: [4258,3493,4781,4712,3919,4091,4083,2118,null,null,null,null],  cum: 29338, total: 29338 },
    pct:     { yr: 114, avg: 114, m: [118,123,125,126,112,119,105,113,null,null,null,null], cum: 101, total: 66 },
  },
  headcount: {
    label: "인원현황\n(명)",
    plan:    { yr: 373, avg: 373, m: [369,366,371,368,369,365,360,357,371,371,366,366], cum: 367, total: 367 },
    revised: { yr: 370, avg: 370, m: [361,360,360,360,358,357,357,357,343,343,343,343], cum: 359, total: 354 },
    actual:  { yr: 368, avg: 368, m: [361,360,360,360,358,357,361,362,null,null,null,null], cum: 360, total: 360 },
    pct:     { yr: 99, avg: 99, m: [98,98,97,98,97,98,101,101,null,null,null,null], cum: 100, total: 102 },
  },
  laborCost: {
    label: "인건비",
    plan:    { yr: 26429, avg: 2202, m: [2413,2358,2437,2288,2502,2195,2251,2033,2424,2480,2265,2258], cum: 16444, total: 27904 },
    revised: { yr: 27906, avg: 2325, m: [2586,2294,2759,2652,2604,2806,2388,2096,2396,2377,2187,2175],  cum: 18090, total: 29320 },
    actual:  { yr: 28528, avg: 2377, m: [2586,2294,2759,2652,2604,2806,2388,2084,null,null,null,null],  cum: 18090, total: 18090 },
    pct:     { yr: 108, avg: 108, m: [107,97,113,116,104,128,100,99,null,null,null,null], cum: 110, total: 65 },
  },
  laborIndicators: {
    label: "인건비 지표\n(실적)",
    perCapita:   { yr: 77.5, avg: 6.5, m: [7.2,6.4,7.7,7.4,7.3,7.9,6.6,5.8,null,null,null,null], cum: 50.3, total: 50.3, unit: "" },
    laborRate:   { yr: 23.3, avg: 23.3, m: [20.6,22.7,21.1,19.5,23.0,23.5,20.7,35.1,null,null,null,null], cum: 21.5, total: 21.5, unit: "%" },
    distribRate: { yr: 70.7, avg: 70.7, m: [60.7,65.7,57.7,56.3,66.4,68.6,58.5,98.4,null,null,null,null], cum: 61.7, total: 61.7, unit: "%" },
    overtime:    { yr: 39.9, avg: 39.9, m: [62.3,45.4,57.4,61.2,62.7,50.6,38.9,10,null,null,null,null], cum: 54.1, total: 54.1, unit: "" },
    overtimePrevYear: { yr: 39.9, avg: 39.9, m: [38.0,31.2,44.3,32.0,62.6,50.8,38.4,10.8,16.3,55.9,39.8,58.7], cum: 42.5, total: 39.9, unit: "" },
  },
  annualBar: { labels: ["전년매출", "사업계획", "수정계획", "년간예상"], values: [1225, 1164, 1277, 1284] },
};

// ---------------- Page 5: 매출 상세 증감 현황 ----------------
// 출처: D:\AI\경영회의\1.경영회의(2026년07월)_보고서.xlsx 시트 "매출분석"
// 열 순서: [7월 생산(수정계획,실적,증감,%)] [7월 매출(수정계획,실적,증감,%)] [8월 생산(수정계획,실행계획,증감,%)] [8월 매출(수정계획,실행계획,증감,%)] [전월대비 매출(증감,%)]
REPORT.page5 = {
  unitHeader: "수량\n단위",
  currentMonthLabel: "7월",
  nextMonthLabel: "8월",
  total: { label: "합 계", v: [76566,72926,-3640,-5, 11228,11541,313,3, 65591,38720,-26871,-41, 5533,5945,411,7, -5596,-48] },
  groups: [
    {
      label: "자동차",
      subtotal: { v: [76223,72583,-3640,-5, 10769,11009,240,2, 38991,38720,-271,-1, 5355,5945,589,11, -5065,-46] },
      items: [
        { customer: "GMK 부평", customerRowspan: 1, model: "9BUX/9BQB", unit: "대분", v: [21698,21216,-482,-2, 4332,4244,-88,-2, 4452,5469,1017,23, 967,1153,187,19, -3091,-73] },
        { customer: "GMK 창원", customerRowspan: 1, model: "9BQC", unit: "대분", v: [20703,22031,1328,6, 4320,4458,138,3, 14065,16535,2470,18, 2841,3368,528,19, -1090,-24] },
        { customer: "GM", customerRowspan: 1, model: "C121", unit: "대분", v: [3348,3564,216,6, 784,991,207,26, 2700,2808,108,4, 632,680,48,8, -311,-31] },
        { customer: "RKM", customerRowspan: 3, model: "LJL", unit: "대분", v: [1933,2250,317,16, 65,75,11,16, 1524,1310,-214,-14, 51,44,-7,-14, -31,-42] },
        { customer: null, model: "AURORA-1", unit: "대분", v: [2755,3136,381,14, 305,343,38,13, 1983,1404,-579,-29, 210,159,-51,-24, -184,-54] },
        { customer: null, model: "AURORA-2", unit: "대분", v: [1358,1546,188,14, 140,157,18,13, 260,134,-126,-48, 27,15,-12,-44, -142,-90] },
        { customer: "HMC", customerRowspan: 1, model: "US4", unit: "대분", v: [108,101,-7,-6, 307,287,-20,-6, 90,60,-30,-33, 256,170,-85,-33, -116,-41] },
        { customer: "KGM", customerRowspan: 1, model: "Y450", unit: "대분", v: [414,240,-174,-42, 29,18,-11,-39, 0,155,155,0, 0,10,10,0, -8,-43] },
        { customer: "EXPORT", customerRowspan: 2, model: "GSV-EM", unit: "대분", v: [10125,5220,-4905,-48, 322,198,-123,-38, 8775,10845,2070,24, 279,345,66,24, 146,74] },
        { customer: null, model: "SEAT", unit: "대분", v: [13781,13279,-502,-4, 167,93,-74,-44, 5142,0,-5142,-100, 94,0,-94,-100, -93,-100] },
        { customer: "A/S", customerRowspan: 1, model: null, unit: null, v: [null,null,null,null, 0,145,145,0, null,null,null,null, 0,0,0,0, -145,-100] },
      ],
    },
    {
      label: "SOLAR",
      subtotal: { v: [343,343,0,0, 459,531,73,16, 26600,0,-26600,-100, 178,0,-178,-100, -531,-100] },
      items: [
        { merged: true, label: "AUSTEM AMERICA\n(STAMPING)", unit: "EA", v: [0,0,0,0, 0,0,0,0, 26600,0,-26600,-100, 178,0,-178,-100, 0,0] },
        { merged: true, label: "NOBULL ENERGY\n(H-BEAM)", unit: "EA", v: [343,343,0,0, 459,531,73,16, 0,0,0,0, 0,0,0,0, -531,-100] },
      ],
    },
  ],
};

// ---------------- Page 6: 사업부문별 상세현황 ----------------
// v: [6월실적, 7월수정계획,7월실적,%,전월대비, 8월수정계획,8월실행계획,%,전월대비]
REPORT.page6 = {
  prevMonthLabel: "6월",
  currentMonthLabel: "7월",
  nextMonthLabel: "8월",
  vehicleGroupLabel: "차량생산",
  vehicleRows: [
    { name: "부평", v: [23325, 21698,21216,98,91, 4452,5469,123,26],
      note8: "* 2026년 임단협 교섭 잠정합의(안) 조합원 찬,반 투표(7/28)\n* 부평 : 전공장 노후 설비교체 및 라인개선공사(8/1~8/22)", note9: "", shift: "2shift" },
    { name: "창원", v: [24058, 20703,22031,106,92, 14065,16535,118,75], note8: "", note9: "", shift: "2shift" },
    { name: "KGM 모빌리티", v: [624, 414,240,58,38, 0,155,0,65], note8: "", note9: "* 3조립 SE10(렉스턴 후속) 라인공사(8/1~8/20)", shift: "2shift" },
    { name: "RKM", v: [2992, 6046,6932,115,232, 3767,2848,76,41], note8: "* 2026년 임단협 교섭 진행 중", note9: "", shift: "1shift" },
  ],
  salesGroupLabel: "매출",
  salesTotal: { v: [11949, 11228,11541,103,97, 5533,5945,107,52] },
  salesRows: [
    { name: "Wheel", v: [791, 770,798,104,101, 372,449,121,56], note8: "* 증가(GMK)", note9: "* 증가(GMK)" },
    { name: "Body", v: [18, 0,0,0,0, 0,0,0,0], note8: "", note9: "" },
    { name: "Chassis", v: [7552, 6767,7194,106,95, 3401,3881,114,54], note8: "* 증가(C121), 감소(UZ-AUTO)", note9: "* 증가(GMK), 감소(RKM)" },
    { name: "Module", v: [421, 398,391,98,93, 154,169,109,43], note8: "* 감소(GMK)", note9: "* 증가(GMK)" },
    { name: "Seat", v: [2997, 2835,2626,93,88, 1427,1446,101,55], note8: "* 감소(GMK, 직수출)", note9: "* 증가(GMK), 감소(US4, 직수출)" },
    { name: "Solar", v: [170, 459,531,116,313, 178,0,0,0], note8: "* 증가(H-Beam)", note9: "* 감소(사출물)" },
  ],
  headcountGroupLabel: "직접인원",
  headcountTotal: { v: [190, 196,193,98,null, 196,193,98,null] },
  headcountRows: [
    { name: "Wheel", v: [22, 22,22,100,null, 22,22,100,null] },
    { name: "Body", v: [19, 24,21,88,null, 24,21,88,null] },
    { name: "Chassis", v: [75, 74,75,101,null, 74,75,101,null] },
    { name: "Module", v: [30, 30,30,100,null, 30,30,100,null] },
    { name: "Seat", v: [44, 46,45,98,null, 46,45,98,null] },
  ],
};

// ---------------- Page 7: 환율 변동 Impact ----------------
// v: [년간(2025), 월평균(2025), 1월..12월, 누계]  (7월 보고서: 1~7월 실적 + 8월 계획, 9월부터 null)
REPORT.page7 = {
  months: ["1월","2월","3월","4월","5월","6월","7월","8월","9월","10월","11월","12월"],
  forecastIndex: 7,
  fxRate: {
    planYear2025: 1250, plan2026: 1300,
    actualYear2025: 1423,
    actualMonthly: [1457,1451,1492,1486,1490,1531,1493,1450,null,null,null,null],
  },
  revenue: {
    rows: [
      { name: "Wheel", v: [1,0, 0,0,0,0,0,0,0,0, null,null,null,null, 0] },
      { name: "Chassis", v: [763,64, 105,112,224,186,101,223,161,118, null,null,null,null, 1111], note: "GSV-EM, C121" },
      { name: "Seat", v: [276,23, 13,15,22,22,24,19,11,0, null,null,null,null, 126], note: "H62X, GMI31UX" },
      { name: "Solar", v: [1182,98, 99,45,19,68,36,25,73,0, null,null,null,null, 365] },
    ],
    total: { v: [2221,185, 217,172,265,276,161,268,244,118, null,null,null,null, 1602] },
  },
  valueAdded: {
    rows: [
      { name: "Wheel", v: [1,0, 0,0,0,0,0,0,0,0, null,null,null,null, 0] },
      { name: "Chassis", v: [667,56, 87,97,200,164,85,207,140,112, null,null,null,null, 981], note: "9BUX & AURORA Bush" },
      { name: "Seat", v: [276,23, 13,15,22,22,24,19,11,0, null,null,null,null, 126] },
      { name: "Solar", v: [776,65, 59,26,10,43,21,17,11,0, null,null,null,null, 187], note: "관세 & DDP 운반비" },
    ],
    total: { v: [1719,143, 160,138,232,230,130,243,162,112, null,null,null,null, 1294] },
  },
  duty: {
    rateNote: "관세율: 25% → 50% (2025년 중 인상), 2026년 1~8월 50% 유지 (Steel 50%, 사출 15%)",
    rows: [
      { name: "Solar", v: [2669,222, 271,143,56,151,92,40,0,0, null,null,null,null, 753] },
    ],
  },
};

// ---------------- Page 8: 전월 실적 및 당월 예상 손익 현황 ----------------
REPORT.page8 = {
  columns: ["06월 실적","07월 실행계획","07월 실적","실행계획대비","누적 실적(~07월)","08월 실행계획","전월실적 대비"],
  rows: [
    { label: "매출액", level: 0, bold: true, note: "",
      cells: [[11949,100.0],[12227,100.0],[11541,100.0],[-687,-5.6],[84175,100.0],[5945,100.0],[-5596,-48.5]] },
    { label: "자동차", level: 1,
      cells: [[11779,98.6],[11769,96.2],[11009,95.4],[-759,-6.5],[81122,96.4],[5945,100.0],[-5065,-46.0]] },
    { label: "solar", level: 1,
      cells: [[170,1.4],[459,3.8],[531,4.6],[73,15.8],[3053,3.6],[0,0.0],[-531,-100.0]] },
    { label: "부가가치", level: 0, bold: true,
      cells: [[4091,34.2],[4209,34.4],[4083,35.4],[-126,-3.0],[29338,34.9],[2118,35.6],[-1964,-48.1]] },
    { label: "자동차", level: 1,
      cells: [[4082,34.2],[4181,34.2],[4044,35.0],[-137,-3.3],[29263,34.8],[2118,35.6],[-1926,-47.6]] },
    { label: "solar", level: 1,
      cells: [[9,0.1],[28,0.2],[38,0.3],[11,-39.6],[74,0.1],[0,0.0],[-38,-100.0]] },
    { label: "매출원가", level: 0, bold: true,
      cells: [[11459,95.9],[11209,91.7],[10700,92.7],[-509,-4.5],[78698,93.5],[6549,110.2],[-4151,-38.8]] },
    { label: "재료비", level: 1,
      cells: [[7858,65.8],[8019,65.6],[7458,64.6],[-561,-7.0],[54837,65.1],[3826,64.4],[-3632,-48.7]] },
    { label: "노무비", level: 1,
      cells: [[2347,19.6],[2034,16.6],[1978,17.1],[-55,-2.7],[14857,17.7],[1676,28.2],[-303,-15.3]] },
    { label: "정규", level: 2,
      cells: [[1998,16.7],[1704,13.9],[1648,14.3],[-55,-3.2],[12551,14.9],[1482,24.9],[-167,-10.1]] },
    { label: "도급", level: 2,
      cells: [[350,2.9],[330,2.7],[330,2.9],[0,0.0],[2306,2.7],[194,3.3],[-136,-41.2]] },
    { label: "제조경비", level: 1,
      cells: [[1253,10.5],[1156,9.5],[1263,10.9],[107,9.2],[9003,10.7],[1047,17.6],[-216,-17.1]] },
    { label: "인건비성 경비", level: 2,
      cells: [[232,1.9],[230,1.9],[233,2.0],[3,1.2],[1767,2.1],[200,3.4],[-33,-14.0]] },
    { label: "수선/소모품비", level: 2,
      cells: [[310,2.6],[246,2.0],[290,2.5],[44,17.8],[1954,2.3],[244,4.1],[-47,-16.0]] },
    { label: "전력비", level: 2,
      cells: [[289,2.4],[260,2.1],[289,2.5],[29,11.2],[2007,2.4],[220,3.7],[-69,-23.9]] },
    { label: "감가상각", level: 2,
      cells: [[182,1.5],[182,1.5],[182,1.6],[0,0.0],[1274,1.5],[182,3.1],[0,0.0]] },
    { label: "포장비", level: 2,
      cells: [[71,0.6],[80,0.7],[97,0.8],[17,21.2],[556,0.7],[66,1.1],[-31,-32.0]] },
    { label: "연료비", level: 2,
      cells: [[60,0.5],[50,0.4],[50,0.4],[0,0.0],[587,0.7],[30,0.5],[-20,-40.0]] },
    { label: "기타", level: 2,
      cells: [[109,0.9],[108,0.9],[122,1.1],[14,13.2],[858,1.0],[105,1.8],[-17,-14.0]] },
    { label: "고철매각", level: 1,
      cells: [[284,2.4],[352,2.9],[265,2.3],[-87,-24.6],[2211,2.6],[143,2.4],[-122,-46.0]] },
    { label: "매출총이익", level: 0, bold: true,
      cells: [[775,6.5],[1370,11.2],[1106,9.6],[-264,-19.3],[7688,9.1],[-461,-7.8],[-1568,-141.7]] },
    { label: "판매관리비", level: 0, bold: true,
      cells: [[799,6.7],[800,6.5],[757,6.6],[-43,-5.4],[6024,7.2],[730,12.3],[-27,-3.6]] },
    { label: "인건비", level: 1,
      cells: [[459,3.8],[451,3.7],[410,3.6],[-41,-9.1],[3233,3.8],[408,6.9],[-2,-0.5]] },
    { label: "운반비", level: 1,
      cells: [[39,0.3],[39,0.3],[37,0.3],[-2,-5.1],[277,0.3],[22,0.4],[-15,-40.5]] },
    { label: "기타", level: 1,
      cells: [[301,2.5],[310,2.5],[310,2.7],[0,0.0],[2514,3.0],[300,5.0],[-10,-3.2]] },
    { label: "영업이익", level: 0, bold: true, emphasize: true,
      cells: [[-24,-0.2],[570,4.7],[349,3.0],[-221,38.8],[1664,2.0],[-1191,-20.0],[-1540,441.0]] },
  ],
};

// 경영회의 2026년 07월 보고서 - 페이지 9~13 데이터
// 출처: D:\AI\경영회의\1.경영회의(2026년07월)_보고서.xlsx
//   page9  <- 시트 '3.프로젝트(KOREA)'
//   page10 <- 시트 '3-1.투자비' (잔여투자현황 도넛차트만 '3-2.투자비_상세'!E26:L27 참조)
//   page11 <- 시트 '3-2.투자비_상세'
//   page12 <- 시트 '4-1.고객실적 및 사내공정불량율(26년)'
//   page13 <- 시트 '4-2.Q-COST 실적&주요이벤트 및 공지'
// (REPORT 전역 객체는 이미 선언되어 있다고 가정 - report-data.js 등에서 선언)

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
              invPlan: 322.9, invActual: 322.9, invRate: 100,
              remarks: "부품가 감가상각" },
          ],
        },
      ],
    },
    {
      plant: "Cheon-an", commodity: "EV", customer: "삼성SDI",
      mergeGroupCols: true,
      groupRecovery: { plan: 1353, actual: null, date: "2026-10" },
      groupInvest: { plan: 2214.4, actual: 1977.6, rate: 89 },
      groupRemarks: "총 투자비 : 3223.4\n1. 재료비 : 949.2\n2. 경비 : 59.8\n3. 투자비 : 2,214.4",
      projects: [
        {
          project: "E092\nKF1\n(Proto)",
          rows: [
            { pname: "Housing UPR",
              tko: "26-3-16", d1: { v: "26-7-10", state: "green" }, line: "26-5-22", pvStart: "26-6-24",
              pvDone: { v: "26-9-13", note: "품질육성", state: "black" }, ppap: "28-3-10", run: "28-9-8", sorp: "29-4-2" },
            { pname: "Housing LWR",
              tko: "26-3-16", d1: { v: "26-7-10", state: "green" }, line: "26-5-22", pvStart: "26-6-24",
              pvDone: { v: "26-9-13", note: "품질육성", state: "black" }, ppap: "28-3-10", run: "28-9-8", sorp: "29-4-2" },
            { pname: "ENDPLATE FRT/RR",
              tko: "26-3-16", d1: { v: "26-7-10", state: "green" }, line: "26-5-22", pvStart: "26-6-24",
              pvDone: { v: "26-8-17", note: "품질육성", state: "black" }, ppap: "28-3-10", run: "28-9-8", sorp: "29-4-2" },
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
              pvDone: "N/A", ppap: { v: "26-7-31", note: "생산 안정화", state: "black" }, run: "N/A", sorp: "26-11-2",
              recPlan: 418, recActual: null, recDate: "2026-07",
              invPlan: 418, invActual: 365, invRate: 87,
              remarks: "" },
            { pname: "Articulating Coupler",
              tko: "25-12-29", d1: "26-7-20", line: { v: "26-6-19", state: "green" }, pvStart: "N/A",
              pvDone: "N/A", ppap: { v: "26-7-31", note: "생산 안정화", state: "black" }, run: "N/A", sorp: "26-11-2",
              recPlan: 1642.7, recActual: null, recDate: "2026-08",
              invPlan: 1642.7, invActual: 1212, invRate: 74,
              remarks: "" },
            { pname: "Mechanical Stop",
              tko: { v: "26-5-6", state: "green" }, d1: { v: "26-9-11", note: "Delivery", state: "black" }, line: "26-9-30", pvStart: "N/A",
              pvDone: "N/A", ppap: "N/A", run: "N/A", sorp: "26-12-1",
              recPlan: 244.5, recActual: null, recDate: null,
              invPlan: 244.5, invActual: 67, invRate: 27,
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
    monthlyActual: [2802, 121, 397, 2183, 203, 645, 88, null, null, null, null, null],
    cumPlan:       [3874, 4396, 4396, 4736, 4781, 4791, 4791, 4851, 4851, 4851, 4851, 4861],
    cumExecuted:   [3885, 4407, 4763, 7388, 7500, 8136, 8148, 8258, 8258, 8258, 8258, 8268],
    cumActual:     [2802, 2923, 3319, 5502, 5705, 6350, 6438, null, null, null, null, null],
  },
  remainingByCategory: {
    labels: ["Wheel", "북미", "EV", "Chassis", "Seat", "공통", "Module"],
    values: [355, 516, 237, 297, 227, 50, 0],
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
        planDelta: 3457, execSaving: -148, cancel: 50, remaining: 1682,
        rows: [
          { sub: "사업계획", y2025: 5071, months: [3874, 522, null, 340, 45, 10, null, 60, null, null, null, 10], total: 4861,
            recovery: { y2025: 15502, y2026: 4875, y2027: 23, total: 20399 } },
          { sub: "실행계획", y2025: 6031, months: [3885, 522, 355, 2625, 113, 636, 12, 110, null, null, null, 10], total: 8268,
            recovery: { y2025: 15966, y2026: 6311, y2027: 23, total: 22300 } },
          { sub: "실적", y2025: 5710, months: [2802, 121, 397, 2183, 203, 645, 88, null, null, null, null, null], total: 6438,
            recovery: { y2025: 15966, y2026: 2789, y2027: null, total: 18755 } },
          { sub: "%", isPct: true, y2025: 95, months: [72, 23, 112, 83, 180, 101, 755, null, null, null, null, null], total: 78,
            recovery: { y2025: 100, y2026: 44, y2027: null, total: 84 } },
        ],
      },
      {
        label: "국내", labelSpan: 3, valsSpan: 3,
        planDelta: 3457, execSaving: -3, cancel: 50, remaining: 1166,
        rows: [
          { sub: "사업계획", y2025: 5071, months: [1569, 522, null, 340, 45, 10, null, 60, null, null, null, 10], total: 2556,
            recovery: { y2025: 15502, y2026: 1864, y2027: 23, total: 17388 } },
          { sub: "실행계획", y2025: 5323, months: [1580, 522, 355, 2625, 113, 636, 12, 110, null, null, null, 10], total: 5963,
            recovery: { y2025: 15966, y2026: 3300, y2027: 23, total: 19289 } },
          { sub: "실적", y2025: 5011, months: [1341, 121, 355, 2183, 128, 645, 21, null, null, null, null, null], total: 4794,
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
    "1. 2026년 실행계획 투자비: 8,268백만원(사업계획 4,861백만원 +  추가계획: 3,457백만원 - 투자취소 50백만원)",
    "2. (06~07월) 실적: 733백만원 (LW1 STEEL WHEEL DISC 3.5TON 설계변경 15백만원, LW1 STEEL WHEEL DISC 3종 고객 납품 제품제작 7백만원, HKMC AX EV STYELD STEEL WHEEL 양산 개발 322.9백만원, 3500톤 450KW 메인모터 소손 수리 11.6백만원, KF1 B-SAMPLE 개발 투자비 27.9백만원, KF1 HOUSING & PLATE END CMM JIG 제작 55백만원, 통합 정보 시스템 구축 200백만원, 3D 설계도면 VIEWER 소프트웨어 18백만원, 노후 업무용 노트북(4EA) 8.3백만원, 북미 NEVADOS - MECHANICAL STOP 67백만원)",
    "3. 고객사 회수 계획: 6,311백만원 ( 우즈벡 GSV EM RETOOL'G 잔금 10% 241.3백만원, UZAUTO GEM BSUV FRT CRADLE RETOOLING 중도금/잔금 50% 683백만원, C1xx Top cover B sample Tooling 38백만원, 9BQX FLANGE-EXH PIPE ASM 중도금2차 23백만원, 9BU/Qx TRACK ASM 2025 RETOOLING 금형비 83백만원, US4 설변 및 안전기준 강화 금형비 880백만원, 북미 오스템아메리카 선투자 회수 3,011백만원, KF1 B-Sample Tooling 1,110백만원(Housing UPR & UPR 1,072백만원, End Plate FRT & RR 209백만원, CMM JIG PO 72백만원))",
    "4. 고객사 회수 실적: 2,789백만원 국내 880백만원 (MANO US4 설계변경 & 안전기준 강화 금형비+ED&D 100% 회수(880백만원)) 해외(북미 선투자) 1,909백만원 회수, 북미 태양광 조립라인 및 NEVADOS BEARING 투자 일부 회수",
  ],
};

// ---------------- Page 11: 투자비 상세 현황 ----------------
REPORT.page11 = {
  groups: [
    { category: "Wheel", item: "LW1", plan: 794, extra: 35, cancel: 50, total: 779, actual: 438, rate: 56, saving: 1, unexecuted: 340,
      remarks: "LW1 STEEL WHEEL 16인치 설계 변경 및 이원화 개발(180/180), LW1 STEEL WHEEL 14X4.5J 개발(224.1/223), LW1 STEEL WHEEL 16인치 설계 변경(13/13), TOP-COATING SPRAY BOOTH 개선(340), DISC 3.5TON 설계변경(15/15), DISC 3종 고객 납품 제품제작(7/7) / 투자취소: RIM LINE 2차 설비 개선(50)" },
    { category: "Wheel", item: "AX EV STYELD WHEEL", plan: null, extra: 323, cancel: null, total: 323, actual: 323, rate: 100, saving: null, unexecuted: null,
      remarks: "HKMC AX EV STYELD STEEL WHEEL DISC (15X5.5J) 양산개발(235/235), RIM (15X5.5J) 양산개발(75/75), 검사구 (15X5.5J) 양산개발(8/8), ASSY (15X5.5J) 양산개발(5/5)" },
    { category: "Wheel", item: "기타", plan: 15, extra: 273, cancel: null, total: 288, actual: 273, rate: 95, saving: null, unexecuted: 15,
      remarks: "1공장 콤프레샤 연동시스템 설치 및 응축수 드레인 트랩 설치(15) / 추가: 3500T PRESS 동력전달계통(DRIVE GEAR PARTS) 수리(61/61), / 3500TON PRESS의 정상상태 복원을 위한 DRIVE GEAR 신착/교체(200/200), / 3500톤 450KW 메인모터 소손 수리(11.6/11.6)" },
    { category: "EV", item: "KF1 B-sample", plan: null, extra: 2214, cancel: null, total: 2214, actual: 1978, rate: 89, saving: null, unexecuted: 237,
      remarks: "KF1 B-SAMPLE 개발 투자비(전체 비용(원재료, 경비 포함) 3,168백만원중 투자비 금액 계획2,159/실적1,993 / KF1 HOUSING & PLATE END CMM JIG 제작(55/55)" },
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
    { category: "공통", item: "총무비품", plan: null, extra: 184, cancel: null, total: 184, actual: 184, rate: 100, saving: null, unexecuted: null,
      remarks: "법인 업무용 차량 매입(183.9/183.9)" },
    { category: "공통", item: "전산 H/W, S/W", plan: null, extra: 332, cancel: null, total: 332, actual: 282, rate: 85, saving: null, unexecuted: 50,
      remarks: "KF1 추적관리 시스템 도입(50/50), 사무용노트북(14.4/14.4), 3D 설계도면 VIEWER 소프트웨어 구매(18/18), / 통합 정보 시스템 구축(250/200)" },
    { category: "해외선투자", item: "북미 Nevados", plan: null, extra: 2305, cancel: null, total: 2305, actual: 1644, rate: 78, saving: 145, unexecuted: 516,
      remarks: "NEVADOS, BEARING ASM 북미 양산금형 개발(510/418), RETENTION 북미 양산금형 개발(145/145) / MACHANICAL STOP 북미 양산금형 개발(80),NEVADOS - BEARING CRADLE(1,037/725), / 북미오스템 LEVELER (400TON) 신규 투자(273/220), NEVADOS - MECHANICAL STOP(244.5/67), / BEARING CRADLE 개발 관련 C/F 제작(95/69)" },
  ],
  total: { plan: 4861, extra: 3457, cancel: 50, total: 8268, actual: 6438, rate: 80, saving: 148, unexecuted: 1682 },
};

// ---------------- Page 12: 품질지표 - 고객실적 / PPM ----------------
REPORT.page12 = {
  customerResult: {
    months: ["1월","2월","3월","4월","5월","6월","7월","8월","9월","10월","11월","12월"],
    spps: {
      target:  [0,0,0,0,0,0,0,0,0,0,0,0],
      wheel:   [0,0,0,0,0,0,0,null,null,null,null,null],
      chassis: [0,0,0,0,0,0,0,null,null,null,null,null],
      seat:    [0,0,0,0,0,0,0,null,null,null,null,null],
      incheon: [0,0,0,0,0,0,0,null,null,null,null,null],
    },
    lineStop: {
      target:  [0,0,0,0,0,0,0,0,0,0,0,0],
      wheel:   [0,0,0,0,0,0,0,null,null,null,null,null],
      chassis: [0,0,0,0,0,0,0,null,null,null,null,null],
      seat:    [0,0,0,0,0,0,0,null,null,null,null,null],
      incheon: [0,0,0,0,0,0,0,null,null,null,null,null],
    },
  },
  issue: "",
  ppm: {
    wheel:   { target: [175,120,120,120,100,100,100,100,100,100,80,80,80], actual: [140,117,47,26,72,83,27,6,null,null,null,null,null], cumTarget: 100, cumActual: 54 },
    chassis: { target: [148,40,40,40,35,35,35,35,35,35,30,30,30], actual: [49,38,28,31,28,19,17,11,null,null,null,null,null], cumTarget: 35, cumActual: 25 },
    seat:    { target: [12,1,1,1,1,1,1,1,1,1,1,1,1], actual: [2,0,0,0,0,0,0,0,null,null,null,null,null], cumTarget: 1, cumActual: 0 },
    module:  { target: [0,0,0,0,0,0,0,0,0,0,0,0,0], actual: [0,0,0,0,0,0,0,0,null,null,null,null,null], cumTarget: 0, cumActual: 0 },
  },
};

// ---------------- Page 13: 품질지표 - Q-COST ----------------
REPORT.page13 = {
  months: ["1월","2월","3월","4월","5월","6월","7월","8월","9월","10월","11월","12월"],
  groups: [
    {
      label: "Chassis\n&\nWheel\nQ-Cost",
      target:   { v2025: 2640, m: [1330,1330,1330,1280,1280,1280,1280,1280,1280,1180,1180,1180], total: 15210 },
      actual:   { v2025: 1798, m: [1260,759,947,1090,984,743,705,0,0,0,0,0], total: 6487 },
      failCost: { v2025: 1070, m: [851,225,343,650,575,476,178,null,null,null,null,null], total: 3297 },
      items: [
        { label: "9BUX",     v2025: 863, m: [851,186,195,488,509,437,178,0,0,0,0,0], total: 2844 },
        { label: "AURORA",   v2025: 75,  m: [0,39,57,0,66,31,0,null,null,null,null,null], total: 192 },
        { label: "LJL",      v2025: 15,  m: [0,0,0,0,0,0,0,null,null,null,null,null], total: 0 },
        { label: "C121",     v2025: 15,  m: [0,0,91,162,0,8,0,null,null,null,null,null], total: 261 },
        { label: "기타차종", v2025: 7,   m: [0,0,0,0,0,0,0,null,null,null,null,null], total: 0 },
        { label: "F/CLAIM",  v2025: 95,  m: [0,0,0,0,0,0,0,null,null,null,null,null], total: 0 },
      ],
      evalCost: { v2025: 637, m: [409,534,604,440,409,267,527,null,null,null,null,null], total: 3190 },
      prevCost: { v2025: 91,  m: [0,0,0,0,null,null,null,null,null,null,null,null], total: 0 },
      rate:     { v2025: 0.03, m: [0.01,0.01,0.01,0.02,0.01,0.01,0.01,null,null,null,null,null], total: 0.01 },
    },
    {
      label: "Seat\nQ-Cost",
      target:   { v2025: 555, m: [260,260,260,200,200,200,200,200,200,160,160,160], total: 2460 },
      actual:   { v2025: 292, m: [178,99,161,180,162,157,182,0,0,0,0,0], total: 1119 },
      failCost: { v2025: 90,  m: [0,0,0,0,0,0,0,null,null,null,null,null], total: 0 },
      items: [
        { label: "9BUX",     v2025: 26, m: [0,72,83,0,0,0,0,0,0,0,0,0], total: 155 },
        { label: "기타차종", v2025: 0,  m: [0,0,0,0,0,0,0,null,null,null,null,null], total: 0 },
        { label: "F/CLAIM",  v2025: 64, m: [0,28,0,0,0,0,0,null,null,null,null,null], total: 28 },
      ],
      evalCost: { v2025: 202, m: [178,99,161,180,162,157,182,null,null,null,null,null], total: 1119 },
      prevCost: { v2025: 0,   m: [0,0,0,0,0,0,0,null,null,null,null,null], total: 0 },
      rate:     { v2025: 0.01, m: [0.01,0.01,0.01,0.01,0.01,0.01,0.01,null,null,null,null,null], total: 0.01 },
    },
  ],
  eventTable: {
    rows: [],
  },
};
