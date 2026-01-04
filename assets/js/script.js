// ==========================================
// VÖLKEL & V-COIL Website JavaScript
// ==========================================

// initial theme loading
function initTheme() {
    const body = document.body;

    // checking for selection of a theme
    const savedTheme = localStorage.getItem('theme');
    if (savedTheme) {

        if (savedTheme === 'dark') {
            body.classList.add('dark-mode');
        }

    } else {
        // no theme selected, check for system preference
        const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;

        if (prefersDark) {
            body.classList.add('dark-mode');
        }

        // saving the preference
        localStorage.setItem('theme', prefersDark ? 'dark' : 'light');
    }
}

// run theme initialization
initTheme();

// Loader
window.addEventListener('load', () => {
    const loader = document.getElementById('loader');
    setTimeout(() => {
        loader.classList.add('hidden');
    }, 1000);
});


// handling button clicks
// getting the theme toggle button
document.addEventListener('DOMContentLoaded', function() {
    const themeToggle = document.getElementById('themeToggle');
    const body = document.body;

    // handle button click
    themeToggle.addEventListener('click', function(){
        // toggle the dark mode class
        body.classList.toggle('dark-mode');

        // checking the current theme
        isDark = body.classList.contains('dark-mode');

        // saving the preference to localStorage
        localStorage.setItem('theme', isDark ? 'dark' : 'light');

        // adding a smooth transition effect
        addSmoothTransition();
    });
});

// adding a smooth transition function
function addSmoothTransition() {
    const body = document.body;

    // adding a temporary transition 
    body.style.transition = 'background-color 0.3s ease, color 0.3s ease';

    // removing the transition after some time
    setTimeout(() => {body.style.transition = '';}, 300);
}


// Mobile Menu Toggle
const menuToggle = document.getElementById('menuToggle');
const navLinks = document.querySelector('.nav-links');

menuToggle.addEventListener('click', () => {
    menuToggle.classList.toggle('active');
    navLinks.classList.toggle('active');
});

// Close mobile menu when clicking on a link
document.querySelectorAll('.nav-links a').forEach(link => {
    link.addEventListener('click', () => {
        menuToggle.classList.remove('active');
        navLinks.classList.remove('active');
    });
});

// Search Modal
const searchToggle = document.getElementById('searchToggle');
const searchModal = document.getElementById('searchModal');
const closeSearch = document.getElementById('closeSearch');
const searchInput = document.getElementById('searchInput');
const searchResults = document.getElementById('searchResults');

// Sample product data for search
const products = [
    { name: 'درج رزوه آزاد - نوع S', category: 'V-COIL', description: 'سیستم درج رزوه با کیفیت بالا' },
    { name: 'درج رزوه خود قفل‌شونده - نوع SL', category: 'V-COIL', description: 'برای کاربردهای تحت ارتعاش' },
    { name: 'قلاویز دستی متری', category: 'VÖLKEL', description: 'استاندارد DIN متری' },
    { name: 'قلاویز ماشینی', category: 'VÖLKEL', description: 'برای ماشین‌آلات CNC' },
    { name: 'پیچ‌تراش گرد', category: 'VÖLKEL', description: 'رزوه‌کاری خارجی' },
    { name: 'ابزار نصب V-COIL', category: 'ابزار', description: 'ابزار نصب و خارج‌سازی' }
];

searchToggle.addEventListener('click', () => {
    searchModal.classList.add('active');
    searchInput.focus();
});

closeSearch.addEventListener('click', () => {
    searchModal.classList.remove('active');
    searchInput.value = '';
    searchResults.innerHTML = '';
});

searchModal.addEventListener('click', (e) => {
    if (e.target === searchModal) {
        searchModal.classList.remove('active');
        searchInput.value = '';
        searchResults.innerHTML = '';
    }
});

searchInput.addEventListener('input', (e) => {
    const query = e.target.value.trim().toLowerCase();
    
    if (query.length < 2) {
        searchResults.innerHTML = '';
        return;
    }
    
    const filtered = products.filter(product => 
        product.name.toLowerCase().includes(query) ||
        product.category.toLowerCase().includes(query) ||
        product.description.toLowerCase().includes(query)
    );
    
    if (filtered.length === 0) {
        searchResults.innerHTML = '<p style="text-align:center; color: var(--text-light); padding: 2rem;">نتیجه‌ای یافت نشد</p>';
        return;
    }
    
    searchResults.innerHTML = filtered.map(product => `
        <div class="search-result-item" onclick="window.location.href='#products'">
            <h4>${product.name}</h4>
            <p>${product.category} - ${product.description}</p>
        </div>
    `).join('');
});

// Active Navigation Link
const sections = document.querySelectorAll('section[id]');
const navLinksAll = document.querySelectorAll('.nav-links a');

window.addEventListener('scroll', () => {
    let current = '';
    
    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.clientHeight;
        if (scrollY >= sectionTop - 200) {
            current = section.getAttribute('id');
        }
    });
    
    navLinksAll.forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href') === `#${current}`) {
            link.classList.add('active');
        }
    });
});

// Animated Counter for Stats
const statNumbers = document.querySelectorAll('.stat-number');
let hasAnimated = false;

const animateCounters = () => {
    statNumbers.forEach(stat => {
        const target = parseInt(stat.getAttribute('data-target'));
        const duration = 2000;
        const increment = target / (duration / 16);
        let current = 0;
        
        const updateCounter = () => {
            current += increment;
            if (current < target) {
                stat.textContent = Math.floor(current);
                requestAnimationFrame(updateCounter);
            } else {
                stat.textContent = target;
            }
        };
        
        updateCounter();
    });
};

const checkStatsVisibility = () => {
    const statsSection = document.querySelector('.stats');
    if (!statsSection || hasAnimated) return;
    
    const rect = statsSection.getBoundingClientRect();
    const isVisible = rect.top < window.innerHeight && rect.bottom >= 0;
    
    if (isVisible) {
        animateCounters();
        hasAnimated = true;
    }
};

window.addEventListener('scroll', checkStatsVisibility);
window.addEventListener('load', checkStatsVisibility);

// Product Filter
const filterButtons = document.querySelectorAll('.filter-btn');
const productCards = document.querySelectorAll('.product-card');

filterButtons.forEach(button => {
    button.addEventListener('click', () => {
        // Remove active class from all buttons
        filterButtons.forEach(btn => btn.classList.remove('active'));
        // Add active class to clicked button
        button.classList.add('active');
        
        const filter = button.getAttribute('data-filter');
        
        productCards.forEach(card => {
            if (filter === 'all') {
                card.style.display = 'block';
                setTimeout(() => {
                    card.style.opacity = '1';
                    card.style.transform = 'scale(1)';
                }, 10);
            } else {
                if (card.getAttribute('data-category') === filter) {
                    card.style.display = 'block';
                    setTimeout(() => {
                        card.style.opacity = '1';
                        card.style.transform = 'scale(1)';
                    }, 10);
                } else {
                    card.style.opacity = '0';
                    card.style.transform = 'scale(0.8)';
                    setTimeout(() => {
                        card.style.display = 'none';
                    }, 300);
                }
            }
        });
    });
});

// Contact Form Handling
const contactForm = document.getElementById('contactForm');

contactForm.addEventListener('submit', (e) => {
    e.preventDefault();
    
    const formData = {
        name: document.getElementById('name').value,
        company: document.getElementById('company').value,
        email: document.getElementById('email').value,
        phone: document.getElementById('phone').value,
        subject: document.getElementById('subject').value,
        message: document.getElementById('message').value
    };
    
    // Here you would normally send the data to a server
    console.log('Form Data:', formData);
    
    // Show success message
    alert('پیام شما با موفقیت ارسال شد. به زودی با شما تماس خواهیم گرفت.');
    
    // Reset form
    contactForm.reset();
});

// Scroll to Top Button
const scrollTopBtn = document.getElementById('scrollTop');

window.addEventListener('scroll', () => {
    if (window.scrollY > 300) {
        scrollTopBtn.classList.add('show');
    } else {
        scrollTopBtn.classList.remove('show');
    }
});

scrollTopBtn.addEventListener('click', () => {
    window.scrollTo({
        top: 0,
        behavior: 'smooth'
    });
});

// Smooth scroll for all anchor links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});

// Add animation on scroll for cards
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -100px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
        }
    });
}, observerOptions);

// Observe all cards
document.querySelectorAll('.product-card, .catalog-card, .why-card, .app-card, .brand-card').forEach(card => {
    card.style.opacity = '0';
    card.style.transform = 'translateY(20px)';
    card.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
    observer.observe(card);
});
