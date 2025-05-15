import { DEFAULT_PAGINATION } from '@/constants/app.constant';
import { useBookingDispatch } from '@/contexts/BookingContext';
import { bookingService } from '@/services';
import { toast } from 'react-toastify';

export function useBookingActions() {
  const dispatch = useBookingDispatch();

  const fetchMyBookings = async () => {
    dispatch({ type: 'SET_LOADING', payload: true });
    try {
      const response = await bookingService.getMyBookings();
      dispatch({ type: 'SET_BOOKING', payload: { bookings: response.result } });
    } catch (error) {
      dispatch({ type: 'SET_ERROR', payload: error.message });
    } finally {
      dispatch({ type: 'SET_LOADING', payload: false });
    }
  };

  const fetchBookingRequests = async (params) => {
    dispatch({ type: 'SET_LOADING', payload: true });
    try {
      const response = await bookingService.getBookingRequests(params);
      dispatch({
        type: 'SET_BOOKING',
        payload: {
          bookings: response?.result,
          totalElements: response?.pagination?.totalElements,
          totalPages: response?.pagination?.totalPages,
        },
      });
    } catch (error) {
      dispatch({ type: 'SET_ERROR', payload: error.message });
    } finally {
      dispatch({ type: 'SET_LOADING', payload: false });
    }
  };

  const changeBookingStatus = async (bookingId, status) => {
    dispatch({ type: 'SET_LOADING', payload: true });
    try {
      await bookingService.changeBookingStatus(bookingId, status);
      dispatch({ type: 'SET_PAGINATION', payload: DEFAULT_PAGINATION });
      toast.success('Cập nhật trạng thái thành công');
    } catch (error) {
      dispatch({ type: 'SET_ERROR', payload: error.message });
      toast.error(error?.response?.data?.message || 'Cập nhật trạng thái thất bại');
    } finally {
      dispatch({ type: 'SET_LOADING', payload: false });
    }
  };

  return { fetchMyBookings, fetchBookingRequests, changeBookingStatus };
}
