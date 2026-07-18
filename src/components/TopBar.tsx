import { Phone, Mail } from 'lucide-react'

const InstagramIcon = () => (
  <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <rect x="2" y="2" width="20" height="20" rx="5" ry="5"/>
    <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"/>
    <line x1="17.5" y1="6.5" x2="17.51" y2="6.5"/>
  </svg>
)
const FacebookIcon = () => (
  <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"/>
  </svg>
)
const WhatsAppIcon = () => (
  <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5z"/>
  </svg>
)
const TikTokIcon = () => (
  <svg width="13" height="13" viewBox="0 0 24 24" fill="currentColor">
    <path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-2.88 2.5 2.89 2.89 0 0 1-2.89-2.89 2.89 2.89 0 0 1 2.89-2.89c.28 0 .54.04.79.1V9.01a6.33 6.33 0 0 0-.79-.05 6.34 6.34 0 0 0-6.34 6.34 6.34 6.34 0 0 0 6.34 6.34 6.34 6.34 0 0 0 6.33-6.34V8.69a8.27 8.27 0 0 0 4.84 1.55V6.8a4.85 4.85 0 0 1-1.07-.11z"/>
  </svg>
)

export default function TopBar() {
  return (
    <div className="w-full bg-[#2C1810] text-[#F5E6E0] py-2 px-4 text-xs z-50">
      <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-2">
        <div className="flex items-center gap-4 flex-wrap justify-center sm:justify-start">
          <a href="tel:+11234567890" className="flex items-center gap-1.5 hover:text-[#C9A84C] transition-colors">
            <Phone size={11} />
            <span>+92 3098965072</span>
          </a>
          <span className="hidden sm:block text-[#5A3A2E]">|</span>
          <a href="mailto:eshalfatima4150@gmail.com" className="flex items-center gap-1.5 hover:text-[#C9A84C] transition-colors">
            <Mail size={11} />
            <span>nargisbano191@gmail.com</span>
          </a>
        </div>
        <div className="flex items-center gap-3">
          <a href="https://facebook.com" target="_blank" rel="noopener noreferrer" aria-label="Facebook"
            className="hover:text-[#C9A84C] transition-colors">
            <FacebookIcon />
          </a>
          <a href="https://www.instagram.com/dd_bakers_?igsh=c2R6NHEya28zM3Q2" target="_blank" rel="noopener noreferrer" aria-label="Instagram"
            className="hover:text-[#C9A84C] transition-colors">
            <InstagramIcon />
          </a>
          <a href="https://wa.me/03098965072" target="_blank" rel="noopener noreferrer" aria-label="WhatsApp"
            className="hover:text-[#C9A84C] transition-colors">
            <WhatsAppIcon />
          </a>
          <a href="https://tiktok.com" target="_blank" rel="noopener noreferrer" aria-label="TikTok"
            className="hover:text-[#C9A84C] transition-colors">
            <TikTokIcon />
          </a>
        </div>
      </div>
    </div>
  )
}
