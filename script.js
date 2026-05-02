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
   SISTEMA BOLLE — effetto calice di spumante
   Bolle pre-distribuite su tutta la pagina/sezione
   ============================================ */
(function initBubbles() {
    const isMobile = window.innerWidth < 768;

    /**
     * Crea una bolla con posizione casuale orizzontale + verticale.
     * Il trucco: animationDelay negativo random fa partire l'animazione
     * "a metà corsa", quindi al primo frame le bolle sono già sparse.
     */
    function createBubble(opts = {}) {
        const b = document.createElement('span');
        b.className = 'bubble';

        const sizeMin  = opts.sizeMin  ?? 5;
        const sizeMax  = opts.sizeMax  ?? 14;
        const durMin   = opts.durMin   ?? 8;
        const durMax   = opts.durMax   ?? 18;

        // Dimensione random
        const size = sizeMin + Math.random() * (sizeMax - sizeMin);
        b.style.width  = size + 'px';
        b.style.height = size + 'px';

        // Posizione X random su tutta la larghezza
        b.style.left   = (Math.random() * 100) + '%';

        // Posizione Y di partenza: random tra il fondo e poco sopra
        // (così alcune bolle nascono dal basso, altre già a mezza altezza)
        b.style.bottom = (Math.random() * 30 - 10) + '%';

        // Durata random per vario movimento
        const duration = durMin + Math.random() * (durMax - durMin);
        b.style.animationDuration = duration + 's';

        // Delay NEGATIVO random fino a -duration: la bolla parte
        // come se l'animazione fosse iniziata x secondi fa.
        // Questo è ciò che riempie subito la pagina di bolle distribuite.
        b.style.animationDelay = '-' + (Math.random() * duration) + 's';

        return b;
    }

    // Bolle di sfondo globale (fixed, persistono durante lo scroll)
    const bg = document.querySelector('.bubbles-bg');
    if (bg) {
        const bgCount = isMobile ? 35 : 50;
        for (let i = 0; i < bgCount; i++) {
            bg.appendChild(createBubble({
                sizeMin: 5, sizeMax: 14,
                durMin:  isMobile ? 12 : 10,
                durMax:  isMobile ? 24 : 20
            }));
        }
    }

    // Bolle per ogni sezione (assolute, ancorate al contenuto)
    const sectionBubbleCount = isMobile ? 22 : 30;
    document.querySelectorAll('.section-bubbles').forEach(container => {
        for (let i = 0; i < sectionBubbleCount; i++) {
            container.appendChild(createBubble({
                sizeMin: 4, sizeMax: 12,
                durMin:  isMobile ? 10 : 8,
                durMax:  isMobile ? 22 : 18
            }));
        }
    });
})();

/* ============================================
   GALLERY + LIGHTBOX (fit garantito + body lock)
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
                draggable: true,
                onOpen: () => { document.body.classList.add('glightbox-open'); },
                onClose: () => { document.body.classList.remove('glightbox-open'); }
            });
        }
       if (typeof GLightbox !== 'undefined') {
    GLightbox({
        selector: '.ph[data-glightbox]',
        touchNavigation: true,
        loop: true,
        openEffect: 'fade',
        closeEffect: 'fade',
        moreText: '',
        zoomable: false,
        draggable: true,
        onOpen: () => { document.body.classList.add('glightbox-open'); },
        onClose: () => { document.body.classList.remove('glightbox-open'); }
    });
}
    } else {
        for (let i = 1; i <= 30; i++) {
            const item = document.createElement('div');
            item.className = 'gallery-item';
            item.textContent = String(i).padStart(2, '0');
            grid.appendChild(item);
        }
    }
})();
