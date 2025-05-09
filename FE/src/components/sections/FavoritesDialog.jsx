import AppModal from '@/components/common/AppModal';
import { CheckCircle } from 'lucide-react';
import PropTypes from 'prop-types';
import { useState } from 'react';

const FavoritesDialog = ({ open, onClose }) => {
  const [selectedFavorite, setSelectedFavorite] = useState([]);

  const handleSelectFavorite = (favorite) => {
    if (selectedFavorite.includes(favorite)) {
      setSelectedFavorite((prev) => prev.filter((id) => id !== favorite));
    } else {
      setSelectedFavorite((prev) => [...prev, favorite]);
    }
  };

  return (
    <AppModal
      open={open}
      onClose={onClose}
      title="Danh mục yêu thích của bạn"
      paperProps={{ className: 'max-w-3xl min-w-3xl' }}
      content={
        <div className="flex flex-col gap-5">
          <div className="grid grid-cols-2 md:grid-cols-3 gap-5 w-full overflow-y-auto max-h-[600px]">
            {FAVORITES.map((favorite) => (
              <div
                key={favorite.id}
                className={`relative flex text-center justify-center items-center p-2 border rounded-md shadow-md  
                  min-h-[120px] cursor-pointer transition-all duration-300 ${
                    selectedFavorite.includes(favorite.id)
                      ? 'bg-blue-400/35 border-blue-600 hover:bg-blue-200'
                      : 'hover:bg-gray-100 border-gray-200'
                  }`}
                onClick={() => handleSelectFavorite(favorite.id)}
              >
                <span className="text-md font-semibold">{favorite.name}</span>
                {selectedFavorite.includes(favorite.id) && (
                  <div className="absolute bottom-2 right-2 text-blue-600 px-2 py-1 rounded-full text-xs">
                    <CheckCircle className="w-5 h-5" />
                  </div>
                )}
              </div>
            ))}
          </div>
          <div className="flex justify-end items-center border-t border-gray-300 pt-5">
            <button className="bg-blue-600 text-white px-4 py-2 rounded-md">Xác nhận</button>
          </div>
        </div>
      }
    />
  );
};

export default FavoritesDialog;

FavoritesDialog.propTypes = {
  open: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
};

const FAVORITES = [
  {
    id: 1,
    name: 'Du lịch nghỉ dưỡng',
  },
  {
    id: 2,
    name: 'Du lịch khám phá văn hóa và lịch sử',
  },
  {
    id: 3,
    name: 'Du lịch phiêu lưu và khám phá thiên nhiên',
  },
  {
    id: 4,
    name: 'Du lịch ẩm thực',
  },
  {
    id: 5,
    name: 'Du lịch mua sắm',
  },
  {
    id: 6,
    name: 'Du lịch gia đình',
  },
  {
    id: 7,
    name: 'Du lịch theo nhóm bạn bè hoặc theo team-building',
  },
  {
    id: 8,
    name: 'Du lịch kết hợp công việc (bleisure)',
  },
  {
    id: 9,
    name: 'Du lịch xanh',
  },
  {
    id: 10,
    name: 'Du lịch y tế và chăm sóc sức khỏe',
  },
];
