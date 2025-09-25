const sliderImagesContainer = document.getElementById('sliderImages');
const prevBtn = document.getElementById('prevBtn');
const nextBtn = document.getElementById('nextBtn');
const indicatorsContainer = document.getElementById('indicators');
const toggleAutoSlideBtn = document.getElementById('toggleAutoSlide');
const images = sliderImagesContainer.querySelectorAll('img');

let currentIndex = 0;
let autoSlideInterval;
let isSliding = true;

function createIndicators() {
    images.forEach((_, index) => {
        const indicator = document.createElement('div');
        indicator.classList.add('indicator');
        indicator.addEventListener('click', () => {
            currentIndex = index;
            updateSlider();
        });
        indicatorsContainer.appendChild(indicator);
    });
}

function updateSlider() {
    sliderImagesContainer.style.transform = `translateX(-${currentIndex * 100}%)`;

    const indicators = document.querySelectorAll('.indicator');
    indicators.forEach((indicator, index) => {
        if (index === currentIndex) {
            indicator.classList.add('active');
        } else {
            indicator.classList.remove('active');
        }
    });
}

function nextImage() {
    currentIndex = (currentIndex + 1) % images.length;
    updateSlider();
}

function prevImage() {
    currentIndex = (currentIndex - 1 + images.length) % images.length;
    updateSlider();
}

function startSlideshow() {
    isSliding = true;
    toggleAutoSlideBtn.innerHTML = '<i class="fas fa-pause mr-2"></i> Pause Slideshow';
    autoSlideInterval = setInterval(nextImage, 3000);
}

function pauseSlideshow() {
    isSliding = false;
    toggleAutoSlideBtn.innerHTML = '<i class="fas fa-play mr-2"></i> Play Slideshow';
    clearInterval(autoSlideInterval);
}

prevBtn.addEventListener('click', prevImage);
nextBtn.addEventListener('click', nextImage);

toggleAutoSlideBtn.addEventListener('click', () => {
    if (isSliding) {
        pauseSlideshow();
    } else {
        startSlideshow();
    }
});

document.addEventListener('DOMContentLoaded', () => {
    createIndicators();
    updateSlider();
    startSlideshow();
});