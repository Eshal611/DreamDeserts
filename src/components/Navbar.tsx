import logo from "../assets/images/Dream-deserts-logo.jpeg";
import { useState, useEffect, useRef } from 'react'
import { ChevronDown, Menu, X, ShoppingBag, User } from 'lucide-react'
import { motion, AnimatePresence } from 'framer-motion'
import { useCart } from '../context/CartContext'

interface NavbarProps {
  currentPage: string
  setCurrentPage: (page: string) => void
}

const services = [
  { label: 'Birthday Cakes', page: 'birthday' },
  { label: 'Wedding Cakes', page: 'wedding' },
  { label: 'Custom Cakes', page: 'custom' },
  { label: 'Kids Theme Cakes', page: 'kids' },
]

const navLinks = [
  { label: 'Home', page: 'home' },
  { label: 'About', page: 'about' },
  { label: 'Services', page: 'services', hasDropdown: true },
  { label: 'Gallery', page: 'gallery' },
  { label: 'Testimonials', page: 'testimonials' },
  { label: 'Contact', page: 'contact' },
]

export default function Navbar({ currentPage, setCurrentPage }: NavbarProps) {
  const [scrolled, setScrolled] = useState(false)
  const [mobileOpen, setMobileOpen] = useState(false)
  const [servicesOpen, setServicesOpen] = useState(false)
  const [mobileServicesOpen, setMobileServicesOpen] = useState(false)
  const dropdownRef = useRef<HTMLDivElement>(null)
  const { openCart, totalItems } = useCart()

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40)
    window.addEventListener('scroll', onScroll)
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target as Node)) {
        setServicesOpen(false)
      }
    }
    document.addEventListener('mousedown', handler)
    return () => document.removeEventListener('mousedown', handler)
  }, [])

  useEffect(() => {
    if (mobileOpen) document.body.style.overflow = 'hidden'
    else document.body.style.overflow = ''
    return () => { document.body.style.overflow = '' }
  }, [mobileOpen])

  const navigate = (page: string) => {
    setCurrentPage(page)
    setMobileOpen(false)
    setServicesOpen(false)
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  const isLight = scrolled || mobileOpen
  const navBg = isLight
    ? 'bg-[#FFFDF8]/95 shadow-[0_2px_32px_rgba(44,24,16,0.10)] backdrop-blur-md'
    : 'bg-transparent'
  const linkColor = isLight ? 'text-[#2C1810]' : 'text-[#FFFDF8]'

  return (
    <nav
      className={`fixed left-0 right-0 z-40 transition-all duration-500 ${navBg}`}
      style={{ top: '33px' }}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 lg:h-20">

          {/* Logo — placeholder image */}
          <button onClick={() => navigate('home')} className="flex items-center shrink-0">
            <div
              className="h-10 w-36 rounded-xl flex items-center justify-center overflow-hidden"
              style={{
                background: isLight
                  ? 'linear-gradient(135deg,#F5E6E0 0%,#FAF3EE 100%)'
                  : 'rgba(255,253,248,0.12)',
                border: isLight ? '1.5px solid #E8D5CC' : '1.5px solid rgba(255,253,248,0.25)',
                backdropFilter: 'blur(8px)',
              }}
            >
              <img
                src={logo}
                alt="Dream Desserts"
                className="w-full h-full object-contain p-1"
              />
            </div>
          </button>

          {/* Desktop Nav */}
          <div className="hidden lg:flex items-center gap-1">
            {navLinks.map((link) =>
              link.hasDropdown ? (
                <div key={link.label} className="relative" ref={dropdownRef}>
                  <button
                    className={`flex items-center gap-1 px-3 py-2 text-sm font-medium tracking-wide transition-colors duration-300 hover:text-[#C17F74] ${linkColor}`}
                    onMouseEnter={() => setServicesOpen(true)}
                    onMouseLeave={() => setServicesOpen(false)}
                    onClick={() => setServicesOpen((v) => !v)}
                  >
                    {link.label}
                    <ChevronDown
                      size={13}
                      className={`transition-transform duration-300 ${servicesOpen ? 'rotate-180' : ''}`}
                    />
                  </button>
                  <AnimatePresence>
                    {servicesOpen && (
                      <motion.div
                        initial={{ opacity: 0, y: 10, scale: 0.96 }}
                        animate={{ opacity: 1, y: 0, scale: 1 }}
                        exit={{ opacity: 0, y: 8, scale: 0.96 }}
                        transition={{ duration: 0.22, ease: 'easeOut' }}
                        className="absolute top-full left-1/2 -translate-x-1/2 mt-2 w-52 rounded-2xl overflow-hidden"
                        style={{
                          background: 'rgba(255,253,248,0.96)',
                          backdropFilter: 'blur(20px)',
                          boxShadow: '0 16px 48px rgba(44,24,16,0.16)',
                          border: '1px solid rgba(193,127,116,0.15)',
                        }}
                        onMouseEnter={() => setServicesOpen(true)}
                        onMouseLeave={() => setServicesOpen(false)}
                      >
                        <div className="p-2">
                          {services.map((s) => (
                            <button
                              key={s.page}
                              onClick={() => navigate(s.page)}
                              className="w-full text-left px-4 py-2.5 text-sm text-[#2C1810] hover:bg-[#F5E6E0] hover:text-[#C17F74] rounded-xl transition-all duration-200 font-sans"
                            >
                              {s.label}
                            </button>
                          ))}
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              ) : (
                <button
                  key={link.label}
                  onClick={() => navigate(link.page)}
                  className={`px-3 py-2 text-sm font-medium tracking-wide transition-colors duration-300 hover:text-[#C17F74] relative group ${currentPage === link.page ? 'text-[#C17F74]' : linkColor
                    }`}
                >
                  {link.label}
                  <span
                    className={`absolute bottom-0 left-3 right-3 h-px bg-[#C17F74] transition-transform duration-300 origin-left ${currentPage === link.page ? 'scale-x-100' : 'scale-x-0 group-hover:scale-x-100'
                      }`}
                  />
                </button>
              )
            )}
          </div>

          {/* Right Actions */}
          <div className="flex items-center gap-2">
            {/* Account */}
            <button
              onClick={() => navigate('login')}
              className={`hidden sm:flex items-center justify-center w-9 h-9 rounded-full transition-all duration-300 ${isLight
                  ? 'text-[#2C1810] hover:bg-[#F5E6E0]'
                  : 'text-[#FFFDF8] hover:bg-white/10'
                }`}
              aria-label="Account"
            >
              <User size={18} />
            </button>

            {/* Cart */}
            <button
              onClick={openCart}
              className={`relative flex items-center justify-center w-9 h-9 rounded-full transition-all duration-300 ${isLight
                  ? 'text-[#2C1810] hover:bg-[#F5E6E0]'
                  : 'text-[#FFFDF8] hover:bg-white/10'
                }`}
              aria-label="Shopping cart"
            >
              <ShoppingBag size={18} />
              <AnimatePresence>
                {totalItems > 0 && (
                  <motion.span
                    key="badge"
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    exit={{ scale: 0 }}
                    className="absolute -top-1 -right-1 w-5 h-5 rounded-full bg-[#C17F74] text-white text-[10px] font-bold flex items-center justify-center shadow-md"
                  >
                    {totalItems > 9 ? '9+' : totalItems}
                  </motion.span>
                )}
              </AnimatePresence>
            </button>

            {/* Order CTA */}
            <div className="hidden lg:block ml-1">
              <button onClick={() => navigate('booking')} className="btn-primary text-xs">
                Order Now
              </button>
            </div>

            {/* Mobile Hamburger */}
            <button
              className={`lg:hidden p-2 rounded-xl transition-colors ${linkColor}`}
              onClick={() => setMobileOpen((v) => !v)}
              aria-label="Toggle menu"
            >
              <AnimatePresence mode="wait">
                {mobileOpen ? (
                  <motion.div key="x" initial={{ rotate: -90, opacity: 0 }} animate={{ rotate: 0, opacity: 1 }} exit={{ rotate: 90, opacity: 0 }} transition={{ duration: 0.2 }}>
                    <X size={22} />
                  </motion.div>
                ) : (
                  <motion.div key="menu" initial={{ rotate: 90, opacity: 0 }} animate={{ rotate: 0, opacity: 1 }} exit={{ rotate: -90, opacity: 0 }} transition={{ duration: 0.2 }}>
                    <Menu size={22} />
                  </motion.div>
                )}
              </AnimatePresence>
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.35, ease: 'easeInOut' }}
            className="lg:hidden overflow-hidden bg-[#FFFDF8] border-t border-[#E8D5CC]"
          >
            <div className="max-w-7xl mx-auto px-6 py-4 flex flex-col gap-1">
              {navLinks.map((link, i) =>
                link.hasDropdown ? (
                  <div key={link.label}>
                    <button
                      className="w-full flex items-center justify-between px-3 py-3 text-sm font-medium text-[#2C1810] hover:text-[#C17F74] transition-colors"
                      onClick={() => setMobileServicesOpen((v) => !v)}
                    >
                      {link.label}
                      <ChevronDown size={14} className={`transition-transform ${mobileServicesOpen ? 'rotate-180' : ''}`} />
                    </button>
                    <AnimatePresence>
                      {mobileServicesOpen && (
                        <motion.div
                          initial={{ opacity: 0, height: 0 }}
                          animate={{ opacity: 1, height: 'auto' }}
                          exit={{ opacity: 0, height: 0 }}
                          transition={{ duration: 0.25 }}
                          className="overflow-hidden pl-4"
                        >
                          {services.map((s) => (
                            <button
                              key={s.page}
                              onClick={() => navigate(s.page)}
                              className="w-full text-left px-3 py-2.5 text-sm text-[#7A5C52] hover:text-[#C17F74] transition-colors"
                            >
                              {s.label}
                            </button>
                          ))}
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>
                ) : (
                  <motion.button
                    key={link.label}
                    initial={{ opacity: 0, x: -16 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: i * 0.05 }}
                    onClick={() => navigate(link.page)}
                    className={`w-full text-left px-3 py-3 text-sm font-medium transition-colors ${currentPage === link.page ? 'text-[#C17F74]' : 'text-[#2C1810] hover:text-[#C17F74]'
                      }`}
                  >
                    {link.label}
                  </motion.button>
                )
              )}
              <div className="flex items-center gap-3 pt-3 border-t border-[#E8D5CC] mt-2">
                <button onClick={() => navigate('login')} className="btn-outline text-xs flex-1 justify-center">
                  Login
                </button>
                <button onClick={() => navigate('booking')} className="btn-primary text-xs flex-1 justify-center">
                  Order Now
                </button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  )
}
