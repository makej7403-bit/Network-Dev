const express = require('express');
const router = express.Router();
const OpenAI = require('openai');

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY
});

// Simple chat endpoint that proxies user input to OpenAI
router.post('/', async (req, res) => {
  try {
    const { message, context } = req.body;
    if (!message) return res.status(400).json({ error: 'message required' });

    const systemPrompt = context?.system || "You are an educational assistant for Global Light.";
    const response = await openai.chat.completions.create({
      model: "gpt-4o-mini",
      messages: [
        { role: "system", content: systemPrompt },
        { role: "user", content: message }
      ],
      max_tokens: 800
    });

    const content = response.choices?.[0]?.message?.content || '';
    res.json({ reply: content });
  } catch (err) {
    console.error('OpenAI error', err);
    res.status(500).json({ error: 'OpenAI request failed' });
  }
});

module.exports = router;
