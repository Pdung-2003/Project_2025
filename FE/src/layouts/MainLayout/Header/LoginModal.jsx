import AppModal from '@/components/common/AppModal';
import TextField from '@/components/common/TextField';
import PropTypes from 'prop-types';
import { useForm } from 'react-hook-form';

const LoginModal = ({ open, onClose }) => {
  const { control, handleSubmit } = useForm({
    defaultValues: {
      email: '',
      password: '',
    },
  });

  const onSubmit = (data) => {
    console.log(data);
  };

  if (!open) return null;

  return (
    <AppModal
      open={open}
      onClose={onClose}
      title={'Đăng nhập'}
      content={
        <form className="flex flex-col gap-4" onSubmit={handleSubmit(onSubmit)}>
          <div className="flex flex-col gap-2">
            <TextField
              label="Email"
              rules={{
                required: 'Email là bắt buộc',
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
              rules={{ required: 'Mật khẩu là bắt buộc' }}
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
      }
    />
  );
};

export default LoginModal;

LoginModal.propTypes = {
  open: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
  title: PropTypes.string,
  children: PropTypes.node.isRequired,
};
