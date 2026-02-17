// api/esv-proxy.js
// Vercel serverless function to proxy ESV API requests

export default async function handler(req, res) {
  // Enable CORS so your web app can call this
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  // Handle preflight requests
  if (req.method === 'OPTIONS') {
    res.status(200).end();
    return;
  }

  // Only allow GET requests
  if (req.method !== 'GET') {
    res.status(405).json({ error: 'Method not allowed' });
    return;
  }

  // Get the passage from query parameters
  const { passage, apiKey } = req.query;

  if (!passage) {
    res.status(400).json({ error: 'Missing passage parameter' });
    return;
  }

  if (!apiKey) {
    res.status(400).json({ error: 'Missing apiKey parameter' });
    return;
  }

  try {
    // Call the ESV API
    const esvResponse = await fetch(
      `https://api.esv.org/v3/passage/text/?q=${encodeURIComponent(passage)}&include-verse-numbers=true&include-headings=false`,
      {
        headers: {
          'Authorization': `Token ${apiKey}`
        }
      }
    );

    if (!esvResponse.ok) {
      throw new Error(`ESV API returned ${esvResponse.status}`);
    }

    const data = await esvResponse.json();
    res.status(200).json(data);

  } catch (error) {
    console.error('Error fetching from ESV API:', error);
    res.status(500).json({ error: 'Failed to fetch from ESV API', details: error.message });
  }
}
