import AppModal from '@/components/common/AppModal';
import SearchDebounce from '@/components/common/SearchDebounce';
import UserManagerModal from '@/components/user/UserManagerModal';
import { useUserDispatch, useUserState } from '@/contexts/UserContext';
import { useUserActions } from '@/hooks/useUserActions';
import { deleteUser } from '@/services/user.service';
import { Pencil, Trash } from 'lucide-react';
import { useEffect, useState } from 'react';

const UserManager = () => {
  const dispatch = useUserDispatch();
  const { users } = useUserState();
  const [userDelete, setUserDelete] = useState(null);
  const [search, setSearch] = useState('');
  const [userEdit, setUserEdit] = useState(null);
  const [openModal, setOpenModal] = useState(false);

  const { fetchUsers } = useUserActions();

  const handleDeleteUser = async (id) => {
    try {
      await deleteUser(id);
    } catch (error) {
      console.log(error);
    } finally {
      setUserDelete(null);
    }
  };

  useEffect(() => {
    fetchUsers();

    return () => {
      dispatch({ type: 'SET_USERS', payload: [] });
    };
  }, []);

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
        <SearchDebounce
          value={search}
          onChange={setSearch}
          placeholder="Họ tên người dùng"
          className="w-full rounded-md p-2 h-full"
        />
        <div className="col-span-4 flex justify-end">
          <button className="btn-primary" onClick={() => setOpenModal(true)}>
            Thêm người dùng
          </button>
        </div>
      </div>
      <div className="flex flex-col flex-1 mx-2 border border-gray-300 h-full overflow-hidden">
        <div id="table-container" className="overflow-y-auto">
          <table id="table" className="w-full table-auto border-separate z-10">
            <thead className="bg-gray-100 sticky top-0 z-20">
              <tr>
                <th className="border border-gray-300 p-2">STT</th>
                <th className="border border-gray-300 p-2">Họ tên</th>
                <th className="border border-gray-300 p-2">Tài khoản</th>
                <th className="border border-gray-300 p-2">Email</th>
                <th className="border border-gray-300 p-2">Số điện thoại</th>
                <th className="border border-gray-300 p-2">Thao tác</th>
              </tr>
            </thead>
            <tbody>
              {users.map((user, index) => (
                <tr key={user.id} className="hover:bg-gray-50">
                  <td className="border border-gray-300 text-center p-2">{index + 1}</td>
                  <td className="border border-gray-300 p-2">{user.fullName}</td>
                  <td className="border border-gray-300 p-2">{user.username}</td>
                  <td className="border border-gray-300 p-2">{user.email}</td>
                  <td className="border border-gray-300 p-2">{user.phoneNumber}</td>
                  <td className="border border-gray-300 p-2 text-center">
                    <button
                      className="bg-blue-500 text-white px-2 py-1 rounded-md hover:bg-blue-600 mr-2"
                      onClick={() => {
                        setUserEdit(user.id);
                        setOpenModal(true);
                      }}
                    >
                      <Pencil className="w-4 h-4" />
                    </button>
                    <button
                      className="bg-red-500 text-white px-2 py-1 rounded-md hover:bg-red-600"
                      onClick={() => setUserDelete(user.id)}
                    >
                      <Trash className="w-4 h-4" />
                    </button>
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
        <AppModal
          open={!!userDelete}
          onClose={() => setUserDelete(null)}
          title="Bạn có chắc chắn muốn xóa người dùng này không?"
          content={
            <div className="flex flex-row justify-end gap-2">
              <button className="btn-outline-secondary" onClick={() => setUserDelete(null)}>
                Đóng
              </button>
              <button className="btn-primary" onClick={() => handleDeleteUser(userDelete)}>
                Xác nhận
              </button>
            </div>
          }
        />
        <UserManagerModal
          open={openModal}
          onClose={() => {
            setOpenModal(false);
            setUserEdit(null);
          }}
          userId={userEdit}
        />
      </div>
    </div>
  );
};

export default UserManager;
