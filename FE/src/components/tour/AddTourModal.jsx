import { useForm } from 'react-hook-form';
import AppModal from '../common/AppModal';
import PropTypes from 'prop-types';
import TextFieldControl from '../common/TextFieldControl';
import UploadImageControl from '../common/UploadImageControl';

const AddTourModal = ({ open, onClose }) => {
  const { control } = useForm({
    tourCode: '',
    tourName: '',
    description: '',
    duration: '',
    location: '',
    destination: '',
    price: '',
    discount: '',
    managerId: null,
    companyName: '',
    maxCapacity: '',
    startDate: null,
    endDate: null,
    status: 0,
  });

  return (
    <AppModal
      open={open}
      onClose={onClose}
      title="Tạo mới Tour"
      content={
        <div className="flex flex-row space-x-1.5">
          <div>
            <UploadImageControl
              control={control}
              name="image"
              label="Ảnh"
              imageProps={{ className: 'w-[220px]' }}
            />
          </div>
          <div className="flex flex-col bg-white rounded-xs">
            <h2 className="text-black  p-5 ">Thông tin chung</h2>
            <div className="border-b border-gray-200 w-full" />
            <div className="grid grid-cols-2 space-x-1.5 space-y-2  p-5">
              <TextFieldControl control={control} name="tourCode" label="Mã Tour" />
              <TextFieldControl control={control} name="tourName" label="Tên Tour" />
              <TextFieldControl control={control} name="description" label="Mô tả" />
              <TextFieldControl control={control} name="duration" label="Thời lượng" />
              <TextFieldControl control={control} name="location" label="Địa điểm" />
              <TextFieldControl control={control} name="destination" label="Điểm đến" />
              <TextFieldControl control={control} name="price" label="Giá" />
              <TextFieldControl control={control} name="discount" label="Giảm giá" />
              <TextFieldControl control={control} name="managerId" label="Quản lý" />
              <TextFieldControl control={control} name="companyName" label="Công ty" />
              <TextFieldControl control={control} name="maxCapacity" label="Sức chứa" />
              <TextFieldControl control={control} name="startDate" label="Ngày bắt đầu" />
              <TextFieldControl control={control} name="endDate" label="Ngày kết thúc" />
            </div>
          </div>
        </div>
      }
      paperProps={{
        className: 'max-w-2xl',
      }}
      action={
        <>
          <button className="border border-gray-200 rounded-xs px-4 py-2">Đóng</button>
          <button className="bg-blue-700 text-white rounded-xs px-4 py-2">Lưu</button>
        </>
      }
    />
  );
};

export default AddTourModal;

AddTourModal.propTypes = {
  open: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
};

const STATUS_TOUR = [
  {
    label: 'Active',
    value: 0,
  },
  {
    label: 'Inactive',
    value: 1,
  },
  {
    label: 'Cancelled',
    value: 2,
  },
];
