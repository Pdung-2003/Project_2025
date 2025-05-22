import PropTypes from 'prop-types';
import AppModal from '../common/AppModal';
import { useEffect, useRef, useState } from 'react';
import { useItineraryDispatch, useItineraryState } from '@/contexts/ItineraryContext';
import { useItineraryActions } from '@/hooks/useItineraryActions';
import { itineraryService } from '@/services';
import { toast } from 'react-toastify';

const ItineraryImageModal = ({ open, onClose, itineraryId }) => {
  const { itinerary } = useItineraryState();
  const { fetchItinerary } = useItineraryActions();
  const dispatch = useItineraryDispatch();

  const [deleteImageId, setDeleteImageId] = useState(null);
  const fileInputRef = useRef();

  const handleClose = () => {
    setDeleteImageId(null);
    onClose();
    dispatch({ type: 'SET_ITINERARY', payload: null });
  };

  const handleFileChange = async (e) => {
    const files = e.target.files;
    if (!files || files.length === 0) return;

    try {
      const formData = new FormData();
      for (let file of files) {
        formData.append('files', file); // phải trùng key "files"
      }

      await itineraryService.updateItineraryImage(itineraryId, formData);
      toast.success('Thêm ảnh thành công');
      await fetchItinerary(itineraryId);
    } catch (error) {
      toast.error(error?.response?.data?.message || 'Thêm ảnh thất bại');
    }
  };

  const handleAddImageClick = () => {
    fileInputRef.current.click();
  };

  const handleDeleteImage = async () => {
    if (!deleteImageId) return;

    try {
      await itineraryService.deleteItineraryImage(deleteImageId);
      toast.success('Xoá ảnh thành công');
      await fetchItinerary(itineraryId);
      setDeleteImageId(null);
    } catch (error) {
      toast.error(error?.response?.data?.message || 'Xoá ảnh thất bại');
    }
  };

  useEffect(() => {
    if (itineraryId) {
      fetchItinerary(itineraryId);
    }
  }, [itineraryId]);

  return (
    <>
      <AppModal
        open={open}
        onClose={handleClose}
        title="Ảnh lịch trình"
        paperProps={{ className: 'max-w-3xl' }}
        content={
          <div className="flex flex-col bg-white rounded-xs p-5 gap-4">
            <div className="flex justify-between items-center">
              <p className="text-lg font-bold">Ảnh lịch trình</p>
              <button className="btn-primary" onClick={handleAddImageClick} type="button">
                Thêm ảnh
              </button>
              <input
                type="file"
                accept="image/*"
                multiple
                ref={fileInputRef}
                className="hidden"
                onChange={handleFileChange}
              />
            </div>

            <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
              {itinerary?.images?.map((image) => (
                <div key={image.id} className="relative border rounded w-full aspect-[3/2]">
                  <img
                    src={image.url}
                    alt={image.name}
                    className="w-full h-full object-cover rounded"
                  />
                  <button
                    onClick={() => setDeleteImageId(image.imagePathId)}
                    className="absolute top-2 right-2 bg-red-600 text-white rounded px-2 py-1 text-xs"
                  >
                    Xoá
                  </button>
                </div>
              ))}
            </div>
          </div>
        }
      />

      {/* Modal confirm xoá */}
      {deleteImageId && (
        <div className="fixed inset-0 bg-black/30 bg-opacity-40 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg shadow-lg w-[320px] p-6 animate-fade-in">
            <h3 className="text-lg font-semibold text-center mb-2">Xác nhận xoá</h3>
            <p className="text-sm text-gray-600 text-center mb-6">
              Bạn có chắc chắn muốn xoá ảnh này không?
            </p>
            <div className="flex justify-center gap-4">
              <button
                className="px-4 py-2 rounded-md border border-gray-300 text-gray-700 hover:bg-gray-100 transition"
                onClick={() => setDeleteImageId(null)}
                type="button"
              >
                Hủy
              </button>
              <button
                className="px-4 py-2 rounded-md bg-red-600 text-white hover:bg-red-700 transition"
                onClick={() => {
                  setDeleteImageId(null);
                  handleDeleteImage();
                }}
              >
                Xác nhận
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

ItineraryImageModal.propTypes = {
  open: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
  itineraryId: PropTypes.string.isRequired,
};

export default ItineraryImageModal;
