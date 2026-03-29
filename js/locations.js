const PRODUCTION_API_URL = 'https://medelin-api.onrender.com';
let API_BASE_URL = PRODUCTION_API_URL;

if (window.location.hostname === 'localhost' || window.location.hostname === '127.0.0.1' || window.location.hostname.includes('192.168.')) {
    API_BASE_URL = 'http://localhost:8000';
}

let map;
let markers = [];

async function initLocations() {
    const gridRoot = document.getElementById('locations-grid');
    const popupsRoot = document.getElementById('popups-container');
    const socialsRoot = document.getElementById('socials-list');

    if (!gridRoot) return;

    if (document.getElementById('map')) {
        map = L.map('map').setView([48.6217, 22.2875], 13);
        L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
            attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        }).addTo(map);
    }

    try {
        const response = await fetch(`${API_BASE_URL}/api/locations`);
        if (!response.ok) throw new Error('Failed to fetch locations');
        const locations = await response.json();

        gridRoot.innerHTML = '';
        popupsRoot.innerHTML = '';

        if (locations.length === 0) {
            gridRoot.innerHTML = '<div class="no-data">Локації не знайдені.</div>';
        } else {
            locations.forEach((loc, index) => {
                const locId = `loc-${loc.id || index}`;
                
                const article = document.createElement('article');
                article.className = 'product-card';
                article.setAttribute('onclick', `openPopup('${locId}')`);
                article.innerHTML = `
                    <div class="product-card__image" style="background-image: url('${loc.image_url || 'https://images.unsplash.com/photo-1554118811-1e0d58224f24?w=800&q=80'}');" aria-label="Інтер'єр ${loc.name}"></div>
                    <div class="product-card__content">
                        <h3 class="product-card__title">${loc.name}</h3>
                    </div>
                `;
                gridRoot.appendChild(article);

                const popup = document.createElement('div');
                popup.className = 'popup';
                popup.id = locId;
                popup.innerHTML = `
                    <div class="popup__overlay" onclick="closePopup('${locId}')"></div>
                    <div class="popup__content">
                        <button class="popup__close" onclick="closePopup('${locId}')">✕</button>
                        <img src="${loc.image_url || 'https://images.unsplash.com/photo-1554118811-1e0d58224f24?w=800&q=80'}" class="popup__image" alt="${loc.name}">
                        <h3 class="popup__title">${loc.name}</h3>
                        <div class="popup__info">
                            <p class="popup__info-text"><strong>📍 Адреса:</strong> ${loc.address}</p>
                            <p class="popup__info-text"><strong>⏰ Графік:</strong> ${loc.schedule}</p>
                            <p class="popup__info-text"><strong>📞 Телефон:</strong> <a href="tel:${loc.phone}">${loc.phone}</a></p>
                            ${loc.email ? `<p class="popup__info-text"><strong>✉️ Email:</strong> <a href="mailto:${loc.email}">${loc.email}</a></p>` : ''}
                            <a href="${loc.google_maps_url}" target="_blank" rel="noopener noreferrer" class="btn btn--route">Побудувати маршрут</a>
                        </div>
                    </div>
                `;
                popupsRoot.appendChild(popup);

                if (loc.coordinates && loc.coordinates.lat && loc.coordinates.lon) {
                    addMarkerToMap(loc, locId);
                }
            });
        }

        const socResponse = await fetch(`${API_BASE_URL}/api/socials`);
        if (socResponse.ok) {
            const socials = await socResponse.json();
            if (socialsRoot) {
                socialsRoot.innerHTML = '';
                if (socials.length === 0) {
                    socialsRoot.innerHTML = '<p class="footer__text">Контакти оновлюються...</p>';
                } else {
                    socials.forEach(soc => {
                        const link = document.createElement('a');
                        link.href = soc.url;
                        link.target = '_blank';
                        link.rel = 'noopener noreferrer';
                        link.className = 'contact-card__link';
                        
                        let icon = '🔗';
                        const lowerName = soc.name.toLowerCase();
                        if (lowerName.includes('instagram')) icon = '📸';
                        else if (lowerName.includes('facebook')) icon = '🔵';
                        else if (lowerName.includes('phone') || lowerName.includes('тел')) icon = '📞';
                        else if (lowerName.includes('mail') || lowerName.includes('email')) icon = '✉️';

                        link.innerHTML = `
                            <span class="contact-card__icon">${icon}</span>
                            <span class="contact-card__text">${soc.name}</span>
                        `;
                        socialsRoot.appendChild(link);
                    });
                }
            }
        }

    } catch (error) {
        console.error('Error loading locations:', error);
        if (gridRoot) gridRoot.innerHTML = '<div class="error-msg">Не вдалося завантажити локації.</div>';
    }
}

function addMarkerToMap(loc, locId) {
    const customIcon = L.divIcon({
        className: 'custom-map-marker',
        html: '<div class="custom-map-marker__pin"><div class="custom-map-marker__dot">☕</div></div>',
        iconSize: [40, 40],
        iconAnchor: [20, 40],
        popupAnchor: [0, -40]
    });

    const marker = L.marker([loc.coordinates.lat, loc.coordinates.lon], { icon: customIcon }).addTo(map);
    
    const popupContent = `
        <div class="map-popup">
            <div class="map-popup__header" style="background-image: url('${loc.image_url || 'https://images.unsplash.com/photo-1554118811-1e0d58224f24?w=400&q=80'}');"></div>
            <div class="map-popup__body">
                <h3 class="map-popup__title">${loc.name}</h3>
                <p class="map-popup__address"><span>📍</span> ${loc.address}</p>
                <div class="map-popup__footer">
                    <a href="${loc.google_maps_url}" target="_blank" rel="noopener noreferrer" class="btn-map-route">Прокласти маршрут</a>
                </div>
            </div>
        </div>
    `;
    
    marker.bindPopup(popupContent, {
        maxWidth: 260,
        className: 'modern-popup'
    });
}

document.addEventListener('DOMContentLoaded', initLocations);
