/* ============================================
   NAV / SIDEBAR
   ============================================ */
const navToggle = document.getElementById('navToggle');
const sidebar   = document.getElementById('sidebar');
const overlay   = document.getElementById('overlay');

function closeMenu() {
    navToggle.classList.remove('active');
    sidebar.classList.remove('active');
    overlay.classList.remove('active');
    navToggle.setAttribute('aria-expanded', 'false');
    document.body.style.overflow = '';
}

function toggleMenu() {
    const isActive = navToggle.classList.toggle('active');
    sidebar.classList.toggle('active');
    overlay.classList.toggle('active');
    navToggle.setAttribute('aria-expanded', isActive ? 'true' : 'false');
    document.body.style.overflow = isActive ? 'hidden' : '';
}

navToggle.addEventListener('click', toggleMenu);
overlay.addEventListener('click', closeMenu);
sidebar.querySelectorAll('a').forEach(a => a.addEventListener('click', closeMenu));

/* ============================================
   COUNTDOWN
   ============================================ */
function updateCountdown() {
    const target = new Date(window.WEDDING.weddingDate).getTime();
    const now = Date.now();
    const diff = target - now;

    const $ = id => document.getElementById(id);

    if (diff <= 0) {
        ['days', 'hours', 'minutes', 'seconds'].forEach(k => $(k).textContent = '0');
        return;
    }

    $('days').textContent    = Math.floor(diff / 86400000);
    $('hours').textContent   = Math.floor((diff % 86400000) / 3600000);
    $('minutes').textContent = Math.floor((diff % 3600000) / 60000);
    $('seconds').textContent = Math.floor((diff % 60000) / 1000);
}
updateCountdown();
setInterval(updateCountdown, 1000);

/* ============================================
   SMOOTH SCROLL (fallback)
   ============================================ */
document.querySelectorAll('a[href^="#"]').forEach(a => {
    a.addEventListener('click', e => {
        const href = a.getAttribute('href');
        if (!href || href === '#') return;
        const target = document.querySelector(href);
        if (target) {
            e.preventDefault();
            target.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
    });
});

/* ============================================
   BOLLICINE SFONDO (solo desktop)
   ============================================ */
(function initBubbles() {
    if (window.innerWidth < 768) return;
    const bg = document.querySelector('.bubbles-bg');
    if (!bg) return;
    const count = 6;
    for (let i = 0; i < count; i++) {
        const b = document.createElement('span');
        b.className = 'bubble';
        const size = 10 + Math.random() * 16;
        b.style.width  = size + 'px';
        b.style.height = size + 'px';
        b.style.left   = (Math.random() * 100) + '%';
        b.style.animationDuration = (35 + Math.random() * 25) + 's';
        b.style.animationDelay    = (Math.random() * 20) + 's';
        bg.appendChild(b);
    }
})();

/* ============================================
   PLACEHOLDER GALLERY (30 slot)
   ============================================ */
(function initGalleryPlaceholders() {
    const grid = document.getElementById('galleryGrid');
    if (!grid) return;
    const count = 30;
    for (let i = 1; i <= count; i++) {
        const item = document.createElement('div');
        item.className = 'gallery-item';
        item.textContent = String(i).padStart(2, '0');
        grid.appendChild(item);
    }
})();
