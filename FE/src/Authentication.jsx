import { useEffect } from 'react';
import { Outlet, useNavigate } from 'react-router-dom';
import { useAuthActions } from './hooks/useAuthActions';
import { useAuthDispatch } from './contexts/AuthContext';
import { introspect } from './services/auth.service';

const Authentication = () => {
  const { fetchProfile } = useAuthActions();
  const dispatch = useAuthDispatch();
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

  return <Outlet />;
};

export default Authentication;
