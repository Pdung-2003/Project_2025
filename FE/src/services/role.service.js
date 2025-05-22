import mainRequest from '@/api/mainRequest';

export const getRoles = async () => {
  const response = await mainRequest.get('/roles');
  return response.data;
};
