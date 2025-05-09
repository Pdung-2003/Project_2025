import TourManagerList from '@/components/tour/TourManagerList';
import { useTourDispatch } from '@/contexts/TourContext';
import { useEffect } from 'react';

const TourManager = () => {
  const dispatch = useTourDispatch();

  useEffect(() => {
    return () => {
      dispatch({ type: 'RESET_INITIAL_STATE' });
    };
  }, []);

  return (
    <div className="container max-w-[1160px] mx-auto mt-10 flex flex-row gap-5">
      <div className="flex flex-col gap-2 w-full">
        <div className="flex justify-between items-center">
          <h2 className="text-2xl font-bold">Quản lý tour</h2>
        </div>
        <div className="h-full">
          <TourManagerList />
        </div>
      </div>
    </div>
  );
};

export default TourManager;
