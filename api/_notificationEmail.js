let cached = { email: null, ts: 0 }
const TTL = 5 * 60 * 1000

export async function getNotificationEmail() {
  if (cached.email && Date.now() - cached.ts < TTL) {
    return cached.email
  }

  const url = process.env.VITE_WP_GRAPHQL_URL || process.env.WP_GRAPHQL_URL
  if (!url) return ''

  try {
    const res = await fetch(url, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ query: '{ notificationEmail }' }),
    })
    const json = await res.json()
    const email = json?.data?.notificationEmail || ''
    if (email) {
      cached = { email, ts: Date.now() }
    }
    return email
  } catch (err) {
    console.error('Failed to fetch notification email:', err.message)
    return cached.email || ''
  }
}
