import express, { Request, Response } from "express";
import { faker } from "@faker-js/faker";
import { dashboards, charts } from "../faker";

const app = express();
app.use(express.json());
const PORT = 3000;

/**
 * @swagger
 * tags:
 *   - name: Dashboards
 *     description: API for managing dashboards
 */

/**
 * @swagger
 * /api/v1.0/dashboards:
 *   get:
 *     summary: Get list of all dashboards
 *     tags: [Dashboards]
 *     responses:
 *       200:
 *         description: List of dashboards
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 dashboards:
 *                   type: array
 *                   items:
 *                     type: object
 *                     properties:
 *                       dashboardId:
 *                         type: string
 *                       title:
 *                         type: string
 *                       description:
 *                         type: string
 *                       createdAt:
 *                         type: string
 *                       updatedAt:
 *                         type: string
 */
app.get("/api/v1.0/dashboards", (req: Request, res: Response) => {
  res.json({ dashboards });
});

/**
 * @swagger
 * /api/v1.0/dashboards:
 *   post:
 *     summary: Create a new dashboard
 *     tags: [Dashboards]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               title:
 *                 type: string
 *               description:
 *                 type: string
 *     responses:
 *       200:
 *         description: The newly created dashboard
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 dashboardId:
 *                   type: string
 *                 title:
 *                   type: string
 *                 description:
 *                   type: string
 *                 createdAt:
 *                   type: string
 *                 updatedAt:
 *                   type: string
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
 * @swagger
 * /api/v1.0/dashboards/{dashboardId}:
 *   put:
 *     summary: Update a dashboard
 *     tags: [Dashboards]
 *     parameters:
 *       - in: path
 *         name: dashboardId
 *         required: true
 *         description: ID of the dashboard to update
 *         schema:
 *           type: string
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               title:
 *                 type: string
 *               description:
 *                 type: string
 *     responses:
 *       200:
 *         description: The updated dashboard
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 dashboardId:
 *                   type: string
 *                 title:
 *                   type: string
 *                 description:
 *                   type: string
 *                 createdAt:
 *                   type: string
 *                 updatedAt:
 *                   type: string
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
 * @swagger
 * /api/v1.0/dashboards/{dashboardId}:
 *   delete:
 *     summary: Delete a dashboard
 *     tags: [Dashboards]
 *     parameters:
 *       - in: path
 *         name: dashboardId
 *         required: true
 *         description: ID of the dashboard to delete
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Dashboard deleted successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
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
 * @swagger
 * /api/v1.0/dashboards/{dashboardId}/duplicate:
 *   post:
 *     summary: Duplicate a dashboard (including charts)
 *     tags: [Dashboards]
 *     parameters:
 *       - in: path
 *         name: dashboardId
 *         required: true
 *         description: ID of the dashboard to duplicate
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: The duplicated dashboard with charts
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 clonedDashboard:
 *                   type: object
 *                   properties:
 *                     dashboardId:
 *                       type: string
 *                     title:
 *                       type: string
 *                     description:
 *                       type: string
 *                     createdAt:
 *                       type: string
 *                       updatedAt:
 *                       type: string
 *                 clonedCharts:
 *                   type: array
 *                   items:
 *                     type: object
 *                     properties:
 *                       chartId:
 *                         type: string
 *                       title:
 *                         type: string
 *                       description:
 *                         type: string
 *                       type:
 *                         type: string
 *                       dashboardId:
 *                         type: string
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
  }
);

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
