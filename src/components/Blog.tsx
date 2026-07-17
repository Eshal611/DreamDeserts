import { useRef } from 'react'
import { motion, useInView } from 'framer-motion'
import { ArrowRight, Clock, User } from 'lucide-react'

const posts = [
  {
    title: '7 Trends Defining Wedding Cakes in 2025',
    excerpt: 'From minimalist sculpted fondant to bold floral installations — discover what\'s captivating brides this season.',
    img: 'https://images.unsplash.com/photo-1623428187969-5da2dcea5ebf?w=600&h=400&fit=crop&auto=format',
    author: 'Dream Desserts',
    time: '5 min read',
    date: 'Jun 15, 2025',
    tag: 'Wedding',
  },
  {
    title: 'How to Choose the Perfect Flavor for Your Birthday Cake',
    excerpt: 'Vanilla bean? Dark chocolate ganache? Lemon curd? We guide you through choosing a flavor that wows every palate.',
    img: 'https://images.unsplash.com/photo-1562777717-dc6984f65a63?w=600&h=400&fit=crop&auto=format',
    author: 'Dream Desserts',
    time: '4 min read',
    date: 'May 28, 2025',
    tag: 'Birthday',
  },
  {
    title: 'Behind the Magic: Our Custom Cake Design Process',
    excerpt: 'Go behind the scenes at Dream Desserts and discover how we transform your vision into a sculpted, edible masterpiece.',
    img: 'https://images.unsplash.com/photo-1535141192574-5d4897c12636?w=600&h=400&fit=crop&auto=format',
    author: 'Dream Desserts',
    time: '6 min read',
    date: 'May 10, 2025',
    tag: 'Behind Scenes',
  },
]

export default function Blog() {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-60px' })

  return (
    <section className="py-24 px-4 bg-[#FFFDF8]" ref={ref}>
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-14"
        >
          <span className="section-script block">Sweet Reads</span>
          <h2
            className="section-title text-3xl sm:text-4xl mt-2"
            style={{ fontFamily: "'Playfair Display', serif" }}
          >
            From Our Blog
          </h2>
          <div className="divider-ornament mt-4">
            <span className="text-[#C9A84C] text-lg">✦</span>
          </div>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {posts.map((p, i) => (
            <motion.article
              key={p.title}
              initial={{ opacity: 0, y: 32 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: i * 0.12 }}
              className="card-hover group bg-white rounded-3xl overflow-hidden border border-[#F0E4DC] shadow-[0_4px_24px_rgba(44,24,16,0.07)]"
            >
              <div className="relative overflow-hidden aspect-[16/10] bg-[#F5E6E0]">
                <img
                  src={p.img}
                  alt={p.title}
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                  loading="lazy"
                />
                <span
                  className="absolute top-4 left-4 px-3 py-1 rounded-full text-xs font-semibold"
                  style={{ background: 'rgba(255,253,248,0.9)', color: '#C17F74', backdropFilter: 'blur(8px)' }}
                >
                  {p.tag}
                </span>
              </div>
              <div className="p-6">
                <div className="flex items-center gap-4 text-xs text-[#7A5C52] mb-3 font-sans">
                  <span className="flex items-center gap-1"><User size={11} /> {p.author}</span>
                  <span className="flex items-center gap-1"><Clock size={11} /> {p.time}</span>
                  <span>{p.date}</span>
                </div>
                <h3
                  className="font-display font-semibold text-[#2C1810] text-lg leading-snug mb-3"
                  style={{ fontFamily: "'Playfair Display', serif" }}
                >
                  {p.title}
                </h3>
                <p className="text-[#7A5C52] text-sm leading-relaxed mb-5 font-light">{p.excerpt}</p>
                <button className="flex items-center gap-1.5 text-[#C17F74] text-sm font-semibold tracking-wide group/btn">
                  Read More
                  <ArrowRight size={14} className="transition-transform duration-300 group-hover/btn:translate-x-1" />
                </button>
              </div>
            </motion.article>
          ))}
        </div>
      </div>
    </section>
  )
}
