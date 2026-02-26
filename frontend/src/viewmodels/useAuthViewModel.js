import { useMemo } from 'react';
import { useAppStore } from '../app/store';
import { authService } from '../features/auth/authService';

export function useAuthViewModel() {
  const { state, actions } = useAppStore();

  const users = useMemo(() => authService.getAllUsers(state), [state]);
  const currentUser = useMemo(() => authService.getCurrentUser(state), [state]);

  return {
    users,
    currentUser,
    role: currentUser?.role ?? null,
    isAuthenticated: Boolean(currentUser),
    signInAsUser: actions.signInAsUser,
    signOut: actions.signOut,
    resetMockData: actions.resetMockData
  };
}
