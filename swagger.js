import swaggerJSDoc from "swagger-jsdoc";
import swaggerUi from "swagger-ui-express";

const options = {
  definition: {
    openapi: "3.0.0",
    info: {
      title: "API Clínica Modular",
      version: "1.0.0",
      description:
        "Documentación interactiva de la API Clínica Modular (Arquitectura SOA con REST y Supabase)",
    },
    servers: [
      { url: "http://localhost:4000", description: "Servidor local" },
      {
        url: "https://api-clinica-modular.onrender.com/",
        description: "Servidor en producción",
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
    },
  },
  apis: ["./routes/*.js", "./index.js"], // Swagger buscará las anotaciones aquí
};

export const swaggerSpec = swaggerJSDoc(options);
export { swaggerUi };
