import { useAuthState } from '@/contexts/AuthContext';
import AvatarProfile from '@/layouts/MainLayout/Header/AvatarProfile';
import LoginModal from '@/layouts/MainLayout/Header/LoginModal';
import { useState } from 'react';

const RightHeader = () => {
  const { isAuthenticated } = useAuthState();
  const [isLoginModalOpen, setIsLoginModalOpen] = useState(false);

  return (
    <div className="flex flex-row items-center h-full">
      {isAuthenticated ? (
        <AvatarProfile />
      ) : (
        <>
          <p
            className="p-2 text-lg font-semibold hover:cursor-pointer hover:text-gray-700"
            onClick={() => setIsLoginModalOpen(true)}
          >
            Đăng nhập
          </p>
          <LoginModal open={isLoginModalOpen} onClose={() => setIsLoginModalOpen(false)} />
        </>
      )}
      <div className="flex flex-row items-center space-x-2 px-2  border-l border-gray-300">
        <img
          src={'https://www.bestprice.vn/assets/img/icon/ho-tro.png'}
          alt="icon"
          width={38}
          height={38}
        />
        <div className="flex flex-col">
          <p
            className="text-lg font-semibold text-red-800"
            style={{
              lineHeight: '24px',
            }}
          >
            1900 2605
          </p>
          <p
            style={{
              lineHeight: '20px',
            }}
          >
            (024/028) 7307 2605
          </p>
        </div>
      </div>
    </div>
  );
};

export default RightHeader;
