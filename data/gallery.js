/* ============================================
   FOTO GALLERY
   
   DEMO MODE ATTIVO: per mostrare come funzionerà la gallery
   con lo sfoglio, uso 30 foto demo da picsum.photos.
   
   COME SOSTITUIRE CON LE TUE FOTO:
   1. Metti demoMode: false
   2. Popola l'array photos con i percorsi delle tue foto
      Formato: { thumb: 'path-miniatura', full: 'path-grande', alt: 'descrizione' }
   ============================================ */

window.WEDDING_GALLERY = {
    demoMode: true,
    photos: [
        // Quando avrai le tue foto, metti demoMode: false e popola qui:
        // { thumb: 'assets/images/gallery/thumb/01-thumb.webp', full: 'assets/images/gallery/full/01-full.webp', alt: 'Foto 01' },
    ]
};

// Se demoMode è attivo, genera 30 foto demo da Picsum (seed fissi per stabilità)
if (window.WEDDING_GALLERY.demoMode) {
    const seeds = [
        'love1','love2','love3','love4','love5','love6','love7','love8','love9','love10',
        'love11','love12','love13','love14','love15','love16','love17','love18','love19','love20',
        'love21','love22','love23','love24','love25','love26','love27','love28','love29','love30'
    ];
    window.WEDDING_GALLERY.photos = seeds.map((seed, i) => ({
        thumb: `https://picsum.photos/seed/${seed}/400/400`,
        full:  `https://picsum.photos/seed/${seed}/1600/1200`,
        alt:   `Foto demo ${String(i + 1).padStart(2, '0')}`
    }));
}

// Esporta in formato compatibile con lo script esistente
window.GALLERY = window.WEDDING_GALLERY.photos;
