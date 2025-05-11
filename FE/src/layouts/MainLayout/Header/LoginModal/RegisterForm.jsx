import TextField from '@/components/common/TextFieldControl';
import { authService } from '@/services';
import PropTypes from 'prop-types';
import { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { toast } from 'react-toastify';

const RegisterForm = ({ onSuccess }) => {
  const { control, handleSubmit, getValues, reset } = useForm({
    defaultValues: INIT_VALUES,
  });

  const onSubmit = async (data) => {
    try {
      const response = await authService.register(data);
      console.log(response);
      toast.success('Đăng ký tài khoản thành công');
      onSuccess?.();
      reset(INIT_VALUES);
    } catch (error) {
      console.log(error);
      toast.error(error?.response?.data?.message || 'Đăng ký thất bại');
    }
  };

  useEffect(() => {
    return () => {
      reset(INIT_VALUES);
    };
  }, [reset]);

  return (
    <form className="flex flex-col gap-4" onSubmit={handleSubmit(onSubmit)}>
      <TextField
        label="Họ tên"
        rules={{ required: 'Vui lòng nhập họ tên' }}
        control={control}
        name="fullName"
        placeholder="Họ tên"
      />
      <TextField
        label="Email"
        rules={{
          required: 'Vui lòng nhập email',
          pattern: { value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/, message: 'Email không hợp lệ' },
        }}
        control={control}
        name="email"
        placeholder="Email"
      />
      <TextField
        label="Tên đăng nhập"
        rules={{ required: 'Vui lòng nhập tên đăng nhập' }}
        control={control}
        name="username"
        placeholder="Tên đăng nhập"
      />
      <div className="flex flex-col gap-2">
        <TextField
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
      </div>
      <div className="flex flex-col gap-2">
        <TextField
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
      </div>
      <button type="submit" className="btn-primary">
        Đăng ký
      </button>
    </form>
  );
};

export default RegisterForm;

const INIT_VALUES = {
  email: '',
  password: '',
  confirmPassword: '',
};

RegisterForm.propTypes = {
  onSuccess: PropTypes.func,
};
