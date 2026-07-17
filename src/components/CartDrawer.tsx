import { motion, AnimatePresence } from 'framer-motion'
import { X, Minus, Plus, Trash2, ShoppingBag, ArrowRight } from 'lucide-react'
import { useCart } from '../context/CartContext'

interface CartDrawerProps {
  setCurrentPage: (page: string) => void
}

export default function CartDrawer({ setCurrentPage }: CartDrawerProps) {
  const { items, isOpen, closeCart, removeItem, updateQty, totalItems } = useCart()

  const goToCheckout = () => {
    closeCart()
    setCurrentPage('checkout')
    window.scrollTo({ top: 0 })
  }

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            key="backdrop"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="fixed inset-0 bg-[rgba(44,24,16,0.55)] z-50 backdrop-blur-sm"
            onClick={closeCart}
          />

          {/* Drawer */}
          <motion.aside
            key="drawer"
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ type: 'spring', stiffness: 300, damping: 32 }}
            className="fixed top-0 right-0 bottom-0 w-full sm:w-[420px] bg-[#FFFDF8] z-50 flex flex-col shadow-[−32px_0_80px_rgba(44,24,16,0.18)]"
          >
            {/* Header */}
            <div className="flex items-center justify-between px-6 py-5 border-b border-[#F0E4DC]">
              <div className="flex items-center gap-3">
                <ShoppingBag size={20} className="text-[#C17F74]" />
                <div>
                  <h2
                    className="font-display font-bold text-[#2C1810] text-lg leading-tight"
                    style={{ fontFamily: "'Playfair Display', serif" }}
                  >
                    Your Cart
                  </h2>
                  <p className="text-xs text-[#7A5C52] font-sans">
                    {totalItems} {totalItems === 1 ? 'item' : 'items'}
                  </p>
                </div>
              </div>
              <button
                onClick={closeCart}
                className="w-9 h-9 rounded-full bg-[#F5E6E0] flex items-center justify-center text-[#2C1810] hover:bg-[#C17F74] hover:text-white transition-all duration-200"
                aria-label="Close cart"
              >
                <X size={16} />
              </button>
            </div>

            {/* Items */}
            <div className="flex-1 overflow-y-auto px-6 py-4">
              <AnimatePresence initial={false}>
                {items.length === 0 ? (
                  <motion.div
                    key="empty"
                    initial={{ opacity: 0, y: 16 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="flex flex-col items-center justify-center h-full py-16 text-center"
                  >
                    <div className="w-20 h-20 rounded-full bg-[#F5E6E0] flex items-center justify-center mb-4">
                      <ShoppingBag size={32} className="text-[#C17F74] opacity-60" />
                    </div>
                    <h3
                      className="font-display font-semibold text-[#2C1810] text-lg mb-2"
                      style={{ fontFamily: "'Playfair Display', serif" }}
                    >
                      Your cart is empty
                    </h3>
                    <p className="text-[#7A5C52] text-sm font-light mb-6">
                      Add a dream cake to get started!
                    </p>
                    <button
                      onClick={() => { closeCart(); setCurrentPage('birthday') }}
                      className="btn-primary text-xs"
                    >
                      Browse Cakes
                    </button>
                  </motion.div>
                ) : (
                  <div className="space-y-4">
                    {items.map((item) => (
                      <motion.div
                        key={item.id}
                        layout
                        initial={{ opacity: 0, x: 20 }}
                        animate={{ opacity: 1, x: 0 }}
                        exit={{ opacity: 0, x: -20, height: 0, marginBottom: 0 }}
                        transition={{ duration: 0.3 }}
                        className="flex gap-4 bg-white rounded-2xl p-4 border border-[#F0E4DC] shadow-[0_2px_12px_rgba(44,24,16,0.06)]"
                      >
                        {/* Image */}
                        <div className="w-16 h-16 rounded-xl overflow-hidden bg-[#F5E6E0] shrink-0">
                          <img
                            src={item.img}
                            alt={item.name}
                            className="w-full h-full object-cover"
                          />
                        </div>

                        {/* Info */}
                        <div className="flex-1 min-w-0">
                          <h4
                            className="font-display font-semibold text-[#2C1810] text-sm leading-snug mb-0.5 truncate"
                            style={{ fontFamily: "'Playfair Display', serif" }}
                          >
                            {item.name}
                          </h4>
                          <p className="text-[#C17F74] text-xs font-semibold tracking-wide mb-2">
                            {item.category}
                          </p>
                          <p className="text-[#7A5C52] text-xs font-light">Custom pricing • Quote on confirmation</p>
                        </div>

                        {/* Qty + Remove */}
                        <div className="flex flex-col items-end justify-between gap-2 shrink-0">
                          <button
                            onClick={() => removeItem(item.id)}
                            className="text-[#7A5C52] hover:text-red-400 transition-colors"
                            aria-label="Remove item"
                          >
                            <Trash2 size={14} />
                          </button>
                          <div className="flex items-center gap-1 bg-[#F5E6E0] rounded-full px-1 py-0.5">
                            <button
                              onClick={() => updateQty(item.id, item.quantity - 1)}
                              className="w-6 h-6 rounded-full flex items-center justify-center hover:bg-[#C17F74] hover:text-white transition-all duration-200 text-[#2C1810]"
                              aria-label="Decrease"
                            >
                              <Minus size={11} />
                            </button>
                            <span className="text-sm font-semibold text-[#2C1810] w-6 text-center">
                              {item.quantity}
                            </span>
                            <button
                              onClick={() => updateQty(item.id, item.quantity + 1)}
                              className="w-6 h-6 rounded-full flex items-center justify-center hover:bg-[#C17F74] hover:text-white transition-all duration-200 text-[#2C1810]"
                              aria-label="Increase"
                            >
                              <Plus size={11} />
                            </button>
                          </div>
                        </div>
                      </motion.div>
                    ))}
                  </div>
                )}
              </AnimatePresence>
            </div>

            {/* Footer */}
            {items.length > 0 && (
              <div className="px-6 py-5 border-t border-[#F0E4DC] bg-white">
                <div className="flex items-center justify-between mb-1 text-sm">
                  <span className="text-[#7A5C52] font-sans">Total Items</span>
                  <span className="font-semibold text-[#2C1810]">{totalItems}</span>
                </div>
                <p className="text-xs text-[#7A5C52] font-light mb-4">
                  Pricing is custom — we'll send a quote after reviewing your order.
                </p>
                <button
                  onClick={goToCheckout}
                  className="btn-primary w-full justify-center"
                >
                  Proceed to Checkout
                  <ArrowRight size={15} />
                </button>
                <button
                  onClick={closeCart}
                  className="w-full mt-2 py-2.5 text-sm text-[#7A5C52] hover:text-[#C17F74] transition-colors font-sans"
                >
                  Continue Shopping
                </button>
              </div>
            )}
          </motion.aside>
        </>
      )}
    </AnimatePresence>
  )
}
