import { IMAGE_CONSTANT } from '@/constants/image.constant';
import { MapPin } from 'lucide-react';

const TourCard = () => {
  return (
    <div className="w-full max-w-sm bg-white shadow-md border border-gray-300 overflow-hidden flex flex-col">
      {/* Hình ảnh */}
      <img src={IMAGE_CONSTANT.NO_IMAGE} alt="Tour Image" className="w-full h-48 object-contain" />

      {/* Nội dung */}
      <div className="flex flex-col p-4 flex-grow">
        {/* Tiêu đề */}
        <h2 className="text-lg font-semibold text-gray-800 mb-2">
          Tour du lịch Úc: Hồ Chí Minh - Melbourne - Sydney 7N6Đ
        </h2>

        {/* Đánh giá */}
        <div className="flex items-center gap-2 mb-2">
          <div className="bg-blue-500 text-white text-sm font-semibold px-2 py-1 rounded">8.7</div>
          <span className="text-blue-500 text-sm font-semibold">Rất tốt</span>
          <span className="text-gray-500 text-sm">- 11 đánh giá</span>
        </div>

        {/* Review quote */}
        <blockquote className="text-sm text-gray-600 italic leading-snug mb-2 line-clamp-2">
          &quot;Tour Sydney bên này ổn áp, giá hợp lý mà đi được nhiều nơi đẹp. Nhà hát Con Sò ngoài
          đời nhìn hoành tráng hơn trên hình...&quot;
        </blockquote>

        <div className="text-xs text-gray-500 mb-4">Thiên Long</div>

        {/* Địa điểm */}
        <div className="flex items-center text-gray-600 text-sm mb-4">
          <MapPin className="h-4 w-4 mr-1" />
          Hồ Chí Minh - Sydney - Melbourne
        </div>

        {/* Footer */}
        <div className="flex items-center justify-between mt-auto">
          <div className="px-2 py-1 text-sm border rounded-md text-gray-700">7N6Đ</div>
          <div className="flex flex-col items-end">
            <span className="text-gray-400 line-through text-sm">43.900.000₫</span>
            <span className="text-red-600 font-bold text-lg">42.900.000₫</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TourCard;
