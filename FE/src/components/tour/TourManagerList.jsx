import TourItem from '@/components/tour/TourItem';

const TourManagerList = () => {
  return (
    <div className="flex flex-col gap-4">
      {Array.from({ length: 10 }).map((_, index) => (
        <TourItem key={index} isManager />
      ))}
    </div>
  );
};

export default TourManagerList;
