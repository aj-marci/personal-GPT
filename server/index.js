require('dotenv').config();
const express = require('express');
const app = express();
const PORT = process.env.PORT || 8000;
const openAIKey = process.env.OPEN_AI_KEY
const OpenAI = require('openai');


// middleware to parse JSON data
app.use(express.json());

// initialize OpenAI with my API key
const openai = new OpenAI({
    apiKey: openAIKey,
  });

// route for first chat response
app.get('/generate-lineup', async (req, res) => {
    try {
      const completion = await openai.chat.completions.create({
        // "gpt-4o-mini" from docs, going to use "gpt-3.5-turbo" for fewer quota restrictions at the moment
        model: "gpt-3.5-turbo",
        messages: [
          { role: "system", content: "You are a helpful assistant." },
          { role: "user", content: "Provide the best possible NHL 18 man lineup." },
        ],
      });
  
      // send the result as a response
      res.json({ message: completion.choices[0].message.content });
    } catch (error) {
      console.error('Error creating completion:', error);
      res.status(500).json({ error: 'An error occurred while generating the lineup.' });
    }
  });

// example / sample route
app.get('/', (req, res) => {
  res.send('Hello from your Node.js server!');
});

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
