document.addEventListener('DOMContentLoaded', function() {
    console.log('DOM loaded - JavaScript is working!');
    
    // Get elements
    const initialImage = document.getElementById('initial-image');
    const mainContent = document.getElementById('main-content');
    const bubbleContainer = document.getElementById('bubble-container');
    
    // Navbar elements
    const navHamburgerBtn = document.getElementById('navHamburgerBtn');
    const closeNavSidebar = document.getElementById('closeNavSidebar');
    const navSidebar = document.getElementById('navSidebar');
    const navSidebarOverlay = document.getElementById('navSidebarOverlay');
    
    // Carousel elements
    const carouselTrack = document.getElementById('carouselTrack');
    const prevBtn = document.getElementById('prevBtn');
    const nextBtn = document.getElementById('nextBtn');
    const carouselIndicators = document.getElementById('carouselIndicators');
    
    // Product links from hamburger menu
    const productLinks = document.querySelectorAll('.nav-product-list a');
    
    // Carousel state
    let currentSlide = 0;
    const slides = document.querySelectorAll('.carousel-slide');
    const totalSlides = slides.length;
    let carouselInterval;
    
    // Initialize everything
    function init() {
        // Create bubbles
        createBubbles();
        
        // Setup initial image transition
        setupInitialImage();
        
        // Setup navbar hamburger menu
        setupNavbarMenu();
        
        // Setup carousel
        setupCarousel();
        
        // Setup product navigation
        setupProductNavigation();
        
        // Setup buy buttons
        setupBuyButtons();
        
        // Setup image error handling
        setupImageErrorHandling();
        
        console.log('All JavaScript initialized successfully!');
    }
    
    // Create bubble animation
    function createBubbles() {
        const bubbleCount = 60;
        
        for (let i = 0; i < bubbleCount; i++) {
            createSingleBubble(i * 100);
        }
        
        function createSingleBubble(delay = 0) {
            setTimeout(() => {
                const bubble = document.createElement('div');
                bubble.classList.add('bubble');
                
                const sizeClasses = ['size1', 'size2', 'size3', 'size4', 'size5'];
                const randomSize = sizeClasses[Math.floor(Math.random() * sizeClasses.length)];
                bubble.classList.add(randomSize);
                
                const leftPosition = Math.random() * 100;
                bubble.style.left = `${leftPosition}%`;
                
                const startBottom = -50 - Math.random() * 50;
                bubble.style.bottom = `${startBottom}px`;
                
                const animationDuration = 8 + Math.random() * 7;
                bubble.style.animationDuration = `${animationDuration}s`;
                
                const animationDelay = Math.random() * 2;
                bubble.style.animationDelay = `${animationDelay}s`;
                
                bubbleContainer.appendChild(bubble);
                
                setTimeout(() => {
                    if (bubble.parentNode === bubbleContainer) {
                        bubble.remove();
                        createSingleBubble();
                    }
                }, (animationDuration + animationDelay) * 1000);
            }, delay);
        }
    }
    
    // Setup initial image transition
    function setupInitialImage() {
        if (initialImage && mainContent) {
            mainContent.classList.add('hidden');
            
            setTimeout(function() {
                initialImage.classList.add('hidden');
                
                setTimeout(function() {
                    mainContent.classList.remove('hidden');
                    mainContent.classList.add('visible');
                    console.log('Main content revealed');
                }, 300);
            }, 3000);
        }
    }
    
    // Setup navbar hamburger menu
    function setupNavbarMenu() {
        if (navHamburgerBtn) {
            navHamburgerBtn.addEventListener('click', openNavSidebar);
        }
        
        if (closeNavSidebar) {
            closeNavSidebar.addEventListener('click', closeNavSidebarFunc);
        }
        
        if (navSidebarOverlay) {
            navSidebarOverlay.addEventListener('click', closeNavSidebarFunc);
        }
        
        // Keyboard support
        document.addEventListener('keydown', (e) => {
            if (e.key === 'Escape') closeNavSidebarFunc();
        });
    }
    
    function openNavSidebar() {
        console.log('Opening navbar sidebar');
        if (navSidebar) {
            navSidebar.classList.add('active');
        }
        if (navSidebarOverlay) {
            navSidebarOverlay.classList.add('active');
        }
        document.body.style.overflow = 'hidden';
    }
    
    function closeNavSidebarFunc() {
        console.log('Closing navbar sidebar');
        if (navSidebar) {
            navSidebar.classList.remove('active');
        }
        if (navSidebarOverlay) {
            navSidebarOverlay.classList.remove('active');
        }
        document.body.style.overflow = 'auto';
    }
    
    // Setup carousel
    function setupCarousel() {
        if (!carouselTrack || !prevBtn || !nextBtn) return;
        
        // Initialize indicators
        initIndicators();
        updateCarousel();
        
        // Setup button events
        prevBtn.addEventListener('click', prevSlide);
        nextBtn.addEventListener('click', nextSlide);
        
        // Setup keyboard navigation
        document.addEventListener('keydown', (e) => {
            if (e.key === 'ArrowLeft') prevSlide();
            if (e.key === 'ArrowRight') nextSlide();
        });
        
        // Setup touch/swipe for mobile
        setupTouchSwipe();
        
        // Start auto-advance
        startAutoAdvance();
    }
    
    function initIndicators() {
        if (!carouselIndicators) return;
        
        carouselIndicators.innerHTML = '';
        for (let i = 0; i < totalSlides; i++) {
            const indicator = document.createElement('button');
            indicator.classList.add('indicator');
            if (i === currentSlide) indicator.classList.add('active');
            indicator.addEventListener('click', () => goToSlide(i));
            carouselIndicators.appendChild(indicator);
        }
    }
    
    function updateCarousel() {
        if (carouselTrack) {
            carouselTrack.style.transform = `translateX(-${currentSlide * 100}%)`;
        }
        
        // Update indicators
        document.querySelectorAll('.indicator').forEach((indicator, index) => {
            indicator.classList.toggle('active', index === currentSlide);
        });
        
        // Update active product link in sidebar
        updateActiveProductLink();
    }
    
    function goToSlide(slideIndex) {
        if (slideIndex >= 0 && slideIndex < totalSlides) {
            currentSlide = slideIndex;
            updateCarousel();
            resetAutoAdvance();
        }
    }
    
    function nextSlide() {
        currentSlide = (currentSlide + 1) % totalSlides;
        updateCarousel();
        resetAutoAdvance();
    }
    
    function prevSlide() {
        currentSlide = (currentSlide - 1 + totalSlides) % totalSlides;
        updateCarousel();
        resetAutoAdvance();
    }
    
    function setupTouchSwipe() {
        if (!carouselTrack) return;
        
        let touchStartX = 0;
        let touchEndX = 0;
        
        carouselTrack.addEventListener('touchstart', (e) => {
            touchStartX = e.changedTouches[0].screenX;
        });
        
        carouselTrack.addEventListener('touchend', (e) => {
            touchEndX = e.changedTouches[0].screenX;
            const swipeThreshold = 50;
            const diff = touchStartX - touchEndX;
            
            if (Math.abs(diff) > swipeThreshold) {
                if (diff > 0) {
                    nextSlide();
                } else {
                    prevSlide();
                }
            }
        });
    }
    
    function startAutoAdvance() {
        carouselInterval = setInterval(nextSlide, 5000);
        
        // Pause on hover
        if (carouselTrack) {
            carouselTrack.addEventListener('mouseenter', () => {
                clearInterval(carouselInterval);
            });
            
            carouselTrack.addEventListener('mouseleave', () => {
                carouselInterval = setInterval(nextSlide, 5000);
            });
        }
    }
    
    function resetAutoAdvance() {
        clearInterval(carouselInterval);
        carouselInterval = setInterval(nextSlide, 5000);
    }
    
    // Setup product navigation from hamburger menu
    function setupProductNavigation() {
        productLinks.forEach(link => {
            link.addEventListener('click', function(e) {
                e.preventDefault();
                const slideIndex = parseInt(this.getAttribute('data-slide'));
                
                // Close sidebar
                closeNavSidebarFunc();
                
                // Scroll to products section
                const productsSection = document.querySelector('.products');
                if (productsSection) {
                    productsSection.scrollIntoView({ 
                        behavior: 'smooth',
                        block: 'start'
                    });
                    
                    // Go to the corresponding slide after a short delay
                    setTimeout(() => {
                        goToSlide(slideIndex);
                    }, 500);
                }
            });
        });
    }
    
    function updateActiveProductLink() {
        productLinks.forEach(link => {
            const slideIndex = parseInt(link.getAttribute('data-slide'));
            if (slideIndex === currentSlide) {
                link.classList.add('active');
            } else {
                link.classList.remove('active');
            }
        });
    }
    
    // Setup buy buttons to scroll to footer
    function setupBuyButtons() {
        const allButtons = document.querySelectorAll('.order-btn');
        allButtons.forEach(button => {
            button.addEventListener('click', function(e) {
                e.preventDefault();
                const footer = document.querySelector('.footer');
                if (footer) {
                    footer.scrollIntoView({ 
                        behavior: 'smooth',
                        block: 'start'
                    });
                }
            });
        });
    }
    
    // Setup image error handling
    function setupImageErrorHandling() {
        // Product images
        const productPhotos = document.querySelectorAll('.product-photo');
        productPhotos.forEach(photo => {
            photo.onerror = function() {
                const alt = this.alt.toLowerCase();
                let emoji = '🐟';
                if (alt.includes('shrimp')) emoji = '🦐';
                if (alt.includes('pomfret')) emoji = '🐠';
                if (alt.includes('squid')) emoji = '🦑';
                if (alt.includes('crab')) emoji = '🦀';
                if (alt.includes('lobster')) emoji = '🦞';
                if (alt.includes('octopus')) emoji = '🐙';
                if (alt.includes('mussel')) emoji = '🦪';
                if (alt.includes('oyster')) emoji = '🦪';
                
                this.src = 'data:image/svg+xml;base64,' + btoa(`
                    <svg xmlns="http://www.w3.org/2000/svg" width="400" height="300">
                        <rect width="100%" height="100%" fill="#0a2463"/>
                        <text x="50%" y="50%" font-size="80" fill="#a8e6cf" text-anchor="middle" dy=".3em">${emoji}</text>
                        <text x="50%" y="70%" font-size="20" fill="#e0f7fa" text-anchor="middle">${this.alt}</text>
                    </svg>
                `);
            };
        });
        
        // Certificate image
        const certificateImg = document.querySelector('.certificate-img');
        if (certificateImg) {
            certificateImg.onerror = function() {
                this.src = 'data:image/svg+xml;base64,' + btoa(`
                    <svg xmlns="http://www.w3.org/2000/svg" width="800" height="500">
                        <rect width="100%" height="100%" fill="#f8f9fa"/>
                        <text x="50%" y="45%" font-size="60" fill="#0a2463" text-anchor="middle" dy=".3em">📜</text>
                        <text x="50%" y="55%" font-size="30" fill="#0a2463" text-anchor="middle">Quality Certifications</text>
                        <text x="50%" y="65%" font-size="20" fill="#666" text-anchor="middle">International Standards &amp; Certifications</text>
                    </svg>
                `);
            };
        }
        
        // Initial logo image
        const logoImage = document.querySelector('.image-container img');
        if (logoImage) {
            logoImage.onerror = function() {
                this.src = 'data:image/svg+xml;base64,' + btoa(`
                    <svg xmlns="http://www.w3.org/2000/svg" width="600" height="400">
                        <rect width="100%" height="100%" fill="#0a2463"/>
                        <text x="50%" y="40%" font-size="48" fill="#fff" text-anchor="middle">OCEAN</text>
                        <text x="50%" y="50%" font-size="48" fill="#a8e6cf" text-anchor="middle">FRESH</text>
                        <text x="50%" y="65%" font-size="24" fill="#e0f7fa" text-anchor="middle">QUALITY IS OUR FIRST PRIORITY</text>
                    </svg>
                `);
            };
        }
    }
    
    // Start everything
    init();
});
