// Global variables
let currentSlide = 0;
let slideInterval;
let isScrolling = false;

// DOM Elements
const navbar = document.querySelector('.navbar');
const mobileMenuBtn = document.getElementById('mobile-menu-btn');
const mobileNav = document.getElementById('mobile-nav');
const loginModal = document.getElementById('login-modal');
const closeModal = document.getElementById('close-modal');
const modalTitle = document.getElementById('modal-title');
const notification = document.getElementById('notification');
const notificationText = document.getElementById('notification-text');
const scrollProgress = document.querySelector('.scroll-progress');

// Initialize the website
document.addEventListener('DOMContentLoaded', function() {
    initializeHeroSlider();
    initializeScrollAnimations();
    initializeCounters();
    setupEventListeners();
    updateScrollProgress();
});

// Hero Slider Functions
function initializeHeroSlider() {
    const slides = document.querySelectorAll('.hero-slide');
    const indicators = document.querySelectorAll('.slide-indicator');
    
    // Start automatic sliding
    slideInterval = setInterval(nextSlide, 4000);
    
    // Add click listeners to indicators
    indicators.forEach((indicator, index) => {
        indicator.addEventListener('click', () => {
            goToSlide(index);
        });
    });
}

function nextSlide() {
    const slides = document.querySelectorAll('.hero-slide');
    const indicators = document.querySelectorAll('.slide-indicator');
    
    // Remove active class from current slide and indicator
    slides[currentSlide].classList.remove('active');
    indicators[currentSlide].classList.remove('active');
    
    // Move to next slide
    currentSlide = (currentSlide + 1) % slides.length;
    
    // Add active class to new slide and indicator
    slides[currentSlide].classList.add('active');
    indicators[currentSlide].classList.add('active');
}

function goToSlide(index) {
    const slides = document.querySelectorAll('.hero-slide');
    const indicators = document.querySelectorAll('.slide-indicator');
    
    // Remove active class from current slide and indicator
    slides[currentSlide].classList.remove('active');
    indicators[currentSlide].classList.remove('active');
    
    // Set new current slide
    currentSlide = index;
    
    // Add active class to new slide and indicator
    slides[currentSlide].classList.add('active');
    indicators[currentSlide].classList.add('active');
    
    // Reset interval
    clearInterval(slideInterval);
    slideInterval = setInterval(nextSlide, 4000);
}

// Scroll Animations
function initializeScrollAnimations() {
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animate');
            }
        });
    }, observerOptions);

    // Observe elements for animation
    const animateElements = document.querySelectorAll('.workflow-step, .user-type-card, .impact-card, .contact-card, .about-text, .team-card');
    animateElements.forEach(element => {
        observer.observe(element);
    });
}

// Counter Animation
function initializeCounters() {
    const counters = document.querySelectorAll('.stat-number');
    const counterObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                animateCounter(entry.target);
                counterObserver.unobserve(entry.target);
            }
        });
    }, { threshold: 0.5 });

    counters.forEach(counter => {
        counterObserver.observe(counter);
    });
}

function animateCounter(element) {
    const target = parseInt(element.dataset.count);
    let current = 0;
    const increment = target / 50;
    const timer = setInterval(() => {
        current += increment;
        if (current >= target) {
            current = target;
            clearInterval(timer);
        }
        element.textContent = Math.floor(current) + (target > 100 ? 'M' : target === 40 ? '%' : 'K');
    }, 50);
}

// Event Listeners
function setupEventListeners() {
    // Mobile menu toggle
    mobileMenuBtn.addEventListener('click', toggleMobileMenu);

    // Login modal events
    document.getElementById('restaurant-login').addEventListener('click', (e) => {
        e.preventDefault();
        openModal('Restaurant Login');
    });

    document.getElementById('ngo-login').addEventListener('click', (e) => {
        e.preventDefault();
        openModal('NGO Login');
    });

    document.getElementById('mobile-restaurant-login').addEventListener('click', (e) => {
        e.preventDefault();
        openModal('Restaurant Login');
        closeMobileMenu();
    });

    document.getElementById('mobile-ngo-login').addEventListener('click', (e) => {
        e.preventDefault();
        openModal('NGO Login');
        closeMobileMenu();
    });

    // Hero CTA buttons
    document.getElementById('hero-restaurant-btn').addEventListener('click', (e) => {
        e.preventDefault();
        openModal('Restaurant Registration');
    });

    document.getElementById('hero-ngo-btn').addEventListener('click', (e) => {
        e.preventDefault();
        openModal('NGO Registration');
    });

    // Close modal events
    closeModal.addEventListener('click', closeLoginModal);
    window.addEventListener('click', (e) => {
        if (e.target === loginModal) {
            closeLoginModal();
        }
    });

    // Login form submission
    document.getElementById('login-form').addEventListener('submit', handleLogin);

    // Smooth scrolling for navigation links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', handleSmoothScroll);
    });

    // Scroll events
    let scrollTimeout;
    window.addEventListener('scroll', () => {
        if (!isScrolling) {
            handleScroll();
        }
        
        clearTimeout(scrollTimeout);
        scrollTimeout = setTimeout(() => {
            isScrolling = false;
        }, 100);
    });

    // Pause slider on hover
    const heroSection = document.querySelector('.hero');
    heroSection.addEventListener('mouseenter', () => {
        clearInterval(slideInterval);
    });

    heroSection.addEventListener('mouseleave', () => {
        slideInterval = setInterval(nextSlide, 4000);
    });
}

// Mobile Menu Functions
function toggleMobileMenu() {
    mobileNav.classList.toggle('active');
    mobileMenuBtn.textContent = mobileNav.classList.contains('active') ? '✕' : '☰';
}

function closeMobileMenu() {
    mobileNav.classList.remove('active');
    mobileMenuBtn.textContent = '☰';
}

// Modal Functions
function openModal(title) {
    modalTitle.textContent = title;
    loginModal.style.display = 'block';
    document.body.style.overflow = 'hidden';
}

function closeLoginModal() {
    loginModal.style.display = 'none';
    document.body.style.overflow = 'auto';
    document.getElementById('login-form').reset();
}

// Login Handler
function handleLogin(e) {
    e.preventDefault();
    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;
    
    // Simulate login process
    setTimeout(() => {
        showNotification('Login successful! Welcome to PlateSave.');
        closeLoginModal();
    }, 1000);
}

// Notification System
function showNotification(message) {
    notificationText.textContent = message;
    notification.classList.add('show');
    
    setTimeout(() => {
        notification.classList.remove('show');
    }, 3000);
}

// Smooth Scrolling
function handleSmoothScroll(e) {
    e.preventDefault();
    const targetId = this.getAttribute('href');
    const targetElement = document.querySelector(targetId);
    
    if (targetElement) {
        const offsetTop = targetElement.offsetTop - 80; // Account for fixed navbar
        window.scrollTo({
            top: offsetTop,
            behavior: 'smooth'
        });
        
        // Close mobile menu if open
        closeMobileMenu();
    }
}

// Scroll Handler
function handleScroll() {
    isScrolling = true;
    
    // Update navbar appearance
    if (window.scrollY > 50) {
        navbar.classList.add('scrolled');
    } else {
        navbar.classList.remove('scrolled');
    }

    // Update scroll progress
    updateScrollProgress();
}

// Scroll Progress
function updateScrollProgress() {
    const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
    const scrollHeight = document.documentElement.scrollHeight - document.documentElement.clientHeight;
    const progress = (scrollTop / scrollHeight) * 100;
    scrollProgress.style.width = progress + '%';
}

// Utility Functions
function debounce(func, wait) {
    let timeout;
    return function executedFunction(...args) {
        const later = () => {
            clearTimeout(timeout);
            func(...args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    };
}

// Error handling
window.addEventListener('error', function(e) {
    console.error('An error occurred:', e.error);
});

// Performance optimization
if ('IntersectionObserver' in window) {
    // Lazy load images when they come into view
    const imageObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const img = entry.target;
                img.src = img.dataset.src;
                img.classList.remove('lazy');
                imageObserver.unobserve(img);
            }
        });
    });

    document.querySelectorAll('img[data-src]').forEach(img => {
        imageObserver.observe(img);
    });
}

// Service Worker Registration (for future PWA features)
if ('serviceWorker' in navigator) {
    window.addEventListener('load', function() {
        // Service worker would be registered here for offline functionality
        console.log('Service worker support detected');
    });
}