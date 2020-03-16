export function setItem(...args) {
  return localStorage.setItem(...args);
}

export function getItem(key) {
  return localStorage.getItem(key);
}

export function removeItem(key) {
  return localStorage.removeItem(key);
}

export function clear() {
  return localStorage.clear();
}
