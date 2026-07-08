/* ================================================
   PROLANZ DIGITALS — PREMIUM INTERACTION SYSTEM
   World-Class Agency Animations & Micro-Interactions
   ================================================ */

(function () {
    'use strict';

    // ─── PRELOADER ───
    const preloader = document.querySelector('.preloader');
    if (preloader) {
        window.addEventListener('load', function () {
            setTimeout(function () {
                preloader.classList.add('is-hidden');
            }, 500);
        });
    }

    // ─── SCROLL PROGRESS BAR ───
    const scrollProgress = document.querySelector('.scroll-progress');
    if (scrollProgress) {
        window.addEventListener('scroll', function () {
            const scrollTop = window.scrollY;
            const docHeight = document.documentElement.scrollHeight - window.innerHeight;
            const progress = docHeight > 0 ? (scrollTop / docHeight) * 100 : 0;
            scrollProgress.style.width = progress + '%';
        }, { passive: true });
    }

    // ─── STICKY NAV WITH SCROLL EFFECT ───
    const nav = document.querySelector('.nav');
    let lastScroll = 0;

    if (nav) {
        window.addEventListener('scroll', function () {
            const currentScroll = window.scrollY;

            if (currentScroll > 60) {
                nav.classList.add('is-scrolled');
            } else {
                nav.classList.remove('is-scrolled');
            }

            lastScroll = currentScroll;
        }, { passive: true });
    }

    // ─── MOBILE NAV TOGGLE ───
    const navToggle = document.getElementById('navToggle');
    const navLinks = document.getElementById('navLinks');

    if (navToggle && navLinks) {
        navToggle.addEventListener('click', function () {
            navLinks.classList.toggle('is-open');
            // Animate hamburger
            navToggle.textContent = navLinks.classList.contains('is-open') ? '✕' : '☰';
        });

        // Close on link click
        navLinks.querySelectorAll('a').forEach(function (a) {
            a.addEventListener('click', function () {
                navLinks.classList.remove('is-open');
                navToggle.textContent = '☰';
            });
        });

        // Close on outside click
        document.addEventListener('click', function (e) {
            if (!nav.contains(e.target) && navLinks.classList.contains('is-open')) {
                navLinks.classList.remove('is-open');
                navToggle.textContent = '☰';
            }
        });
    }

    // ─── SCROLL REVEAL SYSTEM ───
    const revealElements = document.querySelectorAll('.reveal, .reveal--left, .reveal--right, .reveal--scale');

    if (revealElements.length > 0 && 'IntersectionObserver' in window) {
        const revealObserver = new IntersectionObserver(function (entries) {
            entries.forEach(function (entry) {
                if (entry.isIntersecting) {
                    entry.target.classList.add('is-visible');
                    revealObserver.unobserve(entry.target);
                }
            });
        }, {
            threshold: 0.12,
            rootMargin: '0px 0px -40px 0px'
        });

        revealElements.forEach(function (el) {
            revealObserver.observe(el);
        });
    } else {
        // Fallback: show everything
        revealElements.forEach(function (el) {
            el.classList.add('is-visible');
        });
    }

    // ─── MOUSE-FOLLOW GRADIENT ON HERO ───
    const heroSection = document.querySelector('.hero');
    const mouseGlow = document.querySelector('.hero__mouse-glow');

    if (heroSection && mouseGlow) {
        heroSection.addEventListener('mousemove', function (e) {
            const rect = heroSection.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;
            mouseGlow.style.left = x + 'px';
            mouseGlow.style.top = y + 'px';
        });

        heroSection.addEventListener('mouseleave', function () {
            mouseGlow.style.opacity = '0';
        });

        heroSection.addEventListener('mouseenter', function () {
            mouseGlow.style.opacity = '1';
        });
    }

    // ─── ANIMATED NUMBER COUNTERS ───
    var counted = false;

    function easeOutQuart(t) {
        return 1 - Math.pow(1 - t, 4);
    }

    function countUp(el) {
        var target = parseInt(el.getAttribute('data-count'), 10);
        var suffix = el.getAttribute('data-suffix') || '';
        var duration = 1800;
        var startTime = null;

        el.classList.add('is-counting');

        function step(ts) {
            if (!startTime) startTime = ts;
            var progress = Math.min((ts - startTime) / duration, 1);
            var easedProgress = easeOutQuart(progress);
            var value = Math.floor(easedProgress * target);
            el.textContent = value.toLocaleString() + suffix;

            if (progress < 1) {
                requestAnimationFrame(step);
            } else {
                el.textContent = target.toLocaleString() + suffix;
                setTimeout(function () {
                    el.classList.remove('is-counting');
                }, 300);
            }
        }

        requestAnimationFrame(step);
    }

    var dashSection = document.getElementById('results');
    if (dashSection) {
        var counterObserver = new IntersectionObserver(function (entries) {
            entries.forEach(function (entry) {
                if (entry.isIntersecting && !counted) {
                    counted = true;
                    document.querySelectorAll('.dash__num').forEach(function (el, index) {
                        setTimeout(function () {
                            countUp(el);
                        }, index * 150);
                    });
                }
            });
        }, { threshold: 0.3 });
        counterObserver.observe(dashSection);
    }

    // ─── FAQ ACCORDION ───
    document.querySelectorAll('.faq__item').forEach(function (item) {
        var btn = item.querySelector('.faq__q');
        if (!btn) return;

        btn.addEventListener('click', function () {
            var wasOpen = item.classList.contains('is-open');

            // Close all
            document.querySelectorAll('.faq__item').forEach(function (i) {
                i.classList.remove('is-open');
            });

            // Toggle current
            if (!wasOpen) {
                item.classList.add('is-open');
            }
        });
    });

    // ─── MARQUEE DUPLICATION ───
    var marquees = document.querySelectorAll('.marquee');
    marquees.forEach(function (marquee) {
        var content = marquee.querySelector('.marquee__content');
        if (content && !marquee.querySelector('.marquee__content:nth-child(2)')) {
            var clone = content.cloneNode(true);
            clone.setAttribute('aria-hidden', 'true');
            marquee.appendChild(clone);
        }
    });

    // ─── TESTIMONIAL CAROUSEL ───
    var carousel = document.querySelector('.testi-carousel');
    if (carousel) {
        var track = carousel.querySelector('.testi-track');
        var slides = carousel.querySelectorAll('.testi-slide');
        var dots = carousel.parentElement.querySelectorAll('.testi-dot');
        var currentSlide = 0;
        var totalSlides = slides.length;
        var autoplayInterval;

        function goToSlide(index) {
            if (index < 0) index = totalSlides - 1;
            if (index >= totalSlides) index = 0;
            currentSlide = index;
            track.style.transform = 'translateX(-' + (currentSlide * 100) + '%)';

            dots.forEach(function (dot, i) {
                dot.classList.toggle('is-active', i === currentSlide);
            });
        }

        function startAutoplay() {
            autoplayInterval = setInterval(function () {
                goToSlide(currentSlide + 1);
            }, 5000);
        }

        function stopAutoplay() {
            clearInterval(autoplayInterval);
        }

        dots.forEach(function (dot, i) {
            dot.addEventListener('click', function () {
                stopAutoplay();
                goToSlide(i);
                startAutoplay();
            });
        });

        if (totalSlides > 1) {
            startAutoplay();
            carousel.addEventListener('mouseenter', stopAutoplay);
            carousel.addEventListener('mouseleave', startAutoplay);
        }

        // Initialize first dot
        if (dots.length > 0) {
            dots[0].classList.add('is-active');
        }
    }

    // ─── MULTI-STEP FUNNEL FORM ───
    var funnelForm = document.getElementById('funnelForm');
    if (funnelForm) {
        var steps = funnelForm.querySelectorAll('.funnel-step');
        var currentStep = 0;

        function showStep(index) {
            steps.forEach(function (step, i) {
                step.classList.toggle('is-active', i === index);
            });
            currentStep = index;
        }

        // Step 1 → Step 2 (email capture)
        var step1Form = document.getElementById('step1Form');
        if (step1Form) {
            step1Form.addEventListener('submit', function (e) {
                e.preventDefault();
                var name = document.getElementById('leadName').value.trim();
                var email = document.getElementById('leadEmail').value.trim();

                if (name && email) {
                    // Store for later
                    sessionStorage.setItem('leadName', name);
                    sessionStorage.setItem('leadEmail', email);

                    // Update thank you name
                    var thankName = document.getElementById('thankName');
                    if (thankName) thankName.textContent = name;

                    showStep(1);
                }
            });
        }

        // Step 2 → Step 3 (qualification)
        var step2Next = document.getElementById('step2Next');
        if (step2Next) {
            step2Next.addEventListener('click', function () {
                showStep(2);
            });
        }

        // Step 3 → Step 4 (booking)
        var qualForm = document.getElementById('qualForm');
        if (qualForm) {
            qualForm.addEventListener('submit', function (e) {
                e.preventDefault();
                showStep(3);
            });
        }

        // Initialize
        showStep(0);
    }

    // ─── MOBILE STICKY CTA ───
    var mobileCta = document.querySelector('.mobile-cta');
    if (mobileCta) {
        var heroBottom = document.querySelector('.hero');
        if (heroBottom) {
            var mobileCtaObserver = new IntersectionObserver(function (entries) {
                entries.forEach(function (entry) {
                    if (!entry.isIntersecting) {
                        mobileCta.classList.add('is-visible');
                    } else {
                        mobileCta.classList.remove('is-visible');
                    }
                });
            }, { threshold: 0 });
            mobileCtaObserver.observe(heroBottom);
        }
    }

    // ─── SMOOTH ANCHOR SCROLL ───
    document.querySelectorAll('a[href^="#"]').forEach(function (anchor) {
        anchor.addEventListener('click', function (e) {
            var targetId = this.getAttribute('href');
            if (targetId === '#') return;
            var targetEl = document.querySelector(targetId);
            if (targetEl) {
                e.preventDefault();
                var navHeight = nav ? nav.offsetHeight : 0;
                var targetPosition = targetEl.getBoundingClientRect().top + window.scrollY - navHeight - 20;
                window.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth'
                });
            }
        });
    });

    // ─── PARALLAX ON SCROLL ───
    var parallaxBgs = document.querySelectorAll('.parallax-bg');

    if (parallaxBgs.length > 0) {
        window.addEventListener('scroll', function () {
            var scrollY = window.scrollY;
            parallaxBgs.forEach(function (bg) {
                var speed = parseFloat(bg.getAttribute('data-speed')) || 0.3;
                var parent = bg.parentElement;
                var parentTop = parent.getBoundingClientRect().top + scrollY;
                var offset = (scrollY - parentTop) * speed;
                bg.style.transform = 'translateY(' + offset + 'px)';
            });
        }, { passive: true });
    }

    // ─── MAGNETIC BUTTON EFFECT ───
    document.querySelectorAll('.btn--primary.btn--lg').forEach(function (btn) {
        btn.addEventListener('mousemove', function (e) {
            var rect = btn.getBoundingClientRect();
            var x = e.clientX - rect.left - rect.width / 2;
            var y = e.clientY - rect.top - rect.height / 2;
            btn.style.transform = 'translateY(-2px) translate(' + (x * 0.15) + 'px, ' + (y * 0.15) + 'px)';
        });

        btn.addEventListener('mouseleave', function () {
            btn.style.transform = '';
        });
    });

    // ─── SERVICE CARD TILT EFFECT ───
    document.querySelectorAll('.service, .card, .why-card, .card--dark').forEach(function (card) {
        card.addEventListener('mousemove', function (e) {
            var rect = card.getBoundingClientRect();
            var x = (e.clientX - rect.left) / rect.width;
            var y = (e.clientY - rect.top) / rect.height;
            var tiltX = (y - 0.5) * 6;
            var tiltY = (x - 0.5) * -6;
            card.style.transform = 'translateY(-6px) perspective(800px) rotateX(' + tiltX + 'deg) rotateY(' + tiltY + 'deg)';
        });

        card.addEventListener('mouseleave', function () {
            card.style.transform = '';
            card.style.transition = 'transform 0.5s ease';
            setTimeout(function () {
                card.style.transition = '';
            }, 500);
        });
    });

    // ─── TYPED EFFECT FOR HERO SUBHEAD (SUBTLE) ───
    var heroEyebrow = document.querySelector('.hero__eyebrow');
    if (heroEyebrow) {
        var originalText = heroEyebrow.textContent;
        // Keep it simple — just ensure it's visible after animation
        heroEyebrow.style.visibility = 'visible';
    }

    // ─── SECTION GLOW ACCENTS ON SCROLL ───
    var glowAccents = document.querySelectorAll('.glow-accent');
    if (glowAccents.length > 0) {
        window.addEventListener('scroll', function () {
            glowAccents.forEach(function (glow) {
                var rect = glow.parentElement.getBoundingClientRect();
                var viewHeight = window.innerHeight;
                if (rect.top < viewHeight && rect.bottom > 0) {
                    var progress = 1 - (rect.top / viewHeight);
                    glow.style.opacity = Math.min(progress * 0.8, 0.5);
                }
            });
        }, { passive: true });
    }

    // ─── PAIN LIST STAGGER REVEAL ───
    var painItems = document.querySelectorAll('.pain__list li');
    if (painItems.length > 0) {
        var painObserver = new IntersectionObserver(function (entries) {
            entries.forEach(function (entry) {
                if (entry.isIntersecting) {
                    var items = entry.target.querySelectorAll('li');
                    items.forEach(function (item, index) {
                        setTimeout(function () {
                            item.style.opacity = '1';
                            item.style.transform = 'translateX(0)';
                        }, index * 120);
                    });
                    painObserver.unobserve(entry.target);
                }
            });
        }, { threshold: 0.2 });

        var painList = document.querySelector('.pain__list');
        if (painList) {
            // Set initial state
            painItems.forEach(function (item) {
                item.style.opacity = '0';
                item.style.transform = 'translateX(-30px)';
                item.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
            });
            painObserver.observe(painList);
        }
    }

    // ─── METHOD STEPS SEQUENTIAL REVEAL ───
    var methodSteps = document.querySelectorAll('.method__step');
    if (methodSteps.length > 0) {
        var methodObserver = new IntersectionObserver(function (entries) {
            entries.forEach(function (entry) {
                if (entry.isIntersecting) {
                    var steps = entry.target.querySelectorAll('.method__step');
                    steps.forEach(function (step, index) {
                        setTimeout(function () {
                            step.style.opacity = '1';
                            step.style.transform = 'translateY(0)';
                        }, index * 200);
                    });
                    methodObserver.unobserve(entry.target);
                }
            });
        }, { threshold: 0.2 });

        var methodContainer = document.querySelector('.method__steps');
        if (methodContainer) {
            methodSteps.forEach(function (step) {
                step.style.opacity = '0';
                step.style.transform = 'translateY(30px)';
                step.style.transition = 'opacity 0.7s ease, transform 0.7s cubic-bezier(0.16, 1, 0.3, 1)';
            });
            methodObserver.observe(methodContainer);
        }
    }

    // ─── KEYBOARD ACCESSIBILITY ───
    document.addEventListener('keydown', function (e) {
        // ESC closes mobile nav
        if (e.key === 'Escape' && navLinks && navLinks.classList.contains('is-open')) {
            navLinks.classList.remove('is-open');
            navToggle.textContent = '☰';
            navToggle.focus();
        }
    });

    // ─── ANIMATED BAR CHARTS ───
    var barCharts = document.querySelectorAll('.bar-chart');
    if (barCharts.length) {
        var barObserver = new IntersectionObserver(function (entries) {
            entries.forEach(function (entry) {
                if (entry.isIntersecting) {
                    // Generic .bar-fill
                    var bars = entry.target.querySelectorAll('.bar-fill');
                    bars.forEach(function (bar) {
                        var target = bar.getAttribute('data-width') || '0';
                        setTimeout(function () {
                            bar.style.width = target + '%';
                        }, parseInt(bar.getAttribute('data-delay') || 0));
                    });
                    // Channel bars
                    var chanBars = entry.target.querySelectorAll('.channel-bar__fill');
                    chanBars.forEach(function (bar) {
                        var target = bar.getAttribute('data-width') || '0';
                        setTimeout(function () {
                            bar.style.width = target + '%';
                        }, parseInt(bar.getAttribute('data-delay') || 0));
                    });
                    barObserver.unobserve(entry.target);
                }
            });
        }, { threshold: 0.3 });

        barCharts.forEach(function (chart) {
            var bars = chart.querySelectorAll('.bar-fill, .channel-bar__fill');
            bars.forEach(function (bar) { bar.style.width = '0'; });
            barObserver.observe(chart);
        });
    }


    // ─── ANIMATED PROGRESS RINGS ───
    var rings = document.querySelectorAll('.ring-svg circle.ring-progress');
    if (rings.length) {
        var ringObserver = new IntersectionObserver(function (entries) {
            entries.forEach(function (entry) {
                if (entry.isIntersecting) {
                    var circle = entry.target;
                    var pct = parseInt(circle.getAttribute('data-pct') || 0);
                    var r = parseFloat(circle.getAttribute('r') || 45);
                    var circ = 2 * Math.PI * r;
                    var dash = circ - (pct / 100) * circ;
                    circle.style.strokeDasharray = circ;
                    circle.style.strokeDashoffset = circ;
                    setTimeout(function () {
                        circle.style.strokeDashoffset = dash;
                    }, 100);
                    ringObserver.unobserve(circle);
                }
            });
        }, { threshold: 0.4 });
        rings.forEach(function (r) { ringObserver.observe(r); });
    }

    // ─── SPARKLINE DRAW ANIMATION ───
    var sparklines = document.querySelectorAll('.sparkline-path');
    if (sparklines.length) {
        var sparkObserver = new IntersectionObserver(function (entries) {
            entries.forEach(function (entry) {
                if (entry.isIntersecting) {
                    var path = entry.target;
                    var len = path.getTotalLength ? path.getTotalLength() : 300;
                    path.style.strokeDasharray = len;
                    path.style.strokeDashoffset = len;
                    setTimeout(function () {
                        path.style.transition = 'stroke-dashoffset 1.8s cubic-bezier(0.16,1,0.3,1)';
                        path.style.strokeDashoffset = '0';
                    }, 200);
                    sparkObserver.unobserve(path);
                }
            });
        }, { threshold: 0.4 });
        sparklines.forEach(function (p) { sparkObserver.observe(p); });
    }

})();

