let map;
let markers = [];

async function initLocations() {
    const gridRoot = document.getElementById('locations-grid');
    const popupsRoot = document.getElementById('popups-container');
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
            
            article.innerHTML = `
                <div class="product-card__image" style="background-image: url('${loc.image_url}')"></div>
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
                    <img src="${loc.image_url}" class="popup__image" style="height: 220px; width: 100%; object-fit: contain; background-color: #fcfaf5; border-radius: 20px 20px 0 0;">
                    
                    <div class="popup__body-inner" style="padding: 1.5rem 2rem 2.5rem;">
                        <h3 class="popup__title" style="margin: 0 0 1rem; font-size: 2rem; color: var(--color-dark-brown);">${loc.name}</h3>
                        <p class="loc-desc" style="margin-bottom: 1.5rem; line-height: 1.6; color: var(--color-muted);">${loc.atmosphere || ""}</p>
                        
                        <div class="popup__info-list" style="display: grid; gap: 0.8rem; margin-bottom: 2rem;">
                            <div style="display: flex; align-items: flex-start; gap: 12px;">
                                <i class="fas fa-map-marker-alt" style="color: var(--color-coffee); margin-top: 4px; width: 18px;"></i>
                                <div><strong style="display: block; font-size: 0.8rem; text-transform: uppercase; color: var(--color-coffee); letter-spacing: 1px;">Адреса</strong>${loc.address}</div>
                            </div>
                            <div style="display: flex; align-items: flex-start; gap: 12px;">
                                <i class="fas fa-clock" style="color: var(--color-coffee); margin-top: 4px; width: 18px;"></i>
                                <div><strong style="display: block; font-size: 0.8rem; text-transform: uppercase; color: var(--color-coffee); letter-spacing: 1px;">Графік</strong>${loc.schedule}</div>
                            </div>
                            <div style="display: flex; align-items: flex-start; gap: 12px;">
                                <i class="fas fa-phone-alt" style="color: var(--color-coffee); margin-top: 4px; width: 18px;"></i>
                                <div><strong style="display: block; font-size: 0.8rem; text-transform: uppercase; color: var(--color-coffee); letter-spacing: 1px;">Телефон</strong>${loc.phone}</div>
                            </div>
                        </div>
                        
                        <div class="amenities-tags" style="display: flex; flex-wrap: wrap; gap: 8px; margin-bottom: 2rem;">
                            ${(loc.amenities || []).map(a => `<span class="tag" style="background: rgba(139, 94, 60, 0.08); color: var(--color-coffee); padding: 6px 14px; border-radius: 50px; font-size: 0.85rem; font-weight: 600;">${a}</span>`).join('')}
                        </div>
                        
                        <a href="${loc.google_maps_url}" target="_blank" class="btn btn--full-width" style="padding: 1.2rem; font-size: 1.1rem; letter-spacing: 0.5px; border-radius: 50px;">📍 Прокласти маршрут</a>
                    </div>
                </div>
            `;
            popupsRoot.appendChild(popup);

            if (loc.coordinates) {
                addMarkerToMap(loc, locId);
            }
        });

    } catch (error) {
        console.error('Error loading locations:', error);
    }
}

const SOCIAL_ICONS = {
    'instagram': 'fa-brands fa-instagram',
    'facebook': 'fa-brands fa-facebook-f',
    'email': 'fa-solid fa-envelope',
    'phone': 'fa-solid fa-phone',
    'github': 'fa-brands fa-github',
    'tiktok': 'fa-brands fa-tiktok',
    'telegram': 'fa-brands fa-telegram',
    'viber': 'fa-brands fa-viber',
    'youtube': 'fa-brands fa-youtube',
    'threads': 'fa-brands fa-threads',
    'whatsapp': 'fa-brands fa-whatsapp'
};

async function initSocials() {
    const socialsRoot = document.getElementById('socials-list');
    const footerSocials = document.getElementById('footer-socials');
    if (!socialsRoot && !footerSocials) return;

    try {
        const response = await fetch(`${API_BASE_URL}/api/socials`, {
            headers: { 'ngrok-skip-browser-warning': 'true' }
        });
        const socials = await response.json();

        if (socialsRoot) {
            socialsRoot.innerHTML = '<div class="contact-social-flex"></div>';
            const container = socialsRoot.querySelector('.contact-social-flex');
            
            socials.forEach(soc => {
                const nameKey = soc.name.toLowerCase().trim();
                let iconClass = SOCIAL_ICONS[nameKey] || 'fa-solid fa-link';
                
                const a = document.createElement('a');
                a.href = soc.url;
                a.className = 'social-icon social-icon--premium';
                a.target = '_blank';
                a.title = soc.name;
                a.innerHTML = `<i class="${iconClass}"></i><span class="social-icon__label">${soc.name}</span>`;
                container.appendChild(a);
            });
        }

        if (footerSocials) {
            footerSocials.innerHTML = '';
            socials.forEach(soc => {
                const a = document.createElement('a');
                a.href = soc.url;
                a.target = '_blank';
                a.rel = 'noopener noreferrer';
                a.className = 'footer__link';
                const nameKey = soc.name.toLowerCase().trim();
                const iconClass = SOCIAL_ICONS[nameKey] || 'fas fa-link';
                a.innerHTML = `<i class="${iconClass}" style="margin-right:5px; font-size:0.9em;"></i>${soc.name}`;
                a.style.marginRight = '15px';
                a.style.display = 'inline-flex';
                a.style.alignItems = 'center';
                footerSocials.appendChild(a);
            });
        }
    } catch (error) {
        console.error('Error loading socials:', error);
    }
}

function addMarkerToMap(loc, locId) {
    const coffeeIcon = L.divIcon({
        className: 'custom-map-pin',
        html: `<div class="pin-droplet"><span class="pin-icon">☕</span></div>`,
        iconSize: [40, 40],
        iconAnchor: [20, 40],
        popupAnchor: [0, -40]
    });
    const marker = L.marker([loc.coordinates.lat, loc.coordinates.lon], {icon: coffeeIcon}).addTo(map);
    const popupContent = `
        <div class="map-popup" style="padding: 0; min-width: 220px; overflow: hidden; border-radius: 12px;">
            <img src="${loc.image_url}" style="width: 100%; height: 120px; object-fit: contain; background-color: #fcfaf5; display: block; margin-bottom: 10px; border-radius: 12px 12px 0 0;">
            <div style="padding: 0 12px 12px;">
                <h3 class="map-popup__title" style="margin: 0 0 5px; font-size: 1.2rem; font-family: var(--font-accent); color: var(--color-dark-brown);">${loc.name}</h3>
                <p style="margin: 0 0 12px; font-size: 0.85rem; color: var(--color-muted); line-height: 1.4;">${loc.address}</p>
                <a href="${loc.google_maps_url}" target="_blank" class="btn-map-route" style="display: flex; align-items: center; justify-content: center; background: var(--color-coffee); color: #fff; padding: 10px 20px; border-radius: 50px; text-decoration: none; font-weight: 700; font-size: 0.85rem; transition: 0.3s; text-transform: uppercase; letter-spacing: 0.5px;">Прокласти маршрут</a>
            </div>
        </div>
    `;
    marker.bindPopup(popupContent);
}

document.addEventListener('DOMContentLoaded', () => {
    initLocations();
    initSocials();
});
