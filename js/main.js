const isLocal = window.location.hostname === 'localhost' || window.location.hostname === '127.0.0.1';
window.API_BASE_URL = isLocal ? 'http://localhost:8000' : window.location.origin;
let cart_menu = JSON.parse(localStorage.getItem('cart_menu') || '[]');
let cart_beans = JSON.parse(localStorage.getItem('cart_beans') || '[]');
const contactStorageKey = 'medelin_contact_details';
function getSavedContactDetails() { try { return JSON.parse(localStorage.getItem(contactStorageKey) || '{}'); } catch (e) { return {}; } }
function saveContactDetails(details) { const current = getSavedContactDetails(); localStorage.setItem(contactStorageKey, JSON.stringify({...current, ...details})); }
function normalizePhone(phone) { const digits = String(phone || '').replace(/\D/g, ''); if (digits.startsWith('380') && digits.length === 12) return digits; if (digits.startsWith('80') && digits.length === 11) return `3${digits}`; if (digits.startsWith('0') && digits.length === 10) return `38${digits}`; return digits; }
function formatPhone(phone) { const digits = normalizePhone(phone); if (digits.length === 12 && digits.startsWith('380')) { return `+${digits.slice(0, 2)} (${digits.slice(2, 5)}) ${digits.slice(5, 8)}-${digits.slice(8, 10)}-${digits.slice(10, 12)}`; } return phone || ''; }
function attachPhoneMask(input) { if (!input) return; input.addEventListener('input', () => { const digits = normalizePhone(input.value); input.value = formatPhone(digits); }); }
document.addEventListener('DOMContentLoaded', () => { initBurgerMenu(); initPopupHandlers(); initScrollReveal(); initHeroAnimations(); initCartUI(); initGuestNotifications().catch(() => {}); });

function initCartUI() {
    const isMenuPage = !!document.getElementById('menu-root');
    const isBeansPage = !!document.getElementById('coffee-root');
    
    
    if (!isMenuPage && !isBeansPage) return;
    
    let fab = document.getElementById('cart-fab') || document.createElement('div');
    fab.id = 'cart-fab'; fab.className = 'cart-fab'; 
    fab.style.zIndex = "10001"; 
    fab.innerHTML = `<i class="fas fa-shopping-cart"></i><span class="cart-badge" id="cart-badge">0</span>`;
    if (!document.getElementById('cart-fab')) document.body.appendChild(fab);
    
    fab.onclick = () => {
        if (isBeansPage) window.openCartModal('beans');
        else if (isMenuPage) window.openCartModal('menu');
    };
    updateCartBadge();
}

function updateCartBadge() { 
    const badge = document.getElementById('cart-badge'); 
    if (!badge) return; 
    const isBeansPage = !!document.getElementById('coffee-root'); 
    const isMenuPage = !!document.getElementById('menu-root');
    
    let count = 0;
    if (isBeansPage) count = cart_beans.length;
    else if (isMenuPage) count = cart_menu.length;
    
    badge.textContent = count; 
    badge.classList.toggle('active', count > 0); 
}

window.openBookingWizard = async function(e) {
    if(e) e.preventDefault();
    let locOpts = '<option value="">Оберіть заклад...</option>';
    try { 
        const res = await fetch(`${API_BASE_URL}/api/locations`); 
        const locs = await res.json(); 
        locs.forEach(l => { locOpts += `<option value="${l.address}">${l.name}</option>`; }); 
    } catch (err) {}

    const saved = getSavedContactDetails();
    const html = `
        <div class="booking-modal__overlay" onclick="window.closeBookingWizard()"></div>
        <div class="booking-modal__content">
            <button onclick="window.closeBookingWizard()" class="booking-modal__close">✕</button>
            <h2 style="font-family:var(--font-accent); color:var(--color-coffee); text-align:center;">Бронювання</h2>
            <div class="booking-form">
                <input type="text" id="bk_name" placeholder="Ваше ім'я*" value="${saved.name || ''}">
                <input type="tel" id="bk_phone" placeholder="Номер телефону*" value="${saved.phone || ''}">
                <select id="bk_loc">${locOpts}</select>
                <div style="display:grid; grid-template-columns: 1fr 1fr; gap:10px;">
                    <input type="date" id="bk_date">
                    <input type="time" id="bk_time">
                </div>
                <input type="number" id="bk_guests" placeholder="Кількість осіб*" min="1">
                <textarea id="bk_wishes" placeholder="Ваші побажання..." rows="3"></textarea>
                <button onclick="window.submitBooking(this)" class="btn btn--full-width">ЗАБРОНЮВАТИ</button>
            </div>
        </div>
    `;
    let c = document.getElementById('booking-modal-container') || document.createElement('div');
    c.id = 'booking-modal-container';
    document.body.appendChild(c);
    c.innerHTML = html;
    document.body.style.overflow = 'hidden';
    attachPhoneMask(document.getElementById('bk_phone'));
};

window.closeBookingWizard = function() {
    const c = document.getElementById('booking-modal-container');
    if(c) c.remove();
    document.body.style.overflow = '';
};

window.submitBooking = async function(btn) {
    const name = document.getElementById('bk_name').value.trim();
    const phone = document.getElementById('bk_phone').value.trim();
    const loc = document.getElementById('bk_loc').value;
    const date = document.getElementById('bk_date').value;
    const time = document.getElementById('bk_time').value;
    const guests = document.getElementById('bk_guests').value;
    const wishes = document.getElementById('bk_wishes').value.trim();

    if (!name || !phone || !loc || !date || !time || !guests) return alert("Будь ласка, заповніть усі обов'язкові поля.");
    
    btn.disabled = true; btn.innerText = "ОБРОБКА...";
    try {
        saveContactDetails({name, phone: formatPhone(phone)});
        const res = await fetch(`${API_BASE_URL}/api/booking`, {
            method: 'POST',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify({ name, phone: formatPhone(phone), location: loc, date, time, guests, wishes })
        });
        if (!res.ok) throw new Error("Помилка при бронюванні");
        alert("✅ Ваш запит на бронювання прийнято! Очікуйте повідомлення.");
        window.closeBookingWizard();
    } catch (e) {
        alert("❌ " + e.message);
        btn.disabled = false; btn.innerText = "ЗАБРОНЮВАТИ";
    }
};
window.addMenuToCart = function(id, name, price) { cart_menu.push({id, name, price: parseInt(price)}); localStorage.setItem('cart_menu', JSON.stringify(cart_menu)); updateCartBadge(); closePopup('item-popup'); }
window.addBeanToCart = function(id, name, inputName) {
    const r = document.querySelector(`input[name="${inputName}"]:checked`);
    if(!r) return;
    cart_beans.push({id, name, weight: r.value, price: parseInt(r.dataset.price)});
    localStorage.setItem('cart_beans', JSON.stringify(cart_beans)); updateCartBadge(); closePopup('item-popup');
}
window.openCartModal = function(type) {
    const items = type === 'menu' ? cart_menu : cart_beans;
    let html = `<div class="cart-modal__overlay" onclick="closeCartModal()"></div><div class="cart-modal__content"><button onclick="closeCartModal()" class="cart-modal__close">✕</button><h2>🛒 ${type === 'menu' ? 'Меню' : 'Кава'}</h2>`;
    if (!items.length) html += `<p style="text-align:center;">Кошик порожній</p>`;
    else {
        html += `<ul class="cart-modal__list">`;
        let total = 0;
        items.forEach((item, i) => { total += item.price; html += `<li><div><span>${item.name}</span>${item.weight ? `<small>${item.weight}г</small>` : ''}</div><div class="cart-item-end"><span>${item.price} ₴</span><button onclick="removeFromCart('${type}', ${i})"><i class="fas fa-trash-alt"></i></button></div></li>`; });
        html += `</ul><div class="cart-modal__total"><span>Сума:</span><span>${total} ₴</span></div><button onclick="window.openCheckoutWizard('${type}')" class="btn btn--full-width">ОФОРМИТИ</button>`;
    }
    html += `</div>`;
    let c = document.getElementById('cart-modal-container') || document.createElement('div');
    c.id = 'cart-modal-container'; document.body.appendChild(c); c.innerHTML = html; document.body.style.overflow = 'hidden';
}
window.closeCartModal = function() { const c = document.getElementById('cart-modal-container'); if(c) c.innerHTML = ''; document.body.style.overflow = ''; }
window.removeFromCart = function(type, index) { if(type === 'menu') cart_menu.splice(index, 1); else cart_beans.splice(index, 1); localStorage.setItem(type === 'menu' ? 'cart_menu' : 'cart_beans', JSON.stringify(type === 'menu' ? cart_menu : cart_beans)); updateCartBadge(); window.openCartModal(type); }
window.openCheckoutWizard = async function(cartType) {
    const items = cartType === 'menu' ? cart_menu : cart_beans; if (!items.length) return alert("Порожньо!");
    const saved = getSavedContactDetails();
    let locOpts = '<option value="">Оберіть заклад...</option>';
    try { const res = await fetch(`${API_BASE_URL}/api/locations`); const locs = await res.json(); locs.forEach(l => { locOpts += `<option value="${l.address}">${l.name} — ${l.address}</option>`; }); } catch (e) {}
    const isM = cartType === 'menu';
    const html = `<div class="cart-modal__overlay" onclick="window.closeCartModal()"></div><div class="cart-modal__content"><button onclick="window.closeCartModal()" class="cart-modal__close">×</button><h2>Оформлення</h2><div class="checkout-form">
        <input type="text" id="chk_name" placeholder="Ім'я*" value="${saved.name || ''}">
        ${!isM ? `<input type="tel" id="chk_phone" placeholder="Телефон*" value="${saved.phone || ''}">` : ''}
        <select id="chk_type" onchange="toggleCheckoutType()"><option value="З собою">З собою</option>${isM ? '<option value="У закладі">У закладі</option>' : ''}</select>
        <div id="chk_table_wrap" style="display:none;"><input type="text" id="chk_table" placeholder="Номер столика*"></div>
        <select id="chk_loc">${locOpts}</select>
        ${isM ? `<select id="chk_pay" style="display:none;"><option value="pay_now">Оплатити зараз</option><option value="cashier" selected>На касі</option></select>` : ''}
    </div><div class="checkout-actions"><button onclick="window.openCartModal('${cartType}')" class="btn btn--outline">Назад</button><button id="chk_btn" onclick="window.submitCheckout(this, '${cartType}')" class="btn btn--primary">Замовити</button></div></div>`;
    document.getElementById('cart-modal-container').innerHTML = html;
    if(!isM) attachPhoneMask(document.getElementById('chk_phone'));
    toggleCheckoutType();
}
function toggleCheckoutType() {
    const t = document.getElementById('chk_type').value; const isH = t === 'У закладі';
    const tw = document.getElementById('chk_table_wrap'); const pw = document.getElementById('chk_pay');
    if(tw) tw.style.display = isH ? 'block' : 'none'; if(pw) pw.style.display = isH ? 'block' : 'none';
}
window.submitCheckout = async function(btn, cartType) {
    const isM = cartType === 'menu'; const name = document.getElementById('chk_name').value.trim();
    const phone = !isM ? document.getElementById('chk_phone').value.trim() : '';
    const type = document.getElementById('chk_type').value; const loc = document.getElementById('chk_loc').value;
    const table = isM && type === 'У закладі' ? document.getElementById('chk_table').value.trim() : '';
    const pay = isM ? (type === 'У закладі' ? document.getElementById('chk_pay').value : 'pay_now') : 'pay_now';
    if (!name || !loc || (!isM && !phone)) return alert("Заповніть поля.");
    btn.disabled = true; btn.innerText = "...";
    try {
        saveContactDetails({name, phone: formatPhone(phone)});
        const res = await fetch(`${API_BASE_URL}/api/checkout`, { method: 'POST', headers: {'Content-Type': 'application/json'}, body: JSON.stringify({ user_details: {name, phone: formatPhone(phone), type, location: loc, table_number: table, payment_mode: pay}, cart_menu: isM ? cart_menu : [], cart_beans: !isM ? cart_beans : [] }) });
        const data = await res.json(); if (!res.ok) throw new Error(data.detail);
        if (isM) { localStorage.removeItem('cart_menu'); cart_menu = []; } else { localStorage.removeItem('cart_beans'); cart_beans = []; }
        updateCartBadge();
        if (data.manual || pay === 'cashier') { alert("✅ Замовлення оформлено!"); window.closeCartModal(); return; }
        const f = document.createElement('form'); f.method = 'POST'; f.action = 'https://www.liqpay.ua/api/3/checkout'; f.innerHTML = `<input type="hidden" name="data" value="${data.data}"><input type="hidden" name="signature" value="${data.signature}">`; document.body.appendChild(f); f.submit();
    } catch (e) { alert(e.message); btn.disabled = false; btn.innerText = "Замовити"; }
}
async function fetchGuestMessages(markRead = false) {
    const s = JSON.parse(localStorage.getItem('medelin_guest_session') || '{}'); if (!s.phone) return [];
    try { const res = await fetch(`${API_BASE_URL}/api/guest-messages?phone=${s.phone}${markRead?'&mark_read=true':''}`); const d = await res.json(); return d.items || []; } catch (e) { return []; }
}
async function pollGuestNotifications() {
    const ms = await fetchGuestMessages(false); const un = ms.filter(m => !m.read);
    if (un.length) { await fetchGuestMessages(true); showMedelinModal({ title: 'Medelin', text: un[un.length-1].text, showReply: un[un.length-1].source === 'admin' }); }
}
function showMedelinModal({ title, text, showReply = false }) {
    let o = document.getElementById('medelin-notification-overlay') || document.createElement('div');
    o.id = 'medelin-notification-overlay'; o.className = 'medelin-modal-overlay'; document.body.appendChild(o);
    o.innerHTML = `<div class="medelin-modal-content"><h3>${title}</h3><p>${text}</p><div id="medelin-reply-area" style="display:none;"><textarea id="medelin-reply-input" placeholder="Відповідь..." rows="3"></textarea></div><div class="medelin-modal-actions">${showReply ? `<button id="medelin-btn-reply-toggle" class="btn btn--outline">ВІДПОВІСТИ</button>` : ''}<button id="medelin-btn-ok" class="btn btn--primary">ОК</button></div></div>`;
    o.classList.add('medelin-modal-overlay--active');
    const bOk = o.querySelector('#medelin-btn-ok'); const bTog = o.querySelector('#medelin-btn-reply-toggle'); const rA = o.querySelector('#medelin-reply-area'); const rI = o.querySelector('#medelin-reply-input');
    bOk.onclick = async () => { if (rA.style.display === 'block' && rI.value.trim()) { const s = JSON.parse(localStorage.getItem('medelin_guest_session') || '{}'); await fetch(`${API_BASE_URL}/api/guest-reply`, { method: 'POST', headers: {'Content-Type': 'application/json'}, body: JSON.stringify({ phone: s.phone, text: rI.value.trim() }) }); } o.classList.remove('medelin-modal-overlay--active'); };
    if (bTog) bTog.onclick = () => { rA.style.display = 'block'; bTog.style.display = 'none'; };
}
async function initGuestNotifications() {
    
    setTimeout(pollGuestNotifications, 2000); 
}

async function pollGuestNotifications() {
    try {
        const ms = await fetchGuestMessages(false);
        const un = ms.filter(m => !m.read);
        if (un.length) {
            await fetchGuestMessages(true);
            showMedelinModal({
                title: 'Medelin',
                text: un[un.length - 1].text,
                showReply: un[un.length - 1].source === 'admin'
            });
        }
    } catch (e) {
        console.error("Polling error:", e);
    } finally {
        
        setTimeout(pollGuestNotifications, 30000);
    }
}
function initBurgerMenu() { const b = document.getElementById('burger-btn'); const n = document.getElementById('nav-menu'); if (!b || !n) return; b.onclick = () => { const a = n.classList.toggle('nav--active'); b.classList.toggle('header__burger--active'); document.body.style.overflow = a ? 'hidden' : ''; }; }
function initPopupHandlers() { document.addEventListener('keydown', (e) => { if (e.key === 'Escape') { const a = document.querySelector('.popup--active'); if (a) closePopup(a.id); } }); }
function openPopup(id) { const p = document.getElementById(id); if (p) { p.classList.add('popup--active'); document.body.style.overflow = 'hidden'; } }
function closePopup(id) { const p = document.getElementById(id); if (p) { p.classList.remove('popup--active'); document.body.style.overflow = ''; } }
window.openPopup = openPopup; window.closePopup = closePopup;

function initHeroAnimations() {
    const title = document.querySelector('.hero__title');
    const subtitle = document.querySelector('.hero__subtitle');
    const decoration = document.querySelector('.hero__decoration');
    const scrollText = document.querySelector('.hero__scroll-text');
    
    if (title) {
        title.classList.add('u-animate-slide-up');
        title.style.opacity = '1';
    }
    if (subtitle) {
        setTimeout(() => {
            subtitle.classList.add('u-animate-slide-up');
            subtitle.style.opacity = '1';
        }, 200);
    }
    if (decoration) {
        setTimeout(() => {
            decoration.classList.add('hero__decoration--active');
            decoration.style.opacity = '1';
        }, 400);
    }
    if (scrollText) {
        setTimeout(() => {
            scrollText.style.opacity = '1';
        }, 800);
    }
}
function initScrollReveal() { if ('IntersectionObserver' in window) { const obs = new IntersectionObserver((es) => { es.forEach(e => { if (e.isIntersecting) { e.target.classList.add('u-reveal--active'); obs.unobserve(e.target); } }); }); document.querySelectorAll('.promo-card, .category, .product-card').forEach(el => { el.classList.add('u-reveal'); obs.observe(el); }); } }
