import { useRef, useState } from 'react'
import { motion, useInView, AnimatePresence } from 'framer-motion'
import { Star, Quote, ChevronLeft, ChevronRight } from 'lucide-react'

const reviews = [
  {
    name: 'Sophia Bennett',
    role: 'Bride, June 2024',
    avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=120&h=120&fit=crop&auto=format',
    rating: 5,
    text: "Our wedding cake was an absolute masterpiece. Dream Desserts understood exactly the look and flavor we wanted — every guest was in awe. The taste was even more stunning than the design!",
  },
  {
    name: 'Emily Rodriguez',
    role: 'Birthday Celebration',
    avatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=120&h=120&fit=crop&auto=format',
    rating: 5,
    text: "I ordered a custom floral birthday cake and I was speechless when it arrived. The attention to detail, the flavors, the presentation — everything was beyond perfect. Highly recommend!",
  },
  {
    name: 'James Whitmore',
    role: 'Corporate Event',
    avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=120&h=120&fit=crop&auto=format',
    rating: 5,
    text: "We ordered a custom cake for our company anniversary and it was the highlight of the event. Elegant, delicious, and delivered right on time. Dream Desserts is simply exceptional.",
  },
  {
    name: 'Amara Johnson',
    role: "Daughter's Birthday",
    avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=120&h=120&fit=crop&auto=format',
    rating: 5,
    text: "The unicorn cake for my daughter's party was magical! She was over the moon seeing her dream cake come to life. The team was so patient with all my requests. Truly outstanding work.",
  },
  {
    name: 'Claire Thompson',
    role: 'Anniversary Surprise',
    avatar: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=120&h=120&fit=crop&auto=format',
    rating: 5,
    text: "Ordered a surprise anniversary cake with custom fondant decorations. The cake not only looked like a painting but tasted absolutely divine. Dream Desserts has earned a customer for life!",
  },
]

export default function Testimonials() {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-60px' })
  const [active, setActive] = useState(0)

  const prev = () => setActive((a) => (a - 1 + reviews.length) % reviews.length)
  const next = () => setActive((a) => (a + 1) % reviews.length)

  const visible = [
    reviews[(active - 1 + reviews.length) % reviews.length],
    reviews[active],
    reviews[(active + 1) % reviews.length],
  ]

  return (
    <section className="py-24 px-4 bg-[#2C1810] overflow-hidden" ref={ref}>
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-14"
        >
          <span
            className="block text-4xl text-[#F5C5B5] mb-2"
            style={{ fontFamily: "'Great Vibes', cursive" }}
          >
            Kind Words
          </span>
          <h2
            className="font-display text-3xl sm:text-4xl font-bold text-[#FFFDF8]"
            style={{ fontFamily: "'Playfair Display', serif" }}
          >
            What Our Customers Say
          </h2>
          <div className="divider-ornament mt-4">
            <span className="text-[#C9A84C] text-lg">✦</span>
          </div>
        </motion.div>

        {/* Cards — desktop 3-up, mobile single */}
        <div className="hidden md:grid grid-cols-3 gap-6">
          {visible.map((r, i) => (
            <motion.div
              key={r.name + i}
              layout
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: i * 0.1 }}
              className={`rounded-3xl p-7 border flex flex-col transition-all duration-500 ${
                i === 1
                  ? 'bg-[#C17F74] border-[#C17F74] shadow-[0_24px_64px_rgba(193,127,116,0.35)] scale-105'
                  : 'bg-[rgba(255,253,248,0.06)] border-[rgba(255,253,248,0.1)]'
              }`}
            >
              <Quote size={28} className={i === 1 ? 'text-[#FFFDF8] opacity-50' : 'text-[#C9A84C] opacity-60'} />
              <p className={`mt-4 text-sm leading-relaxed font-light font-sans flex-1 ${i === 1 ? 'text-[#FFFDF8]' : 'text-[#E8D5CC]'}`}>
                "{r.text}"
              </p>
              <div className="flex gap-0.5 mt-5 mb-4">
                {[...Array(r.rating)].map((_, s) => (
                  <Star key={s} size={13} fill={i === 1 ? '#FFFDF8' : '#C9A84C'} className={i === 1 ? 'text-[#FFFDF8]' : 'text-[#C9A84C]'} />
                ))}
              </div>
              <div className="flex items-center gap-3">
                <img src={r.avatar} alt={r.name} className="w-10 h-10 rounded-full object-cover" />
                <div>
                  <p className={`font-semibold text-sm ${i === 1 ? 'text-[#FFFDF8]' : 'text-[#FFFDF8]'}`}>{r.name}</p>
                  <p className={`text-xs ${i === 1 ? 'text-[rgba(255,253,248,0.75)]' : 'text-[#7A5C52]'}`}>{r.role}</p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Mobile single card */}
        <div className="md:hidden">
          <AnimatePresence mode="wait">
            <motion.div
              key={active}
              initial={{ opacity: 0, x: 30 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -30 }}
              transition={{ duration: 0.4 }}
              className="bg-[#C17F74] rounded-3xl p-7 border border-[#C17F74] shadow-[0_24px_64px_rgba(193,127,116,0.35)]"
            >
              <Quote size={28} className="text-[#FFFDF8] opacity-50" />
              <p className="mt-4 text-sm leading-relaxed font-light font-sans text-[#FFFDF8]">
                "{reviews[active].text}"
              </p>
              <div className="flex gap-0.5 mt-5 mb-4">
                {[...Array(5)].map((_, s) => (
                  <Star key={s} size={13} fill="#FFFDF8" className="text-[#FFFDF8]" />
                ))}
              </div>
              <div className="flex items-center gap-3">
                <img src={reviews[active].avatar} alt={reviews[active].name} className="w-10 h-10 rounded-full object-cover" />
                <div>
                  <p className="font-semibold text-sm text-[#FFFDF8]">{reviews[active].name}</p>
                  <p className="text-xs text-[rgba(255,253,248,0.75)]">{reviews[active].role}</p>
                </div>
              </div>
            </motion.div>
          </AnimatePresence>
        </div>

        {/* Controls */}
        <div className="flex justify-center items-center gap-4 mt-10">
          <button
            onClick={prev}
            className="w-11 h-11 rounded-full border border-[rgba(255,253,248,0.2)] text-[#FFFDF8] hover:bg-[#C17F74] hover:border-[#C17F74] transition-all duration-300 flex items-center justify-center"
          >
            <ChevronLeft size={18} />
          </button>
          <div className="flex gap-2">
            {reviews.map((_, i) => (
              <button
                key={i}
                onClick={() => setActive(i)}
                className={`rounded-full transition-all duration-300 ${
                  i === active ? 'w-6 h-2 bg-[#C17F74]' : 'w-2 h-2 bg-[rgba(255,253,248,0.25)]'
                }`}
              />
            ))}
          </div>
          <button
            onClick={next}
            className="w-11 h-11 rounded-full border border-[rgba(255,253,248,0.2)] text-[#FFFDF8] hover:bg-[#C17F74] hover:border-[#C17F74] transition-all duration-300 flex items-center justify-center"
          >
            <ChevronRight size={18} />
          </button>
        </div>
      </div>
    </section>
  )
}
