import TextField from '@/components/common/TextFieldControl';
import { useAuthDispatch } from '@/contexts/AuthContext';
import { useAuthActions } from '@/hooks/useAuthActions';
import { login } from '@/services/auth.service';
import { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { toast } from 'react-toastify';

const LoginForm = () => {
  const dispatch = useAuthDispatch();
  const { fetchProfile } = useAuthActions();
  const { control, handleSubmit, reset, setError } = useForm({
    defaultValues: INIT_VALUES,
  });

  const onSubmit = async (data) => {
    try {
      const response = await login(data);
      if (response?.code === 1000) {
        dispatch({
          type: 'LOGIN',
          payload: response?.result?.token,
        });
        await fetchProfile();
        toast.success('Đăng nhập thành công');
      } else {
        toast.error(response?.message || 'Đăng nhập thất bại');
      }
    } catch (error) {
      if (error?.response?.data?.code === 1006) {
        setError('password', { message: 'Tài khoản hoặc mật khẩu không chính xác' });
      } else {
        toast.error(error?.response?.data?.message || 'Đăng nhập thất bại');
      }
    }
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
          label="Tài khoản"
          rules={{
            required: 'Vui lòng nhập tài khoản',
            validate: (value) => {
              if (value.length < 4) {
                return 'Tài khoản phải có ít nhất 4 ký tự';
              }
            },
          }}
          control={control}
          name="username"
          placeholder="Tài khoản"
        />
      </div>
      <div className="flex flex-col gap-2">
        <TextField
          label="Mật khẩu"
          rules={{
            required: 'Vui lòng nhập mật khẩu',
            validate: (value) => {
              if (value.length < 3) {
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
  username: '',
  password: '',
};
