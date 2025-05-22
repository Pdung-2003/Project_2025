import { useAuthState } from '@/contexts/AuthContext';
import AppModal from '../common/AppModal';
import TextFieldControl from '../common/TextFieldControl';
import { useForm } from 'react-hook-form';
import InputIntegerControl from '../common/InputIntegerControl';
import { toast } from 'react-toastify';
import { bookingService } from '@/services';
import PropTypes from 'prop-types';

const BookingTourModal = ({ open, onClose, tourId }) => {
  const { user } = useAuthState();

  const { control, reset, handleSubmit } = useForm({
    numberOfPeople: null,
    requireFromCustomer: null,
  });

  const handleClose = () => {
    onClose();
    reset();
  };

  const onSubmit = async (data) => {
    try {
      await bookingService.createBooking({
        ...data,
        tourId: Number(tourId),
        customerId: user?.id,
      });
      toast.success('Đặt tour thành công. Vui lòng kiểm tra lại đơn hàng');
      handleClose();
    } catch (error) {
      toast.error(error?.response?.data?.message || 'Lỗi khi đặt tour');
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <AppModal
        open={open}
        onClose={handleClose}
        title="Đặt tour"
        paperProps={{ className: 'max-w-md' }}
        content={
          <div className="flex flex-col bg-white rounded-xs justify-start items-start">
            <div className="space-x-1.5 space-y-2  p-5 items-start w-full">
              {user ? (
                <>
                  <InputIntegerControl
                    label="Số lượng người"
                    name="numberOfPeople"
                    control={control}
                  />
                  <TextFieldControl
                    label="Yêu cầu từ khách hàng"
                    name="requireFromCustomer"
                    control={control}
                  />
                </>
              ) : (
                <>
                  <p>Vui lòng liên hệ nhân viên để được hỗ trợ</p>
                </>
              )}
            </div>
          </div>
        }
        action={
          <>
            <button
              className="border border-gray-200 rounded-xs px-4 py-2 hover:bg-gray-100"
              onClick={handleClose}
              type="button"
            >
              Đóng
            </button>
            {user && (
              <button
                type="submit"
                className="bg-blue-700 text-white rounded-xs px-4 py-2 hover:bg-blue-800"
              >
                Đặt tour
              </button>
            )}
          </>
        }
      />
    </form>
  );
};

export default BookingTourModal;

BookingTourModal.propTypes = {
  open: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
  tourId: PropTypes.string,
};
