document.addEventListener('DOMContentLoaded', () => {
    initBurgerMenu();
    initPopupHandlers();
    initScrollReveal();
    initHeroAnimations();
    initSubNav();
});

function initSubNav() {
    const subnavList = document.querySelector('.menu-subnav__list');
    const subnavLinks = document.querySelectorAll('.menu-subnav__link');
    const sections = document.querySelectorAll('section[id]');

    if (!subnavLinks.length || !sections.length) return;


    subnavLinks.forEach(link => {
        link.addEventListener('click', (e) => {
            const href = link.getAttribute('href');
            if (href.startsWith('#')) {
                e.preventDefault();
                const targetId = href.substring(1);
                const targetElement = document.getElementById(targetId);
                if (targetElement) {
                    const headerHeight = document.querySelector('.header').offsetHeight;
                    const subnavHeight = document.querySelector('.menu-subnav').offsetHeight;
                    const targetPosition = targetElement.offsetTop - headerHeight - subnavHeight + 1;
                    
                    window.scrollTo({
                        top: targetPosition,
                        behavior: 'smooth'
                    });
                }
            }
        });
    });


    const observerOptions = {
        root: null,
        rootMargin: '-150px 0px -70% 0px',
        threshold: 0
    };

    const observer = new IntersectionObserver(entries => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const id = entry.target.getAttribute('id');
                const activeLink = document.querySelector(`.menu-subnav__link[href="#${id}"]`);

                if (activeLink) {
                    subnavLinks.forEach(link => link.classList.remove('menu-subnav__link--active'));
                    activeLink.classList.add('menu-subnav__link--active');


                    if (subnavList) {
                        const offset = activeLink.offsetLeft - (subnavList.clientWidth / 2) + (activeLink.clientWidth / 2);
                        subnavList.scrollTo({ left: offset, behavior: 'smooth' });
                    }
                }
            }
        });
    }, observerOptions);

    sections.forEach(section => observer.observe(section));
}

function initScrollReveal() {
    if (!('IntersectionObserver' in window)) {
        document.querySelectorAll('.promo-card, .category, .product-card, .about-summary__container, .booking-hero__card, .contact__social')
            .forEach(el => el.classList.add('u-reveal--active'));
        return;
    }

    const revealElements = document.querySelectorAll('.promo-card, .category, .product-card, .about-summary__container, .booking-hero__card, .contact__social');
    const grids = document.querySelectorAll('.products-grid, .menu__categories');

    const revealGridChildren = (grid) => {
        const children = grid.children;
        Array.from(children).forEach((child, index) => {
            child.classList.add('u-reveal');
            child.style.transitionDelay = `${index * 0.1}s`;
            setTimeout(() => child.classList.add('u-reveal--active'), 50);
        });
    };

    const revealSingle = (el) => {
        el.classList.add('u-reveal--active');
    };

    const revealObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                if (entry.target.classList.contains('products-grid') || entry.target.classList.contains('menu__categories')) {
                    revealGridChildren(entry.target);
                } else {
                    revealSingle(entry.target);
                }
                revealObserver.unobserve(entry.target);
            }
        });
    }, {
        threshold: 0.01,
        rootMargin: '0px 0px -40px 0px'
    });

    revealElements.forEach(el => {
        el.classList.add('u-reveal');
        revealObserver.observe(el);
    });

    grids.forEach(grid => revealObserver.observe(grid));

    const isInViewport = (el) => {
        const rect = el.getBoundingClientRect();
        const viewH = window.innerHeight || document.documentElement.clientHeight;
        const viewW = window.innerWidth || document.documentElement.clientWidth;
        return rect.bottom > 0 && rect.right > 0 && rect.top < viewH && rect.left < viewW;
    };

    const runInitialRevealCheck = () => {
        revealElements.forEach(el => {
            if (el.classList.contains('u-reveal--active')) return;
            if (!isInViewport(el)) return;
            revealSingle(el);
            revealObserver.unobserve(el);
        });

        grids.forEach(grid => {
            if (!isInViewport(grid)) return;
            revealGridChildren(grid);
            revealObserver.unobserve(grid);
        });
    };

    requestAnimationFrame(runInitialRevealCheck);
    window.addEventListener('load', () => requestAnimationFrame(runInitialRevealCheck), {once: true});
}

function initHeroAnimations() {
    const prefersReducedMotion = window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    const heroTitle = document.querySelector('.hero__title');
    const heroSubtitle = document.querySelector('.hero__subtitle');
    const heroBtn = document.querySelector('.hero__cta');

    if (prefersReducedMotion) {
        [heroTitle, heroSubtitle, heroBtn].filter(Boolean).forEach(el => {
            el.style.opacity = '1';
        });
        return;
    }

    if (heroTitle) {
        heroTitle.classList.add('u-animate-slide-up');
    }

    if (heroSubtitle) {
        heroSubtitle.style.animationDelay = '0.2s';
        heroSubtitle.classList.add('u-animate-slide-up');
        setTimeout(() => {
            heroSubtitle.classList.remove('u-animate-slide-up');
            heroSubtitle.style.opacity = '1';
            heroSubtitle.classList.add('u-animate-float');
        }, 1200);
    }

    if (heroBtn) {
        heroBtn.style.animationDelay = '0.4s';
        heroBtn.classList.add('u-animate-slide-up');
    }
}

function initBurgerMenu() {
    const burgerBtn = document.getElementById('burger-btn');
    const navMenu = document.getElementById('nav-menu');
    const navLinks = document.querySelectorAll('.nav__link');

    if (!burgerBtn || !navMenu) return;

    const toggleMenu = () => {
        const isActive = navMenu.classList.toggle('nav--active');
        burgerBtn.classList.toggle('header__burger--active');

        burgerBtn.setAttribute('aria-label', isActive ? 'Закрити меню' : 'Відкрити меню');

        if (isActive) {
            document.body.style.overflow = 'hidden';
            document.body.classList.add('is-scroll-locked');
        } else {
            document.body.style.overflow = '';
            document.body.classList.remove('is-scroll-locked');
        }
    };

    const closeMenu = () => {
        navMenu.classList.remove('nav--active');
        burgerBtn.classList.remove('header__burger--active');
        burgerBtn.setAttribute('aria-label', 'Відкрити меню');
        document.body.style.overflow = '';
        document.body.classList.remove('is-scroll-locked');
    };

    burgerBtn.addEventListener('click', (e) => {
        e.preventDefault();
        e.stopPropagation();
        toggleMenu();
    });

    navLinks.forEach(link => {
        link.addEventListener('click', closeMenu);
    });

    document.addEventListener('click', (e) => {
        if (!navMenu.classList.contains('nav--active')) return;

        const isClickInsideMenu = navMenu.contains(e.target);
        const isClickOnBurger = burgerBtn.contains(e.target);

        if (!isClickInsideMenu && !isClickOnBurger) {
            closeMenu();
        }
    });
}

function initPopupHandlers() {
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape') {
            const activePopup = document.querySelector('.popup--active');
            if (activePopup) {
                closePopup(activePopup.id);
            }
        }
    });
}

function openPopup(id) {
    const popup = document.getElementById(id);
    if (popup) {
        popup.classList.add('popup--active');
        document.body.classList.add('is-scroll-locked');
        document.body.style.overflow = 'hidden';
    }
}

function closePopup(id) {
    const popup = document.getElementById(id);
    const navMenu = document.getElementById('nav-menu');

    if (popup) {
        popup.classList.remove('popup--active');

        if (!navMenu || !navMenu.classList.contains('nav--active')) {
            document.body.classList.remove('is-scroll-locked');
            document.body.style.overflow = '';
        }
    }
}

window.openPopup = openPopup;
window.closePopup = closePopup;
