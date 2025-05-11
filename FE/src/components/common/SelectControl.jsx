import PropTypes from 'prop-types';
import { Controller } from 'react-hook-form';

const SelectControl = ({
  label,
  options,
  rules,
  control,
  name,
  selectProps,
  isHaveDefaultOption = false,
  ...props
}) => {
  return (
    <div className="flex flex-col gap-2" {...props}>
      <label htmlFor={name}>{label}</label>
      <Controller
        control={control}
        name={name}
        rules={rules}
        render={({ field, fieldState }) => (
          <div className="flex flex-col gap-2">
            <select
              {...field}
              {...selectProps}
              className={`w-full border border-gray-300 rounded-md p-2 ${selectProps?.className}`}
            >
              {isHaveDefaultOption && <option value="">-- Chọn --</option>}
              {options.map((opt) => (
                <option key={opt.value} value={opt.value}>
                  {opt.label}
                </option>
              ))}
            </select>
            <p className="text-red-500 text-sm">{fieldState.error?.message}</p>
          </div>
        )}
      />
    </div>
  );
};

SelectControl.propTypes = {
  label: PropTypes.string.isRequired,
  options: PropTypes.arrayOf(
    PropTypes.shape({
      value: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
      label: PropTypes.string,
    })
  ).isRequired,
  selectProps: PropTypes.object,
  control: PropTypes.object.isRequired,
  name: PropTypes.string.isRequired,
  rules: PropTypes.object,
  isHaveDefaultOption: PropTypes.bool,
};

export default SelectControl;
