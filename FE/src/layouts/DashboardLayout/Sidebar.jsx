import { useAuthState } from '@/contexts/AuthContext';
import { MapIcon, Truck, UserIcon } from 'lucide-react';
import { useMemo } from 'react';
import { Link } from 'react-router-dom';

const Sidebar = () => {
  const { user } = useAuthState();
  const sidebarItems = useMemo(() => {
    if (user?.roles?.some((role) => role.name === 'ADMIN')) {
      return SIDEBAR_ITEMS.filter((item) => item.path !== '/request-booking');
    }
    return SIDEBAR_ITEMS.filter((item) => item.path !== '/user-manager');
  }, [user?.roles]);

  return (
    <div className="w-[250px] h-full flex flex-col items-center border-r border-gray-200 bg-[var(--primary)]">
      <div className="py-4 px-5">
        <img
          src={'https://www.bestprice.vn/assets/img/bestpricetravel-logo-28122023.png'}
          alt="logo"
          className="w-full h-full"
        />
      </div>
      <div className="flex flex-col w-full spacing-y-2 px-5">
        {sidebarItems.map((item) => (
          <Link to={item.path} key={item.path} className="w-full">
            <button className="flex flex-row justify-start gap-2 w-full text-white p-2 hover:bg-[var(--primary-hover)] rounded-md">
              {item.icon}
              {item.label}
            </button>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default Sidebar;

const SIDEBAR_ITEMS = [
  // {
  //   label: 'Dashboard',
  //   icon: <HomeIcon />,
  //   path: '/dashboard',
  // },
  {
    label: 'User Manager',
    icon: <UserIcon />,
    path: '/user-manager',
  },
  {
    label: 'Tour Manager',
    icon: <MapIcon />,
    path: '/tour-manager',
  },
  {
    label: 'Request Booking',
    icon: <Truck />,
    path: '/request-booking',
  },
];
