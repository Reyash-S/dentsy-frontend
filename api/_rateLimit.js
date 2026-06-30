const store = new Map()

export function rateLimit(ip, limit = 5, windowMs = 10 * 60 * 1000) {
  const now = Date.now()
  const entry = store.get(ip) || { count: 0, resetAt: now + windowMs }

  if (now > entry.resetAt) {
    entry.count = 0
    entry.resetAt = now + windowMs
  }

  entry.count++
  store.set(ip, entry)

  return entry.count > limit
}

export function getIp(req) {
  return (
    req.headers['x-forwarded-for']?.split(',')[0].trim() ??
    req.socket?.remoteAddress ??
    'unknown'
  )
}
