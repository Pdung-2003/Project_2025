import TextField from '@/components/common/TextFieldControl';
import { useEffect } from 'react';
import { useForm } from 'react-hook-form';

const LoginForm = () => {
  const { control, handleSubmit, reset } = useForm({
    defaultValues: INIT_VALUES,
  });

  const onSubmit = (data) => {
    console.log(data);
  };

  useEffect(() => {
    return () => {
      reset(INIT_VALUES);
    };
  }, [reset]);

  return (
    <form className="flex flex-col gap-4" onSubmit={handleSubmit(onSubmit)}>
      <div className="flex flex-col gap-2">
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
      </div>
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
      <button type="submit" className="btn-primary">
        Đăng nhập
      </button>
    </form>
  );
};

export default LoginForm;

const INIT_VALUES = {
  email: '',
  password: '',
};
