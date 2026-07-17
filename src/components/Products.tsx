import { useRef, useState } from 'react'
import { motion, useInView, AnimatePresence } from 'framer-motion'
import { ArrowRight, ShoppingBag, Check } from 'lucide-react'
import { useCart } from '../context/CartContext'
import cake1 from "../assets/images/cake1.jpeg";
import cake2 from "../assets/images/cake2.jpeg";
import cake3 from "../assets/images/cake3.jpeg";
import cake4 from "../assets/images/cake4.jpeg";
import cake5 from "../assets/images/cake5.jpeg";
import cake6 from "../assets/images/cake6.jpeg";

interface ProductsProps {
  setCurrentPage: (page: string) => void
}

const products = [
  {
    id: 'p-serene-ocean-waves',
    name: 'Serene Ocean Waves Cake',
    desc: 'Ocean breeze, silver elegance',
    img: cake1,
    page: 'custom',
    tag: 'Custom',
    category: 'Custom Cakes',
  },
  {
    id: 'p-crimson-rose-birthday',
    name: 'Crimson Rose Birthday Cake',
    desc: 'Elegant roses, golden wishes',
    img: cake2,
    page: 'birthday',
    tag: 'Birthday',
    category: 'Birthday Cakes',
  },
  {
    id: 'p-kiwi-delight-custom',
    name: 'Kiwi Delight Custom Cake',
    desc: 'Fresh fruit, whipped perfection',
    img: cake3,
    page: 'custom',
    tag: 'Custom',
    category: 'Custom Cakes',
  },
  {
    id: 'p-blue-starry-birthday',
    name: 'Blue Starry Birthday Cake',
    desc: 'Shining stars, joyful celebration',
    img: cake4,
    page: 'birthday',
    tag: 'Birthday',
    category: 'Birthday Cakes',
  },
  {
    id: 'p-sunset-silhouette-wedding',
    name: 'Sunset Silhouette Wedding Cake',
    desc: 'Golden accents, romantic charm',
    img: cake5,
    page: 'wedding',
    tag: 'Wedding',
    category: 'Wedding Cakes',
  },
  {
    id: 'p-golden-boss-birthday',
    name: 'Golden Boss Birthday Cake',
    desc: 'Golden spheres, royal celebration',
    img: cake6,
    page: 'birthday',
    tag: 'Birthday',
    category: 'Birthday Cakes',
  },
]

function AddToCartBtn({ product }: { product: typeof products[0] }) {
  const { addItem } = useCart()
  const [added, setAdded] = useState(false)

  const handleAdd = (e: React.MouseEvent) => {
    e.stopPropagation()
    addItem({
      id: product.id,
      name: product.name,
      category: product.category,
      desc: product.desc,
      img: product.img,
    })
    setAdded(true)
    setTimeout(() => setAdded(false), 2000)
  }

  return (
    <button
      onClick={handleAdd}
      className={`flex items-center gap-1.5 px-4 py-2 rounded-full text-xs font-semibold tracking-wide transition-all duration-300 ${added
        ? 'bg-green-500/10 text-green-600 border border-green-200'
        : 'bg-[#F5E6E0] text-[#C17F74] hover:bg-[#C17F74] hover:text-white border border-transparent'
        }`}
    >
      <AnimatePresence mode="wait">
        {added ? (
          <motion.span key="check" initial={{ scale: 0 }} animate={{ scale: 1 }} exit={{ scale: 0 }} className="flex items-center gap-1.5">
            <Check size={12} /> Added!
          </motion.span>
        ) : (
          <motion.span key="add" initial={{ scale: 0 }} animate={{ scale: 1 }} exit={{ scale: 0 }} className="flex items-center gap-1.5">
            <ShoppingBag size={12} /> Add to Cart
          </motion.span>
        )}
      </AnimatePresence>
    </button>
  )
}

export default function Products({ setCurrentPage }: ProductsProps) {
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
          <span className="section-script block">Our Creations</span>
          <h2
            className="section-title text-3xl sm:text-4xl mt-2"
            style={{ fontFamily: "'Playfair Display', serif" }}
          >
            Featured Cakes
          </h2>
          <div className="divider-ornament mt-4">
            <span className="text-[#C9A84C] text-lg">✦</span>
          </div>
          <p className="text-[#7A5C52] text-sm mt-4 max-w-lg mx-auto font-light">
            Each cake is a unique masterpiece, crafted exclusively for your occasion. Pricing is custom — we'll provide a quote after reviewing your order.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
          {products.map((p, i) => (
            <motion.div
              key={p.id}
              initial={{ opacity: 0, y: 32 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: i * 0.1 }}
              className="card-hover group bg-white rounded-3xl overflow-hidden border border-[#F0E4DC] shadow-[0_4px_24px_rgba(44,24,16,0.07)]"
            >
              {/* Image */}
              <div
                className="relative overflow-hidden h-72 bg-[#F5E6E0] cursor-pointer" onClick={() => setCurrentPage(p.page)}
              >
                <img
                  src={p.img}
                  alt={p.name}
                  className="w-full h-full object-cover object-[center_45%] transition-transform duration-700 group-hover:scale-105" />
                <div className="absolute inset-0 bg-gradient-to-t from-[rgba(44,24,16,0.35)] via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-400" />
                <span
                  className="absolute top-4 left-4 px-3 py-1 rounded-full text-xs font-semibold tracking-wide"
                  style={{ background: 'rgba(255,253,248,0.88)', color: '#C17F74', backdropFilter: 'blur(8px)' }}
                >
                  {p.tag}
                </span>
              </div>

              {/* Content */}
              <div className="p-6">
                <h3
                  className="font-display font-semibold text-[#2C1810] text-lg mb-1.5 cursor-pointer hover:text-[#C17F74] transition-colors"
                  style={{ fontFamily: "'Playfair Display', serif" }}
                  onClick={() => setCurrentPage(p.page)}
                >
                  {p.name}
                </h3>
                <p className="text-[#7A5C52] text-sm mb-4 font-light">{p.desc}</p>
                <div className="flex items-center justify-between gap-3">
                  <button
                    className="flex items-center gap-1.5 text-[#C17F74] text-sm font-semibold tracking-wide group/btn"
                    onClick={() => setCurrentPage(p.page)}
                  >
                    Explore
                    <ArrowRight size={14} className="transition-transform duration-300 group-hover/btn:translate-x-1" />
                  </button>
                  <AddToCartBtn product={p} />
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 0.7 }}
          className="text-center mt-12"
        >
          <button onClick={() => setCurrentPage('birthday')} className="btn-outline">
            View All Cakes
            <ArrowRight size={15} />
          </button>
        </motion.div>
      </div>
    </section>
  )
}
