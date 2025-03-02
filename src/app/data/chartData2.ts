const mockChartData: Partial<Plotly.PlotData>[] = [
  {
    type: "bar", // 막대 그래프 (Bar Chart)
    x: ["Jan", "Feb", "Mar", "Apr", "May", "Jun"], // X축 데이터 (월)
    y: [65, 59, 80, 81, 56, 75], // Y축 데이터 (값)
    name: "Bar Chart", // 그래프 제목
    marker: {
      // 막대 색상 설정
      color: [
        "rgba(255, 99, 132, 0.6)", // 빨강
        "rgba(54, 162, 235, 0.6)", // 파랑
        "rgba(255, 206, 86, 0.6)", // 노랑
        "rgba(75, 192, 192, 0.6)", // 청록
        "rgba(153, 102, 255, 0.6)", // 보라
        "rgba(255, 159, 64, 0.6)", // 주황
      ],
    },
  },
  {
    type: "scatter",
    mode: "lines+markers",
    x: ["Jan", "Feb", "Mar", "Apr", "May", "Jun"],
    y: [45, 30, 60, 80, 55, 95],
    name: "Line Chart",
    line: { color: "rgba(255, 159, 64, 1)", width: 2 },
  },
  {
    type: "pie",
    labels: ["Red", "Blue", "Yellow", "Green", "Purple", "Orange"],
    values: [200, 150, 100, 250, 180, 120],
    name: "Pie Chart",
    marker: {
      colors: [
        "rgba(255, 99, 132, 0.6)",
        "rgba(54, 162, 235, 0.6)",
        "rgba(255, 206, 86, 0.6)",
        "rgba(75, 192, 192, 0.6)",
        "rgba(153, 102, 255, 0.6)",
        "rgba(255, 159, 64, 0.6)",
      ],
    },
  },
  {
    type: "pie",
    labels: ["Apple", "Samsung", "Huawei", "Xiaomi", "Oppo"],
    values: [40, 35, 25, 30, 20],
    name: "Doughnut Chart",
    hole: 0.4, // 도넛 차트 설정 (0.4 = 원형의 40%를 비움)
    marker: {
      colors: [
        "rgba(255, 99, 132, 0.6)",
        "rgba(54, 162, 235, 0.6)",
        "rgba(255, 206, 86, 0.6)",
        "rgba(75, 192, 192, 0.6)",
        "rgba(153, 102, 255, 0.6)",
      ],
    },
  },
];

export const CHART_DATA_01 = [
  { label: "Visitors", data: [500, 600, 700, 800, 900] },
  { label: "Active Users", data: [650, 350, 250, 700, 850] },
];

export const CHART_DATA_02 = [
  { label: "Sales", data: [400, 500, 600, 700, 800] },
  { label: "Customers", data: [550, 450, 400, 600, 750] },
]
export const CHART_DATA_03 = [
  { label: "Orders", data: [100, 200, 300, 400, 500] },
  { label: "Revenue", data: [200, 350, 400, 450, 600] },
]
export const CHART_DATA_04 = [
  { label: "Sessions", data: [50, 60, 70, 80, 90] },
  { label: "New Users", data: [20, 13, 24, 50, 60] },
  { label: "Old Users", data: [8, 3, 11, 5, 6] },
]
export const CHART_DATA_05 = [
  { label: "Engagement", data: [20, 11, 14, 35, 40] },
  // { label: "Bounce Rate", data: [10, 15, 20, 25, 30] },
]
export const CHART_DATA_06 = [
  { label: "Visitors", data: [500, 600, 700, 800, 900] },
  { label: "Active Users", data: [650, 350, 250, 700, 850] },
]