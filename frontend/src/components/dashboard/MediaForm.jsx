import StarRating from '../common/StarRating'
import { Clapperboard, Calendar, Tag, FileText, Star, Save, X } from 'lucide-react'

function MediaForm({ form, setForm, editingId, onSubmit, onCancel }) {
  const inputClasses = "w-full rounded-xl border border-(--line-soft) bg-white/5 px-4 py-3 text-sm text-white outline-none transition-all focus:border-(--brand-red)/50 focus:bg-white/10"
  const labelClasses = "mb-2 flex items-center gap-2 text-[10px] font-black uppercase tracking-[0.2em] text-(--text-dim)"

  return (
    <form className="space-y-6" onSubmit={onSubmit}>
      <div className="grid gap-6 md:grid-cols-2">
        <div className="md:col-span-2">
          <label className={labelClasses}>
            <Clapperboard size={12} />
            Título del Contenido
          </label>
          <input
            className={inputClasses}
            required
            placeholder="Ej: Inception, Breaking Bad..."
            value={form.title}
            onChange={(event) => setForm({ ...form, title: event.target.value })}
          />
        </div>

        <div>
          <label className={labelClasses}>
            <Tag size={12} />
            Tipo
          </label>
          <select
            className={inputClasses}
            value={form.content_type}
            onChange={(event) => setForm({ ...form, content_type: event.target.value })}
          >
            <option value="movie" className="bg-[#0a0e16]">Película</option>
            <option value="series" className="bg-[#0a0e16]">Serie</option>
          </select>
        </div>

        <div>
          <label className={labelClasses}>
            <Calendar size={12} />
            Año de Estreno
          </label>
          <input
            className={inputClasses}
            type="number"
            min="1900"
            max="2100"
            placeholder="2024"
            value={form.year}
            onChange={(event) => setForm({ ...form, year: event.target.value })}
          />
        </div>

        <div className="md:col-span-2">
          <label className={labelClasses}>
            <Tag size={12} />
            Género
          </label>
          <input
            className={inputClasses}
            required
            placeholder="Ej: Ciencia Ficción, Drama..."
            value={form.genre}
            onChange={(event) => setForm({ ...form, genre: event.target.value })}
          />
        </div>

        <div className="md:col-span-2">
          <label className={labelClasses}>
            <FileText size={12} />
            Sinopsis / Descripción
          </label>
          <textarea
            className={`${inputClasses} h-32 resize-none`}
            placeholder="Escribe una breve descripción..."
            value={form.description}
            onChange={(event) => setForm({ ...form, description: event.target.value })}
          />
        </div>

        <div>
          <label className={labelClasses}>
            <Star size={12} />
            Calificación
          </label>
          <div className="rounded-xl border border-(--line-soft) bg-white/5 p-3 flex justify-center">
            <StarRating
              value={form.rating}
              size="text-2xl"
              onChange={(star) => setForm({ ...form, rating: star })}
            />
          </div>
        </div>

        <div className="flex flex-col gap-4 justify-center">
          <label className="flex cursor-pointer items-center gap-3 rounded-xl border border-(--line-soft) bg-white/5 p-4 transition-colors hover:bg-white/10">
            <input
              type="checkbox"
              className="h-5 w-5 rounded border-(--line-soft) bg-transparent text-(--brand-red) focus:ring-(--brand-red)"
              checked={form.watched}
              onChange={(event) => setForm({ ...form, watched: event.target.checked })}
            />
            <span className="text-xs font-bold uppercase tracking-widest text-white">Marcar como visto</span>
          </label>

          <label className="flex cursor-pointer items-center gap-3 rounded-xl border border-(--line-soft) bg-white/5 p-4 transition-colors hover:bg-white/10">
            <input
              type="checkbox"
              className="h-5 w-5 rounded border-(--line-soft) bg-transparent text-(--brand-red) focus:ring-(--brand-red)"
              checked={form.is_favorite}
              onChange={(event) => setForm({ ...form, is_favorite: event.target.checked })}
            />
            <span className="text-xs font-bold uppercase tracking-widest text-white">Marcar como favorito</span>
          </label>
        </div>
      </div>

      <div className="flex flex-col-reverse gap-3 pt-6 md:flex-row md:justify-end">
        <button
          className="flex items-center justify-center gap-2 rounded-xl border border-(--line-soft) px-8 py-4 text-sm font-black uppercase tracking-widest text-white transition-all hover:bg-white/10"
          type="button"
          onClick={onCancel}
        >
          <X size={18} />
          Cancelar
        </button>
        <button
          className="flex items-center justify-center gap-2 rounded-xl bg-(--brand-red) px-12 py-4 text-sm font-black uppercase tracking-widest text-white shadow-[0_10px_20px_var(--brand-red-glow)] transition-all hover:scale-105 active:scale-95"
          type="submit"
        >
          <Save size={18} />
          {editingId ? 'Guardar Cambios' : 'Agregar al Catálogo'}
        </button>
      </div>
    </form>
  )
}

export default MediaForm
