# Frontend SPA del Supermercado - MarketSoft

## Integrantes del Equipo

- Adelson Aguirre Rodriguez
- Sergio Alonso Arboleda S

## Descripción del Proyecto

Frontend SPA del Supermercado es una aplicación web de una sola página (Single Page Application) desarrollada con React para la gestión integral de un supermercado. La aplicación permite administrar los módulos principales del sistema: Productos, Usuarios, Proveedores y Ventas.

## Arquitectura

### Tecnologías Utilizadas

- **Frontend Framework**: React 19.2.4
- **Build Tool**: Vite 8.0.4
- **Routing**: React Router DOM
- **HTTP Client**: Axios
- **UI Framework**: Bootstrap 5.3.8
- **Bundler**: Vite

### Estructura del Proyecto

```text
src/
├── components/          # Componentes reutilizables
├── layouts/             # Layouts de la aplicación
│   └── MainLayout.jsx   # Layout principal con navegación
├── pages/               # Páginas de la aplicación
│   ├── HomePage.jsx     # Página de inicio
│   ├── ProductsPage.jsx # Gestión de productos
│   ├── UsersPage.jsx    # Gestión de usuarios
│   ├── SuppliersPage.jsx # Gestión de proveedores
│   └── SalesPage.jsx    # Gestión de ventas
├── services/            # Servicios de API
│   └── api.js          # Configuración de Axios y endpoints
├── App.jsx             # Componente principal con rutas
├── main.jsx            # Punto de entrada de la aplicación
└── index.css           # Estilos globales
```

### Arquitectura de Componentes

- **Layout Principal**: `MainLayout` proporciona la estructura base con navegación y footer
- **Páginas**: Cada módulo tiene su propia página con funcionalidad CRUD completa
- **Servicios**: Centralización de llamadas a API usando Axios
- **Rutas**: Configuración de rutas usando React Router DOM

### Servicios de API

La aplicación consume una API REST con los siguientes endpoints:

- `/api/products` - CRUD de productos
- `/api/users` - CRUD de usuarios
- `/api/suppliers` - CRUD de proveedores
- `/api/sales` - CRUD de ventas

## Instrucciones de Ejecución

### Prerrequisitos

- Node.js (versión 18 o superior)
- npm (versión 9 o superior)

### Pasos para Ejecutar la Aplicación

1. **Clonar el repositorio**

   ```bash
   git clone [URL-del-repositorio]
   cd Frontend-SPA-del-Supermercado
   ```

2. **Instalar dependencias**

   ```bash
   npm install
   ```

3. **Iniciar la aplicación**

   ```bash
   npm start
   ```

   O alternativamente:

   ```bash
   npm run dev
   ```

4. **Acceder a la aplicación**

   Abrir el navegador en `http://localhost:5173`

### Scripts Disponibles

- `npm start` - Inicia el servidor de desarrollo
- `npm run dev` - Inicia el servidor de desarrollo (alternativo)
- `npm run build` - Construye la aplicación para producción
- `npm run preview` - Previsualiza la aplicación de producción
- `npm run lint` - Ejecuta el linter de ESLint

## Características Principales

### Módulo de Productos

- Crear, leer, actualizar y eliminar productos
- Campos: nombre, descripción, precio, stock, categoría
- Tabla con datos y acciones de edición/eliminación

### Módulo de Usuarios

- Gestión de usuarios del sistema
- Campos: nombre, email, contraseña, teléfono, rol
- Roles: usuario y administrador
- Validación de email único

### Módulo de Proveedores

- Administración de proveedores
- Campos: nombre, empresa, email, teléfono, dirección
- Búsqueda y filtrado de proveedores

### Módulo de Ventas

- Registro y gestión de ventas
- Campos: cliente, email, monto total, método de pago, estado
- Estados: pendiente, completada, cancelada
- Métodos de pago: efectivo, tarjeta, transferencia

## Configuración del Backend

La aplicación está configurada para conectarse a un backend en `http://localhost:3001/api`. Para cambiar la URL del backend, modificar la constante `API_BASE_URL` en el archivo `src/services/api.js`.

## Notas Importantes

- La aplicación requiere que el backend esté corriendo para funcionar correctamente
- Los modales utilizan Bootstrap para la interfaz de usuario
- La aplicación es totalmente responsiva gracias a Bootstrap
- Se incluyen validaciones básicas en los formularios
- Las operaciones CRUD están implementadas con manejo de errores
