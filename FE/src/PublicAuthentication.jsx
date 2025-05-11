import { useEffect } from 'react';
import { Outlet, useNavigate } from 'react-router-dom';
import { useAuthDispatch } from './contexts/AuthContext';
import { introspect } from './services/auth.service';
import { useAuthActions } from './hooks/useAuthActions';

const PublicAuthentication = () => {
  const dispatch = useAuthDispatch();
  const navigate = useNavigate();
  const token = localStorage.getItem('token');
  const { fetchProfile } = useAuthActions();

  useEffect(() => {
    const fetchValidToken = async () => {
      try {
        const response = await introspect();
        if (!response.result) {
          dispatch({ type: 'LOGOUT' });
          navigate('/');
        } else {
          fetchProfile();
        }
        dispatch({ type: 'AUTHENTICATED', payload: response.result });
      } catch (error) {
        console.log(error);
        dispatch({ type: 'LOGOUT' });
        navigate('/');
      }
    };

    if (token) {
      fetchValidToken();
    }
  }, [token]);

  return <Outlet />;
};

export default PublicAuthentication;
