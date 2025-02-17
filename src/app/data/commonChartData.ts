export const CHART_DATA_UNIFIED = {
  datasets: [
    {
      name: "Dataset 1",
      data: [
        { label: "Jan", value: 50 },
        { label: "Feb", value: 75 },
        { label: "Mar", value: 100 },
        { label: "Apr", value: 125 },
        { label: "May", value: 150 },
      ],
      color: [
        "rgba(255, 99, 132, 0.5)",
        "rgba(255, 159, 64, 0.5)",
        "rgba(255, 205, 86, 0.5)",
        "rgba(75, 192, 192, 0.5)",
        "rgba(54, 162, 235, 0.5)",
      ],
    },
  ],
  options: {
    chartType: "pie",
    showLegend: true,
    legendPosition: "top",
    legendColor: "#ffffff",
    showTitle: true,
    titleText: "Sales Data",
    titleColor: "#00ff00",
    showTooltip: true,
    tooltipBgColor: "rgba(0,0,0,0.8)",
    tooltipMode: "index",
    layoutPadding: { top: 10, bottom: 20 },
    aspectRatio: 2,
    xAxisColor: "#ffffff",
    yAxisColor: "#ffffff",
    xGridDisplay: true,
    yGridColor: "rgba(255, 255, 255, 0.2)",
    ySuggestedMin: 0,
    ySuggestedMax: 200,
    interactionMode: "index",
    interactionIntersect: false,
    hoverMode: "nearest",
    animationDuration: 1000,
    animationEasing: "easeOutBounce",
  },
};

// {
//   name: "Dataset 2",
//   data: [
//     { label: "Jan", value: 30 },
//     { label: "Feb", value: 55 },
//     { label: "Mar", value: 80 },
//     { label: "Apr", value: 110 },
//     { label: "May", value: 130 },
//   ],
//   color: [
//     "rgba(153, 102, 255, 0.5)",
//     "rgba(201, 203, 207, 0.5)",
//     "rgba(75, 192, 192, 0.5)",
//     "rgba(255, 99, 132, 0.5)",
//     "rgba(255, 205, 86, 0.5)",
//   ], // ✅ 다른 데이터셋도 개별 색상 지정
// },
