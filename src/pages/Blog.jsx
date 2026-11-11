import { useMemo } from 'react'
import { useSearchParams } from 'react-router-dom'
import posts from '../data/blogs.json'
import { BlogCard } from '../components/BlogCards'
import PageHero from '../components/PageHero'
import SampleNote from '../components/SampleNote'
import { usePageTitle } from '../hooks/usePageTitle'
import { cx } from '../utils/cx'

export default function Blog() {
  usePageTitle('Blog')
  const [params, setParams] = useSearchParams()
  const requested = params.get('category') || 'All'
  const items = Array.isArray(posts) ? posts : []
  const categories = useMemo(() => {
    const names = []
    items.forEach((post) => {
      if (post.category && !names.includes(post.category)) names.push(post.category)
    })
    return names
  }, [items])
  const category = requested === 'All' || categories.includes(requested) ? requested : 'All'
  const visible = category === 'All' ? items : items.filter((post) => post.category === category)

  function choose(name) {
    if (name === 'All') setParams({})
    else setParams({ category: name })
  }

  return (
    <>
      <PageHero
        eyebrow="Blog"
        title="Astrology, explained without theatre."
        lede="Essays on the chart, the signs, and the kind of question a consultation can hold. The pieces here are samples."
      />
      <section className="section">
        <div className="container">
          <SampleNote>
            Each essay is marked as a sample. Replace the text in blogs.json before presenting it as his writing.
          </SampleNote>
          <div className="filters" role="group" aria-label="Filter essays">
            {['All', ...categories].map((name) => (
              <button
                key={name}
                type="button"
                className={cx(category === name && 'is-active')}
                aria-pressed={category === name}
                onClick={() => choose(name)}
              >
                {name}
              </button>
            ))}
          </div>
          {visible.length ? (
            <div className="blog-list">
              {visible.map((post) => (
                <BlogCard key={post.slug} post={post} />
              ))}
            </div>
          ) : (
            <p className="empty">No essays in this category yet.</p>
          )}
        </div>
      </section>
    </>
  )
}
