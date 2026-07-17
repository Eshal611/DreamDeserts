import { useState, useRef } from 'react'
import { motion, useInView } from 'framer-motion'
import { ArrowLeft, CheckCircle, ShoppingBag, Trash2, MapPin, User, CreditCard } from 'lucide-react'
import { useCart } from '../context/CartContext'

interface CheckoutPageProps {
  setCurrentPage: (page: string) => void
}

const inputClass = `w-full px-4 py-3.5 rounded-2xl border border-[#E8D5CC] bg-white text-[#2C1810] text-sm font-sans placeholder-[#B0937E] focus:outline-none focus:border-[#C17F74] focus:ring-2 focus:ring-[#C17F74]/20 transition-all duration-200`

export default function CheckoutPage({ setCurrentPage }: CheckoutPageProps) {
  const { items, totalItems, clearCart } = useCart()
  const [submitted, setSubmitted] = useState(false)
  const [step, setStep] = useState<1 | 2>(1)
  const ref = useRef(null)
  const inView = useInView(ref, { once: true })

  const [form, setForm] = useState({
    firstName: '', lastName: '', email: '', phone: '',
    address: '', city: '', state: '', zip: '', country: '',
    cakeNotes: '', deliveryMethod: 'delivery',
  })

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setForm((p) => ({ ...p, [e.target.name]: e.target.value }))
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    setSubmitted(true)
    clearCart()
  }

  if (items.length === 0 && !submitted) {
    return (
      <div className="min-h-screen bg-[#FAF3EE] flex items-center justify-center px-4">
        <div className="text-center">
          <div className="w-20 h-20 rounded-full bg-[#F5E6E0] flex items-center justify-center mx-auto mb-4">
            <ShoppingBag size={32} className="text-[#C17F74] opacity-60" />
          </div>
          <h2 className="font-display text-2xl font-bold text-[#2C1810] mb-3" style={{ fontFamily: "'Playfair Display', serif" }}>
            Your cart is empty
          </h2>
          <p className="text-[#7A5C52] mb-6 font-light text-sm">Add some cakes before checking out.</p>
          <button onClick={() => setCurrentPage('birthday')} className="btn-primary">Browse Cakes</button>
        </div>
      </div>
    )
  }

  if (submitted) {
    return (
      <div className="min-h-screen bg-[#FAF3EE] flex items-center justify-center px-4">
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          className="max-w-md w-full bg-white rounded-3xl p-10 text-center shadow-[0_16px_60px_rgba(44,24,16,0.12)] border border-[#F0E4DC]"
        >
          <div className="w-20 h-20 rounded-full bg-gradient-to-br from-[#C17F74] to-[#A8665B] flex items-center justify-center mx-auto mb-6 shadow-[0_8px_24px_rgba(193,127,116,0.4)]">
            <CheckCircle size={36} className="text-white" />
          </div>
          <span style={{ fontFamily: "'Great Vibes', cursive" }} className="block text-3xl text-[#C17F74] mb-2">
            Thank You!
          </span>
          <h2 className="font-display text-2xl font-bold text-[#2C1810] mb-3" style={{ fontFamily: "'Playfair Display', serif" }}>
            Order Placed Successfully
          </h2>
          <p className="text-[#7A5C52] text-sm font-light mb-2">
            Hi <strong className="text-[#2C1810]">{form.firstName}</strong>, your order has been received!
          </p>
          <p className="text-[#7A5C52] text-sm font-light mb-8">
            We'll review your selections and send a custom quote to <strong className="text-[#2C1810]">{form.email}</strong> within 24 hours. We can't wait to bake your dream cake!
          </p>
          <button onClick={() => setCurrentPage('home')} className="btn-primary w-full justify-center">
            Back to Home
          </button>
        </motion.div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-[#FAF3EE]" ref={ref}>
      {/* Header */}
      <div className="bg-gradient-to-r from-[#2C1810] to-[#3D2314] py-10 px-4">
        <div className="max-w-5xl mx-auto">
          <button onClick={() => { setCurrentPage('home'); window.scrollTo({ top: 0 }) }}
            className="flex items-center gap-2 text-sm text-[#E8D5CC] hover:text-[#C9A84C] transition-colors mb-5">
            <ArrowLeft size={14} /> Continue Shopping
          </button>
          <span style={{ fontFamily: "'Great Vibes', cursive" }} className="block text-3xl text-[#F5C5B5] mb-1">
            Almost There
          </span>
          <h1 className="font-display text-4xl sm:text-5xl font-bold text-[#FFFDF8]" style={{ fontFamily: "'Playfair Display', serif" }}>
            Checkout
          </h1>
        </div>
      </div>

      {/* Steps */}
      <div className="max-w-5xl mx-auto px-4 py-6">
        <div className="flex items-center gap-3 mb-8">
          {[{ n: 1, label: 'Your Details', icon: User }, { n: 2, label: 'Review & Place Order', icon: CreditCard }].map(({ n, label, icon: Icon }, i) => (
            <div key={n} className="flex items-center gap-3 flex-1">
              <button
                onClick={() => n < step && setStep(n as 1 | 2)}
                className={`flex items-center gap-2 ${n <= step ? 'cursor-pointer' : 'cursor-default'}`}
              >
                <div className={`w-9 h-9 rounded-full flex items-center justify-center text-sm font-bold transition-all ${
                  n < step
                    ? 'bg-green-500 text-white'
                    : n === step
                    ? 'bg-gradient-to-br from-[#C17F74] to-[#A8665B] text-white shadow-[0_4px_14px_rgba(193,127,116,0.4)]'
                    : 'bg-[#F0E4DC] text-[#B0937E]'
                }`}>
                  {n < step ? '✓' : <Icon size={15} />}
                </div>
                <span className={`text-sm font-medium hidden sm:block ${n === step ? 'text-[#2C1810]' : 'text-[#7A5C52]'}`}>{label}</span>
              </button>
              {i < 1 && <div className="flex-1 h-px bg-[#E8D5CC] mx-2" />}
            </div>
          ))}
        </div>

        <form onSubmit={handleSubmit}>
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Left form */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={inView ? { opacity: 1, x: 0 } : {}}
              transition={{ duration: 0.5 }}
              className="lg:col-span-2 space-y-5"
            >
              {step === 1 && (
                <div className="bg-white rounded-3xl p-6 sm:p-8 border border-[#F0E4DC] shadow-[0_4px_24px_rgba(44,24,16,0.06)]">
                  <div className="flex items-center gap-3 mb-6">
                    <div className="w-10 h-10 rounded-xl bg-[#F5E6E0] flex items-center justify-center">
                      <User size={18} className="text-[#C17F74]" />
                    </div>
                    <h2 className="font-display font-bold text-[#2C1810] text-lg" style={{ fontFamily: "'Playfair Display', serif" }}>
                      Customer Details
                    </h2>
                  </div>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-semibold tracking-widest uppercase text-[#7A5C52] mb-2">First Name *</label>
                      <input name="firstName" required value={form.firstName} onChange={handleChange} placeholder="Jane" className={inputClass} />
                    </div>
                    <div>
                      <label className="block text-xs font-semibold tracking-widest uppercase text-[#7A5C52] mb-2">Last Name *</label>
                      <input name="lastName" required value={form.lastName} onChange={handleChange} placeholder="Smith" className={inputClass} />
                    </div>
                    <div>
                      <label className="block text-xs font-semibold tracking-widest uppercase text-[#7A5C52] mb-2">Email Address *</label>
                      <input name="email" required type="email" value={form.email} onChange={handleChange} placeholder="jane@email.com" className={inputClass} />
                    </div>
                    <div>
                      <label className="block text-xs font-semibold tracking-widest uppercase text-[#7A5C52] mb-2">Phone Number *</label>
                      <input name="phone" required type="tel" value={form.phone} onChange={handleChange} placeholder="+1 (234) 567-890" className={inputClass} />
                    </div>
                  </div>

                  <div className="mt-6 pt-6 border-t border-[#F0E4DC]">
                    <div className="flex items-center gap-3 mb-5">
                      <div className="w-10 h-10 rounded-xl bg-[#F5E6E0] flex items-center justify-center">
                        <MapPin size={18} className="text-[#C17F74]" />
                      </div>
                      <h3 className="font-display font-bold text-[#2C1810] text-lg" style={{ fontFamily: "'Playfair Display', serif" }}>
                        Delivery Information
                      </h3>
                    </div>

                    <div className="mb-4">
                      <label className="block text-xs font-semibold tracking-widest uppercase text-[#7A5C52] mb-2">Delivery Method *</label>
                      <div className="grid grid-cols-2 gap-3">
                        {[{ val: 'delivery', label: 'Home Delivery' }, { val: 'pickup', label: 'Store Pickup' }].map((opt) => (
                          <label
                            key={opt.val}
                            className={`flex items-center gap-3 p-4 rounded-2xl border cursor-pointer transition-all ${
                              form.deliveryMethod === opt.val
                                ? 'border-[#C17F74] bg-[#FDF5EC]'
                                : 'border-[#E8D5CC] hover:border-[#C17F74]/40'
                            }`}
                          >
                            <input
                              type="radio"
                              name="deliveryMethod"
                              value={opt.val}
                              checked={form.deliveryMethod === opt.val}
                              onChange={handleChange}
                              className="accent-[#C17F74]"
                            />
                            <span className="text-sm font-medium text-[#2C1810]">{opt.label}</span>
                          </label>
                        ))}
                      </div>
                    </div>

                    {form.deliveryMethod === 'delivery' && (
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        <div className="sm:col-span-2">
                          <label className="block text-xs font-semibold tracking-widest uppercase text-[#7A5C52] mb-2">Street Address *</label>
                          <input name="address" required={form.deliveryMethod === 'delivery'} value={form.address} onChange={handleChange} placeholder="123 Baker Street" className={inputClass} />
                        </div>
                        <div>
                          <label className="block text-xs font-semibold tracking-widest uppercase text-[#7A5C52] mb-2">City *</label>
                          <input name="city" required={form.deliveryMethod === 'delivery'} value={form.city} onChange={handleChange} placeholder="Sweet Town" className={inputClass} />
                        </div>
                        <div>
                          <label className="block text-xs font-semibold tracking-widest uppercase text-[#7A5C52] mb-2">State / Province</label>
                          <input name="state" value={form.state} onChange={handleChange} placeholder="CA" className={inputClass} />
                        </div>
                        <div>
                          <label className="block text-xs font-semibold tracking-widest uppercase text-[#7A5C52] mb-2">ZIP / Postal Code</label>
                          <input name="zip" value={form.zip} onChange={handleChange} placeholder="45678" className={inputClass} />
                        </div>
                        <div>
                          <label className="block text-xs font-semibold tracking-widest uppercase text-[#7A5C52] mb-2">Country *</label>
                          <select name="country" value={form.country} onChange={handleChange} className={inputClass}>
                            <option value="">Select country</option>
                            <option value="US">United States</option>
                            <option value="CA">Canada</option>
                            <option value="GB">United Kingdom</option>
                            <option value="AU">Australia</option>
                            <option value="IN">India</option>
                            <option value="other">Other</option>
                          </select>
                        </div>
                      </div>
                    )}
                  </div>

                  <div className="mt-6 pt-6 border-t border-[#F0E4DC]">
                    <label className="block text-xs font-semibold tracking-widest uppercase text-[#7A5C52] mb-2">Custom Cake Notes</label>
                    <textarea
                      name="cakeNotes"
                      value={form.cakeNotes}
                      onChange={handleChange}
                      placeholder="Share any special requests, event date, inscription text, allergies, dietary needs, or design inspiration..."
                      rows={4}
                      className={`${inputClass} resize-none`}
                    />
                  </div>

                  {/* Web3Forms hidden fields */}
                  <input type="hidden" name="access_key" value="YOUR_WEB3FORMS_ACCESS_KEY" />
                  <input type="hidden" name="subject" value="New Checkout Order — Dream Desserts" />
                  <input type="hidden" name="from_name" value="Dream Desserts Checkout" />

                  <div className="mt-6">
                    <button
                      type="button"
                      onClick={() => setStep(2)}
                      className="btn-primary w-full justify-center"
                    >
                      Review Order
                      <ArrowLeft size={15} className="rotate-180" />
                    </button>
                  </div>
                </div>
              )}

              {step === 2 && (
                <div className="bg-white rounded-3xl p-6 sm:p-8 border border-[#F0E4DC] shadow-[0_4px_24px_rgba(44,24,16,0.06)]">
                  <div className="flex items-center gap-3 mb-6">
                    <div className="w-10 h-10 rounded-xl bg-[#F5E6E0] flex items-center justify-center">
                      <CreditCard size={18} className="text-[#C17F74]" />
                    </div>
                    <h2 className="font-display font-bold text-[#2C1810] text-lg" style={{ fontFamily: "'Playfair Display', serif" }}>
                      Review Your Order
                    </h2>
                  </div>

                  {/* Summary of details */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-6 bg-[#FAF3EE] rounded-2xl p-5 text-sm">
                    <div><span className="text-[#7A5C52]">Name: </span><span className="font-medium text-[#2C1810]">{form.firstName} {form.lastName}</span></div>
                    <div><span className="text-[#7A5C52]">Email: </span><span className="font-medium text-[#2C1810]">{form.email}</span></div>
                    <div><span className="text-[#7A5C52]">Phone: </span><span className="font-medium text-[#2C1810]">{form.phone}</span></div>
                    <div><span className="text-[#7A5C52]">Method: </span><span className="font-medium text-[#2C1810] capitalize">{form.deliveryMethod}</span></div>
                    {form.deliveryMethod === 'delivery' && (
                      <div className="sm:col-span-2">
                        <span className="text-[#7A5C52]">Address: </span>
                        <span className="font-medium text-[#2C1810]">{form.address}, {form.city} {form.zip}</span>
                      </div>
                    )}
                    {form.cakeNotes && (
                      <div className="sm:col-span-2">
                        <span className="text-[#7A5C52]">Notes: </span>
                        <span className="font-medium text-[#2C1810]">{form.cakeNotes}</span>
                      </div>
                    )}
                  </div>

                  <div className="space-y-3 mb-6">
                    {items.map((item) => (
                      <div key={item.id} className="flex items-center gap-4 p-4 bg-[#FAF3EE] rounded-2xl">
                        <img src={item.img} alt={item.name} className="w-14 h-14 rounded-xl object-cover" />
                        <div className="flex-1">
                          <p className="font-semibold text-[#2C1810] text-sm">{item.name}</p>
                          <p className="text-xs text-[#C17F74]">{item.category}</p>
                        </div>
                        <div className="text-sm text-[#7A5C52]">Qty: <span className="font-semibold text-[#2C1810]">{item.quantity}</span></div>
                      </div>
                    ))}
                  </div>

                  <div className="bg-[#FDF5EC] rounded-2xl p-4 mb-6 border border-[#F0E4DC] text-sm text-[#7A5C52] font-light">
                    <p>💡 <strong className="text-[#2C1810]">Note on Pricing:</strong> All cakes are custom-priced. After submitting, our team will review your order and send a personalized quote to your email within 24 hours. No payment is taken at this stage.</p>
                  </div>

                  <div className="flex gap-3">
                    <button type="button" onClick={() => setStep(1)} className="btn-outline flex-1 justify-center text-sm">
                      <ArrowLeft size={14} /> Edit Details
                    </button>
                    <button type="submit" className="btn-primary flex-1 justify-center text-sm">
                      Place Order ✦
                    </button>
                  </div>
                </div>
              )}
            </motion.div>

            {/* Order Summary Sidebar */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={inView ? { opacity: 1, x: 0 } : {}}
              transition={{ duration: 0.5, delay: 0.1 }}
              className="lg:col-span-1"
            >
              <div className="bg-white rounded-3xl border border-[#F0E4DC] shadow-[0_4px_24px_rgba(44,24,16,0.06)] sticky top-28 overflow-hidden">
                <div className="bg-gradient-to-r from-[#C17F74] to-[#D4917F] px-6 py-5">
                  <h3 className="font-display font-bold text-white text-base" style={{ fontFamily: "'Playfair Display', serif" }}>
                    Order Summary
                  </h3>
                  <p className="text-[rgba(255,253,248,0.8)] text-xs mt-0.5">{totalItems} item{totalItems !== 1 ? 's' : ''}</p>
                </div>
                <div className="p-5 space-y-4">
                  {items.map((item) => (
                    <div key={item.id} className="flex items-start gap-3">
                      <img src={item.img} alt={item.name} className="w-12 h-12 rounded-xl object-cover shrink-0" />
                      <div className="flex-1 min-w-0">
                        <p className="text-xs font-semibold text-[#2C1810] leading-tight truncate">{item.name}</p>
                        <p className="text-xs text-[#C17F74] mt-0.5">{item.category}</p>
                        <p className="text-xs text-[#7A5C52] mt-0.5">× {item.quantity}</p>
                      </div>
                    </div>
                  ))}

                  <div className="pt-4 border-t border-[#F0E4DC] space-y-2 text-sm">
                    <div className="flex justify-between text-[#7A5C52]">
                      <span>Items ({totalItems})</span>
                      <span className="text-[#C17F74] font-semibold">Custom Quote</span>
                    </div>
                    <div className="flex justify-between text-[#7A5C52]">
                      <span>Delivery</span>
                      <span>TBD</span>
                    </div>
                    <div className="flex justify-between font-semibold text-[#2C1810] pt-2 border-t border-[#F0E4DC]">
                      <span>Total</span>
                      <span>Quote on Confirm</span>
                    </div>
                  </div>

                  <div className="bg-[#FDF5EC] rounded-xl p-3 text-xs text-[#7A5C52] font-light border border-[#F0E4DC]">
                    A personalized quote will be sent to your email after we review your order.
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </form>
      </div>
    </div>
  )
}
