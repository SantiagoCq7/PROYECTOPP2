import StarRating from '../common/StarRating'
import { getFallbackPoster, getLocalPosterFallback, getMediaPoster } from '../../utils/mediaPosters'

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
}) {
  return (
    <article className="panel-animate">
      <div className="mb-4 flex flex-wrap items-center justify-between gap-4">
        <h2 className="section-title">Nuevos lanzamientos</h2>
        <div className="flex items-center gap-2">
          <label className="text-xs font-bold uppercase tracking-[0.14em] text-(--text-dim)">Genero</label>
          <select
            className="rounded-md border border-(--line-soft) bg-(--panel-1) px-3 py-2 text-sm"
            value={genreFilter}
            onChange={(event) => setGenreFilter(event.target.value)}
          >
            <option value="">Todos</option>
            {genres.map((genre) => (
              <option key={genre} value={genre}>
                {genre}
              </option>
            ))}
          </select>
          <button
            className={`rounded-md border px-3 py-2 text-xs font-bold uppercase tracking-[0.1em] ${showFavoritesOnly ? 'border-(--brand-red) bg-(--brand-red)/20 text-white' : 'border-(--line-soft) text-(--text-dim)'}`}
            onClick={() => setShowFavoritesOnly((prev) => !prev)}
            type="button"
          >
            Favoritos
          </button>
          <span className="ml-2 text-[10px] font-bold uppercase tracking-[0.14em] text-(--text-dim)">Ver todos</span>
        </div>
      </div>

      {loading ? (
        <p className="text-(--text-dim)">Cargando...</p>
      ) : items.length === 0 ? (
        <div className="dash-empty-card">No hay contenidos registrados todavia.</div>
      ) : (
        <ul className="grid gap-4 sm:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4">
          {items.map((item) => (
            <li className="dash-media-card" key={item.id}>
              <div className="dash-poster">
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

                <div className="dash-media-content p-3">
                  <div className="flex items-start justify-between gap-2">
                    <h3 className="text-base font-bold leading-tight text-white">{item.title}</h3>
                    <div className="flex items-center gap-2">
                      <button
                        className={`text-base ${item.is_favorite ? 'text-amber-300' : 'text-slate-200 hover:text-amber-200'}`}
                        onClick={() => onToggleFavorite(item)}
                        title="Marcar como favorito"
                        type="button"
                      >
                        {item.is_favorite ? '❤' : '♡'}
                      </button>
                      <span className="text-xs font-bold text-(--brand-red)">{item.rating.toFixed(1)}</span>
                    </div>
                  </div>

                  <p className="dash-media-meta mt-1 text-[11px] uppercase tracking-[0.12em] text-slate-100">
                    {item.content_type === 'movie' ? 'Pelicula' : 'Serie'} · {item.genre} · {item.year}
                  </p>

                  <p className="mt-2 max-h-10 overflow-hidden text-xs text-slate-100/95">{item.description || 'Sin descripcion.'}</p>

                  <div className="mt-3 flex flex-wrap items-center gap-2">
                    <button
                      className={`rounded-sm border px-2 py-1 text-[10px] font-bold uppercase tracking-[0.1em] ${item.watched ? 'border-emerald-300/60 bg-emerald-500/25 text-emerald-100' : 'border-slate-300/40 bg-slate-500/25 text-slate-100'}`}
                      type="button"
                      onClick={() => onToggleWatched(item)}
                    >
                      {item.watched ? 'Visto' : 'Pendiente'}
                    </button>

                    <StarRating value={item.rating} onChange={(star) => onRate(item, star)} size="text-base" />
                  </div>

                  <div className="mt-3 flex gap-2">
                    <button
                      className="rounded-sm border border-slate-200/40 bg-black/25 px-2 py-1 text-xs font-semibold text-slate-100"
                      onClick={() => onEdit(item)}
                      type="button"
                    >
                      Editar
                    </button>
                    <button
                      className="rounded-sm border border-red-300/45 bg-black/25 px-2 py-1 text-xs font-semibold text-red-100"
                      onClick={() => onDelete(item.id)}
                      type="button"
                    >
                      Eliminar
                    </button>
                  </div>
                </div>
              </div>
            </li>
          ))}
        </ul>
      )}
    </article>
  )
}

export default MediaList
