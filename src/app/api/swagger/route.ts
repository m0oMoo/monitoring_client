import { NextRequest, NextResponse } from "next/server";
import swaggerJsdoc from "swagger-jsdoc";
import swaggerOptions from "../../modules/swagger";

const specs = swaggerJsdoc(swaggerOptions);

export async function GET(req: NextRequest) {
  return new NextResponse(
    `
    <!DOCTYPE html>
    <html lang="en">
    <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>Swagger UI</title>
        <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/swagger-ui/4.15.5/swagger-ui.min.css">
    </head>
    <body>
        <div id="swagger-ui"></div>
        <script src="https://cdnjs.cloudflare.com/ajax/libs/swagger-ui/4.15.5/swagger-ui-bundle.min.js"></script>
        <script>
            window.onload = function() {
                SwaggerUIBundle({
                    url: "/api/swagger-json",
                    dom_id: "#swagger-ui"
                });
            }
        </script>
    </body>
    </html>
    `,
    {
      headers: { "Content-Type": "text/html" },
    }
  );
}
