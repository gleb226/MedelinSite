const PRODUCTION_API_URL = 'https://medelin-api.onrender.com'; 

let API_BASE_URL = PRODUCTION_API_URL;

if (window.location.hostname === 'localhost' || window.location.hostname === '127.0.0.1') {
    API_BASE_URL = 'http://localhost:8000';
}

const EMOJI_MAP = {
    'Кава': '☕',
    'До Кави': '➕',
    'Декаф': '🌿',
    'Кава На Альтернативному': '🥛',
    'Десерти': '🍰',
    'Напої': '🥤',
    'Масала': '🌶️',
    'Фреш': '🍹',
    'Чай': '🍵',
    'Мілк': '🍼',
    'Матча': '🍃',
    'Какао': '🍫',
    'Кава в зернах': '📦'
};

function getCatWithEmoji(cat) {
    let catS = cat.trim();
    
    for (const emoji of Object.values(EMOJI_MAP)) {
        catS = catS.replace(emoji, "").trim();
    }
    const emoji = EMOJI_MAP[catS] || '🍽️';
    return `${emoji} ${catS}`;
}

async function fetchMenu() {
    const root = document.getElementById('menu-root');
    const subnav = document.getElementById('subnav-list');
    
    if (!root || !subnav) return;

    root.innerHTML = '<div class="loading">Завантаження меню...</div>';

    try {
        const response = await fetch(`${API_BASE_URL}/api/menu`, {
            method: 'GET',
            mode: 'cors',
            headers: { 'Accept': 'application/json' }
        });

        if (!response.ok) throw new Error(`Помилка: ${response.status}`);
        
        const menuData = await response.json();
        
        root.innerHTML = '';
        subnav.innerHTML = '';

        if (!menuData || menuData.length === 0) {
            root.innerHTML = '<div class="no-data">Меню порожнє.</div>';
            return;
        }

        buildSubnav(menuData);
        buildMenu(menuData);
        initMenuObserver();

    } catch (error) {
        console.error('Fetch error:', error);
        root.innerHTML = `<div class="error-msg">Не вдалося завантажити меню. <br> <small>Переконайтеся, що бот запущений.</small></div>`;
    }
}

function buildSubnav(menuData) {
    const list = document.getElementById('subnav-list');
    menuData.forEach((section, i) => {
        const li = document.createElement('li');
        const a = document.createElement('a');
        a.href = '#cat-' + i;
        a.className = 'menu-subnav__link';
        a.textContent = getCatWithEmoji(section.category);
        a.dataset.idx = String(i);
        a.addEventListener('click', e => {
            e.preventDefault();
            const target = document.getElementById('cat-' + i);
            if (target) {
                const headerHeight = document.querySelector('.header').offsetHeight;
                const subnavHeight = document.querySelector('.menu-subnav').offsetHeight;
                const offset = target.offsetTop - headerHeight - subnavHeight - 20;
                window.scrollTo({top: offset, behavior: 'smooth'});
            }
        });
        li.appendChild(a);
        list.appendChild(li);
    });
}

function buildMenu(menuData) {
    const root = document.getElementById('menu-root');
    const defaultImg = 'https://images.pexels.com/photos/302899/pexels-photo-302899.jpeg?auto=compress&cs=tinysrgb&w=400';

    menuData.forEach((section, idx) => {
        const art = document.createElement('article');
        art.className = 'category';
        art.id = 'cat-' + idx;
        art.innerHTML = `<h3 class="category__title">${getCatWithEmoji(section.category)}</h3>`;

        if (section.simple) {
            const list = document.createElement('ul');
            list.className = 'menu-list';
            section.items.forEach(item => {
                const li = document.createElement('li');
                li.className = 'menu-list__item';
                li.innerHTML = `
                    <span class="menu-list__name">${item.name}</span>
                    <span class="menu-list__price">${item.price}</span>`;
                list.appendChild(li);
            });
            art.appendChild(list);
        } else {
            const grid = document.createElement('div');
            grid.className = 'products-grid'; 
            
            section.items.forEach(item => {
                const div = document.createElement('div');
                div.className = 'menu-item';
                const imgUrl = item.image_url || defaultImg;
                
                div.innerHTML = `
                    <div class="menu-item__image" style="background-image:url('${imgUrl}')"></div>
                    <div class="menu-item__info">
                        <h4 class="menu-item__title">${item.name}</h4>
                        <span class="menu-item__price">${item.price}</span>
                    </div>`;
                
                div.addEventListener('click', () => openItemPopup(item));
                grid.appendChild(div);
            });
            art.appendChild(grid);
        }
        root.appendChild(art);
    });
}

function openItemPopup(item) {
    const popupImg = document.getElementById('popup-img');
    const popupTitle = document.getElementById('popup-title');
    const popupPrice = document.getElementById('popup-price');
    const popupBody = document.getElementById('popup-body');
    const defaultImg = 'https://images.pexels.com/photos/302899/pexels-photo-302899.jpeg?auto=compress&cs=tinysrgb&w=640';

    if (popupImg) popupImg.src = item.image_url || defaultImg;
    if (popupTitle) popupTitle.textContent = item.name;
    if (popupPrice) popupPrice.textContent = item.price;

    let html = `<p class="popup__description">${item.description || ''}</p>`;

    if (item.volume || item.calories) {
        html += `<div class="popup__details">`;
        if (item.volume) html += `<p class="popup__details-text"><strong class="popup__details-label">📏 Об'єм/Вага:</strong> ${item.volume}</p>`;
        if (item.calories) html += `<p class="popup__details-text"><strong class="popup__details-label">🔥 Калорійність:</strong> ${item.calories}</p>`;
        html += `</div>`;
    }

    if (popupBody) popupBody.innerHTML = html;

    if (typeof openPopup === 'function') {
        openPopup('item-popup');
    } else {
        const p = document.getElementById('item-popup');
        if (p) p.classList.add('popup--active');
    }
}

function initMenuObserver() {
    if (!('IntersectionObserver' in window)) return;
    
    const observer = new IntersectionObserver(entries => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const idx = entry.target.id.replace('cat-', '');
                const subnavList = document.getElementById('subnav-list');
                const active = document.querySelector(`.menu-subnav__link[data-idx="${idx}"]`);

                if (active && subnavList) {
                    document.querySelectorAll('.menu-subnav__link').forEach(a => a.classList.remove('menu-subnav__link--active'));
                    active.classList.add('menu-subnav__link--active');
                    const offset = active.offsetLeft - (subnavList.clientWidth / 2) + (active.clientWidth / 2);
                    subnavList.scrollTo({left: offset, behavior: 'smooth'});
                }
            }
        });
    }, {rootMargin: '-20% 0px -70% 0px', threshold: 0});

    document.querySelectorAll('[id^="cat-"]').forEach(el => observer.observe(el));
}

document.addEventListener('DOMContentLoaded', fetchMenu);
