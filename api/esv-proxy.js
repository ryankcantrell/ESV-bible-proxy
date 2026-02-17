// api/esv-proxy.js
module.exports = async (req, res) => {
  // Enable CORS
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  // Handle preflight
  if (req.method === 'OPTIONS') {
    res.status(200).end();
    return;
  }

  if (req.method !== 'GET') {
    res.status(405).json({ error: 'Method not allowed' });
    return;
  }

  const { passage, apiKey } = req.query;

  if (!passage || !apiKey) {
    res.status(400).json({ error: 'Missing passage or apiKey parameter' });
    return;
  }

  try {
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
    console.error('Error:', error);
    res.status(500).json({ error: 'Failed to fetch from ESV API', details: error.message });
  }
};
