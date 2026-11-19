const stores = new Map();

function createRateLimiter({ windowMs = 60000, maxRequests = 10, keyPrefix = 'rl' } = {}) {
  const store = new Map();
  stores.set(keyPrefix, store);

  setInterval(() => {
    const now = Date.now();
    for (const [key, { expires }] of store.entries()) {
      if (expires < now) store.delete(key);
    }
  }, Math.min(windowMs, 60000));

  return {
    check(key) {
      const now = Date.now();
      const record = store.get(key);
      if (!record || record.expires < now) {
        store.set(key, { count: 1, expires: now + windowMs });
        return { allowed: true, remaining: maxRequests - 1, resetIn: windowMs };
      }
      if (record.count >= maxRequests) {
        return { allowed: false, remaining: 0, resetIn: record.expires - now };
      }
      record.count++;
      return { allowed: true, remaining: maxRequests - record.count, resetIn: record.expires - now };
    },
    reset(key) {
      store.delete(key);
    }
  };
}

export { createRateLimiter };