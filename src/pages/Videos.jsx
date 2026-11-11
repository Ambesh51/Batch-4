import PageHero from '../components/PageHero'
import SampleNote from '../components/SampleNote'
import VideoGallery from '../components/VideoGallery'
import { usePageTitle } from '../hooks/usePageTitle'

export default function Videos() {
  usePageTitle('Videos')

  return (
    <>
      <PageHero
        eyebrow="Videos"
        title="Films that live on YouTube."
        lede="Nothing is uploaded to this website. Paste a YouTube ID, a watch URL, or a supported embed URL."
      />
      <section className="section">
        <div className="container">
          <SampleNote>
            Unlisted YouTube videos play from the same ID as public ones. Leave thumbnail empty to use YouTube’s own image once the ID is real.
          </SampleNote>
          <VideoGallery />
        </div>
      </section>
    </>
  )
}
