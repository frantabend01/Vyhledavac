export default async function handler(req, res) {
  const query = req.query.q;
  if (!query) {
    return res.status(400).json({ error: "Missing query" });
  }

  const apiKey = process.env.API_KEY;
  const cx = process.env.CX;

  const url = `https://www.googleapis.com/customsearch/v1?key=${apiKey}&cx=${cx}&q=${encodeURIComponent(query)}`;

  try {
    const response = await fetch(url);
    const data = await response.json();
    res.status(200).json(data.items || []);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
}