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
