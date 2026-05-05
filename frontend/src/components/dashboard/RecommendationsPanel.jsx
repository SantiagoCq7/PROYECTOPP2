import { getFallbackPoster, getLocalPosterFallback, getMediaPoster } from '../../utils/mediaPosters'
import { motion } from 'framer-motion'
import { Sparkles, ChevronLeft, ChevronRight, Info } from 'lucide-react'

function RecommendationsPanel({ favoriteGenre, recommendations, onEdit }) {
  if (recommendations.length === 0) return null

  return (
    <article className="relative overflow-hidden rounded-[2rem] border border-white/5 bg-black shadow-2xl">
      <div className="flex items-center justify-between px-8 py-6">
        <div className="flex items-center gap-3">
          <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-amber-400/20 text-amber-400">
            <Sparkles size={18} />
          </div>
          <h2 className="text-xl font-black uppercase italic tracking-tight text-white">Selección especial</h2>
        </div>
        {favoriteGenre && (
          <div className="rounded-full bg-white/5 px-4 py-1.5 text-[10px] font-black uppercase tracking-[0.2em] text-white/60 border border-white/5">
            Basado en tu interés por <span className="text-(--brand-red)">{favoriteGenre}</span>
          </div>
        )}
      </div>

      <div className="relative h-[450px] overflow-hidden">
        {/* We'll just show the first recommendation as the main hero for maximum impact */}
        {recommendations.slice(0, 1).map((item) => (
          <motion.div 
            key={item.id}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="group relative h-full w-full"
          >
            <img
              className="absolute inset-0 h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
              src={getMediaPoster(item)}
              alt={item.title}
              onError={(event) => {
                event.currentTarget.onerror = null
                event.currentTarget.src = getFallbackPoster(item.content_type)
              }}
            />
            
            {/* Rich Gradients for Cinematic Look */}
            <div className="absolute inset-0 bg-gradient-to-r from-black via-black/60 to-transparent" />
            <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent" />

            <div className="relative z-10 flex h-full flex-col justify-center px-12 pb-12">
              <motion.div
                initial={{ x: -20, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                transition={{ delay: 0.3 }}
              >
                <div className="flex items-center gap-4 mb-4">
                  <span className="rounded bg-(--brand-red) px-2 py-0.5 text-[10px] font-black uppercase tracking-widest text-white">
                    Destacado
                  </span>
                  <span className="text-xs font-bold text-white/60 uppercase tracking-widest">
                    {item.content_type === 'movie' ? 'Película' : 'Serie'} · {item.year}
                  </span>
                </div>
                
                <h3 className="max-w-2xl text-6xl font-black leading-none text-white uppercase italic tracking-tighter sm:text-7xl">
                  {item.title}
                </h3>
                
                <p className="mt-6 max-w-xl text-lg font-medium leading-relaxed text-white/80 line-clamp-3">
                  {item.description || 'Una experiencia cinematográfica imperdible que te mantendrá al borde de tu asiento de principio a fin.'}
                </p>

                <div className="mt-10 flex items-center gap-4">
                  <button 
                    onClick={() => onEdit(item)}
                    className="flex items-center gap-2 rounded-xl bg-white px-8 py-4 text-sm font-black uppercase tracking-widest text-black transition-all hover:scale-105 active:scale-95"
                  >
                    <Info size={18} strokeWidth={3} />
                    Ver Detalles
                  </button>
                  <button className="rounded-xl border border-white/20 bg-white/5 px-4 py-4 text-white backdrop-blur-md transition-all hover:bg-white/10">
                    <ChevronRight size={20} />
                  </button>
                </div>
              </motion.div>
            </div>
          </motion.div>
        ))}

        {/* Scroll Indicators / Navigation */}
        <div className="absolute bottom-10 right-12 z-20 flex items-center gap-3">
          <button className="flex h-12 w-12 items-center justify-center rounded-full border border-white/10 bg-black/40 text-white backdrop-blur-md transition-all hover:bg-white/20">
            <ChevronLeft size={24} />
          </button>
          <button className="flex h-12 w-12 items-center justify-center rounded-full border border-white/10 bg-black/40 text-white backdrop-blur-md transition-all hover:bg-white/20">
            <ChevronRight size={24} />
          </button>
        </div>
      </div>
    </article>
  )
}

export default RecommendationsPanel


