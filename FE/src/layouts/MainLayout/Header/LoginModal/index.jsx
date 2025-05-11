import AppModal from '@/components/common/AppModal';
import PropTypes from 'prop-types';
import { useState } from 'react';
import LoginForm from './LoginForm';
import RegisterForm from './RegisterForm';

const LoginModal = ({ open, onClose }) => {
  const [activeTab, setActiveTab] = useState('login');

  if (!open) return null;

  const handleClose = () => {
    setActiveTab('login');
    onClose();
  };

  return (
    <AppModal
      open={open}
      onClose={handleClose}
      title={activeTab === 'login' ? 'Đăng nhập' : 'Đăng ký'}
      titleProps={{ className: 'text-center' }}
      paperProps={{
        className: 'max-w-lg',
      }}
      content={
        <div className="flex flex-col gap-4">
          <div className="flex flex-row space-x-2 bg-[#f4f4f5] text-[#71717a] rounded-lg p-1">
            <button
              className={`w-full p-1 rounded-lg cursor-pointer ${activeTab === 'login' ? 'bg-white text-black' : 'bg-transparent'}`}
              onClick={() => setActiveTab('login')}
            >
              Đăng nhập
            </button>
            <button
              className={`w-full p-1 rounded-lg cursor-pointer ${activeTab === 'register' ? 'bg-white text-black' : 'bg-transparent'}`}
              onClick={() => setActiveTab('register')}
            >
              Đăng ký
            </button>
          </div>
          <div className="flex flex-col p-5 bg-white">
            {activeTab === 'login' ? (
              <LoginForm />
            ) : (
              <RegisterForm onSuccess={() => setActiveTab('login')} />
            )}
          </div>
        </div>
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
