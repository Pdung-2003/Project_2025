const TourFilter = () => {
  return (
    <div className="w-full md:w-64 flex flex-col gap-5">
      {/* Sort Section */}
      <div className="bg-white border  border-blue-400">
        <div className="p-2 flex justify-between items-center  bg-blue-100">
          <h3 className="text-sm font-semibold text-cyan-600">↕ Sắp xếp</h3>
        </div>
        <div className="p-4 space-y-2 text-sm text-gray-700">
          <label className="flex items-center gap-2">
            <input type="radio" name="sort" defaultChecked />
            BestPrice đề xuất
          </label>
          <label className="flex items-center gap-2">
            <input type="radio" name="sort" />
            Giá thấp đến cao
          </label>
          <label className="flex items-center gap-2">
            <input type="radio" name="sort" />
            Giá cao đến thấp
          </label>
          <label className="flex items-center gap-2">
            <input type="radio" name="sort" />
            Đánh giá tốt nhất
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
        <div className="flex flex-col gap-2 p-4">
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
        </div>

        {/* Mức giá */}
        <div className="flex flex-col gap-2 p-4">
          <p className="text-sm font-medium mb-1">Mức giá trong khoảng</p>
          <div className="space-y-1 text-sm text-gray-700">
            {[
              'Dưới 1 triệu',
              'Từ 1 triệu đến 5 triệu',
              'Từ 5 triệu đến 10 triệu',
              'Từ 10 triệu đến 15 triệu',
              'Trên 15 triệu',
            ].map((price) => (
              <label key={price} className="flex items-center gap-2">
                <input type="checkbox" />
                {price}
              </label>
            ))}
          </div>
        </div>

        {/* Thời gian */}
        <div className="flex flex-col gap-2 p-4">
          <p className="text-sm font-medium mb-1">Thời gian</p>
          <div className="space-y-1 text-sm text-gray-700">
            {[
              'Đi trong ngày',
              '2 ngày 1 đêm',
              '3 ngày 2 đêm',
              '4 ngày 3 đêm',
              '5 ngày 4 đêm',
              '6 ngày 5 đêm',
              '7 ngày 6 đêm',
              'Xem thêm',
            ].map((duration) => (
              <label key={duration} className="flex items-center gap-2">
                <input type="checkbox" />
                {duration}
              </label>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default TourFilter;
