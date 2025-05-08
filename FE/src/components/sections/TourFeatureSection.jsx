import TourCard from '@/components/tour/TourCard';
import { getTours } from '@/services/tour.service';
import { useEffect } from 'react';
import { Link } from 'react-router-dom';

const TourFeatureSection = () => {
  const fetchTours = async () => {
    try {
      const response = await getTours({
        pageNumber: 1,
        pageSize: 6,
      });
      console.log(response);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchTours();
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
        {Array.from({ length: 6 }).map((_, index) => (
          <TourCard key={index} />
        ))}
      </div>
    </div>
  );
};

export default TourFeatureSection;
