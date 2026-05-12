# 🎬 Gestor de Películas y Series

Aplicación web full stack para gestionar películas y series vistas o pendientes, con calificaciones, filtros por género, estadísticas y recomendaciones.

## 🚀 Tecnologías (Stack)
- **Backend:** Django + Django REST Framework + SQLite
- **Frontend:** React (Vite) + TailwindCSS v4

## ⚙️ Requisitos Previos
- [Python 3.10+](https://www.python.org/downloads/)
- [Node.js 18+](https://nodejs.org/)

---

## 🛠️ Instalación y Ejecución Local

Sigue estos pasos para configurar y ejecutar el proyecto en tu máquina.

### 1️⃣ Clonar el repositorio
```bash
git clone <url-del-repositorio>
cd PROYECTOPP2
```

### 2️⃣ Configurar y ejecutar el Backend (Django)

Abre una terminal en la carpeta raíz del proyecto y ejecuta:

```powershell
# 1. Crear entorno virtual
python -m venv .venv

# 2. Activar el entorno virtual
# En Windows (PowerShell):
.\.venv\Scripts\Activate.ps1
# En Windows (CMD):
# .\.venv\Scripts\activate.bat
# En Linux/Mac:
# source .venv/bin/activate

# 3. Instalar dependencias
pip install -r requirements.txt

# 4. Aplicar migraciones de la base de datos
python manage.py migrate

# 5. Cargar datos de prueba (Opcional)
python manage.py seed_catalog

# 6. Crear un superusuario (opcional, para panel de administración)
python manage.py createsuperuser

# 7. Iniciar el servidor de desarrollo
python manage.py runserver
```
📍 El backend (API) estará disponible en: `http://127.0.0.1:8000/api/`
🔐 El panel de administración estará en: `http://127.0.0.1:8000/admin/`

*(Nota: Para borrar la base de datos y volver a cargar los datos de prueba, puedes usar: `python manage.py seed_catalog --reset`)*

### 3️⃣ Configurar y ejecutar el Frontend (React)

Abre **otra** terminal, navega a la carpeta `frontend` y ejecuta:

```powershell
# 1. Navegar a la carpeta frontend
cd frontend

# 2. Instalar dependencias de Node
npm install

# 3. Iniciar el servidor de desarrollo de Vite
npm run dev
```
📍 El frontend estará disponible en: `http://localhost:5173`

---

## 🌟 Funcionalidades Principales
- **Gestión de Contenido:** Alta, edición y eliminación de películas y series.
- **Seguimiento:** Marcar contenido como visto o pendiente.
- **Calificaciones:** Sistema de calificación por estrellas (1 a 5).
- **Filtros:** Búsqueda rápida por género.
- **Panel de Estadísticas:** Género más visto, total de vistas, promedio de calificaciones y comparativa entre películas y series.
- **Recomendaciones:** Sugerencias automáticas de contenido no visto basado en tus géneros favoritos.

---

## 📦 Importar Catálogo desde TMDB (Opcional)

Puedes poblar la base de datos con contenido real desde The Movie Database (TMDB):

1. Obtén un token Bearer en [TMDB (Settings > API)](https://www.themoviedb.org/settings/api).
2. Exporta la variable de entorno en tu terminal actual:
   ```powershell
   $env:TMDB_BEARER_TOKEN="TU_TOKEN_TMDB"
   ```
3. Ejecuta el comando de importación:
   ```powershell
   # Importar películas y series (1 página por tipo) en español
   python manage.py import_tmdb --type both --pages 1 --language es-ES

   # Ejemplo: importar 5 páginas solo de películas
   python manage.py import_tmdb --type movie --pages 5 --language es-ES

   # Opcional: borrar el catálogo local existente antes de importar
   python manage.py import_tmdb --type both --pages 3 --reset
   ```

*Nota: La importación respeta los items existentes (rating, visto, etc.) y solo actualiza sus metadatos (descripción, géneros).*

---

## 📂 Estructura del Proyecto
- `backend/`: Configuración principal del proyecto Django (`settings.py`, `urls.py`).
- `catalog/`: Aplicación que contiene los modelos (`Item`), lógica de la API, endpoints de estadísticas y recomendaciones.
- `frontend/`: Proyecto React (Vite) con componentes de UI, hooks (`useCatalogDashboard.js`) y configuración de Tailwind.
- `manage.py`: Script principal para la ejecución de comandos del backend.
