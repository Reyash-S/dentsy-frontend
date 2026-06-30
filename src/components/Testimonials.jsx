const testimonials = [
  {
    quote: '“The new software is so smart and feels like we are so much more advanced now”',
    name: 'The Stow Brothers',
    role: 'Estate Agent',
    initials: 'SB',
    avatarStyle: { background: 'linear-gradient(130deg,#00adab,#319493)' },
    cardStyle: { backgroundImage: 'url(/images/guy3.png)', backgroundSize: 'cover' },
    authorInfoCls: 'stow',
  },
  {
    quote: '”Super innovative with the AI-integration and makes life a lot easier when tracing back the details of previous calls.”',
    name: 'Grey & Co.',
    role: 'Estate Agent',
    initials: 'GC',
    avatarStyle: { background: 'black' },
    cardStyle: { backgroundImage: 'url(/images/girl.jpeg)', backgroundSize: 'cover' },
    authorInfoCls: '',
  },
]

export default function Testimonials({ cms }) {
  const c = cms || {}

  const cards = c.testimonials || testimonials
  const displayCards = cards.map((t, i) => {
    if (t.cardStyle) return t
    const defaults = testimonials[i] || testimonials[0]
    return {
      quote: t.quote || defaults.quote,
      name: t.name || defaults.name,
      role: t.role || defaults.role,
      initials: t.initials || defaults.initials,
      avatarStyle: defaults.avatarStyle,
      cardStyle: t.image ? { backgroundImage: `url(${t.image})`, backgroundSize: 'cover' } : defaults.cardStyle,
      authorInfoCls: defaults.authorInfoCls || '',
    }
  })

  return (
    <section className="testimonials">
      <div className="container">
        <div className="testimonials-header">
          <div className="section-label">{c.label || 'Social proof'}</div>
          <h2>{c.heading || 'What estate agents are saying'}</h2>
          <p className="body">{c.description || 'Discover real measurable results from agencies using Dentsy, including improved efficiency, faster campaign delivery, stronger client satisfaction, increased revenue growth, collaboration across teams, streamlined workflows, reduced manual effort, enhanced reporting accuracy, scalable processes, and performance gains that demonstrate how Dentsy helps modern agencies operate smarter, grow sustainably, and stay competitive.'}</p>
        </div>

        <div className="testimonials-grid">
          {displayCards.map(({ quote, name, role, initials, avatarStyle, cardStyle, authorInfoCls }) => (
            <div className="testimonial-card" key={name} style={cardStyle}>
              <div className="stars">&#9733;&#9733;&#9733;&#9733;&#9733;</div>
              <blockquote>{quote}</blockquote>
              <div className="testimonial-author">
                <div className="author-avatar" style={avatarStyle}>{initials}</div>
                <div className={`author-info${authorInfoCls ? ` ${authorInfoCls}` : ''}`}>
                  <span className="author-name">{name}</span>
                  <span className="author-role">{role}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
