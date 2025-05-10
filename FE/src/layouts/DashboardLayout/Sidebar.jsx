import { HomeIcon, MapIcon, UserIcon } from 'lucide-react';
import { Link } from 'react-router-dom';

const Sidebar = () => {
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
        {SIDEBAR_ITEMS.map((item) => (
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
  {
    label: 'Dashboard',
    icon: <HomeIcon />,
    path: '/dashboard',
  },
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
];
