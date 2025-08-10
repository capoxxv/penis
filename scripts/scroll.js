// Crea il contenitore fisso per le immagini
const imageBlock = document.createElement('div');
imageBlock.id = 'image-block';
document.body.appendChild(imageBlock);

for (let i = 0; i < 10; i++) {
    const img = document.createElement('img');
    img.src = 'assets/peno.jpg';
    imageBlock.appendChild(img);
    const spacer = document.createElement('div');
    spacer.className = 'spacer';
    imageBlock.appendChild(spacer);
}


// Aggiungi uno spacer in fondo per permettere lo scroll
const scrollSpacer = document.createElement('div');
scrollSpacer.style.height = '800vh'; // Puoi regolare questo valore
document.body.appendChild(scrollSpacer);

const images = imageBlock.querySelectorAll('img');
function resizeOnScroll() {
    // Calcola l'indice attivo in base allo scroll
    const scrollY = window.scrollY;
    const vh = window.innerHeight;
    const imageCount = images.length;
    const sectionHeight = (document.body.scrollHeight - vh) / (imageCount - 1);
    let activeIndex = Math.round(scrollY / sectionHeight);

    activeIndex = Math.max(0, Math.min(activeIndex, imageCount - 1));

    // Calcola le altezze proporzionali
    let totalHeightVH = 0;
    const heights = [];
    const realHeightVH = 70; // Altezza reale per l'immagine attiva

    images.forEach((img, i) => {
        if (i === activeIndex) {
            heights.push(realHeightVH);
            totalHeightVH += realHeightVH;
        } else {
            // Calcolo "finto" per le altre immagini, con curva più morbida
            const ratio = Math.abs(i - activeIndex) / (imageCount - 1);
            const curve = Math.pow(ratio, 1.8); // 1.8 rende la curva più morbida vicino all'attiva
            const heightVH = 70 - 40 * Math.min(curve, 1);
            heights.push(heightVH);
            totalHeightVH += heightVH;
        }
    });

    // Normalizza le altezze per sommare a 100vh, lasciando invariata quella attiva
    const sumOther = totalHeightVH - realHeightVH;
    const remainingVH = 100 - realHeightVH;

    images.forEach((img, i) => {
        let normalizedHeight;
        if (i === activeIndex) {
            normalizedHeight = realHeightVH;
        } else {
            normalizedHeight = (heights[i] / sumOther) * remainingVH;
        }
        img.style.height = normalizedHeight + 'vh';
        img.style.width = '100vw';
    });
}

window.addEventListener('scroll', resizeOnScroll);
window.addEventListener('resize', resizeOnScroll);
window.addEventListener('load', resizeOnScroll);