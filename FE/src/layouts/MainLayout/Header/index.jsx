import SearchDebounce from '@/components/common/SearchDebounce';
import RightHeader from '@/layouts/MainLayout/Header/RightHeader';
import { useState } from 'react';
import { Link } from 'react-router-dom';

const Header = () => {
  const [valueInput, setValueInput] = useState('');

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
        valueInput={valueInput}
        changeValueInput={setValueInput}
        className={'w-1/5'}
      />
      <RightHeader />
    </div>
  );
};

export default Header;
