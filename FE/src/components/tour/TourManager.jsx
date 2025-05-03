import TourItem from '@/components/tour/TourItem';

const TourManager = () => {
  return (
    <div className="max-h-[550px] overflow-y-auto">
      <div className="flex flex-col gap-4 overflow-y-auto h-full">
        {Array.from({ length: 10 }).map((_, index) => (
          <TourItem key={index} isManager />
        ))}
      </div>
    </div>
  );
};

export default TourManager;
