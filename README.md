# ESV Bible API Proxy

This is a simple serverless backend that proxies requests to the ESV API, solving CORS issues for browser-based apps.

## Setup Instructions

### 1. Create a Vercel Account
1. Go to [vercel.com](https://vercel.com)
2. Sign up for free (can use GitHub, GitLab, or email)

### 2. Install Vercel CLI (Optional - or use web interface)
```bash
npm install -g vercel
```

### 3. Deploy via Web Interface (Easiest)

**Option A: Direct Upload**
1. Go to vercel.com and log in
2. Click "Add New..." → "Project"
3. Click "Deploy" at the bottom
4. Upload these files:
   - `api/esv-proxy.js`
   - `vercel.json`
   - `package.json`
5. Click "Deploy"
6. Vercel will give you a URL like: `https://your-project.vercel.app`

**Option B: From GitHub**
1. Create a new GitHub repository
2. Upload these files to the repo
3. In Vercel, click "Import Project"
4. Connect your GitHub and select the repo
5. Click "Deploy"

### 4. Get Your Proxy URL

After deployment, your proxy URL will be:
```
https://your-project-name.vercel.app/api/esv-proxy
```

### 5. Update Your Bible App

In your bible-reader.html file, replace the API call with:

```javascript
const response = await fetch(
  `https://your-project-name.vercel.app/api/esv-proxy?passage=${encodeURIComponent(passage)}&apiKey=${apiKey}`
);
```

## How It Works

1. Your web app sends a request to your Vercel proxy
2. The proxy forwards the request to ESV API with proper headers
3. ESV API responds to the proxy (no CORS issues because it's server-to-server)
4. Proxy sends the data back to your web app

## Free Tier Limits

Vercel free tier includes:
- 100GB bandwidth/month
- Unlimited requests
- Automatic HTTPS
- Perfect for personal use!

## Testing

Once deployed, test your proxy by visiting in a browser:
```
https://your-project-name.vercel.app/api/esv-proxy?passage=John+3:16&apiKey=YOUR_ESV_API_KEY
```

You should see JSON data returned.
