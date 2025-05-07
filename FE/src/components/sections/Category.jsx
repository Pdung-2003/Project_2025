const Category = () => {
  return (
    <div className="grid grid-cols-6 gap-4">
      {CATEGORY.map((item) => (
        <div
          key={item.id}
          className="min-h-[65px] border border-gray-300 shadow-md rounded-xl p-4 flex items-center justify-center cursor-pointer"
        >
          <h3
            className="text-lg hover:text-[var(--primary)] text-center"
            style={{
              lineHeight: '20px',
            }}
          >
            {item.name}
          </h3>
        </div>
      ))}
    </div>
  );
};

export default Category;

const CATEGORY = [
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
