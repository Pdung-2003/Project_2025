import TourItem from '@/components/tour/TourItem';
import { useAuthState } from '@/contexts/AuthContext';
import { useTourDispatch, useTourState } from '@/contexts/TourContext';
import { useTourActions } from '@/hooks/useTourActions';
import { useEffect } from 'react';

const TourManagerList = () => {
  const dispatch = useTourDispatch();
  const { user } = useAuthState();
  const { fetchTours } = useTourActions();
  const { tours, pagination, filter } = useTourState();

  useEffect(() => {
    if (user?.id) {
      fetchTours({ ...pagination, ...filter, managerId: user.id });
    }
  }, [user?.id, pagination, filter]);

  useEffect(() => {
    return () => {
      dispatch({ type: 'RESET_INITIAL_STATE' });
    };
  }, []);

  return (
    <div className="flex flex-col gap-4">
      {tours.map((tour) => (
        <TourItem tour={tour} key={tour.id} isManager />
      ))}
    </div>
  );
};

export default TourManagerList;
