// File: pages/api/generate-site.ts
import type { NextApiRequest, NextApiResponse } from 'next';

const GEMINI_API_KEY = "AIzaSyBMnwO0L5CeCfOG7t2CmeyvuuSal2z51ug"; // Store in .env.local

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'POST') {
    return res.status(405).end('Method Not Allowed');
  }

  const { prompt } = req.body;

  if (!prompt) {
    return res.status(400).json({ error: 'Prompt is required' });
  }

  try {
    const geminiRes = await fetch('https://generativelanguage.googleapis.com/v1beta/models/gemini-pro:generateContent?key=' + GEMINI_API_KEY, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        contents: [{ parts: [{ text: `Generate a complete responsive HTML and css wesbite and css should be in html page only . ${prompt}` }] }],
      }),
    });

    const result = await geminiRes.json();

    const html = result.candidates?.[0]?.content?.parts?.[0]?.text;

    if (!html) {
      return res.status(500).json({ error: 'Failed to generate HTML' });
    }

    res.status(200).json({ html });
  } catch (error) {
    console.error('Gemini error:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
}
