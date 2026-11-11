import ImageGallery from '../components/ImageGallery'
import PageHero from '../components/PageHero'
import { usePageTitle } from '../hooks/usePageTitle'

export default function Gallery() {
  usePageTitle('Gallery')

  return (
    <>
      <PageHero
        eyebrow="Gallery"
        title="Photographs, when they are ready."
        lede="Filter by occasion. Open any frame for a full-screen preview. Every picture is listed in images.json."
      />
      <section className="section">
        <div className="container">
          <ImageGallery />
        </div>
      </section>
    </>
  )
}
