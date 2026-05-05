const API_BASE = 'http://127.0.0.1:8000/api'

async function request(path, options = {}) {
  const token = localStorage.getItem('access_token')
  const headers = {
    ...options.headers,
    'Authorization': token ? `Bearer ${token}` : '',
  }

  const response = await fetch(`${API_BASE}${path}`, { ...options, headers })
  if (!response.ok) {
    if (response.status === 401) {
      localStorage.removeItem('access_token')
      // Let the app state handle the redirection instead of a hard reload
    }
    throw new Error('No se pudo completar la solicitud.')
  }
  if (response.status === 204) {
    return null
  }
  return response.json()
}

export function getItems(genre = '') {
  const query = genre ? `?genre=${encodeURIComponent(genre)}` : ''
  return request(`/items/${query}`)
}

export function getStats() {
  return request('/stats/')
}

export function getRecommendations() {
  return request('/recommendations/')
}

export function createItem(payload) {
  return request('/items/', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(payload),
  })
}

export function updateItem(id, payload) {
  return request(`/items/${id}/`, {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(payload),
  })
}

export function patchItem(id, payload) {
  return request(`/items/${id}/`, {
    method: 'PATCH',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(payload),
  })
}

export function deleteItem(id) {
  return request(`/items/${id}/`, {
    method: 'DELETE',
  })
}
