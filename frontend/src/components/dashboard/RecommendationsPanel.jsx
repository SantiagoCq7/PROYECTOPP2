import { getFallbackPoster, getLocalPosterFallback, getMediaPoster } from '../../utils/mediaPosters'

function RecommendationsPanel({ favoriteGenre, recommendations, onEdit }) {
  return (
    <article className="panel-animate">
      <div className="mb-3 flex items-center justify-between">
        <h2 className="section-title">Recomendado para ti</h2>
        <div className="flex items-center gap-4">
          {favoriteGenre && <p className="text-xs uppercase tracking-[0.12em] text-(--text-dim)">{favoriteGenre}</p>}
          <span className="text-(--text-dim)">‹</span>
          <span className="text-(--text-dim)">›</span>
        </div>
      </div>

      <div className="dash-scroll-row">
        {recommendations.length === 0 ? (
          <div className="dash-empty-card">Aun no hay recomendaciones para tu perfil.</div>
        ) : (
          recommendations.map((item) => (
            <article className="dash-promo-card" key={item.id}>
              <img
                className="dash-promo-image"
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
              <div className="dash-promo-overlay" />
              <div className="relative z-10 p-4">
                <p className="text-[10px] font-bold uppercase tracking-[0.16em] text-(--brand-red)">Populares</p>
                <h3 className="mt-1 text-4xl font-black leading-none">{item.title}</h3>
                <p className="text-xs uppercase tracking-[0.13em] text-(--text-dim)">{item.genre} · {item.year}</p>
                <button className="mt-4 rounded-sm bg-white px-3 py-2 text-xs font-black uppercase text-black" onClick={() => onEdit(item)} type="button">
                  Ver detalles
                </button>
              </div>
            </article>
          ))
        )}
      </div>
    </article>
  )
}

export default RecommendationsPanel
