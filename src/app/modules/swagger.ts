import { SwaggerDefinition, Options } from "swagger-jsdoc";

const swaggerDefinition: SwaggerDefinition = {
  openapi: "3.0.0",
  info: {
    title: "My API",
    version: "1.0.0",
    description: "API Documentation with Swagger",
  },
  servers: [
    {
      url: "http://localhost:3000",
      description: "Local server",
    },
  ],
};

const swaggerOptions: Options = {
  swaggerDefinition,
  apis: ["./src/app/api/**/*.ts"],
};

export default swaggerOptions;
