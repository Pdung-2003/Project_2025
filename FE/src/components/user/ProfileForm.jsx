import TextFieldControl from '@/components/common/TextFieldControl';
import { useAuthState } from '@/contexts/AuthContext';
import { useAuthActions } from '@/hooks/useAuthActions';
import { userService } from '@/services';
import { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { toast } from 'react-toastify';

const ProfileForm = () => {
  const { user } = useAuthState();
  const { control, setValue, handleSubmit } = useForm({
    defaultValues: INIT_VALUES,
  });

  const { fetchProfile } = useAuthActions();

  const onSubmit = async (data) => {
    try {
      await userService.updateProfile(data);
      toast.success('Cập nhật thông tin thành công');
      await fetchProfile();
    } catch (error) {
      console.log(error);
      toast.error(error?.response?.data?.message || 'Cập nhật thông tin thất bại');
    }
  };

  useEffect(() => {
    setValue('username', user?.username);
    setValue('email', user?.email);
    setValue('fullName', user?.fullName);
    setValue('phoneNumber', user?.phoneNumber);
    setValue('address', user?.address);
  }, [user]);

  return (
    <div className="flex flex-col space-y-3">
      <h1 className="text-2xl font-bold">Hồ sơ cá nhân</h1>
      <form className="grid grid-cols-2 space-x-3 space-y-1" onSubmit={handleSubmit(onSubmit)}>
        <TextFieldControl
          control={control}
          label="Email"
          name="email"
          inputProps={{ disabled: true }}
        />
        <TextFieldControl
          control={control}
          label="Họ tên"
          name="fullName"
          rules={{ required: 'Vui lòng nhập họ tên' }}
        />
        <TextFieldControl control={control} label="Số điện thoại" name="phoneNumber" />
        <TextFieldControl
          control={control}
          label="Ngày sinh"
          name="dob"
          rules={{
            validate: (value) => {
              if (
                new Date(value) > new Date() ||
                new Date(value) > new Date(new Date().setFullYear(new Date().getFullYear() - 10))
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
        <div className="col-span-2">
          <TextFieldControl control={control} label="Địa chỉ" name="address" />
        </div>
        <div className="col-span-2 flex justify-end">
          <button className="btn-primary">Cập nhật</button>
        </div>
      </form>
    </div>
  );
};

export default ProfileForm;

const INIT_VALUES = {
  username: '',
  email: '',
  fullName: '',
  phoneNumber: '',
  address: '',
};
