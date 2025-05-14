import { useBookingDispatch, useBookingState } from '@/contexts/BookingContext';
import { useBookingActions } from '@/hooks/useBookingActions';
import { bookingService } from '@/services';
import PropTypes from 'prop-types';
import { useEffect } from 'react';
import { toast } from 'react-toastify';

const OrderTour = () => {
  const dispatch = useBookingDispatch();
  const { booking } = useBookingState();
  const { fetchMyBookings } = useBookingActions();
  
  useEffect(() => {
    fetchMyBookings();
    return () => {
      dispatch({ type: 'RESET_STATE' });
    };
  }, []);

  return (
    <div className="flex flex-col space-y-3">
      <h1 className="text-2xl font-bold">Đơn hàng</h1>
      <div className="flex flex-col space-y-3 overflow-y-auto max-h-[500px]">
        {booking.map((booking) => (
          <OrderTourItem key={booking.id} booking={booking} />
        ))}
      </div>
    </div>
  );
};

const OrderTourItem = ({ booking }) => {
  const createPayment = async (bookingId) => {
    try {
      const response = await bookingService.createPayment(bookingId);
      if (response?.result?.paymentUrl) {
        window.location.href = response?.result?.paymentUrl;
      }
    } catch (error) {
      toast.error(error?.response?.data?.message || 'Lỗi khi thanh toán hóa đơn');
      console.log(error);
    }
  };
  return (
    <div className="flex flex-row justify-between items-center border-t border-gray-200 py-2">
      <div className="flex flex-col">
        <p className="text-lg font-bold">Tour: {booking?.tourName}</p>
        <p className="text-sm text-gray-500">Số người: {booking?.numberOfPeople}</p>
        <p className="text-sm text-gray-500">
          Giá:{' '}
          {booking?.priceBooking?.toLocaleString('vi-VN', { style: 'currency', currency: 'VND' })}
        </p>
        <p className="text-sm text-gray-500">
          Ngày đi: {booking?.tourDate ? new Date(booking.tourDate).toLocaleDateString() : 'N/A'}
        </p>
      </div>
      <div className="flex flex-col gap-1">
        <p className="text-md font-bold">Trạng thái: {booking?.status}</p>
        {booking?.status === 'CONFIRMED' && (
          <button
            className="bg-blue-500 text-white px-4 py-2 rounded-md"
            onClick={() => createPayment(booking?.bookingId)}
          >
            Thanh toán
          </button>
        )}
      </div>
    </div>
  );
};

OrderTourItem.propTypes = {
  booking: PropTypes.object.isRequired,
};

const TOUR_LIST = [
  {
    id: 1,
    tourName: 'Tour 1',
    tourDate: new Date('2024-01-01'),
    bookingDate: new Date('2024-01-01'),
    numberOfPeople: 10,
    status: 'pending',
  },
  {
    id: 2,
    tourName: 'Tour 2',
    tourDate: new Date('2024-01-01'),
    bookingDate: new Date('2024-01-01'),
    numberOfPeople: 10,
    status: 'pending',
  },
  {
    id: 3,
    tourName: 'Tour 3',
    tourDate: new Date('2024-01-01'),
    bookingDate: new Date('2024-01-01'),
    numberOfPeople: 10,
    status: 'pending',
  },
  {
    id: 4,
    tourName: 'Tour 4',
    tourDate: new Date('2024-01-01'),
    bookingDate: new Date('2024-01-01'),
    numberOfPeople: 10,
    status: 'pending',
  },
  {
    id: 5,
    tourName: 'Tour 5',
    tourDate: new Date('2024-01-01'),
    bookingDate: new Date('2024-01-01'),
    numberOfPeople: 10,
    status: 'pending',
  },
  {
    id: 6,
    tourName: 'Tour 6',
    tourDate: new Date('2024-01-01'),
    bookingDate: new Date('2024-01-01'),
    numberOfPeople: 10,
    status: 'pending',
  },
  {
    id: 7,
    tourName: 'Tour 7',
    tourDate: new Date('2024-01-01'),
    bookingDate: new Date('2024-01-01'),
    numberOfPeople: 10,
    status: 'pending',
  },
  {
    id: 8,
    tourName: 'Tour 8',
    tourDate: new Date('2024-01-01'),
    bookingDate: new Date('2024-01-01'),
    numberOfPeople: 10,
    status: 'pending',
  },
  {
    id: 9,
    tourName: 'Tour 9',
    tourDate: new Date('2024-01-01'),
    bookingDate: new Date('2024-01-01'),
    numberOfPeople: 10,
    status: 'pending',
  },
];

export default OrderTour;
