import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import swaggerUi from "swagger-ui-express";
import { sequelize } from "./src/config/database.js";
import { swaggerSpec } from "./src/config/swagger.js";
import contactosRoutes from "./src/routes/contactos.routes.js";

// Cargar variables de entorno
dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;

// Middlewares
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Documentación Swagger
app.use(
  "/api-docs",
  swaggerUi.serve,
  swaggerUi.setup(swaggerSpec, {
    customCss: ".swagger-ui .topbar { display: none }",
    customSiteTitle: "API Contactos - Documentación",
  }),
);

// Swagger JSON
app.get("/api-docs.json", (req, res) => {
  res.setHeader("Content-Type", "application/json");
  res.send(swaggerSpec);
});

// Rutas
app.use("/contactos", contactosRoutes);

// Ruta raíz
app.get("/", (req, res) => {
  res.json({
    message: "API de Contactos",
    version: "1.0.0",
    documentation: `http://localhost:${PORT}/api-docs`,
    endpoints: {
      getContactos: "GET /contactos",
      createContacto: "POST /contactos",
      deleteContacto: "DELETE /contactos/:id",
    },
  });
});

// Manejo de rutas no encontradas
app.use((req, res) => {
  res.status(404).json({ error: "Ruta no encontrada" });
});

// Manejo de errores global
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({
    error: "Error interno del servidor",
    message: process.env.NODE_ENV === "development" ? err.message : undefined,
  });
});

// Iniciar servidor
const startServer = async () => {
  try {
    // Probar conexión a la base de datos
    await sequelize.authenticate();
    console.log("✓ Conexión a PostgreSQL establecida correctamente");

    // Sincronizar modelos (crear tablas si no existen)
    await sequelize.sync({ alter: process.env.NODE_ENV === "development" });
    console.log("✓ Modelos sincronizados");

    // Iniciar servidor
    app.listen(PORT, () => {
      console.log(`✓ Servidor corriendo en http://localhost:${PORT}`);
    });
  } catch (error) {
    console.error("✗ Error al iniciar el servidor:", error.message);
    process.exit(1);
  }
};

startServer();
