const swaggerJSDoc = require('swagger-jsdoc');

const options = {
  definition: {
    openapi: "3.0.0",
    info: {
      title: "TRUE FACTS info de la api",
      version: "1.0.0",
      description: "Documentació important per l'us de l'api.",
    },
    servers: [
      {
        url: "http://localhost:3000",
        description: "Servidor de Desenvolupament",
      },
    ],
    components: {
      securitySchemes: {
        bearerAuth: {
          type: "http",
          scheme: "bearer",
          bearerFormat: "JWT",
        },
      },
      schemas: {
        User: {
          type: "object",
          properties: {
            id: { type: "string" },
            nom: { type: "string" },
            email: { type: "string" },
            rol: { type: "string", enum: ["admin", "client"] },
            direccio: { type: "string" },
            telefon: { type: "string" },
          },
        },
        Product: {
          type: "object",
          properties: {
            id: { type: "string" },
            nom: { type: "string" },
            descripcio: { type: "string" },
            preu: { type: "number" },
            stock: { type: "integer" },
            categoria: { type: "string" },
            imatge: { type: "string" },
          },
        },
        Error: {
          type: "object",
          properties: {
            status: { type: "string", example: "error" },
            message: { type: "string" },
          },
        },
      },
    },
    security: [
      {
        bearerAuth: [],
      },
    ],
  },
  apis: ["./src/routes/*.js"], // Path to the API docs
};

const swaggerSpec = swaggerJSDoc(options);

module.exports = swaggerSpec;
