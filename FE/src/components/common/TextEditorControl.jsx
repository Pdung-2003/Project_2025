import PropTypes from 'prop-types';
import { Controller } from 'react-hook-form';
import ReactQuill from 'react-quill-new';
import 'react-quill-new/dist/quill.snow.css';

const TextEditorControl = ({ label, name, control, rules, ...props }) => {
  return (
    <div className="flex flex-col gap-2 items-start" {...props}>
      <label className="font-medium">{label}</label>
      <Controller
        name={name}
        control={control}
        rules={rules}
        render={({ field, fieldState }) => (
          <div className="w-full">
            <ReactQuill theme="snow" value={field.value} onChange={field.onChange} />
            {fieldState.error && (
              <p className="text-sm text-red-500 mt-1">{fieldState.error.message}</p>
            )}
          </div>
        )}
      />
    </div>
  );
};

TextEditorControl.propTypes = {
  label: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  control: PropTypes.object.isRequired,
  rules: PropTypes.object,
  placeholder: PropTypes.string,
};

export default TextEditorControl;
