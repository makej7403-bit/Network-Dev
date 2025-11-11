const express = require('express');
const router = express.Router();
const OpenAI = require('openai');

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY
});

// Endpoint to generate a WASSCE/WAEC lesson or practice questions for a subject
router.post('/lesson', async (req, res) => {
  try {
    const { subject, level, topic } = req.body;
    if (!subject) return res.status(400).json({ error: 'subject required' });

    const prompt = `
You are "Global Light Tutor", an AI that prepares students for WASSCE/WAEC.
Create a structured lesson for:
- Subject: ${subject}
- Level: ${level || 'WASSCE (Senior Secondary)'}
- Topic: ${topic || 'General'}
Include:
1) Learning objectives
2) Short explanation and examples
3) 5 practice questions with model answers
4) Tips for exam day
Return JSON with keys: objectives, lesson, examples, questions (each question has answer).
    `;

    const response = await openai.chat.completions.create({
      model: "gpt-4o-mini",
      messages: [{ role: 'system', content: 'You are an expert WASSCE tutor.' }, { role: 'user', content: prompt }],
      max_tokens: 1200
    });

    const content = response.choices?.[0]?.message?.content || '';
    // In production parse and validate the content; here we return raw text
    res.json({ lesson: content });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'failed to generate lesson' });
  }
});

module.exports = router;
