import { useState, useEffect } from 'react'
import { AnimatePresence, motion } from 'framer-motion'

import { CartProvider } from './context/CartContext'
import TopBar from './components/TopBar'
import Navbar from './components/Navbar'
import Footer from './components/Footer'
import CartDrawer from './components/CartDrawer'
import Gallery from './components/Gallery'
import Testimonials from './components/Testimonials'
import HomePage from './pages/HomePage'
import CategoryPage from './pages/CategoryPage'
import BookingPage from './pages/BookingPage'
import ContactPage from './pages/ContactPage'
import CheckoutPage from './pages/CheckoutPage'
import AuthPage from './pages/AuthPage'

type Page =
  | 'home' | 'about' | 'gallery' | 'testimonials'
  | 'contact' | 'booking' | 'checkout'
  | 'birthday' | 'wedding' | 'kids' | 'custom'
  | 'login' | 'signup'

const categoryPages = ['birthday', 'wedding', 'kids', 'custom']
const fullscreenPages = ['login', 'signup']

const pageVariants = {
  initial: { opacity: 0, y: 18 },
  animate: { opacity: 1, y: 0, transition: { duration: 0.45, ease: 'easeOut' } },
  exit: { opacity: 0, y: -10, transition: { duration: 0.25 } },
}

function AppContent() {
  const [currentPage, setCurrentPage] = useState<Page>('home')
  const [topBarVisible, setTopBarVisible] = useState(true)

  useEffect(() => {
    const onScroll = () => setTopBarVisible(window.scrollY < 60)
    window.addEventListener('scroll', onScroll)
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  const navigate = (page: string) => {
    setCurrentPage(page as Page)
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  const isFullscreen = fullscreenPages.includes(currentPage)

  const renderPage = () => {
    if (currentPage === 'home' || currentPage === 'about') {
      return <HomePage setCurrentPage={navigate} />
    }

    if (currentPage === 'gallery') {
      return (
        <div className="pt-20 min-h-screen bg-[#FAF3EE]">
          <div className="max-w-7xl mx-auto px-4 pt-10 pb-4 text-center">
            <span style={{ fontFamily: "'Great Vibes', cursive" }} className="block text-4xl text-[#C17F74] mb-1">
              Our Portfolio
            </span>
            <h1 className="font-display text-4xl sm:text-5xl font-bold text-[#2C1810]" style={{ fontFamily: "'Playfair Display', serif" }}>
              Gallery of Dreams
            </h1>
          </div>
          <Gallery />
        </div>
      )
    }

    if (currentPage === 'testimonials') {
      return (
        <div className="pt-20 min-h-screen">
          <Testimonials />
        </div>
      )
    }

    if (currentPage === 'contact') {
      return (
        <div className="pt-20">
          <ContactPage setCurrentPage={navigate} />
        </div>
      )
    }

    if (currentPage === 'booking') {
      return (
        <div className="pt-20">
          <BookingPage setCurrentPage={navigate} />
        </div>
      )
    }

    if (currentPage === 'checkout') {
      return <CheckoutPage setCurrentPage={navigate} />
    }

    if (currentPage === 'login') {
      return <AuthPage mode="login" setCurrentPage={navigate} />
    }

    if (currentPage === 'signup') {
      return <AuthPage mode="signup" setCurrentPage={navigate} />
    }

    if (categoryPages.includes(currentPage)) {
      return (
        <div className="pt-20">
          <CategoryPage
            category={currentPage as 'birthday' | 'wedding' | 'kids' | 'custom'}
            setCurrentPage={navigate}
          />
        </div>
      )
    }

    return <HomePage setCurrentPage={navigate} />
  }

  if (isFullscreen) {
    return (
      <AnimatePresence mode="wait">
        <motion.div
          key={currentPage}
          variants={pageVariants}
          initial="initial"
          animate="animate"
          exit="exit"
        >
          {renderPage()}
        </motion.div>
      </AnimatePresence>
    )
  }

  return (
    <div className="min-h-screen bg-[#FFFDF8]">
      {/* Sticky Top Bar — collapses on scroll */}
      <motion.div
        initial={false}
        animate={{ height: topBarVisible ? 'auto' : 0, opacity: topBarVisible ? 1 : 0 }}
        transition={{ duration: 0.3 }}
        className="overflow-hidden fixed top-0 left-0 right-0 z-50"
      >
        <TopBar />
      </motion.div>

      {/* Navbar */}
      <Navbar currentPage={currentPage} setCurrentPage={navigate} />

      {/* Cart Drawer — global overlay */}
      <CartDrawer setCurrentPage={navigate} />

      {/* Page Transitions */}
      <AnimatePresence mode="wait">
        <motion.div
          key={currentPage}
          variants={pageVariants}
          initial="initial"
          animate="animate"
          exit="exit"
        >
          {renderPage()}
        </motion.div>
      </AnimatePresence>

      <Footer setCurrentPage={navigate} />
    </div>
  )
}

export default function App() {
  return (
    <CartProvider>
      <AppContent />
    </CartProvider>
  )
}
