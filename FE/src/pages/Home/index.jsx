import Banner from '@/components/sections/Banner';
import TourFeatureSection from '@/components/sections/TourFeatureSection';

const HomePage = () => {
  return (
    <div>
      <Banner />
      <div className="container max-w-[1160px] mx-auto flex flex-col gap-10">
        {/* <SearchTour /> */}
        {/* <Category /> */}
        <TourFeatureSection />
      </div>
    </div>
  );
};

export default HomePage;
