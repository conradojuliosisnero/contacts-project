import pg from "pg";
import dotenv from "dotenv";

dotenv.config();

const { Client } = pg;

const createDatabase = async () => {
  const client = new Client({
    host: process.env.DB_HOST,
    port: process.env.DB_PORT || 5432,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: "postgres", 
    ssl: false,
    connectionTimeoutMillis: 5000,
  });

  try {
    await client.connect();

    // Verificar si la base de datos existe
    const result = await client.query(
      `SELECT 1 FROM pg_database WHERE datname = $1`,
      [process.env.DB_NAME],
    );

    if (result.rows.length === 0) {
      // Crear la base de datos si no existe
      await client.query(`CREATE DATABASE ${process.env.DB_NAME}`);
      console.log(
        `✓ Base de datos '${process.env.DB_NAME}' creada exitosamente`,
      );
    } else {
      console.log(`✓ La base de datos '${process.env.DB_NAME}' ya existe`);
    }
  } catch (error) {
    console.error("✗ Error al crear la base de datos:", error.message);
  } finally {
    await client.end();
  }
};

createDatabase();
