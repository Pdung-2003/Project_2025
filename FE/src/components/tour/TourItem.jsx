import { Edit } from 'lucide-react';
import PropTypes from 'prop-types';

const TourItem = ({ isManager = false }) => {
  return (
    <div className="flex flex-col md:flex-row bg-white overflow-hidden border border-gray-200 h-full w-full">
      {/* Image */}
      <div className="md:w-1/3">
        <img src="/images/tour-image.png" alt="Tour Image" className="w-full h-full object-cover" />
      </div>

      {/* Content */}
      <div className="p-4 flex flex-col justify-between md:w-2/3">
        {/* Title & Rating */}
        <div className="flex flex-col gap-2">
          <div className="flex justify-between items-center">
            <div className="flex items-center gap-2">
              <span className="bg-blue-600 text-white text-sm font-bold px-2 py-1 rounded">
                8.9
              </span>
              <span className="text-gray-700 font-medium">Rất tốt - 13 đánh giá</span>
            </div>
            {isManager && (
              <div className="flex items-center gap-2">
                <button className="text-blue-600 hover:text-blue-800">
                  <Edit className="w-4 h-4" />
                </button>
              </div>
            )}
          </div>
          <h2 className="text-lg font-bold text-gray-800 leading-tight">
            Du Lịch Trung Quốc: Hà Nội - Bắc Kinh - Thượng Hải - Hàng Châu - Tô Châu 7N6Đ
          </h2>
          <p className="text-sm text-gray-500 italic">
            Trải nghiệm đi tàu cao tốc ở Trung Quốc, vừa nhanh vừa êm...
          </p>
          <p className="text-sm text-gray-500">Ngọc Hương</p>
        </div>

        {/* Info */}
        <div className="flex flex-wrap gap-4 text-sm text-gray-600 mt-4">
          <div className="flex items-center gap-1">
            <i className="fa fa-map-marker-alt"></i> Hà Nội - Bắc Kinh - Thượng Hải - Hàng Châu
          </div>
          <div className="flex items-center gap-1">
            <i className="fa fa-calendar-alt"></i> Khởi hành: T5: 20 - T6: 6
          </div>
        </div>

        {/* Buttons & Price */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mt-4 gap-4">
          <div className="flex flex-wrap gap-2">
            <button className="bg-orange-100 text-orange-600 border border-orange-400 px-3 py-1 rounded text-sm font-medium">
              ĐẶT SỚM: Giảm 500K
            </button>
            <button className="bg-blue-100 text-blue-600 border border-blue-400 px-3 py-1 rounded text-sm font-medium">
              Tặng Vali Cao Cấp 1,5 Triệu Đồng
            </button>
          </div>
          <div className="flex items-center gap-2">
            <span className="line-through text-gray-400 text-sm">21.990.000đ</span>
            <span className="text-red-600 text-xl font-bold">21.490.000đ</span>
          </div>
        </div>

        {/* Tag */}
        <div className="mt-3">
          <span className="inline-block bg-gray-100 text-gray-700 px-2 py-1 rounded text-xs font-medium">
            7N6Đ
          </span>
        </div>
      </div>
    </div>
  );
};

export default TourItem;

TourItem.propTypes = {
  isManager: PropTypes.bool,
};
