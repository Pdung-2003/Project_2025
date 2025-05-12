import { useForm } from 'react-hook-form';
import AppModal from '../common/AppModal';
import PropTypes from 'prop-types';
import TextFieldControl from '../common/TextFieldControl';
import UploadImageControl from '../common/UploadImageControl';
import SelectControl from '@/components/common/SelectControl';
import { useEffect, useMemo } from 'react';
import { useUserState } from '@/contexts/UserContext';
import { tourService } from '@/services';
import { toast } from 'react-toastify';
import { useTourDispatch, useTourState } from '@/contexts/TourContext';
import { useTourActions } from '@/hooks/useTourActions';
import { useAuthState } from '@/contexts/AuthContext';

const AddTourModal = ({ open, onClose, tourId }) => {
  const { user } = useAuthState();
  const { fetchTourById } = useTourActions();
  const dispatchTour = useTourDispatch();
  const { pagination, tour } = useTourState();
  const { managers } = useUserState();
  const { control, handleSubmit, reset, setValue } = useForm({
    tourCode: null,
    tourName: null,
    description: null,
    duration: null,
    location: null,
    destination: null,
    price: null,
    discount: null,
    managerId: null,
    companyName: null,
    maxCapacity: null,
    startDate: null,
    endDate: null,
    banner: null,
  });

  const isTourManager = useMemo(() => {
    return user?.roles?.some((role) => role.name === 'TOUR_MANAGER');
  }, [user?.roles]);

  const handleClose = () => {
    reset();
    onClose();
  };

  const onSubmit = async (data) => {
    try {
      const { banner, ...rest } = data;

      // Parse các field dạng số để backend nhận đúng kiểu (nếu cần thiết)
      const tourData = {
        ...rest,
        price: Number(rest.price),
        discount: rest.discount ? Number(rest.discount) : null,
        maxCapacity: Number(rest.maxCapacity),
        managerId: isTourManager ? user?.id : rest?.managerId,
      };

      const formData = new FormData();
      formData.append('tour', new Blob([JSON.stringify(tourData)], { type: 'application/json' }));
      if (banner && typeof banner !== 'string') {
        formData.append('banner', banner);
      }

      if (tourId) {
        await tourService.updateTour(tourId, formData);
      } else {
        await tourService.createTour(formData);
      }
      toast.success(tourId ? 'Cập nhật tour thành công' : 'Tạo tour thành công');
      dispatchTour({ type: 'SET_PAGINATION', payload: { ...pagination, pageNumber: 1 } });
      handleClose();
    } catch (error) {
      toast.error(error.response?.data?.message || 'Tạo tour thất bại');
    }
  };

  useEffect(() => {
    if (tour) {
      setValue('tourCode', tour.tourCode);
      setValue('tourName', tour.tourName);
      setValue('description', tour.description);
      setValue('duration', tour.duration);
      setValue('companyName', tour.companyName);
      setValue('location', tour.location);
      setValue('destination', tour.destination);
      setValue('price', tour.price);
      setValue('discount', tour.discount);
      setValue('maxCapacity', tour.maxCapacity);
      setValue('managerId', tour?.manager?.managerId);
      setValue('startDate', tour.startDate);
      setValue('endDate', tour.endDate);
      setValue('banner', tour.tourBanner);
    }
  }, [tour]);

  useEffect(() => {
    if (tourId) {
      fetchTourById(tourId);
    }
  }, [tourId]);

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <AppModal
        open={open}
        onClose={handleClose}
        title={tourId ? 'Cập nhật Tour' : 'Tạo mới Tour'}
        paperProps={{
          className: 'max-w-[1120px]',
        }}
        content={
          <div className="flex flex-row space-x-1.5">
            <div>
              <UploadImageControl
                control={control}
                rules={{ required: 'Vui lòng tải ảnh cho Tour' }}
                name="banner"
                label="Ảnh"
              />
            </div>
            <div className="flex flex-col space-y-1.5 flex-1">
              <div className="flex flex-col bg-white rounded-xs justify-start items-start">
                <h2 className="text-black p-2 font-bold text-lg">Thông tin chung</h2>
                <div className="border-b border-gray-200 w-full" />
                <div className="grid grid-cols-2 space-x-1.5 space-y-2  p-5 items-start w-full">
                  <TextFieldControl
                    control={control}
                    name="tourCode"
                    label="Mã Tour"
                    rules={{
                      required: 'Vui lòng nhập mã Tour',
                    }}
                  />
                  <TextFieldControl
                    control={control}
                    name="tourName"
                    label="Tên Tour"
                    rules={{ required: 'Vui lòng nhập tên Tour' }}
                  />
                  <TextFieldControl
                    control={control}
                    name="duration"
                    label="Thời lượng tour"
                    rules={{ required: 'Vui lòng nhập thời lượng' }}
                  />
                  <TextFieldControl
                    control={control}
                    name="companyName"
                    label="Công ty"
                    rules={{ required: 'Vui lòng nhập công ty' }}
                  />
                  <TextFieldControl
                    control={control}
                    name="location"
                    label="Địa điểm"
                    rules={{ required: 'Vui lòng nhập địa điểm' }}
                  />
                  <TextFieldControl
                    control={control}
                    name="destination"
                    label="Điểm đến"
                    rules={{ required: 'Vui lòng nhập điểm đến' }}
                  />
                  <div className="col-span-2">
                    <TextFieldControl control={control} name="description" label="Mô tả" />
                  </div>
                </div>
              </div>
              <div className="flex flex-col bg-white rounded-xs items-start">
                <h2 className="text-black p-2 font-bold text-lg">Thông tin lịch trình</h2>
                <div className="border-b border-gray-200 w-full" />
                <div className="grid grid-cols-2 space-x-1.5 space-y-2  p-5 items-start w-full">
                  <TextFieldControl
                    control={control}
                    name="price"
                    label="Giá (VNĐ)"
                    rules={{ required: 'Vui lòng nhập giá' }}
                  />
                  <TextFieldControl control={control} name="discount" label="Giảm giá (VNĐ)" />
                  <TextFieldControl
                    control={control}
                    name="maxCapacity"
                    label="Sức chứa"
                    rules={{ required: 'Vui lòng nhập sức chứa' }}
                  />
                  {!isTourManager && (
                    <SelectControl
                      control={control}
                      name="managerId"
                      label="Quản lý"
                      options={managers.map((manager) => ({
                        label: manager.fullName,
                        value: manager.id,
                      }))}
                    />
                  )}
                  <TextFieldControl
                    control={control}
                    name="startDate"
                    label="Ngày bắt đầu"
                    inputProps={{
                      type: 'date',
                    }}
                    rules={{ required: 'Vui lòng nhập ngày bắt đầu' }}
                  />
                  <TextFieldControl
                    control={control}
                    name="endDate"
                    label="Ngày kết thúc"
                    inputProps={{
                      type: 'date',
                    }}
                    rules={{ required: 'Vui lòng nhập ngày kết thúc' }}
                  />
                </div>
              </div>
            </div>
          </div>
        }
        action={
          <>
            <button className="border border-gray-200 rounded-xs px-4 py-2" onClick={handleClose}>
              Đóng
            </button>
            <button type="submit" className="bg-blue-700 text-white rounded-xs px-4 py-2">
              {tourId ? 'Cập nhật' : 'Tạo'}
            </button>
          </>
        }
      />
    </form>
  );
};

export default AddTourModal;

AddTourModal.propTypes = {
  open: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
  tourId: PropTypes.string,
};
