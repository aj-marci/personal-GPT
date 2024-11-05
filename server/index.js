const express = require('express');
const app = express();
const PORT = process.env.PORT || 8000;
const dotenv = require('dotenv');
const openAIKey = process.env.OPEN_AI_KEY

dotenv.config();

// example / sample route
app.get('/', (req, res) => {
  res.send('Hello from your Node.js server!');
});

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
