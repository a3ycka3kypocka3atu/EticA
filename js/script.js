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
    // Parallax Sun, Clouds, Stars Effect
    const parallaxSun = document.getElementById('parallaxSun');
    const parallaxClouds = document.getElementById('parallaxClouds');
    const parallaxStars = document.getElementById('parallaxStars');
    const heroSection = document.querySelector('.hero');
    
    if (heroSection) {
        window.addEventListener('scroll', () => {
            const scrolled = window.scrollY;
            const heroHeight = heroSection.offsetHeight;
            
            // Only animate while hero is broadly in view
            if (scrolled < heroHeight + 200) {
                const scrollProgress = scrolled / heroHeight;
                const translateY = -(scrolled * 0.85); 
                const cloudsTranslateY = -(scrolled * 0.70); // Clouds rise slightly slower than sun
                
                // Fade in then out logic for sun & clouds
                let mainOpacity = 0;
                if (scrolled > 5) {
                    mainOpacity = Math.sin(scrollProgress * Math.PI);
                }
                
                // Stars fade in at top, fade out early as sun/clouds ("morning") appears
                let starsOpacity = 0;
                if (scrollProgress > 0 && scrollProgress < 0.6) {
                    if (scrollProgress < 0.1) {
                        starsOpacity = scrollProgress / 0.1; // Fade in
                    } else if (scrollProgress > 0.3) {
                        starsOpacity = Math.max(0, 1 - ((scrollProgress - 0.3) / 0.3)); // Fade out from 0.3 to 0.6
                    } else {
                        starsOpacity = 1;
                    }
                }
                
                if (parallaxSun) {
                    parallaxSun.style.transform = `translateY(${translateY}px)`;
                    parallaxSun.style.opacity = Math.max(0, Math.min(1, mainOpacity));
                }
                
                if (parallaxClouds) {
                    parallaxClouds.style.transform = `translateY(${cloudsTranslateY}px)`;
                    parallaxClouds.style.opacity = Math.max(0, Math.min(1, mainOpacity));
                }
                
                if (parallaxStars) {
                    parallaxStars.style.opacity = Math.max(0, Math.min(1, starsOpacity));
                }
                
            } else {
                if (parallaxSun) parallaxSun.style.opacity = 0;
                if (parallaxClouds) parallaxClouds.style.opacity = 0;
                if (parallaxStars) parallaxStars.style.opacity = 0;
            }
        });
    }
});
