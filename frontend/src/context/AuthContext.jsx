import { createContext, useContext, useState, useEffect } from 'react'

const AuthContext = createContext()

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const token = localStorage.getItem('access_token')
    if (token) {
      // For now we just assume it's valid, in a real app we'd verify or fetch user profile
      setUser({ username: localStorage.getItem('username') || 'Usuario' })
    }
    setLoading(false)
  }, [])

  const login = async (username, password) => {
    const response = await fetch('http://127.0.0.1:8000/api/auth/login/', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ username, password }),
    })

    if (response.ok) {
      const data = await response.json()
      localStorage.setItem('access_token', data.access)
      localStorage.setItem('refresh_token', data.refresh)
      localStorage.setItem('username', username)
      setUser({ username })
      return { success: true }
    } else {
      const error = await response.json()
      return { success: false, error: error.detail || 'Error al iniciar sesión' }
    }
  }

  const register = async (username, email, password) => {
    const response = await fetch('http://127.0.0.1:8000/api/auth/register/', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ username, email, password }),
    })

    if (response.ok) {
      return { success: true }
    } else {
      const error = await response.json()
      return { success: false, error: Object.values(error).flat().join(', ') }
    }
  }

  const logout = () => {
    localStorage.removeItem('access_token')
    localStorage.removeItem('refresh_token')
    localStorage.removeItem('username')
    setUser(null)
  }

  return (
    <AuthContext.Provider value={{ user, login, logout, register, loading }}>
      {children}
    </AuthContext.Provider>
  )
}

export const useAuth = () => useContext(AuthContext)
