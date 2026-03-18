# ☕ Medellin Coffee — Website

[![HTML5](https://img.shields.io/badge/HTML5-E34F26?style=for-the-badge&logo=html5&logoColor=white)](https://html.spec.whatwg.org/)
[![CSS3](https://img.shields.io/badge/CSS3-1572B6?style=for-the-badge&logo=css3&logoColor=white)](https://www.w3.org/Style/CSS/)
[![BEM](https://img.shields.io/badge/BEM-Methodology-29BDfD?style=for-the-badge)](https://getbem.com/)
[![Responsive](https://img.shields.io/badge/Responsive-Mobile--First-success?style=for-the-badge)](https://developer.mozilla.org/en-US/docs/Learn/CSS/CSS_layout/Responsive_Design)

Багатосторінковий вебсайт для мережі кав'ярень Medellin Coffee в Ужгороді. Чистий HTML/CSS без фреймворків з адаптивним дизайном та БЕМ методологією.

---

## Технології

- **HTML5** — семантична розмітка
- **CSS3** — Grid + Flexbox для layout
- **БЕМ** — методологія іменування класів
- **Google Fonts** — Playfair Display + Montserrat
- **Unsplash CDN** — оптимізовані зображення

---

## Структура проєкту

```
MedelineSite/
├── index.html              # Головна сторінка
├── css/
│   ├── style.css           # Основні стилі (~2000 рядків)
│   └── responsive.css      # Медіа-запити (10 брейкпоінтів)
└── pages/
    ├── menu/menu.html      # Меню (кава, чай, десерти)
    ├── about/about.html    # Про кав'ярню
    ├── gallery/gallery.html # Галерея (18 фото)
    ├── events/events.html  # Події та заходи
    ├── blog/blog.html      # Блог про каву
    └── contact/contact.html # Контакти + форма бронювання
```

**Статистика коду:**
- 7 HTML сторінок
- ~3000 рядків CSS
- 10 responsive брейкпоінтів
- 0 рядків JavaScript

---

## Особливості реалізації

### 1. БЕМ методологія

```css
/* Block */
.product-card { }

/* Elements */
.product-card__image { }
.product-card__title { }
.product-card__price { }

/* Modifiers */
.product-card--featured { }
```

### 2. CSS Grid для карток

```css
.products__grid {
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(320px, 1fr));
    gap: 2.5rem;
}
```

### 3. Адаптивність (Mobile-First)

```css
/* Базові стилі для мобільних */
.container { padding: 1rem; }

/* Планшети */
@media (min-width: 768px) {
    .container { padding: 2rem; }
}

/* Десктоп */
@media (min-width: 1024px) {
    .container { 
        padding: 3rem;
        max-width: 1200px;
    }
}
```

**Брейкпоінти:**
- 320px — дуже маленькі телефони
- 360px — маленькі телефони
- 480px — великі телефони
- 600px — маленькі планшети
- 768px — планшети
- 900px — великі планшети
- 1024px — ноутбуки
- 1200px — десктопи
- 1400px — великі екрани

### 4. CSS Variables для теми

```css
:root {
    --cream: #f7f3e9;
    --dark-brown: #3c2f2f;
    --coffee: #8b5e3c;
    --olive: #5c6447;
}
```

### 5. Smooth Transitions

```css
.product-card {
    transition: transform 0.3s ease, box-shadow 0.3s ease;
}

.product-card:hover {
    transform: translateY(-12px);
    box-shadow: 0 10px 35px rgba(0, 0, 0, 0.15);
}
```

---

## Встановлення

### Клонувати репозиторій
```bash
git clone https://github.com/gleb226/MedelineSite.git
cd MedelineSite
```

### Запустити локально
```bash
# Варіант 1: Відкрити index.html у браузері
open index.html  # macOS
start index.html # Windows

# Варіант 2: Live Server (рекомендовано)
# VS Code Extension: Live Server
# Правий клік на index.html → "Open with Live Server"

# Варіант 3: Python HTTP Server
python -m http.server 8000
# Відкрити http://localhost:8000
```

---

## Контент сайту

### Головна сторінка
- Hero-секція з CTA
- 6 карток популярних напоїв
- 4 блоки переваг
- 2 локації (адреси, години роботи)
- 3 відгуки клієнтів

### Меню
- **Кава:** 8 позицій (еспресо, капучино, латте, флет вайт, мокка, раф, айс латте)
- **Чай:** 7 позицій (зелений, чорний, масала, м'ятний, фруктовий, імбирний, матча)
- **Десерти:** 8 позицій (чізкейк, тірамісу, брауні, наполеон, еклер, макарон, морквяний торт, панакота)

### Галерея
18 фото з grid layout та hover overlay ефектами

### Події
6 карток подій (майстер-класи бариста, жива музика, дегустації кави, книжковий клуб, сніданочні вихідні, настільні ігри)

### Блог
6 статей про кавову культуру з датами публікації та категоріями

### Контакти
- 2 локації з Google Maps
- Форма бронювання столика (8 полів з HTML5 validation)
- Соцмережі: Instagram, Facebook, TikTok

---

## Що продемонстровано

**HTML:**
- Семантична розмітка (header, nav, main, section, article, footer)
- SEO-оптимізована структура
- Accessibility (alt текст, aria-labels)
- Форми з валідацією

**CSS:**
- БЕМ методологія
- CSS Grid + Flexbox
- CSS Variables
- Media Queries (Mobile-First)
- Transitions & Transforms
- Pseudo-elements (::before, ::after)

**Design:**
- Візуальна ієрархія
- Типографіка (Playfair Display + Montserrat)
- Колірна палітра кавової тематики
- Spacing та rhythm
- Hover states

---

## Можливі покращення

- [ ] JavaScript для форм
- [ ] Backend інтеграція (Node.js/PHP)
- [ ] Анімації при скролі (AOS/GSAP)
- [ ] Темна тема
- [ ] Мультимовність (UA/EN/HU)
- [ ] PWA функціонал
- [ ] Online замовлення

---

## Ліцензія

Проєкт створений як навчальний та портфоліо. Код та дизайн можуть бути використані для навчальних цілей.

---

**Зроблено з ❤️ та ☕ в Ужгороді**