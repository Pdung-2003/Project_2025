import TourCard from '@/components/tour/TourCard';
import { useTourState } from '@/contexts/TourContext';
import { useTourActions } from '@/hooks/useTourActions';
import { useEffect } from 'react';
import { Link } from 'react-router-dom';

const TourFeatureSection = () => {
  const { tours } = useTourState();
  const { fetchTours } = useTourActions();

  useEffect(() => {
    fetchTours({ pageNumber: 1, pageSize: 6 });
  }, []);

  return (
    <div className="flex flex-col gap-2">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold">Tour nổi bật</h2>
        <Link to="/tours" className="hover:text-blue-600">
          Xem thêm
        </Link>
      </div>
      <div className="grid grid-cols-3 gap-5">
        {tours.map((tour) => (
          <TourCard key={tour.id} tour={tour} />
        ))}
      </div>
    </div>
  );
};

export default TourFeatureSection;
