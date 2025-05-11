import PropTypes from 'prop-types';
import { Controller } from 'react-hook-form';

const InputIntegerControl = ({
  label,
  placeholder,
  rules,
  inputProps,
  control,
  name,
  ...props
}) => {
  return (
    <div className="flex flex-col gap-2 items-start" {...props}>
      <label htmlFor={name}>{label}</label>
      <Controller
        control={control}
        name={name}
        rules={rules}
        render={({ field, fieldState }) => (
          <div className="flex flex-col gap-2 w-full items-start">
            <input
              {...field}
              type="number"
              inputMode="numeric"
              pattern="[0-9]*"
              placeholder={placeholder}
              {...inputProps}
              className={`w-full border border-gray-300 rounded-md p-2 ${inputProps?.className}`}
              onChange={(e) => {
                const value = e.target.value;
                if (/^\d*$/.test(value)) {
                  field.onChange(value === '' ? '' : parseInt(value, 10));
                }
              }}
            />
            <p className="text-red-500 text-sm">{fieldState.error?.message}</p>
          </div>
        )}
      />
    </div>
  );
};

InputIntegerControl.propTypes = {
  label: PropTypes.string.isRequired,
  placeholder: PropTypes.string,
  inputProps: PropTypes.object,
  control: PropTypes.object.isRequired,
  name: PropTypes.string.isRequired,
  rules: PropTypes.object,
};

export default InputIntegerControl;
