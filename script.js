/* ---------- Sample dataset (same data as data.csv) ---------- */
const CSV = `id,name,age,gender,city,category,orders,total_spent
C001,Neha Naik,22,Female,Thane,Fashion,2,1760
C002,Aman Rane,26,Female,Pune,Beauty,12,16430
C003,Neha Patil,19,Female,Thane,Beauty,7,8280
C004,Neha Desai,56,Male,Mumbai,Fashion,1,1170
C005,Pooja Patil,39,Female,Surat,Beauty,7,11120
C006,Sneha Shah,52,Male,Pune,Groceries,8,6610
C007,Sneha Kulkarni,23,Female,Mumbai,Electronics,10,82200
C008,Priya Naik,49,Female,Nagpur,Electronics,10,55140
C009,Arjun Iyer,57,Male,Pune,Fashion,11,23120
C010,Divya Mehta,49,Male,Pune,Home & Kitchen,8,29020
C011,Neha Mehta,45,Male,Nagpur,Fashion,11,25010
C012,Divya Iyer,31,Male,Mumbai,Fashion,6,12820
C013,Priya Shah,22,Female,Nagpur,Beauty,1,630
C014,Siddharth Gupta,31,Female,Pune,Groceries,5,4160
C015,Anjali Mehta,57,Female,Pune,Groceries,6,6890
C016,Siddharth Sharma,20,Female,Thane,Electronics,10,50310
C017,Neha Kulkarni,19,Male,Pune,Home & Kitchen,10,16770
C018,Nikhil Desai,33,Male,Nagpur,Electronics,5,38270
C019,Aman Mehta,58,Female,Surat,Electronics,2,16210
C020,Siddharth Joshi,34,Male,Nashik,Fashion,8,21070
C021,Kavya Mehta,29,Male,Mumbai,Groceries,1,650
C022,Karan Pawar,50,Male,Pune,Groceries,9,9990
C023,Rahul Iyer,23,Female,Surat,Home & Kitchen,4,15430
C024,Karan Kulkarni,47,Male,Thane,Fashion,8,5820
C025,Priya Gupta,50,Female,Pune,Fashion,10,15390
C026,Sneha Naik,25,Male,Mumbai,Electronics,11,62660
C027,Aman Pawar,52,Female,Mumbai,Beauty,5,2160
C028,Rohan Kulkarni,20,Female,Pune,Fashion,2,4850
C029,Anjali Desai,19,Male,Nagpur,Home & Kitchen,8,9300
C030,Aman Patil,29,Female,Nashik,Groceries,1,440
C031,Priya Pawar,51,Female,Surat,Groceries,9,7240
C032,Karan Joshi,23,Male,Pune,Groceries,12,10460
C033,Sneha Rane,53,Male,Pune,Fashion,12,35920
C034,Nikhil Patil,42,Male,Pune,Fashion,11,14060
C035,Siddharth Desai,35,Female,Mumbai,Beauty,9,13470
C036,Yash Sharma,56,Female,Mumbai,Electronics,1,2860
C037,Siddharth Rane,52,Male,Pune,Groceries,7,7050
C038,Isha Iyer,47,Female,Surat,Fashion,9,21200
C039,Yash Rane,49,Male,Pune,Fashion,8,21210
C040,Yash Mehta,30,Female,Thane,Groceries,2,1130`;

/* ---------- Data and calculations ---------- */
const rows = CSV.trim().split('\n').slice(1).map(line => {
  const [id, name, age, gender, city, category, orders, spent] = line.split(',');
  return { id, name, age: +age, gender, city, category, orders: +orders, spent: +spent };
});

const sum = (list, f) => list.reduce((s, x) => s + f(x), 0);
const inr = n => '₹' + Math.round(n).toLocaleString('en-IN');
const pct = n => Math.round(n * 100) + '%';
const ageGroup = a => (a <= 25 ? '18–25' : a <= 35 ? '26–35' : a <= 45 ? '36–45' : '46+');
const segment = r => (r.spent >= 25000 ? 'High (₹25k+)' : r.spent >= 10000 ? 'Medium (₹10k–25k)' : 'Low (under ₹10k)');

// Group customers by a key and total up customers, sales and orders
function summarize(keyFn) {
  const groups = {};
  rows.forEach(r => (groups[keyFn(r)] = groups[keyFn(r)] || []).push(r));
  return Object.entries(groups).map(([name, list]) => ({
    name, n: list.length, orders: sum(list, r => r.orders), sales: sum(list, r => r.spent)
  }));
}

const M = { customers: rows.length, sales: sum(rows, r => r.spent), orders: sum(rows, r => r.orders) };
M.avg = M.sales / M.orders;

const bySales = (a, b) => b.sales - a.sales;
const cats = summarize(r => r.category).sort(bySales);
const ages = summarize(r => ageGroup(r.age)).sort((a, b) => a.name.localeCompare(b.name));
const cities = summarize(r => r.city).sort(bySales);
const segs = summarize(segment).sort(bySales);
const loyal = rows.filter(r => r.orders >= 8);

/* ---------- UI ---------- */
const COLORS = ['#0f766e', '#d98e04', '#3b6ea5', '#d4573f', '#7a9a5b', '#8a6fb5'];
const $ = id => document.getElementById(id);
const card = (label, value, note) => `<div class="card kpi"><span>${label}</span><b>${value}</b><small>${note || ''}</small></div>`;

$('kpis').innerHTML =
  card('Total customers', M.customers, 'In the sample dataset') +
  card('Total sales', inr(M.sales), 'Sum of all customer spending') +
  card('Total orders', M.orders, 'Across all customers') +
  card('Average purchase', inr(M.avg), 'Total sales ÷ total orders');

$('count').textContent = rows.length;
$('dataRows').innerHTML = rows.map(r =>
  `<tr><td>${r.id}</td><td>${r.name}</td><td>${r.age}</td><td>${r.gender}</td><td>${r.city}</td><td>${r.category}</td><td>${r.orders}</td><td>${inr(r.spent)}</td></tr>`).join('');

$('catRows').innerHTML = cats.map(c =>
  `<tr><td>${c.name}</td><td>${c.n}</td><td>${inr(c.sales)}</td><td>${pct(c.sales / M.sales)}</td></tr>`).join('');

const topCat = cats[0], topCity = cities[0];
const topAge = [...ages].sort(bySales)[0];
$('insights').innerHTML =
  card('Best-selling category', topCat.name, `${pct(topCat.sales / M.sales)} of total sales`) +
  card('Top age group', topAge.name, `${pct(topAge.sales / M.sales)} of sales come from this group`) +
  card('Top city', topCity.name, `${pct(topCity.sales / M.sales)} of sales, ${topCity.n} customers`) +
  card('Loyal customers', pct(loyal.length / rows.length), `Customers with 8+ orders bring ${pct(sum(loyal, r => r.spent) / M.sales)} of sales`);

function chart(id, type, labels, data, money) {
  if (typeof Chart === 'undefined') return; // Chart.js failed to load (offline)
  const pie = type === 'doughnut';
  const value = c => (typeof c.parsed === 'number' ? c.parsed : c.parsed.y);
  new Chart($(id), {
    type,
    data: { labels, datasets: [{ data, backgroundColor: pie ? COLORS : COLORS[0], borderRadius: pie ? 0 : 4, borderWidth: pie ? 2 : 0 }] },
    options: {
      responsive: true, maintainAspectRatio: false,
      plugins: {
        legend: { display: pie, position: 'bottom', labels: { boxWidth: 10, font: { size: 11 } } },
        tooltip: { callbacks: { label: c => ' ' + (money ? inr(value(c)) : value(c)) } }
      },
      scales: pie ? {} : {
        y: { beginAtZero: true, grid: { color: '#e8ecea' }, ticks: money ? { callback: v => '₹' + v / 1000 + 'k' } : {} },
        x: { grid: { display: false } }
      }
    }
  });
}

const draw = {
  dashboard() {
    chart('cCat', 'doughnut', cats.map(c => c.name), cats.map(c => c.sales), true);
    chart('cAge', 'bar', ages.map(a => a.name), ages.map(a => a.n));
    chart('cCity', 'bar', cities.map(c => c.name), cities.map(c => c.sales), true);
  },
  analysis() {
    chart('cSpendAge', 'bar', ages.map(a => a.name), ages.map(a => Math.round(a.sales / a.n)), true);
    chart('cSeg', 'doughnut', segs.map(s => s.name), segs.map(s => s.n));
  }
};

// Simple tab navigation: charts are drawn the first time a tab is opened
const drawn = {};
function show(view) {
  document.querySelectorAll('.view').forEach(s => (s.hidden = s.id !== view));
  document.querySelectorAll('nav button').forEach(b => b.classList.toggle('active', b.dataset.view === view));
  if (draw[view] && !drawn[view]) { draw[view](); drawn[view] = true; }
}
document.querySelectorAll('nav button').forEach(b => (b.onclick = () => show(b.dataset.view)));
show('dashboard');
