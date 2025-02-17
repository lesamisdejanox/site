//##############################################################################################################################################
//##############################################################################################################################################
//update path based on the language
// Update path based on the language
document.addEventListener("DOMContentLoaded", () => {
    const langSwitchLinks = document.querySelectorAll(".lang-switch a");

    // Handle language switch links
    langSwitchLinks.forEach(link => {
        link.addEventListener("click", (e) => {
            e.preventDefault();
            const url = new URL(link.href);
            const lang = url.pathname.includes('/en/') ? 'en' : 'fr'; // Determine language from URL
            // Save the selected language to localStorage
            localStorage.setItem("preferredLang", lang);
            // Redirect to the clicked link
            window.location.href = link.href;
        });
    });

    // Ensure correct language is loaded on initial page load
    const preferredLang = localStorage.getItem("preferredLang");
    const isOnEnglishPage = window.location.pathname.includes('/en/');
    const isOnFrenchPage = window.location.pathname.includes('/fr/');

    // Extract the current page's path after the language folder
    const currentPath = window.location.pathname;
    const langPrefix = currentPath.includes('/en/') ? '/en/' : '/fr/';
    const pathAfterLang = currentPath.substring(currentPath.indexOf(langPrefix) + langPrefix.length);

    // Get the part of the path before /en/ or /fr/
    const baseUrl = currentPath.substring(0, currentPath.indexOf(langPrefix));

    if (preferredLang) {
        // Only apply redirection if it's not a browser history navigation
        if (window.performance.navigation.type !== 2) { // 2 = Back/forward navigation
            if (preferredLang === 'en' && !currentPath.includes('/en/')) {
                const targetUrl = `${baseUrl}/fr/${pathAfterLang}${window.location.search}`;
                window.location.href = targetUrl;
                localStorage.setItem("preferredLang",'fr');
            } else if (preferredLang === 'fr' && !currentPath.includes('/fr/')) {
                const targetUrl = `${baseUrl}/en/${pathAfterLang}${window.location.search}`;
                window.location.href = targetUrl;
                localStorage.setItem("preferredLang",'en');

            }
        }
    }

    // Update preferred language on browser history navigation (back/forward)
    window.addEventListener("popstate", () => {
        const currentPath = window.location.pathname;
        const isCurrentlyEnglish = currentPath.includes('/en/');
        const isCurrentlyFrench = currentPath.includes('/fr/');

        // Update the language preference based on the URL when navigating through history
        if (isCurrentlyEnglish) {
            localStorage.setItem("preferredLang", 'en');
        } else if (isCurrentlyFrench) {
            localStorage.setItem("preferredLang", 'fr');
        }

        console.log("Language updated based on history navigation");
    });
});

//##############################################################################################################################################
//##############################################################################################################################################
//handling the burgle click
let wind=1060

document.addEventListener('DOMContentLoaded', () => {
    const burger = document.getElementById('burger');
    const navLinks = document.querySelector('.nav');
    const page = document.querySelector('body'); // Target the whole body or specific content sections

    burger.addEventListener('click', () => {
        navLinks.classList.toggle('show');
        burger.classList.toggle('open');
        page.classList.toggle('hide-body-content');
    });
});
// Function to handle adding/removing the "close" class based on screen width
function handleNavLinks() {
    const burger = document.getElementById('burger');
    const navLinks = document.querySelector('.nav');
    const page = document.querySelector('body'); // Target the whole body or specific content sections
    if(burger.classList.contains("open")){
    if (window.innerWidth > wind) {
        navLinks.classList.remove('show');
        
        page.classList.remove("hide-body-content");
    } else {
        navLinks.classList.add('show');
       
        page.classList.add("hide-body-content");
    }}
}

// Run the function on page load
handleNavLinks();

// Add an event listener for window resize
window.addEventListener('resize', handleNavLinks);

//##############################################################################################################################################
//##############################################################################################################################################
// header scroll animation

document.addEventListener("DOMContentLoaded", () => {
    const header = document.querySelector(".header");
     
    window.addEventListener("scroll", () => {
     
        if (window.scrollY > 50) {  // If scrolled down more than 50px
            header.classList.add("shrink");
        } else {
            header.classList.remove("shrink");
        }
    });
});

