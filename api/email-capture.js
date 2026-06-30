import { Resend } from 'resend'
import { rateLimit, getIp } from './_rateLimit.js'
import { getNotificationEmail } from './_notificationEmail.js'

const resend = new Resend(process.env.RESEND_API_KEY)

const esc = (str) =>
  String(str ?? '')
    .slice(0, 500)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#x27;')

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' })
  }

  if (rateLimit(getIp(req))) {
    return res.status(429).json({ error: 'Too many requests. Please try again later.' })
  }

  const { email, source } = req.body

  if (!email) {
    return res.status(400).json({ error: 'Email is required' })
  }

  const sEmail  = esc(email)
  const sSource = esc(source || 'Website')

  const debug = { email: null, slack: null }
  const notificationTo = await getNotificationEmail()

  if (!notificationTo) {
    return res.status(500).json({ error: 'Notification email not configured' })
  }

  try {
    await resend.emails.send({
      from: process.env.EMAIL_FROM || 'Dentsy <noreply@dentsy.ai>',
      to: notificationTo,
      replyTo: sEmail,
      subject: `New email capture — ${sSource}`,
      html: `
        <h2>New Email Capture</h2>
        <p><strong>Email:</strong> ${sEmail}</p>
        <p><strong>Source:</strong> ${sSource}</p>
      `,
    })
    debug.email = 'ok'
  } catch (err) {
    console.error('Resend error:', err)
    debug.email = err.message
    return res.status(500).json({ error: 'Failed to send email', debug })
  }

  try {
    const slackRes = await fetch(process.env.SLACK_WEBHOOK_URL, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        text: `*New Email Capture*\n*Email:* ${sEmail}\n*Source:* ${sSource}`,
      }),
    })
    debug.slack = slackRes.ok ? 'ok' : `HTTP ${slackRes.status}`
    if (!slackRes.ok) console.error('Slack webhook error:', slackRes.status, await slackRes.text())
  } catch (err) {
    console.error('Slack fetch error:', err)
    debug.slack = err.message
  }

  return res.status(200).json({ ok: true, debug })
}
