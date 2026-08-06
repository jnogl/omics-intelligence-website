/**
 * Toggles the 'is-dark' class on target elements when a reference element 
 * enters a specified vertical viewport threshold range.
 */
class DarkModeToggle {
  /**
   * @param {Object} config - Configuration object.
   * @param {string|HTMLElement} config.trigger - Selector or element acting as the position trigger.
   * @param {string|NodeList|HTMLElement[]} config.targets - Selector(s) or elements to toggle the class on.
   * @param {number} [config.thresholdUp=0.10] - Upper boundary ratio of window height (e.g. 0.10 = top 10% of window).
   * @param {number} [config.thresholdDown=-0.75] - Lower boundary ratio of window height (e.g. -0.75 = 75% above window top).
   * @param {string} [config.className='is-dark'] - Class to toggle (defaults to 'is-dark').
   */
  constructor({
    trigger,
    targets,
    thresholdUp = 0.10,
    thresholdDown = -0.75,
    className = 'is-dark'
  }) {
    this.triggerEl = typeof trigger === 'string' ? document.querySelector(trigger) : trigger;
    
    // Resolve target elements cleanly from selectors or nodes
    if (typeof targets === 'string') {
      this.targetEls = Array.from(document.querySelectorAll(targets));
    } else if (targets instanceof NodeList || Array.isArray(targets)) {
      this.targetEls = Array.from(targets);
    } else if (targets instanceof HTMLElement) {
      this.targetEls = [targets];
    } else {
      this.targetEls = [];
    }

    this.className = className;
    this.thresholdUp = thresholdUp;
    this.thresholdDown = thresholdDown;
    this.ticking = false;

    if (this.triggerEl && this.targetEls.length > 0) {
      this.init();
    }
  }

  init() {
    this.onScroll = this.onScroll.bind(this);
    window.addEventListener('scroll', this.onScroll, { passive: true });
    
    // Initial evaluation on load
    this.checkThreshold();
  }

  onScroll() {
    if (!this.ticking) {
      window.requestAnimationFrame(() => {
        this.checkThreshold();
        this.ticking = false;
      });
      this.ticking = true;
    }
  }

  checkThreshold() {
    const rect = this.triggerEl.getBoundingClientRect();
    const windowHeight = window.innerHeight;

    const upperBound = windowHeight * this.thresholdUp;
    const lowerBound = windowHeight * this.thresholdDown;

    // Check if within specified viewport boundaries
    const isDark = rect.top < upperBound && rect.top > lowerBound;

    // Toggle the 'is-dark' class across all target elements
    for (let i = 0; i < this.targetEls.length; i++) {
      this.targetEls[i].classList.toggle(this.className, isDark);
    }
  }

  destroy() {
    window.removeEventListener('scroll', this.onScroll);
  }
}