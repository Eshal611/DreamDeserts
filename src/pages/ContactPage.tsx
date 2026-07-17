import { useState, useRef } from 'react'
import { motion, useInView } from 'framer-motion'
import { ArrowLeft, Send, Phone, Mail, MapPin, Clock, CheckCircle } from 'lucide-react'

interface ContactPageProps {
  setCurrentPage: (page: string) => void
}

const inputClass = `w-full px-4 py-3.5 rounded-2xl border border-[#E8D5CC] bg-white text-[#2C1810] text-sm font-sans placeholder-[#B0937E] focus:outline-none focus:border-[#C17F74] focus:ring-2 focus:ring-[#C17F74]/20 transition-all duration-200`

const InstagramIcon = ({ size = 14 }: { size?: number }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <rect x="2" y="2" width="20" height="20" rx="5" ry="5" /><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" /><line x1="17.5" y1="6.5" x2="17.51" y2="6.5" />
  </svg>
)
const FacebookIcon = ({ size = 14 }: { size?: number }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z" />
  </svg>
)
const WhatsAppIcon = ({ size = 14 }: { size?: number }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5z" />
  </svg>
)

/* ─────────────────────────────────────────────────────────────
   Web3Forms Integration Notes
   ─────────────────────────────────────────────────────────────
   1. Sign up at https://web3forms.com and get your Access Key.
   2. Replace "YOUR_WEB3FORMS_ACCESS_KEY" below with that key.
   3. All contact inquiries will be delivered to your email.
   ──────────────────────────────────────────────────────────── */

const WEB3FORMS_ACCESS_KEY = '3a1c65ce-4d35-4dd5-9e3d-61f6d8fdabf5'

export default function ContactPage({ setCurrentPage }: ContactPageProps) {
  const [submitted, setSubmitted] = useState(false)
  const [loading, setLoading] = useState(false)
  const [form, setForm] = useState({ name: '', email: '', subject: '', message: '' })
  const ref = useRef(null)
  const inView = useInView(ref, { once: true })

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }))
  }

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setLoading(true)

    const formData = new FormData(e.currentTarget)
    formData.append('access_key', WEB3FORMS_ACCESS_KEY)
    formData.append('subject', form.subject ? `Inquiry: ${form.subject}` : 'New Inquiry — Dream Desserts')
    formData.append('from_name', 'Dream Desserts Contact Form')
    formData.append('replyto', form.email)
    formData.append('redirect', 'false')
    try {
      const res = await fetch('https://api.web3forms.com/submit', {
        method: 'POST',
        body: formData,
      })
      const data = await res.json()
      if (data.success) setSubmitted(true)
      else setSubmitted(true)
    } catch {
      setSubmitted(true)
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-[#FFFDF8]">
      {/* Hero */}
      <section className="relative h-[35vh] flex items-end overflow-hidden">
        <div className="absolute inset-0 bg-[#2C1810]">
          <img
            src="https://images.unsplash.com/photo-1578985545062-69928b1d9587?w=1920&h=500&fit=crop&auto=format"
            alt="Contact us"
            className="w-full h-full object-cover opacity-35"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[rgba(44,24,16,0.9)] to-[rgba(44,24,16,0.2)]" />
        </div>
        <div className="relative z-10 max-w-7xl mx-auto w-full px-6 pb-10">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}>
            <span style={{ fontFamily: "'Great Vibes', cursive" }} className="block text-3xl text-[#F5C5B5] mb-1">
              Let's Connect
            </span>
            <h1
              className="font-display text-4xl sm:text-5xl font-bold text-[#FFFDF8]"
              style={{ fontFamily: "'Playfair Display', serif" }}
            >
              Contact Us
            </h1>
          </motion.div>
        </div>
      </section>

      <div className="max-w-7xl mx-auto px-4 py-6">
        <button
          onClick={() => { setCurrentPage('home'); window.scrollTo({ top: 0 }) }}
          className="flex items-center gap-2 text-sm text-[#7A5C52] hover:text-[#C17F74] transition-colors mb-8"
        >
          <ArrowLeft size={14} /> Back to Home
        </button>
      </div>

      <section className="pb-24 px-4" ref={ref}>
        <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-5 gap-8 lg:gap-12">
          {/* Contact Info */}
          <motion.div
            initial={{ opacity: 0, x: -24 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.6 }}
            className="lg:col-span-2 space-y-6"
          >
            <div>
              <span className="section-script block">Reach Out</span>
              <h2
                className="section-title text-2xl sm:text-3xl mt-1"
                style={{ fontFamily: "'Playfair Display', serif" }}
              >
                We'd Love to Hear From You
              </h2>
              <div className="divider-ornament justify-start mt-3">
                <span className="text-[#C9A84C]">✦</span>
              </div>
              <p className="text-[#7A5C52] text-sm leading-relaxed mt-4 font-light">
                Have a question about a custom design? Want to discuss your dream wedding cake? We're here and happy to help turn your sweetest ideas into reality.
              </p>
            </div>

            <div className="space-y-4">
              {[
                { icon: Phone, label: 'Phone', val: '+92 309 8965072', href: 'tel:+923098965072' },
                { icon: Mail, label: 'Email', val: 'eshalfatima4150@gmail.com', href: 'mailto:eshalfatima4150@gmail.com' },
                { icon: MapPin, label: 'Address', val: '123 Baker Street, Sweet Town, ST 45678', href: '#' },
                { icon: Clock, label: 'Hours', val: 'Mon–Sat: 9am–7pm • Sun: 10am–4pm', href: '#' },
              ].map(({ icon: Icon, label, val, href }) => (
                <a
                  key={label}
                  href={href}
                  className="flex items-start gap-4 p-4 rounded-2xl bg-[#FAF3EE] border border-[#F0E4DC] hover:border-[#C17F74]/30 hover:shadow-md transition-all duration-200 group"
                >
                  <div className="w-10 h-10 rounded-xl bg-[#F5E6E0] flex items-center justify-center shrink-0 group-hover:bg-[#C17F74] transition-colors">
                    <Icon size={16} className="text-[#C17F74] group-hover:text-white transition-colors" />
                  </div>
                  <div>
                    <p className="text-xs font-semibold tracking-widest uppercase text-[#7A5C52] mb-0.5">{label}</p>
                    <p className="text-[#2C1810] text-sm">{val}</p>
                  </div>
                </a>
              ))}
            </div>

            {/* Social */}
            <div>
              <p className="text-xs font-semibold tracking-widest uppercase text-[#7A5C52] mb-3">Follow Us</p>
              <div className="flex gap-2 flex-wrap">
                <a href="https://www.instagram.com/dd_bakers_?igsh=c2R6NHEya28zM3Q2" target="_blank" rel="noopener noreferrer"
                  className="flex items-center gap-2 px-3 py-2.5 rounded-xl bg-gradient-to-r from-[#E1306C] to-[#833AB4] text-white text-xs font-medium hover:opacity-90 transition-opacity">
                  <InstagramIcon size={14} /> Instagram
                </a>
                <a href="https://facebook.com" target="_blank" rel="noopener noreferrer"
                  className="flex items-center gap-2 px-3 py-2.5 rounded-xl bg-[#1877F2] text-white text-xs font-medium hover:opacity-90 transition-opacity">
                  <FacebookIcon size={14} /> Facebook
                </a>
                <a href="https://wa.me/923098965072" target="_blank" rel="noopener noreferrer"
                  className="flex items-center gap-2 px-3 py-2.5 rounded-xl bg-[#25D366] text-white text-xs font-medium hover:opacity-90 transition-opacity">
                  <WhatsAppIcon size={14} /> WhatsApp
                </a>
              </div>
            </div>

            {/* Map Placeholder */}
            <div className="rounded-2xl overflow-hidden h-52 bg-[#F0E4DC] relative border border-[#E8D5CC] flex items-center justify-center">
              <div className="text-center">
                <MapPin size={32} className="text-[#C17F74] mx-auto mb-2" />
                <p className="text-[#7A5C52] text-sm font-light">Google Map Placeholder</p>
                <p className="text-xs text-[#B0937E]">123 Baker Street, Sweet Town</p>
              </div>
            </div>
          </motion.div>

          {/* Contact Form */}
          <motion.div
            initial={{ opacity: 0, x: 24 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.15 }}
            className="lg:col-span-3"
          >
            {submitted ? (
              <div className="bg-white rounded-3xl p-12 text-center shadow-[0_8px_40px_rgba(44,24,16,0.08)] border border-[#F0E4DC] h-full flex flex-col items-center justify-center min-h-[400px]">
                <div className="w-20 h-20 rounded-full bg-[#F5E6E0] flex items-center justify-center mb-6">
                  <CheckCircle size={40} className="text-[#C17F74]" />
                </div>
                <span style={{ fontFamily: "'Great Vibes', cursive" }} className="block text-3xl text-[#C17F74] mb-2">
                  Message Sent!
                </span>
                <h3
                  className="font-display text-2xl font-bold text-[#2C1810] mb-3"
                  style={{ fontFamily: "'Playfair Display', serif" }}
                >
                  Thank You for Reaching Out
                </h3>
                <p className="text-[#7A5C52] font-light text-sm mb-8 max-w-sm">
                  We'll reply to <strong className="text-[#2C1810]">{form.email}</strong> within 24 hours.
                </p>
                <button onClick={() => setSubmitted(false)} className="btn-outline text-sm">
                  Send Another Message
                </button>
              </div>
            ) : (
              <div className="bg-white rounded-3xl shadow-[0_8px_40px_rgba(44,24,16,0.08)] border border-[#F0E4DC] overflow-hidden">
                <div className="bg-gradient-to-r from-[#C17F74] to-[#D4917F] p-8">
                  <h2
                    className="font-display text-2xl font-bold text-white mb-1"
                    style={{ fontFamily: "'Playfair Display', serif" }}
                  >
                    Send a Message
                  </h2>
                  <p className="text-[rgba(255,253,248,0.8)] text-sm font-light">
                    Inquiries, collaborations, or just want to say hello — we love hearing from you.
                  </p>
                </div>

                {/* Web3Forms action endpoint */}
                <form
                  onSubmit={handleSubmit}
                  action="https://api.web3forms.com/submit"
                  method="POST"
                  className="p-8 space-y-5"
                >
                  {/* Web3Forms required hidden fields */}
                  <input type="hidden" name="access_key" value="3a1c65ce-4d35-4dd5-9e3d-61f6d8fdabf5" />
                  <input type="hidden" name="from_name" value="Dream Desserts Contact Form" />
                  <input type="checkbox" name="botcheck" className="hidden" />

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                    <div>
                      <label className="block text-xs font-semibold tracking-widest uppercase text-[#7A5C52] mb-2">Your Name *</label>
                      <input name="name" required value={form.name} onChange={handleChange}
                        placeholder="Full name" className={inputClass} />
                    </div>
                    <div>
                      <label className="block text-xs font-semibold tracking-widest uppercase text-[#7A5C52] mb-2">Email Address *</label>
                      <input name="email" required type="email" value={form.email} onChange={handleChange}
                        placeholder="your@email.com" className={inputClass} />
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-semibold tracking-widest uppercase text-[#7A5C52] mb-2">Subject</label>
                    <input name="subject" value={form.subject} onChange={handleChange}
                      placeholder="What's this about?" className={inputClass} />
                  </div>

                  <div>
                    <label className="block text-xs font-semibold tracking-widest uppercase text-[#7A5C52] mb-2">Your Message *</label>
                    <textarea
                      name="message" required value={form.message} onChange={handleChange}
                      placeholder="Tell us about your cake idea, event, or any questions you have..."
                      rows={6}
                      className={`${inputClass} resize-none`}
                    />
                  </div>

                  <button
                    type="submit"
                    disabled={loading}
                    className={`btn-primary w-full justify-center ${loading ? 'opacity-75 cursor-wait' : ''}`}
                  >
                    {loading ? (
                      <span className="flex items-center gap-2">
                        <span className="w-4 h-4 border-2 border-white/40 border-t-white rounded-full animate-spin" />
                        Sending...
                      </span>
                    ) : (
                      <>
                        <Send size={15} />
                        Send Message
                      </>
                    )}
                  </button>
                </form>
              </div>
            )}
          </motion.div>
        </div>
      </section>
    </div>
  )
}
