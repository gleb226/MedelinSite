``` markdown
# ☕ Medellin Coffee — Офіційний сайт кав'ярні

<div align="center">

![Medellin Coffee](https://img.shields.io/badge/Medellin-Coffee-8b5e3c?style=for-the-badge&logo=coffeescript&logoColor=white)
![HTML5](https://img.shields.io/badge/HTML5-E34F26?style=for-the-badge&logo=html5&logoColor=white)
![CSS3](https://img.shields.io/badge/CSS3-1572B6?style=for-the-badge&logo=css3&logoColor=white)
![JavaScript](https://img.shields.io/badge/JavaScript-F7DF1E?style=for-the-badge&logo=javascript&logoColor=black)
![Responsive](https://img.shields.io/badge/Responsive-100%25-success?style=for-the-badge)
![BEM](https://img.shields.io/badge/BEM-Methodology-blue?style=for-the-badge)

**Найкраща кав'ярня Ужгорода з найкращим сайтом** 

[Демо](#) • [Особливості](#-особливості) • [Структура](#-структура-проєкту) • [Встановлення](#-встановлення)

</div>

---

##  Про проєкт

**Medellin Coffee** — це повноцінний багатосторінковий сайт для мережі кав'ярень в Ужгороді. Проєкт створений як демонстрація навичок веб-розробки з акцентом на чистий код, адаптивність та сучасний дизайн.

###  Мета проєкту

- Створити професійний сайт для реального бізнесу
- Продемонструвати експертні навички у HTML/CSS/JavaScript
- Показати володіння БЕМ методологією
- Реалізувати повну адаптивність (320px → 1920px+)
- Зробити красиво, функціонально та з душею ❤️

---

## ✨ Особливості

###  Дизайн
- **Унікальна колірна палітра** кавової тематики
- **Затишний стиль** з акцентом на якість
- **Плавні переходи** та hover-ефекти
- **Латте-арт естетика** у візуальних елементах

###  Технології
- ✅ Чистий **HTML5** без фреймворків
- ✅ Чистий **CSS3** (Grid + Flexbox)
- ✅ **Vanilla JavaScript** для інтерактивності
- ✅ **БЕМ методологія** для структури класів
- ✅ **Адаптивний дизайн** (10 брейкпоінтів!)
- ✅ **Семантична розмітка** для SEO
- ✅ **Google Fonts** (Playfair Display + Montserrat)
- ✅ **Leaflet** + **OpenStreetMap** для інтерактивних карт

###  Адаптивність
```

320px → Дуже маленькі телефони 360px → Маленькі телефони (Galaxy S8) 400px → Стандартні телефони 480px → Великі телефони (iPhone Plus) 600px → Маленькі планшети 768px → Планшети (iPad) 900px → Великі планшети / маленькі ноутбуки 1024px → Ноутбуки 1200px → Десктопи 1400px → Великі екрани```

###  Продуктивність
- Оптимізовані зображення через Unsplash CDN
- Мінімальна кількість HTTP-запитів
- Швидке завантаження (<2 секунд)
- Легкий JavaScript (~2KB)

---

##  Структура проєкту
```

medellin-coffee/ │ ├── index.html # Головна сторінка │ ├── css/ │ ├── style.css # Основні стилі │ └── responsive.css # Медіа-запити │ ├── images/ # ️ Папка для локальних зображень │ └── pages/ ├── menu/ │ └── menu.html # ️ Меню (кава, чай, десерти, сніданки) │ ├── about/ │ └── about.html # ℹ️ Про кав'ярню та команду │ ├── gallery/ │ └── gallery.html # Галерея (18 фото) │ ├── events/ │ └── events.html # Події та заходи │ ├── blog/ │ └── blog.html # Блог про каву │ └── contact/ └── contact.html # Контакти + форма бронювання + карта``` 

---

##  Сторінки сайту

### 1️⃣ Головна сторінка (`index.html`)
- **Hero-секція** з яскравим фоном
- **6 карток кави** з цінами та описом
- **4 інфо-блоки** про переваги
- **5 локацій** кав'ярень
- **3 відгуки** клієнтів
- **Popup модальні вікна** з детальною інформацією

### 2️⃣ Меню (`pages/menu/menu.html`)
- **☕ Кава** — 8 позицій (еспресо, капучино, латте...)
- ** Чай** — 7 позицій (зелений, чорний, масала...)
- ** Десерти** — 8 позицій (чізкейк, тірамісу, брауні...)
- **Popup модальні вікна** для кожної позиції

### 3️⃣ Про нас (`pages/about/about.html`)
- Історія кав'ярні (заснована в 2015)
- Наша місія та цінності
- Команда з 4 бариста з фото

### 4️⃣ Галерея (`pages/gallery/gallery.html`)
- **18 фото** з hover-ефектами
- Grid-компонування
- Overlay з назвами

### 5️⃣ Події (`pages/events/events.html`)
- **6 карток подій** (майстер-класи, жива музика, дегустації)
- Дати та описи
- **Popup модальні вікна** з детальною інформацією
- **JavaScript інтерактивність**

### 6️⃣ Блог (`pages/blog/blog.html`)
- **6 статей** про кавову культуру
- Дати публікації
- Категорії та теги
- **Popup модальні вікна** з повним текстом

### 7️⃣ Контакти (`pages/contact/contact.html`)
- Інформація про **5 закладів** в Ужгороді
- **Інтерактивна карта** (Leaflet + OpenStreetMap)
- **GPS маркери** для всіх 5 локацій
- **Форма бронювання столика** з 8 полями
- Посилання на соціальні мережі

---

##  Колірна палітра
```

css --cream: #f7f3e9 /* Кремовий фон / --dark-brown: #3c2f2f / Темно-коричневий (header/footer) / --coffee: #8b5e3c / Кавовий акцент / --olive: #5c6447 / Оливково-зелений */```

### ️ Типографіка

- **Заголовки:** Playfair Display (serif, елегантний)
- **Текст:** Montserrat (sans-serif, читабельний)

---

##  Використані ресурси

### ️ Зображення
- [Unsplash](https://unsplash.com/) — високоякісні фото кави та інтер'єрів
- CDN для швидкого завантаження

###  Шрифти
- [Google Fonts](https://fonts.google.com/)
    - Playfair Display
    - Montserrat

### ️ Карти
- [Leaflet](https://leafletjs.com/) — JavaScript бібліотека для карт
- [OpenStreetMap](https://www.openstreetmap.org/) — безкоштовні карти без API ключа

### ️ Іконки
- [Flaticon](https://www.flaticon.com/) — кавові іконки для маркерів

---

##  Тестування адаптивності

### Як перевірити
```

Відкрийте DevTools (F12)
Увімкніть Device Toolbar (Ctrl+Shift+M)
Тестуйте різні розміри:
iPhone SE (375px)
iPhone 12 Pro (390px)
iPad (768px)
Desktop (1920px)``` 

### Підтримувані пристрої
✅ iPhone SE / 5 (320px)  
✅ iPhone 12 / 13 / 14 (390px)  
✅ Samsung Galaxy S20 (360px)  
✅ iPad / iPad Air (768px)  
✅ iPad Pro (1024px)  
✅ Ноутбуки (1366px, 1440px)  
✅ Десктопи (1920px+)

---

##  Що продемонстровано

### HTML
- ✅ Семантична розмітка (header, nav, main, section, article, footer)
- ✅ Правильна вкладеність елементів
- ✅ SEO-оптимізована структура
- ✅ Доступність (alt для зображень, aria-labels)

### CSS
- ✅ **CSS Grid** для складних компонувань
- ✅ **Flexbox** для вирівнювання
- ✅ **БЕМ методологія** (Block__Element--Modifier)
- ✅ **CSS Variables** для кольорів
- ✅ **Медіа-запити** для адаптивності
- ✅ **Transitions** та **Transforms** для анімацій
- ✅ **Pseudo-elements** (::before, ::after)
- ✅ **Hover-ефекти** та інтерактивність

### JavaScript
- ✅ **Popup модальні вікна** (відкриття/закриття)
- ✅ **Event listeners** (клік, клавіатура)
- ✅ **DOM маніпуляція**
- ✅ **Leaflet API** для інтерактивних карт
- ✅ **Динамічні маркери** на карті
- ✅ **Чистий Vanilla JS** без jQuery

### Дизайн
- ✅ Візуальна ієрархія
- ✅ Типографіка та читабельність
- ✅ Колірна гармонія
- ✅ Відступи та баланс
- ✅ Користувацький досвід (UX)

---

##  Статистика проєкту
```

HTML сторінок: 7 CSS файлів: 2 JavaScript: Інтерактивні popup + карти Рядків коду: ~3500+ ️ Зображень: 30+ ☕ Кавових напоїв: 32 Закладів на карті: 5 Брейкпоінтів: 10 ⏱️ Часу розробки: 10 годин Віддача: 200%```

---

##  Особливі фішки

### 1. Інтерактивні Popup
Модальні вікна для продуктів, подій, блогів та локацій з детальною інформацією.
```

javascript function openPopup(id) { document.getElementById(id).classList.add('popup--active'); document.body.style.overflow = 'hidden'; }``` 

### 2. БЕМ методологія
```

css .product-card { } /* Block / .product-card__title { } / Element / .product-card__image { } / Element / .section-title--light { } / Modifier */```

### 3. CSS Grid Mastery
```

css .products__grid { display: grid; grid-template-columns: repeat(auto-fill, minmax(320px, 1fr)); gap: 2.5rem; }``` 

### 4. Інтерактивна карта з маркерами
```

javascript locations.forEach(location => { const marker = L.marker(location.coords, { icon: coffeeIcon }).addTo(map); marker.bindPopup(popupContent); });```

---

##  Можливі покращення

### Фаза 2 (майбутнє)
- [ ] Додати валідацію форми бронювання
- [ ] Інтегрувати реальний бекенд (Node.js/PHP)
- [ ] Додати анімації при скролі (AOS)
- [ ] Зробити темну тему
- [ ] Додати мультимовність (UA/EN/HU)
- [ ] Інтеграція з соцмережами API
- [ ] Online замовлення та доставка
- [ ] Система лояльності
- [ ] Кастомні стилі для карти (Mapbox)

---

## ‍ Автор

**Глєб** — молодий веброзробник з Ужгорода

-  Локація: Ужгород, Україна
-  Спеціалізація: Frontend розробка (HTML/CSS/JavaScript)
- ☕ Улюблена кава: Флет вайт з Medellin
-  Email: [your-email@example.com]
-  GitHub: [yourusername]

---

##  Контакти Medellin Coffee

###  Локації

**Medellin на Корятовича**  
вул. Корятовича, 5а, Ужгород  
+380 (50) 377-59-06  
⏰ Пн-Нд: 08:00 - 20:00

**Medellin на Гойди**  
вул. Гойди, 10, Ужгород  
+380 (50) 377-59-06  
⏰ Пн-Нд: 07:00 - 19:00

**Medellin на Закарпатській**  
вул. Закарпатська, 44, Ужгород  
+380 (50) 377-59-06  
⏰ Пн-Нд: 08:00 - 20:00

**Medellin на Анатолія Тегзи**  
вул. Анатолія Тегзи, 41, Ужгород  
+380 (50) 377-59-06  
⏰ Пн-Нд: 08:00 - 20:00

**Medellin на Проспекті Свободи**  
просп. Свободи, 55, Ужгород  
+380 (50) 537-29-16  
⏰ Пн-Нд: 08:00 - 20:00

###  Соцмережі
-  [Instagram (main)](https://www.instagram.com/medelin_com/)
-  [Instagram (uzh)](https://www.instagram.com/medelin_uzh/)
-  [Instagram (bozdosh)](https://www.instagram.com/medelincoffee.bozdosh/)
-  [Instagram (kabinet)](https://www.instagram.com/kabinet.by.medelin/)
-  [Facebook (main)](https://www.facebook.com/medelin.uzh/)
-  [Facebook (coffee)](https://www.facebook.com/medelinco/)

---

##  Ліцензія

Цей проєкт створений як навчальний та портфоліо проєкт.  
Дизайн та код можуть бути використані для навчальних цілей.

© 2025 Medellin Coffee. Усі права захищені.

---

##  Подяки

- **Unsplash** за чудові фото кави
- **Google Fonts** за якісні шрифти
- **Leaflet** за чудову бібліотеку карт
- **OpenStreetMap** за безкоштовні карти
- **Flaticon** за іконки
- **Medellin Coffee** за натхнення
- **Ужгород** за каву та атмосферу ❤️

---

<div align="center">

### ⭐ Якщо сподобався проєкт — поставте зірочку!

**Зроблено з ❤️ та ☕ в Ужгороді**

[↑ Нагору](#-medellin-coffee--офіційний-сайт-кавярні)

</div>
```
