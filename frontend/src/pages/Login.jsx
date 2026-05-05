import { useState } from 'react'
import { useAuth } from '../context/AuthContext'
import { motion } from 'framer-motion'
import { Clapperboard, Mail, Lock, User, LogIn, Sparkles } from 'lucide-react'

function Login({ onSwitchToRegister }) {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)
  const { login } = useAuth()

  const handleSubmit = async (e) => {
    e.preventDefault()
    setError('')
    setLoading(true)
    const result = await login(username, password)
    if (!result.success) {
      setError(result.error)
      setLoading(false)
    }
  }

  const inputClasses = "w-full rounded-2xl border border-(--line-soft) bg-white/5 px-4 py-4 pl-12 text-sm text-white outline-none transition-all focus:border-(--brand-red)/50 focus:bg-white/10"
  const labelClasses = "mb-2 flex items-center gap-2 text-[10px] font-black uppercase tracking-[0.2em] text-(--text-dim)"

  return (
    <div className="flex min-h-screen items-center justify-center p-4">
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="relative w-full max-w-md overflow-hidden rounded-[2.5rem] border border-white/10 bg-black/40 p-8 backdrop-blur-3xl shadow-2xl lg:p-12"
      >
        <div className="absolute -left-20 -top-20 h-64 w-64 rounded-full bg-(--brand-red)/10 blur-[100px]" />
        <div className="absolute -bottom-20 -right-20 h-64 w-64 rounded-full bg-blue-500/10 blur-[100px]" />

        <div className="relative z-10">
          <div className="mb-10 flex flex-col items-center">
            <div className="mb-4 flex h-16 w-16 items-center justify-center rounded-2xl bg-(--brand-red) shadow-[0_0_30px_var(--brand-red-glow)]">
              <Clapperboard size={32} className="text-white" />
            </div>
            <h1 className="text-3xl font-black uppercase italic tracking-tighter text-white">Cinelog</h1>
            <p className="mt-2 text-xs font-bold uppercase tracking-[0.3em] text-(--text-dim)">Bienvenido de nuevo</p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            {error && (
              <motion.div 
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                className="rounded-xl border border-red-500/20 bg-red-500/10 p-4 text-center text-xs font-bold text-red-400"
              >
                {error}
              </motion.div>
            )}

            <div>
              <label className={labelClasses}>Usuario</label>
              <div className="relative">
                <User size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-(--text-dim)" />
                <input
                  type="text"
                  className={inputClasses}
                  placeholder="Tu nombre de usuario"
                  required
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                />
              </div>
            </div>

            <div>
              <label className={labelClasses}>Contraseña</label>
              <div className="relative">
                <Lock size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-(--text-dim)" />
                <input
                  type="password"
                  className={inputClasses}
                  placeholder="••••••••"
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
              </div>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="flex w-full items-center justify-center gap-3 rounded-2xl bg-(--brand-red) py-4 text-sm font-black uppercase tracking-[0.2em] text-white shadow-[0_15px_30px_var(--brand-red-glow)] transition-all hover:scale-[1.02] active:scale-95 disabled:opacity-50"
            >
              {loading ? (
                <div className="h-5 w-5 animate-spin rounded-full border-2 border-white border-t-transparent" />
              ) : (
                <>
                  <LogIn size={20} strokeWidth={3} />
                  Entrar
                </>
              )}
            </button>
          </form>

          <div className="mt-10 text-center">
            <p className="text-xs font-medium text-(--text-dim)">
              ¿No tienes cuenta?{' '}
              <button 
                onClick={onSwitchToRegister}
                className="font-black uppercase tracking-widest text-white hover:text-(--brand-red) transition-colors"
              >
                Regístrate ahora
              </button>
            </p>
          </div>
        </div>
      </motion.div>
    </div>
  )
}

export default Login
