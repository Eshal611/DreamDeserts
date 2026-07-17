import { useRef, useState } from 'react'
import { motion, useInView, AnimatePresence } from 'framer-motion'
import { ArrowRight, ArrowLeft, ShoppingBag, Check, Star } from 'lucide-react'
import { useCart } from '../context/CartContext'
import cake1 from "../assets/images/cake1.jpeg";
import cake2 from "../assets/images/cake2.jpeg";
import cake3 from "../assets/images/cake3.jpeg";
import cake4 from "../assets/images/cake4.jpeg";
import cake5 from "../assets/images/cake5.jpeg"
import cake6 from "../assets/images/cake6.jpeg";
import cake7 from "../assets/images/cake7.jpeg";
import cake8 from "../assets/images/cake8.png";
import cake9 from "../assets/images/cake9.png";
import cake10 from "../assets/images/cake10.png";
import cake11 from "../assets/images/cake11.png";
import cake12 from "../assets/images/cake12.png";
import cake13 from "../assets/images/cake13.png";
import cake14 from "../assets/images/cake14.png";
import cake15 from "../assets/images/cake15.png";
import cake16 from "../assets/images/cake16.png";
import cake17 from "../assets/images/cake17.png";
import cake18 from "../assets/images/cake18.png";
import cake19 from "../assets/images/cake19.png";
import cake20 from "../assets/images/cake20.png";

interface Product {
  id: string
  name: string
  desc: string
  detail: string
  img: string
  category: string
  highlights: string[]
}

interface CategoryPageProps {
  category: 'birthday' | 'wedding' | 'kids' | 'custom'
  setCurrentPage: (page: string) => void
}

const categoryData = {
  birthday: {
    title: 'Birthday Cakes',
    subtitle: 'Celebrate Every Year in Sweet Style',
    heroImg: 'https://images.unsplash.com/photo-1562777717-dc6984f65a63?w=1920&h=700&fit=crop&auto=format',
    accent: 'Birthdays',
    categoryLabel: 'Birthday Cakes',
    products: [
      {
        id: 'p-crimson-rose-birthday',
        name: 'Crimson Rose Birthday Cake',
        desc: 'Elegant roses, golden wishes',
        detail: 'A uniquely shaped arch cake decorated with fresh red roses, a rustic twine bow, and elegant golden birthday accents.',
        img: cake2,
        category: 'Birthday Cakes',
        highlights: [
          'Unique Arch Shape',
          'Fresh Crimson Roses',
          'Golden Birthday Topper'],
      },
      {
        id: 'p-black-gold-faultline',
        name: 'Black & Gold Fault-Line Cake',
        desc: 'Bold black stripe, golden accents',
        detail: 'A sophisticated white frosted cake featuring a bold black fault-line wrap, embellished with premium gold leaf flakes and metallic golden spheres.',
        img: cake11,
        category: 'Birthday Cakes',
        highlights: [
          'Elegant Black Fault-Line Design',
          'Premium Gold Leaf Accents',
          'Shimmering Metallic Spheres'],
      },

      {
        id: 'p-golden-boss-birthday',
        name: 'Golden Boss Birthday Cake',
        desc: 'Golden spheres, royal celebration',
        detail: 'A premium white frosted cake decorated with striking golden spheres, elegant gold foil patches, and a bold BOSS lettering topper.',
        img: cake6,
        category: 'Birthday Cakes',
        highlights: [
          'Metallic Golden Spheres',
          'Premium Gold Foil Accents',
          'Custom BOSS Lettering'
        ],
      },
      {
        id: 'p-fairy-dream-birthday',
        name: 'Fairy Dream Birthday Cake',
        desc: 'Magical butterflies, fairy dust',
        detail: 'A whimsical two-tiered pink and purple gradient cake adorned with beautiful butterflies, cute mushrooms, and enchanted fairy toppers.',
        img: cake7,
        category: 'Birthday Cakes',
        highlights: [
          'Two-Tiered Gradient Frosting',
          'Vibrant Butterfly Accents',
          'Whimsical Fairy & Mushroom Theme'
        ],
      },
      {
        id: 'p-festive-celebration-birthday',
        name: 'Festive Celebration Birthday Cake',
        desc: 'Sweet layers, colorful joy',
        detail: 'A beautiful and vibrant birthday cake handcrafted with premium frosting and custom toppings for a memorable celebration.',
        img: cake4,
        category: 'Birthday Cakes',
        highlights: [
          'Custom Birthday Theme',
          'Premium Frosting',
          'Handcrafted Details'
        ],
      },
    ],
  },
  wedding: {
    title: 'Wedding Cakes',
    subtitle: 'A Masterpiece for Your Perfect Day',
    heroImg: 'https://images.unsplash.com/photo-1623428187969-5da2dcea5ebf?w=1920&h=700&fit=crop&auto=format',
    accent: 'Weddings',
    categoryLabel: 'Wedding Cakes',
    products: [
      {
        id: 'p-sunset-silhouette-wedding',
        name: 'Sunset Silhouette Wedding Cake',
        desc: 'Golden accents, romantic charm',
        detail: 'A romantic white wedding cake detailed with elegant gold foil, delicate pearls, fresh crimson roses, and a beautiful silhouette topper.',
        img: cake5,
        category: 'Wedding Cakes',
        highlights: [
          'Romantic Silhouette Topper',
          'Premium Gold Foil Leaf',
          'Fresh Crimson Rose Accents'
        ],
      },
      {
        id: 'p-baat-pakki-celebration',
        name: 'Baat Pakki Celebration Cake',
        desc: 'Sweet beginnings, golden text',
        detail: 'A charming white frosted cake decorated with delicate pink piping, elegant pearls, butterflies, and custom golden Baat Pakki lettering.',
        img: cake8,
        category: 'Wedding Cakes',
        highlights: [
          'Custom Urdu/Hindi Lettering',
          'Delicate Pink Ruffle Piping',
          'Shimmering Pearl Accents'
        ],
      },
      {
        id: 'p-crimson-faultline-wedding',
        name: 'Crimson Fault-Line Wedding Cake',
        desc: 'Crimson fault-line, golden borders',
        detail: 'An elegant white frosted cake featuring a vibrant red fault-line effect, premium gold leaf borders, and beautiful fresh red roses.',
        img: cake12,
        category: 'Wedding Cakes',
        highlights: [
          'Vibrant Red Fault-Line Design',
          'Premium Gold Leaf Borders',
          'Fresh Red Rose Accents'
        ],
      },
      {
        id: 'p-blush-floral-wedding',
        name: 'Blush Floral Wedding Cake',
        desc: 'Soft pink tones, delicate pearls',
        detail: 'A minimalist and elegant soft pink wedding cake decorated with shimmering white pearls on top and a beautiful pink floral accent at the base.',
        img: cake14,
        category: 'Wedding Cakes',
        highlights: [
          'Elegant Blush Pink Frosting',
          'Shimmering White Pearl Toppings',
          'Delicate Floral Base Accent'
        ],
      },
      {
        id: 'p-vintage-monochrome-wedding',
        name: 'Vintage Monochrome Wedding Cake',
        desc: 'Classic lambeth piping, elegant ribbons',
        detail: 'A trendy retro-style white wedding cake featuring detailed lambeth buttercream piping, delicate black ribbon bows, and charming painted black hearts.',
        img: cake15,
        category: 'Wedding Cakes',
        highlights: [
          'Classic Lambeth Piping Design',
          'Elegant Black Ribbon Accents',
          'Minimalist Black Heart Details'
        ],
      },
    ],
  },
  kids: {
    title: 'Kids Theme Cakes',
    subtitle: 'Making Childhood Dreams Edible',
    heroImg: 'https://images.unsplash.com/photo-1558636508-e0969431f215?w=1920&h=700&fit=crop&auto=format',
    accent: 'Little Ones',
    categoryLabel: 'Kids Theme Cakes',
    products: [
      {
        id: 'p-balloon-girl-kids-theme',
        name: 'Whimsical Balloon Girl Cake',
        desc: 'Cute pink balloons, playful charm',
        detail: 'A delightful white frosted cake featuring a cute illustrated girl holding a vibrant bunch of pink, purple, and silver spherical balloons.',
        img: cake16,
        category: 'Kids Theme Cakes',
        highlights: [
          'Playful Spherical Balloon Toppers',
          'Charming Girl Illustration Art',
          'Delicate Butterfly Accents'
        ],
      },
      {
        id: 'p-floral-doll-kids-theme',
        name: 'Floral Doll Princess Cake',
        desc: '3D fondant dress, magical butterflies',
        detail: 'A whimsical white frosted cake featuring a beautiful doll topper with a flowing 3D pink fondant dress gown, accented with purple butterflies and elegant white pearls.',
        img: cake17,
        category: 'Kids Theme Cakes',
        highlights: [
          'Handcrafted 3D Fondant Dress Gown',
          'Enchanted Purple Butterfly Accents',
          'Elegant Pearl Embellishments'
        ],
      },
      {
        id: 'p-safari-jungle-kids-theme',
        name: 'Cute Safari Jungle Cake',
        desc: 'Playful animals, vibrant jungle theme',
        detail: 'A bright and fun kids theme cake featuring cute safari animals including a lion, elephant, giraffe, and koala, decorated with green grass piping and a soft blue sky watercolor effect.',
        img: cake18,
        category: 'Kids Theme Cakes',
        highlights: [
          'Adorable Safari Animal Toppers',
          'Vibrant Green Grass Base Piping',
          'Playful Palm Tree & Jungle Elements'
        ],
      },
      {
        id: 'p-chibi-bears-kids-theme',
        name: 'Chibi Bears Cartoon Cake',
        desc: 'Adorable cartoon characters, creamy borders',
        detail: 'A sweet and simple white frosted cake topped with a cute edible illustration of two hugging chibi cartoon bears, finished with soft cream piping borders.',
        img: cake19,
        category: 'Kids Theme Cakes',
        highlights: [
          'Adorable Chibi Bear Illustration',
          'Classic Smooth Buttercream Frosting',
          'Elegant Shell Piping Border'
        ],
      },
      {
        id: 'p-ruffled-doll-kids-theme',
        name: 'Elegant Ruffled Doll Cake',
        desc: 'Pink buttercream ruffles, golden butterflies',
        detail: 'A beautiful white cake featuring a stylish doll topper with a stunning flowing dress made of detailed pink buttercream ruffles, decorated with purple and gold butterflies.',
        img: cake20,
        category: 'Kids Theme Cakes',
        highlights: [
          'Detailed Pink Buttercream Ruffle Dress',
          'Elegant Doll Silhouette Topper',
          'Purple & Gold Butterfly Accents'
        ],
      },
    ],
  },
  custom: {
    title: 'Custom Cakes',
    subtitle: 'Your Vision, Our Craft',
    heroImg: 'https://images.unsplash.com/photo-1535141192574-5d4897c12636?w=1920&h=700&fit=crop&auto=format',
    accent: 'Custom',
    categoryLabel: 'Custom Cakes',
    products: [
      {
        id: 'p-custom-photo-print',
        name: 'Custom Photo Print Cake',
        desc: 'Personalized prints, golden flakes',
        detail: 'A square frosted custom cake featuring a high-quality edible photo print, bordered with elegant cream piping and gold leaf flakes.',
        img: cake9,
        category: 'Custom Cakes',
        highlights: [
          'Edible Photo Print',
          'Square Elegant Border',
          'Premium Gold Leaf Flakes'
        ],
      },
      {
        id: 'p-half-graduation-custom',
        name: 'Half Graduation Custom Cake',
        desc: 'Academic success, golden pearls',
        detail: 'An elegant white cake celebrating academic milestones, topped with a custom fondente graduation cap, tassel, diploma, and a beautiful golden pearl quilted pattern.',
        img: cake10,
        category: 'Custom Cakes',
        highlights: [
          'Handcrafted Graduation Cap Topper',
          'Elegant Quilted Pearl Design',
          'Custom Celebration Ribbon'
        ],
      },
      {
        id: 'p-serene-ocean-custom',
        name: 'Serene Ocean Custom Cake',
        desc: 'Ocean breeze, silver elegance',
        detail: 'An elegant two-tiered square cake featuring textured blue waves, premium silver leaf accents, and a stunning floral topper.',
        img: cake1,
        category: 'Custom Cakes',
        highlights: [
          'Two-Tiered Square Design',
          'Silver Leaf Detailing',
          'Textured Buttercream Waves'
        ],
      },
      {
        id: 'p-kiwi-delight-custom',
        name: 'Kiwi Delight Custom Cake',
        desc: 'Fresh kiwi, elegant vertical ruffles',
        detail: 'A uniquely designed custom cake wrapped in elegant vertical cream ruffles, topped and accented with vibrant, fresh kiwi slices.',
        img: cake3,
        category: 'Custom Cakes',
        highlights: [
          'Fresh Kiwi Topping & Accents',
          'Unique Vertical Ruffle Piping',
          'Light & Premium Cream Frosting'
        ],
      },
      {
        id: 'p-chatgpt-graduation-custom',
        name: 'ChatGPT Graduation Custom Cake',
        desc: 'Tech milestones, quirky celebrations',
        detail: 'A creative white and navy blue graduation cake featuring playful Flork meme characters, a ChatGPT plaque, a handcrafted fondant cap, and elegant gold foil accents.',
        img: cake13,
        category: 'Custom Cakes',
        highlights: [
          'Fun Flork Meme & ChatGPT Theme',
          'Handcrafted Fondant Graduation Cap & Scroll',
          'Premium Navy Blue & Gold Leaf Base'
        ],
      }
    ],
  },
}

function ProductCard({ product, index, setCurrentPage }: { product: Product; index: number; setCurrentPage: (p: string) => void }) {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-40px' })
  const { addItem } = useCart()
  const [added, setAdded] = useState(false)

  const handleAdd = () => {
    addItem({
      id: product.id,
      name: product.name,
      category: product.category,
      desc: product.desc,
      img: product.img,
    })
    setAdded(true)
    setTimeout(() => setAdded(false), 2200)
  }

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 32 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.6, delay: index * 0.1 }}
      className="card-hover group bg-white rounded-3xl overflow-hidden border border-[#F0E4DC] shadow-[0_4px_24px_rgba(44,24,16,0.07)] flex flex-col"
    >
      {/* Image */}
      <div className="relative overflow-hidden aspect-[16/10] bg-[#F5E6E0]">
        <img
          src={product.img}
          alt={product.name}
          className="w-[105%] h-full object-cover object-center transition-transform duration-700 group-hover:scale-110"
          loading="lazy"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-[rgba(44,24,16,0.4)] via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-400" />
        {/* Stars */}
        <div className="absolute top-4 right-4 flex gap-0.5">
          {[...Array(5)].map((_, s) => (
            <Star key={s} size={10} fill="#C9A84C" className="text-[#C9A84C]" />
          ))}
        </div>
      </div>

      {/* Content */}
      <div className="p-6 flex flex-col flex-1">
        <h3
          className="font-display font-semibold text-[#2C1810] text-lg mb-1"
          style={{ fontFamily: "'Playfair Display', serif" }}
        >
          {product.name}
        </h3>
        <p className="text-[#C17F74] text-xs font-semibold tracking-wide uppercase mb-2">{product.desc}</p>
        <p className="text-[#7A5C52] text-sm leading-relaxed mb-4 font-light">{product.detail}</p>

        {/* Highlights */}
        <ul className="flex flex-wrap gap-2 mb-5">
          {product.highlights.map((h) => (
            <li
              key={h}
              className="text-xs text-[#7A5C52] bg-[#FAF3EE] px-2.5 py-1 rounded-full border border-[#F0E4DC]"
            >
              {h}
            </li>
          ))}
        </ul>

        {/* Actions */}
        <div className="flex items-center gap-3 mt-auto">
          <button
            onClick={() => setCurrentPage('booking')}
            className="flex items-center gap-1.5 text-[#C17F74] text-sm font-semibold tracking-wide group/btn"
          >
            Order
            <ArrowRight size={14} className="transition-transform duration-300 group-hover/btn:translate-x-1" />
          </button>
          <button
            onClick={handleAdd}
            className={`ml-auto flex items-center gap-1.5 px-4 py-2 rounded-full text-xs font-semibold tracking-wide transition-all duration-300 ${added
              ? 'bg-green-500/10 text-green-600 border border-green-200'
              : 'bg-[#F5E6E0] text-[#C17F74] hover:bg-[#C17F74] hover:text-white'
              }`}
          >
            <AnimatePresence mode="wait">
              {added ? (
                <motion.span key="check" initial={{ scale: 0 }} animate={{ scale: 1 }} exit={{ scale: 0 }} className="flex items-center gap-1.5">
                  <Check size={12} /> Added!
                </motion.span>
              ) : (
                <motion.span key="bag" initial={{ scale: 0 }} animate={{ scale: 1 }} exit={{ scale: 0 }} className="flex items-center gap-1.5">
                  <ShoppingBag size={12} /> Add to Cart
                </motion.span>
              )}
            </AnimatePresence>
          </button>
        </div>
      </div>
    </motion.div>
  )
}

export default function CategoryPage({ category, setCurrentPage }: CategoryPageProps) {
  const data = categoryData[category]

  return (
    <div className="min-h-screen bg-[#FFFDF8]">
      {/* Hero */}
      <section className="relative h-[42vh] sm:h-[52vh] flex items-end justify-start overflow-hidden">
        <div className="absolute inset-0 bg-[#2C1810]">
          <img
            src={data.heroImg}
            alt={data.title}
            className="w-full h-full object-cover opacity-50"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[rgba(44,24,16,0.85)] via-[rgba(44,24,16,0.35)] to-transparent" />
        </div>
        <div className="relative z-10 max-w-7xl mx-auto w-full px-6 pb-12">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}>
            <span style={{ fontFamily: "'Great Vibes', cursive" }} className="block text-3xl text-[#F5C5B5] mb-1">
              {data.accent}
            </span>
            <h1
              className="font-display text-4xl sm:text-5xl font-bold text-[#FFFDF8]"
              style={{ fontFamily: "'Playfair Display', serif" }}
            >
              {data.title}
            </h1>
            <p className="text-[#E8D5CC] text-base mt-2 font-light">{data.subtitle}</p>
          </motion.div>
        </div>
      </section>

      {/* Breadcrumb */}
      <div className="max-w-7xl mx-auto px-6 py-5">
        <button
          onClick={() => { setCurrentPage('home'); window.scrollTo({ top: 0 }) }}
          className="flex items-center gap-2 text-sm text-[#7A5C52] hover:text-[#C17F74] transition-colors"
        >
          <ArrowLeft size={14} /> Back to Home
        </button>
      </div>

      {/* Products */}
      <section className="py-8 px-4 pb-24">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12">
            <span className="section-script block">Our Collection</span>
            <h2
              className="section-title text-3xl mt-2"
              style={{ fontFamily: "'Playfair Display', serif" }}
            >
              {data.title}
            </h2>
            <div className="divider-ornament mt-4"><span className="text-[#C9A84C]">✦</span></div>
            <p className="text-[#7A5C52] text-sm mt-3 max-w-lg mx-auto font-light">
              All cakes are custom-priced based on design, size, and flavor. Add to cart and we'll send you a personalized quote.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
            {data.products.map((p, i) => (
              <ProductCard key={p.id} product={p} index={i} setCurrentPage={setCurrentPage} />
            ))}
          </div>

          <div className="text-center mt-14">
            <p className="text-[#7A5C52] text-sm mb-5 font-light">
              Don't see what you're looking for? We create fully bespoke cakes!
            </p>
            <button onClick={() => setCurrentPage('booking')} className="btn-primary">
              Book a Custom Cake
              <ArrowRight size={15} />
            </button>
          </div>
        </div>
      </section>
    </div>
  )
}
