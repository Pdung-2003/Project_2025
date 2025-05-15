import { BOOKING_STATUS } from '@/constants/app.constant';
import { useBookingDispatch, useBookingState } from '@/contexts/BookingContext';
import { useBookingActions } from '@/hooks/useBookingActions';
import { bookingService } from '@/services';
import PropTypes from 'prop-types';
import { useEffect, useState } from 'react';
import { toast } from 'react-toastify';
import ReviewTourModal from './ReviewTourModal';

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
  const [isOpen, setIsOpen] = useState(false);
  const isCanFeedback =
    booking?.status === BOOKING_STATUS.PAID &&
    booking?.tourDate &&
    new Date(booking?.tourDate) < new Date();

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
        {isCanFeedback && (
          <button
            className="bg-green-500 text-white px-4 py-2 rounded-md hover:bg-green-600"
            onClick={() => setIsOpen(true)}
          >
            Đánh giá
          </button>
        )}
        <ReviewTourModal
          open={isOpen}
          onClose={() => setIsOpen(false)}
          bookingId={booking?.bookingId}
        />
      </div>
    </div>
  );
};

OrderTourItem.propTypes = {
  booking: PropTypes.object.isRequired,
};

export default OrderTour;
