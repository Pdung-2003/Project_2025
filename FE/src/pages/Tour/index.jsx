import TourFilter from '@/components/tour/TourFilter';
import TourItem from '@/components/tour/TourItem';

const Tour = () => {
  return (
    <div className="container max-w-[1160px] mx-auto mt-10 flex flex-row gap-5">
      <TourFilter />
      <div className="flex flex-col gap-2">
        <div className="flex justify-between items-center">
          <h2 className="text-2xl font-bold">Danh sách tour</h2>
        </div>
        <div className="grid gap-5">
          {Array.from({ length: 9 }).map((_, index) => (
            <TourItem key={index} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default Tour;
