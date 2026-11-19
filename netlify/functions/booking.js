import { createRateLimiter } from './utils/rateLimit.js';

const rateLimiter = createRateLimiter({
  windowMs: 15 * 60 * 1000,
  maxRequests: 5,
  keyPrefix: 'booking'
});

const VALID_SERVICES = [
  'maintenance', 'brakes', 'suspension', 'engine',
  'tires', 'diagnostics', 'electrical', 'ac', 'other'
];

function validateBooking(data) {
  const errors = [];

  if (!data.name || data.name.trim().length < 2) {
    errors.push('Ім\'я: мінімум 2 символи');
  }
  if (!data.phone || !/^\+?38?0\d{9}$/.test(data.phone.replace(/\D/g, ''))) {
    errors.push('Телефон: формат +380XXXXXXXXX');
  }
  if (data.email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(data.email)) {
    errors.push('Email: невірний формат');
  }
  if (!data.service || !VALID_SERVICES.includes(data.service)) {
    errors.push('Послуга: оберіть з списку');
  }
  if (!data.date) {
    errors.push('Дата: обов\'язкова');
  } else {
    const selected = new Date(data.date);
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    const maxDate = new Date();
    maxDate.setDate(maxDate.getDate() + 60);
    if (selected < today || selected > maxDate) {
      errors.push('Дата: сьогодні — через 60 днів');
    }
  }
  if (!data.time) {
    errors.push('Час: обов\'язковий');
  }

  return errors;
}

function sanitize(str) {
  return String(str).trim().replace(/[<>]/g, '');
}

export async function handler(event) {
  if (event.httpMethod !== 'POST') {
    return { statusCode: 405, body: JSON.stringify({ message: 'Method not allowed' }) };
  }

  const clientIP = event.headers['x-forwarded-for'] || event.headers['x-nf-client-connection-ip'] || 'unknown';
  const rateCheck = rateLimiter.check(clientIP);
  if (!rateCheck.allowed) {
    return {
      statusCode: 429,
      headers: { 'Retry-After': String(Math.ceil(rateCheck.resetIn / 1000)) },
      body: JSON.stringify({ message: 'Забагато запитів. Спробуйте через 15 хвилин.' })
    };
  }

  let data;
  try {
    data = JSON.parse(event.body || '{}');
  } catch {
    return { statusCode: 400, body: JSON.stringify({ message: 'Невірний JSON' }) };
  }

  if (data.botcheck) {
    return { statusCode: 200, body: JSON.stringify({ ok: true }) };
  }

  const errors = validateBooking(data);
  if (errors.length > 0) {
    return { statusCode: 400, body: JSON.stringify({ message: errors.join('; ') }) };
  }

  const booking = {
    name: sanitize(data.name),
    phone: sanitize(data.phone),
    email: data.email ? sanitize(data.email) : '',
    service: data.service,
    date: data.date,
    time: data.time,
    car: data.car ? sanitize(data.car) : '',
    comment: data.comment ? sanitize(data.comment).slice(0, 500) : '',
    submittedAt: new Date().toISOString(),
    ip: clientIP
  };

  console.log('NEW BOOKING:', JSON.stringify(booking));

  return {
    statusCode: 200,
    body: JSON.stringify({ ok: true, message: 'Заявку прийнято! Ми передзвонимо за 15 хв для підтвердження.' })
  };
}