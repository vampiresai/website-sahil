// Loading Screen - Hide after 2.5 seconds
document.addEventListener('DOMContentLoaded', () => {
    const loadingScreen = document.getElementById('loading-screen');
    const mainContent = document.getElementById('main-content');
    
    // Hide loading screen and show main content after 2.5 seconds
    setTimeout(() => {
        if (loadingScreen) {
            loadingScreen.classList.add('fade-out');
        }
        if (mainContent) {
            mainContent.classList.add('show');
        }
        
        // Remove loading screen from DOM after fade animation
        setTimeout(() => {
            if (loadingScreen) {
                loadingScreen.style.display = 'none';
            }
        }, 800);
    }, 2500);
});

// Smooth scroll for navigation links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            // Calculate offset for fixed navbar
            const navbarHeight = document.querySelector('.navbar')?.offsetHeight || 0;
            const targetPosition = target.offsetTop - navbarHeight;
            
            window.scrollTo({
                top: targetPosition,
                behavior: 'smooth'
            });
        }
    });
});

// Navbar background on scroll - solid at top, transparent glass when scrolling
window.addEventListener('scroll', () => {
    const navbar = document.querySelector('.navbar');
    if (navbar) {
        if (window.scrollY > 50) {
            navbar.classList.add('scrolled');
            navbar.style.boxShadow = '0 4px 20px rgba(0, 0, 0, 0.5)';
        } else {
            navbar.classList.remove('scrolled');
            navbar.style.boxShadow = 'none';
        }
    }
});

// Intersection Observer for fade-in animations - visible and smooth
const observerOptions = {
    threshold: 0.1, // Trigger when 10% visible
    rootMargin: '0px 0px 50px 0px' // Start animating 50px before element enters viewport
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            // Add a class to trigger animation instead of directly setting styles
            entry.target.classList.add('animate-in');
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0) scale(1)';
        }
    });
}, observerOptions);

// Observe all glass cards with visible, smooth animation (excluding skill tags)
document.querySelectorAll('.glass-card:not(.skill-tag)').forEach((card, index) => {
    // Set initial hidden state for all cards
    card.style.opacity = '0';
    card.style.transform = 'translateY(30px) scale(0.95)'; // More visible movement
    
    // Faster animation for contact card
    if (card.classList.contains('contact-card')) {
        card.style.transition = `opacity 0.5s cubic-bezier(0.25, 0.46, 0.45, 0.94), transform 0.5s cubic-bezier(0.25, 0.46, 0.45, 0.94)`;
    } else {
        // Slower transition: 0.7s so animation is visible, with staggered delay
        card.style.transition = `opacity 0.7s cubic-bezier(0.25, 0.46, 0.45, 0.94) ${index * 0.1}s, transform 0.7s cubic-bezier(0.25, 0.46, 0.45, 0.94) ${index * 0.1}s`;
    }
    observer.observe(card);
});

// Observe skill tags separately with visible animation on scroll
const skillObserver = new IntersectionObserver((entries) => {
    entries.forEach((entry, index) => {
        if (entry.isIntersecting) {
            // Animate with slight delay for visible effect
            setTimeout(() => {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0) scale(1)';
            }, index * 30); // Stagger delay of 30ms per skill for visible cascade
        }
    });
}, {
    threshold: 0.1, // Trigger when 10% visible
    rootMargin: '0px 0px 50px 0px' // Start 50px before entering viewport
});

// Set up skill tags for visible scroll animation
document.querySelectorAll('.skill-tag').forEach((skillTag, index) => {
    skillTag.style.opacity = '0';
    skillTag.style.transform = 'translateY(20px) scale(0.95)';
    // Slower transition: 0.5s so animation is visible, with staggered delay
    skillTag.style.transition = `opacity 0.5s cubic-bezier(0.25, 0.46, 0.45, 0.94) ${index * 0.03}s, transform 0.5s cubic-bezier(0.25, 0.46, 0.45, 0.94) ${index * 0.03}s`;
    skillObserver.observe(skillTag);
});

// Add floating animation to achievement icons
document.querySelectorAll('.achievement-icon').forEach(icon => {
    icon.style.animation = 'float 3s ease-in-out infinite';
});

// Add floating animation
const style = document.createElement('style');
style.textContent = `
    @keyframes float {
        0%, 100% {
            transform: translateY(0px);
        }
        50% {
            transform: translateY(-10px);
        }
    }
`;
document.head.appendChild(style);

// Remove parallax effect that causes glitching - hero section stays fixed

// Add hover sound effect (optional - can be removed if not needed)
document.querySelectorAll('.glass-card').forEach(card => {
    card.addEventListener('mouseenter', function() {
        this.style.transition = 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)';
    });
});

// Active navigation link highlighting
const sections = document.querySelectorAll('.section');
const navLinks = document.querySelectorAll('.nav-menu a');

window.addEventListener('scroll', () => {
    let current = '';
    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.clientHeight;
        if (window.pageYOffset >= sectionTop - 200) {
            current = section.getAttribute('id');
        }
    });

    navLinks.forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href') === `#${current}`) {
            link.classList.add('active');
        }
    });
});

// Skill Modal Functionality
const skillModal = document.getElementById('skillModal');
const skillModalTitle = document.getElementById('skillModalTitle');
const skillModalDescription = document.getElementById('skillModalDescription');
const skillModalClose = document.querySelector('.skill-modal-close');

// Add click event to all skill tags
document.querySelectorAll('.skill-tag[data-skill]').forEach(skillTag => {
    skillTag.addEventListener('click', function() {
        const skillName = this.getAttribute('data-skill');
        const skillDescription = this.getAttribute('data-description');
        
        if (skillName && skillDescription) {
            skillModalTitle.textContent = skillName;
            skillModalDescription.textContent = skillDescription;
            skillModal.style.display = 'block';
            document.body.style.overflow = 'hidden';
        }
    });
});

// Close modal when clicking the X
if (skillModalClose) {
    skillModalClose.addEventListener('click', function() {
        skillModal.style.display = 'none';
        document.body.style.overflow = 'auto';
    });
}

// Close modal when clicking outside of it
window.addEventListener('click', function(event) {
    if (event.target === skillModal) {
        skillModal.style.display = 'none';
        document.body.style.overflow = 'auto';
    }
});

// Close modal with Escape key
document.addEventListener('keydown', function(event) {
    if (event.key === 'Escape' && skillModal.style.display === 'block') {
        skillModal.style.display = 'none';
        document.body.style.overflow = 'auto';
    }
});

// Statistics Counter Animation
function animateCounter(element) {
    const target = parseInt(element.getAttribute('data-target'));
    const duration = 2000; // 2 seconds
    const increment = target / (duration / 16); // 60fps
    let current = 0;
    
    const updateCounter = () => {
        current += increment;
        if (current < target) {
            element.textContent = Math.floor(current);
            requestAnimationFrame(updateCounter);
        } else {
            element.textContent = target;
        }
    };
    
    updateCounter();
}

// Observe statistics section for counter animation
const statsObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            const statNumbers = entry.target.querySelectorAll('.stat-number');
            statNumbers.forEach(stat => {
                if (!stat.classList.contains('animated')) {
                    stat.classList.add('animated');
                    animateCounter(stat);
                }
            });
        }
    });
}, {
    threshold: 0.5
});

const statisticsSection = document.querySelector('.statistics-section');
if (statisticsSection) {
    statsObserver.observe(statisticsSection);
}

// Back to Top Button
const backToTopButton = document.getElementById('backToTop');

window.addEventListener('scroll', () => {
    if (window.pageYOffset > 300) {
        backToTopButton.classList.add('show');
    } else {
        backToTopButton.classList.remove('show');
    }
});

if (backToTopButton) {
    backToTopButton.addEventListener('click', () => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });
}


// Download CV Button - the download attribute in the link should handle it
// But we can add a small enhancement to ensure it works
document.querySelectorAll('.download-cv').forEach(button => {
    button.addEventListener('click', function(e) {
        // Let the browser handle the download naturally
        // The download attribute in the HTML will force download
    });
});

// Theme Toggle Functionality
document.addEventListener('DOMContentLoaded', () => {
    const themeToggle = document.getElementById('themeToggle');
    const htmlElement = document.documentElement;

    if (themeToggle) {
        // Check for saved theme preference or default to dark mode
        const currentTheme = localStorage.getItem('theme') || 'dark';
        htmlElement.setAttribute('data-theme', currentTheme);
        if (currentTheme === 'light') {
            themeToggle.checked = true;
        }

        // Listen for toggle changes
        themeToggle.addEventListener('change', function() {
            if (this.checked) {
                htmlElement.setAttribute('data-theme', 'light');
                localStorage.setItem('theme', 'light');
            } else {
                htmlElement.setAttribute('data-theme', 'dark');
                localStorage.setItem('theme', 'dark');
            }
        });
    }

    // Mobile Menu Toggle
    const mobileMenuToggle = document.querySelector('.mobile-menu-toggle');
    const navMenu = document.querySelector('.nav-menu');
    const body = document.body;

    if (mobileMenuToggle && navMenu) {
        mobileMenuToggle.addEventListener('click', function() {
            this.classList.toggle('active');
            navMenu.classList.toggle('active');
            body.classList.toggle('menu-open');
        });

        // Close menu when clicking on a link
        navMenu.querySelectorAll('a').forEach(link => {
            link.addEventListener('click', () => {
                mobileMenuToggle.classList.remove('active');
                navMenu.classList.remove('active');
                body.classList.remove('menu-open');
            });
        });

        // Close menu when clicking outside
        document.addEventListener('click', function(event) {
            const isClickInsideNav = navMenu.contains(event.target);
            const isClickOnToggle = mobileMenuToggle.contains(event.target);
            
            if (!isClickInsideNav && !isClickOnToggle && navMenu.classList.contains('active')) {
                mobileMenuToggle.classList.remove('active');
                navMenu.classList.remove('active');
                body.classList.remove('menu-open');
            }
        });
    }
});



