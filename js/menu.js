const ICONS_MAP = {
    'Кава': 'fa-mug-hot',
    'Декаф': 'fa-leaf',
    'Десерти': 'fa-cookie-bite',
    'Напої': 'fa-glass-martini-alt',
    'Масала': 'fa-pepper-hot',
    'Фреш': 'fa-apple-alt',
    'Чай': 'fa-leaf',
    'Мілк': 'fa-blender',
    'Матча': 'fa-mortar-pestle',
    'Какао': 'fa-hot-tub'
};

const CAT_ORDER = ['Кава', 'Декаф', 'Десерти', 'Напої', 'Масала', 'Фреш', 'Чай', 'Мілк', 'Матча', 'Какао'];

function getCatIcon(cat) {
    const cleanCat = getCleanCatName(cat);
    return `<i class="fas ${ICONS_MAP[cleanCat] || 'fa-utensils'}"></i>`;
}

function getCleanCatName(cat) {
    
    return cat.replace(/[^\w\sа-яА-ЯіїєЇЄ]/gi, '').replace(/\s+/g, ' ').trim();
}

async function fetchMenu() {
    const root = document.getElementById('menu-root');
    const subnav = document.getElementById('subnav-list');
    if (!root || !subnav) return;
    try {
        const response = await fetch(`${API_BASE_URL}/api/menu`);
        let menuData = await response.json();
        
        
        menuData = menuData.filter(s => getCleanCatName(s.category) !== 'До кави');
        
        
        menuData.sort((a, b) => {
            let idxA = CAT_ORDER.indexOf(getCleanCatName(a.category));
            let idxB = CAT_ORDER.indexOf(getCleanCatName(b.category));
            if (idxA === -1) idxA = 99;
            if (idxB === -1) idxB = 99;
            return idxA - idxB;
        });

        root.innerHTML = '';
        subnav.innerHTML = '';
        if (!menuData.length) { root.innerHTML = '<div class="no-data">Порожньо</div>'; return; }
        buildSubnav(menuData);
        buildMenu(menuData);
    } catch (e) { root.innerHTML = `<div class="error-msg">Помилка завантаження меню</div>`; }
}

function buildSubnav(menuData) {
    const list = document.getElementById('subnav-list');
    menuData.forEach((s, i) => {
        const li = document.createElement('li');
        const a = document.createElement('a');
        a.href = '#cat-' + i;
        a.className = 'menu-subnav__link';
        a.innerHTML = `${getCatIcon(s.category)} <span>${getCleanCatName(s.category)}</span>`;
        a.onclick = e => {
            e.preventDefault();
            const t = document.getElementById('cat-' + i);
            window.scrollTo({top: t.offsetTop - 120, behavior: 'smooth'});
        };
        li.appendChild(a);
        list.appendChild(li);
    });
}

function buildMenu(menuData) {
    const root = document.getElementById('menu-root');
    const defImg = 'https://images.unsplash.com/photo-1506372023823-741c83b836fe?q=80&w=1170&auto=format&fit=crop';
    menuData.forEach((section, idx) => {
        const art = document.createElement('article');
        art.className = 'category';
        art.id = 'cat-' + idx;
        art.innerHTML = `<h3 class="category__title">${getCatIcon(section.category)} ${getCleanCatName(section.category)}</h3>`;
        const grid = document.createElement('div');
        grid.className = 'products-grid';
        section.items.forEach(item => {
            const div = document.createElement('div');
            div.className = 'menu-item';
            div.innerHTML = `<div class="menu-item__image" style="background-image:url('${item.image_url || defImg}')"></div><div class="menu-item__info"><div class="menu-item__text-group"><h4 class="menu-item__title">${item.name}</h4></div><div class="menu-item__price-group"><span class="menu-item__price">${item.price} ₴</span><button class="btn-add-plus"><i class="fas fa-plus"></i></button></div></div>`;
            div.onclick = () => window.openItemPopup(item);
            grid.appendChild(div);
        });
        art.appendChild(grid);
        root.appendChild(art);
    });
}

window.openItemPopup = function(item) {
    const popupBody = document.getElementById('popup-body');
    const popupImg = document.getElementById('popup-img');
    const popupTitle = document.getElementById('popup-title');
    const popupPrice = document.getElementById('popup-price');
    const defImg = 'https://images.unsplash.com/photo-1506372023823-741c83b836fe?q=80&w=1170&auto=format&fit=crop';
    
    const baseP = parseInt(item.price, 10) || 0;
    
    if (popupImg) popupImg.src = item.image_url || defImg;
    if (popupTitle) popupTitle.textContent = item.name;
    if (popupPrice) popupPrice.innerHTML = item.price + ' ₴';

    const renderScale = (val, iconClass) => { 
        let n = Math.min(Math.round(parseFloat(val || 0)), 5); 
        if (n <= 0) return null;
        let html = '';
        for(let i=0; i<5; i++) {
            const opacity = i < n ? 1 : 0.2;
            html += `<i class="fas ${iconClass}" style="opacity: ${opacity}; margin-right: 2px; font-size: 0.8rem; color: var(--color-coffee);"></i>`;
        }
        return html;
    };
    const strength = renderScale(item.strength, 'fa-mug-hot');
    const sweetness = renderScale(item.sweetness, 'fa-cubes');

    let html = `<div class="popup__details-wrapper" style="padding: 0 2rem 2.5rem;">
        <p class="popup__description" style="margin-bottom: 1.5rem; line-height: 1.6; color: var(--color-muted); font-style: italic;">
            ${item.description || "Фірмовий продукт Medelin."}
        </p>
        
        <div class="popup__info-list" style="display: grid; gap: 0.8rem; margin-bottom: 1.5rem;">
            ${item.volume ? `<div style="display: flex; align-items: center; gap: 12px;"><i class="fas fa-mug-hot" style="color: var(--color-coffee); width: 18px;"></i><div><strong style="display: block; font-size: 0.7rem; text-transform: uppercase; color: var(--color-coffee);">Об'єм</strong>${item.volume}</div></div>` : ''}
            ${item.calories ? `<div style="display: flex; align-items: center; gap: 12px;"><i class="fas fa-fire" style="color: var(--color-coffee); width: 18px;"></i><div><strong style="display: block; font-size: 0.7rem; text-transform: uppercase; color: var(--color-coffee);">Калорійність</strong>${item.calories}</div></div>` : ''}
            ${item.composition ? `<div style="display: flex; align-items: center; gap: 12px;"><i class="fas fa-info-circle" style="color: var(--color-coffee); width: 18px;"></i><div><strong style="display: block; font-size: 0.7rem; text-transform: uppercase; color: var(--color-coffee);">Склад</strong>${item.composition}</div></div>` : ''}
        </div>`;

    if (strength || sweetness) {
        html += `<div class="scales-block" style="background: rgba(139, 94, 60, 0.05); padding: 1rem; border-radius: 15px; margin-bottom: 1.5rem;">
            ${strength ? `<div style="display: flex; justify-content: space-between; margin-bottom: 5px;"><span>Міцність</span> <span>${strength}</span></div>` : ''}
            ${sweetness ? `<div style="display: flex; justify-content: space-between;"><span>Солодкість</span> <span>${sweetness}</span></div>` : ''}
        </div>`;
    }

    if (item.options && item.options.length > 0) {
        const groups = {
            'caffeine': {title: 'Тип кави', icon: 'fa-coffee'},
            'milk': {title: 'Оберіть молоко', icon: 'fa-glass-whiskey'},
            'addon': {title: '🍽️ ➕ До кави', icon: 'fa-plus-circle'}
        };
        Object.keys(groups).forEach(type => {
            const opts = item.options.filter(o => o.type === type);
            if (opts.length > 0) {
                html += `<div style="margin-bottom: 1.2rem;">
                    <p style="font-weight: 700; font-size: 0.75rem; text-transform: uppercase; margin-bottom: 0.6rem; opacity: 0.6; display: flex; align-items: center; gap: 8px;">
                        <i class="fas ${groups[type].icon}"></i> ${groups[type].title}
                    </p>
                    <div class="choice-grid" style="display: flex; flex-wrap: wrap; gap: 8px;">`;
                opts.forEach((o, i) => {
                    const active = (type !== 'addon' && i === 0) ? 'is-active' : '';
                    html += `<div class="choice-chip ${active}" onclick="window.toggleChoice(this, ${baseP}, '${type}')" data-price="${o.add_price}" data-name="${o.name}" data-type="${type}">
                        <span class="choice-chip__label">${o.name}</span>
                        ${o.add_price > 0 ? `<span class="choice-chip__price">+${o.add_price} ₴</span>` : ''}
                    </div>`;
                });
                html += `</div></div>`;
            }
        });
    }
    html += `<button id="popup-add-btn" class="btn btn--full-width" style="margin-top: 1rem; border-radius: 50px; padding: 1.2rem; font-size: 1.1rem;" onclick="window.addMenuWithOptions('${item.id}', '${item.name.replace(/'/g, "")}', ${baseP})">🛒 Додати — ${baseP} ₴</button></div>`;
    if (popupBody) popupBody.innerHTML = html;
    openPopup('item-popup');
};

window.toggleChoice = function(el, baseP, type) {
    if (type !== 'addon') {
        el.parentElement.querySelectorAll('.choice-chip').forEach(c => c.classList.remove('is-active'));
        el.classList.add('is-active');
    } else {
        el.classList.toggle('is-active');
    }
    window.updatePopupPrice(baseP);
};

window.updatePopupPrice = function(baseP) {
    let total = baseP;
    document.querySelectorAll('.choice-chip.is-active').forEach(c => {
        total += (parseInt(c.dataset.price, 10) || 0);
    });
    document.getElementById('popup-add-btn').innerHTML = `🛒 Додати — ${total} ₴`;
};

window.addMenuWithOptions = function(id, name, baseP) {
    const selected = [];
    let total = baseP;
    document.querySelectorAll('.choice-chip.is-active').forEach(c => {
        const p = parseInt(c.dataset.price, 10) || 0;
        if (p > 0 || c.dataset.type !== 'caffeine' || c.dataset.name !== 'Звичайна') {
            selected.push(c.dataset.name);
        }
        total += p;
    });
    window.addMenuToCart(id, selected.length ? `${name} (${selected.join(', ')})` : name, total);
    closePopup('item-popup');
};

document.addEventListener('DOMContentLoaded', fetchMenu);
