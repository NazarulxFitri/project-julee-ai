import { GoogleGenAI } from '@google/genai';

export default async function handler(req, res) {
  // CORS Headers
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }

  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const { prompt } = req.body || {};
  if (!prompt) {
    return res.status(400).json({ error: 'Prompt is required' });
  }

  const apiKey = process.env.GEMINI_API_KEY || process.env.VITE_GEMINI_API_KEY;

  if (!apiKey) {
    return res.status(200).json({
      text: `Julee is active! To connect full live Gemini 3.6 Flash generation on server, set GEMINI_API_KEY in Vercel environment variables.`
    });
  }

  try {
    const ai = new GoogleGenAI({ apiKey });
    const response = await ai.models.generateContent({
      model: 'gemini-2.5-flash',
      contents: prompt,
      config: {
        systemInstruction: `You are Julee AI, a 24/7 personal AI partner created for Nazarul. You are powered by Gemini 3.6 Flash.
Rules you follow:
1. No unsolicited pushes: edits stay local.
2. Mandatory Project Confirmation: when user asks to deploy, ask if they want to target project-julee-ai or muslim-companion.
3. Strict Pipeline: build -> lint -> add -> commit -> push -> Vercel deploy.
Answer ALL questions (math, coding, life, work, rules, ideas) intelligently, naturally, and concisely with markdown formatting.`
      }
    });

    return res.status(200).json({ text: response.text });
  } catch (err) {
    return res.status(500).json({ error: err.message });
  }
}
