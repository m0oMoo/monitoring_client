import express, { Request, Response } from "express";
import { faker } from "@faker-js/faker";

const app = express();
app.use(express.json());
const PORT = 3000;

export interface Dashboard {
  dashboardId: string;
  title: string;
  description: string;
  createdAt: string;
  updatedAt: string;
}

export interface Chart {
  chartId: string;
  title: string;
  type: string;
  description: string;
  dashboardId: string;
}

export const dashboards: Dashboard[] = [];
export const charts: Chart[] = [];

// Utility function to create fake dashboard
const createFakeDashboard = () => {
  const dashboardId = faker.string.uuid();
  const dashboard = {
    dashboardId,
    title: faker.commerce.productName(),
    description: faker.lorem.sentence(),
    createdAt: faker.date.past().toISOString(),
    updatedAt: faker.date.recent().toISOString(),
  };
  dashboards.push(dashboard);
  return dashboard;
};

// Utility function to create fake chart
const createFakeChart = (dashboardId: string) => {
  const chart = {
    chartId: faker.string.uuid(),
    dashboardId,
    title: faker.commerce.department(),
    description: faker.commerce.department(),
    type: faker.helpers.arrayElement(["bar", "line", "pie", "doughnut"]),
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
  charts.push(chart);
  return chart;
};

// Create initial mock dashboards and charts
for (let i = 0; i < 3; i++) {
  const dashboard = createFakeDashboard();
  for (let j = 0; j < 3; j++) {
    createFakeChart(dashboard.dashboardId);
  }
}

/**
 * 1. Dashboard List 조회 API
 */
app.get("/api/v1.0/dashboards", (req: Request, res: Response) => {
  res.json({ dashboards });
});

/**
 * 2. Dashboard 생성 API
 */
app.post("/api/v1.0/dashboards", (req: Request, res: Response) => {
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

/**
 * 3. Dashboard 수정 API
 */
app.put(
  "/api/v1.0/dashboards/:dashboardId",
  (req: Request, res: Response): void => {
    const { dashboardId } = req.params;
    const { title, description } = req.body;
    const dashboard = dashboards.find((d) => d.dashboardId === dashboardId);
    if (!dashboard) {
      res.status(404).json({ message: "Dashboard not found" });
      return;
    }

    dashboard.title = title;
    dashboard.description = description;
    dashboard.updatedAt = new Date().toISOString();
    res.json(dashboard);
  }
);

/**
 * 4. Dashboard 삭제 API
 */
app.delete(
  "/api/v1.0/dashboards/:dashboardId",
  (req: Request, res: Response): void => {
    const { dashboardId } = req.params;
    const index = dashboards.findIndex((d) => d.dashboardId === dashboardId);
    if (index === -1) {
      res.status(404).json({ message: "Dashboard not found" });
      return;
    }

    dashboards.splice(index, 1);
    res.json({ message: "Dashboard deleted successfully" });
  }
);

/**
 * 5. Dashboard 복제 API (차트 포함)
 */
app.post(
  "/api/v1.0/dashboards/:dashboardId/duplicate",
  (req: Request, res: Response): void => {
    const { dashboardId } = req.params;

    const dashboard = dashboards.find((d) => d.dashboardId === dashboardId);
    if (!dashboard) {
      res.status(404).json({ message: "Dashboard not found" });
      return;
    }

    const clonedDashboard: Dashboard = {
      ...dashboard,
      dashboardId: faker.string.uuid(),
      title: `${dashboard.title}_copy`,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };

    dashboards.push(clonedDashboard);

    const clonedCharts: Chart[] = charts
      .filter((chart) => chart.dashboardId === dashboardId)
      .map((chart) => ({
        ...chart,
        chartId: faker.string.uuid(),
        title: `${chart.title}_copy`,
        dashboardId: clonedDashboard.dashboardId,
      }));

    charts.push(...clonedCharts);
    res.json({ clonedDashboard, clonedCharts });
    return;
  }
);

/**
 * 6. Dashboard의 차트 목록 조회 API
 */
app.get(
  "/api/v1.0/dashboards/:dashboardId/charts",
  (req: Request, res: Response) => {
    const { dashboardId } = req.params;
    const dashboardCharts = charts.filter(
      (chart) => chart.dashboardId === dashboardId
    );
    res.json({ charts: dashboardCharts });
  }
);

/**
 * 서버 실행
 */
app.listen(PORT, () => {
  console.log(`Mock API Server is running on http://localhost:${PORT}`);
});

/**
 * 7. Chart 상세 조회 API
 */
app.get("/api/v1.0/charts/:chartId", (req: Request, res: Response): void => {
  const { chartId } = req.params;
  const chart = charts.find((c) => c.chartId === chartId);

  if (!chart) {
    res.status(404).json({ message: "Chart not found" });
    return;
  }

  res.json(chart);
});

/**
 * 8. Chart 생성 API
 */
app.post(
  "/api/v1.0/dashboards/:dashboardId/charts",
  (req: Request, res: Response): void => {
    const { dashboardId } = req.params;
    const { title, description, type } = req.body;

    const dashboard = dashboards.find((d) => d.dashboardId === dashboardId);
    if (!dashboard) {
      res.status(404).json({ message: "Dashboard not found" });
      return;
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
  }
);

/**
 * 9. Chart 수정 API
 */
app.put("/api/v1.0/charts/:chartId", (req: Request, res: Response): void => {
  const { chartId } = req.params;
  const { title, description, type } = req.body;

  const chart = charts.find((c) => c.chartId === chartId);
  if (!chart) {
    res.status(404).json({ message: "Chart not found" });
    return;
  }

  chart.title = title;
  chart.description = description;
  chart.type = type;

  res.json(chart);
});

/**
 * 10. Chart 삭제 API
 */
app.delete("/api/v1.0/charts/:chartId", (req: Request, res: Response): void => {
  const { chartId } = req.params;
  const index = charts.findIndex((c) => c.chartId === chartId);
  if (index === -1) {
    res.status(404).json({ message: "Chart not found" });
    return;
  }

  charts.splice(index, 1);
  res.json({ message: "Chart deleted successfully" });
});

/**
 * 11. Chart 복제 API
 */
app.post(
  "/api/v1.0/dashboards/:dashboardId/charts/:chartId/duplicate",
  (req: Request, res: Response): void => {
    const { chartId, dashboardId } = req.params;
    const chart = charts.find((c) => c.chartId === chartId);
    if (!chart) {
      res.status(404).json({ message: "Chart not found" });
      return;
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
