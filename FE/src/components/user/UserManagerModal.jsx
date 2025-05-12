import AppModal from '@/components/common/AppModal';
import TextFieldControl from '@/components/common/TextFieldControl';
import { useRoleState } from '@/contexts/RoleContext';
import { useUserDispatch, useUserState } from '@/contexts/UserContext';
import { useRoleActions } from '@/hooks/useRoleActions';
import { useUserActions } from '@/hooks/useUserActions';
import PropTypes from 'prop-types';
import { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import SelectControl from '../common/SelectControl';
import { toast } from 'react-toastify';
import InputIntegerControl from '../common/InputIntegerControl';
import { userService } from '@/services';

const UserManagerModal = ({ open, onClose, userId }) => {
  const dispatch = useUserDispatch();
  const { fetchRoles } = useRoleActions();
  const { roles } = useRoleState();
  const [initState, setInitState] = useState(DEFAULT_VALUES);
  const { control, handleSubmit, reset, getValues } = useForm({ values: initState });
  const { getUserById, fetchUsers } = useUserActions();
  const { user } = useUserState();

  const handleClose = () => {
    reset(DEFAULT_VALUES);
    dispatch({ type: 'SET_USER', payload: null });
    onClose();
  };

  const onSubmit = async (data) => {
    try {
      const user = { ...data, roles: [data.roles] };
      if (userId) {
        await userService.updateUser(userId, user);
        toast.success('Cập nhật người dùng thành công');
      } else {
        await userService.createUser(user);
        toast.success('Thêm người dùng thành công');
      }
      await fetchUsers();
      handleClose();
    } catch (error) {
      toast.error(error?.response?.data?.message || 'Có lỗi xảy ra, vui lòng thử lại');
    }
  };

  useEffect(() => {
    if (open && userId) {
      getUserById(userId);
    }
  }, [userId, open]);

  useEffect(() => {
    fetchRoles();
    return () => {
      dispatch({ type: 'RESET_STATE' });
    };
  }, []);

  useEffect(() => {
    if (user) {
      setInitState({
        username: user.username,
        email: user.email,
        fullName: user.fullName,
        phoneNumber: user.phoneNumber,
        address: user.address,
        dob: user.dateOfBirth,
        roles: user?.roles?.[0]?.id,
      });
    }
  }, [user]);

  if (!open) return null;

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <AppModal
        open={open}
        onClose={handleClose}
        title={userId ? 'Cập nhật người dùng' : 'Thêm người dùng'}
        paperProps={{
          className: 'max-w-3xl',
        }}
        content={
          <div className="grid grid-cols-2 gap-4 bg-white p-5">
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
                minLength: {
                  value: 4,
                  message: 'Tài khoản phải có ít nhất 4 ký tự',
                },
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
              label="Ngày sinh"
              control={control}
              name="dob"
              placeholder="Ngày sinh"
              rules={{
                // Validate ngày sinh không được lớn hơn ngày hiện tại và lớn hơn 10 tuổi
                validate: (value) => {
                  if (
                    new Date(value) > new Date() ||
                    new Date(value) >
                      new Date(new Date().setFullYear(new Date().getFullYear() - 10))
                  ) {
                    return 'Ngày sinh không hợp lệ';
                  }
                },
              }}
              inputProps={{
                type: 'date',
                max: new Date(new Date().setFullYear(new Date().getFullYear() - 10))
                  .toISOString()
                  .split('T')[0],
              }}
            />
            <InputIntegerControl
              label="Số điện thoại"
              control={control}
              name="phoneNumber"
              placeholder="Số điện thoại"
              inputProps={{
                type: 'number',
              }}
            />
            {!userId && (
              <TextFieldControl
                label="Mật khẩu"
                rules={{
                  required: 'Vui lòng nhập mật khẩu',
                  validate: (value) => {
                    if (value.length < 6) {
                      return 'Mật khẩu phải có ít nhất 6 ký tự';
                    }
                  },
                }}
                control={control}
                name="password"
                placeholder="Mật khẩu"
                inputProps={{
                  type: 'password',
                }}
              />
            )}
            <SelectControl
              label="Vai trò"
              control={control}
              name="roles"
              options={roles.map((role) => ({
                label: role.name,
                value: role.id,
              }))}
              isHaveDefaultOption
              rules={{
                required: 'Vui lòng chọn vai trò',
              }}
            />
            {!userId && (
              <TextFieldControl
                label="Nhập lại mật khẩu"
                rules={{
                  required: 'Vui lòng nhập lại mật khẩu',
                  validate: (value) => {
                    if (getValues('password') !== value) {
                      return 'Mật khẩu không khớp';
                    }
                  },
                }}
                control={control}
                name="confirmPassword"
                placeholder="Nhập lại mật khẩu"
                inputProps={{
                  type: 'password',
                }}
              />
            )}
            <div className="col-span-2">
              <TextFieldControl
                label="Địa chỉ"
                control={control}
                name="address"
                placeholder="Địa chỉ"
              />
            </div>
          </div>
        }
        action={
          <>
            <button type="button" className="btn-outline-secondary" onClick={handleClose}>
              Đóng
            </button>
            <button type="submit" className="btn-primary">
              {userId ? 'Cập nhật' : 'Thêm mới'}
            </button>
          </>
        }
      />
    </form>
  );
};

export default UserManagerModal;

const DEFAULT_VALUES = {
  username: '',
  email: '',
  fullName: '',
  phoneNumber: '',
  address: '',
  roles: null,
  dob: '',
  password: '',
  confirmPassword: '',
};

UserManagerModal.propTypes = {
  open: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
  userId: PropTypes.string,
};
