import { IMAGE_CONSTANT } from '@/constants/image.constant';
import { useAuthState } from '@/contexts/AuthContext';
import { useAuthActions } from '@/hooks/useAuthActions';
import { Cog, LayoutDashboard, LogOut, User } from 'lucide-react';
import { useEffect, useMemo, useRef, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

const AvatarProfile = () => {
  const { logout } = useAuthActions();
  const { user } = useAuthState();
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const dropdownRef = useRef(null);
  const navigate = useNavigate();

  const isManager = useMemo(() => {
    return user?.roles.some((role) => role.name === 'TOUR_MANAGER');
  }, [user]);

  const isAdmin = useMemo(() => {
    return user?.roles.some((role) => role.name === 'ADMIN');
  }, [user]);

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
            {!isAdmin && !isManager && (
              <li>
                <Link to={`/profile`} className="w-full text-left hover:bg-gray-100 px-2 py-1 flex">
                  <User className="mr-2" />
                  Hồ sơ cá nhân
                </Link>
              </li>
            )}
            {isAdmin && (
              <li>
                <Link
                  to={`/dashboard`}
                  className="w-full text-left hover:bg-gray-100 px-2 py-1 flex"
                >
                  <LayoutDashboard className="mr-2" />
                  Quản lý hệ thống
                </Link>
              </li>
            )}
            {isManager && (
              <li>
                <Link
                  to={`/tour-manager`}
                  className="w-full text-left hover:bg-gray-100 px-2 py-1 flex"
                >
                  <Cog className="mr-2" />
                  Quản lý tour
                </Link>
              </li>
            )}
            <li>
              <button
                className="w-full text-left hover:bg-gray-100 px-2 py-1 text-red-600"
                onClick={() => {
                  logout();
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
  );
};

export default AvatarProfile;
