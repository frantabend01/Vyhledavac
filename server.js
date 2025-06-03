const express = require('express');
const app = express();

app.use(express.static('.'));

const PORT = 3000;


app.get('/api/search', async (req, res) => {
  const query = req.query.q;
  if (!query) return res.status(400).json({ error: "Missing query" });

  const apiKey = process.env.API_KEY;
  const cx = process.env.CX;

  const url = `https://www.googleapis.com/customsearch/v1?key=${apiKey}&cx=${cx}&q=${encodeURIComponent(query)}`;

  try {
    const resp = await fetch(url);
    const data = await resp.json();
    res.json(data.items || []);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

app.listen(PORT, () => {
  console.log(`Server běží na http://localhost:${PORT}`);
});
