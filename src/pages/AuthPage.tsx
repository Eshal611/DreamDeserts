import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Eye, EyeOff, ArrowRight, CheckCircle } from 'lucide-react'

interface AuthPageProps {
  mode: 'login' | 'signup'
  setCurrentPage: (page: string) => void
}

const inputClass = `w-full px-4 py-3.5 rounded-2xl border border-[#E8D5CC] bg-white text-[#2C1810] text-sm font-sans placeholder-[#B0937E] focus:outline-none focus:border-[#C17F74] focus:ring-2 focus:ring-[#C17F74]/20 transition-all duration-200`

export default function AuthPage({ mode, setCurrentPage }: AuthPageProps) {
  const [show, setShow] = useState(false)
  const [showConfirm, setShowConfirm] = useState(false)
  const [done, setDone] = useState(false)
  const [form, setForm] = useState({ name: '', email: '', password: '', confirm: '' })

  const isLogin = mode === 'login'

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm((p) => ({ ...p, [e.target.name]: e.target.value }))
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    setDone(true)
  }

  return (
    <div className="min-h-screen bg-[#FAF3EE] flex">
      {/* Left Panel — decorative */}
      <div className="hidden lg:flex lg:w-1/2 relative overflow-hidden">
        <img
          src="https://images.unsplash.com/photo-1623428187969-5da2dcea5ebf?w=900&h=1200&fit=crop&auto=format"
          alt="Dream Desserts"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-br from-[rgba(44,24,16,0.65)] via-[rgba(44,24,16,0.4)] to-[rgba(193,127,116,0.5)]" />
        <div className="absolute inset-0 flex flex-col items-center justify-center text-center p-10">
          <span
            style={{ fontFamily: "'Great Vibes', cursive" }}
            className="block text-5xl text-[#F5C5B5] mb-2"
          >
            Dream Desserts
          </span>
          <div className="w-16 h-px bg-[#C9A84C] my-3 mx-auto" />
          <p className="text-[#E8D5CC] text-base font-light max-w-xs leading-relaxed">
            Every cake tells a story. Let yours be extraordinary.
          </p>
          <div className="mt-12 grid grid-cols-2 gap-4 w-full max-w-xs">
            {['500+ Happy Customers', '4 Cake Categories', 'Custom Designs', 'Fresh Daily'].map((s) => (
              <div
                key={s}
                className="bg-[rgba(255,253,248,0.1)] backdrop-blur-md rounded-2xl px-4 py-3 border border-[rgba(255,253,248,0.15)]"
              >
                <p className="text-white text-xs font-medium text-center">{s}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Right Panel — form */}
      <div className="flex-1 flex items-center justify-center px-6 py-12">
        <div className="w-full max-w-md">
          {/* Logo */}
          <button onClick={() => setCurrentPage('home')} className="flex flex-col items-center mb-8">
            <span style={{ fontFamily: "'Great Vibes', cursive" }} className="text-4xl text-[#C17F74]">
              Dream Desserts
            </span>
            <span className="text-xs tracking-[0.25em] text-[#7A5C52] uppercase font-light">Baked with Love</span>
          </button>

          <AnimatePresence mode="wait">
            {done ? (
              <motion.div
                key="done"
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                className="bg-white rounded-3xl p-10 text-center shadow-[0_8px_40px_rgba(44,24,16,0.1)] border border-[#F0E4DC]"
              >
                <div className="w-16 h-16 rounded-full bg-[#F5E6E0] flex items-center justify-center mx-auto mb-5">
                  <CheckCircle size={32} className="text-[#C17F74]" />
                </div>
                <h2 className="font-display text-2xl font-bold text-[#2C1810] mb-3" style={{ fontFamily: "'Playfair Display', serif" }}>
                  {isLogin ? 'Welcome Back!' : 'Account Created!'}
                </h2>
                <p className="text-[#7A5C52] text-sm font-light mb-7">
                  {isLogin
                    ? `Good to see you again, ${form.email}.`
                    : `Welcome to Dream Desserts, ${form.name}! Your account is ready.`}
                </p>
                <button onClick={() => setCurrentPage('home')} className="btn-primary w-full justify-center">
                  Go to Home
                </button>
              </motion.div>
            ) : (
              <motion.div
                key="form"
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                className="bg-white rounded-3xl shadow-[0_8px_40px_rgba(44,24,16,0.1)] border border-[#F0E4DC] overflow-hidden"
              >
                {/* Tab switcher */}
                <div className="grid grid-cols-2 bg-[#FAF3EE] p-1 m-5 rounded-2xl">
                  {['login', 'signup'].map((m) => (
                    <button
                      key={m}
                      onClick={() => setCurrentPage(m)}
                      className={`py-2.5 text-sm font-semibold rounded-xl transition-all duration-300 capitalize ${
                        mode === m
                          ? 'bg-white text-[#C17F74] shadow-[0_2px_12px_rgba(44,24,16,0.08)]'
                          : 'text-[#7A5C52] hover:text-[#C17F74]'
                      }`}
                    >
                      {m === 'login' ? 'Sign In' : 'Sign Up'}
                    </button>
                  ))}
                </div>

                <form onSubmit={handleSubmit} className="px-6 pb-8 space-y-4">
                  <div className="text-center mb-5">
                    <h2 className="font-display font-bold text-[#2C1810] text-xl" style={{ fontFamily: "'Playfair Display', serif" }}>
                      {isLogin ? 'Welcome Back' : 'Create Your Account'}
                    </h2>
                    <p className="text-xs text-[#7A5C52] mt-1 font-light">
                      {isLogin ? 'Sign in to track orders and manage your profile.' : 'Join Dream Desserts for a sweeter experience.'}
                    </p>
                  </div>

                  {!isLogin && (
                    <div>
                      <label className="block text-xs font-semibold tracking-widest uppercase text-[#7A5C52] mb-2">Full Name *</label>
                      <input name="name" required value={form.name} onChange={handleChange} placeholder="Jane Smith" className={inputClass} />
                    </div>
                  )}

                  <div>
                    <label className="block text-xs font-semibold tracking-widest uppercase text-[#7A5C52] mb-2">Email Address *</label>
                    <input name="email" required type="email" value={form.email} onChange={handleChange} placeholder="jane@email.com" className={inputClass} />
                  </div>

                  <div>
                    <label className="block text-xs font-semibold tracking-widest uppercase text-[#7A5C52] mb-2">Password *</label>
                    <div className="relative">
                      <input
                        name="password" required type={show ? 'text' : 'password'}
                        value={form.password} onChange={handleChange}
                        placeholder="••••••••"
                        className={`${inputClass} pr-11`}
                        minLength={6}
                      />
                      <button
                        type="button"
                        onClick={() => setShow((v) => !v)}
                        className="absolute right-4 top-1/2 -translate-y-1/2 text-[#B0937E] hover:text-[#C17F74] transition-colors"
                        aria-label={show ? 'Hide password' : 'Show password'}
                      >
                        {show ? <EyeOff size={16} /> : <Eye size={16} />}
                      </button>
                    </div>
                  </div>

                  {!isLogin && (
                    <div>
                      <label className="block text-xs font-semibold tracking-widest uppercase text-[#7A5C52] mb-2">Confirm Password *</label>
                      <div className="relative">
                        <input
                          name="confirm" required type={showConfirm ? 'text' : 'password'}
                          value={form.confirm} onChange={handleChange}
                          placeholder="••••••••"
                          className={`${inputClass} pr-11`}
                          minLength={6}
                        />
                        <button
                          type="button"
                          onClick={() => setShowConfirm((v) => !v)}
                          className="absolute right-4 top-1/2 -translate-y-1/2 text-[#B0937E] hover:text-[#C17F74] transition-colors"
                          aria-label={showConfirm ? 'Hide' : 'Show'}
                        >
                          {showConfirm ? <EyeOff size={16} /> : <Eye size={16} />}
                        </button>
                      </div>
                    </div>
                  )}

                  {isLogin && (
                    <div className="flex justify-end">
                      <button type="button" className="text-xs text-[#C17F74] hover:underline font-medium">
                        Forgot password?
                      </button>
                    </div>
                  )}

                  <button type="submit" className="btn-primary w-full justify-center mt-2">
                    {isLogin ? 'Sign In' : 'Create Account'}
                    <ArrowRight size={15} />
                  </button>

                  <div className="relative my-2">
                    <div className="absolute inset-0 flex items-center">
                      <div className="w-full border-t border-[#E8D5CC]" />
                    </div>
                    <div className="relative flex justify-center text-xs">
                      <span className="bg-white px-3 text-[#B0937E]">or continue with</span>
                    </div>
                  </div>

                  <button
                    type="button"
                    className="w-full flex items-center justify-center gap-3 py-3.5 rounded-2xl border border-[#E8D5CC] text-sm text-[#2C1810] font-medium hover:bg-[#FAF3EE] hover:border-[#C17F74]/30 transition-all duration-200"
                  >
                    <svg width="18" height="18" viewBox="0 0 24 24">
                      <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4"/>
                      <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"/>
                      <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05"/>
                      <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335"/>
                    </svg>
                    Continue with Google
                  </button>

                  <p className="text-center text-xs text-[#7A5C52] mt-2">
                    {isLogin ? "Don't have an account? " : 'Already have an account? '}
                    <button
                      type="button"
                      onClick={() => setCurrentPage(isLogin ? 'signup' : 'login')}
                      className="text-[#C17F74] font-semibold hover:underline"
                    >
                      {isLogin ? 'Sign Up' : 'Sign In'}
                    </button>
                  </p>
                </form>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </div>
  )
}
