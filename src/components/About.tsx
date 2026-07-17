import { useRef } from 'react'
import { motion, useInView } from 'framer-motion'
import { CheckCircle, ArrowRight } from 'lucide-react'

interface AboutProps {
  setCurrentPage: (page: string) => void
}

const highlights = [
  'Handcrafted with finest Belgian chocolate and premium ingredients',
  'Custom designs tailored to your story and occasion',
  'Trusted by 500+ happy customers across the city',
]

export default function About({ setCurrentPage }: AboutProps) {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-80px' })

  return (
    <section className="py-24 px-4 bg-[#FAF3EE] overflow-hidden" ref={ref}>
      <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">
        {/* Left */}
        <motion.div
          initial={{ opacity: 0, x: -40 }}
          animate={inView ? { opacity: 1, x: 0 } : {}}
          transition={{ duration: 0.7 }}
        >
          <span className="section-script block mb-2">Our Story</span>
          <h2
            className="section-title text-4xl sm:text-5xl leading-tight mb-6"
            style={{ fontFamily: "'Playfair Display', serif" }}
          >
            About{' '}
            <span className="italic text-[#C17F74]">Dream Desserts</span>
          </h2>
          <div className="divider-ornament justify-start mb-6">
            <span className="text-[#C9A84C] text-lg">✦</span>
          </div>
          <p className="text-[#7A5C52] text-base leading-relaxed mb-4 font-sans font-light">
            Dream Desserts was born from a simple, heartfelt belief — that every celebration
            deserves a cake as beautiful as the memory it creates. Our home bakery was founded
            on the promise of handcrafting each cake with genuine love, premium ingredients,
            and a personal touch that factory bakeries simply cannot offer.
          </p>
          <p className="text-[#7A5C52] text-base leading-relaxed mb-8 font-sans font-light">
            From intimate birthday celebrations to grand wedding feasts, every cake that leaves
            our kitchen is a work of art — designed with your story in mind and baked with
            the warmth of a home kitchen.
          </p>

          <div className="flex flex-col gap-3 mb-10">
            {highlights.map((h, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, x: -16 }}
                animate={inView ? { opacity: 1, x: 0 } : {}}
                transition={{ delay: 0.3 + i * 0.1 }}
                className="flex items-start gap-3"
              >
                <CheckCircle size={18} className="text-[#C9A84C] mt-0.5 shrink-0" strokeWidth={2} />
                <span className="text-[#2C1810] text-sm font-sans">{h}</span>
              </motion.div>
            ))}
          </div>

          <button
            onClick={() => setCurrentPage('contact')}
            className="btn-primary"
          >
            Learn More
            <ArrowRight size={15} />
          </button>
        </motion.div>

        {/* Right */}
        <motion.div
          initial={{ opacity: 0, x: 40 }}
          animate={inView ? { opacity: 1, x: 0 } : {}}
          transition={{ duration: 0.7, delay: 0.15 }}
          className="relative"
        >
          {/* Main Image */}
          <div className="relative rounded-3xl overflow-hidden shadow-[0_24px_64px_rgba(44,24,16,0.18)] aspect-[4/5] bg-[#E8D5CC]">
            <img
              src="https://images.unsplash.com/photo-1535141192574-5d4897c12636?w=800&h=1000&fit=crop&auto=format"
              alt="Elegant tiered cake with floral decoration"
              className="w-full h-full object-cover transition-transform duration-700 hover:scale-105"
            />
            {/* Overlay */}
            <div className="absolute inset-0 bg-gradient-to-t from-[rgba(44,24,16,0.3)] via-transparent to-transparent" />
          </div>

          {/* Floating Stats Card */}
          <motion.div
            initial={{ opacity: 0, scale: 0.85, y: 20 }}
            animate={inView ? { opacity: 1, scale: 1, y: 0 } : {}}
            transition={{ delay: 0.45, duration: 0.5, type: 'spring' }}
            className="absolute -bottom-6 -left-6 glass rounded-2xl p-5 shadow-[0_16px_48px_rgba(44,24,16,0.14)] animate-float"
          >
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-[#C17F74] to-[#A8665B] flex items-center justify-center shadow-[0_4px_16px_rgba(193,127,116,0.4)]">
                <span className="text-white font-display font-bold text-lg" style={{ fontFamily: "'Playfair Display', serif" }}>
                  ♥
                </span>
              </div>
              <div>
                <p className="font-display font-bold text-[#2C1810] text-2xl" style={{ fontFamily: "'Playfair Display', serif" }}>
                  500+
                </p>
                <p className="text-[#7A5C52] text-xs font-sans">Happy Customers</p>
              </div>
            </div>
          </motion.div>

          {/* Second Accent Card */}
          <motion.div
            initial={{ opacity: 0, scale: 0.85 }}
            animate={inView ? { opacity: 1, scale: 1 } : {}}
            transition={{ delay: 0.6, duration: 0.5 }}
            className="absolute -top-5 -right-4 glass rounded-2xl px-5 py-3 shadow-[0_8px_32px_rgba(44,24,16,0.12)]"
            style={{ animationDelay: '1s' }}
          >
            <p className="text-[#C9A84C] font-sans text-xs font-semibold tracking-widest uppercase">Artisan</p>
            <p className="text-[#2C1810] font-display text-base font-semibold" style={{ fontFamily: "'Playfair Display', serif" }}>
              Handcrafted Daily
            </p>
          </motion.div>

          {/* Decorative ring */}
          <div className="absolute -bottom-8 -right-8 w-32 h-32 rounded-full border-2 border-dashed border-[#C17F74] opacity-20" />
        </motion.div>
      </div>
    </section>
  )
}
