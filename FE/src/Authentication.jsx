import { useEffect } from 'react';
import { Outlet, useLocation, useNavigate } from 'react-router-dom';
import { useAuthActions } from './hooks/useAuthActions';
import { useAuthDispatch, useAuthState } from './contexts/AuthContext';
import { introspect } from './services/auth.service';
import { PRIVATE_ROUTES } from './App';

const Authentication = () => {
  const { fetchProfile } = useAuthActions();
  const { user } = useAuthState();
  const { pathname } = useLocation();
  const dispatch = useAuthDispatch();
  const navigate = useNavigate();
  const token = localStorage.getItem('token');

  useEffect(() => {
    const fetchValidToken = async () => {
      try {
        const response = await introspect();
        if (response.result) {
          await fetchProfile();
        } else {
          dispatch({ type: 'LOGOUT' });
          navigate('/');
        }
        dispatch({ type: 'AUTHENTICATED', payload: response.result });
      } catch (error) {
        console.log(error);
        dispatch({ type: 'LOGOUT' });
        navigate('/');
      }
    };

    if (!token) {
      navigate('/');
    } else {
      fetchValidToken();
    }
  }, [token]);

  useEffect(() => {
    if (user) {
      if (
        user?.roles?.some((role) => role.name === 'ADMIN') &&
        !PRIVATE_ROUTES.some((route) => route.path === pathname)
      ) {
        navigate('/user-manager');
      } else if (
        user?.roles?.some((role) => role.name === 'USER') &&
        PRIVATE_ROUTES.some((route) => route.path === pathname)
      ) {
        navigate('/');
      }
    }
  }, [user, pathname]);

  return <Outlet />;
};

export default Authentication;
