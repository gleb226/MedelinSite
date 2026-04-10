async function fetchCoffee() {
    const root = document.getElementById('coffee-root');
    if (!root) return;
    try {
        const response = await fetch(`${API_BASE_URL}/api/coffee`);
        const coffeeData = await response.json();
        root.innerHTML = '';
        if (!coffeeData.length) { root.innerHTML = '<div class="no-data">Порожньо</div>'; return; }
        buildCoffeeGrid(coffeeData);
    } catch (e) { root.innerHTML = `<div class="error-msg">Помилка завантаження</div>`; }
}

function buildCoffeeGrid(coffeeData) {
    const root = document.getElementById('coffee-root');
    const defImg = 'https://images.unsplash.com/photo-1447933601403-0c6688de566e?q=80&w=1061&auto=format&fit=crop';
    const grid = document.createElement('div'); 
    grid.className = 'products-grid';
    
    coffeeData.forEach(item => {
        const art = document.createElement('article'); 
        art.className = 'product-card';
        
        
        let displayName = item.name.replace(/Blend Mixed/gi, '').trim();
        
        art.innerHTML = `
            <div class="product-card__image" style="background-image: url('${item.image_url || defImg}');"></div>
            <div class="product-card__content">
                <h3 class="product-card__title">${displayName}</h3>
                <div style="display:flex; justify-content:space-between; align-items:center; margin-top:15px;">
                    <span class="product-card__price">${item.price_250} ₴</span>
                    <button class="btn-add-plus"><i class="fas fa-plus"></i></button>
                </div>
            </div>`;
        art.onclick = () => openCoffeePopup(item); 
        grid.appendChild(art);
    });
    root.appendChild(grid);
}

function openCoffeePopup(item) {
    const popupBody = document.getElementById('popup-body');
    const popupImg = document.getElementById('popup-img');
    const popupTitle = document.getElementById('popup-title');
    const defImg = 'https://images.unsplash.com/photo-1447933601403-0c6688de566e?q=80&w=1061&auto=format&fit=crop';
    
    let displayName = item.name.replace(/Blend Mixed/gi, '').trim();
    
    if (popupImg) popupImg.src = item.image_url || defImg;
    if (popupTitle) popupTitle.textContent = displayName;
    
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

    const acidity = renderScale(item.acidity, 'fa-lemon');
    const bitterness = renderScale(item.bitterness, 'fa-mug-hot');
    const body = renderScale(item.body, 'fa-circle');

    let html = `
    <div class="popup__body-inner" style="padding: 0 2rem 2.5rem;">
        <p class="popup__description" style="margin: 0 0 1.5rem; line-height: 1.6; color: var(--color-muted); font-style: italic;">
            ${item.description || "Преміальна свіжообсмажена кава Medelin."}
        </p>
        <div class="popup__info-list" style="display: grid; grid-template-columns: 1fr 1fr; gap: 1rem; margin-bottom: 2rem;">
            ${item.altitude ? `<div style="display: flex; align-items: flex-start; gap: 12px;"><i class="fas fa-mountain" style="color: var(--color-coffee); margin-top: 4px; width: 18px;"></i><div><strong style="display: block; font-size: 0.75rem; text-transform: uppercase; color: var(--color-coffee); letter-spacing: 1px;">Висота</strong>${item.altitude}</div></div>` : ''}
            ${item.sort ? `<div style="display: flex; align-items: flex-start; gap: 12px;"><i class="fas fa-seedling" style="color: var(--color-coffee); margin-top: 4px; width: 18px;"></i><div><strong style="display: block; font-size: 0.75rem; text-transform: uppercase; color: var(--color-coffee); letter-spacing: 1px;">Сорт</strong>${item.sort}</div></div>` : ''}
            ${item.processing ? `<div style="display: flex; align-items: flex-start; gap: 12px;"><i class="fas fa-cogs" style="color: var(--color-coffee); margin-top: 4px; width: 18px;"></i><div><strong style="display: block; font-size: 0.75rem; text-transform: uppercase; color: var(--color-coffee); letter-spacing: 1px;">Обробка</strong>${item.processing}</div></div>` : ''}
            ${item.roast ? `<div style="display: flex; align-items: flex-start; gap: 12px;"><i class="fas fa-fire" style="color: var(--color-coffee); margin-top: 4px; width: 18px;"></i><div><strong style="display: block; font-size: 0.75rem; text-transform: uppercase; color: var(--color-coffee); letter-spacing: 1px;">Обсмаження</strong>${item.roast}</div></div>` : ''}
            ${item.variety ? `<div style="display: flex; align-items: flex-start; gap: 12px;"><i class="fas fa-leaf" style="color: var(--color-coffee); margin-top: 4px; width: 18px;"></i><div><strong style="display: block; font-size: 0.75rem; text-transform: uppercase; color: var(--color-coffee); letter-spacing: 1px;">Різновид</strong>${item.variety}</div></div>` : ''}
            ${item.cup_score ? `<div style="display: flex; align-items: flex-start; gap: 12px;"><i class="fas fa-award" style="color: var(--color-coffee); margin-top: 4px; width: 18px;"></i><div><strong style="display: block; font-size: 0.75rem; text-transform: uppercase; color: var(--color-coffee); letter-spacing: 1px;">Cup Score</strong>${item.cup_score}</div></div>` : ''}
            ${item.harvest ? `<div style="display: flex; align-items: flex-start; gap: 12px;"><i class="fas fa-calendar-alt" style="color: var(--color-coffee); margin-top: 4px; width: 18px;"></i><div><strong style="display: block; font-size: 0.75rem; text-transform: uppercase; color: var(--color-coffee); letter-spacing: 1px;">Врожай</strong>${item.harvest}</div></div>` : ''}
            ${item.taste ? `<div style="grid-column: span 2; display: flex; align-items: flex-start; gap: 12px;"><i class="fas fa-magic" style="color: var(--color-coffee); margin-top: 4px; width: 18px;"></i><div><strong style="display: block; font-size: 0.75rem; text-transform: uppercase; color: var(--color-coffee); letter-spacing: 1px;">Смаковий профіль</strong>${item.taste}</div></div>` : ''}
            ${item.recommendation ? `<div style="grid-column: span 2; display: flex; align-items: flex-start; gap: 12px; background: rgba(139, 94, 60, 0.05); padding: 10px; border-radius: 10px;"><i class="fas fa-lightbulb" style="color: var(--color-coffee); margin-top: 4px; width: 18px;"></i><div style="font-size: 0.9rem; color: var(--color-dark-brown); font-style: italic;">${item.recommendation}</div></div>` : ''}
        </div>
        <div class="scales-block" style="background: rgba(139, 94, 60, 0.05); padding: 1.2rem; border-radius: 15px; margin-bottom: 2rem;">
            ${acidity ? `<div style="display: flex; justify-content: space-between; margin-bottom: 8px;"><span>Кислинка</span> <span>${acidity}</span></div>` : ''}
            ${bitterness ? `<div style="display: flex; justify-content: space-between; margin-bottom: 8px;"><span>Гірчинка</span> <span>${bitterness}</span></div>` : ''}
            ${body ? `<div style="display: flex; justify-content: space-between;"><span>Тіло</span> <span>${body}</span></div>` : ''}
        </div>
        <div class="popup__weights-selection" style="display:grid; grid-template-columns: 1fr 1fr 1fr; gap:12px; margin-bottom: 2rem;">
            <label class="weight-label" style="border: 2px solid rgba(139, 94, 60, 0.2); border-radius: 16px; padding: 12px; cursor: pointer; text-align:center; background: #fff;">
                <input type="radio" name="bean_weight_${item.id}" value="250" data-price="${item.price_250}" checked style="display:none;"><div style="font-weight:700; font-size: 0.8rem; color: var(--color-muted);">250г</div><div style="font-size:1.1rem; color:var(--color-coffee); font-weight:800; margin-top:4px;">${item.price_250}₴</div>
            </label>
            <label class="weight-label" style="border: 2px solid rgba(139, 94, 60, 0.2); border-radius: 16px; padding: 12px; cursor: pointer; text-align:center; background: #fff;">
                <input type="radio" name="bean_weight_${item.id}" value="500" data-price="${item.price_500}" style="display:none;"><div style="font-weight:700; font-size: 0.8rem; color: var(--color-muted);">500г</div><div style="font-size:1.1rem; color:var(--color-coffee); font-weight:800; margin-top:4px;">${item.price_500}₴</div>
            </label>
            <label class="weight-label" style="border: 2px solid rgba(139, 94, 60, 0.2); border-radius: 16px; padding: 12px; cursor: pointer; text-align:center; background: #fff;">
                <input type="radio" name="bean_weight_${item.id}" value="1000" data-price="${item.price_1000}" style="display:none;"><div style="font-weight:700; font-size: 0.8rem; color: var(--color-muted);">1кг</div><div style="font-size:1.1rem; color:var(--color-coffee); font-weight:800; margin-top:4px;">${item.price_1000}₴</div>
            </label>
        </div>
        <button class="btn btn--full-width" style="padding: 1.2rem; border-radius: 50px;" onclick="addBeanToCart('${item.id}', '${item.name.replace(/'/g, "")}', 'bean_weight_${item.id}')">🛒 Додати до кошика</button>
    </div>`;
    if (popupBody) popupBody.innerHTML = html;
    openPopup('item-popup');
}
document.addEventListener('DOMContentLoaded', fetchCoffee);
