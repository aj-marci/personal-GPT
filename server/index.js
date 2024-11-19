require('dotenv').config();
const express = require('express');
const app = express();
const PORT = process.env.PORT || 8000;
const openAIKey = process.env.OPEN_AI_KEY
const OpenAI = require('openai');
const cors = require('cors');

app.use(cors());
app.use(express.json());

// initialize OpenAI with my API key
const openai = new OpenAI({
    apiKey: openAIKey,
  });

// route for generating responses
app.post('/generate-response', async (req, res) => {
  try {
    const { prompt } = req.body; // extract the prompt from the request body

    if (!prompt) {
      return res.status(400).json({ error: 'Prompt is required.' });
    }

    const completion = await openai.chat.completions.create({
      model: 'gpt-4o',
      messages: [
        { role: 'system', content: 'You are a helpful assistant.' },
        { role: 'user', content: prompt }, // use the user-provided prompt
      ],
    });

    res.json({ message: completion.choices[0].message.content });
  } catch (error) {
    console.error('Error creating completion:', error);
    res.status(500).json({ error: 'An error occurred while generating the lineup.' });
  }
});

// example route
app.get('/', (req, res) => {
  res.send('Hello from your Node.js server!');
});

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
