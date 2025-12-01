// Updated script.js with smooth scroll to footer

document.addEventListener('DOMContentLoaded', function() {
    const initialImage = document.getElementById('initial-image');
    const mainContent = document.getElementById('main-content');
    const productRows = document.querySelectorAll('.product-row');
    const bubbleContainer = document.getElementById('bubble-container');
    const footer = document.querySelector('.footer');
    
    // Initialize bubble animation
    createBubbles();
    
    // Hide main content initially
    mainContent.classList.add('hidden');
    
    // Show initial image for 3 seconds, then reveal main content
    setTimeout(function() {
        initialImage.classList.add('hidden');
        
        // Small delay before showing main content
        setTimeout(function() {
            mainContent.classList.remove('hidden');
            mainContent.classList.add('visible');
            
            // Add scroll event listener for product animations
            window.addEventListener('scroll', handleScroll);
            
            // Check initial position for products
            handleScroll();
        }, 300);
    }, 3000);
    
    // Function to create bubbles
    function createBubbles() {
        // Create more bubbles for better coverage
        const bubbleCount = 60;
        
        for (let i = 0; i < bubbleCount; i++) {
            createSingleBubble(i * 100);
        }
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
    
    // Function to handle scroll events for product animations
    function handleScroll() {
        productRows.forEach(row => {
            const rowTop = row.getBoundingClientRect().top;
            const windowHeight = window.innerHeight;
            
            if (rowTop < windowHeight - 100) {
                row.classList.add('visible');
            }
        });
    }
    
    // Function to scroll to footer smoothly
    function scrollToFooter() {
        if (footer) {
            footer.scrollIntoView({ 
                behavior: 'smooth',
                block: 'start'
            });
        }
    }
    
    // Add click handlers for ALL Buy buttons AND Explore button
    const allButtons = document.querySelectorAll('.order-btn');
    allButtons.forEach(button => {
        button.addEventListener('click', function(e) {
            e.preventDefault(); // Prevent default link behavior
            scrollToFooter();
        });
    });
    
    // Handle product image loading
    const productPhotos = document.querySelectorAll('.product-photo');
    productPhotos.forEach(photo => {
        photo.onerror = function() {
            console.log(`Image ${this.src} failed to load, showing fallback`);
        };
    });
    
    // Handle certificate image loading
    const certificateImg = document.querySelector('.certificate-img');
    if (certificateImg) {
        certificateImg.onerror = function() {
            console.log(`Certificate image ${this.src} failed to load, showing fallback`);
        };
    }
    
    // Handle initial image loading
    const logoImage = document.querySelector('.image-container img');
    logoImage.onerror = function() {
        this.src = 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAwIiBoZWlnaHQ9IjQwMCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4KICA8cmVjdCB3aWR0aD0iMTAwJSIgaGVpZ2h0PSIxMDAlIiBmaWxsPSIjMGEyNDYzIi8+CiAgPHRleHQgeD0iNTAlIiB5PSI0MCUiIGZvbnQtZmFtaWx5PSJBcmlhbCwgc2Fucy1zZXJpZiIgZm9udC1zaXplPSI0OCIgZmlsbD0iI2ZmZiIgdGV4dC1hbmNob3I9Im1pZGRsZSI+T0NFQU48L3RleHQ+CiAgPHRleHQgeD0iNTAlIiB5PSI1MCUiIGZvbnQtZmFtaWx5PSJBcmlhbCwgc2Fucy1zZXJpZiIgZm9udC1zaXplPSI0OCIgZmlsbD0iI2E4ZTZjZiIgdGV4dC1hbmNob3I9Im1pZGRsZSI+RlJFU0g8L3RleHQ+CiAgPHRleHQgeD0iNTAlIiB5PSI2NSUiIGZvbnQtZmFtaWx5PSJBcrialLwgc2Fucy1zZXJpZiIgZm9udC1zaXplPSIyNCIgZmlsbD0iI2UwZjdmYSIgdGV4dC1hbmNob3I9Im1pZGRsZSI+UVVBTElUWSBJUyBPVVIgRklSU1QgUFJJT1JJVFk8L3RleHQ+Cjwvc3ZnPg==';
    };
});