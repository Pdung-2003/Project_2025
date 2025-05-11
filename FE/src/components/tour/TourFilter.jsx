import { useTourDispatch, useTourState } from '@/contexts/TourContext';
import { formatCurrency } from '@/utils/format';

const MAX_PRICE = 100000000; // 1 tỷ đồng

const TourFilter = () => {
  const dispatch = useTourDispatch();
  const { filter } = useTourState();

  const handleSort = (sort) => {
    dispatch({ type: 'SET_FILTER', payload: { ...filter, ...sort } });
  };

  const handleChangeFilter = (key, value) => {
    dispatch({ type: 'SET_FILTER', payload: { ...filter, [key]: value } });
  };

  const formatPriceDisplay = (price) => {
    if (price >= MAX_PRICE) return 'Không giới hạn';
    return formatCurrency(price);
  };

  return (
    <div className="w-full md:min-w-[250px] md:w-64 flex flex-col gap-5">
      {/* Sort Section */}
      <div className="bg-white border  border-blue-400">
        <div className="p-2 flex justify-between items-center  bg-blue-100">
          <h3 className="text-sm font-semibold text-cyan-600">↕ Sắp xếp</h3>
        </div>
        <div className="p-4 space-y-2 text-sm text-gray-700">
          <label className="flex items-center gap-2">
            <input
              type="radio"
              name="sort"
              onChange={() => handleSort({ sortBy: 'price', sortDirection: 'asc' })}
            />
            Giá thấp đến cao
          </label>
          <label className="flex items-center gap-2">
            <input
              type="radio"
              name="sort"
              onChange={() => handleSort({ sortBy: 'price', sortDirection: 'desc' })}
            />
            Giá cao đến thấp
          </label>
        </div>
      </div>

      {/* Filter Section */}
      <div className="bg-white border border-gray-200">
        <div className="p-2 flex justify-between items-center  bg-blue-100">
          <h3 className="text-sm font-semibold text-cyan-600">
            <span>🧰</span> Bộ lọc
          </h3>
        </div>
        {/* Nơi khởi hành */}
        {/* <div className="flex flex-col gap-2 p-4">
          <p className="text-sm font-medium mb-1">Khởi hành</p>
          <div className="space-y-1 text-sm text-gray-700">
            {['Hà Nội', 'Hồ Chí Minh', 'Đà Nẵng', 'Nha Trang', 'Hải Phòng', 'Hạ Long'].map(
              (city) => (
                <label key={city} className="flex items-center gap-2">
                  <input type="checkbox" />
                  {city}
                </label>
              )
            )}
          </div>
        </div> */}

        {/* Mức giá */}
        <div className="flex flex-col gap-2 p-4">
          <p className="text-sm font-medium mb-1">Mức giá trong khoảng</p>
          <div className="space-y-4 text-sm text-gray-700">
            <div className="flex flex-col gap-2">
              <input
                type="range"
                min="0"
                max={MAX_PRICE}
                step="500000"
                value={filter?.minPrice || 0}
                onChange={(e) => handleChangeFilter('minPrice', Number(e.target.value))}
                className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-blue-500"
              />
              <input
                type="range"
                min="0"
                max={MAX_PRICE}
                step="500000"
                value={filter?.maxPrice || MAX_PRICE}
                onChange={(e) =>
                  handleChangeFilter(
                    'maxPrice',
                    Number(e.target.value) === MAX_PRICE ? null : Number(e.target.value)
                  )
                }
                className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-blue-500"
              />
            </div>
            <div className="flex justify-between text-xs">
              <span>{formatCurrency(filter?.minPrice || 0)}</span>
              <span>{formatPriceDisplay(filter?.maxPrice || MAX_PRICE)}</span>
            </div>
          </div>
        </div>

        {/* Thời gian */}
        <div className="flex flex-col gap-2 p-4">
          <p className="text-sm font-medium mb-1">Thời gian</p>
          <div className="space-y-1 text-sm text-gray-700">
            <label className="flex items-center gap-2">Ngày đi từ</label>
            <input
              value={filter?.startDateFrom}
              onChange={(e) => handleChangeFilter('startDateFrom', e.target.value)}
              type="date"
              className={`w-full border border-gray-300 rounded-md p-2`}
            />
            <label className="flex items-center gap-2">Ngày đi đến</label>
            <input
              value={filter?.startDateTo}
              onChange={(e) => handleChangeFilter('startDateTo', e.target.value)}
              type="date"
              className={`w-full border border-gray-300 rounded-md p-2`}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default TourFilter;
