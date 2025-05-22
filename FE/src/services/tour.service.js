import mainRequest from '@/api/mainRequest';
import { cleanBody } from '@/utils/format';

export const getTours = async (body) => {
  const response = await mainRequest.post('/api/tours/search', cleanBody(body));
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
  const response = await mainRequest.post('/api/tours', tour, {
    headers: {
      'Content-Type': 'multipart/form-data',
    },
  });
  return response.data;
};

export const updateTour = async (id, tour) => {
  const response = await mainRequest.put(`/api/tours/${id}`, tour, {
    headers: {
      'Content-Type': 'multipart/form-data',
    },
  });
  return response.data;
};

export const deleteTour = async (id) => {
  const response = await mainRequest.delete(`/api/tours/${id}`);
  return response.data;
};

export const getFeedbacksByTourId = async (tourId) => {
  const response = await mainRequest.get(`/api/feedbacks/tour/${tourId}`);
  return response.data;
};
