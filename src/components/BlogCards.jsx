import { Link } from 'react-router-dom'
import Photo from './Photo'

export function BlogCard({ post, featured = false }) {
  return (
    <article className={featured ? 'blog-card blog-card--featured' : 'blog-card'}>
      <Link to={`/blog/${post.slug}`} className="blog-card__media">
        <Photo src={post.image} alt="" />
      </Link>
      <div className="blog-card__body">
        <p className="eyebrow">
          {post.category}
          {post.sample ? <span className="chip">Sample essay</span> : null}
        </p>
        <h3>
          <Link to={`/blog/${post.slug}`}>{post.title}</Link>
        </h3>
        <p>{post.excerpt}</p>
        <p className="blog-card__meta">
          <span>{post.date}</span>
          <span>{post.readTime}</span>
        </p>
        <Link className="text-link text-link--gold" to={`/blog/${post.slug}`}>Read More</Link>
      </div>
    </article>
  )
}
