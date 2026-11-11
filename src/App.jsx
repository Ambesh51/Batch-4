import { Route, Routes } from 'react-router-dom'
import BackToTop from './components/BackToTop'
import Footer from './components/Footer'
import Navbar from './components/Navbar'
import ScrollManager from './components/ScrollManager'
import About from './pages/About'
import Article from './pages/Article'
import Blog from './pages/Blog'
import Contact from './pages/Contact'
import Gallery from './pages/Gallery'
import Home from './pages/Home'
import Horoscope from './pages/Horoscope'
import NotFound from './pages/NotFound'
import Services from './pages/Services'
import Videos from './pages/Videos'

/**
 * Editable content lives in src/data/*.json.
 * Replace bracketed placeholders, then point image fields at files in public/images.
 */
export default function App() {
  return (
    <>
      <a className="skip" href="#content">Skip to content</a>
      <Navbar />
      <ScrollManager />
      <main id="content">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/services" element={<Services />} />
          <Route path="/horoscope" element={<Horoscope />} />
          <Route path="/gallery" element={<Gallery />} />
          <Route path="/videos" element={<Videos />} />
          <Route path="/blog" element={<Blog />} />
          <Route path="/blog/:slug" element={<Article />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </main>
      <Footer />
      <BackToTop />
    </>
  )
}
