import TourFilter from '@/components/tour/TourFilter';
import TourItem from '@/components/tour/TourItem';
import { useTourDispatch, useTourState } from '@/contexts/TourContext';
import { useTourActions } from '@/hooks/useTourActions';
import { ChevronLeftIcon, ChevronRightIcon } from 'lucide-react';
import { useEffect } from 'react';

const Tour = () => {
  const dispatch = useTourDispatch();
  const { tours, pagination, filter, totalElements, totalPages } = useTourState();
  const { fetchTours } = useTourActions();

  const handleChangePage = (page) => {
    dispatch({ type: 'SET_PAGINATION', payload: { ...pagination, page } });
  };

  useEffect(() => {
    fetchTours({ ...pagination, ...filter });
  }, [pagination, filter]);

  return (
    <div className="container max-w-[1160px] mx-auto mt-10 flex flex-row gap-5 w-full">
      <TourFilter />
      <div className="flex flex-col gap-2 w-full">
        <div className="flex justify-between items-center">
          <h2 className="text-2xl font-bold">Danh sách tour</h2>
        </div>
        <div className="grid gap-5">
          {tours.map((tour, index) => (
            <TourItem key={index} tour={tour} />
          ))}
        </div>
        <div className="flex justify-between items-center">
          <p>
            Tổng số tour: <span className="font-bold">{totalElements}</span>
          </p>
          <div className="flex gap-2">
            <button
              className="p-2 rounded-full bg-gray-200 disabled:opacity-50 disabled:cursor-default"
              disabled={pagination.pageNumber === 1}
              onClick={() => handleChangePage(pagination.pageNumber - 1)}
            >
              <ChevronLeftIcon />
            </button>
            <button
              className="p-2 rounded-full bg-gray-200 disabled:opacity-50 disabled:cursor-default"
              disabled={pagination.pageNumber === totalPages}
              onClick={() => handleChangePage(pagination.pageNumber + 1)}
            >
              <ChevronRightIcon />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Tour;
