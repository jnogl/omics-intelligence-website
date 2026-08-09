document.addEventListener('DOMContentLoaded', () => {
    const transitionDuration = 1500; // 1.5 seconds

    setTimeout(() =>{
        document.body.classList.add('page-loaded');
    }, 500)

    // 2. INTERCEPT LINKS
    document.addEventListener('click', (e) => {
        const link = e.target.closest('a');
        if (!link) return;

        const href = link.getAttribute('href');

        if (
            !href ||
            href.startsWith('#') ||
            href.startsWith('javascript:') ||
            link.target === '_blank' ||
            link.hostname !== window.location.hostname
        ) {
            return;
        }

        e.preventDefault();

        // Trigger closing animation
        document.body.classList.remove('page-loaded');
        document.body.classList.add('page-exiting');

        setTimeout(() => {
            window.location.href = href;
        }, transitionDuration);
    });

    // 3. BACK/FORWARD BUTTON FIX (BFCache)
    window.addEventListener('pageshow', (event) => {
        if (event.persisted) {
            document.body.classList.remove('page-exiting');
            // document.body.classList.add('page-loaded');
        }
    });
});