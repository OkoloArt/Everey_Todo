import swaggerJSDoc from "swagger-jsdoc";
import swaggerUi from "swagger-ui-express";
import { Express } from "express";

const swaggerDefinition = {
  openapi: "3.0.0",
  info: {
    title: "My To-Do API",
    version: "1.0.0",
    description: "A simple REST API for managing to-dos",
  },
  servers: [
    {
      url: "http://localhost:3000",
      description: "Local server",
    },
  ],
  components: {
    schemas: {
      Todo: {
        type: "object",
        properties: {
          id: {
            type: "string",
            format: "uuid",
            example: "12345678-1234-5678-1234-567812345678",
          },
          title: {
            type: "string",
            example: "Buy groceries",
          },
          description: {
            type: "string",
            example: "Milk, bread, and eggs",
          },
          isCompleted: {
            type: "boolean",
            example: false,
          },
        },
      },
      CreateTodo: {
        type: "object",
        properties: {
          title: {
            type: "string",
            example: "Buy groceries",
          },
          description: {
            type: "string",
            example: "Milk, bread, and eggs",
          },
        },
        required: ["title", "description"],
      },
      UpdateTodo: {
        type: "object",
        properties: {
          title: {
            type: "string",
            example: "Buy groceries",
          },
          description: {
            type: "string",
            example: "Milk, bread, and eggs",
          },
          isCompleted: {
            type: "boolean",
            example: false,
          },
        },
      },
      User: {
        type: "object",
        properties: {
          email: {
            type: "string",
            format: "email",
            example: "user@example.com",
          },
          password: {
            type: "string",
            example: "password123",
          },
        },
      },
    },
  },
  tags: [
    {
      name: "Auth",
      description: "Authentication related endpoints",
    },
    {
      name: "Todo",
      description: "To-do related endpoints",
    },
  ],
};

const options = {
  swaggerDefinition,
  apis: ["src/routes/*.ts"],
};

const swaggerSpec = swaggerJSDoc(options);

export const setupSwagger = (app: Express) => {
  app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerSpec));
};
