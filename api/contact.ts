import type { VercelRequest, VercelResponse } from '@vercel/node'
import { createClient } from '@supabase/supabase-js'

export default async function handler(req: VercelRequest, res: VercelResponse) {
  if (req.method !== 'POST') return res.status(405).json({ error: 'Method not allowed' })
  const { name, phone, topic, message } = req.body || {}
  if (!name || !phone || !message) return res.status(400).json({ error: 'Name, phone and message are required.' })

  const supabaseUrl = process.env.VITE_SUPABASE_URL || process.env.SUPABASE_URL
  const serviceKey = process.env.SUPABASE_SERVICE_ROLE_KEY
  if (!supabaseUrl || !serviceKey) return res.status(500).json({ error: 'Server is not configured.' })

  const supabase = createClient(supabaseUrl, serviceKey)
  const { data, error } = await supabase.from('contact_requests').insert({ name, phone, topic: topic || null, message }).select('id').single()
  if (error) return res.status(500).json({ error: error.message })

  const botToken = process.env.TELEGRAM_BOT_TOKEN
  const chatId = process.env.TELEGRAM_CHAT_ID
  if (botToken && chatId) {
    const text = `ALASU website request\n\nName: ${name}\nPhone: ${phone}\nTopic: ${topic || 'General enquiry'}\nMessage: ${message}\n\nRequest ID: ${data.id}`
    await fetch(`https://api.telegram.org/bot${botToken}/sendMessage`, { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ chat_id: chatId, text }) })
  }

  return res.status(201).json({ id: data.id })
}
