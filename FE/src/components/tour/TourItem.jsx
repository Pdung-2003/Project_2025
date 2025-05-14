import { Edit } from 'lucide-react';
import PropTypes from 'prop-types';
import { useNavigate } from 'react-router-dom';

const TourItem = ({ tour, isManager = false }) => {
  const navigate = useNavigate();

  return (
    <div
      className="flex flex-row bg-white overflow-hidden border border-gray-200 h-full w-full cursor-pointer"
      onClick={() => navigate(`/tour-details/${tour?.tourId}`)}
    >
      {/* Image */}
      <div className="w-1/3 aspect-[3/2] bg-gray-100">
        <img src={tour?.tourBanner} alt="Tour Image" className="w-full h-full object-contain" />
      </div>

      {/* Content */}
      <div className="p-4 flex flex-col justify-between w-2/3">
        {/* Title & Rating */}
        <div className="flex justify-between items-start">
          <div className="flex flex-col gap-2">
            <h2 className="text-lg font-bold text-gray-800 leading-tight hover:text-blue-600">
              {tour?.tourName}
            </h2>
            <p className="text-sm text-gray-500 italic line-clamp-2">{tour?.description}</p>
            <p className="text-sm text-gray-500">{tour?.manager?.fullName}</p>
          </div>
          {/* <div className="flex items-center gap-2">
              <span className="bg-blue-600 text-white text-sm font-bold px-2 py-1 rounded">
                8.9
              </span>
              <span className="text-gray-700 font-medium">Rất tốt - 13 đánh giá</span>
            </div> */}
          {isManager && (
            <div className="flex items-center gap-2">
              <button className="text-blue-600 hover:text-blue-800">
                <Edit className="w-5 h-5" />
              </button>
            </div>
          )}
        </div>

        {/* Info */}
        <div className="flex flex-wrap gap-4 text-sm text-gray-600 mt-4">
          <div className="flex items-center gap-1">
            <i className="fa fa-map-marker-alt"></i> {tour?.location}
          </div>
          <div className="flex items-center gap-1">
            <i className="fa fa-calendar-alt"></i> {tour?.duration}
          </div>
        </div>

        {/* Buttons & Price */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mt-4 gap-4">
          {/* <div className="flex flex-wrap gap-2">
            <button className="bg-orange-100 text-orange-600 border border-orange-400 px-3 py-1 rounded text-sm font-medium">
              ĐẶT SỚM: Giảm 500K
            </button>
            <button className="bg-blue-100 text-blue-600 border border-blue-400 px-3 py-1 rounded text-sm font-medium">
              Tặng Vali Cao Cấp 1,5 Triệu Đồng
            </button>
          </div> */}
          <div className="flex items-center gap-2">
            {tour?.discount && (
              <span className="line-through text-gray-400 text-sm">
                {tour?.price?.toLocaleString('vi-VN', {
                  style: 'currency',
                  currency: 'VND',
                })}
              </span>
            )}
            <span className="text-red-600 text-xl font-bold">
              {((tour?.price || 0) - (tour?.discount || 0))?.toLocaleString('vi-VN', {
                style: 'currency',
                currency: 'VND',
              })}
            </span>
          </div>
        </div>

        {/* Tag */}
        {/* <div className="mt-3">
          <span className="inline-block bg-gray-100 text-gray-700 px-2 py-1 rounded text-xs font-medium">
            7N6Đ
          </span>
        </div> */}
      </div>
    </div>
  );
};

export default TourItem;

TourItem.propTypes = {
  tour: PropTypes.object.isRequired,
  isManager: PropTypes.bool,
};
