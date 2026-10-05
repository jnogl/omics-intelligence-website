const smallScreenQuery = window.matchMedia('(max-width: 480px)');
const mediumScreenQuery = window.matchMedia('(max-width: 1024px)');

function handleScreenChange() {
    const blogArticleCards = document.querySelectorAll('.blog-article-card');

    blogArticleCards.forEach(card => {
        if (smallScreenQuery.matches) {
            // Screen <= 480px
            card.classList.remove("col-6", "col-4");
            card.classList.add("col-12");
        } else if (mediumScreenQuery.matches) {
            // Screen > 480px and <= 1024px
            card.classList.remove("col-12", "col-4");
            card.classList.add("col-6");
        } else {
            // Screen > 1024px
            card.classList.remove("col-12", "col-6");
            card.classList.add("col-4");
        }
    });
}

// Attach event listeners
smallScreenQuery.addEventListener("change", handleScreenChange);
mediumScreenQuery.addEventListener("change", handleScreenChange);

// Initial check on page load
document.addEventListener('DOMContentLoaded', handleScreenChange);