import { MapPin, MapPinCheckInside } from 'lucide-react';
import { useState } from 'react';

const SearchTour = () => {
  const [showLocation, setShowLocation] = useState(false);

  const featuredLocations = [
    { name: 'Thái Lan', tours: 31, image: '/thailand.jpg' },
    { name: 'Nhật Bản', tours: 38, image: '/japan.jpg' },
    { name: 'Hàn Quốc', tours: 38, image: '/korea.jpg' },
    { name: 'Trung Quốc', tours: 51, image: '/china.jpg' },
    { name: 'Sapa', tours: 20, image: '/sapa.jpg' },
    { name: 'Đà Nẵng', tours: 33, image: '/danang.jpg' },
    { name: 'Nha Trang', tours: 39, image: '/nhatrang.jpg' },
    { name: 'Ninh Bình', tours: 14, image: '/ninhbinh.jpg' },
  ];

  const domesticRegions = ['Miền Bắc', 'Miền Trung', 'Miền Nam'];
  const abroadRegions = ['Đông Nam Á', 'Châu Á', 'Châu Âu', 'Châu Úc'];

  return (
    <div className="flex flex-col mx-auto bg-white gap-5 w-[888px] rounded-2xl border border-gray-300 p-5 shadow-md mt-[-70px] relative">
      <h1 className="text-3xl font-bold text-gray-700">Tìm tour giá tốt</h1>
      <div className="border-t border-gray-300"></div>

      {/* Search Location */}
      <div className="flex flex-row gap-2 relative justify-between">
        <div
          className="flex flex-row gap-2 items-center cursor-pointer"
          onClick={() => setShowLocation(!showLocation)}
        >
          <MapPin className="h-[50px] w-[42px] text-gray-400" />
          <div className="flex flex-col gap-1">
            <h2 className="text-sm font-medium text-gray-400 uppercase">Địa điểm</h2>
            <span className="text-gray-700 font-semibold">Bạn muốn đi đâu?</span>
          </div>
        </div>
        <div
          className="flex flex-row gap-2 items-center cursor-pointer"
          onClick={() => setShowLocation(!showLocation)}
        >
          <MapPinCheckInside className="h-[50px] w-[42px] text-gray-400" />
          <div className="flex flex-col gap-1">
            <h2 className="text-sm font-medium text-gray-400 uppercase">Khởi hành từ</h2>
            <span className="text-gray-700 font-semibold">Vui lòng chọn</span>
          </div>
        </div>
        <button className="btn-primary px-4 py-2 rounded-lg min-w-[200px]">Tìm kiếm</button>

        {/* Dropdown */}
        {showLocation && (
          <div className="absolute top-14 left-0 bg-white w-[800px] p-5 shadow-lg border border-gray-300 rounded-lg z-10 animate-fade-in">
            <div className="absolute -top-2 left-15">
              <div className="w-4 h-4 bg-white rotate-45 border-l border-t border-gray-300"></div>
            </div>
            <h3 className="text-orange-500 text-lg font-bold mb-4">ĐỊA ĐIỂM NỔI BẬT</h3>
            <div className="grid grid-cols-4 gap-4 mb-6">
              {featuredLocations.map((loc, idx) => (
                <div key={idx} className="flex flex-col items-center gap-2">
                  <img
                    src={loc.image}
                    alt={loc.name}
                    className="h-[80px] w-[100px] object-cover rounded-md"
                  />
                  <div className="text-center text-sm font-medium text-gray-700">{loc.name}</div>
                  <div className="text-xs text-gray-400">{loc.tours} tour</div>
                </div>
              ))}
            </div>

            <div className="grid grid-cols-2 gap-10">
              {/* Du lịch trong nước */}
              <div>
                <h4 className="text-orange-500 font-semibold mb-2">DU LỊCH TRONG NƯỚC</h4>
                <ul className="flex flex-col gap-2">
                  {domesticRegions.map((region, idx) => (
                    <li
                      key={idx}
                      className="flex items-center gap-2 cursor-pointer hover:underline"
                    >
                      <span className="text-gray-700">▶</span>
                      <span className="text-gray-700">{region}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Du lịch nước ngoài */}
              <div>
                <h4 className="text-orange-500 font-semibold mb-2">DU LỊCH NƯỚC NGOÀI</h4>
                <ul className="flex flex-col gap-2">
                  {abroadRegions.map((region, idx) => (
                    <li
                      key={idx}
                      className="flex items-center gap-2 cursor-pointer hover:underline"
                    >
                      <span className="text-gray-700">▶</span>
                      <span className="text-gray-700">{region}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default SearchTour;
