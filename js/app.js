document.addEventListener('DOMContentLoaded', function () {
    const gallery = document.querySelectorAll('.card');
    const popup = document.querySelector('.popup');
    const popupImg = document.querySelector('.popup-img');
    const closeBtn = document.querySelector('.close-btn');
    const leftBtn = document.querySelector('.left-btn');
    const rightBtn = document.querySelector('.right-btn');
    const downloadBtn = document.querySelector('.download-btn'); // Select the download button

    let currentIndex = 0;

    function openPopup(index) {
        currentIndex = index;
        const imgSrc = gallery[currentIndex].querySelector('.gallery-img').src;
        popup.style.display = 'flex';
        popup.classList.add('show');
        popupImg.classList.remove('loaded');
        setTimeout(() => {
            popupImg.src = imgSrc;
            popupImg.onload = () => {
                popupImg.classList.add('loaded');
            };
        }, 300);
    }

    function closePopup() {
        popup.classList.remove('show');
        setTimeout(() => {
            popup.style.display = 'none';
        }, 300);
    }

    function showPrevImage() {
        currentIndex = (currentIndex > 0) ? currentIndex - 1 : gallery.length - 1;
        openPopup(currentIndex);
    }

    function showNextImage() {
        currentIndex = (currentIndex < gallery.length - 1) ? currentIndex + 1 : 0;
        openPopup(currentIndex);
    }

    function downloadImage() {
        const imgSrc = popupImg.src;
        const link = document.createElement('a');
        link.href = imgSrc;
        link.download = 'image.jpg'; // Default name for the downloaded image
        link.click();
    }

    gallery.forEach((card, index) => {
        card.addEventListener('click', () => openPopup(index));
    });

    closeBtn.addEventListener('click', closePopup);
    leftBtn.addEventListener('click', showPrevImage);
    rightBtn.addEventListener('click', showNextImage);
    downloadBtn.addEventListener('click', downloadImage); // Add event listener for download button

    popup.addEventListener('click', (e) => {
        if (e.target === popup) {
            closePopup();
        }
    });

    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape') {
            closePopup();
        }
        if (e.key === 'ArrowLeft') {
            showPrevImage();
        }
        if (e.key === 'ArrowRight') {
            showNextImage();
        }
    });
});
