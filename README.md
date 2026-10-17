# Analyzing Customer Behavior

A small college mini project that analyses a sample customer dataset and shows the results on a simple website.

**Pages:** Dashboard (totals and 3 charts) · Customer Analysis (popular categories, spending levels, insights) · Dataset (full sample table)

**Built with:** HTML, CSS, vanilla JavaScript and [Chart.js](https://www.chartjs.org/) (loaded from a CDN). No backend, no database, no build step.

## Files

| File | Purpose |
|------|---------|
| `index.html` | Page structure |
| `style.css` | Styling and responsive layout |
| `script.js` | Dataset, calculations and charts |
| `data.csv` | The same sample dataset, for download |

## Run locally

Double-click `index.html` (needs internet once for Chart.js).

## Deploy on Vercel

1. Create a GitHub repository and upload all the files in this folder.
2. Go to [vercel.com](https://vercel.com), sign in with GitHub and click **Add New → Project**.
3. Select the repository. Leave Framework Preset as **Other** and keep every setting at its default.
4. Click **Deploy**. Your site is live in under a minute.

## Changing the data

Edit `data.csv` and paste the same rows into the `CSV` text block at the top of `script.js`.
Columns: `id,name,age,gender,city,category,orders,total_spent`.
