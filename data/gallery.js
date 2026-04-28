/* ============================================
   FOTO GALLERY — auto-discovery
   
   COME USARE:
   1. Metti le foto in assets/images/gallery/
   2. Numerale 01.jpg, 02.jpg, 03.jpg, ...
   3. Aggiorna PHOTO_COUNT qui sotto con il numero reale delle tue foto.
      Esempio: se hai 18 foto → PHOTO_COUNT = 18
   4. Se hai PNG invece di JPG, cambia PHOTO_EXT in 'png'
   ============================================ */

const PHOTO_COUNT = 30;                       // ← numero foto in cartella
const PHOTO_FOLDER = 'assets/images/gallery/';
const PHOTO_EXT = 'jpg';                      // 'jpg' o 'png'

window.WEDDING_GALLERY = {
    demoMode: false,
    photos: Array.from({ length: PHOTO_COUNT }, (_, i) => {
        const n = String(i + 1).padStart(2, '0');
        const path = `${PHOTO_FOLDER}${n}.${PHOTO_EXT}`;
        return { thumb: path, full: path, alt: `Foto ${n}` };
    })
};

window.GALLERY = window.WEDDING_GALLERY.photos;
