import { TITLE_OF_ROUTE } from '@/constants/app.constant';
import { IMAGE_CONSTANT } from '@/constants/image.constant';
import { useAuthActions } from '@/hooks/useAuthActions';
import { Lock, LogOut } from 'lucide-react';
import { useEffect, useMemo, useRef, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

const TopBar = () => {
  const { logout } = useAuthActions();
  const { pathname } = useLocation();
  const navigate = useNavigate();
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const dropdownRef = useRef(null);

  const title = useMemo(() => {
    return TITLE_OF_ROUTE[pathname] || '';
  }, [pathname]);

  const handleClickOutside = (event) => {
    if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
      setIsDropdownOpen(false);
    }
  };

  useEffect(() => {
    if (isDropdownOpen) {
      document.addEventListener('mousedown', handleClickOutside);
    } else {
      document.removeEventListener('mousedown', handleClickOutside);
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isDropdownOpen]);

  return (
    <div className="w-full h-[55px] border-b border-gray-200 flex flex-row items-center justify-between px-5">
      <p className="text-lg font-bold">{title}</p>
      <div className="aspect-square h-full p-2 relative" ref={dropdownRef}>
        <img
          src={IMAGE_CONSTANT.AVATAR_DEFAULT}
          alt="avatar"
          className="rounded-full border border-gray-300"
          onClick={() => setIsDropdownOpen(!isDropdownOpen)}
        />
        {isDropdownOpen && (
          <div className="absolute right-0 mt-2 bg-white shadow-md rounded-lg w-48 z-50 border border-gray-300">
            <ul className="space-y-2 p-2 text-sm text-gray-700">
              <li>
                <button to={`/order`} className="w-full text-left hover:bg-gray-100 px-2 py-1 flex">
                  <Lock className="mr-2" />
                  Đổi mật khẩu
                </button>
              </li>
              <li>
                <button
                  className="w-full text-left hover:bg-gray-100 px-2 py-1 text-red-600"
                  onClick={async () => {
                    await logout();
                    navigate('/');
                  }}
                >
                  <LogOut className="inline mr-2" />
                  Đăng xuất
                </button>
              </li>
            </ul>
          </div>
        )}
      </div>
    </div>
  );
};

export default TopBar;
