import AppModal from '@/components/common/AppModal';
import ItineraryDetailsModal from '@/components/tour/ItineraryDetailsModal';
import { useItineraryDispatch, useItineraryState } from '@/contexts/ItineraryContext';
import { useItineraryActions } from '@/hooks/useItineraryActions';
import { itineraryService } from '@/services';
import { Ellipsis } from 'lucide-react';
import PropTypes from 'prop-types';
import { useEffect, useState } from 'react';
import { toast } from 'react-toastify';
import ItineraryImageModal from './ItineraryImageModal';

const ItineraryListModal = ({ open, onClose, tourId }) => {
  const dispatch = useItineraryDispatch();
  const { fetchItineraries } = useItineraryActions();
  const { itineraries } = useItineraryState();
  const [itineraryEdit, setItineraryEdit] = useState(null);
  const [isAddItineraryOpen, setIsAddItineraryOpen] = useState(false);
  const [itineraryDelete, setItineraryDelete] = useState(null);
  const [openDropdown, setOpenDropdown] = useState(null);
  const [itineraryImageOpen, setItineraryImageOpen] = useState(null);

  const handleDeleteItinerary = async (id) => {
    try {
      await itineraryService.deleteItinerary(id);
      await fetchItineraries(tourId);
      setItineraryDelete(null);
      toast.success('Xóa lịch trình thành công');
    } catch (error) {
      toast.error(error?.response?.data?.message || 'Lỗi khi xóa lịch trình');
      dispatch({ type: 'SET_ERROR', payload: error.message });
    }
  };

  useEffect(() => {
    fetchItineraries(tourId);
  }, [tourId]);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (!event.target.closest('.dropdown-itinerary')) {
        setOpenDropdown(null);
      }
    };

    document.addEventListener('click', handleClickOutside);
    return () => document.removeEventListener('click', handleClickOutside);
  }, [setOpenDropdown]);

  useEffect(() => {
    const tableEl = document.getElementById('table-itinerary');
    const heightWindow = document.getElementById('itinerary-list-modal').clientHeight;
    const paginationHeight = document.getElementById('pagination').getBoundingClientRect().height;
    const tableTop = tableEl.getBoundingClientRect().top;
    tableEl.style.height = `${heightWindow - tableTop - paginationHeight - 20}px`;
  }, []);

  return (
    <AppModal
      open={open}
      onClose={onClose}
      title="Danh sách lịch trình"
      paperProps={{ className: 'h-full', id: 'itinerary-list-modal' }}
      content={
        <div className="flex flex-col w-full h-full">
          <div className="flex flex-row justify-end m-2 items-center">
            <button className="btn-primary" onClick={() => setIsAddItineraryOpen(true)}>
              Thêm lịch trình
            </button>
          </div>
          <div className="flex flex-col flex-1 mx-2 border border-gray-300 h-full overflow-hidden">
            <div id="table-itinerary" className="overflow-y-auto">
              <table id="table" className="w-full table-auto border-separate z-10">
                <thead className="bg-gray-100 sticky top-0 z-20">
                  <tr>
                    <th className="border border-gray-300 p-2">STT</th>
                    <th className="border border-gray-300 p-2">Tên lịch trình</th>
                    <th className="border border-gray-300 p-2">Ngày lịch trình</th>
                    <th className="border border-gray-300 p-2">Địa điểm</th>
                    <th className="border border-gray-300 p-2">Thao tác</th>
                  </tr>
                </thead>
                <tbody>
                  {itineraries.map((itinerary, index) => (
                    <tr key={itinerary.itineraryId} className="hover:bg-gray-50">
                      <td className="border border-gray-300 text-center p-2">{index + 1}</td>
                      <td className="border border-gray-300 p-2">{itinerary.title}</td>
                      <td className="border border-gray-300 p-2">{itinerary.dayNumberOfTour}</td>
                      <td className="border border-gray-300 p-2">{itinerary.location}</td>
                      <td className="border border-gray-300 p-2 text-center">
                        <div className="flex justify-center gap-2 flex-nowrap relative dropdown-itinerary">
                          <button
                            className="px-2 py-1 rounded-md"
                            onClick={() => {
                              setOpenDropdown(itinerary.itineraryId);
                            }}
                          >
                            <Ellipsis className="w-5 h-5" />
                          </button>
                          {openDropdown === itinerary.itineraryId && (
                            <div className="absolute right-0 top-0 mt-2 w-48 bg-white shadow-md rounded-md z-50">
                              <button
                                onClick={() => {
                                  setOpenDropdown(null);
                                  setItineraryEdit(itinerary.itineraryId);
                                }}
                                className="flex items-center px-4 py-2 hover:bg-gray-100 w-full text-left"
                              >
                                Cập nhật lịch trình
                              </button>
                              <button
                                onClick={() => {
                                  setOpenDropdown(null);
                                  setItineraryImageOpen(itinerary.itineraryId);
                                }}
                                className="flex items-center px-4 py-2 hover:bg-gray-100 w-full text-left"
                              >
                                Cập nhật ảnh
                              </button>
                              <button
                                onClick={() => {
                                  setOpenDropdown(null);
                                  setItineraryDelete(itinerary.itineraryId);
                                }}
                                className="flex items-center px-4 py-2 hover:bg-gray-100 w-full text-left text-red-600"
                              >
                                Xóa lịch trình
                              </button>
                            </div>
                          )}
                          {itineraryDelete === itinerary.itineraryId && (
                            <div className="fixed inset-0 bg-black/30 bg-opacity-40 flex items-center justify-center z-50">
                              <div className="bg-white rounded-lg shadow-lg w-[320px] p-6 animate-fade-in">
                                <h3 className="text-lg font-semibold text-center mb-2">
                                  Xác nhận xoá
                                </h3>
                                <p className="text-sm text-gray-600 text-center mb-6">
                                  Bạn có chắc chắn muốn xoá lịch trình này không?
                                </p>
                                <div className="flex justify-center gap-4">
                                  <button
                                    className="px-4 py-2 rounded-md border border-gray-300 text-gray-700 hover:bg-gray-100 transition"
                                    onClick={() => setItineraryDelete(null)}
                                  >
                                    Hủy
                                  </button>
                                  <button
                                    className="px-4 py-2 rounded-md bg-red-600 text-white hover:bg-red-700 transition"
                                    onClick={() => {
                                      setItineraryDelete(null);
                                      handleDeleteItinerary(itinerary.itineraryId);
                                    }}
                                  >
                                    Xác nhận
                                  </button>
                                </div>
                              </div>
                            </div>
                          )}
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            {/* Pagination */}
            <div
              id="pagination"
              className="flex justify-between items-center gap-2 p-2 bg-white border-t border-gray-300"
            >
              <p className="text-sm text-gray-500">Hiển thị 1 đến 10 trên 20 kết quả</p>
              <div className="flex items-center gap-2">
                <button className="border border-gray-300 bg-white px-2 py-1 rounded-md hover:bg-gray-100">
                  Trước
                </button>
                <button className="border border-gray-300 bg-white px-2 py-1 rounded-md hover:bg-gray-100">
                  Tiếp
                </button>
              </div>
            </div>
            <ItineraryDetailsModal
              open={itineraryEdit}
              onClose={() => setItineraryEdit(null)}
              tourId={tourId}
              itineraryId={itineraryEdit}
            />
            <ItineraryDetailsModal
              open={isAddItineraryOpen}
              onClose={() => setIsAddItineraryOpen(false)}
              tourId={tourId}
            />
            <ItineraryImageModal
              open={itineraryImageOpen}
              onClose={() => setItineraryImageOpen(false)}
              itineraryId={itineraryImageOpen}
            />
          </div>
        </div>
      }
    />
  );
};

export default ItineraryListModal;

ItineraryListModal.propTypes = {
  open: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
  tourId: PropTypes.string.isRequired,
};
