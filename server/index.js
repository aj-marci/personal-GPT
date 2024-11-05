const express = require('express');
const app = express();
const PORT = process.env.PORT || 8000;

// Middleware for parsing JSON data
app.use(express.json());

// Example route
app.get('/', (req, res) => {
  res.send('Hello from your Node.js server!');
});

// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
