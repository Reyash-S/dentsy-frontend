import { useState, useEffect } from 'react'
import { useParams, Link } from 'react-router-dom'
import Header from './Header'
import Footer from './Footer'
import { getBlogPostBySlug, getRelatedPosts } from '../lib/wordpress'
import { useSEO } from '../hooks/useSEO'

function ShareButtons({ title, url }) {
  const [copied, setCopied] = useState(false)
  const encodedUrl = encodeURIComponent(url)
  const encodedTitle = encodeURIComponent(title)

  function copyLink() {
    navigator.clipboard.writeText(url).then(() => {
      setCopied(true)
      setTimeout(() => setCopied(false), 2000)
    })
  }

  return (
    <div className="blog-share">
      <h3>Share it!</h3>
      <div className="blog-share-buttons">
        <a href={`https://www.facebook.com/sharer/sharer.php?u=${encodedUrl}`} target="_blank" rel="noopener noreferrer" className="blog-share-btn" aria-label="Share on Facebook">
          <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor"><path d="M18 2h-3a5 5 0 00-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 011-1h3z"/></svg>
        </a>
        <a href={`https://twitter.com/intent/tweet?url=${encodedUrl}&text=${encodedTitle}`} target="_blank" rel="noopener noreferrer" className="blog-share-btn" aria-label="Share on X">
          <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor"><path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/></svg>
        </a>
        <a href={`https://www.linkedin.com/sharing/share-offsite/?url=${encodedUrl}`} target="_blank" rel="noopener noreferrer" className="blog-share-btn" aria-label="Share on LinkedIn">
          <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor"><path d="M16 8a6 6 0 016 6v7h-4v-7a2 2 0 00-2-2 2 2 0 00-2 2v7h-4v-7a6 6 0 016-6zM2 9h4v12H2zM4 6a2 2 0 100-4 2 2 0 000 4z"/></svg>
        </a>
        <button onClick={copyLink} className="blog-share-btn" aria-label="Copy link">
          {copied ? (
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><polyline points="20 6 9 17 4 12"/></svg>
          ) : (
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M10 13a5 5 0 007.54.54l3-3a5 5 0 00-7.07-7.07l-1.72 1.71"/><path d="M14 11a5 5 0 00-7.54-.54l-3 3a5 5 0 007.07 7.07l1.71-1.71"/></svg>
          )}
        </button>
      </div>
    </div>
  )
}

function RelatedPostCard({ post }) {
  const date = new Date(post.date).toLocaleDateString('en-GB', {
    day: 'numeric',
    month: 'long',
    year: 'numeric',
  })
  const category = post.categories?.nodes?.[0]?.name
  const image = post.featuredImage?.node?.sourceUrl
  const rawExcerpt = post.excerpt?.replace(/<[^>]+>/g, '') || ''
  const excerpt = rawExcerpt.length > 120 ? rawExcerpt.slice(0, 120).trimEnd() + '...' : rawExcerpt

  return (
    <Link to={`/blog/${post.slug}`} className="blog-card">
      {image && (
        <div className="blog-card-image">
          <img src={image} alt={post.featuredImage?.node?.altText || post.title} loading="lazy" />
        </div>
      )}
      <div className="blog-card-body">
        <div className="blog-card-meta">
          {category && <span className="blog-card-category">{category}</span>}
          <span className="blog-card-date">{date}</span>
        </div>
        <h3 className="blog-card-title">{post.title}</h3>
        {excerpt && <p className="blog-card-excerpt">{excerpt}</p>}
      </div>
    </Link>
  )
}

export default function BlogPostPage() {
  const { slug } = useParams()
  const [post, setPost] = useState(null)
  const [related, setRelated] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    setLoading(true)
    setRelated([])
    getBlogPostBySlug(slug)
      .then(data => {
        setPost(data)
        if (data?.categories?.nodes?.[0]?.slug) {
          return getRelatedPosts(data.categories.nodes[0].slug, slug, 3)
        }
        return []
      })
      .then(rel => setRelated(rel || []))
      .catch(() => {})
      .finally(() => setLoading(false))
  }, [slug])

  useSEO(post?.seo || {})

  if (loading) {
    return (
      <div className="blog-post-page">
        <Header />
        <div className="container blog-post-loading">Loading...</div>
        <Footer />
      </div>
    )
  }

  if (!post) {
    return (
      <div className="blog-post-page">
        <Header />
        <div className="container blog-post-not-found">
          <h1>Post not found</h1>
          <p>The article you're looking for doesn't exist.</p>
          <Link to="/blog" className="btn-pri">
            <span className="text" data-front="Back to blog" data-back="Back to blog" />
            <span className="bg-clr" />
          </Link>
        </div>
        <Footer />
      </div>
    )
  }

  const date = new Date(post.date).toLocaleDateString('en-GB', {
    day: 'numeric',
    month: 'long',
    year: 'numeric',
  })
  const author = post.author?.node?.name || 'Dentsy Team'
  const image = post.featuredImage?.node?.sourceUrl
  const postUrl = typeof window !== 'undefined' ? window.location.href : ''

  return (
    <div className="blog-post-page">
      <Header />

      <article className="blog-post">
        <div className="blog-post-header">
          <h1>{post.title}</h1>
          <div className="blog-post-author">
            By {author} | {date}
          </div>
        </div>

        {image && (
          <div className="blog-post-hero-image">
            <img src={image} alt={post.featuredImage?.node?.altText || post.title} />
          </div>
        )}

        <div className="blog-post-body">
          <div
            className="blog-post-content"
            dangerouslySetInnerHTML={{ __html: post.content }}
          />

          <ShareButtons title={post.title} url={postUrl} />

          <Link to="/blog" className="blog-post-back">← Back to blog</Link>
        </div>
      </article>

      {related.length > 0 && (
        <section className="blog-related">
          <div className="container">
            <h2>Related Topics</h2>
            <div className="blog-related-grid">
              {related.map(p => (
                <RelatedPostCard key={p.slug} post={p} />
              ))}
            </div>
          </div>
        </section>
      )}

      <Footer />
    </div>
  )
}
