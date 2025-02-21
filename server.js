import express from "express";
import cors from "cors";
import { faker } from "@faker-js/faker";

// Dummy data
let dashboards = [];
let charts = [];

const app = express();

// Allow all origins (you can restrict this to specific origins later)
app.use(cors());
app.use(express.json());

// API to get list of all dashboards
app.get("/api/v1.0/dashboards", (req, res) => {
  res.json({ dashboards });
});

// API to create a new dashboard
app.post("/api/v1.0/dashboards", (req, res) => {
  const { title, description } = req.body;
  const newDashboard = {
    dashboardId: faker.string.uuid(),
    title,
    description,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  };
  dashboards.push(newDashboard);
  res.json(newDashboard);
});

// API to update an existing dashboard
app.put("/api/v1.0/dashboards/:dashboardId", (req, res) => {
  const { dashboardId } = req.params;
  const { title, description } = req.body;

  const dashboard = dashboards.find((d) => d.dashboardId === dashboardId);
  if (!dashboard) {
    return res.status(404).json({ message: "Dashboard not found" });
  }

  dashboard.title = title;
  dashboard.description = description;
  dashboard.updatedAt = new Date().toISOString();

  res.json(dashboard);
});

// API to delete a dashboard
app.delete("/api/v1.0/dashboards/:dashboardId", (req, res) => {
  const { dashboardId } = req.params;

  const index = dashboards.findIndex((d) => d.dashboardId === dashboardId);
  if (index === -1) {
    return res.status(404).json({ message: "Dashboard not found" });
  }

  dashboards.splice(index, 1);
  res.json({ message: "Dashboard deleted successfully" });
});

// API to duplicate a dashboard (including charts)
app.post("/api/v1.0/dashboards/:dashboardId/duplicate", (req, res) => {
  const { dashboardId } = req.params;

  const dashboard = dashboards.find((d) => d.dashboardId === dashboardId);
  if (!dashboard) {
    return res.status(404).json({ message: "Dashboard not found" });
  }

  const clonedDashboard = {
    ...dashboard,
    dashboardId: faker.string.uuid(),
    title: `${dashboard.title}_copy`,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  };

  dashboards.push(clonedDashboard);

  const clonedCharts = charts
    .filter((chart) => chart.dashboardId === dashboardId)
    .map((chart) => ({
      ...chart,
      chartId: faker.string.uuid(),
      title: `${chart.title}_copy`,
      dashboardId: clonedDashboard.dashboardId,
    }));

  charts.push(...clonedCharts);

  res.json({ clonedDashboard, clonedCharts });
});

// Chart API

// 1. Get list of charts for a specific dashboard
app.get("/api/v1.0/dashboards/:dashboardId/charts", (req, res) => {
  const { dashboardId } = req.params;
  const dashboardCharts = charts.filter(
    (chart) => chart.dashboardId === dashboardId
  );
  res.json({ charts: dashboardCharts });
});

// 2. Get details of a specific chart
app.get("/api/v1.0/charts/:chartId", (req, res) => {
  const { chartId } = req.params;
  const chart = charts.find((c) => c.chartId === chartId);
  if (!chart) {
    return res.status(404).json({ message: "Chart not found" });
  }
  res.json(chart);
});

// 3. Create a new chart for a specific dashboard
app.post("/api/v1.0/dashboards/:dashboardId/charts", (req, res) => {
  const { dashboardId } = req.params;
  const { title, description, type } = req.body;

  const dashboard = dashboards.find((d) => d.dashboardId === dashboardId);
  if (!dashboard) {
    return res.status(404).json({ message: "Dashboard not found" });
  }

  const newChart = {
    chartId: faker.string.uuid(),
    dashboardId,
    title,
    description,
    type,
    data: {
      labels: Array.from({ length: 6 }, () => faker.date.month()),
      datasets: [
        {
          label: faker.commerce.productMaterial(),
          data: Array.from({ length: 6 }, () =>
            faker.number.int({ min: 10, max: 100 })
          ),
          backgroundColor: faker.color.rgb({ format: "css" }),
          borderColor: faker.color.rgb({ format: "css" }),
          borderWidth: 1,
        },
      ],
    },
  };

  charts.push(newChart);
  res.json(newChart);
});

// 4. Update a specific chart
app.put("/api/v1.0/charts/:chartId", (req, res) => {
  const { chartId } = req.params;
  const { title, description, type } = req.body;

  const chart = charts.find((c) => c.chartId === chartId);
  if (!chart) {
    return res.status(404).json({ message: "Chart not found" });
  }

  chart.title = title;
  chart.description = description;
  chart.type = type;
  res.json(chart);
});

// 5. Delete a specific chart
app.delete("/api/v1.0/charts/:chartId", (req, res) => {
  const { chartId } = req.params;
  const index = charts.findIndex((c) => c.chartId === chartId);
  if (index === -1) {
    return res.status(404).json({ message: "Chart not found" });
  }

  charts.splice(index, 1);
  res.json({ message: "Chart deleted successfully" });
});

// 6. Duplicate a specific chart
app.post(
  "/api/v1.0/dashboards/:dashboardId/charts/:chartId/duplicate",
  (req, res) => {
    const { chartId, dashboardId } = req.params;
    const chart = charts.find((c) => c.chartId === chartId);
    if (!chart) {
      return res.status(404).json({ message: "Chart not found" });
    }

    const clonedChart = {
      ...chart,
      chartId: faker.string.uuid(),
      title: `${chart.title}_copy`,
      dashboardId,
    };

    charts.push(clonedChart);
    res.json(clonedChart);
  }
);

// Start the server
const PORT = 3000;
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
