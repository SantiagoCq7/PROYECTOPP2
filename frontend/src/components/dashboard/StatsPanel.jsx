function StatsPanel({ stats }) {
  return (
    <article className="panel-animate rounded-2xl border border-(--line-soft) bg-(--panel-1) p-5">
      <h2 className="mb-4 text-sm font-bold uppercase tracking-[0.14em] text-(--text-dim)">Estadisticas</h2>
      {!stats ? (
        <p className="text-(--text-dim)">Sin datos disponibles.</p>
      ) : (
        <ul className="grid grid-cols-2 gap-3 text-sm">
          <li className="rounded-md bg-(--panel-0) p-3">Total vistos: <strong>{stats.total_watched}</strong></li>
          <li className="rounded-md bg-(--panel-0) p-3">Genero top: <strong>{stats.top_genre || 'Sin datos'}</strong></li>
          <li className="rounded-md bg-(--panel-0) p-3">Favoritos: <strong>{stats.total_favorites}</strong></li>
          <li className="rounded-md bg-(--panel-0) p-3">Promedio: <strong>{stats.average_rating}</strong></li>
          <li className="rounded-md bg-(--panel-0) p-3">Peliculas: <strong>{stats.watched_movies}</strong></li>
          <li className="rounded-md bg-(--panel-0) p-3">Series: <strong>{stats.watched_series}</strong></li>
        </ul>
      )}
    </article>
  )
}

export default StatsPanel
