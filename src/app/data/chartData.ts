export const CHART_DATA: { [key in "bar" | "line" | "pie" | "doughnut"]: any } =
  {
    bar: {
      labels: ["Jan", "Feb", "Mar", "Apr", "May", "Jun"],
      datasets: [
        {
          label: "Bar Chart",
          data: [65, 59, 80, 81, 56, 75],
          backgroundColor: [
            "rgba(255, 99, 132, 0.6)",
            "rgba(54, 162, 235, 0.6)",
            "rgba(255, 206, 86, 0.6)",
            "rgba(75, 192, 192, 0.6)",
            "rgba(153, 102, 255, 0.6)",
            "rgba(255, 159, 64, 0.6)",
          ],
          borderColor: "rgba(255, 255, 255, 0.2)",
          borderWidth: 1,
        },
      ],
    },
    line: {
      labels: ["Jan", "Feb", "Mar", "Apr", "May", "Jun"],
      datasets: [
        {
          label: "Line Chart",
          data: [45, 30, 60, 80, 55, 95],
          borderColor: "rgba(255, 159, 64, 1)",
          backgroundColor: "rgba(255, 159, 64, 0.2)",
          borderWidth: 2,
          fill: true,
        },
      ],
    },
    pie: {
      labels: ["Red", "Blue", "Yellow", "Green", "Purple", "Orange"],
      datasets: [
        {
          data: [200, 150, 100, 250, 180, 120],
          backgroundColor: [
            "rgba(255, 99, 132, 0.6)",
            "rgba(54, 162, 235, 0.6)",
            "rgba(255, 206, 86, 0.6)",
            "rgba(75, 192, 192, 0.6)",
            "rgba(153, 102, 255, 0.6)",
            "rgba(255, 159, 64, 0.6)",
          ],
          borderColor: "rgba(255, 255, 255, 0.2)",
        },
      ],
    },
    doughnut: {
      labels: ["Apple", "Samsung", "Huawei", "Xiaomi", "Oppo"],
      datasets: [
        {
          data: [40, 35, 25, 30, 20],
          backgroundColor: [
            "rgba(255, 99, 132, 0.6)",
            "rgba(54, 162, 235, 0.6)",
            "rgba(255, 206, 86, 0.6)",
            "rgba(75, 192, 192, 0.6)",
            "rgba(153, 102, 255, 0.6)",
          ],
          borderColor: "rgba(255, 255, 255, 0.2)",
        },
      ],
    },
  };

export const CHART_DATA_7: Record<
  string,
  {
    type: "bar" | "line" | "pie" | "doughnut";
    labels: string[];
    datasets: any[];
  }
> = {
  chart1: {
    type: "bar",
    labels: ["Jan", "Feb", "Mar", "Apr", "May"],
    datasets: [
      {
        label: "Sales",
        data: [50, 75, 100, 125, 150],
        backgroundColor: [
          "rgba(255, 99, 132, 0.5)",
          "rgba(54, 162, 235, 0.5)",
          "rgba(255, 206, 86, 0.5)",
          "rgba(75, 192, 192, 0.5)",
          "rgba(153, 102, 255, 0.5)",
        ],
        borderColor: "rgba(255, 255, 255, 0.2)",
      },
    ],
  },
  chart2: {
    type: "line",
    labels: ["Jan", "Feb", "Mar", "Apr", "May"],
    datasets: [
      {
        label: "Revenue",
        data: [100, 90, 80, 70, 60],
        borderColor: "rgba(255, 165, 0, 1)",
        backgroundColor: "rgba(255, 165, 0, 0.3)",
        borderWidth: 2,
        fill: true,
      },
    ],
  },
  chart3: {
    type: "pie",
    labels: ["Red", "Blue", "Yellow"],
    datasets: [
      {
        data: [200, 150, 100],
        backgroundColor: [
          "rgba(255, 255, 255, 0.3)",
          "rgba(255, 255, 255, 0.1)",
          "rgba(255, 255, 255, 0.5)",
        ],
        borderColor: "rgba(255, 255, 255, 0.2)",
      },
    ],
  },
  chart4: {
    type: "doughnut",
    labels: ["Apple", "Samsung", "Huawei"],
    datasets: [
      {
        data: [40, 35, 25],
        backgroundColor: [
          "rgba(255, 99, 132, 0.6)",
          "rgba(54, 162, 235, 0.6)",
          "rgba(255, 206, 86, 0.6)",
          "rgba(75, 192, 192, 0.6)",
          "rgba(153, 102, 255, 0.6)",
        ],
        borderColor: "rgba(255, 255, 255, 0.2)",
      },
    ],
  },
  chart5: {
    type: "bar",
    labels: ["A", "B", "C", "D", "E"],
    datasets: [
      {
        label: "Growth",
        data: [30, 50, 70, 90, 110],
        backgroundColor: [
          "rgba(233, 150, 122, 0.6)",
          "rgba(100, 149, 237, 0.6)",
          "rgba(186, 85, 211, 0.6)",
          "rgba(240, 128, 128, 0.6)",
          "rgba(32, 178, 170, 0.6)",
          "rgba(205, 133, 63, 0.6)",
          "rgba(176, 224, 230, 0.6)",
        ],
        borderColor: "rgba(255, 255, 255, 0.2)",
      },
    ],
  },
  chart6: {
    type: "line",
    labels: ["Mon", "Tue", "Wed", "Thu", "Fri"],
    datasets: [
      {
        label: "Visitors",
        data: [500, 600, 700, 800, 900],
        borderColor: "rgba(220, 20, 60, 1)",
        backgroundColor: "rgba(220, 20, 60, 0.3)",
        borderWidth: 2,
        fill: true,
      },
      {
        label: "Active Users",
        data: [650, 350, 250, 700, 850],
        borderColor: "rgba(54, 162, 235, 1)",
        backgroundColor: "rgba(54, 162, 235, 0.3)",
        borderWidth: 2,
        fill: true,
      },
    ],
  },
  chart7: {
    type: "pie",
    labels: ["One", "Two", "Three"],
    datasets: [
      {
        data: [120, 180, 240],
        backgroundColor: [
          "rgba(75, 192, 192, 0.6)",
          "rgba(153, 102, 255, 0.6)",
          "rgba(255, 159, 64, 0.6)",
        ],
        borderColor: "rgba(255, 255, 255, 0.2)",
      },
    ],
  },
};
