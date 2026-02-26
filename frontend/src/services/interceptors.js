/**
 * Token storage – persists the JWT to localStorage so the session
 * survives a browser refresh.
 */
const TOKEN_KEY = 'food_app_token';

export const tokenStorage = {
  /** @returns {string|null} */
  get()        { return localStorage.getItem(TOKEN_KEY); },
  /** @param {string} token */
  set(token)   { localStorage.setItem(TOKEN_KEY, token); },
  clear()      { localStorage.removeItem(TOKEN_KEY); },
};

/**
 * Returns an Authorization header object if a token exists.
 * Attach this to every real HTTP call when you wire up a real backend.
 *
 * @returns {{ Authorization?: string }}
 */
export function getAuthHeaders() {
  const token = tokenStorage.get();
  return token ? { Authorization: `Bearer ${token}` } : {};
}
