import { MapPin } from 'lucide-react';
import PropTypes from 'prop-types';
import { useNavigate } from 'react-router-dom';

const TourCard = ({ tour }) => {
  const navigate = useNavigate();

  return (
    <div
      className="w-full max-w-sm bg-white shadow-md border border-gray-300 overflow-hidden flex flex-col hover:shadow-lg transition-all duration-300 cursor-pointer"
      onClick={() => navigate(`/tour-details/${tour?.tourId}`)}
    >
      {/* Hình ảnh */}
      <div className="h-[200px] aspect-[3/2] bg-gray-100 relative">
        <img src={tour.tourBanner} alt="Tour Image" className="w-full h-full object-contain" />
      </div>

      {/* Nội dung */}
      <div className="flex flex-col p-4 flex-grow">
        {/* Tiêu đề */}
        <h2 className="text-lg font-semibold text-gray-800 mb-2 hover:text-blue-500">
          {tour.tourName}
        </h2>

        {/* Đánh giá */}
        {/* <div className="flex items-center gap-2 mb-2">
          <div className="bg-blue-500 text-white text-sm font-semibold px-2 py-1 rounded">8.7</div>
          <span className="text-blue-500 text-sm font-semibold">Rất tốt</span>
          <span className="text-gray-500 text-sm">- 11 đánh giá</span>
        </div> */}

        {/* Review quote */}
        <blockquote className="text-sm text-gray-600 italic leading-snug mb-2 line-clamp-2">
          &quot;{tour.description}&quot;
        </blockquote>

        <div className="text-xs text-gray-500 mb-4">{tour?.manager?.fullName}</div>

        {/* Địa điểm */}
        <div className="flex items-center text-gray-600 text-sm mb-4">
          <MapPin className="h-4 w-4 mr-1" />
          {tour?.location}
        </div>

        {/* Footer */}
        <div className="flex items-center justify-between mt-auto">
          <div className="px-2 py-1 text-sm border rounded-md text-gray-700">{tour?.duration}</div>
          <div className="flex flex-col items-end">
            {tour?.discount && (
              <span className="text-gray-400 line-through text-sm">
                {tour?.price?.toLocaleString('vi-VN', {
                  style: 'currency',
                  currency: 'VND',
                })}
              </span>
            )}
            <span className="text-red-600 font-bold text-lg">
              {(tour?.price - (tour?.discount || 0))?.toLocaleString('vi-VN', {
                style: 'currency',
                currency: 'VND',
              })}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TourCard;

TourCard.propTypes = {
  tour: PropTypes.object.isRequired,
};
