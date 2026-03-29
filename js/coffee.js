async function fetchCoffee() {
    const root = document.getElementById('coffee-root');
    if (!root) return;
    root.innerHTML = '<div class="loading">Завантаження кави...</div>';
    try {
        const response = await fetch(`${API_BASE_URL}/api/coffee`, {
            headers: { 'ngrok-skip-browser-warning': 'true' }
        });
        if (!response.ok) throw new Error(`Помилка: ${response.status}`);
        const coffeeData = await response.json();
        root.innerHTML = '';
        if (!coffeeData || coffeeData.length === 0) {
            root.innerHTML = '<div class="no-data">Наразі кави немає в наявності.</div>';
            return;
        }
        buildCoffeeGrid(coffeeData);
    } catch (error) {
        console.error('Fetch error:', error);
        root.innerHTML = `<div class="error-msg">Не вдалося завантажити каву.</div>`;
    }
}

function buildCoffeeGrid(coffeeData) {
    const root = document.getElementById('coffee-root');
    const defaultImg = 'https://images.pexels.com/photos/1695052/pexels-photo-1695052.jpeg?auto=compress&cs=tinysrgb&w=400';
    const grid = document.createElement('div');
    grid.className = 'products-grid';
    coffeeData.forEach(item => {
        const art = document.createElement('article');
        art.className = 'product-card';
        const imgUrl = item.image_url || defaultImg;
        art.innerHTML = `<div class="product-card__image" style="background-image: url('${imgUrl}');"></div><div class="product-card__content"><h3 class="product-card__title">${item.name}</h3><p class="product-card__price">${item.price_250} ₴ / 250г</p></div>`;
        art.addEventListener('click', () => openCoffeePopup(item));
        grid.appendChild(art);
    });
    root.appendChild(grid);
}

function openCoffeePopup(item) {
    const popupImg = document.getElementById('popup-img');
    const popupTitle = document.getElementById('popup-title');
    const popupPrice = document.getElementById('popup-price');
    const popupBody = document.getElementById('popup-body');
    const defaultImg = 'https://images.pexels.com/photos/1695052/pexels-photo-1695052.jpeg?auto=compress&cs=tinysrgb&w=800';

    if (popupImg) popupImg.src = item.image_url || defaultImg;
    if (popupTitle) popupTitle.textContent = item.name;
    if (popupPrice) popupPrice.textContent = `Добірна свіжообсмажена кава`;

    let html = `<p class="popup__description">${item.description || ''}</p><div class="popup__details"><p><strong>Сорт:</strong> ${item.sort || '-'}</p><p><strong>Смак:</strong> ${item.taste || '-'}</p><p><strong>Обсмаження:</strong> ${item.roast || '-'}</p></div><div class="popup__weights"><div class="weight-box"><span class="weight-box__label">250г</span><span class="weight-box__price">${item.price_250} ₴</span></div><div class="weight-box"><span class="weight-box__label">500г</span><span class="weight-box__price">${item.price_500} ₴</span></div><div class="weight-box"><span class="weight-box__label">1кг</span><span class="weight-box__price">${item.price_1000} ₴</span></div></div>`;
    if (popupBody) popupBody.innerHTML = html;
    openPopup('item-popup');
}

document.addEventListener('DOMContentLoaded', fetchCoffee);
