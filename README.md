# 📇 Sistema de Gestión de Contactos

Sistema completo de gestión de contactos con API REST y aplicación web moderna. Desarrollado con **Express.js**, **PostgreSQL**, **Next.js 14** y **Tailwind CSS**.

## 🎯 Descripción General

Este proyecto es un sistema full-stack para gestionar contactos que incluye:

- **Backend**: API REST con Express.js, Sequelize y PostgreSQL
- **Frontend**: Aplicación web con Next.js 14, Tailwind CSS y shadcn/ui

## 📋 Requisitos Previos

Antes de empezar, asegúrate de tener instalado:

- [Node.js](https://nodejs.org/) (v16 o superior)
- [pnpm](https://pnpm.io/) (gestor de paquetes)
- [PostgreSQL](https://www.postgresql.org/) (v12 o superior)

### Instalación de pnpm

```bash
npm install -g pnpm
```

### Instalación de PostgreSQL en Windows

1. Descarga PostgreSQL desde [https://www.postgresql.org/download/windows/](https://www.postgresql.org/download/windows/)
2. Ejecuta el instalador y sigue las instrucciones
3. Durante la instalación, recuerda la contraseña que asignes al usuario `postgres`
4. Por defecto, PostgreSQL se ejecuta en el puerto `5432`

## 🚀 Inicio Rápido

### 1. Clonar o descargar el proyecto

```bash
cd api-contacts
```

### 2. Configurar variables de entorno

#### Backend (.env en /backend)

Crea un archivo `.env` en la carpeta `backend`:

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

#### Frontend (.env.local en /frontend)

Crea un archivo `.env.local` en la carpeta `frontend`:

```env
NEXT_PUBLIC_API_URL=http://localhost:3000
```

### 3. Instalar dependencias

```bash
# Backend
cd backend
pnpm install

# Frontend (en otra terminal)
cd frontend
pnpm install
```

### 4. Crear la base de datos

Ejecuta el script desde la carpeta `backend`:

```bash
cd backend
pnpm run db:create
```

Este comando creará automáticamente la base de datos `api_contacts` en PostgreSQL.
⚠️ Ojo, PostgreSQL debe estar corriendo para que esto funcione ⚠️.

### 5. Iniciar los servidores

**Terminal 1 - Backend:**

```bash
cd backend
pnpm run dev
```

El servidor estará corriendo en `http://localhost:3000/api-docs/` (Swagger UI)

**Terminal 2 - Frontend:**

```bash
cd frontend
pnpm run dev
```

La aplicación estará disponible en `http://localhost:3001`

---

## 🔧 Backend - API REST

### 📦 Tecnologías

| Tecnología     | Versión | Uso                         |
| -------------- | ------- | --------------------------- |
| **Express**    | 4.x     | Framework web para Node.js  |
| **Sequelize**  | 6.x     | ORM para bases de datos SQL |
| **PostgreSQL** | 12+     | Base de datos relacional    |
| **dotenv**     | Latest  | Variables de entorno        |
| **CORS**       | Latest  | Middleware CORS             |
| **nodemon**    | Latest  | Desarrollo con hot-reload   |

### 📁 Estructura del Backend

```
backend/
├── src/
│   ├── config/
│   │   ├── database.js           # Configuración de Sequelize
│   │   ├── createDatabase.js     # Script para crear BD
│   │   └── swagger.js            # Configuración de Swagger
│   ├── constants/
│   │   ├── messages.js           # Mensajes de respuesta
│   │   └── regex.js              # Expresiones regulares
│   ├── controllers/
│   │   └── contactos.controller.js   # Lógica de negocio
│   ├── middlewares/
│   │   └── validators.js         # Validaciones personalizadas
│   ├── models/
│   │   └── Contacto.js          # Modelo de datos
│   └── routes/
│       └── contactos.routes.js  # Definición de rutas
├── .env                         # Variables de entorno
├── .env.example                 # Ejemplo de variables
├── package.json                 # Dependencias
├── pnpm-lock.yaml              # Lock file de pnpm
└── server.js                    # Punto de entrada
```

### 📡 Endpoints de la API

**Base URL:** `http://localhost:3000`

| Método | Endpoint         | Descripción                 |
| ------ | ---------------- | --------------------------- |
| GET    | `/contactos`     | Obtener todos los contactos |
| POST   | `/contactos`     | Crear un nuevo contacto     |
| PUT    | `/contactos/:id` | Actualizar un contacto      |
| DELETE | `/contactos/:id` | Eliminar un contacto        |

### 📜 Scripts del Backend

```bash
pnpm start         # Iniciar en producción
pnpm run dev       # Iniciar en desarrollo (nodemon)
pnpm run db:create # Crear base de datos
```

### 🔒 Validaciones Implementadas

- **Nombre:** Requerido, 2-100 caracteres
- **Email:** Requerido, formato válido, único
- **Teléfono:** Opcional, máximo 20 caracteres, solo números y + - ( ) espacios

### 🛡️ Códigos de Respuesta

- **200**: Operación exitosa
- **201**: Recurso creado
- **400**: Error de validación
- **404**: Recurso no encontrado
- **409**: Conflicto (email duplicado)
- **500**: Error interno del servidor

---

## 🎨 Frontend - Aplicación Web

### 📦 Tecnologías

| Tecnología          | Versión | Uso                            |
| ------------------- | ------- | ------------------------------ |
| **Next.js**         | 14.x    | Framework React con App Router |
| **React**           | 18.x    | Biblioteca para UI             |
| **Tailwind CSS**    | 4.x     | Framework CSS utility-first    |
| **shadcn/ui**       | Latest  | Sistema de componentes UI      |
| **React Hook Form** | 7.x     | Manejo de formularios          |
| **Axios**           | 1.x     | Cliente HTTP para API          |
| **Lucide React**    | Latest  | Iconos                         |
| **Sonner**          | Latest  | Notificaciones toast           |

### 📁 Estructura del Frontend (Atomic Design)

```
frontend/
├── app/                          # Next.js App Router
│   ├── layout.js                 # Layout principal
│   ├── globals.css               # Estilos globales
│   └── (home)/
│       └── page.js               # Página principal
│
├── components/
│   ├── atoms/                    # ⚛️ Elementos básicos
│   │   ├── button.jsx           # Botón base de shadcn
│   │   ├── input.jsx            # Input base
│   │   ├── card.jsx             # Card y variantes
│   │   ├── dialog.jsx           # Dialog modal
│   │   ├── table.jsx            # Tabla y componentes
│   │   └── index.js             # Barrel export
│   │
│   ├── molecules/                # 🧬 Combinaciones simples
│   │   ├── FormField.jsx        # Campo de formulario
│   │   ├── ErrorDisplay.jsx     # Pantalla de error
│   │   ├── SearchInput.jsx      # Barra de búsqueda
│   │   ├── PageHeader.jsx       # Header de página
│   │   ├── TableSkeleton.jsx    # Skeleton loader
│   │   └── index.js             # Barrel export
│   │
│   ├── organisms/                # 🦠 Componentes complejos
│   │   ├── ContactForm.jsx      # Formulario completo
│   │   ├── ContactFormDialog.jsx # Formulario en modal
│   │   ├── ContactTable.jsx     # Tabla de contactos
│   │   └── index.js             # Barrel export
│   │
│   └── templates/                # 📄 Plantillas de página
│       ├── ContactsPageTemplate.jsx # Template completo
│       └── index.js             # Barrel export
│
├── hooks/                        # 🪝 Custom Hooks
│   ├── useContactos.js          # Hook CRUD de contactos
│   └── useContactosManagement.js # Hook de gestión UI
│
├── services/                     # 🌐 Servicios de API
│   └── contactos.service.js     # Servicio de contactos
│
├── lib/                          # ⚙️ Configuraciones
│   ├── axios.js                 # Instancia de Axios
│   └── utils.js                 # Utilidades (cn, etc.)
│
├── utils/                        # 🔧 Utilidades
│   ├── validators.js            # Validaciones
│   ├── helpers.js               # Funciones auxiliares
│   └── mappers.js               # Transformadores de datos
│
├── .env.local                   # Variables de entorno
├── components.json              # Config de shadcn/ui
├── tailwind.config.mjs          # Config de Tailwind
├── next.config.mjs              # Config de Next.js
└── package.json                 # Dependencias
```

### 🏗️ Patrón Atomic Design

- **⚛️ Átomos**: Elementos básicos (Button, Input, Label)
- **🧬 Moléculas**: Combinaciones simples (FormField, SearchInput)
- **🦠 Organismos**: Componentes complejos (ContactForm, ContactTable)
- **📄 Templates**: Plantillas de página (ContactsPageTemplate)

### 📜 Scripts del Frontend

```bash
pnpm run dev       # Iniciar servidor de desarrollo
pnpm run build     # Construir para producción
pnpm start         # Iniciar servidor de producción
pnpm run lint      # Ejecutar el linter
```

### 🪝 Hooks Personalizados

#### `useContactos`

Hook principal para operaciones CRUD:

```javascript
const {
  contactos, // Array de contactos
  loading, // Estado de carga
  error, // Mensajes de error
  fetchContactos, // Refrescar lista
  createContacto, // Crear nuevo
  updateContacto, // Actualizar
  deleteContacto, // Eliminar
} = useContactos();
```

#### `useContactosManagement`

Hook para gestión de UI y estado de la página:

```javascript
const {
  dialogOpen,
  editingContact,
  searchTerm,
  filteredContactos,
  handleSubmit,
  handleEdit,
  handleDelete,
  handleNewContact,
  handleSearchChange,
} = useContactosManagement();
```

### 🎨 Características de la UI

- ✅ Diseño responsivo (mobile-first)
- ✅ Tema claro/oscuro
- ✅ Validación en tiempo real
- ✅ Estados de carga (skeletons)
- ✅ Mensajes de error amigables
- ✅ Notificaciones toast
- ✅ Confirmación antes de eliminar
- ✅ Búsqueda en tiempo real
- ✅ Tabla interactiva con acciones

---

## 🗄️ Base de Datos

### Tabla: `contactos`

| Campo            | Tipo         | Restricciones               |
| ---------------- | ------------ | --------------------------- |
| `id`             | INTEGER      | PRIMARY KEY, AUTO_INCREMENT |
| `nombre`         | VARCHAR(100) | NOT NULL                    |
| `email`          | VARCHAR(255) | NOT NULL, UNIQUE            |
| `telefono`       | VARCHAR(20)  | NULL                        |
| `creado_en`      | TIMESTAMP    | DEFAULT NOW()               |
| `actualizado_en` | TIMESTAMP    | DEFAULT NOW()               |

### Crear la Base de Datos

Desde la carpeta `backend`:

```bash
cd backend
pnpm run db:create
```

Este comando ejecutará el script `src/config/createDatabase.js` que:

1. Conecta a PostgreSQL
2. Verifica si existe la base de datos `api_contacts`
3. La crea si no existe
4. Crea automáticamente las tablas con Sequelize

---

## 🔄 Flujo de Datos

```
Usuario → Frontend (Next.js)
              ↓
       Hook (useContactos)
              ↓
    Service (contactosService)
              ↓
         Axios Client
              ↓
      Backend (Express.js)
              ↓
    Controller + Validaciones
              ↓
     Model (Sequelize ORM)
              ↓
   Base de Datos (PostgreSQL)
```

---

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

1. Instala Thunder Client en VS Code o usa Postman
2. Crea peticiones a `http://localhost:3000/contactos`
3. Prueba los diferentes endpoints (GET, POST, PUT, DELETE)

---

## 🚨 Solución de Problemas

### Backend no se conecta a PostgreSQL

1. Verifica que PostgreSQL esté corriendo
2. Revisa las credenciales en `backend/.env`
3. Asegúrate de que el puerto 5432 esté disponible
4. Ejecuta `pnpm run db:create` desde la carpeta backend

### Frontend no se conecta al Backend

1. Verifica que el backend esté corriendo en `http://localhost:3000`
2. Revisa la variable `NEXT_PUBLIC_API_URL` en `frontend/.env.local`
3. Verifica que CORS esté habilitado en el backend

### Error: "Cannot find module"

```bash
# En backend
cd backend
rm -rf node_modules pnpm-lock.yaml
pnpm install

# En frontend
cd frontend
rm -rf node_modules pnpm-lock.yaml
pnpm install
```

### Puerto ya en uso

**Backend (puerto 3000):**

```env
# Cambiar en backend/.env
PORT=3001
```

**Frontend (puerto 3001):**

```bash
# Iniciar en otro puerto
PORT=3002 pnpm run dev
```

---

## 📊 Estructura General del Proyecto

```
api-contacts/
├── backend/                 # API REST con Express.js
│   ├── src/
│   │   ├── config/         # Configuraciones
│   │   ├── constants/      # Constantes
│   │   ├── controllers/    # Controladores
│   │   ├── middlewares/    # Middlewares
│   │   ├── models/         # Modelos
│   │   └── routes/         # Rutas
│   ├── .env                # Variables de entorno
│   ├── package.json
│   └── server.js           # Entrada principal
│
├── frontend/               # Aplicación Next.js
│   ├── app/               # App Router
│   ├── components/        # Componentes Atomic Design
│   ├── hooks/             # Custom Hooks
│   ├── services/          # Servicios API
│   ├── lib/               # Configuraciones
│   ├── utils/             # Utilidades
│   ├── .env.local         # Variables de entorno
│   ├── package.json
│   └── next.config.mjs    # Config de Next.js
│
└── README.md              # Este archivo
```

---

## 🎯 Próximas Mejoras

### Backend

- [ ] Implementar autenticación JWT
- [ ] Agregar paginación a los endpoints
- [ ] Documentación con Swagger/OpenAPI
- [ ] Tests unitarios e integración
- [ ] Rate limiting
- [ ] Logs con Winston

### Frontend

- [ ] Tests con Jest y React Testing Library
- [ ] Paginación en tabla de contactos
- [ ] Filtros avanzados
- [ ] Modo offline con caché
- [ ] Animaciones con Framer Motion
- [ ] Exportar contactos (CSV/PDF)
- [ ] Importar contactos masivos

---

## 🤝 Contribución

1. Fork el proyecto
2. Crea una rama para tu feature (`git checkout -b feature/AmazingFeature`)
3. Commit tus cambios (`git commit -m 'Add some AmazingFeature'`)
4. Push a la rama (`git push origin feature/AmazingFeature`)
5. Abre un Pull Request

---

## 📄 Licencia

Este proyecto es para fines educativos.

---

## 📚 Recursos Adicionales

### Documentación Oficial

- [Next.js Documentation](https://nextjs.org/docs)
- [Express.js Documentation](https://expressjs.com/)
- [Sequelize Documentation](https://sequelize.org/)
- [PostgreSQL Documentation](https://www.postgresql.org/docs/)
- [Tailwind CSS](https://tailwindcss.com/docs)
- [shadcn/ui](https://ui.shadcn.com)
- [React Hook Form](https://react-hook-form.com)

### Tutoriales

- [Next.js App Router Tutorial](https://nextjs.org/learn)
- [Atomic Design Methodology](https://bradfrost.com/blog/post/atomic-web-design/)
- [RESTful API Best Practices](https://restfulapi.net/)

---

## 👨‍💻 Autor

Desarrollado con ❤️ usando Node.js, Express, PostgreSQL, Next.js y Tailwind CSS

**Fecha:** Febrero 2026
