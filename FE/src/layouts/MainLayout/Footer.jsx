const Footer = () => {
  return (
    <footer className="bg-gray-900 text-white py-10 mt-10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-8">
        <div>
          <h2 className="text-2xl font-bold">TripXuyenViet</h2>
          <p className="mt-2 text-sm text-gray-400">
            Trải nghiệm tour du lịch tuyệt vời cùng chúng tôi. Chất lượng, uy tín, tận tâm.
          </p>
        </div>

        <div>
          <h3 className="text-lg font-semibold mb-3">Về chúng tôi</h3>
          <ul className="space-y-2 text-sm text-gray-400">
            <li>
              <a href="#" className="hover:text-white">
                Giới thiệu
              </a>
            </li>
            <li>
              <a href="#" className="hover:text-white">
                Liên hệ
              </a>
            </li>
            <li>
              <a href="#" className="hover:text-white">
                Điều khoản
              </a>
            </li>
          </ul>
        </div>

        <div>
          <h3 className="text-lg font-semibold mb-3">Hỗ trợ</h3>
          <ul className="space-y-2 text-sm text-gray-400">
            <li>
              <a href="#" className="hover:text-white">
                Câu hỏi thường gặp
              </a>
            </li>
            <li>
              <a href="#" className="hover:text-white">
                Chính sách hoàn tiền
              </a>
            </li>
            <li>
              <a href="#" className="hover:text-white">
                Hướng dẫn đặt tour
              </a>
            </li>
          </ul>
        </div>

        <div>
          <h3 className="text-lg font-semibold mb-3">Liên hệ</h3>
          <p className="text-sm text-gray-400">Hotline: 1900 1234</p>
          <p className="text-sm text-gray-400">Email: support@tripxuyenviet.com.vn</p>
          <div className="flex space-x-4 mt-4">
            <a href="#" className="hover:text-white">
              <i className="fab fa-facebook"></i>
            </a>
            <a href="#" className="hover:text-white">
              <i className="fab fa-instagram"></i>
            </a>
            <a href="#" className="hover:text-white">
              <i className="fab fa-youtube"></i>
            </a>
          </div>
        </div>
      </div>

      <div className="mt-10 border-t border-gray-700 pt-6 text-center text-sm text-gray-500">
        © 2025 TripXuyenViet. All rights reserved.
      </div>
    </footer>
  );
};

export default Footer;
