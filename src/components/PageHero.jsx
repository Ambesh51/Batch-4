import Starfield from './Starfield'

export default function PageHero({ eyebrow, title, lede }) {
  return (
    <header className="page-hero">
      <Starfield className="page-hero__stars" count={42} />
      <div className="container page-hero__inner">
        {eyebrow ? <p className="eyebrow">{eyebrow}</p> : null}
        <h1>{title}</h1>
        {lede ? <p className="lede">{lede}</p> : null}
      </div>
    </header>
  )
}
