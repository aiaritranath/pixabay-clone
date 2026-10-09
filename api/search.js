// Vercel serverless function: calls Pixabay so the API key stays on the server.
const ALLOWED = ['q', 'image_type', 'orientation', 'category', 'order', 'page', 'colors'];

module.exports = async (req, res) => {
  const key = process.env.PIXABAY_API_KEY;
  if (!key) {
    return res.status(500).json({
      error: 'PIXABAY_API_KEY is not set. Add it in Vercel > Settings > Environment Variables, then redeploy.',
    });
  }

  const params = new URLSearchParams({ key, safesearch: 'true', per_page: '30' });
  for (const name of ALLOWED) {
    const v = req.query[name];
    if (typeof v === 'string' && v) params.set(name, v.slice(0, 100));
  }

  try {
    const r = await fetch('https://pixabay.com/api/?' + params);
    const body = await r.text();
    if (!r.ok) {
      const msg = r.status === 429 ? 'Pixabay rate limit reached. Try again in a minute.' : body.slice(0, 200);
      return res.status(r.status).json({ error: msg });
    }
    // Pixabay asks apps to cache results for 24 hours.
    res.setHeader('Cache-Control', 's-maxage=86400, stale-while-revalidate=3600');
    res.setHeader('Content-Type', 'application/json');
    return res.status(200).send(body);
  } catch (e) {
    return res.status(502).json({ error: 'Could not reach Pixabay.' });
  }
};
