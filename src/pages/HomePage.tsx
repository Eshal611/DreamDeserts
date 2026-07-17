import Hero from '../components/Hero'
import Features from '../components/Features'
import About from '../components/About'
import Products from '../components/Products'
import Gallery from '../components/Gallery'
import Testimonials from '../components/Testimonials'

interface HomePageProps {
  setCurrentPage: (page: string) => void
}

export default function HomePage({ setCurrentPage }: HomePageProps) {
  return (
    <main>
      <Hero setCurrentPage={setCurrentPage} />
      <Features />
      <About setCurrentPage={setCurrentPage} />
      <Products setCurrentPage={setCurrentPage} />
      <Gallery />
      <Testimonials />
    </main>
  )
}
