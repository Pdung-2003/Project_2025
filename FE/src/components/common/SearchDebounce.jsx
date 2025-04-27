import { debounce } from '@/utils/app';
import { SearchIcon } from 'lucide-react';
import PropTypes from 'prop-types';
import { useState } from 'react';

const SearchDebounce = ({ valueInput, changeValueInput, placeholder, className }) => {
  const [value, setValue] = useState(valueInput);

  const handleChange = debounce((value) => {
    changeValueInput(value);
  }, 500);

  const handleChangeInput = (e) => {
    setValue(e.target.value);
    handleChange(e.target.value);
  };

  return (
    <div
      className={`flex flex-row items-center justify-center border border-gray-300 h-[30px] p-2 gap-1 ${className}`}
    >
      <SearchIcon className="w-4 h-4" />
      <input
        type="text"
        value={value}
        onChange={handleChangeInput}
        placeholder={placeholder || 'Tìm kiếm ...'}
        className="focus:outline-none focus-visible:ring-0 border-0 shadow-none h-auto w-full"
      />
    </div>
  );
};

export default SearchDebounce;

SearchDebounce.propTypes = {
  valueInput: PropTypes.string.isRequired,
  changeValueInput: PropTypes.func.isRequired,
  placeholder: PropTypes.string,
  className: PropTypes.string,
};
