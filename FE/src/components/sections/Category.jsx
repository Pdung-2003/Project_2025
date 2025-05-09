const Category = () => {
  return (
    <div className="flex flex-col gap-4">
      <h2 className="text-[28px] text-[#444] font-bold text-center">Điểm đến được ưa thích</h2>
      <div className="grid grid-cols-6 gap-4">
        {CATEGORY.map((item) => (
          <div
            key={item.id}
            className="relative cursor-pointer h-[170px] w-[170px] border border-gray-300 shadow-md rounded-[70px] overflow-hidden group"
          >
            <img
              src={item.image}
              alt={item.name}
              className="w-full h-full object-cover group-hover:scale-110 transition-all duration-300"
            />
            {/* Dark overlay */}
            <div className="absolute inset-0 bg-black/40 group-hover:bg-black/50 transition-all duration-300" />
            {/* Centered text */}
            <h3 className="absolute inset-0 flex items-center justify-center text-xl text-white font-bold px-2 text-center">
              {item.name}
            </h3>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Category;

const CATEGORY = [
  {
    id: 1,
    name: 'Sapa',
    image: 'https://owa.bestprice.vn/images/destinations/large/thai-lan-5f36610f951cf-476x476.jpg',
  },
  {
    id: 2,
    name: 'Đà Nẵng',
    image: 'https://owa.bestprice.vn/images/destinations/large/thai-lan-5f36610f951cf-476x476.jpg',
  },
  {
    id: 3,
    name: 'Hội An',
    image: 'https://owa.bestprice.vn/images/destinations/large/thai-lan-5f36610f951cf-476x476.jpg',
  },
  {
    id: 4,
    name: 'Hồ Chí Minh',
    image: 'https://owa.bestprice.vn/images/destinations/large/thai-lan-5f36610f951cf-476x476.jpg',
  },
  {
    id: 5,
    name: 'Nha Trang',
    image: 'https://owa.bestprice.vn/images/destinations/large/thai-lan-5f36610f951cf-476x476.jpg',
  },
  {
    id: 6,
    name: 'Phú Quốc',
    image: 'https://owa.bestprice.vn/images/destinations/large/thai-lan-5f36610f951cf-476x476.jpg',
  },
];
