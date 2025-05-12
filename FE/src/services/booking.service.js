import mainRequest from '@/api/mainRequest';

export const getMyBookings = async () => {
  const response = await mainRequest.get('/api/bookings/my-booking');
  return response.data;
};

export const createBooking = async (data) => {
  const response = await mainRequest.post(`/api/bookings/create`, data);
  return response.data;
};
