import TextFieldControl from '@/components/common/TextFieldControl';
import { useAuthState } from '@/contexts/AuthContext';
import { useEffect } from 'react';
import { useForm } from 'react-hook-form';

const ProfileForm = () => {
  const { user } = useAuthState();
  const { control, setValue } = useForm({
    defaultValues: INIT_VALUES,
  });

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
      <div className="grid grid-cols-2 space-x-3 space-y-1">
        <TextFieldControl control={control} label="Tên tài khoản" name="username" />
        <TextFieldControl control={control} label="Email" name="email" />
        <TextFieldControl control={control} label="Họ tên" name="fullName" />
        <TextFieldControl control={control} label="Số điện thoại" name="phoneNumber" />
        <div className="col-span-2">
          <TextFieldControl control={control} label="Địa chỉ" name="address" />
        </div>
        <div className="col-span-2 flex justify-end">
          <button className="btn-primary">Cập nhật</button>
        </div>
      </div>
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
