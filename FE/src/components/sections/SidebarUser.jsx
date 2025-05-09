import { USER_MANAGER_TABS } from '@/constants/app.constant';
import { useAuthActions } from '@/hooks/useAuthActions';
import PropTypes from 'prop-types';

const SidebarUser = ({ tab, setTab }) => {
  const { logout } = useAuthActions();
  return (
    <div className="h-full flex flex-col space-y-4 px-3 py-5 min-w-[200px]">
      <button
        className={`text-sm font-medium  text-left py-2 px-4 hover:bg-gray-100  rounded-lg ${
          tab === USER_MANAGER_TABS.PROFILE ? 'bg-gray-100 text-black' : 'text-gray-500'
        }`}
        onClick={() => setTab(USER_MANAGER_TABS.PROFILE)}
      >
        Hồ sơ cá nhân
      </button>
      <button
        className={`text-sm font-medium  text-left py-2 px-4 hover:bg-gray-100 rounded-lg ${
          tab === USER_MANAGER_TABS.ORDER ? 'bg-gray-100 text-black' : 'text-gray-500'
        }`}
        onClick={() => setTab(USER_MANAGER_TABS.ORDER)}
      >
        Đơn hàng
      </button>
      <button
        className={`text-sm font-medium text-red-600  text-left py-2 px-4 hover:bg-red-600 hover:text-white rounded-lg`}
        onClick={logout}
      >
        Đăng xuất
      </button>
    </div>
  );
};

export default SidebarUser;

SidebarUser.propTypes = {
  tab: PropTypes.string.isRequired,
  setTab: PropTypes.func.isRequired,
};
