import { NextRequest, NextResponse } from "next/server";

/**
 * @swagger
 * /api/example:
 *   get:
 *     summary: Example API
 *     description: Returns a sample JSON response.
 *     responses:
 *       200:
 *         description: Success
 */
export async function GET(req: NextRequest) {
  return NextResponse.json({ message: "Hello, Swagger!" });
}
