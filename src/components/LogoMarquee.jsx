const FALLBACK = [
  { title: 'The Stow Brothers',  logoUrl: '/images/stow.png' },
  { title: 'Grey & Co',          logoUrl: '/images/grey-white.png' },
  { title: 'Oscar James',        logoUrl: '/images/oscar-james-white.png' },
  { title: 'Shortland Horne',    logoUrl: '/images/corrie.png' },
  { title: 'FIA',                logoUrl: '/images/fia-white.png' },
  { title: 'Marshall Property',  logoUrl: '/images/marshall.png' },
  { title: 'Kingstons',          logoUrl: '/images/kingstons.png' },
  { title: 'Sandra Davidson',    logoUrl: '/images/davidson.png' },
]

function MarqueeContent({ logos, ariaHidden }) {
  return (
    <ul className="marquee-content" aria-hidden={ariaHidden}>
      {logos.map(({ title, logoUrl }) => (
        <li key={title}><img src={logoUrl} alt={title} height={30} /></li>
      ))}
    </ul>
  )
}

export default function LogoMarquee({ logos }) {
  const items = logos && logos.length ? logos : FALLBACK
  return (
    <div className="logo-marquee">
      <MarqueeContent logos={items} />
      <MarqueeContent logos={items} ariaHidden={true} />
    </div>
  )
}
