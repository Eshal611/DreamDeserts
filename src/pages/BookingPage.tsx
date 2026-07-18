import { useState, useRef } from 'react'
import { motion, useInView } from 'framer-motion'
import { ArrowLeft, Send, Upload, CheckCircle } from 'lucide-react'

interface BookingPageProps {
  setCurrentPage: (page: string) => void
}

const inputClass = `w-full px-4 py-3.5 rounded-2xl border border-[#E8D5CC] bg-white text-[#2C1810] text-sm font-sans placeholder-[#B0937E] focus:outline-none focus:border-[#C17F74] focus:ring-2 focus:ring-[#C17F74]/20 transition-all duration-200`

/* ─────────────────────────────────────────────────────────────
   Web3Forms Integration Notes
   ─────────────────────────────────────────────────────────────
   1. Sign up at https://web3forms.com and get your Access Key.
   2. Replace "YOUR_WEB3FORMS_ACCESS_KEY" below with that key.
   3. The form will POST to https://api.web3forms.com/submit
      and route submissions to your registered email address.
   ──────────────────────────────────────────────────────────── */

const WEB3FORMS_ACCESS_KEY = 'f80f5ad6-afdb-4758-b117-c1303a89e622'

export default function BookingPage({ setCurrentPage }: BookingPageProps) {
  const [submitted, setSubmitted] = useState(false)
  const [loading, setLoading] = useState(false)
  const [fileName, setFileName] = useState('')
  const [form, setForm] = useState({
    name: '', phone: '', email: '', category: '', date: '', weight: '', flavor: '', instructions: '',
  })
  const ref = useRef(null)
  const inView = useInView(ref, { once: true })

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }))
  }

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setLoading(true)

    const formData = new FormData(e.currentTarget)
    // formData.append('access_key', WEB3FORMS_ACCESS_KEY)
    formData.append('subject', `New Cake Booking Request — ${form.name}`)
    formData.append('from_name', 'Dream Desserts Booking Form')
    formData.append('reply_to', form.email)
    console.log("Access Key =", formData.get("access_key"))
    try {
      const res = await fetch('https://api.web3forms.com/submit', {
        method: 'POST',
        body: formData,
      })
      console.log(res.status)

      const data = await res.json()
      console.log("Response:", data)
      console.log("Message:", data.message)
      if (data.success) {
        setSubmitted(true)

        setForm({
          name: '',
          phone: '',
          email: '',
          category: '',
          date: '',
          weight: '',
          flavor: '',
          instructions: '',
        })

        setFileName('')
      } else {
        alert('Failed to submit order. Please try again.')
      }
    } catch {
      alert('Something went wrong. Please try again.')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-[#FAF3EE]">
      {/* Hero */}
      <section className="relative h-[35vh] flex items-end overflow-hidden">
        <div className="absolute inset-0 bg-[#2C1810]">
          <img
            src="https://images.unsplash.com/photo-1464349095431-e9a21285b5f3?w=1920&h=500&fit=crop&auto=format"
            alt="Booking hero"
            className="w-full h-full object-cover opacity-40"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[rgba(44,24,16,0.9)] to-transparent" />
        </div>
        <div className="relative z-10 max-w-7xl mx-auto w-full px-6 pb-10">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}>
            <span style={{ fontFamily: "'Great Vibes', cursive" }} className="block text-3xl text-[#F5C5B5] mb-1">
              Place Your Order
            </span>
            <h1
              className="font-display text-4xl sm:text-5xl font-bold text-[#FFFDF8]"
              style={{ fontFamily: "'Playfair Display', serif" }}
            >
              Book Your Dream Cake
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
        <div className="max-w-3xl mx-auto">
          {submitted ? (
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              className="bg-white rounded-3xl p-12 text-center shadow-[0_8px_40px_rgba(44,24,16,0.1)] border border-[#F0E4DC]"
            >
              <div className="w-20 h-20 rounded-full bg-[#F5E6E0] flex items-center justify-center mx-auto mb-6">
                <CheckCircle size={40} className="text-[#C17F74]" />
              </div>
              <span style={{ fontFamily: "'Great Vibes', cursive" }} className="block text-3xl text-[#C17F74] mb-2">
                Order Received!
              </span>
              <h2
                className="font-display text-2xl font-bold text-[#2C1810] mb-4"
                style={{ fontFamily: "'Playfair Display', serif" }}
              >
                We Got Your Request
              </h2>
              <p className="text-[#7A5C52] text-base font-light mb-2">
                Thank you, <strong className="text-[#2C1810]">{form.name || 'dear customer'}</strong>! Your dream cake order has been submitted.
              </p>
              <p className="text-[#7A5C52] text-sm font-light mb-8">
                We'll reach out within 24 hours to confirm details, discuss your design, and provide a custom quote.
              </p>
              <button
                onClick={() => { setCurrentPage('home'); window.scrollTo({ top: 0 }) }}
                className="btn-primary"
              >
                Back to Home
              </button>
            </motion.div>
          ) : (
            <motion.div
              initial={{ opacity: 0, y: 24 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6 }}
              className="bg-white rounded-3xl shadow-[0_8px_40px_rgba(44,24,16,0.1)] border border-[#F0E4DC] overflow-hidden"
            >
              <div className="bg-gradient-to-r from-[#C17F74] to-[#D4917F] p-8 text-white">
                <h2 className="font-display text-2xl font-bold mb-1" style={{ fontFamily: "'Playfair Display', serif" }}>
                  Cake Order Form
                </h2>
                <p className="text-[rgba(255,253,248,0.8)] text-sm font-light">
                  Fill in the details below and we'll craft a personalized quote just for you.
                </p>
              </div>

              {/* Web3Forms action endpoint */}
              <form
                onSubmit={handleSubmit}
                action="https://api.web3forms.com/submit"
                method="POST"
                encType="multipart/form-data"
                className="p-8 space-y-5"
              >
                {/* Web3Forms required fields */}
                <input type="hidden" name="access_key" value={WEB3FORMS_ACCESS_KEY} />
                {/* <input type="hidden" name="subject" value="New Cake Booking Request — Dream Desserts" /> */}
                <input type="hidden" name="from_name" value="Dream Desserts Booking Form" />
                <input type="checkbox" name="botcheck" className="hidden" />

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                  <div>
                    <label className="block text-xs font-semibold tracking-widest uppercase text-[#7A5C52] mb-2">Full Name *</label>
                    <input name="name" required value={form.name} onChange={handleChange}
                      placeholder="Your full name" className={inputClass} />
                  </div>
                  <div>
                    <label className="block text-xs font-semibold tracking-widest uppercase text-[#7A5C52] mb-2">Phone Number *</label>
                    <input name="phone" required value={form.phone} onChange={handleChange}
                      placeholder="+1 (234) 567-890" className={inputClass} type="tel" />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-semibold tracking-widest uppercase text-[#7A5C52] mb-2">Email Address *</label>
                  <input name="email" required type="email" value={form.email} onChange={handleChange}
                    placeholder="your@email.com" className={inputClass} />
                </div>

                <div>
                  <label className="block text-xs font-semibold tracking-widest uppercase text-[#7A5C52] mb-2">Cake Category *</label>
                  <select name="category" required value={form.category} onChange={handleChange} className={inputClass}>
                    <option value="">Select a category</option>
                    <option value="birthday">Birthday Cake</option>
                    <option value="wedding">Wedding Cake</option>
                    <option value="kids">Kids Theme Cake</option>
                    <option value="custom">Custom Cake</option>
                  </select>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                  <div>
                    <label className="block text-xs font-semibold tracking-widest uppercase text-[#7A5C52] mb-2">Event Date *</label>
                    <input name="date" required value={form.date} onChange={handleChange}
                      type="date" className={inputClass} />
                  </div>
                  <div>
                    <label className="block text-xs font-semibold tracking-widest uppercase text-[#7A5C52] mb-2">Cake Weight</label>
                    <select name="weight" value={form.weight} onChange={handleChange} className={inputClass}>
                      <option value="">Select weight</option>
                      <option value="0.5kg">0.5 kg (Mini)</option>
                      <option value="1kg">1 kg</option>
                      <option value="1.5kg">1.5 kg</option>
                      <option value="2kg">2 kg</option>
                      <option value="3kg">3 kg</option>
                      <option value="4kg+">4 kg+ (Large / Tiered)</option>
                    </select>
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-semibold tracking-widest uppercase text-[#7A5C52] mb-2">Preferred Flavor</label>
                  <select name="flavor" value={form.flavor} onChange={handleChange} className={inputClass}>
                    <option value="">Select a flavor</option>
                    <option value="vanilla">Classic Vanilla Bean</option>
                    <option value="chocolate">Rich Dark Chocolate</option>
                    <option value="redvelvet">Red Velvet</option>
                    <option value="lemon">Lemon Curd</option>
                    <option value="caramel">Salted Caramel</option>
                    <option value="strawberry">Strawberry & Cream</option>
                    <option value="other">Other (Describe below)</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-semibold tracking-widest uppercase text-[#7A5C52] mb-2">Custom Instructions</label>
                  <textarea
                    name="instructions"
                    value={form.instructions}
                    onChange={handleChange}
                    placeholder="Describe your cake design, theme, colors, inscription, dietary requirements, or any special requests..."
                    rows={4}
                    className={`${inputClass} resize-none`}
                  />
                </div>

                {/* <div>
                  <label className="block text-xs font-semibold tracking-widest uppercase text-[#7A5C52] mb-2">Reference Image (Optional)</label>
                  <label className="flex flex-col items-center justify-center gap-3 w-full h-32 rounded-2xl border-2 border-dashed border-[#E8D5CC] bg-[#FAF3EE] cursor-pointer hover:border-[#C17F74] hover:bg-[#F5E6E0] transition-all duration-200">
                    <Upload size={22} className="text-[#C17F74]" />
                    <span className="text-sm text-[#7A5C52] font-sans text-center px-4">
                      {fileName || 'Click to upload or drag & drop'}
                    </span>
                    <span className="text-xs text-[#B0937E]">PNG, JPG, WEBP up to 5MB</span>
                    <input
                      type="file"
                      name="attachment"
                      accept="image/*"
                      className="hidden"
                      onChange={(e) => setFileName(e.target.files?.[0]?.name || '')}
                    />
                  </label>
                </div> */}

                <div className="pt-3">
                  <button
                    type="submit"
                    disabled={loading}
                    className={`btn-primary w-full justify-center text-sm ${loading ? 'opacity-75 cursor-wait' : ''}`}
                  >
                    {loading ? (
                      <span className="flex items-center gap-2">
                        <span className="w-4 h-4 border-2 border-white/40 border-t-white rounded-full animate-spin" />
                        Submitting...
                      </span>
                    ) : (
                      <>
                        <Send size={15} />
                        Submit Order Request
                      </>
                    )}
                  </button>
                  <p className="text-center text-xs text-[#7A5C52] mt-3 font-light">
                    We'll contact you within 24 hours with your custom quote.
                  </p>
                </div>
              </form>
            </motion.div>
          )}
        </div>
      </section>
    </div>
  )
}
