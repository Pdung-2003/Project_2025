import Banner from '@/components/sections/Banner';
import Category from '@/components/sections/Category';
import SearchTour from '@/components/sections/SearchTour';
import TourCard from '@/components/tour/TourCard';

const HomePage = () => {
  return (
    <div>
      <Banner />
      <div className="container max-w-[1160px] mx-auto flex flex-col gap-10">
        <SearchTour />
        <Category />
        <TourCard />
      </div>
    </div>
  );
};

export default HomePage;
