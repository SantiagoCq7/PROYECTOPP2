import json
import os
from urllib.parse import urlencode
from urllib.request import Request, urlopen


TMDB_BASE_URL = 'https://api.themoviedb.org/3'


class TMDBClientError(Exception):
    pass


def _auth_token():
    token = os.getenv('TMDB_BEARER_TOKEN', '').strip()
    if not token:
        raise TMDBClientError(
            'Falta TMDB_BEARER_TOKEN en variables de entorno. '
            'Genera tu token en TMDB y exportalo antes de importar.'
        )
    return token


def _request_json(path, params=None):
    query = f"?{urlencode(params or {})}" if params else ''
    url = f'{TMDB_BASE_URL}{path}{query}'

    request = Request(
        url,
        headers={
            'Authorization': f'Bearer {_auth_token()}',
            'accept': 'application/json',
        },
    )

    try:
        with urlopen(request, timeout=20) as response:
            payload = response.read().decode('utf-8')
            return json.loads(payload)
    except Exception as exc:
        raise TMDBClientError(f'Error consultando TMDB: {exc}') from exc


def get_genres(content_type='movie', language='es-ES'):
    endpoint = '/genre/movie/list' if content_type == 'movie' else '/genre/tv/list'
    data = _request_json(endpoint, {'language': language})
    return {genre['id']: genre['name'] for genre in data.get('genres', [])}


def discover(content_type='movie', page=1, language='es-ES', sort_by='popularity.desc'):
    endpoint = '/discover/movie' if content_type == 'movie' else '/discover/tv'
    return _request_json(
        endpoint,
        {
            'language': language,
            'sort_by': sort_by,
            'page': page,
            'include_adult': 'false',
            'include_video': 'false',
        },
    )


def to_media_item_payload(raw_item, content_type, genre_map):
    title = raw_item.get('title') if content_type == 'movie' else raw_item.get('name')
    date_value = raw_item.get('release_date') if content_type == 'movie' else raw_item.get('first_air_date')
    if not title or not date_value:
        return None

    year = int(date_value[:4]) if len(date_value) >= 4 and date_value[:4].isdigit() else None
    if not year:
        return None

    genre_ids = raw_item.get('genre_ids') or []
    genre_names = [genre_map.get(genre_id) for genre_id in genre_ids if genre_map.get(genre_id)]
    genre_value = ', '.join(genre_names[:2]) if genre_names else 'Sin genero'

    vote_average = float(raw_item.get('vote_average') or 0)
    rating = round(vote_average / 2)
    rating = max(1, min(5, rating))

    return {
        'title': title.strip(),
        'content_type': content_type if content_type in ('movie', 'series') else 'movie',
        'genre': genre_value,
        'year': year,
        'description': (raw_item.get('overview') or '').strip(),
        'rating': rating,
    }
