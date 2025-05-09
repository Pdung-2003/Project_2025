import { debounce } from '@/utils/app';
import { SearchIcon } from 'lucide-react';
import PropTypes from 'prop-types';
import { useMemo, useState } from 'react';

const SearchDebounce = ({ valueInput, changeValueInput, placeholder, className, onClickIcon }) => {
  const [value, setValue] = useState(valueInput);

  const handleChange = useMemo(() => debounce(changeValueInput, 500), [changeValueInput]);

  const handleChangeInput = (e) => {
    setValue(e.target.value);
    handleChange(e.target.value);
  };

  return (
    <div
      className={`flex flex-row items-center justify-center border border-gray-300 h-[30px] p-2 gap-1 ${className}`}
    >
      <input
        type="text"
        value={value}
        onChange={handleChangeInput}
        placeholder={placeholder || 'Tìm kiếm ...'}
        className="focus:outline-none focus-visible:ring-0 border-0 shadow-none h-auto w-full"
      />
      <SearchIcon className="w-5 h-4 cursor-pointer" onClick={onClickIcon} />
    </div>
  );
};

export default SearchDebounce;

SearchDebounce.defaultProps = {
  placeholder: 'Tìm kiếm ...',
  className: '',
  onClickIcon: () => {},
};

SearchDebounce.propTypes = {
  valueInput: PropTypes.string.isRequired,
  changeValueInput: PropTypes.func.isRequired,
  placeholder: PropTypes.string,
  className: PropTypes.string,
  onClickIcon: PropTypes.func,
};
