# 📱 Frontend - Sistema de Gestión de Contactos

Aplicación web moderna desarrollada con **Next.js 14**, **Tailwind CSS**, **shadcn/ui**, **React Hook Form** y **Axios** para la gestión de contactos.

## 🎯 Características

- ✅ Interfaz moderna y responsiva
- ✅ Formularios con validación en tiempo real
- ✅ CRUD completo de contactos
- ✅ Arquitectura Atomic Design
- ✅ Componentes reutilizables
- ✅ Manejo de estados con hooks personalizados
- ✅ Comunicación con API REST mediante Axios

## 🛠️ Stack Tecnológico

| Tecnología          | Versión | Uso                            |
| ------------------- | ------- | ------------------------------ |
| **Next.js**         | 14.x    | Framework React con App Router |
| **React**           | 18.x    | Biblioteca para UI             |
| **Tailwind CSS**    | 4.x     | Framework CSS utility-first    |
| **shadcn/ui**       | Latest  | Sistema de componentes UI      |
| **React Hook Form** | 7.x     | Manejo de formularios          |
| **Axios**           | 1.x     | Cliente HTTP para API          |
| **Lucide React**    | Latest  | Iconos                         |

## 📁 Estructura del Proyecto (Atomic Design)

```
frontend/
├── app/                          # Next.js App Router
│   ├── layout.js                 # Layout principal
│   ├── page.js                   # Página principal
│   └── globals.css               # Estilos globales
│
├── components/
│   ├── atoms/                    # ⚛️ ÁTOMOS - Elementos básicos indivisibles
│   │   ├── button.jsx           # Botón base de shadcn
│   │   ├── input.jsx            # Input base de shadcn
│   │   ├── label.jsx            # Label base de shadcn
│   │   ├── card.jsx             # Card y sus variantes
│   │   └── index.js             # Barrel export
│   │
│   ├── molecules/                # 🧬 MOLÉCULAS - Combinaciones simples de átomos
│   │   ├── FormField.jsx        # Campo de formulario (Label + Input + Error)
│   │   ├── ContactCard.jsx      # Tarjeta de contacto individual
│   │   └── index.js             # Barrel export
│   │
│   ├── organisms/                # 🦠 ORGANISMOS - Componentes complejos funcionales
│   │   ├── ContactForm.jsx      # Formulario completo de contacto
│   │   ├── ContactList.jsx      # Lista de contactos con estados
│   │   └── index.js             # Barrel export
│   │
│   └── templates/                # 📄 TEMPLATES - Plantillas de página
│       ├── ContactsPageTemplate.jsx  # Template completo de la página
│       └── index.js             # Barrel export
│
├── hooks/                        # 🪝 Custom Hooks
│   └── useContactos.js          # Hook para manejo de contactos (CRUD)
│
├── services/                     # 🌐 Servicios de API
│   └── contactos.service.js     # Servicio de contactos con Axios
│
├── lib/                          # ⚙️ Configuraciones
│   ├── axios.js                 # Instancia configurada de Axios
│   └── utils.js                 # Utilidades (cn, etc.)
│
├── utils/                        # 🔧 Utilidades
│   └── validators.js            # Validaciones para formularios
│
├── .env.local                   # Variables de entorno (local)
├── .env.example                 # Ejemplo de variables de entorno
├── components.json              # Configuración de shadcn/ui
├── tailwind.config.js           # Configuración de Tailwind
├── next.config.js               # Configuración de Next.js
├── package.json                 # Dependencias del proyecto
└── README.md                    # Este archivo
```

## 🏗️ Patrón Atomic Design Explicado

### ⚛️ Átomos (Atoms)

Elementos básicos e indivisibles de la UI. No pueden descomponerse más.

**Ejemplos:**

- `Button` - Botón básico
- `Input` - Campo de entrada
- `Label` - Etiqueta de texto
- `Card` - Contenedor básico

**Características:**

- Sin lógica de negocio
- Altamente reutilizables
- Componentes de shadcn/ui

### 🧬 Moléculas (Molecules)

Combinaciones simples de átomos que funcionan juntos como una unidad.

**Ejemplos:**

- `FormField` - Label + Input + Mensaje de error
- `ContactCard` - Card + Botones de acción

**Características:**

- Combinan 2-3 átomos
- Lógica mínima de presentación
- Reutilizables en diferentes contextos

### 🦠 Organismos (Organisms)

Componentes complejos que forman secciones de la interfaz.

**Ejemplos:**

- `ContactForm` - Formulario completo con validación
- `ContactList` - Lista completa con estados de carga

**Características:**

- Combinan moléculas y átomos
- Contienen lógica de negocio
- Más específicos al contexto

### 📄 Templates (Templates)

Plantillas de página que definen la estructura general.

**Ejemplos:**

- `ContactsPageTemplate` - Estructura completa de la página de contactos

**Características:**

- Definen el layout
- Orquestan organismos
- Gestión de estado global

## 🚀 Instalación y Configuración

### 1. Clonar el repositorio

```bash
cd frontend
```

### 2. Instalar dependencias

```bash
npm install
```

### 3. Configurar variables de entorno

```bash
cp .env.example .env.local
```

Editar `.env.local`:

```env
NEXT_PUBLIC_API_URL=http://localhost:3000/api
```

### 4. Ejecutar en desarrollo

```bash
npm run dev
```

La aplicación estará disponible en [http://localhost:3001](http://localhost:3001)

## 📜 Scripts Disponibles

```bash
npm run dev          # Inicia el servidor de desarrollo
npm run build        # Construye la aplicación para producción
npm start            # Inicia el servidor de producción
npm run lint         # Ejecuta el linter
```

## 🔌 Servicios y API

### Configuración de Axios

El cliente HTTP está configurado en [lib/axios.js](lib/axios.js):

```javascript
- Base URL: process.env.NEXT_PUBLIC_API_URL
- Timeout: 10 segundos
- Headers: Content-Type: application/json
- Interceptores para request y response
```

### Servicio de Contactos

Métodos disponibles en [services/contactos.service.js](services/contactos.service.js):

```javascript
contactosService.getAll(); // GET /contactos
contactosService.getById(id); // GET /contactos/:id
contactosService.create(contacto); // POST /contactos
contactosService.update(id, contacto); // PUT /contactos/:id
contactosService.delete(id); // DELETE /contactos/:id
```

## 🪝 Hooks Personalizados

### `useContactos`

Hook para gestión completa de contactos:

```javascript
const {
  contactos, // Array de contactos
  loading, // Estado de carga
  error, // Mensajes de error
  fetchContactos, // Refrescar lista
  createContacto, // Crear nuevo
  updateContacto, // Actualizar existente
  deleteContacto, // Eliminar contacto
} = useContactos();
```

## 🎨 Estilos y Theming

### Tailwind CSS

Configuración personalizada con variables CSS para temas:

```css
/* Variables de color definidas en globals.css */
--background
--foreground
--primary
--destructive
--muted
```

### shadcn/ui

Componentes configurados en modo JavaScript sin TypeScript:

```javascript
// Importación de componentes
import { Button, Input, Label, Card } from "@/components/atoms";
```

## ✅ Validaciones

Sistema de validación declarativo en [utils/validators.js](utils/validators.js):

```javascript
validators.required(value); // Campo requerido
validators.email(value); // Email válido
validators.phone(value); // Teléfono válido
validators.minLength(min); // Longitud mínima
validators.maxLength(max); // Longitud máxima
```

## 🔄 Flujo de Datos

```
Usuario → Template → Organism → Molecule → Atom
                ↓
              Hook (useContactos)
                ↓
         Service (contactosService)
                ↓
              Axios
                ↓
           API Backend
```

## 📱 Características de la UI

### Formulario de Contactos

- ✅ Validación en tiempo real
- ✅ Mensajes de error claros
- ✅ Estados de carga
- ✅ Modo creación y edición

### Lista de Contactos

- ✅ Grid responsivo (1-3 columnas)
- ✅ Tarjetas interactivas
- ✅ Acciones rápidas (editar/eliminar)
- ✅ Estados vacío y error

### Experiencia de Usuario

- ✅ Feedback visual inmediato
- ✅ Confirmación antes de eliminar
- ✅ Indicadores de carga
- ✅ Diseño responsivo

## 🌐 Variables de Entorno

| Variable              | Descripción      | Ejemplo                     |
| --------------------- | ---------------- | --------------------------- |
| `NEXT_PUBLIC_API_URL` | URL base del API | `http://localhost:3000/api` |

⚠️ **Importante:** Las variables con prefijo `NEXT_PUBLIC_` son accesibles en el cliente.

## 🧪 Buenas Prácticas Implementadas

1. **Separación de Responsabilidades**
   - Componentes presentacionales vs lógicos
   - Servicios separados de componentes

2. **Reutilización de Código**
   - Atomic Design para máxima reutilización
   - Barrel exports para importaciones limpias

3. **Manejo de Estados**
   - Custom hooks para lógica compartida
   - Estados locales mínimos

4. **Performance**
   - Componentes client-side solo cuando necesario
   - Optimización de re-renders

5. **Código Limpio**
   - Sin redundancias
   - Nombres descriptivos
   - Estructura modular

## 📦 Estructura de Archivos por Tipo

### Componentes

```
✓ Declarativos y funcionales
✓ Props bien definidas
✓ Sin lógica de negocio en átomos y moléculas
✓ Uso de 'use client' solo cuando necesario
```

### Servicios

```
✓ Operaciones asíncronas
✓ Manejo de errores
✓ Transformación de datos
✓ Abstracción de la API
```

### Hooks

```
✓ Lógica reutilizable
✓ Manejo de estado complejo
✓ Efectos secundarios controlados
✓ Retorno de valores y funciones
```

## 🎯 Próximas Mejoras

- [ ] Agregar tests unitarios (Jest + React Testing Library)
- [ ] Implementar paginación en lista de contactos
- [ ] Agregar búsqueda y filtros
- [ ] Modo offline con caché
- [ ] Animaciones y transiciones
- [ ] Tema claro/oscuro persistente
- [ ] Autenticación y autorización

## 🤝 Contribución

1. Fork el proyecto
2. Crea una rama para tu feature (`git checkout -b feature/AmazingFeature`)
3. Commit tus cambios (`git commit -m 'Add some AmazingFeature'`)
4. Push a la rama (`git push origin feature/AmazingFeature`)
5. Abre un Pull Request

## 📄 Licencia

Este proyecto es parte de un sistema de gestión de contactos para fines educativos.

## 👨‍💻 Autor

Desarrollado con ❤️ usando Next.js, Tailwind CSS y shadcn/ui

---

**Documentación adicional:**

- [Next.js Documentation](https://nextjs.org/docs)
- [Tailwind CSS](https://tailwindcss.com/docs)
- [shadcn/ui](https://ui.shadcn.com)
- [React Hook Form](https://react-hook-form.com)
- [Axios](https://axios-http.com)
