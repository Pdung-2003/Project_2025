import SidebarUser from '@/components/sections/SidebarUser';
import OrderTour from '@/components/tour/OrderTour';
import TourManager from '@/components/tour/TourManager';
import ProfileForm from '@/components/user/ProfileForm';
import { USER_MANAGER_TABS } from '@/constants/app.constant';
import { useState } from 'react';
const Profile = () => {
  const [tab, setTab] = useState(USER_MANAGER_TABS.PROFILE);

  return (
    <div className="flex flex-row w-full max-w-[1160px] mx-auto mt-10 border border-gray-200 rounded-lg shadow-md h-full">
      <SidebarUser tab={tab} setTab={setTab} />
      <div className="border-r border-gray-200"></div>
      <div className="flex-1 p-5">
        {tab === USER_MANAGER_TABS.PROFILE && <ProfileForm />}
        {tab === USER_MANAGER_TABS.ORDER && <OrderTour />}
        {tab === USER_MANAGER_TABS.TOUR_MANAGER && <TourManager />}
      </div>
    </div>
  );
};

export default Profile;
