import StarRating from '../common/StarRating'

function MediaForm({ form, setForm, editingId, onSubmit, onCancel }) {
  return (
    <article className="panel-animate rounded-2xl border border-(--line-soft) bg-(--panel-1) p-6">
      <h2 className="mb-4 text-lg font-bold uppercase tracking-[0.08em]">{editingId ? 'Editar contenido' : 'Agregar contenido'}</h2>
      <form className="space-y-4" onSubmit={onSubmit}>
        <div>
          <label className="mb-1 block text-xs font-bold uppercase tracking-[0.1em] text-(--text-dim)">Titulo</label>
          <input
            className="w-full rounded-md border border-(--line-soft) bg-(--panel-0) px-3 py-2 text-sm"
            required
            value={form.title}
            onChange={(event) => setForm({ ...form, title: event.target.value })}
          />
        </div>

        <div className="grid gap-3 sm:grid-cols-2">
          <div>
            <label className="mb-1 block text-xs font-bold uppercase tracking-[0.1em] text-(--text-dim)">Tipo</label>
            <select
              className="w-full rounded-md border border-(--line-soft) bg-(--panel-0) px-3 py-2 text-sm"
              value={form.content_type}
              onChange={(event) => setForm({ ...form, content_type: event.target.value })}
            >
              <option value="movie">Pelicula</option>
              <option value="series">Serie</option>
            </select>
          </div>
          <div>
            <label className="mb-1 block text-xs font-bold uppercase tracking-[0.1em] text-(--text-dim)">Anio</label>
            <input
              className="w-full rounded-md border border-(--line-soft) bg-(--panel-0) px-3 py-2 text-sm"
              type="number"
              min="1900"
              max="2100"
              value={form.year}
              onChange={(event) => setForm({ ...form, year: event.target.value })}
            />
          </div>
        </div>

        <div>
          <label className="mb-1 block text-xs font-bold uppercase tracking-[0.1em] text-(--text-dim)">Genero</label>
          <input
            className="w-full rounded-md border border-(--line-soft) bg-(--panel-0) px-3 py-2 text-sm"
            required
            value={form.genre}
            onChange={(event) => setForm({ ...form, genre: event.target.value })}
          />
        </div>

        <div>
          <label className="mb-1 block text-xs font-bold uppercase tracking-[0.1em] text-(--text-dim)">Descripcion</label>
          <textarea
            className="h-24 w-full rounded-md border border-(--line-soft) bg-(--panel-0) px-3 py-2 text-sm"
            value={form.description}
            onChange={(event) => setForm({ ...form, description: event.target.value })}
          />
        </div>

        <div>
          <label className="mb-1 block text-xs font-bold uppercase tracking-[0.1em] text-(--text-dim)">Calificacion inicial</label>
          <StarRating
            value={form.rating}
            size="text-xl"
            onChange={(star) => setForm({ ...form, rating: star })}
          />
        </div>

        <label className="flex items-center gap-2 text-xs font-bold uppercase tracking-[0.1em] text-(--text-dim)">
          <input
            type="checkbox"
            checked={form.watched}
            onChange={(event) => setForm({ ...form, watched: event.target.checked })}
          />
          Marcar como visto
        </label>

        <label className="flex items-center gap-2 text-xs font-bold uppercase tracking-[0.1em] text-(--text-dim)">
          <input
            type="checkbox"
            checked={form.is_favorite}
            onChange={(event) => setForm({ ...form, is_favorite: event.target.checked })}
          />
          Marcar como favorito
        </label>

        <div className="flex gap-2">
          <button
            className="rounded-md bg-(--brand-red) px-4 py-2 text-sm font-semibold text-white transition hover:brightness-110"
            type="submit"
          >
            {editingId ? 'Guardar cambios' : 'Agregar'}
          </button>
          {editingId && (
            <button
              className="rounded-md border border-(--line-soft) px-4 py-2 text-sm font-semibold"
              type="button"
              onClick={onCancel}
            >
              Cancelar
            </button>
          )}
        </div>
      </form>
    </article>
  )
}

export default MediaForm
