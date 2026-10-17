# CustomerLens — Analyzing Customer Behavior (Vercel-ready)

A Flask + Pandas + NumPy customer-behavior analytics dashboard, configured for deployment on Vercel.

## Deploy to Vercel

### Option A — Deploy from GitHub (recommended)
1. Extract this ZIP and place the **contents** of this folder at the root of a GitHub repository. `app.py`, `vercel.json`, `requirements.txt`, `api/`, `templates/`, `static/`, and `data/` should be directly in the repository root.
2. Push the repository to GitHub.
3. In the Vercel dashboard, select **Add New → Project**, import that repository, and deploy.
4. Keep the project root directory set to the repository root. The included `vercel.json` and `api/index.py` configure the Flask app entry point.

### Option B — Deploy with Vercel CLI
1. Install Node.js if it is not already installed.
2. Install the Vercel CLI: `npm install -g vercel`
3. Open a terminal in this folder (the folder containing `vercel.json`).
4. Run `vercel` and follow the prompts. When ready to publish production, run `vercel --prod`.

## Run locally

```bash
python -m venv .venv
```

Windows:
```powershell
.venv\Scripts\activate
pip install -r requirements.txt
python app.py
```

macOS/Linux:
```bash
source .venv/bin/activate
pip install -r requirements.txt
python app.py
```

Then open `http://127.0.0.1:5000`.

## Important Vercel notes

- Vercel runs this Flask app as a serverless function. Uploaded/cleaned datasets are kept only in that running function's memory and are **not durable storage**; a later request or cold start can return to the included sample CSV. Use a database or object storage if you need uploaded data to persist between requests/users.
- The bundled CSV is synthetic demo data. Do not upload confidential or personally identifiable customer data to a public demo deployment.
- Charts load Chart.js and fonts from external CDNs, so the browser needs internet access for those assets.

## Features
- Dashboard, insights, statistics, dataset, and campaign pages
- CSV upload, data cleaning, preview, and CSV export
- Descriptive statistics, missing-value and duplicate checks, segment counts, outlier counts, and correlation where supported
