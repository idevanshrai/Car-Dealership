document.addEventListener('DOMContentLoaded', function() {
    // Mobile menu toggle
    const mobileMenuBtn = document.querySelector('.mobile-menu-btn');
    const nav = document.querySelector('nav');
    
    mobileMenuBtn.addEventListener('click', function() {
        nav.classList.toggle('active');
        this.querySelector('i').classList.toggle('fa-times');
        this.querySelector('i').classList.toggle('fa-bars');
    });
    
    // Smooth scrolling for anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href');
            if (targetId === '#') return;
            
            const targetElement = document.querySelector(targetId);
            if (targetElement) {
                // Close mobile menu if open
                nav.classList.remove('active');
                mobileMenuBtn.querySelector('i').classList.remove('fa-times');
                mobileMenuBtn.querySelector('i').classList.add('fa-bars');
                
                // Calculate scroll position
                const headerHeight = document.querySelector('header').offsetHeight;
                const targetPosition = targetElement.getBoundingClientRect().top + window.pageYOffset - headerHeight;
                
                window.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth'
                });
            }
        });
    });
    
    // Newsletter form submission
    const newsletterForm = document.getElementById('newsletter-form');
    if (newsletterForm) {
        newsletterForm.addEventListener('submit', function(e) {
            e.preventDefault();
            const emailInput = this.querySelector('input[type="email"]');
            const email = emailInput.value.trim();
            
            if (email) {
                // In a real app, you would send this to your server
                fetch('/api/subscribe', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({ email: email }),
                })
                .then(response => response.json())
                .then(data => {
                    alert('Thank you for subscribing! You\'ll receive our best deals soon.');
                    emailInput.value = '';
                })
                .catch(error => {
                    console.error('Error:', error);
                    alert('Subscription failed. Please try again later.');
                });
            }
        });
    }
    
    // View details button click handler
    document.querySelectorAll('.view-details').forEach(button => {
        button.addEventListener('click', function() {
            const carCard = this.closest('.car-card');
            const carName = carCard.querySelector('h3').textContent;
            alert(`Details for ${carName} would be shown here. In a real app, this would redirect to a detailed car page.`);
        });
    });
    
    // Sell now button click handler
    const sellNowBtn = document.querySelector('.sell-now');
    if (sellNowBtn) {
        sellNowBtn.addEventListener('click', function() {
            alert('In a real app, this would redirect to the car selling form page.');
        });
    }
    
    // Login/Register button click handlers
    document.querySelector('.login-btn')?.addEventListener('click', function() {
        alert('Login modal would appear here.');
    });
    
    document.querySelector('.register-btn')?.addEventListener('click', function() {
        alert('Registration modal would appear here.');
    });
    
    // View all inventory button
    document.querySelector('.view-all')?.addEventListener('click', function() {
        alert('This would show all available inventory in a real app.');
    });
    
    // Search button click handler
    document.querySelector('.search-btn')?.addEventListener('click', function() {
        const searchInput = document.querySelector('.search-bar input');
        const makeSelect = document.querySelector('.search-bar select:first-of-type');
        const priceSelect = document.querySelector('.search-bar select:last-of-type');
        
        const searchTerm = searchInput.value.trim();
        const make = makeSelect.value;
        const price = priceSelect.value;
        
        alert(`Searching for:\nTerm: ${searchTerm || 'Any'}\nMake: ${make || 'Any'}\nPrice: ${price || 'Any'}\n\nIn a real app, this would filter the inventory.`);
    });
    
    // Sticky header on scroll
    const header = document.querySelector('header');
    let lastScroll = 0;
    
    window.addEventListener('scroll', function() {
        const currentScroll = window.pageYOffset;
        
        if (currentScroll <= 0) {
            header.classList.remove('scroll-up');
            return;
        }
        
        if (currentScroll > lastScroll && !header.classList.contains('scroll-down')) {
            header.classList.remove('scroll-up');
            header.classList.add('scroll-down');
        } else if (currentScroll < lastScroll && header.classList.contains('scroll-down')) {
            header.classList.remove('scroll-down');
            header.classList.add('scroll-up');
        }
        
        lastScroll = currentScroll;
    });
});