import PropTypes from 'prop-types';
import AppModal from '../common/AppModal';
import TextFieldControl from '../common/TextFieldControl';
import { useForm } from 'react-hook-form';
import { bookingService } from '@/services';
import { toast } from 'react-toastify';
import UploadMultipleImagesControl from './UploadMultipleImagesControl';
import { Controller } from 'react-hook-form';

const StarRatingInput = ({ value, onChange }) => (
  <div className="flex items-center gap-1">
    {[1, 2, 3, 4, 5].map((star) => (
      <button
        type="button"
        key={star}
        onClick={() => onChange(star)}
        className="focus:outline-none"
      >
        <svg
          className={`w-6 h-6 ${star <= value ? 'text-yellow-400' : 'text-gray-300'}`}
          fill="currentColor"
          viewBox="0 0 20 20"
        >
          <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.286 3.967a1 1 0 00.95.69h4.175c.969 0 1.371 1.24.588 1.81l-3.38 2.455a1 1 0 00-.364 1.118l1.287 3.966c.3.922-.755 1.688-1.54 1.118l-3.38-2.454a1 1 0 00-1.175 0l-3.38 2.454c-.784.57-1.838-.196-1.54-1.118l1.287-3.966a1 1 0 00-.364-1.118L2.05 9.394c-.783-.57-.38-1.81.588-1.81h4.175a1 1 0 00.95-.69l1.286-3.967z" />
        </svg>
      </button>
    ))}
    <span className="ml-2 text-sm">{value}</span>
  </div>
);

StarRatingInput.propTypes = {
  value: PropTypes.number.isRequired,
  onChange: PropTypes.func.isRequired,
};

const ReviewTourModal = ({ open, onClose, bookingId }) => {
  const { control, handleSubmit, reset } = useForm({
    defaultValues: {
      review: '',
      images: [],
      rating: 5,
    },
  });

  const onSubmit = async (data) => {
    if (!data.review) {
      toast.error('Vui lòng nhập nội dung đánh giá');
      return;
    }
    if (!data.rating) {
      toast.error('Vui lòng chọn số sao đánh giá');
      return;
    }
    const formData = new FormData();
    formData.append(
      'feedback',
      new Blob(
        [
          JSON.stringify({
            bookingId: Number(bookingId),
            rating: data.rating,
            comment: data.review,
          }),
        ],
        { type: 'application/json' }
      )
    );
    if (data.images && data.images.length > 0) {
      data.images.forEach((file) => {
        formData.append('images', file);
      });
    }
    try {
      await bookingService.reviewTour(formData);
      toast.success('Đánh giá thành công');
      reset();
      onClose();
    } catch (error) {
      toast.error(error?.response?.data?.message || 'Đánh giá thất bại');
    }
  };

  return (
    <AppModal
      open={open}
      onClose={onClose}
      title="Đánh giá tour"
      paperProps={{
        className: 'max-w-xl',
      }}
      content={
        <div className="flex flex-col bg-white rounded-xs justify-start items-start">
          <div className="p-5 pb-0">
            <Controller
              name="rating"
              control={control}
              render={({ field }) => (
                <StarRatingInput value={field.value} onChange={field.onChange} />
              )}
            />
          </div>
          <UploadMultipleImagesControl control={control} name="images" />
          <div className="p-5 pt-0 w-full">
            <TextFieldControl
              control={control}
              name="review"
              inputProps={{
                placeholder: 'Nhập nội dung đánh giá',
              }}
            />
          </div>
        </div>
      }
      action={
        <>
          <button
            className="border border-gray-300 text-gray-500 px-4 py-2 rounded-md hover:border-gray-800"
            onClick={onClose}
          >
            Đóng
          </button>
          <button
            className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600"
            onClick={handleSubmit(onSubmit)}
          >
            Gửi đánh giá
          </button>
        </>
      }
    />
  );
};

export default ReviewTourModal;

ReviewTourModal.propTypes = {
  open: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
  bookingId: PropTypes.string.isRequired,
};
