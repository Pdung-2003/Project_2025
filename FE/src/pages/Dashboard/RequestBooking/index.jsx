import { BOOKING_STATUS } from '@/constants/app.constant';
import { useAuthState } from '@/contexts/AuthContext';
import { useBookingDispatch, useBookingState } from '@/contexts/BookingContext';
import { useBookingActions } from '@/hooks/useBookingActions';
import { useEffect, useMemo } from 'react';

const RequestBooking = () => {
  const dispatch = useBookingDispatch();
  const { user } = useAuthState();
  const { fetchBookingRequests, changeBookingStatus } = useBookingActions();
  const { booking, pagination, filter, totalElements, totalPages } = useBookingState();

  const isTourManager = useMemo(() => {
    return user?.roles?.some((role) => role.name === 'TOUR_MANAGER');
  }, [user?.roles]);

  useEffect(() => {
    if (user) {
      fetchBookingRequests({
        ...pagination,
        ...filter,
        managerId: isTourManager ? user?.id : null,
      });
    }
  }, [pagination, filter, isTourManager, user]);

  useEffect(() => {
    const tableEl = document.getElementById('table-container');
    const heightWindow = window.innerHeight;
    const paginationHeight = document.getElementById('pagination').getBoundingClientRect().height;
    const tableTop = tableEl.getBoundingClientRect().top;
    tableEl.style.height = `${heightWindow - tableTop - paginationHeight - 2}px`;
  }, []);

  return (
    <div className="flex flex-col w-full h-full">
      {/* Search */}
      <div className="grid grid-cols-1 md:grid-cols-5 gap-2 mx-2 my-2 items-center">
        <div className="flex flex-col gap-2 items-start">
          <label htmlFor="fromDate">Ngày đi</label>
          <input
            type="date"
            value={filter?.fromDate || ''}
            onChange={(e) =>
              dispatch({ type: 'SET_FILTER', payload: { ...filter, fromDate: e.target.value } })
            }
            className="w-full border border-gray-300 rounded-md p-2"
          />
        </div>
        <div className="flex flex-col gap-2 items-start">
          <label htmlFor="toDate">Ngày đến</label>
          <input
            type="date"
            value={filter?.toDate || ''}
            onChange={(e) =>
              dispatch({ type: 'SET_FILTER', payload: { ...filter, toDate: e.target.value } })
            }
            className="w-full border border-gray-300 rounded-md p-2"
          />
        </div>
        <div className="flex flex-col gap-2 items-start">
          <label htmlFor="status">Trạng thái</label>
          <select
            id="status"
            value={filter?.status || ''}
            onChange={(e) =>
              dispatch({ type: 'SET_FILTER', payload: { ...filter, status: e.target.value } })
            }
            className="w-full border border-gray-300 rounded-md p-2"
          >
            <option value="">Tất cả</option>
            {Object.values(BOOKING_STATUS).map((status) => (
              <option key={status} value={status}>
                {status}
              </option>
            ))}
          </select>
        </div>
      </div>
      <div className="flex flex-col flex-1 mx-2 border border-gray-300 h-full overflow-visible">
        <div id="table-container" className="overflow-auto">
          <table id="table" className="w-full table-auto border-separate z-10">
            <thead className="bg-gray-100 sticky top-0 z-20">
              <tr>
                <th className="border border-gray-300 p-2">STT</th>
                <th className="border border-gray-300 p-2">Tên tour</th>
                <th className="border border-gray-300 p-2">Ngày đi</th>
                <th className="border border-gray-300 p-2">Số lượng người</th>
                <th className="border border-gray-300 p-2">Giá</th>
                <th className="border border-gray-300 p-2">Thao tác</th>
              </tr>
            </thead>
            <tbody>
              {booking.map((booking, index) => (
                <tr key={booking.bookingId} className="hover:bg-gray-50">
                  <td className="border border-gray-300 text-center p-2">
                    {index + 1 + (pagination?.pageNumber - 1) * pagination?.pageSize}
                  </td>
                  <td className="border border-gray-300 p-2">{booking.tourName}</td>
                  <td className="border border-gray-300 p-2 text-center">{booking.tourDate}</td>
                  <td className="border border-gray-300 p-2 text-right">
                    {booking.numberOfPeople}
                  </td>
                  <td className="border border-gray-300 p-2 text-right">
                    {booking?.priceBooking?.toLocaleString('vi-VN', {
                      style: 'currency',
                      currency: 'VND',
                    })}
                  </td>
                  <td className="border border-gray-300 p-2 text-center">
                    <div className="relative dropdown-container flex items-center justify-center gap-2">
                      {booking.status === BOOKING_STATUS.PENDING ? (
                        <>
                          <button
                            className="bg-red-600 px-4 py-1 rounded-md border border-gray-300 text-white hover:bg-red-700 transition"
                            onClick={() =>
                              changeBookingStatus(booking.bookingId, BOOKING_STATUS.CANCELLED)
                            }
                          >
                            Hủy bỏ
                          </button>
                          <button
                            className="bg-green-600 px-4 py-1 rounded-md border border-gray-300 text-white hover:bg-green-700 transition"
                            onClick={() =>
                              changeBookingStatus(booking.bookingId, BOOKING_STATUS.CONFIRMED)
                            }
                          >
                            Duyệt
                          </button>
                        </>
                      ) : booking.status === BOOKING_STATUS.CONFIRMED ? (
                        <button
                          className="bg-blue-600 px-4 py-1 rounded-md border border-gray-300 text-white hover:bg-blue-700 transition"
                          onClick={() =>
                            changeBookingStatus(booking.bookingId, BOOKING_STATUS.PAID)
                          }
                        >
                          Xác nhận thanh toán
                        </button>
                      ) : booking.status === BOOKING_STATUS.PAID ? (
                        <button className="bg-amber-500 px-4 py-1 rounded-md border border-gray-300 text-white transition">
                          Đã thanh toán
                        </button>
                      ) : (
                        <button className="bg-gray-600 px-4 py-1 rounded-md border border-gray-300 text-white hover:bg-gray-700 transition">
                          Đã hủy
                        </button>
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
          <p className="text-sm text-gray-500">
            Hiển thị {(pagination?.pageNumber - 1) * pagination?.pageSize + 1} đến{' '}
            {pagination?.pageNumber * pagination?.pageSize} trên {totalElements} kết quả
          </p>
          <div className="flex items-center gap-2">
            <button
              className="border border-gray-300 bg-white px-2 py-1 rounded-md hover:bg-gray-100"
              onClick={() =>
                dispatch({
                  type: 'SET_PAGINATION',
                  payload: { ...pagination, pageNumber: pagination.pageNumber - 1 },
                })
              }
              disabled={pagination.pageNumber === 1}
            >
              Trước
            </button>
            <button
              className="border border-gray-300 bg-white px-2 py-1 rounded-md hover:bg-gray-100"
              onClick={() =>
                dispatch({
                  type: 'SET_PAGINATION',
                  payload: { ...pagination, pageNumber: pagination.pageNumber + 1 },
                })
              }
              disabled={pagination.pageNumber === totalPages}
            >
              Tiếp
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RequestBooking;
