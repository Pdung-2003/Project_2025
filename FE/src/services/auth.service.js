import mainRequest from '@/api/mainRequest';

export const logout = async () => {
  const response = await mainRequest.post('/auth/logout');
  return response.data;
};
