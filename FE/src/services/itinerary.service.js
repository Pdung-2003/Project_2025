import mainRequest from '@/api/mainRequest';
import { cleanBody } from '@/utils/format';

export const getItinerariesByTourId = async (tourId) => {
  const response = await mainRequest.get(`/api/itineraries/tour/${tourId}`);
  return response.data;
};

export const getItineraryById = async (id) => {
  const response = await mainRequest.get(`/api/itineraries/${id}`);
  return response.data;
};

export const createItinerary = async (body) => {
  const response = await mainRequest.post('/api/itineraries', body, {
    headers: {
      'Content-Type': 'multipart/form-data',
    },
  });
  return response.data;
};

export const updateItinerary = async (id, body) => {
  const response = await mainRequest.put(`/api/itineraries/${id}`, cleanBody(body));
  return response.data;
};

export const updateItineraryImage = async (id, body) => {
  const response = await mainRequest.put(`/api/itineraries/upload-image/${id}`, body, {
    headers: {
      'Content-Type': 'multipart/form-data',
    },
  });
  return response.data;
};

export const deleteItinerary = async (id) => {
  const response = await mainRequest.delete(`/api/itineraries/${id}`);
  return response.data;
};

export const deleteItineraryImage = async (id) => {
  const response = await mainRequest.delete(`/image-path/${id}`);
  return response.data;
};
