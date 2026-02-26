import { useMemo } from 'react';
import { useAppStore } from '../app/store';
import { authService } from '../features/auth/authService';
import { authApi } from '../services/api';
import { tokenStorage } from '../services/interceptors';

export function useAuthViewModel() {
  const { state, actions } = useAppStore();

  const users        = useMemo(() => authService.getAllUsers(state), [state]);
  const currentUser  = useMemo(() => authService.getCurrentUser(state), [state]);

  /**
   * Sign in by email + password.
   * Credential check uses the live React state (mockData) so existing
   * mock users work without any changes.
   * Calls the dummy API to obtain a JWT token.
   * @throws {Error} on invalid credentials.
   */
  async function signIn({ email, password }) {
    const userRaw = state.users.find(
      (u) =>
        u.email.toLowerCase() === email.trim().toLowerCase() &&
        u.password === password
    );

    if (!userRaw) {
      throw new Error('Invalid email or password. Please try again.');
    }

    // Obtain token from dummy API
    const { token } = await authApi.signIn(email, password);
    tokenStorage.set(token);
    actions.signInAsUser(userRaw.id);
    return userRaw;
  }

  /**
   * Register a new user via the dummy API, then sync to React state.
   * @param {{ name, email, password, role, store_name? }} payload
   * @throws {Error} if the email is already taken.
   */
  async function signUp(payload) {
    const { token, user } = await authApi.signUp(payload);
    tokenStorage.set(token);
    actions.registerUser(user);   // adds to React state + creates cart
    actions.signInAsUser(user.id);
    return user;
  }

  return {
    users,
    currentUser,
    role:            currentUser?.role ?? null,
    isAuthenticated: Boolean(currentUser),
    signIn,
    signUp,
    signInAsUser:    actions.signInAsUser, // kept for dev quick-select
    signOut:         actions.signOut,
    resetMockData:   actions.resetMockData,
  };
}
