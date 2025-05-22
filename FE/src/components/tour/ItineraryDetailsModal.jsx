import AppModal from '@/components/common/AppModal';
import InputIntegerControl from '@/components/common/InputIntegerControl';
import TextFieldControl from '@/components/common/TextFieldControl';
import UploadMultipleImagesControl from '@/components/tour/UploadMultipleImagesControl';
import { useItineraryActions } from '@/hooks/useItineraryActions';
import { itineraryService } from '@/services';
import PropTypes from 'prop-types';
import { useForm } from 'react-hook-form';
import { toast } from 'react-toastify';
import TextEditorControl from '../common/TextEditorControl';
import { useEffect } from 'react';
import { useItineraryState } from '@/contexts/ItineraryContext';

const ItineraryDetailsModal = ({ open, onClose, itineraryId, tourId }) => {
  const { fetchItineraries, fetchItinerary } = useItineraryActions();
  const { itinerary } = useItineraryState();
  const { control, reset, handleSubmit, setValue } = useForm({
    defaultValues: {
      title: null,
      dayNumberOfTour: null,
      location: null,
      activityDescription: null,
      files: null,
    },
  });

  const handleClose = () => {
    reset();
    onClose();
  };

  const onSubmit = async (data) => {
    try {
      const { files, ...itinerary } = data;
      const formData = new FormData();
      formData.append(
        'itinerary',
        new Blob(
          [
            JSON.stringify({
              ...itinerary,
              tourId,
            }),
          ],
          { type: 'application/json' }
        )
      );

      if (files) {
        files.forEach((file) => {
          formData.append('files', file);
        });
      }

      if (itineraryId) {
        await itineraryService.updateItinerary(itineraryId, {
          ...itinerary,
          tourId,
        });
        toast.success('Cập nhật lịch trình thành công');
      } else {
        await itineraryService.createItinerary(formData);
        toast.success('Thêm lịch trình thành công');
      }
      await fetchItineraries(tourId);
      handleClose();
    } catch (error) {
      console.log(error);
      toast.error(error?.response?.data?.message || 'Thêm lịch trình thất bại');
    }
  };

  useEffect(() => {
    if (itineraryId) {
      fetchItinerary(itineraryId);
    }
  }, [itineraryId]);

  useEffect(() => {
    if (itinerary) {
      setValue('title', itinerary?.title);
      setValue('dayNumberOfTour', itinerary?.dayNumberOfTour);
      setValue('location', itinerary?.location);
      setValue('activityDescription', itinerary?.activityDescription);
    }
  }, [itinerary]);

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <AppModal
        open={open}
        onClose={onClose}
        title={itineraryId ? 'Cập nhật lịch trình' : 'Thêm lịch trình'}
        paperProps={{
          className: 'max-w-lg',
        }}
        content={
          <div className="flex flex-col bg-white rounded-xs justify-start items-start">
            <h2 className="text-black p-2 font-bold text-lg">Thông tin lịch trình</h2>
            <div className="border-b border-gray-200 w-full" />
            <div className="space-x-1.5 space-y-2  p-5 items-start w-full">
              {!itineraryId && (
                <UploadMultipleImagesControl
                  control={control}
                  name="files"
                  label={'Ảnh lịch trình'}
                  rules={{ required: 'Vui lòng chọn ảnh lịch trình' }}
                  isEdit={!!itineraryId}
                />
              )}
              <TextFieldControl
                control={control}
                name="title"
                label="Tên lịch trình"
                rules={{
                  required: 'Vui lòng nhập tên lịch trình',
                }}
              />
              <InputIntegerControl
                control={control}
                name="dayNumberOfTour"
                label="Ngày số"
                rules={{ required: 'Vui lòng nhập ngày số' }}
              />
              <TextFieldControl
                control={control}
                name="location"
                label="Địa điểm"
                rules={{ required: 'Vui lòng nhập địa điểm' }}
              />
              <TextEditorControl
                control={control}
                name="activityDescription"
                label="Mô tả hoạt động"
              />
            </div>
          </div>
        }
        action={
          <>
            <button
              className="border border-gray-200 rounded-xs px-4 py-2"
              onClick={handleClose}
              type="button"
            >
              Đóng
            </button>
            <button type="submit" className="bg-blue-700 text-white rounded-xs px-4 py-2">
              {itineraryId ? 'Cập nhật' : 'Tạo'}
            </button>
          </>
        }
      />
    </form>
  );
};

export default ItineraryDetailsModal;

ItineraryDetailsModal.propTypes = {
  open: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
  tourId: PropTypes.string.isRequired,
  itineraryId: PropTypes.string,
};
