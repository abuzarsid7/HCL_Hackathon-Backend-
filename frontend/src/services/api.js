/**
 * authApi – simulated async API for authentication.
 *
 * Maintains its own in-memory user store (initialised from the same
 * BASE_USERS seed data so sign-in works for existing mock accounts).
 * On signUp it pushes the new user into both this store AND the caller
 * passes it to the React store via the registerUser action in the ViewModel.
 *
 * Replace the internals with real fetch/axios calls when connecting a
 * real backend – the public surface (signIn / signUp) stays the same.
 */

import {
  USER_ROLES,
} from '../utils/constants.js';

/* ------------------------------------------------------------------ */
/*  In-memory database (isolated from React state)                     */
/* ------------------------------------------------------------------ */

let _userCounter = 20;

// Seed data mirrors BASE_USERS in mockData.js
let _users = [
  {
    id: 'u-c-1',
    name: 'Aarav Sharma',
    email: 'aarav.customer@example.com',
    password: 'customer123',
    role: USER_ROLES.CUSTOMER,
    store_name: null,
  },
  {
    id: 'u-c-2',
    name: 'Meera Iyer',
    email: 'meera.customer@example.com',
    password: 'customer123',
    role: USER_ROLES.CUSTOMER,
    store_name: null,
  },
  {
    id: 'u-s-1',
    name: 'Rohan Kapoor',
    email: 'rohan.seller@example.com',
    password: 'seller123',
    role: USER_ROLES.SELLER,
    store_name: 'Pizza Planet',
  },
  {
    id: 'u-s-2',
    name: 'Sanya Verma',
    email: 'sanya.seller@example.com',
    password: 'seller123',
    role: USER_ROLES.SELLER,
    store_name: 'Bread & Brew',
  },
];

/* ------------------------------------------------------------------ */
/*  Helpers                                                             */
/* ------------------------------------------------------------------ */

/** Simulate network latency */
function delay(ms = 400) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

/**
 * Produce a deterministic-looking fake JWT.
 * Structure: fakeJwt.<base64(userId)>.<timestamp>
 */
function makeFakeToken(userId) {
  const payload = btoa(JSON.stringify({ sub: userId, iat: Date.now() }));
  return `fakeJwt.${payload}.sig`;
}

/* ------------------------------------------------------------------ */
/*  Public API                                                          */
/* ------------------------------------------------------------------ */

export const authApi = {
  /**
   * Sign in with email + password.
   * Returns { token: string, user: object } on success.
   * Throws an Error with a human-readable message on failure.
   */
  async signIn(email, password) {
    await delay(450);

    const user = _users.find(
      (u) => u.email.toLowerCase() === email.trim().toLowerCase() && u.password === password
    );

    if (!user) {
      throw new Error('Invalid email or password. Please try again.');
    }

    const token = makeFakeToken(user.id);
    // Return a safe copy (no password in the token payload)
    const { password: _pw, ...safeUser } = user;
    return { token, user: { ...safeUser, password } }; // keep password in returned user so store can store it
  },

  /**
   * Sign up a new user.
   * payload: { name, email, password, role, store_name? }
   * Returns { token: string, user: object } on success.
   * Throws an Error if the email is already taken.
   */
  async signUp(payload) {
    await delay(550);

    const exists = _users.find(
      (u) => u.email.toLowerCase() === payload.email.trim().toLowerCase()
    );
    if (exists) {
      throw new Error('An account with this email already exists.');
    }

    _userCounter += 1;
    const rolePrefix = payload.role === USER_ROLES.SELLER ? 's' : 'c';
    const newUser = {
      id: `u-${rolePrefix}-${_userCounter}`,
      name: payload.name.trim(),
      email: payload.email.trim().toLowerCase(),
      password: payload.password,
      role: payload.role ?? USER_ROLES.CUSTOMER,
      store_name:
        payload.role === USER_ROLES.SELLER
          ? (payload.store_name?.trim() || null)
          : null,
    };

    _users.push(newUser);

    const token = makeFakeToken(newUser.id);
    return { token, user: { ...newUser } };
  },

  /**
   * Expose the in-memory user list (read-only snapshot).
   * Used by the store to pre-populate its own state on reset.
   */
  getUsers() {
    return _users.map((u) => ({ ...u }));
  },
};
