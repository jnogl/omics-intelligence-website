// Controls scrolling speed
document.addEventListener('DOMContentLoaded', () => {
    // CONFIGURATION OPTIONS
    const scrollSpeed = 1.1;  // Lower value = slower, heavier scrolling (e.g. 0.4 to 0.8)
    const easeFactor = 0.08;  // Lower value = longer, smoother ease-out (e.g. 0.05 to 0.1)

    let targetY = window.scrollY;
    let currentY = window.scrollY;
    let isRunning = false;

    // Intercept mouse wheel clicks to control scroll distance/speed
    window.addEventListener('wheel', (e) => {
        // Prevent default harsh browser jumping
        e.preventDefault();

        // Scale down the scroll delta to reduce speed
        targetY += e.deltaY * scrollSpeed;

        // Clamp scroll target within valid page boundaries
        const maxScroll = document.documentElement.scrollHeight - window.innerHeight;
        targetY = Math.max(0, Math.min(targetY, maxScroll));

        if (!isRunning) {
            isRunning = true;
            requestAnimationFrame(updateSmoothScroll);
        }
    }, { passive: false });

    function updateSmoothScroll() {
        // Lerp formula for acceleration/deceleration ease-out
        const diff = targetY - currentY;
        currentY += diff * easeFactor;

        // Apply the smoothed scroll position to the browser
        window.scrollTo(0, currentY);

        // Keep loop running until movement is imperceptible
        if (Math.abs(diff) > 0.5) {
            requestAnimationFrame(updateSmoothScroll);
        } else {
            isRunning = false;
        }
    }

    // Keep target synchronized if user drags scrollbar directly
    window.addEventListener('scroll', () => {
        if (!isRunning) {
            targetY = window.scrollY;
            currentY = window.scrollY;
        }
    });
});