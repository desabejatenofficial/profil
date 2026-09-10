document.addEventListener("DOMContentLoaded", () => {
// 1. MENU MOBILE & SMOOTH SCROLL
const mobileMenuToggle = document.getElementById("mobile-menu-toggle");
const mainNav = document.getElementById("main-nav");
if (mobileMenuToggle) {
mobileMenuToggle.addEventListener("click", () => {
mainNav.classList.toggle("active");
});
}

document.querySelectorAll('#main-nav a[href^="#"], .quick-card[href^="#"]').forEach(anchor => {
anchor.addEventListener('click', function (e) {
e.preventDefault();
const targetId = this.getAttribute('href');
if(targetId === '#') return;
const targetElement = document.querySelector(targetId);

if(targetElement) {
if (mainNav.classList.contains("active")) {
mainNav.classList.remove("active");
}
const headerOffset = document.getElementById('main-header').offsetHeight;
const elementPosition = targetElement.getBoundingClientRect().top;
const offsetPosition = elementPosition + window.pageYOffset - headerOffset;
window.scrollTo({ top: offsetPosition, behavior: "smooth" });
}
});
});
// 2. TEMA GELAP / TERANG (DARK MODE TOGGLE)
const themeToggle = document.getElementById('theme-toggle');
if (themeToggle) {
themeToggle.addEventListener('click', () => {
const currentTheme = document.body.getAttribute('data-theme');
if (currentTheme === 'dark') {
document.body.removeAttribute('data-theme');
themeToggle.innerHTML = '<i class="fas fa-moon"></i>';
updateChartsTheme('light');
} else {
document.body.setAttribute('data-theme', 'dark');
themeToggle.innerHTML = '<i class="fas fa-sun"></i>';
updateChartsTheme('dark');
}
});
}
// 3. HIGHCHARTS - VISUALISASI DATA APDES
function getChartColors() {
return document.body.getAttribute('data-theme') === 'dark' ?
{ text: '#F9FAFB', grid: '#4B5563', bg: 'transparent' } :
{ text: '#1F2937', grid: '#eaeaea', bg: 'transparent' };
}
function updateChartsTheme(theme) {
if(typeof Highcharts === 'undefined') return;
const colors = theme === 'dark' ? { text: '#F9FAFB', grid: '#4B5563' } : { text: '#1F2937', grid: '#eaeaea' };
Highcharts.charts.forEach(chart => {
if (chart) {
chart.update({
chart: { backgroundColor: 'transparent' },
title: { style: { color: colors.text } },
xAxis: { labels: { style: { color: colors.text } }, gridLineColor: colors.grid },
yAxis: { labels: { style: { color: colors.text } }, gridLineColor: colors.grid },
legend: { itemStyle: { color: colors.text } }
});
}
});
}
if (typeof Highcharts !== 'undefined') {
const c = getChartColors();

// Chart Sumber Dana APDES 2026
if (document.getElementById('chart-sumber-dana')) {
Highcharts.chart('chart-sumber-dana', {
chart: { type: 'pie', backgroundColor: 'transparent' },
title: { text: null },
plotOptions: {
pie: {
innerSize: '60%',
dataLabels: { enabled: false },
showInLegend: true
}
},
legend: { itemStyle: { color: c.text } },
series: [{
name: 'Jumlah',
data: [
{ name: 'Dana Desa', y: 247268000, color: '#3B82C4' },
{ name: 'Bantuan Provinsi', y: 350000000, color: '#279B48' },
{ name: 'Bantuan Kabupaten', y: 95000000, color: '#F99D26' },
{ name: 'Bagian Hasil Pajak', y: 196065000, color: '#7A3CD6' },
{ name: 'Alokasi Dana Desa', y: 399101000, color: '#E11484' },
{ name: 'BLT Dana Desa', y: 10800000, color: '#E01A22' }
]
}],
tooltip: {
formatter: function() {
return '<b>' + this.point.name + '</b>: Rp ' + Highcharts.numberFormat(this.y, 0, ',', '.');
}
},
credits: { enabled: false }
});
}
}
// 4. OWL MASCOT SYSTEM INTERAKTIF
const OWL_IMAGES = [
'https://res.cloudinary.com/drxc5e7gf/image/upload/v1787852921/Desain_tanpa_judul-removebg-preview_rg07lx.png',
'https://res.cloudinary.com/drxc5e7gf/image/upload/v1787880579/Gemini_Generated_Image_2id6wx2id6wx2id6-removebg-preview_olwtbr.png',
'https://res.cloudinary.com/drxc5e7gf/image/upload/v1787880580/Gemini_Generated_Image_cc0pxrcc0pxrcc0p-removebg-preview_ttafa4.png',
'https://res.cloudinary.com/drxc5e7gf/image/upload/v1787880581/Gemini_Generated_Image_iihwgkiihwgkiihw-removebg-preview_idqap9.png',
'https://res.cloudinary.com/drxc5e7gf/image/upload/v1787880580/Gemini_Generated_Image_kginynkginynkgin-removebg-preview_iunykg.png'
];
const OWL_EFFECTS = ['  ✨  ', '  ❓  ', '  ❗  ', '  ☁️  ', '  💨  ', ''];

let currentOwlIndex = 0;
let owlSideLog = -1;
const sysContainer = document.getElementById('owl-system');
const wrap = document.getElementById('owl-wrapper');
const img = document.getElementById('owl-img');
const fx = document.getElementById('owl-fx');
const isReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
const rand = (min, max) => Math.random() * (max - min) + min;
const randInt = (min, max) => Math.floor(Math.random() * (max - min + 1)) + min;

function runOwlCycle() {
if(isReducedMotion || !sysContainer) return;
img.src = OWL_IMAGES[currentOwlIndex];
currentOwlIndex = (currentOwlIndex + 1) % OWL_IMAGES.length;
const vw = window.innerWidth;
const vh = window.innerHeight;
const owlSize = vw < 768 ? 90 : 120;

img.style.width = owlSize + 'px';
img.style.height = owlSize + 'px';
let side;
do { side = randInt(0, 3); } while (side === owlSideLog);
owlSideLog = side;
let startX, startY, endX, endY, rot;
let scaleX = 1;
const marginPadding = rand(20, 150);
const edgeMargin = 15;
if(side === 0) { // ATAS
startX = rand(marginPadding, vw - owlSize - marginPadding);
startY = -owlSize - 50;
endX = startX; endY = edgeMargin;
rot = 180 + rand(-15, 15);
} else if (side === 1) { // KANAN
startX = vw + 50;
startY = rand(marginPadding, vh - owlSize - marginPadding);
endX = vw - owlSize - edgeMargin; endY = startY;
rot = -90 + rand(-15, 15);
if (Math.random() > 0.5) scaleX = -1;
} else if (side === 2) { // BAWAH
startX = rand(marginPadding, vw - owlSize - marginPadding);
startY = vh + 50;
endX = startX; endY = vh - owlSize - edgeMargin;
rot = rand(-15, 15);
} else if (side === 3) { // KIRI
startX = -owlSize - 50;
startY = rand(marginPadding, vh - owlSize - marginPadding);
endX = edgeMargin; endY = startY;
rot = 90 + rand(-15, 15);
if (Math.random() > 0.5) scaleX = -1;
}
const animDuration = randInt(300, 600);
const holdDuration = randInt(1000, 3000);
const delayBeforeNext = randInt(2000, 5000);
wrap.style.transition = 'none';
wrap.style.transform = `translate(${startX}px, ${startY}px)`;
wrap.style.opacity = '0';
wrap.classList.remove('owl-sway');
img.style.transform = `scaleX(${scaleX}) rotate(${rot}deg)`;

fx.className = ''; fx.innerHTML = '';
void wrap.offsetWidth;
wrap.style.transition = `all ${animDuration}ms cubic-bezier(0.175, 0.885, 0.32, 1.275)`;
wrap.style.transform = `translate(${endX}px, ${endY}px)`;
wrap.style.opacity = '1';
const chosenFx = OWL_EFFECTS[randInt(0, OWL_EFFECTS.length - 1)];
if (chosenFx !== '') {
setTimeout(() => {
fx.innerHTML = chosenFx;
fx.style.top = (side === 2) ? '10%' : '80%';
fx.className = 'owl-fx-pop';
}, animDuration / 2);
}
setTimeout(() => { wrap.classList.add('owl-sway'); }, animDuration);

setTimeout(() => {
wrap.classList.remove('owl-sway');
wrap.style.transition = `all ${animDuration}ms ease-in`;
wrap.style.transform = `translate(${startX}px, ${startY}px)`;
img.style.transform = `scaleX(${scaleX}) scaleY(0.5) rotate(${rot}deg)`;
wrap.style.opacity = '0';

setTimeout(() => { runOwlCycle(); }, animDuration + delayBeforeNext);
}, animDuration + holdDuration);
}
setTimeout(runOwlCycle, 2000);
// 5. LOGIN MODAL LOGIC
const loginModal = document.getElementById("login-modal");
const btnOpenLogin = document.getElementById("btn-open-login");
const btnCloseModal = document.getElementById("btn-close-modal");
const btnCancelLogin = document.getElementById("btn-cancel-login");
if (btnOpenLogin) { btnOpenLogin.addEventListener("click", () => { loginModal.style.display = "flex"; }); }
const closeModal = () => { loginModal.style.display = "none"; };
if(btnCloseModal) btnCloseModal.addEventListener("click", closeModal);
if(btnCancelLogin) btnCancelLogin.addEventListener("click", closeModal);
});