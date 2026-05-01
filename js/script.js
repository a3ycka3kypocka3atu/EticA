document.addEventListener('DOMContentLoaded', () => {
    // Internationalization (i18n) Logic
    const langOptions = document.querySelectorAll('.lang-option');

    // Translation function
    function setLanguage(lang) {
        if (!window.translations || !window.translations[lang]) return;

        const dict = window.translations[lang];

        // Ensure dict applies safely
        document.querySelectorAll('[data-i18n]').forEach(el => {
            const key = el.getAttribute('data-i18n');
            if (dict[key]) {
                if (el.tagName === 'META') {
                    el.setAttribute('content', dict[key]);
                } else {
                    el.innerHTML = dict[key];
                }
            }
        });

        // Handle active class
        langOptions.forEach(btn => {
            if (btn.getAttribute('data-lang') === lang) {
                btn.classList.add('active');
            } else {
                btn.classList.remove('active');
            }
        });

        // Save preference
        localStorage.setItem('preferredLang', lang);
        document.documentElement.lang = lang;
    }

    // Language option click listeners
    langOptions.forEach(btn => {
        btn.addEventListener('click', (e) => {
            e.preventDefault();
            const lang = btn.getAttribute('data-lang');
            setLanguage(lang);
        });
    });

    // Initialize Language
    const savedLang = localStorage.getItem('preferredLang') || 'ua';
    setLanguage(savedLang);

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

    // =====================================================================
    // BIOLUMINESCENT ECOSYSTEM LAYER
    // =====================================================================

    const particlesContainer = document.getElementById('particlesContainer');
    const currentsContainer = document.getElementById('currentsContainer');
    const vinesContainer = document.getElementById('vinesContainer');

    // --- Particles ---
    function createParticles() {
        const count = 50;
        const particles = [];

        for (let i = 0; i < count; i++) {
            const particle = document.createElement('div');
            particle.classList.add('particle');

            // Random type: teal (70%), cyan (20%), gold (10%)
            const rand = Math.random();
            let type = 'teal';
            if (rand > 0.9) type = 'gold';
            else if (rand > 0.7) type = 'cyan';
            particle.classList.add(`particle--${type}`);

            // Random size 2-8px
            const size = Math.random() * 6 + 2;
            particle.style.width = `${size}px`;
            particle.style.height = `${size}px`;

            // Random starting position
            particle.style.left = `${Math.random() * 100}%`;
            particle.style.top = `${Math.random() * 100 + 20}%`;

            // Random animation delay and duration
            const driftDuration = Math.random() * 10 + 15; // 15-25s
            const pulseDuration = Math.random() * 3 + 3;   // 3-6s
            const delay = Math.random() * 5;

            particle.style.animationDuration = `${driftDuration}s, ${pulseDuration}s`;
            particle.style.animationDelay = `${delay}s, ${delay}s`;

            particlesContainer.appendChild(particle);
            particles.push(particle);
        }

        return particles;
    }

    // --- Flowing Currents ---
    function createCurrents() {
        const waveCount = 7;
        const positions = [8, 18, 30, 45, 58, 72, 88]; // % from top

        for (let i = 0; i < waveCount; i++) {
            const wave = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
            wave.setAttribute('class', 'current-wave');
            wave.setAttribute('viewBox', '0 0 1200 60');
            wave.setAttribute('preserveAspectRatio', 'none');
            wave.style.top = `${positions[i]}%`;
            wave.style.height = '80px';
            wave.style.opacity = (Math.random() * 0.06 + 0.04).toFixed(3);

            const path = document.createElementNS('http://www.w3.org/2000/svg', 'path');

            // Organic wave path
            const d = `M0,30 Q150,${10 + Math.random() * 20} 300,30 T600,30 T900,30 T1200,30 L1200,60 L0,60 Z`;
            path.setAttribute('d', d);
            path.setAttribute('stroke', i % 2 === 0 ? 'rgba(39, 140, 98, 0.5)' : 'rgba(37, 107, 158, 0.5)');
            path.setAttribute('stroke-width', Math.random() * 1.5 + 0.5);
            path.setAttribute('fill', 'none');
            path.style.strokeDasharray = Math.random() > 0.5 ? '8,4' : 'none';

            wave.appendChild(path);
            currentsContainer.appendChild(wave);

            // Staggered animation start
            setTimeout(() => {
                wave.classList.add('active');
            }, i * 800);

            // Varying wave animation duration
            wave.style.animationDuration = `${Math.random() * 8 + 10}s`;
        }
    }

    // --- Growing Vines ---
    function createVines() {
        const vineData = [
            { x: '5%', y: '75%', rotation: -15, scale: 0.9 },
            { x: '85%', y: '85%', rotation: 25, scale: 1 },
            { x: '10%', y: '25%', rotation: -5, scale: 0.8 },
            { x: '75%', y: '15%', rotation: 10, scale: 0.85 }
        ];

        vineData.forEach((data, index) => {
            const vine = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
            vine.setAttribute('class', 'vine');
            vine.setAttribute('viewBox', '0 0 200 300');
            vine.style.left = data.x;
            vine.style.top = data.y;
            vine.style.width = '180px';
            vine.style.height = '280px';
            vine.style.transform = `rotate(${data.rotation}deg) scale(${data.scale})`;

            // Main stem
            const mainPath = document.createElementNS('http://www.w3.org/2000/svg', 'path');
            mainPath.setAttribute('class', 'vine-path vine-main');
            mainPath.setAttribute('d', 'M100,300 Q90,250 110,200 Q130,150 100,100 Q80,50 100,10');
            vine.appendChild(mainPath);

            // Branches
            const branches = [
                { d: 'M100,200 Q60,180 40,160', delay: 0.3 },
                { d: 'M95,150 Q130,130 150,110', delay: 0.5 },
                { d: 'M100,100 Q70,80 50,60', delay: 0.7 },
                { d: 'M95,80 Q120,60 140,40', delay: 0.9 }
            ];

            branches.forEach(b => {
                const branch = document.createElementNS('http://www.w3.org/2000/svg', 'path');
                branch.setAttribute('class', 'vine-path vine-branch');
                branch.setAttribute('d', b.d);
                branch.style.animationDelay = `${b.delay}s`;
                vine.appendChild(branch);
            });

            // Accent dots
            const accents = [
                { cx: 40, cy: 160, delay: 0.8 },
                { cx: 150, cy: 110, delay: 1.0 },
                { cx: 50, cy: 60, delay: 1.2 }
            ];

            accents.forEach(a => {
                const circle = document.createElementNS('http://www.w3.org/2000/svg', 'circle');
                circle.setAttribute('class', 'vine-path vine-accent');
                circle.setAttribute('cx', a.cx);
                circle.setAttribute('cy', a.cy);
                circle.setAttribute('r', 4);
                circle.style.animationDelay = `${a.delay}s`;
                vine.appendChild(circle);
            });

            vinesContainer.appendChild(vine);

            // Intersection Observer for scroll-triggered growth
            const observer = new IntersectionObserver((entries) => {
                entries.forEach(entry => {
                    if (entry.isIntersecting) {
                        setTimeout(() => {
                            vine.classList.add('animate');
                        }, index * 400);
                        observer.unobserve(entry.target);
                    }
                });
            }, { threshold: 0.3 });

            observer.observe(vine);
        });
    }

    // --- Mouse Proximity Effect ---
    let mouseX = 0, mouseY = 0;
    let rafId = null;

    document.addEventListener('mousemove', (e) => {
        mouseX = e.clientX;
        mouseY = e.clientY;

        if (!rafId) {
            rafId = requestAnimationFrame(updateParticleProximity);
        }
    });

    function updateParticleProximity() {
        const particles = document.querySelectorAll('.particle');

        particles.forEach(p => {
            const rect = p.getBoundingClientRect();
            const centerX = rect.left + rect.width / 2;
            const centerY = rect.top + rect.height / 2;

            const dx = mouseX - centerX;
            const dy = mouseY - centerY;
            const distance = Math.sqrt(dx * dx + dy * dy);

            if (distance < 120) {
                const strength = 1 - distance / 120;
                const brightness = 1 + strength * 0.3;
                p.style.filter = `brightness(${brightness})`;
                p.style.transform = `scale(${1 + strength * 0.15})`;
            } else {
                p.style.filter = '';
                p.style.transform = '';
            }
        });

        rafId = null;
    }

    // Initialize ecosystem
    if (particlesContainer && currentsContainer && vinesContainer) {
        createParticles();
        createCurrents();
        createVines();
    }
});