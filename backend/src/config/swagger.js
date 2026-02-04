import swaggerJsdoc from "swagger-jsdoc";

const options = {
  definition: {
    openapi: "3.0.0",
    info: {
      title: "API de Contactos",
      version: "1.0.0",
      description:
        "API REST para gestión de contactos con Express.js y PostgreSQL",
      contact: {
        name: "Soporte API",
      },
    },
    servers: [
      {
        url: `http://localhost:${process.env.PORT || 3000}`,
        description: "Servidor de desarrollo",
      },
    ],
    tags: [
      {
        name: "Contactos",
        description: "Operaciones relacionadas con contactos",
      },
    ],
    components: {
      schemas: {
        Contacto: {
          type: "object",
          required: ["nombre", "email", "telefono"],
          properties: {
            id: {
              type: "integer",
              description: "ID autogenerado del contacto",
              example: 1,
            },
            nombre: {
              type: "string",
              minLength: 2,
              maxLength: 100,
              description: "Nombre completo del contacto",
              example: "Juan Pérez",
            },
            email: {
              type: "string",
              format: "email",
              maxLength: 100,
              description: "Email del contacto (debe ser único)",
              example: "juan@ejemplo.com",
            },
            telefono: {
              type: "string",
              maxLength: 20,
              description: "Teléfono del contacto",
              example: "+52 123 456 7890",
            },
            createdAt: {
              type: "string",
              format: "date-time",
              description: "Fecha de creación",
            },
            updatedAt: {
              type: "string",
              format: "date-time",
              description: "Fecha de última actualización",
            },
          },
        },
        ContactoInput: {
          type: "object",
          required: ["nombre", "email", "telefono"],
          properties: {
            nombre: {
              type: "string",
              minLength: 2,
              maxLength: 100,
              example: "Juan Pérez",
            },
            email: {
              type: "string",
              format: "email",
              maxLength: 100,
              example: "juan@ejemplo.com",
            },
            telefono: {
              type: "string",
              maxLength: 20,
              example: "+52 123 456 7890",
            },
          },
        },
        Error: {
          type: "object",
          properties: {
            error: {
              type: "string",
              description: "Mensaje de error",
            },
            message: {
              type: "string",
              description: "Descripción detallada del error",
            },
          },
        },
      },
      responses: {
        NotFound: {
          description: "Recurso no encontrado",
          content: {
            "application/json": {
              schema: {
                $ref: "#/components/schemas/Error",
              },
              example: {
                error: "Contacto no encontrado",
              },
            },
          },
        },
        ValidationError: {
          description: "Error de validación",
          content: {
            "application/json": {
              schema: {
                $ref: "#/components/schemas/Error",
              },
              example: {
                error: "El email ya está registrado",
              },
            },
          },
        },
        ServerError: {
          description: "Error interno del servidor",
          content: {
            "application/json": {
              schema: {
                $ref: "#/components/schemas/Error",
              },
            },
          },
        },
      },
    },
  },
  apis: ["./src/routes/*.js"], // Archivos donde están las anotaciones
};

export const swaggerSpec = swaggerJsdoc(options);
