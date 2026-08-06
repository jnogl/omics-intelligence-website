/**
 * Generic Parallax & Scroll-Zoom Controller
 * Applies responsive scale and translation effects to target elements based on scroll progress.
 */
class ParallaxController {
  /**
   * @param {string|NodeList|HTMLElement[]} selector - CSS selector or elements to animate.
   * @param {Object} [options] - Configuration options.
   * @param {number} [options.zoomAmount=0.35] - Max zoom scale added (0.35 = up to 1.35x).
   * @param {number} [options.translateRange=10] - Total translation range in `em` units.
   * @param {number} [options.disableTranslationWidth=736] - Viewport width threshold (px) below which 2D translation is disabled.
   */
  constructor(selector, options = {}) {
    this.elements = typeof selector === 'string' 
      ? Array.from(document.querySelectorAll(selector))
      : Array.from(selector);

    if (!this.elements.length) return;

    this.options = {
      zoomAmount: 0.35,
      translateRange: 10,
      disableTranslationWidth: 736,
      ...options
    };

    this.ticking = false;
    this.isSmallScreen = false;

    this.init();
  }

  init() {
    this.checkViewport();
    
    // Resize Listener: Keeps screen size check up to date dynamically
    window.addEventListener('resize', () => this.checkViewport(), { passive: true });

    // Scroll Listener: Throttled via requestAnimationFrame
    window.addEventListener('scroll', () => this.onScroll(), { passive: true });

    // Initial positioning calculation on page load
    this.update();
  }

  checkViewport() {
    this.isSmallScreen = window.innerWidth < this.options.disableTranslationWidth;
  }

  onScroll() {
    if (!this.ticking) {
      window.requestAnimationFrame(() => {
        this.update();
        this.ticking = false;
      });
      this.ticking = true;
    }
  }

  update() {
    const windowHeight = window.innerHeight;
    const { zoomAmount, translateRange } = this.options;
    const halfRange = translateRange / 2;

    for (let i = 0; i < this.elements.length; i++) {
      const el = this.elements[i];
      const rect = el.getBoundingClientRect();

      // Check if element is currently visible in the viewport
      if (rect.top < windowHeight && rect.bottom > 0) {
        // Calculate scroll progress (0.0 when entering viewport bottom -> 1.0 when leaving viewport top)
        const scrollProgress = (windowHeight - rect.top) / (windowHeight + rect.height);
        
        // Compute zoom scale factor
        const zoomLevel = 1 + (scrollProgress * zoomAmount);

        if (this.isSmallScreen) {
          // Mobile: Only apply scale to avoid layout breakages
          el.style.transform = `scale3d(${zoomLevel}, ${zoomLevel}, 1)`;
        } else {
          // Desktop: Apply both translation (in em) and scale
          const translationX = (scrollProgress * translateRange) - halfRange;
          const translationY = (scrollProgress * translateRange) - halfRange;

          // Note: Hardware-accelerated matrix order (translate3d -> scale3d)
          el.style.transform = `translate3d(${translationX}em, ${translationY}em, 0) scale3d(${zoomLevel}, ${zoomLevel}, 1)`;
        }
      }
    }
  }
}