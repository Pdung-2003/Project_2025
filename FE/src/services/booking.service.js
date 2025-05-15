import mainRequest from '@/api/mainRequest';
import { cleanBody } from '@/utils/format';

export const getMyBookings = async () => {
  const response = await mainRequest.get('/api/bookings/my-booking');
  return response.data;
};

export const createBooking = async (data) => {
  const response = await mainRequest.post(`/api/bookings/create`, data);
  return response.data;
};

export const createPayment = async (bookingId) => {
  const response = await mainRequest.post(`/api/payments/booking/${bookingId}`);
  return response.data;
};

export const getBookingRequests = async (params) => {
  const response = await mainRequest.post('/api/bookings/all', cleanBody(params));
  return response.data;
};

export const changeBookingStatus = async (bookingId, status) => {
  const response = await mainRequest.patch(
    `/api/bookings/change-status/${bookingId}?newStatus=${status}`
  );
  return response.data;
};

export const reviewTour = async (formData) => {
  const response = await mainRequest.post('/api/feedbacks', formData, {
    headers: {
      'Content-Type': 'multipart/form-data',
    },
  });
  return response.data;
};
