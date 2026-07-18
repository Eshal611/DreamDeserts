import { motion } from 'framer-motion'
import { Mail, Phone, MapPin, Clock, ArrowRight, Heart } from 'lucide-react'

const InstagramIcon = () => (
  <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <rect x="2" y="2" width="20" height="20" rx="5" ry="5"/><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"/><line x1="17.5" y1="6.5" x2="17.51" y2="6.5"/>
  </svg>
)
const FacebookIcon = () => (
  <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"/>
  </svg>
)

interface FooterProps {
  setCurrentPage: (page: string) => void
}

export default function Footer({ setCurrentPage }: FooterProps) {
  const navigate = (page: string) => {
    setCurrentPage(page)
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  return (
    <footer className="bg-[#1A0E0A] text-[#E8D5CC]">
      {/* Newsletter Banner */}
      <div className="bg-gradient-to-r from-[#C17F74] via-[#D4917F] to-[#B87068] py-14 px-4">
        <div className="max-w-2xl mx-auto text-center">
          <span
            className="block text-3xl text-[#FFFDF8] mb-2"
            style={{ fontFamily: "'Great Vibes', cursive" }}
          >
            Stay Sweet
          </span>
          <h3
            className="font-display font-bold text-white text-2xl sm:text-3xl mb-4"
            style={{ fontFamily: "'Playfair Display', serif" }}
          >
            Subscribe to Our Newsletter
          </h3>
          <p className="text-[rgba(255,253,248,0.8)] text-sm mb-6 font-light">
            Get seasonal offers, new designs, and baking inspiration delivered straight to your inbox.
          </p>
          <form
            className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto"
            onSubmit={(e) => e.preventDefault()}
          >
            <input
              type="email"
              placeholder="Your email address"
              className="flex-1 px-5 py-3 rounded-full bg-[rgba(255,253,248,0.18)] border border-[rgba(255,253,248,0.3)] text-white placeholder-[rgba(255,253,248,0.6)] text-sm focus:outline-none focus:bg-[rgba(255,253,248,0.25)] transition-colors"
            />
            <button
              type="submit"
              className="px-6 py-3 rounded-full bg-[#2C1810] text-[#FFFDF8] text-sm font-semibold tracking-wide hover:bg-[#3D2314] transition-colors flex items-center gap-2 justify-center whitespace-nowrap"
            >
              Subscribe <ArrowRight size={14} />
            </button>
          </form>
        </div>
      </div>

      {/* Main Footer */}
      <div className="py-16 px-4">
        <div className="max-w-7xl mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10">
          {/* Brand */}
          <div>
            <button onClick={() => navigate('home')} className="text-left mb-4">
              <span
                className="block text-3xl text-[#F5C5B5]"
                style={{ fontFamily: "'Great Vibes', cursive" }}
              >
                Dream Desserts
              </span>
              <span className="text-xs tracking-[0.25em] uppercase text-[#7A5C52] font-light">
                Baked with Love
              </span>
            </button>
            <p className="text-sm text-[#7A5C52] leading-relaxed font-light mb-5">
              A premium home bakery crafting bespoke cakes for life's most cherished moments, made with love and the finest ingredients.
            </p>
            <div className="flex gap-3">
              <a href="https://www.instagram.com/dd_bakers_?igsh=c2R6NHEya28zM3Q2" target="_blank" rel="noopener noreferrer" aria-label="Instagram"
                className="w-9 h-9 rounded-full border border-[#3D2314] flex items-center justify-center text-[#7A5C52] hover:bg-[#C17F74] hover:border-[#C17F74] hover:text-white transition-all duration-300">
                <InstagramIcon />
              </a>
              <a href="https://facebook.com" target="_blank" rel="noopener noreferrer" aria-label="Facebook"
                className="w-9 h-9 rounded-full border border-[#3D2314] flex items-center justify-center text-[#7A5C52] hover:bg-[#C17F74] hover:border-[#C17F74] hover:text-white transition-all duration-300">
                <FacebookIcon />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="font-display font-semibold text-[#FFFDF8] mb-5 text-sm tracking-widest uppercase" style={{ fontFamily: "'Playfair Display', serif" }}>
              Quick Links
            </h4>
            <ul className="space-y-2.5">
              {[
                { label: 'Home', page: 'home' },
                { label: 'About Us', page: 'about' },
                { label: 'Gallery', page: 'gallery' },
                  { label: 'Contact', page: 'contact' },
                { label: 'Book a Cake', page: 'booking' },
              ].map((l) => (
                <li key={l.page}>
                  <button
                    onClick={() => navigate(l.page)}
                    className="text-sm text-[#7A5C52] hover:text-[#C17F74] transition-colors font-sans flex items-center gap-1.5 group"
                  >
                    <ArrowRight size={11} className="opacity-0 group-hover:opacity-100 transition-opacity -translate-x-1 group-hover:translate-x-0 transition-transform" />
                    {l.label}
                  </button>
                </li>
              ))}
            </ul>
          </div>

          {/* Services */}
          <div>
            <h4 className="font-display font-semibold text-[#FFFDF8] mb-5 text-sm tracking-widest uppercase" style={{ fontFamily: "'Playfair Display', serif" }}>
              Our Services
            </h4>
            <ul className="space-y-2.5">
              {[
                { label: 'Birthday Cakes', page: 'birthday' },
                { label: 'Wedding Cakes', page: 'wedding' },
                { label: 'Custom Cakes', page: 'custom' },
                { label: 'Kids Theme Cakes', page: 'kids' },
              ].map((s) => (
                <li key={s.page}>
                  <button
                    onClick={() => navigate(s.page)}
                    className="text-sm text-[#7A5C52] hover:text-[#C17F74] transition-colors font-sans flex items-center gap-1.5 group"
                  >
                    <ArrowRight size={11} className="opacity-0 group-hover:opacity-100 transition-opacity -translate-x-1 group-hover:translate-x-0 transition-transform" />
                    {s.label}
                  </button>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="font-display font-semibold text-[#FFFDF8] mb-5 text-sm tracking-widest uppercase" style={{ fontFamily: "'Playfair Display', serif" }}>
              Get in Touch
            </h4>
            <ul className="space-y-4">
              <li className="flex items-start gap-3">
                <Phone size={14} className="text-[#C17F74] mt-0.5 shrink-0" />
                <span className="text-sm text-[#7A5C52]">0309 8965072</span>
              </li>
              <li className="flex items-start gap-3">
                <Mail size={14} className="text-[#C17F74] mt-0.5 shrink-0" />
                <span className="text-sm text-[#7A5C52]">nargisbano191@gmail.com</span>
              </li>
              <li className="flex items-start gap-3">
                <MapPin size={14} className="text-[#C17F74] mt-0.5 shrink-0" />
                <span className="text-sm text-[#7A5C52]">Jhal Satyana Road West Canal Road</span>
              </li>
              <li className="flex items-start gap-3">
                <Clock size={14} className="text-[#C17F74] mt-0.5 shrink-0" />
                <span className="text-sm text-[#7A5C52]">24 Hours<br />Available</span>
              </li>
            </ul>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="border-t border-[#2A1610] py-5 px-4">
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-2 text-xs text-[#5A3A2E]">
          <p>© 2026 Dream Desserts. All rights reserved.</p>
          <p className="flex items-center gap-1">
            Made with <Heart size={11} fill="#C17F74" className="text-[#C17F74]" /> for every celebration
          </p>
        </div>
      </div>
    </footer>
  )
}
