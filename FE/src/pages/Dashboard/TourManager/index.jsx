import SearchDebounce from '@/components/common/SearchDebounce';
import AddTourModal from '@/components/tour/AddTourModal';
import ItineraryListModal from '@/components/tour/ItineraryListModal';
import { useAuthState } from '@/contexts/AuthContext';
import { useTourDispatch, useTourState } from '@/contexts/TourContext';
import { useUserDispatch } from '@/contexts/UserContext';
import { useTourActions } from '@/hooks/useTourActions';
import { useUserActions } from '@/hooks/useUserActions';
import { tourService } from '@/services';
import { Ellipsis } from 'lucide-react';
import { useEffect, useMemo, useState } from 'react';
import { toast } from 'react-toastify';

const TourManager = () => {
  const { user } = useAuthState();
  const { fetchManagers } = useUserActions();
  const dispatchUser = useUserDispatch();
  const dispatch = useTourDispatch();
  const { fetchTours } = useTourActions();
  const { tours, filter, pagination, totalElements } = useTourState();
  const [isConfirmOpen, setIsConfirmOpen] = useState(null);
  const [openDropdown, setOpenDropdown] = useState(null);
  const [isAddTourOpen, setIsAddTourOpen] = useState(false);
  const [isUpdateTourOpen, setIsUpdateTourOpen] = useState(null);
  const [isShowItineraryModal, setIsShowItineraryModal] = useState(null);

  const isTourManager = useMemo(() => {
    return user?.roles?.some((role) => role.name === 'TOUR_MANAGER');
  }, [user?.roles]);

  const deleteTour = async (tourId) => {
    try {
      await tourService.deleteTour(tourId);
      toast.success('Xóa tour thành công');
      dispatch({ type: 'SET_PAGINATION', payload: { ...pagination, pageNumber: 1 } });
    } catch (error) {
      dispatch({ type: 'SET_ERROR', payload: error.message });
      toast.error('Xóa tour thất bại');
    }
  };

  useEffect(() => {
    if (user?.id) {
      fetchTours({
        ...filter,
        ...pagination,
        managerId: isTourManager ? user?.id : filter?.managerId,
      });
    }
  }, [filter, pagination, isTourManager, user?.id]);

  useEffect(() => {
    return () => {
      dispatch({ type: 'RESET_INITIAL_STATE' });
    };
  }, []);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (!event.target.closest('.dropdown-container')) {
        setOpenDropdown(null);
      }
    };

    document.addEventListener('click', handleClickOutside);
    return () => document.removeEventListener('click', handleClickOutside);
  }, [setOpenDropdown]);

  useEffect(() => {
    if (!isTourManager && user?.id) {
      fetchManagers();
    }
    return () => {
      dispatchUser({ type: 'RESET_STATE' });
    };
  }, [isTourManager, user?.id]);

  useEffect(() => {
    const tableEl = document.getElementById('table-container');
    const heightWindow = window.innerHeight;
    const paginationHeight = document.getElementById('pagination').getBoundingClientRect().height;
    const tableTop = tableEl.getBoundingClientRect().top;
    tableEl.style.height = `${heightWindow - tableTop - paginationHeight - 5}px`;
    return () => {
      dispatch({ type: 'RESET_INITIAL_STATE' });
    };
  }, []);

  return (
    <div className="flex flex-col w-full h-full">
      {/* Search */}
      <div className="grid grid-cols-1 md:grid-cols-5 gap-2 mx-2 my-2 items-center">
        <SearchDebounce
          valueInput={filter?.tourName || ''}
          changeValueInput={(value) =>
            dispatch({ type: 'SET_FILTER', payload: { ...filter, tourName: value } })
          }
          placeholder="Tên tour..."
          className="w-full rounded-md p-2 h-full"
        />
        {isTourManager && (
          <div className="col-span-4 flex justify-end">
            <button className="btn-primary" onClick={() => setIsAddTourOpen(true)}>
              Thêm mới
            </button>
          </div>
        )}
      </div>
      <div className="flex flex-col flex-1 mx-2 border border-gray-300 h-full overflow-visible">
        <div id="table-container" className="overflow-auto">
          <table id="table" className="w-full table-auto border-separate z-10">
            <thead className="bg-gray-100 sticky top-0 z-20">
              <tr>
                <th className="border border-gray-300 p-2">STT</th>
                <th className="border border-gray-300 p-2">Tên tour</th>
                <th className="border border-gray-300 p-2">Công ty</th>
                <th className="border border-gray-300 p-2">Người quản lý</th>
                <th className="border border-gray-300 p-2">Thời gian</th>
                <th className="border border-gray-300 p-2">Địa điểm</th>
                <th className="border border-gray-300 p-2">Giá</th>
                <th className="border border-gray-300 p-2">Thao tác</th>
              </tr>
            </thead>
            <tbody>
              {tours.map((tour, index) => (
                <tr key={tour.tourId} className="hover:bg-gray-50">
                  <td className="border border-gray-300 text-center p-2">{index + 1}</td>
                  <td className="border border-gray-300 p-2">{tour.tourName}</td>
                  <td className="border border-gray-300 p-2">{tour.companyName}</td>
                  <td className="border border-gray-300 p-2">{tour?.manager?.fullName}</td>
                  <td className="border border-gray-300 p-2">{tour.duration}</td>
                  <td className="border border-gray-300 p-2">{tour.location}</td>
                  <td className="border border-gray-300 p-2">
                    {tour?.price?.toLocaleString('vi-VN', {
                      style: 'currency',
                      currency: 'VND',
                    })}
                  </td>
                  <td className="border border-gray-300 p-2 text-center">
                    <div className="relative dropdown-container flex items-center justify-center">
                      {isTourManager && (
                        <button onClick={() => setOpenDropdown(tour?.tourId)}>
                          <Ellipsis className="w-4 h-4" />
                        </button>
                      )}
                      {openDropdown === tour?.tourId && (
                        <div className="absolute right-0 top-0 mt-2 w-48 bg-white shadow-md rounded-md z-50">
                          <button
                            onClick={() => {
                              setOpenDropdown(null);
                              setIsUpdateTourOpen(tour?.tourId);
                            }}
                            className="flex items-center px-4 py-2 hover:bg-gray-100 w-full text-left"
                          >
                            Cập nhật chuyến đi
                          </button>
                          <button
                            onClick={() => {
                              setOpenDropdown(null);
                              setIsShowItineraryModal(tour?.tourId);
                            }}
                            className="flex items-center px-4 py-2 hover:bg-gray-100 w-full text-left"
                          >
                            Danh sách lịch trình
                          </button>
                          <button
                            onClick={() => {
                              setOpenDropdown(null);
                              setIsConfirmOpen(tour?.tourId);
                            }}
                            className="flex items-center px-4 py-2 hover:bg-gray-100 w-full text-left text-red-600"
                          >
                            Xóa chuyến đi
                          </button>
                        </div>
                      )}
                      {isUpdateTourOpen === tour?.tourId && (
                        <AddTourModal
                          open={isUpdateTourOpen === tour?.tourId}
                          onClose={() => setIsUpdateTourOpen(null)}
                          tourId={tour?.tourId}
                        />
                      )}
                      {isShowItineraryModal === tour?.tourId && (
                        <ItineraryListModal
                          open={isShowItineraryModal === tour?.tourId}
                          onClose={() => setIsShowItineraryModal(null)}
                          tourId={tour?.tourId}
                        />
                      )}
                      {isConfirmOpen === tour?.tourId && (
                        <div className="fixed inset-0 bg-black/30 bg-opacity-40 flex items-center justify-center z-50">
                          <div className="bg-white rounded-lg shadow-lg w-[320px] p-6 animate-fade-in">
                            <h3 className="text-lg font-semibold text-center mb-2">Xác nhận xoá</h3>
                            <p className="text-sm text-gray-600 text-center mb-6">
                              Bạn có chắc chắn muốn xoá chuyến đi này không?
                            </p>
                            <div className="flex justify-center gap-4">
                              <button
                                className="px-4 py-2 rounded-md border border-gray-300 text-gray-700 hover:bg-gray-100 transition"
                                onClick={() => setIsConfirmOpen(null)}
                              >
                                Hủy
                              </button>
                              <button
                                className="px-4 py-2 rounded-md bg-red-600 text-white hover:bg-red-700 transition"
                                onClick={() => {
                                  setIsConfirmOpen(null);
                                  deleteTour(tour?.tourId);
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
        <AddTourModal open={isAddTourOpen} onClose={() => setIsAddTourOpen(false)} />
        {/* Pagination */}
        <div
          id="pagination"
          className="flex justify-between items-center gap-2 p-2 bg-white border-t border-gray-300"
        >
          <p className="text-sm text-gray-500">
            Hiển thị {(pagination?.pageNumber - 1) * pagination?.pageSize + 1} đến{' '}
            {pagination?.pageNumber * pagination?.pageSize} trên {totalElements} kết quả
          </p>
          <div className="flex items-center gap-2">
            <button className="border border-gray-300 bg-white px-2 py-1 rounded-md hover:bg-gray-100">
              Trước
            </button>
            <button className="border border-gray-300 bg-white px-2 py-1 rounded-md hover:bg-gray-100">
              Tiếp
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TourManager;
