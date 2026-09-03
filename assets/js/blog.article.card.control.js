const smallScreenQuery = window.matchMedia('max-width: 480px');
const mediumScreenQuery = window.matchMedia('max-width: 980px');

function handleScreenChange() {
    console.log(smallScreenQuery)
    console.log(mediumScreenQuery)
    const blogArticleCard = document.querySelectorAll('.blog-article-card');

    blogArticleCard.forEach(card => {
        if (smallScreenQuery.matches) {
            card.classList.remove("col-6");
            card.classList.remove("col-4");
            card.classList.add("col-12");
            
        } else if (mediumScreenQuery.matches) {
            card.classList.remove("col-12");
            card.classList.remove("col-4");
            card.classList.add("col-6")

        } else {
            card.classList.remove("col-12");
            card.classList.remove("col-6");
            card.classList.add('col-4')
        }
    })
}

smallScreenQuery.addEventListener("change", handleScreenChange)
mediumScreenQuery.addEventListener("change", handleScreenChange)

// Needed for initial assessment of screen size
document.addEventListener('DOMContentLoaded', handleScreenChange);