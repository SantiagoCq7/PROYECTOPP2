import { useState } from 'react'
import { useAuth } from '../context/AuthContext'
import { motion } from 'framer-motion'
import { Clapperboard, Mail, Lock, User, UserPlus, Sparkles } from 'lucide-react'

function Register({ onSwitchToLogin }) {
  const [username, setUsername] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const [success, setSuccess] = useState(false)
  const [loading, setLoading] = useState(false)
  const { register } = useAuth()

  const handleSubmit = async (e) => {
    e.preventDefault()
    setError('')
    setLoading(true)
    const result = await register(username, email, password)
    if (result.success) {
      setSuccess(true)
      setTimeout(onSwitchToLogin, 2000)
    } else {
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
            <p className="mt-2 text-xs font-bold uppercase tracking-[0.3em] text-(--text-dim)">Crea tu cuenta</p>
          </div>

          {success ? (
            <motion.div 
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              className="flex flex-col items-center justify-center py-10 text-center"
            >
              <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-emerald-500/20 text-emerald-500">
                <Sparkles size={24} />
              </div>
              <h2 className="text-xl font-bold text-white">¡Registro exitoso!</h2>
              <p className="mt-2 text-sm text-(--text-dim)">Redirigiéndote al login...</p>
            </motion.div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-5">
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
                <label className={labelClasses}>Nombre de Usuario</label>
                <div className="relative">
                  <User size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-(--text-dim)" />
                  <input
                    type="text"
                    className={inputClasses}
                    placeholder="Ej: juan_diego"
                    required
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                  />
                </div>
              </div>

              <div>
                <label className={labelClasses}>Correo Electrónico</label>
                <div className="relative">
                  <Mail size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-(--text-dim)" />
                  <input
                    type="email"
                    className={inputClasses}
                    placeholder="tu@email.com"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
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
                className="mt-4 flex w-full items-center justify-center gap-3 rounded-2xl bg-(--brand-red) py-4 text-sm font-black uppercase tracking-[0.2em] text-white shadow-[0_15px_30px_var(--brand-red-glow)] transition-all hover:scale-[1.02] active:scale-95 disabled:opacity-50"
              >
                {loading ? (
                  <div className="h-5 w-5 animate-spin rounded-full border-2 border-white border-t-transparent" />
                ) : (
                  <>
                    <UserPlus size={20} strokeWidth={3} />
                    Crear Cuenta
                  </>
                )}
              </button>
            </form>
          )}

          {!success && (
            <div className="mt-10 text-center">
              <p className="text-xs font-medium text-(--text-dim)">
                ¿Ya tienes cuenta?{' '}
                <button 
                  onClick={onSwitchToLogin}
                  className="font-black uppercase tracking-widest text-white hover:text-(--brand-red) transition-colors"
                >
                  Inicia sesión
                </button>
              </p>
            </div>
          )}
        </div>
      </motion.div>
    </div>
  )
}

export default Register
