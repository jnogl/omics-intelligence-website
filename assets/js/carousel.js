document.addEventListener('DOMContentLoaded', () => {
const track = document.getElementById('carouselTrack');
const dots = document.querySelectorAll('.dot');
const cards = document.querySelectorAll('.carousel-card');
let currentIndex = 0;
const slideCount = cards.length;
const intervalTime = 8000; // Time in ms (8 seconds)
let slideInterval;

// Function to move to a specific slide
function goToSlide(index) {
    currentIndex = index;
    track.style.transform = `translateX(-${currentIndex * 100}%)`;
    
    // Update active dot
    dots.forEach(dot => dot.classList.remove('active'));
    dots[currentIndex].classList.add('active');
}

// Next slide handler
function nextSlide() {
    const nextIndex = (currentIndex + 1) % slideCount;
    goToSlide(nextIndex);
}

// Start auto slider
function startTimer() {
    slideInterval = setInterval(nextSlide, intervalTime);
}

// Stop auto slider when hovering
function stopTimer() {
    clearInterval(slideInterval);
}

// Dot click events
dots.forEach(dot => {
    dot.addEventListener('click', (e) => {
    const index = parseInt(e.target.getAttribute('data-index'));
    goToSlide(index);
    });
});

// Pause on hover so users can click links comfortably
track.parentElement.addEventListener('mouseenter', stopTimer);
track.parentElement.addEventListener('mouseleave', startTimer);

// Initialize
startTimer();
});