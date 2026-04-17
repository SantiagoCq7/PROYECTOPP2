import { useCallback, useEffect, useMemo, useState } from 'react'
import {
  createItem,
  deleteItem,
  getItems,
  getRecommendations,
  getStats,
  patchItem,
  updateItem,
} from '../services/catalogApi'

const emptyForm = {
  title: '',
  content_type: 'movie',
  genre: '',
  year: new Date().getFullYear(),
  description: '',
  watched: false,
  is_favorite: false,
  rating: 3,
}

export function useCatalogDashboard() {
  const [items, setItems] = useState([])
  const [stats, setStats] = useState(null)
  const [recommendations, setRecommendations] = useState([])
  const [favoriteGenre, setFavoriteGenre] = useState('')
  const [genreFilter, setGenreFilter] = useState('')
  const [form, setForm] = useState(emptyForm)
  const [editingId, setEditingId] = useState(null)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')

  const loadData = useCallback(async (genre = genreFilter) => {
    setLoading(true)
    setError('')

    try {
      const [itemsData, statsData, recommendationData] = await Promise.all([
        getItems(genre),
        getStats(),
        getRecommendations(),
      ])
      setItems(itemsData)
      setStats(statsData)
      setRecommendations(recommendationData.results ?? [])
      setFavoriteGenre(recommendationData.favorite_genre ?? '')
    } catch (err) {
      setError(err.message)
    } finally {
      setLoading(false)
    }
  }, [genreFilter])

  useEffect(() => {
    loadData(genreFilter)
  }, [genreFilter, loadData])

  const genres = useMemo(() => {
    const allGenres = items.map((item) => item.genre.trim()).filter(Boolean)
    return [...new Set(allGenres)].sort((a, b) => a.localeCompare(b))
  }, [items])

  const resetForm = () => {
    setForm(emptyForm)
    setEditingId(null)
  }

  const handleSubmit = async (event) => {
    event.preventDefault()
    setError('')

    const payload = {
      ...form,
      year: Number(form.year),
      rating: Number(form.rating),
    }

    try {
      if (editingId) {
        await updateItem(editingId, payload)
      } else {
        await createItem(payload)
      }

      resetForm()
      await loadData(genreFilter)
    } catch (err) {
      setError(err.message)
    }
  }

  const handleEdit = (item) => {
    setEditingId(item.id)
    setForm({
      title: item.title,
      content_type: item.content_type,
      genre: item.genre,
      year: item.year,
      description: item.description,
      watched: item.watched,
      is_favorite: item.is_favorite,
      rating: item.rating,
    })
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  const handleDelete = async (id) => {
    const confirmed = window.confirm('Deseas eliminar este contenido?')
    if (!confirmed) {
      return
    }

    try {
      await deleteItem(id)
      await loadData(genreFilter)
    } catch (err) {
      setError(err.message)
    }
  }

  const updateQuickField = async (item, patch) => {
    try {
      await patchItem(item.id, patch)
      await loadData(genreFilter)
    } catch (err) {
      setError(err.message)
    }
  }

  return {
    items,
    stats,
    recommendations,
    favoriteGenre,
    genres,
    genreFilter,
    setGenreFilter,
    form,
    setForm,
    editingId,
    loading,
    error,
    handleSubmit,
    handleEdit,
    handleDelete,
    updateQuickField,
    resetForm,
  }
}
