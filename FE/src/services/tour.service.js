import mainRequest from '@/api/mainRequest';

export const getTours = async (params) => {
  const response = await mainRequest.get('/api/tours', { params });
  return response.data;
};

export const getTourById = async (id) => {
  const response = await mainRequest.get(`/api/tours/${id}`);
  return response.data;
};

export const getTourManager = async (managerId) => {
  const response = await mainRequest.get(`/api/tours/manager/${managerId}`);
  return response.data;
};

export const getTourByCompany = async (companyName) => {
  const response = await mainRequest.get(`/api/tours/company/${companyName}`);
  return response.data;
};

export const createTour = async (tour) => {
  const response = await mainRequest.post('/api/tours', tour);
  return response.data;
};

export const updateTour = async (id, tour) => {
  const response = await mainRequest.put(`/api/tours/${id}`, tour);
  return response.data;
};

export const deleteTour = async (id) => {
  const response = await mainRequest.delete(`/api/tours/${id}`);
  return response.data;
};
