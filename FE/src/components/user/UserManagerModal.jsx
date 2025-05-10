import AppModal from '@/components/common/AppModal';
import TextFieldControl from '@/components/common/TextFieldControl';
import { useUserDispatch, useUserState } from '@/contexts/UserContext';
import { useUserActions } from '@/hooks/useUserActions';
import PropTypes from 'prop-types';
import { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';

const UserManagerModal = ({ open, onClose, userId }) => {
  const dispatch = useUserDispatch();
  const [initState, setInitState] = useState(DEFAULT_VALUES);
  const { control, handleSubmit, reset } = useForm({ values: initState });
  const { getUserById, createUser, updateUser } = useUserActions();
  const { user } = useUserState();

  const handleClose = () => {
    reset(DEFAULT_VALUES);
    dispatch({ type: 'SET_USER', payload: null });
    onClose();
  };

  const onSubmit = (data) => {
    if (userId) {
      updateUser(userId, data);
    } else {
      createUser(data);
    }
  };

  useEffect(() => {
    if (open && userId) {
      getUserById(userId);
    }
  }, [userId, open]);

  useEffect(() => {
    if (user) {
      setInitState({
        username: user.username,
        email: user.email,
        fullName: user.fullName,
        phoneNumber: user.phoneNumber,
        address: user.address,
      });
    }
  }, [user]);

  if (!open) return null;

  return (
    <AppModal
      open={open}
      onClose={handleClose}
      title={userId ? 'Cập nhật người dùng' : 'Thêm người dùng'}
      content={
        <form className="grid grid-cols-2 gap-4 bg-white p-5" onSubmit={handleSubmit(onSubmit)}>
          <TextFieldControl
            label="Họ tên"
            rules={{
              required: 'Vui lòng nhập họ tên',
            }}
            control={control}
            name="fullName"
            placeholder="Họ tên"
          />
          <TextFieldControl
            label="Tài khoản"
            rules={{
              required: 'Vui lòng nhập tài khoản',
            }}
            control={control}
            name="username"
            placeholder="Tài khoản"
          />
          <TextFieldControl
            label="Email"
            rules={{
              required: 'Vui lòng nhập email',
              pattern: {
                value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                message: 'Email không hợp lệ',
              },
            }}
            control={control}
            name="email"
            placeholder="Email"
          />
          <TextFieldControl
            label="Số điện thoại"
            rules={{
              required: 'Vui lòng nhập số điện thoại',
            }}
            control={control}
            name="phoneNumber"
            placeholder="Số điện thoại"
            inputProps={{
              type: 'number',
            }}
          />
          <div className="col-span-2">
            <TextFieldControl
              label="Địa chỉ"
              control={control}
              name="address"
              placeholder="Địa chỉ"
            />
          </div>
          <div className="col-span-2 flex justify-end">
            <button type="submit" className="btn-primary">
              {userId ? 'Cập nhật' : 'Thêm'}
            </button>
          </div>
        </form>
      }
    />
  );
};

export default UserManagerModal;

const DEFAULT_VALUES = {
  username: '',
  email: '',
  fullName: '',
  phoneNumber: '',
  address: '',
};

UserManagerModal.propTypes = {
  open: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
  userId: PropTypes.string,
};
