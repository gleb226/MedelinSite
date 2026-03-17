document.addEventListener('DOMContentLoaded', () => {
    initBurgerMenu();
    initPopupHandlers();
});

function initBurgerMenu() {
    const burgerBtn = document.getElementById('burger-btn');
    const navMenu = document.getElementById('nav-menu');

    if (burgerBtn && navMenu) {
        burgerBtn.addEventListener('click', () => {
            burgerBtn.classList.toggle('header__burger--active');
            navMenu.classList.toggle('nav--active');
            document.body.classList.toggle('no-scroll');
        });
    }
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
        document.body.classList.add('no-scroll');

        if (typeof document.body.style.overflow !== 'undefined') {
            document.body.style.overflow = 'hidden';
        }
    }
}

function closePopup(id) {
    const popup = document.getElementById(id);
    const navMenu = document.getElementById('nav-menu');

    if (popup) {
        popup.classList.remove('popup--active');

        if (!navMenu || !navMenu.classList.contains('nav--active')) {
            document.body.classList.remove('no-scroll');
            if (typeof document.body.style.overflow !== 'undefined') {
                document.body.style.overflow = '';
            }
        }
    }
}

window.openPopup = openPopup;
window.closePopup = closePopup;
