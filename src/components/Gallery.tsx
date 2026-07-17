import { useRef, useState } from 'react'
import { motion, useInView, AnimatePresence } from 'framer-motion'
import { X, ZoomIn } from 'lucide-react'
import cake1 from "../assets/images/cake1.jpeg";
import cake7 from "../assets/images/cake7.jpeg";
import cake13 from "../assets/images/cake13.png";
import cake20 from "../assets/images/cake20.png";
import cake15 from "../assets/images/cake15.png";
import cake12 from "../assets/images/cake12.png";
import cake19 from "../assets/images/cake19.png";
import cake14 from "../assets/images/cake14.png";

const galleryImages = [
  { src: cake1, alt: 'Serene Ocean Custom Cake', span: 'row-span-2' },
  { src: cake20, alt: 'Elegant Ruffled Doll Cake', span: '' },
  { src: cake12, alt: 'Crimson Wedding Cake', span: '' },
  { src: cake7, alt: 'Fairy Dream Birthday Cake', span: 'row-span-2' },
  { src: cake15, alt: 'Vintage Monochrome Wedding Cake', span: '' },
  { src: cake19, alt: 'Chibi Bears Cartoon Cake', span: '' },
  { src: cake13, alt: 'ChatGPT Graduation Custom Cake', span: '' },
  { src: cake14, alt: 'Blush Floral Wedding Cake', span: '' },
]

export default function Gallery() {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-60px' })
  const [lightbox, setLightbox] = useState<{ src: string; alt: string } | null>(null)

  return (
    <section className="py-24 px-4 bg-[#FAF3EE]" ref={ref}>
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-14"
        >
          <span className="section-script block">Our Portfolio</span>
          <h2
            className="section-title text-3xl sm:text-4xl mt-2"
            style={{ fontFamily: "'Playfair Display', serif" }}
          >
            Gallery of Dreams
          </h2>
          <div className="divider-ornament mt-4">
            <span className="text-[#C9A84C] text-lg">✦</span>
          </div>
        </motion.div>

        {/* Masonry Grid */}
        <div className="columns-1 sm:columns-2 lg:columns-3 gap-5 space-y-5">
          {galleryImages.map((img, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 24 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: i * 0.08 }}
              className="break-inside-avoid group relative cursor-pointer rounded-2xl overflow-hidden bg-[#E8D5CC] shadow-[0_4px_20px_rgba(44,24,16,0.1)]"
              onClick={() => setLightbox(img)}
            >
              <img
                src={img.src}
                alt={img.alt}
                className="w-full object-cover transition-transform duration-700 group-hover:scale-108"
                style={{ aspectRatio: i % 3 === 0 ? '3/4' : '4/3' }}
                loading="lazy"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[rgba(44,24,16,0.55)] via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-400 flex items-end justify-center pb-6">
                <div className="flex items-center gap-2 text-white text-sm font-sans">
                  <ZoomIn size={16} />
                  <span>View</span>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Lightbox */}
      <AnimatePresence>
        {lightbox && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-[rgba(44,24,16,0.88)]"
            onClick={() => setLightbox(null)}
          >
            <motion.div
              initial={{ scale: 0.88, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.88, opacity: 0 }}
              transition={{ type: 'spring', stiffness: 300, damping: 28 }}
              className="relative max-w-2xl w-full rounded-3xl overflow-hidden shadow-[0_32px_80px_rgba(0,0,0,0.6)]"
              onClick={(e) => e.stopPropagation()}
            >
              <img src={lightbox.src.replace('w=600', 'w=1200')} alt={lightbox.alt} className="w-full object-cover" />
              <button
                className="absolute top-4 right-4 w-10 h-10 rounded-full bg-[rgba(44,24,16,0.72)] text-white flex items-center justify-center hover:bg-[#C17F74] transition-colors"
                onClick={() => setLightbox(null)}
              >
                <X size={18} />
              </button>
              <div className="absolute bottom-0 left-0 right-0 p-4 bg-gradient-to-t from-[rgba(44,24,16,0.8)] to-transparent">
                <p className="text-[#F5E6E0] text-sm font-sans">{lightbox.alt}</p>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  )
}
