import express, { Request, Response } from "express";
import { faker } from "@faker-js/faker";
import { charts } from "../../api/faker";

const app = express();
app.use(express.json());
const PORT = 3000;

/**
 * @swagger
 * tags:
 *   - name: Charts
 *     description: API for managing charts
 */

/**
 * @swagger
 * /api/v1.0/charts/{chartId}:
 *   get:
 *     summary: Get chart details
 *     tags: [Charts]
 *     parameters:
 *       - in: path
 *         name: chartId
 *         required: true
 *         description: ID of the chart
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Chart details
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 chartId:
 *                   type: string
 *                 title:
 *                   type: string
 *                 description:
 *                   type: string
 *                 type:
 *                   type: string
 *                 dashboardId:
 *                   type: string
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
 * @swagger
 * /api/v1.0/dashboards/{dashboardId}/charts:
 *   post:
 *     summary: Create a new chart
 *     tags: [Charts]
 *     parameters:
 *       - in: path
 *         name: dashboardId
 *         required: true
 *         description: ID of the dashboard
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
 *               type:
 *                 type: string
 *                 enum: [bar, line, pie, doughnut]
 *     responses:
 *       200:
 *         description: The newly created chart
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 chartId:
 *                   type: string
 *                 title:
 *                   type: string
 *                 description:
 *                   type: string
 *                 type:
 *                   type: string
 *                 dashboardId:
 *                   type: string
 */
app.post(
  "/api/v1.0/dashboards/:dashboardId/charts",
  (req: Request, res: Response): void => {
    const { dashboardId } = req.params;
    const { title, description, type } = req.body;

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
 * @swagger
 * /api/v1.0/charts/{chartId}:
 *   put:
 *     summary: Update a chart
 *     tags: [Charts]
 *     parameters:
 *       - in: path
 *         name: chartId
 *         required: true
 *         description: ID of the chart to update
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
 *               type:
 *                 type: string
 *     responses:
 *       200:
 *         description: The updated chart
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 chartId:
 *                   type: string
 *                 title:
 *                   type: string
 *                 description:
 *                   type: string
 *                 type:
 *                   type: string
 *                 dashboardId:
 *                   type: string
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
 * @swagger
 * /api/v1.0/charts/{chartId}:
 *   delete:
 *     summary: Delete a chart
 *     tags: [Charts]
 *     parameters:
 *       - in: path
 *         name: chartId
 *         required: true
 *         description: ID of the chart to delete
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Chart deleted successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
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
 * @swagger
 * /api/v1.0/dashboards/{dashboardId}/charts/{chartId}/duplicate:
 *   post:
 *     summary: Duplicate a chart
 *     tags: [Charts]
 *     parameters:
 *       - in: path
 *         name: chartId
 *         required: true
 *         description: ID of the chart to duplicate
 *         schema:
 *           type: string
 *       - in: path
 *         name: dashboardId
 *         required: true
 *         description: ID of the dashboard
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: The duplicated chart
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 chartId:
 *                   type: string
 *                 title:
 *                   type: string
 *                 description:
 *                   type: string
 *                 type:
 *                   type: string
 *                 dashboardId:
 *                   type: string
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

/**
 * Start server
 */
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
