import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import Header from './Header'
import Footer from './Footer'
import { getBlogPosts, getCategories } from '../lib/wordpress'
import { usePageSections, s } from '../hooks/usePageSections'
import { useSEO } from '../hooks/useSEO'

function BlogCard({ post }) {
  const date = new Date(post.date).toLocaleDateString('en-GB', {
    day: 'numeric',
    month: 'long',
    year: 'numeric',
  })
  const category = post.categories?.nodes?.[0]?.name
  const image = post.featuredImage?.node?.sourceUrl
  const rawExcerpt = post.excerpt?.replace(/<[^>]+>/g, '') || ''
  const excerpt = rawExcerpt.length > 160 ? rawExcerpt.slice(0, 160).trimEnd() + '...' : rawExcerpt

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

export default function BlogPage() {
  const { sections } = usePageSections('blog')
  const [posts, setPosts] = useState([])
  const [categories, setCategories] = useState([])
  const [activeCategory, setActiveCategory] = useState(null)
  const [loading, setLoading] = useState(true)
  const [pageInfo, setPageInfo] = useState(null)
  const [loadingMore, setLoadingMore] = useState(false)

  useSEO({
    title: 'Blog — Dentsy',
    metaDesc: 'Insights, updates and guides for estate agents using AI phone systems and AI receptionists.',
  })

  useEffect(() => {
    Promise.all([getBlogPosts(12), getCategories()])
      .then(([postData, cats]) => {
        setPosts(postData?.nodes || [])
        setPageInfo(postData?.pageInfo || null)
        setCategories(cats.filter(c => c.count > 0))
      })
      .catch(() => {})
      .finally(() => setLoading(false))
  }, [])

  function loadMore() {
    if (!pageInfo?.hasNextPage || loadingMore) return
    setLoadingMore(true)
    getBlogPosts(12, pageInfo.endCursor)
      .then((data) => {
        setPosts(prev => [...prev, ...(data?.nodes || [])])
        setPageInfo(data?.pageInfo || null)
      })
      .finally(() => setLoadingMore(false))
  }

  const filtered = activeCategory
    ? posts.filter(p => p.categories?.nodes?.some(c => c.slug === activeCategory))
    : posts

  return (
    <div className="blog-page">
      <Header />

      <div className="blog-hero">
        <div className="container">
          <div className="section-label">{s(sections, 'blog-hero', 'label', 'Blog')}</div>
          <h1>{s(sections, 'blog-hero', 'heading', 'Insights for modern estate agencies')}</h1>
        </div>
      </div>

      <div className="blog-content container">
        {categories.length > 0 && (
          <div className="blog-filters">
            <button
              className={`blog-filter${!activeCategory ? ' active' : ''}`}
              onClick={() => setActiveCategory(null)}
            >
              All
            </button>
            {categories.map(cat => (
              <button
                key={cat.slug}
                className={`blog-filter${activeCategory === cat.slug ? ' active' : ''}`}
                onClick={() => setActiveCategory(cat.slug)}
              >
                {cat.name}
              </button>
            ))}
          </div>
        )}

        {loading ? (
          <div className="blog-loading">Loading posts...</div>
        ) : filtered.length === 0 ? (
          <div className="blog-empty">
            <p>No posts yet. Check back soon for insights and updates.</p>
          </div>
        ) : (
          <>
            <div className="blog-grid">
              {filtered.map(post => (
                <BlogCard key={post.slug} post={post} />
              ))}
            </div>

            {pageInfo?.hasNextPage && !activeCategory && (
              <div className="blog-load-more">
                <button className="btn-pri" onClick={loadMore} disabled={loadingMore}>
                  <span className="text" data-front={loadingMore ? 'Loading...' : 'Load more'} data-back={loadingMore ? 'Loading...' : 'Load more'} />
                  <span className="bg-clr" />
                </button>
              </div>
            )}
          </>
        )}
      </div>

      <Footer />
    </div>
  )
}
