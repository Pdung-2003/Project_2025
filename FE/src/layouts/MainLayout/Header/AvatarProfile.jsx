import { IMAGE_CONSTANT } from '@/constants/image.constant';
import { useAuthActions } from '@/hooks/useAuthActions';
import { LogOut, Truck, User } from 'lucide-react';
import { useEffect, useRef, useState } from 'react';
import { Link } from 'react-router-dom';

const AvatarProfile = () => {
  const { logout } = useAuthActions();
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const dropdownRef = useRef(null);

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
              <Link to={`/profile`} className="w-full text-left hover:bg-gray-100 px-2 py-1 flex">
                <User className="mr-2" />
                Hồ sơ cá nhân
              </Link>
            </li>
            <li>
              <Link to={`/order`} className="w-full text-left hover:bg-gray-100 px-2 py-1 flex">
                <Truck className="mr-2" />
                Đơn hàng
              </Link>
            </li>
            <li>
              <button
                className="w-full text-left hover:bg-gray-100 px-2 py-1 text-red-600"
                onClick={logout}
              >
                <LogOut className="inline mr-2" />
                Đăng xuất
              </button>
            </li>
          </ul>
        </div>
      )}
    </div>
  );
};

export default AvatarProfile;
