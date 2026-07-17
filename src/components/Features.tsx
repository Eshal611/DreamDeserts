import { useRef } from 'react'
import { motion, useInView } from 'framer-motion'
import { Award, Leaf, Cake, Truck } from 'lucide-react'

const features = [
  {
    icon: Award,
    title: 'Premium Quality',
    desc: 'Every cake is crafted to perfection using time-honored techniques and exceptional artistry.',
    color: '#C17F74',
  },
  {
    icon: Leaf,
    title: 'Fresh Ingredients',
    desc: 'We source only the finest, freshest ingredients to ensure every bite is pure indulgence.',
    color: '#8DAB85',
  },
  {
    icon: Cake,
    title: 'Custom Cakes',
    desc: 'Your vision brought to life — we design bespoke cakes for every occasion and dream.',
    color: '#C9A84C',
  },
  {
    icon: Truck,
    title: 'Fast Delivery',
    desc: 'Careful, timely delivery to your doorstep so your cake arrives fresh and picture-perfect.',
    color: '#8B7AB5',
  },
]

export default function Features() {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-80px' })

  return (
    <section className="py-20 px-4 bg-[#FFFDF8]" ref={ref}>
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-14"
        >
          <span className="section-script block">Why Choose Us</span>
          <h2 className="section-title text-3xl sm:text-4xl mt-2">
            Crafted with Passion & Care
          </h2>
          <div className="divider-ornament mt-4">
            <span className="text-[#C9A84C] text-lg">✦</span>
          </div>
        </motion.div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {features.map((f, i) => (
            <motion.div
              key={f.title}
              initial={{ opacity: 0, y: 32 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: i * 0.12 }}
              className="card-hover bg-white rounded-3xl p-8 flex flex-col items-center text-center border border-[#F0E4DC] shadow-[0_4px_24px_rgba(44,24,16,0.06)]"
            >
              <div
                className="w-16 h-16 rounded-2xl flex items-center justify-center mb-5 shadow-[0_4px_16px_rgba(0,0,0,0.08)]"
                style={{ background: `${f.color}18` }}
              >
                <f.icon size={28} style={{ color: f.color }} strokeWidth={1.5} />
              </div>
              <h3
                className="font-display font-semibold text-[#2C1810] text-lg mb-3"
                style={{ fontFamily: "'Playfair Display', serif" }}
              >
                {f.title}
              </h3>
              <p className="text-[#7A5C52] text-sm leading-relaxed font-sans font-light">
                {f.desc}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
