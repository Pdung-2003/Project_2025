import { Eye, EyeClosed } from 'lucide-react';
import PropTypes from 'prop-types';
import { useState } from 'react';
import { Controller } from 'react-hook-form';

const TextFieldControl = ({ label, placeholder, rules, inputProps, control, name, ...props }) => {
  const [showPassword, setShowPassword] = useState(false);

  return (
    <div className="flex flex-col gap-2" {...props}>
      <label htmlFor={label}>{label}</label>
      <Controller
        control={control}
        name={name}
        rules={rules}
        render={({ field, fieldState }) => (
          <div className="flex flex-col gap-2">
            <div className="relative">
              <input
                value={field.value}
                onChange={field.onChange}
                placeholder={placeholder}
                {...inputProps}
                type={showPassword ? 'text' : inputProps?.type}
                className={`w-full border border-gray-300 rounded-md p-2 ${inputProps?.className}`}
              />
              {inputProps?.type === 'password' && (
                <button
                  type="button"
                  className="absolute right-2 top-1/2 -translate-y-1/2"
                  onClick={() => setShowPassword(!showPassword)}
                >
                  {showPassword ? <EyeClosed /> : <Eye />}
                </button>
              )}
            </div>
            <p className="text-red-500 text-sm">{fieldState.error?.message}</p>
          </div>
        )}
      />
    </div>
  );
};

export default TextFieldControl;

TextFieldControl.propTypes = {
  label: PropTypes.string.isRequired,
  value: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
  placeholder: PropTypes.string,
  inputProps: PropTypes.object,
  control: PropTypes.object,
  name: PropTypes.string,
  rules: PropTypes.object,
};
