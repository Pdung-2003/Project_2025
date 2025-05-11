import SearchDebounce from '@/components/common/SearchDebounce';
import { useTourDispatch, useTourState } from '@/contexts/TourContext';
import RightHeader from '@/layouts/MainLayout/Header/RightHeader';
import { Link, useNavigate } from 'react-router-dom';

const Header = () => {
  const dispatch = useTourDispatch();
  const { filter } = useTourState();
  const navigate = useNavigate();

  const handleChangeValueInput = (value) => {
    dispatch({ type: 'SET_FILTER', payload: { ...filter, searchKey: value } });
  };

  return (
    <div className="flex flex-row items-center justify-between h-[55px] px-2.5 shadow">
      <Link to="/" className="h-[36px] aspect-[220/36]">
        <img
          src={'https://www.bestprice.vn/assets/img/bestpricetravel-logo-28122023.png'}
          alt="Logo Header"
          style={{
            objectFit: 'cover',
            fill: true,
          }}
          sizes="100%"
        />
      </Link>
      <SearchDebounce
        valueInput={filter?.searchKey}
        changeValueInput={handleChangeValueInput}
        className={'w-1/5'}
        onClickIcon={() => navigate('/tours')}
      />
      <RightHeader />
    </div>
  );
};

export default Header;
