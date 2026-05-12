import StarRating from '../common/StarRating'
import { getFallbackPoster, getLocalPosterFallback, getMediaPoster } from '../../utils/mediaPosters'
import { motion } from 'framer-motion'
import { 
  Heart, 
  Eye, 
  EyeOff, 
  Edit3, 
  Trash2, 
  Star,
  ChevronRight,
  Filter
} from 'lucide-react'

function MediaList({
  items,
  loading,
  genres,
  genreFilter,
  setGenreFilter,
  showFavoritesOnly,
  setShowFavoritesOnly,
  onEdit,
  onDelete,
  onToggleWatched,
  onToggleFavorite,
  onRate,
  page,
  setPage,
  totalItems,
}) {
  const PAGE_SIZE = 12
  const totalPages = Math.ceil(totalItems / PAGE_SIZE)

  // Logic to show a limited number of page dots if there are many pages
  const getVisiblePages = () => {
    const delta = 2
    const range = []
    for (let i = Math.max(1, page - delta); i <= Math.min(totalPages, page + delta); i++) {
      range.push(i)
    }
    return range
  }

  const visiblePages = getVisiblePages()

  return (
    <article>
      <div className="mb-8 flex flex-wrap items-center justify-between gap-6">
        <div>
          <h2 className="section-title tracking-tight uppercase italic">Descubrir</h2>
          <p className="mt-1 text-sm text-(--text-dim)">Explora tu colección personal de cine y TV</p>
        </div>
        
        <div className="flex items-center gap-3">
          <div className="relative flex items-center">
            <Filter size={14} className="absolute left-3 text-(--text-dim)" />
            <select
              className="appearance-none rounded-xl border border-(--line-soft) bg-white/5 pl-9 pr-10 py-2.5 text-xs font-bold uppercase tracking-widest text-(--text-main) outline-none transition-colors focus:border-(--brand-red)/40 hover:bg-white/10"
              value={genreFilter}
              onChange={(event) => setGenreFilter(event.target.value)}
            >
              <option value="">Todos los géneros</option>
              {genres.map((genre) => (
                <option key={genre} value={genre} className="bg-[#0a0e16]">
                  {genre}
                </option>
              ))}
            </select>
          </div>

          <button
            className={`flex items-center gap-2 rounded-xl border px-4 py-2.5 text-xs font-bold uppercase tracking-widest transition-all ${
              showFavoritesOnly 
                ? 'border-(--brand-red) bg-(--brand-red)/10 text-(--brand-red)' 
                : 'border-(--line-soft) text-(--text-dim) hover:bg-white/5'
            }`}
            onClick={() => setShowFavoritesOnly((prev) => !prev)}
            type="button"
          >
            <Heart size={14} fill={showFavoritesOnly ? 'currentColor' : 'none'} />
            Favoritos
          </button>
        </div>
      </div>

      {loading ? (
        <div className="flex h-64 items-center justify-center">
          <div className="h-8 w-8 animate-spin rounded-full border-4 border-(--brand-red) border-t-transparent" />
        </div>
      ) : items.length === 0 ? (
        <div className="flex flex-col items-center justify-center rounded-3xl border border-dashed border-(--line-soft) bg-white/5 py-20 text-(--text-dim)">
          <Filter size={48} className="mb-4 opacity-20" />
          <p className="font-medium">No se encontraron resultados</p>
          <p className="text-xs uppercase tracking-widest mt-1">Prueba con otros filtros</p>
        </div>
      ) : (
        <>
          <motion.ul 
            layout
            className="grid gap-6 sm:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4"
          >
            {items.map((item, index) => (
              <motion.li 
                key={item.id}
                layout
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.3, delay: index * 0.05 }}
                className="dash-media-card group glass-card"
              >
                <img
                  className="dash-poster-img"
                  src={getMediaPoster(item)}
                  alt={`Poster de ${item.title}`}
                  loading="lazy"
                  onError={(event) => {
                    event.currentTarget.onerror = null
                    const networkFallback = getFallbackPoster(item.content_type)
                    if (event.currentTarget.src === networkFallback) {
                      event.currentTarget.src = getLocalPosterFallback(item.title, item.content_type)
                      return
                    }
                    event.currentTarget.src = networkFallback
                  }}
                />

                <div className="dash-media-overlay translate-y-4 transition-transform group-hover:translate-y-0">
                  <div className="mb-auto flex items-center justify-between opacity-0 transition-opacity duration-300 group-hover:opacity-100">
                    <span className="rounded-lg bg-black/60 px-2 py-1 text-[10px] font-black uppercase tracking-widest text-white backdrop-blur-md border border-white/10">
                      {item.content_type === 'movie' ? 'Pelicula' : 'Serie'}
                    </span>
                    <button
                      onClick={(e) => { e.stopPropagation(); onToggleFavorite(item); }}
                      className={`rounded-full p-2 backdrop-blur-md transition-all ${
                        item.is_favorite ? 'bg-red-500 text-white' : 'bg-black/40 text-white hover:bg-white/20'
                      }`}
                    >
                      <Heart size={16} fill={item.is_favorite ? 'currentColor' : 'none'} />
                    </button>
                  </div>

                  <div>
                    <h3 className="text-xl font-black leading-tight text-white line-clamp-2">{item.title}</h3>
                    <div className="mt-2 flex items-center gap-3 text-[11px] font-bold text-white/70 uppercase tracking-widest">
                      <span>{item.year}</span>
                      <span className="h-1 w-1 rounded-full bg-white/30" />
                      <span className="text-(--brand-red)">{item.genre}</span>
                    </div>

                    <div className="mt-4 flex items-center justify-between border-t border-white/10 pt-4">
                      <div className="flex items-center gap-1.5">
                        <Star size={14} className="text-amber-400" fill="currentColor" />
                        <span className="text-sm font-black text-white">{item.rating.toFixed(1)}</span>
                      </div>
                      
                      <div className="flex items-center gap-2">
                        <button
                          onClick={(e) => { e.stopPropagation(); onEdit(item); }}
                          className="rounded-lg bg-white/10 p-2 text-white hover:bg-white/20 transition-colors"
                          title="Editar"
                        >
                          <Edit3 size={14} />
                        </button>
                        <button
                          onClick={(e) => { e.stopPropagation(); onDelete(item.id); }}
                          className="rounded-lg bg-red-500/20 p-2 text-red-400 hover:bg-red-500 hover:text-white transition-all"
                          title="Eliminar"
                        >
                          <Trash2 size={14} />
                        </button>
                      </div>
                    </div>

                    <button
                      onClick={(e) => { e.stopPropagation(); onToggleWatched(item); }}
                      className={`mt-4 w-full rounded-xl py-2 text-xs font-black uppercase tracking-[0.2em] transition-all flex items-center justify-center gap-2 ${
                        item.watched 
                          ? 'bg-emerald-500 text-white' 
                          : 'bg-white text-black hover:bg-white/90'
                      }`}
                    >
                      {item.watched ? <Eye size={14} /> : <EyeOff size={14} />}
                      {item.watched ? 'Visto' : 'Pendiente'}
                    </button>
                  </div>
                </div>
              </motion.li>
            ))}
          </motion.ul>
          <div className="mt-12 flex flex-col items-center gap-6 border-t border-(--line-soft) pt-10">
            <div className="flex items-center gap-2">
              <button
                onClick={() => setPage(p => Math.max(1, p - 1))}
                disabled={page === 1}
                className="flex h-10 w-10 items-center justify-center rounded-xl border border-(--line-soft) bg-white/5 text-(--text-dim) transition-all hover:bg-white/10 hover:text-white disabled:opacity-30 disabled:hover:bg-white/5"
              >
                <ChevronRight className="rotate-180" size={18} />
              </button>
              
              <div className="flex items-center gap-2 px-4">
                {visiblePages.map((p) => (
                  <button
                    key={p}
                    onClick={() => setPage(p)}
                    className={`h-1.5 w-6 rounded-full transition-all ${
                      page === p ? 'bg-(--brand-red) w-10' : 'bg-(--line-soft) hover:bg-white/20'
                    }`}
                    title={`Página ${p}`}
                  />
                ))}
              </div>

              <button
                onClick={() => setPage(p => Math.min(totalPages, p + 1))}
                disabled={page === totalPages || totalPages === 0}
                className="flex h-10 w-10 items-center justify-center rounded-xl border border-(--line-soft) bg-white/5 text-(--text-dim) transition-all hover:bg-white/10 hover:text-white disabled:opacity-30 disabled:hover:bg-white/5"
              >
                <ChevronRight size={18} />
              </button>
            </div>
            
            <p className="text-[10px] font-black uppercase tracking-[0.3em] text-(--text-dim)">
              Página <span className="text-white">{page}</span> de <span className="text-white">{totalPages}</span>
            </p>
          </div>
        </>
      )}
    </article>
  )
}

export default MediaList
