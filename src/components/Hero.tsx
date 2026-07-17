import { useEffect, useRef, useState } from 'react'
import { motion } from 'framer-motion'
import { ChevronDown, Phone } from 'lucide-react'

interface HeroProps {
  setCurrentPage: (page: string) => void
}

export default function Hero({ setCurrentPage }: HeroProps) {
  const [loaded, setLoaded] = useState(false)
  const imgRef = useRef<HTMLImageElement>(null)

  useEffect(() => {
    setLoaded(true)
  }, [])

  return (
    <section className="relative w-full min-h-screen flex items-center justify-center overflow-hidden">
      {/* Background Image */}
      <div className="absolute inset-0 bg-[#2C1810]">
        <img
          ref={imgRef}
          src="https://images.unsplash.com/photo-1464349095431-e9a21285b5f3?w=1920&h=1080&fit=crop&auto=format"
          alt="Premium celebration cake"
          className="w-full h-full object-cover opacity-55 scale-105 transition-transform duration-[8000ms]"
          style={{ transform: loaded ? 'scale(1)' : 'scale(1.08)' }}
        />
        {/* Gradient Overlay */}
        <div className="absolute inset-0 bg-gradient-to-b from-[rgba(44,24,16,0.55)] via-[rgba(44,24,16,0.35)] to-[rgba(44,24,16,0.75)]" />
        <div className="absolute inset-0 bg-gradient-to-r from-[rgba(44,24,16,0.3)] via-transparent to-[rgba(44,24,16,0.2)]" />
      </div>

      {/* Decorative particles */}
      {[...Array(6)].map((_, i) => (
        <div
          key={i}
          className="absolute rounded-full bg-[#C9A84C] opacity-20 animate-float"
          style={{
            width: `${8 + i * 4}px`,
            height: `${8 + i * 4}px`,
            top: `${15 + i * 12}%`,
            left: `${5 + i * 15}%`,
            animationDelay: `${i * 0.6}s`,
            animationDuration: `${3 + i * 0.5}s`,
          }}
        />
      ))}

      {/* Content */}
      <div className="relative z-10 text-center px-4 max-w-4xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.2 }}
          className="mb-4"
        >
          <span
            className="text-4xl sm:text-5xl md:text-6xl text-[#F5C5B5] block"
            style={{ fontFamily: "'Great Vibes', cursive" }}
          >
            Dream Desserts
          </span>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, scaleX: 0 }}
          animate={{ opacity: 1, scaleX: 1 }}
          transition={{ duration: 0.6, delay: 0.5 }}
          className="flex items-center justify-center gap-3 mb-8"
        >
          <span className="h-px w-16 bg-gradient-to-r from-transparent to-[#C9A84C]" />
          <span className="text-[#C9A84C] text-xs tracking-[0.3em] uppercase font-sans font-light">
            Baked with Love
          </span>
          <span className="h-px w-16 bg-gradient-to-l from-transparent to-[#C9A84C]" />
        </motion.div>

        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.6 }}
          className="font-display text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold text-[#FFFDF8] leading-tight mb-6"
          style={{ fontFamily: "'Playfair Display', serif" }}
        >
          Welcome to{' '}
          <span className="block text-[#F2C4C4] italic">Dream Desserts</span>
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.85 }}
          className="text-[#E8D5CC] text-lg sm:text-xl font-light leading-relaxed mb-10 max-w-xl mx-auto font-sans"
        >
          Handcrafted cakes made with the finest ingredients, designed to make
          your most precious moments unforgettable.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 1.0 }}
          className="flex flex-col sm:flex-row gap-4 justify-center items-center"
        >
          <button
            onClick={() => setCurrentPage('contact')}
            className="btn-primary text-sm"
          >
            <Phone size={15} />
            Contact Now
          </button>
          <button
            onClick={() => setCurrentPage('booking')}
            className="btn-outline text-sm border-[#FFFDF8] text-[#FFFDF8] hover:bg-[#FFFDF8] hover:text-[#2C1810]"
          >
            Order a Cake
          </button>
        </motion.div>
      </div>

      {/* Scroll Indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.5 }}
        className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 text-[#E8D5CC]"
      >
        <span className="text-xs tracking-[0.2em] uppercase font-sans">Scroll</span>
        <ChevronDown size={18} className="animate-scroll-bounce" />
      </motion.div>
    </section>
  )
}
