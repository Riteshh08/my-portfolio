/**
 * PORTFOLIO MAIN SCRIPT
 * ------------------------------------------
 * 1. Theme Management (Dark/Light Mode)
 * 2. Scroll Animations (Reveal on Scroll)
 * 3. Stats Widget (Time, Date, View Counter)
 */

// ==========================================
// 1. THEME MANAGEMENT
// ==========================================

const themeToggle = document.getElementById('theme-toggle');
const themeIcon = themeToggle.querySelector('i');
const body = document.body;

/**
 * Initializes the theme from localStorage.
 */
function initTheme() {
    const savedTheme = localStorage.getItem('theme');
    if (savedTheme === 'dark') {
        body.classList.add('dark-mode');
        themeIcon.classList.replace('fa-moon', 'fa-sun');
    }
}

/**
 * Toggles between Dark and Light mode.
 */
themeToggle.addEventListener('click', () => {
    body.classList.toggle('dark-mode');
    
    if (body.classList.contains('dark-mode')) {
        themeIcon.classList.replace('fa-moon', 'fa-sun');
        localStorage.setItem('theme', 'dark');
    } else {
        themeIcon.classList.replace('fa-sun', 'fa-moon');
        localStorage.setItem('theme', 'light');
    }
});

initTheme();

// ==========================================
// 2. SCROLL ANIMATIONS (Reveal on Scroll)
// ==========================================

/**
 * Adds 'active' class to elements with 'reveal' class when they enter the viewport.
 */
function revealOnScroll() {
    const reveals = document.querySelectorAll(".reveal");
    const windowHeight = window.innerHeight;
    const revealPoint = 150; // Pixels from bottom before triggering

    reveals.forEach(element => {
        const elementTop = element.getBoundingClientRect().top;
        
        if (elementTop < windowHeight - revealPoint) {
            element.classList.add("active");
        }
    });
}

// Add scroll event listener
window.addEventListener("scroll", revealOnScroll);

// ==========================================
// 3. STATS WIDGET LOGIC
// ==========================================

/**
 * Updates the time, date, and view count in the bottom-right widget.
 */
function updateStats() {
    const timeElement = document.getElementById('current-time');
    const dateElement = document.getElementById('current-date');
    const viewElement = document.getElementById('view-count');

    // --- Update Time ---
    const updateTime = () => {
        const now = new Date();
        timeElement.textContent = now.toLocaleTimeString([], { 
            hour: '2-digit', 
            minute: '2-digit', 
            second: '2-digit' 
        });
    };
    updateTime();
    setInterval(updateTime, 1000); // Update every second

    // --- Update Date ---
    const now = new Date();
    const dateOptions = { month: 'short', day: 'numeric', year: 'numeric' };
    dateElement.textContent = now.toLocaleDateString('en-US', dateOptions);

    // --- View Counter Logic (Using LocalStorage) ---
    let views = localStorage.getItem('portfolio_views');
    
    if (!views) {
        views = 1;
        localStorage.setItem('portfolio_views', views);
        sessionStorage.setItem('view_counted', 'true');
    } else {
        // Only increment if it's a new session
        if (!sessionStorage.getItem('view_counted')) {
            views = parseInt(views) + 1;
            localStorage.setItem('portfolio_views', views);
            sessionStorage.setItem('view_counted', 'true');
        }
    }
    
    viewElement.textContent = views;
}

// ==========================================
// 4. MOBILE MENU TOGGLE
// ==========================================

const menuToggle = document.getElementById('menu-toggle');
const navLinks = document.querySelector('.nav-links');
const menuIcon = menuToggle.querySelector('i');

/**
 * Toggles the mobile navigation menu.
 */
menuToggle.addEventListener('click', () => {
    navLinks.classList.toggle('active');
    body.classList.toggle('menu-open'); // Prevent background scroll
    
    // Toggle between bars and xmark icon
    if (navLinks.classList.contains('active')) {
        menuIcon.classList.replace('fa-bars', 'fa-xmark');
    } else {
        menuIcon.classList.replace('fa-xmark', 'fa-bars');
        body.classList.remove('menu-open');
    }
});

/**
 * Closes the mobile menu when a link is clicked.
 */
document.querySelectorAll('.nav-links a').forEach(link => {
    link.addEventListener('click', () => {
        navLinks.classList.remove('active');
        body.classList.remove('menu-open');
        menuIcon.classList.replace('fa-xmark', 'fa-bars');
    });
});

// Initialize all stats
updateStats();
// Run reveal check once on load in case some elements are already visible
revealOnScroll();

