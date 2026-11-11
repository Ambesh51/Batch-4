import { Link, useParams } from 'react-router-dom'
import posts from '../data/blogs.json'
import { BlogCard } from '../components/BlogCards'
import Photo from '../components/Photo'
import SampleNote from '../components/SampleNote'
import { usePageTitle } from '../hooks/usePageTitle'

export default function Article() {
  const { slug } = useParams()
  const items = Array.isArray(posts) ? posts : []
  const post = items.find((item) => item.slug === slug)
  usePageTitle(post ? post.title : 'Essay')

  if (!post) {
    return (
      <section className="section">
        <div className="container prose">
          <p className="eyebrow">Journal</p>
          <h1>This essay is not on the shelf.</h1>
          <p>The address may have changed. Essays are listed in src/data/blogs.json.</p>
          <Link className="btn btn--ghost" to="/blog">Back to the journal</Link>
        </div>
      </section>
    )
  }

  const related = items.filter((item) => item.slug !== post.slug && item.category === post.category).slice(0, 2)
  const paragraphs = Array.isArray(post.content) ? post.content : []

  return (
    <article className="section article">
      <div className="container article__grid">
        <div>
          <p className="eyebrow">{post.category}</p>
          <h1>{post.title}</h1>
          <p className="article__meta">
            <span>{post.author}</span>
            <span>{post.date}</span>
            <span>{post.readTime}</span>
          </p>
          {post.sample ? (
            <SampleNote>
              Sample essay for the layout. Replace it in blogs.json before publishing it as {post.author}&apos;s writing.
            </SampleNote>
          ) : null}
          <Photo src={post.image} alt="" className="article__cover" />
          <div className="prose">
            {paragraphs.map((paragraph) => (
              <p key={paragraph}>{paragraph}</p>
            ))}
          </div>
          <Link className="text-link text-link--gold" to="/blog">Back to the journal</Link>
        </div>
        {related.length ? (
          <aside className="article__related">
            <h2>Related</h2>
            {related.map((item) => (
              <BlogCard key={item.slug} post={item} />
            ))}
          </aside>
        ) : null}
      </div>
    </article>
  )
}
