# Gestor de Peliculas y Series

Aplicacion web full stack para gestionar peliculas y series vistas o pendientes, con calificaciones, filtros por genero, estadisticas y recomendaciones basicas.

## Stack
- Backend: Django + Django REST Framework + SQLite
- Frontend: React (Vite) + TailwindCSS v4

## Funcionalidades implementadas
- Alta, edicion y eliminacion de peliculas/series
- Marcar contenido como visto/no visto
- Calificacion por estrellas (1 a 5)
- Filtro por genero
- Estadisticas: genero mas visto, total vistos, promedio, peliculas vs series
- Recomendaciones: no vistos del genero favorito

## Estructura
- `backend/`: configuracion del proyecto Django
- `catalog/`: modelo, API y logica de estadisticas/recomendaciones
- `frontend/`: interfaz React + Tailwind

## Ejecutar backend
```powershell
c:/Users/santi/Desktop/PROYECTOPP2/.venv/Scripts/python.exe -m pip install -r requirements.txt
c:/Users/santi/Desktop/PROYECTOPP2/.venv/Scripts/python.exe manage.py migrate
c:/Users/santi/Desktop/PROYECTOPP2/.venv/Scripts/python.exe manage.py runserver
```

## Seed de datos de prueba
```powershell
# Carga o actualiza el dataset base
c:/Users/santi/Desktop/PROYECTOPP2/.venv/Scripts/python.exe manage.py seed_catalog

# Borra todo y vuelve a sembrar desde cero
c:/Users/santi/Desktop/PROYECTOPP2/.venv/Scripts/python.exe manage.py seed_catalog --reset
```

## Importar catalogo desde TMDB
1) Crea un token Bearer en TMDB (Settings > API).
2) Exporta la variable de entorno en la terminal actual:

```powershell
$env:TMDB_BEARER_TOKEN = 'TU_TOKEN_TMDB'
```

3) Ejecuta la importacion paginada:

```powershell
# Importa peliculas y series (1 pagina por tipo)
c:/Users/santi/Desktop/PROYECTOPP2/.venv/Scripts/python.exe manage.py import_tmdb --type both --pages 1 --language es-ES

# Ejemplo: 5 paginas solo peliculas
c:/Users/santi/Desktop/PROYECTOPP2/.venv/Scripts/python.exe manage.py import_tmdb --type movie --pages 5 --language es-ES

# Opcional: borrar catalogo local antes de importar
c:/Users/santi/Desktop/PROYECTOPP2/.venv/Scripts/python.exe manage.py import_tmdb --type both --pages 3 --reset
```

Notas:
- La importacion no cambia la interfaz del frontend ni su estilo visual actual.
- Para items existentes, solo actualiza genero y descripcion (respeta watched/favoritos/rating del usuario).

Backend disponible en: `http://127.0.0.1:8000`
API en: `http://127.0.0.1:8000/api/`

## Ejecutar frontend
```powershell
Set-Location frontend
npm install
npm run dev
```

Frontend disponible en: `http://localhost:5173`

## Endpoints principales
- `GET/POST /api/items/`
- `GET/PUT/PATCH/DELETE /api/items/{id}/`
- `GET /api/stats/`
- `GET /api/recommendations/`
