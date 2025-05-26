const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const path = require('path');

const app = express();
const PORT = 3000;

// Middleware
app.use(cors());
app.use(bodyParser.json());

// Serve static files from docs (now one level up)
app.use(express.static(path.join(__dirname)));

// Dummy user
const USER = {
  username: 'admin',
  password: '1234'
};

// Login API route
app.post('/api/login', (req, res) => {
  const { username, password } = req.body;

  if (username === USER.username && password === USER.password) {
    res.json({ token: 'mock-token-abc123' });
  } else {
    res.status(401).json({ error: 'Invalid username or password' });
  }
});

// Serve index.html for root
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'index.html'));
});

app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});
