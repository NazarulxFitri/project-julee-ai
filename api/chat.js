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

  const { prompt, history = [], customRules = [] } = req.body || {};
  if (!prompt) {
    return res.status(400).json({ error: 'Prompt is required' });
  }

  const apiKey = process.env.GEMINI_API_KEY || process.env.VITE_GEMINI_API_KEY;

  const systemInstruction = `You are Julee AI, a 24/7 personal AI partner created for Nazarul. You are powered by Gemini 3.6 Flash.

User Context:
- Name: Nazarul
- GitHub Username: NazarulxFitri
- Total Repositories: 43 repositories
- Key Active Repositories:
  1. project-julee-ai (Current Control Dashboard - https://project-julee-ai.vercel.app)
  2. muslim-companion (Muslim Companion App - https://muslim-companion.vercel.app)
  3. kids-edu-arcade
  4. ticket-event-system
  5. cleaning-service-booking
  6. ohwop
  7. pulpenstudio
  8. cashewPos
  9. cashewpos-z
  10. nazarul-ebook-assessment
  11. angular-assessment-nazarul
  12. react-assessment-nazarul
  13. covid-19-stats
  14. DaaunFood
  15. IT-Asset-Management
  16. Pokedex-ReactJS
  17. mypokedex2
  18. nextjs-pokedex
  19. sikenit.com
  20. booking-hall
  21. pac-man
  22. tic-tac-toe
  (Total 43 repos in user's GitHub account)

Trained Behavioral Rules:
1. No unsolicited pushes: All code edits remain local until user explicitly prompts to deploy or push.
2. Mandatory Project Confirmation: When user says 'deploy' or asks to deploy, ask them to confirm whether to target 'project-julee-ai' or 'muslim-companion'.
3. Strict 5-Step Pipeline: When confirmed, run: build -> lint -> git add . -> git commit -> git push -> Vercel deploy.
4. Plan-First Approval ("work on it"): When user asks to build or create a feature, explain the plan first and wait for "work on it".
5. 24/7 Cloud Engine: Continuous operation.
6. In-Chat Training: User can type "rule: <new rule>" to add rules.
${customRules.length ? 'Custom User Trained Rules:\n' + customRules.map((r, i) => `${i+1}. ${r}`).join('\n') : ''}

Your Goal:
- Answer ALL user prompts naturally, conversationally, and intelligently like a real LLM (math, logic, repo details, follow-up questions like "see more", "how many are there", "is this all", explaining plans, answering questions about rules, etc.).
- Use conversational memory from the chat history.
- Never output robotic template strings. Always format with GitHub Markdown.`;

  if (!apiKey) {
    // Smart contextual fallback engine when API key is not yet set in environment
    const lower = prompt.toLowerCase().trim();
    let text = "";

    if (lower === 'hi' || lower === 'hello' || lower === 'hey' || lower.startsWith('hi ') || lower.startsWith('hello ')) {
      text = "Hello Nazarul! 👋 I'm Julee, your 24/7 AI partner. I'm connected to your 43 GitHub repositories and active on your Cloud Engine. How can I help you today? You can ask me to list your repos, train me on a rule (`rule: <new rule>`), or say 'deploy'!";
    } else if (lower.includes('how many') || lower.includes('how many repo') || lower.includes('count')) {
      text = "You have **43 repositories** in total in your GitHub account (`NazarulxFitri`). 8 are actively featured in your primary dashboard list!";
    } else if (lower.includes('see more') || lower === 'more' || lower.includes('show more')) {
      text = "Here are more of your repositories from your total 43 repos:\n\n• 📦 **cashewpos-z**\n• 📦 **nazarul-ebook-assessment**\n• 📦 **angular-assessment-nazarul**\n• 📦 **react-assessment-nazarul**\n• 📦 **covid-19-stats**\n• 📦 **DaaunFood**\n• 📦 **IT-Asset-Management**\n• 📦 **Pokedex-ReactJS**\n• 📦 **mypokedex2**\n• 📦 **nextjs-pokedex**\n• 📦 **sikenit.com**\n• 📦 **booking-hall**\n• 📦 **pac-man**\n• 📦 **tic-tac-toe**\n\n*(Connect your Gemini Key in the header to ask detailed questions about any specific repo!)*";
    } else if (lower.includes('repo') || lower.includes('repository')) {
      text = "🐙 **Here are your active featured GitHub repositories:**\n\n• 🎯 **project-julee-ai** *(Current Control Dashboard)*\n• 🎯 **muslim-companion** *(Muslim Companion App)*\n• 📦 **kids-edu-arcade**\n• 📦 **ticket-event-system**\n• 📦 **cleaning-service-booking**\n• 📦 **ohwop**\n• 📦 **pulpenstudio**\n• 📦 **cashewPos**\n\n*(You have 43 repos in total. Ask 'see more' or 'how many are there' to explore!)*";
    } else {
      text = `I hear you! I'm tracking your prompt: "${prompt}". You can add your Gemini API Key in the top header button to unlock live multi-turn AI reasoning!`;
    }

    return res.status(200).json({ text });
  }

  try {
    const ai = new GoogleGenAI({ apiKey });
    
    // Format history for Gemini API
    const formattedContents = history.map(m => ({
      role: m.sender === 'user' ? 'user' : 'model',
      parts: [{ text: m.text }]
    }));
    formattedContents.push({ role: 'user', parts: [{ text: prompt }] });

    const response = await ai.models.generateContent({
      model: 'gemini-3.6-flash',
      contents: formattedContents,
      config: {
        systemInstruction
      }
    });

    return res.status(200).json({ text: response.text });
  } catch (err) {
    console.error("Gemini API error:", err);
    return res.status(500).json({ error: err.message });
  }
}

