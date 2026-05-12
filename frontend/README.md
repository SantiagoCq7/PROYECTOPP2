# 🎨 Frontend - Gestor de Películas y Series

Este es el frontend del proyecto, desarrollado con **React**, **Vite** y **TailwindCSS v4**.

## 🛠️ Instalación y Ejecución

Para ver las instrucciones completas sobre cómo instalar y ejecutar todo el proyecto (Backend + Frontend), por favor dirígete al [README.md](../README.md) principal en la raíz del repositorio.

Si solo deseas trabajar en el frontend, estos son los comandos básicos:

```bash
# Instalar dependencias
npm install

# Iniciar el servidor de desarrollo en http://localhost:5173
npm run dev
```

## 🏗️ Estructura de la carpeta
- `src/components/`: Componentes reutilizables de UI (tarjetas, modales, etc).
- `src/hooks/`: Custom hooks como `useCatalogDashboard.js` para manejar la lógica de estado y peticiones a la API.
- `src/services/`: Lógica de integración con la API del backend (`catalogApi.js`).
- `src/main.jsx`: Punto de entrada de la aplicación React.

## 🔗 Conexión con el Backend
El frontend espera que el backend de Django esté corriendo en `http://127.0.0.1:8000/api/` para poder obtener y enviar datos. Asegúrate de tenerlo en ejecución antes de utilizar la aplicación completa.
