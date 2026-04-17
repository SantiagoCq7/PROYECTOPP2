import MediaForm from './components/dashboard/MediaForm'
import MediaList from './components/dashboard/MediaList'
import RecommendationsPanel from './components/dashboard/RecommendationsPanel'
import { useCatalogDashboard } from './hooks/useCatalogDashboard'
import { useMemo, useState } from 'react'

function App() {
  const [search, setSearch] = useState('')
  const [showForm, setShowForm] = useState(false)
  const [showFavoritesOnly, setShowFavoritesOnly] = useState(false)

  const {
    items,
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
  } = useCatalogDashboard()

  const filteredItems = useMemo(() => {
    const query = search.trim().toLowerCase()
    return items.filter((item) => {
      if (showFavoritesOnly && !item.is_favorite) {
        return false
      }
      if (!query) {
        return true
      }
      const blob = `${item.title} ${item.genre} ${item.description}`.toLowerCase()
      return blob.includes(query)
    })
  }, [items, search, showFavoritesOnly])

  const filteredRecommendations = useMemo(() => {
    const query = search.trim().toLowerCase()
    if (!query) {
      return recommendations
    }

    return recommendations.filter((item) => {
      const blob = `${item.title} ${item.genre} ${item.description}`.toLowerCase()
      return blob.includes(query)
    })
  }, [recommendations, search])

  const openForm = () => setShowForm(true)

  const closeForm = () => {
    setShowForm(false)
    resetForm()
  }

  const handleCreateOrUpdate = async (event) => {
    await handleSubmit(event)
    setShowForm(false)
  }

  const handleEditAndOpen = (item) => {
    handleEdit(item)
    setShowForm(true)
  }

  return (
    <main className="min-h-screen bg-(--app-bg) text-(--text-main)">
      <div className="app-shell mx-auto flex min-h-screen w-full max-w-[1460px] gap-0 overflow-hidden border border-(--line-soft) bg-(--panel-0) lg:my-3 lg:min-h-[calc(100vh-1.5rem)] lg:rounded-xl">
        <aside className="hidden w-[138px] border-r border-(--line-soft) bg-(--panel-0) px-3 py-4 lg:flex lg:flex-col">
          <div className="mb-8 flex items-center gap-1 text-base font-bold tracking-wide">
            <span className="text-(--brand-red)">▣</span>
            <span>CINELOG</span>
          </div>
          <nav className="space-y-2 text-xs font-semibold uppercase tracking-[0.13em] text-(--text-dim)">
            <button className="dash-nav-item" type="button">⌂ Inicio</button>
            <button className="dash-nav-item dash-nav-item-active" type="button">⦿ Explorar</button>
            <button className="dash-nav-item" type="button">◌ Perfil</button>
          </nav>
          <div className="mt-auto flex items-center gap-2 rounded-xl border border-(--line-soft) bg-(--panel-1) p-2 text-xs">
            <div className="grid h-6 w-6 place-items-center rounded-full bg-(--brand-red) text-[10px] font-bold">JD</div>
            <div>
              <p className="font-bold text-(--text-main)">Juan</p>
              <p className="text-[10px] text-(--text-dim)">Power user</p>
            </div>
          </div>
        </aside>

        <section className="flex-1">
          <header className="sticky top-0 z-20 flex items-center justify-between gap-2 border-b border-(--line-soft) bg-(--panel-0)/95 px-3 py-3 backdrop-blur lg:px-6">
            <div className="flex items-center gap-2">
              <button className="rounded-sm bg-(--brand-red) px-4 py-2 text-[11px] font-bold uppercase tracking-[0.14em] text-white">
                Explorar
              </button>
              <button className="rounded-sm border border-(--line-soft) px-3 py-2 text-[11px] font-semibold uppercase tracking-[0.12em] text-(--text-dim)">
                Mi actividad
              </button>
            </div>

            <input
              className="w-full max-w-xl rounded-sm border border-(--line-soft) bg-(--panel-1) px-4 py-2 text-sm text-(--text-main) outline-none focus:border-(--brand-red)"
              placeholder="Buscar peliculas, series, directores..."
              value={search}
              onChange={(event) => setSearch(event.target.value)}
            />

            <div className="hidden w-8 text-center text-lg text-(--text-dim) md:block">◦</div>
          </header>

          <div className="space-y-8 px-3 py-5 lg:px-6">

            {error && (
              <section className="rounded-xl border border-red-600/40 bg-red-950/40 p-3 text-sm text-red-300">
                {error}
              </section>
            )}

            <RecommendationsPanel
              favoriteGenre={favoriteGenre}
              recommendations={filteredRecommendations}
              onEdit={handleEditAndOpen}
            />

            <MediaList
              items={filteredItems}
              loading={loading}
              genres={genres}
              genreFilter={genreFilter}
              setGenreFilter={setGenreFilter}
              showFavoritesOnly={showFavoritesOnly}
              setShowFavoritesOnly={setShowFavoritesOnly}
              onEdit={handleEditAndOpen}
              onDelete={handleDelete}
              onToggleWatched={(item) => updateQuickField(item, { watched: !item.watched })}
              onToggleFavorite={(item) => updateQuickField(item, { is_favorite: !item.is_favorite })}
              onRate={(item, star) => updateQuickField(item, { rating: star })}
            />
          </div>
        </section>
      </div>

      <button
        className="fixed bottom-6 right-6 z-40 grid h-14 w-14 place-items-center rounded-full bg-(--brand-red) text-3xl text-white shadow-[0_10px_30px_rgba(255,44,44,.45)] hover:brightness-110"
        onClick={openForm}
        type="button"
      >
        +
      </button>

      {showForm && (
        <div className="fixed inset-0 z-50 grid place-items-center bg-black/70 px-4">
          <div className="max-h-[92vh] w-full max-w-3xl overflow-y-auto rounded-2xl border border-(--line-soft) bg-(--panel-0) p-5">
            <div className="mb-4 flex items-center justify-between">
              <h2 className="text-xl font-bold">{editingId ? 'Editar contenido' : 'Nuevo contenido'}</h2>
              <button className="rounded-md border border-(--line-soft) px-3 py-1 text-sm" onClick={closeForm} type="button">
                Cerrar
              </button>
            </div>

            <MediaForm
              form={form}
              setForm={setForm}
              editingId={editingId}
              onSubmit={handleCreateOrUpdate}
              onCancel={closeForm}
            />
          </div>
        </div>
      )}
    </main>
  )
}

export default App
