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
   SMOOTH SCROLL
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
   SISTEMA BOLLE UNIFICATO
   - Background globale (fixed)
   - Bolle per ogni sezione (absolute)
   ============================================ */
(function initBubbles() {
    const isMobile = window.innerWidth < 768;

    // Genera bolla singola con parametri random
    function createBubble(opts = {}) {
        const b = document.createElement('span');
        b.className = 'bubble';
        const sizeMin = opts.sizeMin ?? 6;
        const sizeMax = opts.sizeMax ?? 18;
        const durMin  = opts.durMin  ?? 22;
        const durMax  = opts.durMax  ?? 55;

        const size = sizeMin + Math.random() * (sizeMax - sizeMin);
        b.style.width  = size + 'px';
        b.style.height = size + 'px';
        b.style.left   = (Math.random() * 100) + '%';
        b.style.animationDuration = (durMin + Math.random() * (durMax - durMin)) + 's';
        b.style.animationDelay    = (Math.random() * 25) + 's';
        return b;
    }

    // Background globale (fixed, tutta la pagina)
    const bg = document.querySelector('.bubbles-bg');
    if (bg) {
        const bgCount = isMobile ? 5 : 10;
        for (let i = 0; i < bgCount; i++) {
            bg.appendChild(createBubble({ sizeMin: 8, sizeMax: 18, durMin: isMobile ? 40 : 25, durMax: isMobile ? 70 : 55 }));
        }
    }

    // Bolle per ciascuna sezione / hero / footer
    const sectionBubbleCount = isMobile ? 3 : 6;
    document.querySelectorAll('.section-bubbles').forEach(container => {
        for (let i = 0; i < sectionBubbleCount; i++) {
            container.appendChild(createBubble({ sizeMin: 6, sizeMax: 16, durMin: isMobile ? 35 : 22, durMax: isMobile ? 60 : 48 }));
        }
    });
})();

/* ============================================
   GALLERY + LIGHTBOX
   ============================================ */
(function initGallery() {
    const grid = document.getElementById('galleryGrid');
    if (!grid) return;

    const photos = (window.GALLERY && window.GALLERY.length) ? window.GALLERY : null;

    if (photos) {
        photos.forEach((p, i) => {
            const a = document.createElement('a');
            a.className = 'gallery-item';
            a.href = p.full;
            a.setAttribute('data-glightbox', 'gallery');
            a.setAttribute('data-gallery', 'wedding');
            const img = document.createElement('img');
            img.src = p.thumb;
            img.alt = p.alt || ('Foto ' + String(i + 1).padStart(2, '0'));
            img.loading = 'lazy';
            a.appendChild(img);
            grid.appendChild(a);
        });

        if (typeof GLightbox !== 'undefined') {
            GLightbox({
                selector: '.gallery-item[data-glightbox]',
                touchNavigation: true,
                loop: true,
                openEffect: 'fade',
                closeEffect: 'fade',
                moreText: '',
                zoomable: false,
                draggable: true
            });
        }
    } else {
        // Placeholder numerati
        for (let i = 1; i <= 30; i++) {
            const item = document.createElement('div');
            item.className = 'gallery-item';
            item.textContent = String(i).padStart(2, '0');
            grid.appendChild(item);
        }
    }
})();
