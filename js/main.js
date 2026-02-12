/* ===========================
   Mass Labs — Main JS
   Warm & Animated Edition
   =========================== */

(function () {
    'use strict';

    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    // ---------- Particle Canvas (Enhanced) ----------
    function initParticles() {
        const canvas = document.getElementById('hero-canvas');
        if (!canvas) return;

        const ctx = canvas.getContext('2d');
        let width, height, particles, animId;
        const PARTICLE_COUNT = 100;
        const CONNECTION_DIST = 140;
        const MOUSE_RADIUS = 180;
        let mouse = { x: -9999, y: -9999 };
        let time = 0;

        // Warm color palette for particles
        const COLORS = [
            { r: 255, g: 107, b: 53 },   // orange
            { r: 255, g: 78, b: 106 },    // coral
            { r: 255, g: 184, b: 48 },    // amber
            { r: 168, g: 85, b: 247 },    // purple
            { r: 251, g: 113, b: 133 },   // rose
        ];

        function resize() {
            width = canvas.width = canvas.offsetWidth;
            height = canvas.height = canvas.offsetHeight;
        }

        function createParticles() {
            particles = [];
            const count = width < 768 ? Math.floor(PARTICLE_COUNT * 0.45) : PARTICLE_COUNT;
            for (let i = 0; i < count; i++) {
                const color = COLORS[Math.floor(Math.random() * COLORS.length)];
                particles.push({
                    x: Math.random() * width,
                    y: Math.random() * height,
                    vx: (Math.random() - 0.5) * 0.5,
                    vy: (Math.random() - 0.5) * 0.5,
                    r: Math.random() * 2 + 0.5,
                    baseR: Math.random() * 2 + 0.5,
                    alpha: Math.random() * 0.6 + 0.15,
                    color: color,
                    pulseOffset: Math.random() * Math.PI * 2,
                    pulseSpeed: 0.02 + Math.random() * 0.02,
                });
            }
        }

        function draw() {
            ctx.clearRect(0, 0, width, height);
            time += 0.01;

            // Draw connections
            for (let i = 0; i < particles.length; i++) {
                for (let j = i + 1; j < particles.length; j++) {
                    const dx = particles[i].x - particles[j].x;
                    const dy = particles[i].y - particles[j].y;
                    const dist = Math.sqrt(dx * dx + dy * dy);
                    if (dist < CONNECTION_DIST) {
                        const opacity = (1 - dist / CONNECTION_DIST) * 0.2;
                        // Blend the two particle colors
                        const ci = particles[i].color;
                        const cj = particles[j].color;
                        const mr = (ci.r + cj.r) >> 1;
                        const mg = (ci.g + cj.g) >> 1;
                        const mb = (ci.b + cj.b) >> 1;

                        ctx.strokeStyle = `rgba(${mr}, ${mg}, ${mb}, ${opacity})`;
                        ctx.lineWidth = 0.6;
                        ctx.beginPath();
                        ctx.moveTo(particles[i].x, particles[i].y);
                        ctx.lineTo(particles[j].x, particles[j].y);
                        ctx.stroke();
                    }
                }
            }

            // Mouse connection lines
            for (const p of particles) {
                const dx = p.x - mouse.x;
                const dy = p.y - mouse.y;
                const dist = Math.sqrt(dx * dx + dy * dy);
                if (dist < MOUSE_RADIUS) {
                    const opacity = (1 - dist / MOUSE_RADIUS) * 0.35;
                    ctx.strokeStyle = `rgba(255, 107, 53, ${opacity})`;
                    ctx.lineWidth = 0.8;
                    ctx.beginPath();
                    ctx.moveTo(p.x, p.y);
                    ctx.lineTo(mouse.x, mouse.y);
                    ctx.stroke();
                }
            }

            // Draw particles
            for (const p of particles) {
                const dx = p.x - mouse.x;
                const dy = p.y - mouse.y;
                const dist = Math.sqrt(dx * dx + dy * dy);

                // Mouse repulsion / attraction
                if (dist < MOUSE_RADIUS) {
                    const force = (1 - dist / MOUSE_RADIUS) * 0.03;
                    p.vx += dx * force;
                    p.vy += dy * force;
                }

                // Breathing pulse
                const pulse = Math.sin(time * 3 + p.pulseOffset) * 0.5 + 0.5;
                p.r = p.baseR + pulse * 1.2;

                // Glow near mouse
                let glow = 0;
                if (dist < MOUSE_RADIUS) {
                    glow = (1 - dist / MOUSE_RADIUS) * 0.8;
                }

                const c = p.color;

                // Outer glow
                if (glow > 0.1) {
                    const gradient = ctx.createRadialGradient(p.x, p.y, 0, p.x, p.y, p.r + glow * 8);
                    gradient.addColorStop(0, `rgba(${c.r}, ${c.g}, ${c.b}, ${(p.alpha + glow) * 0.4})`);
                    gradient.addColorStop(1, `rgba(${c.r}, ${c.g}, ${c.b}, 0)`);
                    ctx.beginPath();
                    ctx.arc(p.x, p.y, p.r + glow * 8, 0, Math.PI * 2);
                    ctx.fillStyle = gradient;
                    ctx.fill();
                }

                // Core particle
                ctx.beginPath();
                ctx.arc(p.x, p.y, p.r + glow * 2, 0, Math.PI * 2);
                ctx.fillStyle = `rgba(${c.r}, ${c.g}, ${c.b}, ${p.alpha + glow * 0.5 + pulse * 0.1})`;
                ctx.fill();

                // Update position with damping
                p.x += p.vx;
                p.y += p.vy;
                p.vx *= 0.995;
                p.vy *= 0.995;

                // Gentle drift (sine wave)
                p.x += Math.sin(time + p.pulseOffset) * 0.15;
                p.y += Math.cos(time * 0.8 + p.pulseOffset) * 0.1;

                // Wrap edges
                if (p.x < -10) p.x = width + 10;
                if (p.x > width + 10) p.x = -10;
                if (p.y < -10) p.y = height + 10;
                if (p.y > height + 10) p.y = -10;
            }

            animId = requestAnimationFrame(draw);
        }

        // Init
        resize();
        createParticles();

        if (!prefersReducedMotion) {
            draw();
        } else {
            // Static frame
            for (const p of particles) {
                ctx.beginPath();
                ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
                const c = p.color;
                ctx.fillStyle = `rgba(${c.r}, ${c.g}, ${c.b}, ${p.alpha})`;
                ctx.fill();
            }
        }

        // Events
        window.addEventListener('resize', () => {
            cancelAnimationFrame(animId);
            resize();
            createParticles();
            if (!prefersReducedMotion) draw();
        });

        canvas.addEventListener('mousemove', (e) => {
            const rect = canvas.getBoundingClientRect();
            mouse.x = e.clientX - rect.left;
            mouse.y = e.clientY - rect.top;
        });

        canvas.addEventListener('mouseleave', () => {
            mouse.x = -9999;
            mouse.y = -9999;
        });

        // Touch support
        canvas.addEventListener('touchmove', (e) => {
            const rect = canvas.getBoundingClientRect();
            const touch = e.touches[0];
            mouse.x = touch.clientX - rect.left;
            mouse.y = touch.clientY - rect.top;
        }, { passive: true });

        canvas.addEventListener('touchend', () => {
            mouse.x = -9999;
            mouse.y = -9999;
        });
    }

    // ---------- Navbar ----------
    function initNavbar() {
        const navbar = document.getElementById('navbar');
        const toggle = document.getElementById('nav-toggle');
        const links = document.getElementById('nav-links');

        if (!navbar) return;

        let ticking = false;
        window.addEventListener('scroll', () => {
            if (!ticking) {
                requestAnimationFrame(() => {
                    navbar.classList.toggle('scrolled', window.scrollY > 60);
                    ticking = false;
                });
                ticking = true;
            }
        });

        if (toggle && links) {
            toggle.addEventListener('click', () => {
                toggle.classList.toggle('active');
                links.classList.toggle('open');
                document.body.style.overflow = links.classList.contains('open') ? 'hidden' : '';
            });

            links.querySelectorAll('a').forEach((a) => {
                a.addEventListener('click', () => {
                    toggle.classList.remove('active');
                    links.classList.remove('open');
                    document.body.style.overflow = '';
                });
            });
        }
    }

    // ---------- Project Loader ----------
    function initProjects() {
        const grid = document.getElementById('projects-grid');
        const tabBtns = document.querySelectorAll('.tab-btn');

        if (!grid || !tabBtns.length) return;

        let projectsData = [];
        let currentTab = 'active';

        function renderProjects(status) {
            const filtered = projectsData.filter((p) => p.status === status);

            // Fade-out animation
            grid.style.opacity = '0';
            grid.style.transform = 'translateY(12px)';

            setTimeout(() => {
                grid.innerHTML = '';

                if (filtered.length === 0) {
                    grid.innerHTML = `
            <div style="grid-column:1/-1;text-align:center;padding:48px 0;color:var(--text-muted);font-size:15px;">
              Bu kategoride henüz proje bulunmuyor.
            </div>`;
                } else {
                    filtered.forEach((project) => {
                        const card = document.createElement('div');
                        card.className = 'project-card';

                        const isActive = project.status === 'active';
                        const statusLabel = isActive ? 'Aktif' : 'Yakında';
                        const statusClass = isActive ? 'project-status--active' : 'project-status--soon';

                        let linkHTML = '';
                        if (project.link && project.link !== '#') {
                            linkHTML = `
                <a href="${project.link}" target="_blank" rel="noopener noreferrer" class="project-link">
                  Projeyi İncele
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M5 12h14"/><path d="m12 5 7 7-7 7"/></svg>
                </a>`;
                        } else if (isActive) {
                            linkHTML = `
                <span class="project-link" style="cursor:default;opacity:0.5;">
                  Detaylar yakında
                </span>`;
                        }

                        card.innerHTML = `
              <div class="project-card-header">
                <h3 class="project-name">${project.name}</h3>
                <span class="project-status ${statusClass}">
                  <span class="project-status-dot"></span>
                  ${statusLabel}
                </span>
              </div>
              <p class="project-desc">${project.description}</p>
              ${linkHTML}`;

                        // Add tilt effect on hover
                        if (!prefersReducedMotion) {
                            card.addEventListener('mousemove', (e) => {
                                const rect = card.getBoundingClientRect();
                                const x = e.clientX - rect.left;
                                const y = e.clientY - rect.top;
                                const centerX = rect.width / 2;
                                const centerY = rect.height / 2;
                                const rotateX = ((y - centerY) / centerY) * -4;
                                const rotateY = ((x - centerX) / centerX) * 4;
                                card.style.transform = `translateY(-6px) scale(1.02) perspective(600px) rotateX(${rotateX}deg) rotateY(${rotateY}deg)`;
                            });

                            card.addEventListener('mouseleave', () => {
                                card.style.transform = '';
                            });
                        }

                        grid.appendChild(card);
                    });
                }

                // Fade-in
                requestAnimationFrame(() => {
                    grid.style.transition = 'opacity 0.5s ease, transform 0.5s ease';
                    grid.style.opacity = '1';
                    grid.style.transform = 'translateY(0)';
                });
            }, 200);
        }

        // Tab switching
        tabBtns.forEach((btn) => {
            btn.addEventListener('click', () => {
                if (btn.dataset.tab === currentTab) return;
                tabBtns.forEach((b) => b.classList.remove('active'));
                btn.classList.add('active');
                currentTab = btn.dataset.tab;
                renderProjects(currentTab);
            });
        });

        // Load JSON
        fetch('data/projects.json')
            .then((res) => res.json())
            .then((data) => {
                projectsData = data;
                renderProjects(currentTab);
            })
            .catch((err) => {
                console.warn('projects.json yüklenemedi:', err);
                grid.innerHTML = `
          <div style="grid-column:1/-1;text-align:center;padding:48px 0;color:var(--text-muted);font-size:15px;">
            Projeler yüklenirken bir hata oluştu.
          </div>`;
            });
    }

    // ---------- Reveal on Scroll (Enhanced) ----------
    function initReveal() {
        const reveals = document.querySelectorAll('.reveal');
        if (!reveals.length) return;

        const observer = new IntersectionObserver(
            (entries) => {
                entries.forEach((entry) => {
                    if (entry.isIntersecting) {
                        entry.target.classList.add('visible');
                        observer.unobserve(entry.target);
                    }
                });
            },
            { threshold: 0.1, rootMargin: '0px 0px -40px 0px' }
        );

        reveals.forEach((el) => observer.observe(el));

        // Also observe section headers
        document.querySelectorAll('.section-header').forEach((header) => {
            header.classList.add('reveal');
            observer.observe(header);
        });

        // Observe about cards
        document.querySelectorAll('.about-card').forEach((card) => {
            if (!card.classList.contains('reveal')) {
                card.classList.add('reveal');
                observer.observe(card);
            }
        });
    }

    // ---------- Counter Animation for Stats ----------
    function initCounterAnimation() {
        const statValues = document.querySelectorAll('.stat-value');
        if (!statValues.length) return;

        const observer = new IntersectionObserver(
            (entries) => {
                entries.forEach((entry) => {
                    if (entry.isIntersecting) {
                        animateCounter(entry.target);
                        observer.unobserve(entry.target);
                    }
                });
            },
            { threshold: 0.5 }
        );

        statValues.forEach((el) => observer.observe(el));

        function animateCounter(el) {
            const finalText = el.textContent;
            // Only animate numeric values
            const numericPart = parseFloat(finalText);
            if (isNaN(numericPart)) return;

            const suffix = finalText.replace(/[\d.]/g, '');
            const duration = 1500;
            const startTime = performance.now();

            function update(currentTime) {
                const elapsed = currentTime - startTime;
                const progress = Math.min(elapsed / duration, 1);
                // Ease out cubic
                const eased = 1 - Math.pow(1 - progress, 3);
                const current = Math.round(numericPart * eased);

                el.textContent = current + suffix;

                if (progress < 1) {
                    requestAnimationFrame(update);
                } else {
                    el.textContent = finalText;
                }
            }

            if (!prefersReducedMotion) {
                el.textContent = '0' + suffix;
                requestAnimationFrame(update);
            }
        }
    }

    // ---------- Parallax Subtle on Mouse Move ----------
    function initParallaxHero() {
        if (prefersReducedMotion) return;

        const heroContent = document.querySelector('.hero-content');
        if (!heroContent) return;

        document.addEventListener('mousemove', (e) => {
            const x = (e.clientX / window.innerWidth - 0.5) * 2;
            const y = (e.clientY / window.innerHeight - 0.5) * 2;

            heroContent.style.transform = `translate(${x * 6}px, ${y * 4}px)`;
        });
    }

    // ---------- Magnetic Buttons ----------
    function initMagneticButtons() {
        if (prefersReducedMotion) return;

        document.querySelectorAll('.btn-primary').forEach((btn) => {
            btn.addEventListener('mousemove', (e) => {
                const rect = btn.getBoundingClientRect();
                const x = e.clientX - rect.left - rect.width / 2;
                const y = e.clientY - rect.top - rect.height / 2;
                btn.style.transform = `translateY(-3px) scale(1.03) translate(${x * 0.15}px, ${y * 0.15}px)`;
            });

            btn.addEventListener('mouseleave', () => {
                btn.style.transform = '';
            });
        });
    }

    // ---------- Smooth Scroll ----------
    function initSmoothScroll() {
        document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
            anchor.addEventListener('click', (e) => {
                const target = document.querySelector(anchor.getAttribute('href'));
                if (target) {
                    e.preventDefault();
                    target.scrollIntoView({ behavior: 'smooth', block: 'start' });
                }
            });
        });
    }

    // ---------- Typing Effect for Badge ----------
    function initTypingEffect() {
        if (prefersReducedMotion) return;

        const badge = document.querySelector('.hero-badge');
        if (!badge) return;

        const dot = badge.querySelector('.badge-dot');
        const fullText = badge.textContent.trim();

        // Clear text, keep dot
        badge.textContent = '';
        if (dot) badge.appendChild(dot);

        const textNode = document.createTextNode('');
        badge.appendChild(textNode);

        let i = 0;
        const speed = 40;

        function type() {
            if (i < fullText.length) {
                textNode.textContent += fullText.charAt(i);
                i++;
                setTimeout(type, speed);
            }
        }

        // Start after hero animation
        setTimeout(type, 1200);
    }

    // ---------- Init All ----------
    document.addEventListener('DOMContentLoaded', () => {
        initParticles();
        initNavbar();
        initProjects();
        initReveal();
        initSmoothScroll();
        initCounterAnimation();
        initParallaxHero();
        initMagneticButtons();
        initTypingEffect();
    });
})();
