document.addEventListener('DOMContentLoaded', () => {
    
    // Header Scroll Effect
    const header = document.getElementById('header');
    
    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            header.classList.add('scrolled');
        } else {
            header.classList.remove('scrolled');
        }
    });

    // Smooth Scroll for Anchor Links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href');
            if (targetId === '#') return;
            
            const targetElement = document.querySelector(targetId);
            if (targetElement) {
                const headerOffset = 80;
                const elementPosition = targetElement.getBoundingClientRect().top;
                const offsetPosition = elementPosition + window.pageYOffset - headerOffset;
  
                window.scrollTo({
                    top: offsetPosition,
                    behavior: 'smooth'
                });
            }
        });
    });

    // Simple Sparkle Effect for the Ray Path
    const container = document.getElementById('sparkles-container');
    
    if (container) {
        setInterval(() => {
            const sparkle = document.createElement('div');
            sparkle.classList.add('sparkle');
            
            const size = Math.random() * 4 + 2;
            sparkle.style.width = `${size}px`;
            sparkle.style.height = `${size}px`;
            
            sparkle.style.left = `${Math.random() * 40 - 20}px`;
            sparkle.style.top = `${Math.random() * 100}vh`;
            
            container.appendChild(sparkle);
            
            setTimeout(() => {
                sparkle.remove();
            }, 3000);
        }, 300);
    }
    
    // Parallax Sun Effect
    const parallaxSun = document.getElementById('parallaxSun');
    const heroSection = document.querySelector('.hero');
    
    if (parallaxSun && heroSection) {
        window.addEventListener('scroll', () => {
            const scrolled = window.scrollY;
            const heroHeight = heroSection.offsetHeight;
            
            // Only animate while hero is in view
            if (scrolled < heroHeight) {
                // Move up as you scroll down
                const translateY = -(scrolled * 0.85); 
                
                // Fade in then out using a sine wave projection over the scroll distance
                let opacity = 0;
                if (scrolled > 10) {
                    opacity = Math.sin((scrolled / heroHeight) * Math.PI);
                }
                
                parallaxSun.style.transform = `translateY(${translateY}px)`;
                parallaxSun.style.opacity = Math.max(0, Math.min(1, opacity));
            } else {
                parallaxSun.style.opacity = 0;
            }
        });
    }
});
