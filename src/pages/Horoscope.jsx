import PageHero from '../components/PageHero'
import ZodiacSection from '../components/ZodiacSection'
import { usePageTitle } from '../hooks/usePageTitle'

export default function Horoscope() {
  usePageTitle('Horoscope')

  return (
    <>
      <PageHero
        eyebrow="Horoscope"
        title="Daily, weekly, and monthly notes."
        lede="Choose a sign. The text is general and illustrative. A personal consultation reads the whole chart, not the sun sign alone."
      />
      <ZodiacSection mode="panel" />
    </>
  )
}
