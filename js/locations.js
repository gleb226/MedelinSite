let map;
let markers = [];

async function initLocations() {
    const gridRoot = document.getElementById('locations-grid');
    const popupsRoot = document.getElementById('popups-container');
    const socialsRoot = document.getElementById('socials-list');
    if (!gridRoot) return;

    if (document.getElementById('map')) {
        map = L.map('map').setView([48.6217, 22.2875], 13);
        L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png').addTo(map);
    }

    try {
        const response = await fetch(`${API_BASE_URL}/api/locations`, {
            headers: { 'ngrok-skip-browser-warning': 'true' }
        });
        const locations = await response.json();
        gridRoot.innerHTML = '';
        popupsRoot.innerHTML = '';

        locations.forEach((loc, index) => {
            const locId = `loc-${index}`;
            const article = document.createElement('article');
            article.className = 'product-card';
            article.setAttribute('onclick', `openPopup('${locId}')`);
            article.innerHTML = `<div class="product-card__image" style="background-image: url('${loc.image_url}')"></div><div class="product-card__content"><h3 class="product-card__title">${loc.name}</h3></div>`;
            gridRoot.appendChild(article);

            const popup = document.createElement('div');
            popup.className = 'popup';
            popup.id = locId;
            popup.innerHTML = `
                <div class="popup__overlay" onclick="closePopup('${locId}')"></div>
                <div class="popup__content">
                    <button class="popup__close" onclick="closePopup('${locId}')">✕</button>
                    <img src="${loc.image_url}" class="popup__image">
                    <h3 class="popup__title">${loc.name}</h3>
                    <div class="popup__info">
                        <p><strong>📍 Адреса:</strong> ${loc.address}</p>
                        <p><strong>⏰ Графік:</strong> ${loc.schedule}</p>
                        <p><strong>📞 Телефон:</strong> ${loc.phone}</p>
                        <a href="${loc.google_maps_url}" target="_blank" class="btn">Маршрут</a>
                    </div>
                </div>
            `;
            popupsRoot.appendChild(popup);

            if (loc.coordinates) {
                addMarkerToMap(loc, locId);
            }
        });

        const socResponse = await fetch(`${API_BASE_URL}/api/socials`, { headers: { 'ngrok-skip-browser-warning': 'true' } });
        if (socResponse.ok) {
            const socials = await socResponse.json();
            if (socialsRoot) {
                socialsRoot.innerHTML = '';
                socials.forEach(soc => {
                    const a = document.createElement('a');
                    a.href = soc.url; a.className = 'contact-card__link';
                    a.innerHTML = `<span class="contact-card__text">${soc.name}</span>`;
                    socialsRoot.appendChild(a);
                });
            }
        }
    } catch (error) {
        console.error('Error loading locations:', error);
    }
}

function addMarkerToMap(loc, locId) {
    const marker = L.marker([loc.coordinates.lat, loc.coordinates.lon]).addTo(map);
    const popupContent = `<div class="map-popup"><h3 class="map-popup__title">${loc.name}</h3><p>${loc.address}</p><a href="${loc.google_maps_url}" target="_blank" class="btn-map-route">Маршрут</a></div>`;
    marker.bindPopup(popupContent);
}

document.addEventListener('DOMContentLoaded', initLocations);
