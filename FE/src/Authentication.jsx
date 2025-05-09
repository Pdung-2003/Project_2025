import { useEffect } from 'react';
import { Navigate, Outlet, useNavigate } from 'react-router-dom';
import { useAuthActions } from './hooks/useAuthActions';
import { useAuthDispatch, useAuthState } from './contexts/AuthContext';
import { introspect } from './services/auth.service';

const Authentication = () => {
  const { fetchProfile } = useAuthActions();
  const dispatch = useAuthDispatch();
  const { isAuthenticated } = useAuthState();
  const navigate = useNavigate();
  const token = localStorage.getItem('token');

  useEffect(() => {
    const fetchValidToken = async () => {
      try {
        const response = await introspect();
        if (response.result) {
          fetchProfile();
        } else {
          dispatch({ type: 'LOGOUT' });
          navigate('/login');
        }
        dispatch({ type: 'AUTHENTICATED', payload: response.result });
      } catch (error) {
        console.log(error);
        dispatch({ type: 'LOGOUT' });
        navigate('/login');
      }
    };

    if (!token) {
      navigate('/');
    } else {
      fetchValidToken();
    }
  }, [token]);

  if (!isAuthenticated) {
    return <Navigate to={'/'} />;
  }

  return <Outlet />;
};

export default Authentication;
