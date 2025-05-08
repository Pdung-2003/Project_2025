import { useAuthDispatch } from '@/contexts/AuthContext';
import { authService, userService } from '@/services';

export function useAuthActions() {
  const dispatch = useAuthDispatch();

  const fetchProfile = async () => {
    try {
      const profile = await userService.getProfile();
      dispatch({ type: 'SET_USER', payload: profile });
    } catch (error) {
      dispatch({ type: 'SET_ERROR', payload: error.message });
    }
  };

  const login = async (data) => {
    try {
      const response = await authService.login(data);
      if (response.result) {
        localStorage.setItem('token', response.result);
        dispatch({ type: 'LOGIN', payload: response.result });
      }
    } catch (error) {
      console.log(error);
    }
  };

  const logout = async () => {
    try {
      await authService.logout();
      dispatch({ type: 'LOGOUT' });
    } catch (error) {
      dispatch({ type: 'SET_ERROR', payload: error.message });
    }
  };

  return { fetchProfile, login, logout };
}
