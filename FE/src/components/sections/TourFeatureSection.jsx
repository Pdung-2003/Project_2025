import TourCard from '@/components/tour/TourCard';
import { Link } from 'react-router-dom';

const TourFeatureSection = () => {
  return (
    <div className="flex flex-col gap-2">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold">Tour nổi bật</h2>
        <Link to="/tours" className="hover:text-blue-600">
          Xem thêm
        </Link>
      </div>
      <div className="grid grid-cols-3 gap-5">
        {Array.from({ length: 9 }).map((_, index) => (
          <TourCard key={index} />
        ))}
      </div>
    </div>
  );
};

export default TourFeatureSection;
