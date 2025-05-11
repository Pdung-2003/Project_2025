import mainRequest from '@/api/mainRequest';

export const getUsers = async () => {
  const response = await mainRequest.get('/users');
  return response.data;
};

export const getUserById = async (id) => {
  const response = await mainRequest.get(`/users/${id}`);
  return response.data;
};

export const getProfile = async () => {
  const response = await mainRequest.get('/users/my-info');
  return response.data;
};

export const updateProfile = async (user) => {
  const response = await mainRequest.put('/users', user);
  return response.data;
};

export const createUser = async (user) => {
  const response = await mainRequest.post('/users', user);
  return response.data;
};

export const updateUser = async (id, user) => {
  const response = await mainRequest.put(`/users/${id}`, user);
  return response.data;
};

export const deleteUser = async (id) => {
  const response = await mainRequest.delete(`/users/${id}`);
  return response.data;
};

export const getManagers = async () => {
  const response = await mainRequest.get('/users/managers');
  return response.data;
};

