import * as THREE from 'three';
import { FBXLoader } from 'three/examples/jsm/loaders/FBXLoader.js';

const SERVICES = [
  {
    icon: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"><path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2z"/><path d="M12 6v6l4 2"/></svg>`,
    title: 'ТО та заміна олії',
    desc: 'Повне то за розкладом виробника: олія, фільтри (масляний, повітряний, салонний, паливний), перевірка рівнів техплив, стану ременів, шлангів, гальм, підвіски.',
    features: ['Оригінальні та OEM фільтри', 'Олія з підтвердженою якістю', 'Звіт про стан авто', 'Нагадування про наступне ТО']
  },
  {
    icon: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"><circle cx="12" cy="12" r="10"/><path d="M12 8v4"/><path d="M12 16h.01"/></svg>`,
    title: 'Гальмівна система',
    desc: 'Діагностика, заміна колодок, дисків, гальмової рідини, ремонт супортів, АБС/ESP модулів. Перевірка гальм на стенді.',
    features: ['Заміна колодок/дисків за 1 год', 'Просіювання гальмової рідини', 'Ремонт супортів', 'Адаптація АБС/ESP']
  },
  {
    icon: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"><path d="M12 2v4"/><path d="m16 10-4 4-4-4"/><path d="M8 14v8"/><path d="M16 14v8"/><path d="M4 22h16"/></svg>`,
    title: 'Підвіска та рульове',
    desc: 'Діагностика на вібраційному стенді, заміна амортизаторів, опор, стяжних, кульових опор, рульових тяг, розвал-сходження 3D.',
    features: ['3D розвал-сходження Hunter', 'Стендова діагностика', 'Заміна амортизаторів парно', 'Перевірка задньої підвіски']
  },
  {
    icon: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"><circle cx="12" cy="12" r="3"/><path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1 0 2.83 2 2 0 0 1-2.83 0l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-2 2 2 2 0 0 1-2-2v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83 0 2 2 0 0 1 0-2.83l.06-.06a1.65 1.65 0 0 0 .33-1.82 1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1-2-2 2 2 0 0 1 2-2h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 0-2.83 2 2 0 0 1 2.83 0l.06.06a1.65 1.65 0 0 0 1.82.33H9a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 2-2 2 2 0 0 1 2 2v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 0 2 2 0 0 1 0 2.83l-.06.06a1.65 1.65 0 0 0-.33 1.82V9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 2 2 2 2 0 0 1-2 2h-.09a1.65 1.65 0 0 0-1.51 1z"/></svg>`,
    title: 'Двигун та КПП',
    desc: 'Ремонт ДВС: розбірка, шліфування вала, поршнева група, ГРМ, турбіни. Ремонт АКПП/РКПП/ДСГ: заміна сцеплення, мехатроніки, олії.',
    features: ['Ендоскопія циліндрів', 'Тягловий стенд', 'Адаптація АКПП/ДСГ', 'Гарантія до 24 міс.']
  },
  {
    icon: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"><circle cx="12" cy="12" r="10"/><path d="M12 6v6l4 2"/></svg>`,
    title: 'Шиномонтаж та балансування',
    desc: 'Сезонна заміна колес, балансування Hunter, ремонт проколів, вакуумне качування азотом, зберігання колес (готель для шин).',
    features: ['Балансування з точністю 1г', 'Ремонт бокових надрізів', 'Готель для шин (темп/волог)', 'Тисок у шинах (TPMS)']
  },
  {
    icon: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"><rect x="2" y="3" width="20" height="14" rx="2"/><path d="M8 21h8"/><path d="M12 17v4"/></svg>`,
    title: 'Комп\'ютерна діагностика',
    desc: 'Повне сканування всіх блоків: двигун, АКПП, АБС, ESP, SRS, клімат, парктронік. Адаптація, кодування, оновлення ПЗ.',
    features: ['Сканери: Launch, Autel, ODIS', 'Діагностика гібридів/ЕВ', 'Адаптація після ремонту', 'Звіт з кодами помилок']
  },
  {
    icon: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"><path d="M13 2L3 14h9l-1 8 10-12h-9l1-8z"/></svg>`,
    title: 'Електрика та АКБ',
    desc: 'Діагностика проводки, запуск, генератор, стартер, АКБ (перевірка ємності, зарядка, заміна). Монтаж сигналізацій, старт-стоп.',
    features: ['Тестування АКБ під навантаженням', 'Пошук утечки струму', 'Монтаж Webasto/автозапуску', 'Ремонт блоків управління']
  },
  {
    icon: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"><path d="M12 2a6 6 0 0 0-6 6v10a8 8 0 0 0 12 0V8a6 6 0 0 0-6-6z"/><path d="M8 14h8"/><path d="M12 10v8"/></svg>`,
    title: 'Клімат-контроль / Кондиціонер',
    desc: 'Заправка фреоном R134a/R1234yf, пошук витіків ультрафіолетом, заміна компресора, конденсатора, евапоратора, кабінного фільтра.',
    features: ['Автоматична заправка з вакуумуванням', 'УФ-детекція витіків', 'Антибактеріальна обробка', 'Перевірка продуктивності']
  }
];

const PRICES = [
  { category: 'maintenance', service: 'Заміна олії та масляного фільтра', price: '350', duration: '30 хв' },
  { category: 'maintenance', service: 'ТО-1 (олія, 3 фільтри, перевірка)', price: '850', duration: '1 год' },
  { category: 'maintenance', service: 'ТО-2 (олія, 4 фільтри, свічі, перевірка)', price: '1450', duration: '1.5 год' },
  { category: 'maintenance', service: 'Заміна паливного фільтра', price: '400', duration: '40 хв' },
  { category: 'maintenance', service: 'Заміна салонного фільтра', price: '200', duration: '15 хв' },
  { category: 'maintenance', service: 'Заміна повітряного фільтра', price: '180', duration: '15 хв' },
  { category: 'brakes', service: 'Заміна гальмівних колодок (1 ось)', price: '450', duration: '40 хв' },
  { category: 'brakes', service: 'Заміна гальмівних дисків (1 ось)', price: '650', duration: '1 год' },
  { category: 'brakes', service: 'Заміна гальмівної рідини (просіювання)', price: '350', duration: '30 хв' },
  { category: 'brakes', service: 'Ремонт суппорта (1 шт.)', price: '550', duration: '1.5 год' },
  { category: 'brakes', service: 'Заміна гальмівних шлангів (1 шт.)', price: '300', duration: '30 хв' },
  { category: 'suspension', service: 'Діагностика підвіски на стенді', price: '250', duration: '20 хв' },
  { category: 'suspension', service: 'Заміна амортизаторів (1 ось)', price: '800', duration: '1.5 год' },
  { category: 'suspension', service: 'Заміна стяжних / опор стійки (1 шт.)', price: '350', duration: '40 хв' },
  { category: 'suspension', service: 'Заміна рульової тяги / наконечника', price: '400', duration: '1 год' },
  { category: 'suspension', service: 'Розвал-сходження 3D (2 осі)', price: '550', duration: '40 хв' },
  { category: 'engine', service: 'Заміна ремня ГРМ (без ВП)', price: '1800', duration: '3-4 год' },
  { category: 'engine', service: 'Заміна ремня ГРМ + водяний насос', price: '2500', duration: '4-5 год' },
  { category: 'engine', service: 'Заміна ланцюга ГРМ', price: '2200', duration: '4-5 год' },
  { category: 'engine', service: 'Заміна олії в АКПП (часткова)', price: '750', duration: '1 год' },
  { category: 'engine', service: 'Повна заміна олії АКПП (апаратна)', price: '1500', duration: '1.5 год' },
  { category: 'engine', service: 'Ремонт турбіни (знімання/монтаж)', price: '1200', duration: '2 год' },
  { category: 'tires', service: 'Сезонна заміна колес (комплект)', price: '300', duration: '30 хв' },
  { category: 'tires', service: 'Балансування колеса (1 шт.)', price: '100', duration: '15 хв' },
  { category: 'tires', service: 'Ремонт проколу (без знімання)', price: '150', duration: '20 хв' },
  { category: 'tires', service: 'Ремонт боку / накладка лати', price: '350', duration: '40 хв' },
  { category: 'tires', service: 'Готель для шин (місяць, комплект)', price: '200', duration: '—' },
  { category: 'diagnostics', service: 'Повна комп\'ютерна діагностика', price: '350', duration: '30 хв' },
  { category: 'diagnostics', service: 'Діагностика АКПП/ДСГ', price: '450', duration: '40 хв' },
  { category: 'diagnostics', service: 'Діагностика гідрид/електроавто', price: '500', duration: '40 хв' },
  { category: 'diagnostics', service: 'Адаптація дроселя / валу / мехатроніки', price: '400', duration: '30 хв' },
  { category: 'diagnostics', service: 'Перевірка АКБ / генератора', price: '150', duration: '15 хв' }
];

const REVIEWS = [
  { author: 'Олександр К.', initials: 'ОК', rating: 5, text: 'Роблю ТО тут вже 3 роки. Чесно кажуть, що треба, а що можна відкласти. Ціни адекватні, ніяких навязувань. Останній раз замінили ремень ГРМ — зробили за день, гарантію дали.' },
  { author: 'Марія П.', initials: 'МП', rating: 5, text: 'Заїздила з гучном у підвісці. Думала, амортизатори, а виявилися лише опори стійки. Замінили за годину, ціна в 3 рази менша за очікувану. Дякую за чесність!' },
  { author: 'Сергій М.', initials: 'СМ', rating: 5, text: 'АКПП на BMW заламалася. Деaler хоче 180к за нову. Тут перевірили мехатроніку, замінили соленоїди, промили, адаптували. 25 тис і працює як нова. Рекомендую.' },
  { author: 'Олена В.', initials: 'ОВ', rating: 4, text: 'Хороший шиномонтаж — швидко, балансування якісне, немає вібрацій на трасі. Їхнє сховище для шин зручне — здав літо, забрав зиму, все чисте, на місці.' },
  { author: 'Андрій Т.', initials: 'АТ', rating: 5, text: 'Діагностикував чек-інджен на Toyota. Знашли прокріплений каталізатор, не холодильник як в іншому сервісі. Пропонували варіанти: видалити/поставити універсал/оригінал. Обрали універсал — економив 15к.' },
  { author: 'Віктор Л.', initials: 'ВЛ', rating: 5, text: 'Регулярно робить ТО на двох авто — своєй та дружини. Записуюсь онлайн, приїжджаю вчасно, все готове. Кава, Wi-Fi, чекаєш комфортно. Майстри своїх справах знають.' }
];

function init() {
  initHero3D();
  initNavigation();
  renderServices();
  renderPrices('all');
  initPriceTabs();
  renderReviews();
  initBookingForm();
  initStatCounters();
  initScrollAnimations();
}

function initNavigation() {
  const header = document.querySelector('.header');
  const navToggle = document.querySelector('.nav-toggle');
  const mobileMenu = document.getElementById('mobileMenu');
  const mobileMenuClose = document.querySelector('.mobile-menu-close');

  window.addEventListener('scroll', () => {
    header.classList.toggle('scrolled', window.scrollY > 20);
  });

  function closeMobileMenu() {
    mobileMenu.classList.remove('open');
    navToggle.setAttribute('aria-expanded', 'false');
    document.body.style.overflow = '';
  }

  navToggle?.addEventListener('click', () => {
    const expanded = navToggle.getAttribute('aria-expanded') === 'true';
    navToggle.setAttribute('aria-expanded', !expanded);
    mobileMenu.classList.toggle('open');
    document.body.style.overflow = expanded ? '' : 'hidden';
  });

  mobileMenuClose?.addEventListener('click', closeMobileMenu);

  document.querySelectorAll('.mobile-link').forEach(link => {
    link.addEventListener('click', closeMobileMenu);
  });

  mobileMenu?.addEventListener('click', (e) => {
    if (e.target === mobileMenu) closeMobileMenu();
  });

  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', e => {
      const targetId = anchor.getAttribute('href');
      if (targetId === '#') return;
      const target = document.querySelector(targetId);
      if (target) {
        e.preventDefault();
        const headerH = header.offsetHeight;
        const targetPos = target.getBoundingClientRect().top + window.scrollY - headerH;
        window.scrollTo({ top: targetPos, behavior: 'smooth' });
      }
    });
  });
}

function renderServices() {
  const grid = document.getElementById('servicesGrid');
  if (!grid) return;
  grid.innerHTML = SERVICES.map(s => `
    <article class="service-card">
      <div class="service-icon">${s.icon}</div>
      <h3>${s.title}</h3>
      <p>${s.desc}</p>
      <ul class="service-features">
        ${s.features.map(f => `<li>${f}</li>`).join('')}
      </ul>
    </article>
  `).join('');
}

function renderPrices(category) {
  const body = document.getElementById('pricesBody');
  if (!body) return;
  const filtered = category === 'all' ? PRICES : PRICES.filter(p => p.category === category);
  body.innerHTML = filtered.map(p => `
    <tr>
      <td>${p.service}</td>
      <td class="price">${p.price} грн</td>
      <td class="duration">${p.duration}</td>
    </tr>
  `).join('');
}

function initPriceTabs() {
  const tabs = document.querySelectorAll('.tab-btn');
  tabs.forEach(tab => {
    tab.addEventListener('click', () => {
      tabs.forEach(t => {
        t.classList.remove('active');
        t.setAttribute('aria-selected', 'false');
      });
      tab.classList.add('active');
      tab.setAttribute('aria-selected', 'true');
      renderPrices(tab.dataset.category);
    });
  });
}

function renderReviews() {
  const grid = document.getElementById('reviewsGrid');
  if (!grid) return;
  grid.innerHTML = REVIEWS.map(r => `
    <article class="review-card">
      <div class="review-header">
        <div class="review-avatar">${r.initials}</div>
        <div class="review-author">
          <h4>${r.author}</h4>
          <p>Google Maps</p>
        </div>
      </div>
      <div class="review-stars">${'★'.repeat(r.rating)}${'☆'.repeat(5 - r.rating)}</div>
      <p class="review-text">${r.text}</p>
    </article>
  `).join('');
}

function initBookingForm() {
  const form = document.getElementById('bookingForm');
  const dateInput = document.getElementById('bDate');

  dateInput.min = new Date().toISOString().split('T')[0];
  dateInput.max = new Date(Date.now() + 60 * 24 * 60 * 60 * 1000).toISOString().split('T')[0];

  form.addEventListener('submit', async e => {
    e.preventDefault();

    const formData = new FormData(form);
    const data = Object.fromEntries(formData.entries());

    // Honeypot перевірка
    if (data.botcheck) {
      return; // бот
    }

    // Клієнтська валідація
    const requiredFields = ['name', 'phone', 'car', 'service', 'date', 'time'];
    for (const field of requiredFields) {
      if (!data[field]?.trim()) {
        showToast(`Заповніть поле: ${field}`, 'error');
        return;
      }
    }

    const submitBtn = form.querySelector('button[type="submit"]');
    submitBtn.disabled = true;
    submitBtn.textContent = 'Відправка...';

    try {
      // Формуємо красиве повідомлення для Telegram
      const serviceNames = {
        maintenance: 'ТО / Заміна олії',
        brakes: 'Гальмівна система',
        suspension: 'Підвіска / Розвал-сходження',
        engine: 'Двигун / КПП',
        tires: 'Шиномонтаж / Балансування',
        diagnostics: 'Діагностика / Чек-інд',
        electrics: 'Електрика / АКБ',
        ac: 'Клімат-контроль / Кондиціонер',
        other: 'Інше / Не знаю'
      };

      const message = `
<b>🆕 Нова заявка з сайту СТО Буча</b>

<b>👤 Ім'я:</b> ${escapeHtml(data.name)}
<b>📞 Телефон:</b> ${escapeHtml(data.phone)}
<b>🚗 Авто:</b> ${escapeHtml(data.car)}
<b>🔧 Послуга:</b> ${serviceNames[data.service] || data.service}
<b>📅 Дата:</b> ${escapeHtml(data.date)}
<b>⏰ Час:</b> ${escapeHtml(data.time)}
${data.comment ? `<b>💬 Коментар:</b> ${escapeHtml(data.comment)}` : ''}
      `.trim();

      // FormData для Telegram (уникаємо CORS проблеми)
      const telegramFormData = new FormData();
      telegramFormData.append('chat_id', '-1003930814744');
      telegramFormData.append('text', message);
      telegramFormData.append('parse_mode', 'HTML');

      const res = await fetch('https://api.telegram.org/bot9260736698:AAFRTCxv_gBHp3J02z0B1tYd_a9su_fjI-c/sendMessage', {
        method: 'POST',
        // Без Content-Type — браузер сам поставить multipart/form-data
        body: telegramFormData,
      });

      const result = await res.json();

      if (result.ok === true) {
        showToast('Дякуємо, заявку прийнято! Ми передзвонимо за 15 хв для підтвердження.', 'success');
        form.reset();
      } else {
        showToast(result.description || 'Помилка надсилання. Спробуйте ще раз.', 'error');
      }
    } catch {
      showToast('Мережева помилка. Спробуйте ще раз або зателефонуйте нам.', 'error');
    } finally {
      submitBtn.disabled = false;
      submitBtn.textContent = 'Замовити дзвінок для підтвердження';
    }
  });
}

function escapeHtml(text) {
  const map = {
    '&': '&',
    '<': '<',
    '>': '>',
    '"': '"',
    "'": '&#039;'
  };
  return text.replace(/[&<>"']/g, m => map[m]);
}

function initStatCounters() {
  const observer = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const stat = entry.target.querySelector('.stat-value');
        const target = parseInt(stat.dataset.count);
        animateCounter(stat, target);
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.1, rootMargin: '0px 0px -50px 0px' });

  document.querySelectorAll('.stat').forEach(el => {
    observer.observe(el);
    const rect = el.getBoundingClientRect();
    const isVisible = rect.top < window.innerHeight && rect.bottom > 0;
    if (isVisible) {
      const stat = el.querySelector('.stat-value');
      const target = parseInt(stat.dataset.count);
      animateCounter(stat, target);
      observer.unobserve(el);
    }
  });
}

function animateCounter(el, target) {
  const duration = 1800;
  const start = performance.now();
  function tick(now) {
    const progress = Math.min((now - start) / duration, 1);
    const eased = 1 - Math.pow(1 - progress, 3);
    el.textContent = Math.floor(target * eased).toLocaleString();
    if (progress < 1) requestAnimationFrame(tick);
    else el.textContent = target.toLocaleString();
  }
  requestAnimationFrame(tick);
}

function initScrollAnimations() {
  const observer = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.style.opacity = '1';
        entry.target.style.transform = 'translateY(0)';
      }
    });
  }, { threshold: 0.1, rootMargin: '0px 0px -50px 0px' });

  document.querySelectorAll('.service-card, .review-card, .about-point').forEach((el, i) => {
    el.style.opacity = '0';
    el.style.transform = 'translateY(20px)';
    el.style.transition = `opacity 0.6s ease ${i * 80}ms, transform 0.6s ease ${i * 80}ms`;
    observer.observe(el);
  });
}

function showToast(message, type = 'info') {
  const container = document.getElementById('toastContainer');
  const toast = document.createElement('div');
  toast.className = `toast ${type}`;
  const icons = {
    success: '<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"/><polyline points="22 4 12 14.01 9 11.01"/></svg>',
    error: '<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="10"/><line x1="15" y1="9" x2="9" y2="15"/><line x1="9" y1="9" x2="15" y2="15"/></svg>',
    warning: '<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M10.29 3.86L1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z"/><line x1="12" y1="9" x2="12" y2="13"/><line x1="12" y1="17" x2="12.01" y2="17"/></svg>',
    info: '<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="10"/><line x1="12" y1="16" x2="12" y2="12"/><line x1="12" y1="8" x2="12.01" y2="8"/></svg>'
  };
  toast.innerHTML = `${icons[type]}<span>${message}</span>`;
  container.appendChild(toast);
  setTimeout(() => { toast.style.animation = 'slideIn 0.3s ease reverse'; setTimeout(() => toast.remove(), 300); }, 4000);
}

function initHero3D() {
  const canvas = document.getElementById('heroCanvas');
  if (!canvas) return;

  const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  const isMobile = window.innerWidth < 768;

  if (prefersReduced) {
    canvas.style.display = 'none';
    return;
  }

  const scene = new THREE.Scene();
  const camera = new THREE.PerspectiveCamera(45, canvas.clientWidth / canvas.clientHeight, 0.1, 100);
  camera.position.set(0, 1.5, 4);

  const renderer = new THREE.WebGLRenderer({ canvas, antialias: !isMobile, alpha: true, powerPreference: 'high-performance' });
  renderer.setSize(canvas.clientWidth, canvas.clientHeight);
  renderer.setPixelRatio(Math.min(window.devicePixelRatio, isMobile ? 1.5 : 2));
  renderer.shadowMap.enabled = !isMobile;
  renderer.shadowMap.type = THREE.PCFSoftShadowMap;
  renderer.toneMapping = THREE.ACESFilmicToneMapping;
  renderer.toneMappingExposure = 1.2;

  const carGroup = new THREE.Group();
  scene.add(carGroup);

  const accentMat = new THREE.MeshPhysicalMaterial({ color: 0x00a3ff, metalness: 0.9, roughness: 0.1, emissive: 0x003366, emissiveIntensity: 0.3 });
  const darkMat = new THREE.MeshStandardMaterial({ color: 0x05080c, metalness: 0.5, roughness: 0.4 });

  const loader = new FBXLoader();
  loader.load(`${import.meta.env.BASE_URL}models/mercedes-gls.fbx`, (object) => {
    object.scale.setScalar(0.01);
    object.rotation.y = Math.PI;
    object.position.y = 0;

    object.rotation.x = -Math.PI / 2;
    object.rotation.y = 0; // передній бампер до камери

    object.traverse((child) => {
      if (child.isMesh) {
        child.castShadow = true;
        child.receiveShadow = true;
        if (child.material) {
          const mats = Array.isArray(child.material) ? child.material : [child.material];
          mats.forEach(mat => {
            mat.metalness = Math.min(mat.metalness || 0, 0.7);
            mat.roughness = Math.max(mat.roughness || 0.5, 0.3);
          });
        }
      }
    });

    const box = new THREE.Box3().setFromObject(object);
    const center = box.getCenter(new THREE.Vector3());
    object.position.sub(center);
    object.position.y -= box.min.y;
    object.position.y += 0.6; // піднімаємо машину вище над землею

    carGroup.add(object);
  }, undefined, (err) => {
    console.error('FBX load error:', err);
    createFallbackCar();
  });

  function createFallbackCar() {
    const bodyMat = new THREE.MeshPhysicalMaterial({ color: 0x001a33, metalness: 0.8, roughness: 0.2, clearcoat: 1, clearcoatRoughness: 0.1 });
    const glassMat = new THREE.MeshPhysicalMaterial({ color: 0x001a33, metalness: 0.1, roughness: 0.05, transmission: 0.8, thickness: 0.5, ior: 1.5, clearcoat: 1, clearcoatRoughness: 0 });
    const wheelMat = new THREE.MeshStandardMaterial({ color: 0x0a1018, metalness: 0.7, roughness: 0.3 });
    const rimMat = new THREE.MeshStandardMaterial({ color: 0x00a3ff, metalness: 0.9, roughness: 0.1, emissive: 0x003366, emissiveIntensity: 0.4 });
    const lightMat = new THREE.MeshStandardMaterial({ color: 0x00a3ff, emissive: 0x00a3ff, emissiveIntensity: 2, metalness: 0, roughness: 0 });
    const taillightMat = new THREE.MeshStandardMaterial({ color: 0xff4466, emissive: 0xff4466, emissiveIntensity: 2, metalness: 0, roughness: 0 });

    const bodyGeo = new THREE.BoxGeometry(2.2, 0.7, 1.1);
    const body = new THREE.Mesh(bodyGeo, bodyMat);
    body.position.y = 0.55;
    body.castShadow = true;
    body.receiveShadow = true;
    carGroup.add(body);

    const cabinGeo = new THREE.BoxGeometry(1.4, 0.65, 1.05);
    const cabin = new THREE.Mesh(cabinGeo, bodyMat);
    cabin.position.set(0, 1.2, -0.05);
    cabin.castShadow = true;
    carGroup.add(cabin);

    const windshieldGeo = new THREE.BoxGeometry(1.3, 0.55, 0.05);
    const windshield = new THREE.Mesh(windshieldGeo, glassMat);
    windshield.position.set(0, 1.4, 0.45);
    carGroup.add(windshield);

    const wheelPositions = [
      [-0.8, 0.25, 0.7],
      [0.8, 0.25, 0.7],
      [-0.8, 0.25, -0.7],
      [0.8, 0.25, -0.7]
    ];

    wheelPositions.forEach(([x, y, z]) => {
      const wheelGroup = new THREE.Group();
      const tireGeo = new THREE.CylinderGeometry(0.3, 0.3, 0.18, 16);
      const tire = new THREE.Mesh(tireGeo, wheelMat);
      tire.rotation.z = Math.PI / 2;
      tire.castShadow = true;
      tire.receiveShadow = true;
      wheelGroup.add(tire);

      const rimGeo = new THREE.CylinderGeometry(0.22, 0.22, 0.2, 8);
      const rim = new THREE.Mesh(rimGeo, rimMat);
      rim.rotation.z = Math.PI / 2;
      wheelGroup.add(rim);

      wheelGroup.position.set(x, y, z);
      carGroup.add(wheelGroup);
    });
  }

  const groundGeo = new THREE.PlaneGeometry(20, 20);
  const groundMat = new THREE.MeshStandardMaterial({ color: 0x05080c, metalness: 0, roughness: 1 });
  const ground = new THREE.Mesh(groundGeo, groundMat);
  ground.rotation.x = -Math.PI / 2;
  ground.position.y = 0;
  ground.receiveShadow = true;
  scene.add(ground);

  const ambientLight = new THREE.AmbientLight(0xffffff, 0.6);
  scene.add(ambientLight);

  const mainLight = new THREE.DirectionalLight(0x00a3ff, 2);
  mainLight.position.set(5, 10, 5);
  mainLight.castShadow = !isMobile;
  mainLight.shadow.mapSize.width = isMobile ? 512 : 1024;
  mainLight.shadow.mapSize.height = isMobile ? 512 : 1024;
  mainLight.shadow.camera.near = 0.5;
  mainLight.shadow.camera.far = 20;
  mainLight.shadow.camera.left = -5;
  mainLight.shadow.camera.right = 5;
  mainLight.shadow.camera.top = 5;
  mainLight.shadow.camera.bottom = -5;
  mainLight.shadow.bias = -0.0005;
  scene.add(mainLight);

  const fillLight = new THREE.DirectionalLight(0x00ff88, 0.5);
  fillLight.position.set(-5, 5, -5);
  scene.add(fillLight);

  const rimLight = new THREE.DirectionalLight(0x00a3ff, 1);
  rimLight.position.set(0, -5, 5);
  scene.add(rimLight);

  let targetRotationY = 0;
  let currentRotationY = 0;
  let mouseX = 0;
  const heroSection = document.getElementById('hero');

  function onMouseMove(e) {
    if (!heroSection) return;
    const rect = heroSection.getBoundingClientRect();
    mouseX = ((e.clientX - rect.left) / rect.width - 0.5) * 2;
    targetRotationY = mouseX * 0.5;
  }

  function onTouchMove(e) {
    if (!heroSection || e.touches.length === 0) return;
    const rect = heroSection.getBoundingClientRect();
    const touch = e.touches[0];
    mouseX = ((touch.clientX - rect.left) / rect.width - 0.5) * 2;
    targetRotationY = mouseX * 0.5;
  }

  heroSection?.addEventListener('mousemove', onMouseMove, { passive: true });
  heroSection?.addEventListener('touchmove', onTouchMove, { passive: true });

  function animate() {
    requestAnimationFrame(animate);

    currentRotationY += (targetRotationY - currentRotationY) * 0.05;
    carGroup.rotation.y = currentRotationY + Math.sin(performance.now() * 0.0003) * 0.02;

    camera.lookAt(0, 1, 0);
    renderer.render(scene, camera);
  }

  function onResize() {
    if (!canvas) return;
    const width = canvas.clientWidth;
    const height = canvas.clientHeight;
    camera.aspect = width / height;
    camera.updateProjectionMatrix();
    renderer.setSize(width, height);
  }

  window.addEventListener('resize', onResize);

  animate();
}

function initHeroText() {
  const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  const words = document.querySelectorAll('.word');
  const subtitle = document.getElementById('heroSubtitle');
  const subtitleText = 'Повний спектр послуг: від заміни олії до капремонту двигуна. Чесні ціни, оригінальні запчастини, гарантія на всі роботи.';

  if (prefersReduced) {
    words.forEach(w => w.textContent = w.dataset.word);
    subtitle.textContent = subtitleText;
    return;
  }

  words.forEach((word, i) => {
    word.style.opacity = '0';
    word.style.transform = 'translateY(30px)';
    word.style.display = 'inline-block';
    word.style.transition = 'opacity 0.6s cubic-bezier(0.16, 1, 0.3, 1), transform 0.6s cubic-bezier(0.16, 1, 0.3, 1)';
    word.style.transitionDelay = `${300 + i * 120}ms`;
    // force reflow
    word.offsetHeight;
    word.textContent = word.dataset.word + (i < words.length - 1 ? ' ' : '');
    requestAnimationFrame(() => {
      word.style.opacity = '1';
      word.style.transform = 'translateY(0)';
    });
  });

  const startType = words.length * 120 + 500;
  setTimeout(() => {
    let i = 0;
    function typeWriter() {
      if (i < subtitleText.length) {
        subtitle.textContent += subtitleText.charAt(i);
        i++;
        setTimeout(typeWriter, 18);
      }
    }
    typeWriter();
  }, startType);
}

document.addEventListener('DOMContentLoaded', () => {
  init();
  initHeroText();
});