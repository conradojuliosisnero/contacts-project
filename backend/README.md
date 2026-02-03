# 📇 API de Contactos

API REST para gestión de contactos desarrollada con **Express.js**, **Sequelize** y **PostgreSQL** usando arquitectura **MVC**.

## 🚀 Características

- ✅ Arquitectura MVC (Model-View-Controller)
- ✅ API RESTful con endpoints CRUD
- ✅ Validación de datos en servidor
- ✅ ORM Sequelize para PostgreSQL
- ✅ Respuestas en formato JSON
- ✅ Manejo de errores centralizado
- ✅ CORS habilitado
- ✅ Variables de entorno

## 📋 Requisitos Previos

Antes de empezar, asegúrate de tener instalado:

- [Node.js](https://nodejs.org/) (v16 o superior)
- [pnpm](https://pnpm.io/) (gestor de paquetes)
- [PostgreSQL](https://www.postgresql.org/) (v12 o superior)

### Instalación de PostgreSQL en Windows

1. Descarga PostgreSQL desde [https://www.postgresql.org/download/windows/](https://www.postgresql.org/download/windows/)
2. Ejecuta el instalador y sigue las instrucciones
3. Durante la instalación, recuerda la contraseña que asignes al usuario `postgres`
4. Por defecto, PostgreSQL se ejecuta en el puerto `5432`

### Instalación de pnpm

```bash
npm install -g pnpm
```

## 🛠️ Instalación

### 1. Clonar o descargar el proyecto

```bash
cd api-contacts
```

### 2. Instalar dependencias

```bash
pnpm install
```

### 3. Configurar variables de entorno

Crea un archivo `.env` en la raíz del proyecto (puedes copiar `.env.example`):

```bash
# Copiar archivo de ejemplo
cp .env.example .env
```

Edita el archivo `.env` con tus credenciales de PostgreSQL:

```env
# Configuración del Servidor
PORT=3000
NODE_ENV=development

# Configuración de PostgreSQL
DB_HOST=localhost
DB_PORT=5432
DB_NAME=api_contacts
DB_USER=postgres
DB_PASSWORD=tu_password_de_postgres
```

### 4. Crear la base de datos

Ejecuta el script para crear la base de datos automáticamente:

```bash
pnpm run db:create
```

Este comando creará la base de datos `api_contacts` en PostgreSQL si no existe.

### 5. Iniciar el servidor

**Modo desarrollo (con recarga automática):**

```bash
pnpm run dev
```

**Modo producción:**

```bash
pnpm start
```

El servidor estará corriendo en `http://localhost:3000`

## 📡 Endpoints de la API

### Base URL

```
http://localhost:3000
```

### 1. Obtener todos los contactos

```http
GET /contactos
```

**Respuesta exitosa (200):**

```json
{
  "success": true,
  "total": 2,
  "data": [
    {
      "id": 1,
      "nombre": "Juan Pérez",
      "email": "juan@example.com",
      "telefono": "+34 123 456 789",
      "creado_en": "2026-02-03T10:30:00.000Z",
      "actualizado_en": "2026-02-03T10:30:00.000Z"
    },
    {
      "id": 2,
      "nombre": "María García",
      "email": "maria@example.com",
      "telefono": null,
      "creado_en": "2026-02-03T11:00:00.000Z",
      "actualizado_en": "2026-02-03T11:00:00.000Z"
    }
  ]
}
```

### 2. Crear un nuevo contacto

```http
POST /contactos
Content-Type: application/json
```

**Body (JSON):**

```json
{
  "nombre": "Juan Pérez",
  "email": "juan@example.com",
  "telefono": "+34 123 456 789"
}
```

**Campos:**

- `nombre` (requerido): 2-100 caracteres
- `email` (requerido): formato válido de email
- `telefono` (opcional): máximo 20 caracteres, solo números y caracteres + - ( ) espacios

**Respuesta exitosa (201):**

```json
{
  "success": true,
  "mensaje": "Contacto creado exitosamente",
  "data": {
    "id": 1,
    "nombre": "Juan Pérez",
    "email": "juan@example.com",
    "telefono": "+34 123 456 789",
    "creado_en": "2026-02-03T10:30:00.000Z",
    "actualizado_en": "2026-02-03T10:30:00.000Z"
  }
}
```

**Respuesta de error (400 - Validación):**

```json
{
  "error": "Error de validación",
  "detalles": [
    {
      "campo": "nombre",
      "mensaje": "El nombre es requerido"
    },
    {
      "campo": "email",
      "mensaje": "Debe ser un email válido"
    }
  ]
}
```

**Respuesta de error (409 - Email duplicado):**

```json
{
  "error": "Conflicto",
  "mensaje": "El email ya está registrado"
}
```

### 3. Eliminar un contacto

```http
DELETE /contactos/:id
```

**Parámetros:**

- `id` (requerido): ID del contacto a eliminar

**Ejemplo:**

```http
DELETE /contactos/1
```

**Respuesta exitosa (200):**

```json
{
  "success": true,
  "mensaje": "Contacto eliminado exitosamente",
  "data": {
    "id": 1
  }
}
```

**Respuesta de error (404):**

```json
{
  "error": "No encontrado",
  "mensaje": "No se encontró el contacto con id 1"
}
```

**Respuesta de error (400 - ID inválido):**

```json
{
  "error": "Parámetro inválido",
  "mensaje": "El ID debe ser un número entero positivo"
}
```

## 📁 Estructura del Proyecto

```
api-contacts/
├── src/
│   ├── config/
│   │   ├── database.js           # Configuración de Sequelize
│   │   └── createDatabase.js     # Script para crear BD
│   ├── controllers/
│   │   └── contactos.controller.js   # Lógica de negocio
│   ├── middlewares/
│   │   └── validators.js         # Validaciones personalizadas
│   ├── models/
│   │   └── Contacto.js          # Modelo de datos
│   └── routes/
│       └── contactos.routes.js  # Definición de rutas
├── .env                         # Variables de entorno (no incluir en Git)
├── .env.example                 # Ejemplo de variables de entorno
├── .gitignore                   # Archivos ignorados por Git
├── package.json                 # Dependencias del proyecto
└── server.js                    # Punto de entrada de la aplicación
```

## 🧪 Probar la API

### Con cURL

**Obtener contactos:**

```bash
curl http://localhost:3000/contactos
```

**Crear contacto:**

```bash
curl -X POST http://localhost:3000/contactos \
  -H "Content-Type: application/json" \
  -d '{
    "nombre": "Juan Pérez",
    "email": "juan@example.com",
    "telefono": "+34 123 456 789"
  }'
```

**Eliminar contacto:**

```bash
curl -X DELETE http://localhost:3000/contactos/1
```

### Con Thunder Client / Postman

1. Instala la extensión Thunder Client en VS Code o usa Postman
2. Importa o crea las siguientes peticiones:
   - `GET http://localhost:3000/contactos`
   - `POST http://localhost:3000/contactos` (con body JSON)
   - `DELETE http://localhost:3000/contactos/1`

## 🔒 Validaciones Implementadas

### En el Servidor (Middlewares)

- **Nombre:**
  - Requerido
  - Entre 2 y 100 caracteres
- **Email:**
  - Requerido
  - Formato válido de email
  - Único (no puede haber emails duplicados)
- **Teléfono:**
  - Opcional
  - Máximo 20 caracteres
  - Solo números y caracteres: + - ( ) espacios

### En el Modelo (Sequelize)

Las mismas validaciones se aplican a nivel de modelo de datos para garantizar la integridad.

## 🛡️ Manejo de Errores

La API incluye manejo de errores centralizado:

- **400**: Errores de validación
- **404**: Recurso no encontrado
- **409**: Conflicto (ej: email duplicado)
- **500**: Error interno del servidor

Todos los errores retornan respuestas JSON con estructura consistente.

## 🔧 Tecnologías Utilizadas

- **Express.js**: Framework web para Node.js
- **Sequelize**: ORM para bases de datos SQL
- **PostgreSQL**: Base de datos relacional
- **dotenv**: Gestión de variables de entorno
- **CORS**: Middleware para habilitar CORS
- **nodemon**: Reinicio automático en desarrollo

## 📝 Scripts Disponibles

```json
{
  "start": "node server.js", // Iniciar en producción
  "dev": "nodemon server.js", // Iniciar en desarrollo
  "db:create": "node src/config/createDatabase.js" // Crear base de datos
}
```

## 🚨 Solución de Problemas

### Error: "Cannot find module"

```bash
# Reinstalar dependencias
rm -rf node_modules pnpm-lock.yaml
pnpm install
```

### Error de conexión a PostgreSQL

1. Verifica que PostgreSQL esté corriendo
2. Revisa las credenciales en el archivo `.env`
3. Asegúrate de que el puerto 5432 esté disponible
4. Verifica que la base de datos exista (ejecuta `pnpm run db:create`)

### Puerto 3000 ya en uso

Cambia el puerto en el archivo `.env`:

```env
PORT=3001
```

## 👨‍💻 Autor

Desarrollado para una prueba técnica.

## 📄 Licencia

MIT
