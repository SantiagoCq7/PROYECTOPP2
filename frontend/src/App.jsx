import MediaForm from './components/dashboard/MediaForm'
import MediaList from './components/dashboard/MediaList'
import RecommendationsPanel from './components/dashboard/RecommendationsPanel'
import { useCatalogDashboard } from './hooks/useCatalogDashboard'
import { useMemo, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { useAuth } from './context/AuthContext'
import Login from './pages/Login'
import Register from './pages/Register'
import { 
  Search, 
  Home, 
  Compass, 
  User, 
  Plus, 
  X, 
  LayoutGrid, 
  Activity,
  Clapperboard,
  LogOut
} from 'lucide-react'

function App() {
  const { user, logout, loading: authLoading } = useAuth()
  const [authMode, setAuthMode] = useState('login') // 'login' or 'register'
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
    page,
    setPage,
    totalItems,
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

  if (authLoading) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-(--app-bg)">
        <div className="h-12 w-12 animate-spin rounded-full border-4 border-(--brand-red) border-t-transparent" />
      </div>
    )
  }

  if (!user) {
    return authMode === 'login' 
      ? <Login onSwitchToRegister={() => setAuthMode('register')} /> 
      : <Register onSwitchToLogin={() => setAuthMode('login')} />
  }

  return (
    <main className="min-h-screen bg-(--app-bg) text-(--text-main) selection:bg-(--brand-red)/30">
      <div className="app-shell mx-auto flex h-screen w-full max-w-[1600px] overflow-hidden lg:my-6 lg:h-[calc(100vh-3rem)] lg:rounded-3xl border border-(--line-soft) bg-(--panel-0) backdrop-blur-3xl shadow-2xl">
        
        {/* Sidebar */}
        <aside className="sidebar-blur hidden w-[260px] border-r border-(--line-soft) px-6 py-8 lg:flex lg:flex-col">
          <div className="mb-10 flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-(--brand-red) shadow-[0_0_20px_var(--brand-red-glow)]">
              <Clapperboard size={22} className="text-white" />
            </div>
            <span className="text-xl font-black tracking-tight uppercase italic">Cinelog</span>
          </div>
          
          <nav className="flex-1 space-y-1.5">
            <p className="mb-4 px-2 text-[10px] font-bold uppercase tracking-[0.2em] text-(--text-dim)">Menu Principal</p>
            <button className="dash-nav-item dash-nav-item-active" type="button">
              <Home size={18} />
              <span>Inicio</span>
            </button>
            <button className="dash-nav-item" type="button">
              <Compass size={18} />
              <span>Explorar</span>
            </button>
            <button className="dash-nav-item" type="button">
              <Activity size={18} />
              <span>Mi Actividad</span>
            </button>
            
            <p className="mb-4 mt-8 px-2 text-[10px] font-bold uppercase tracking-[0.2em] text-(--text-dim)">Biblioteca</p>
            <button className="dash-nav-item" type="button">
              <LayoutGrid size={18} />
              <span>Géneros</span>
            </button>
            <button className="dash-nav-item" type="button">
              <User size={18} />
              <span>Perfil</span>
            </button>
            
            <div className="pt-8">
              <button 
                onClick={logout}
                className="dash-nav-item text-red-400 hover:bg-red-500/10 hover:text-red-300" 
                type="button"
              >
                <LogOut size={18} />
                <span>Cerrar Sesión</span>
              </button>
            </div>
          </nav>

          <div className="mt-auto flex items-center gap-3 rounded-2xl border border-(--line-soft) bg-white/5 p-3 backdrop-blur-md">
            <div className="relative h-10 w-10">
              <img 
                src={`https://api.dicebear.com/7.x/avataaars/svg?seed=${user.username}`} 
                alt="Avatar" 
                className="h-full w-full rounded-xl bg-(--brand-red)/20"
              />
              <div className="absolute -right-0.5 -top-0.5 h-3 w-3 rounded-full border-2 border-[#0a0e16] bg-emerald-500" />
            </div>
            <div className="overflow-hidden">
              <p className="truncate text-sm font-bold text-(--text-main)">{user.username}</p>
              <p className="truncate text-[10px] text-(--text-dim)">Coleccionista</p>
            </div>
          </div>
        </aside>

        {/* Main Content */}
        <section className="flex-1 overflow-y-auto">
          <header className="sticky top-0 z-30 flex items-center justify-between gap-4 border-b border-(--line-soft) bg-(--panel-0)/80 px-4 py-4 backdrop-blur-xl lg:px-10">
            <div className="relative flex-1 max-w-2xl">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-(--text-dim)" size={18} />
              <input
                className="w-full rounded-2xl border border-transparent bg-white/5 py-3 pl-12 pr-4 text-sm text-(--text-main) outline-none transition-all focus:border-(--brand-red)/30 focus:bg-white/10"
                placeholder="Buscar películas, series, géneros..."
                value={search}
                onChange={(event) => setSearch(event.target.value)}
              />
            </div>

            <div className="flex items-center gap-4">
              <div className="hidden h-10 w-10 items-center justify-center rounded-xl bg-white/5 text-(--text-dim) hover:bg-white/10 cursor-pointer lg:flex">
                <Compass size={20} />
              </div>
              <button 
                onClick={openForm}
                className="flex items-center gap-2 rounded-xl bg-(--brand-red) px-5 py-2.5 text-sm font-bold text-white shadow-[0_10px_20px_var(--brand-red-glow)] transition-transform hover:scale-105 active:scale-95"
              >
                <Plus size={18} strokeWidth={3} />
                <span className="hidden sm:inline">Agregar</span>
              </button>
            </div>
          </header>

          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="space-y-12 px-4 py-8 lg:px-10 lg:py-12"
          >
            {error && (
              <div className="rounded-2xl border border-red-500/20 bg-red-500/10 p-4 text-sm text-red-400 backdrop-blur-md">
                {error}
              </div>
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
              page={page}
              setPage={setPage}
              totalItems={totalItems}
            />
          </motion.div>
        </section>
      </div>

      {/* Floating Action Button (Mobile Only) */}
      <button
        className="fixed bottom-6 right-6 z-40 grid h-16 w-16 place-items-center rounded-2xl bg-(--brand-red) text-white shadow-[0_15px_30px_var(--brand-red-glow)] lg:hidden transition-transform hover:scale-110"
        onClick={openForm}
        type="button"
      >
        <Plus size={32} />
      </button>

      {/* Modal Form */}
      <AnimatePresence>
        {showForm && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={closeForm}
              className="absolute inset-0 bg-black/80 backdrop-blur-sm"
            />
            <motion.div 
              initial={{ opacity: 0, scale: 0.9, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: 20 }}
              className="relative w-full max-w-3xl overflow-hidden rounded-3xl border border-(--line-soft) bg-(--panel-0) shadow-2xl"
            >
              <div className="flex items-center justify-between border-b border-(--line-soft) px-8 py-6">
                <div>
                  <h2 className="text-2xl font-black italic tracking-tight uppercase">
                    {editingId ? 'Editar Contenido' : 'Nuevo Contenido'}
                  </h2>
                  <p className="text-xs text-(--text-dim) uppercase tracking-widest mt-1">Gestión de Catálogo</p>
                </div>
                <button 
                  className="rounded-xl bg-white/5 p-2 text-(--text-dim) transition-colors hover:bg-white/10 hover:text-white" 
                  onClick={closeForm}
                >
                  <X size={24} />
                </button>
              </div>

              <div className="max-h-[70vh] overflow-y-auto p-8">
                <MediaForm
                  form={form}
                  setForm={setForm}
                  editingId={editingId}
                  onSubmit={handleCreateOrUpdate}
                  onCancel={closeForm}
                />
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </main>
  )
}

export default App
