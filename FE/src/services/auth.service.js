import mainRequest from '@/api/mainRequest';

export const logout = async () => {
  const response = await mainRequest.post('/auth/logout');
  return response.data;
};

export const login = async (data) => {
  const response = await mainRequest.post('/auth/login', data);
  return response.data;
};

export const introspect = async () => {
  const token = localStorage.getItem('token');
  const response = await mainRequest.post('/auth/introspect', { token });
  return response.data;
};
