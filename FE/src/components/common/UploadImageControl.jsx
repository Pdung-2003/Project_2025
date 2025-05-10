import PropTypes from 'prop-types';
import { Controller } from 'react-hook-form';
import { useEffect, useRef, useState } from 'react';

const UploadImageControl = ({ label, name, control, rules, imageProps, ...props }) => {
  const [preview, setPreview] = useState(null);
  const inputRef = useRef(null);

  useEffect(() => {
    return () => {
      if (preview) {
        URL.revokeObjectURL(preview);
      }
    };
  }, [preview]);
  return (
    <div className="flex flex-col gap-2" {...props}>
      <label className="mb-1 font-medium">{label}</label>

      <Controller
        name={name}
        control={control}
        rules={rules}
        render={({ field, fieldState }) => {
          const handleChange = (e) => {
            const file = e.target.files[0];
            if (file) {
              setPreview(URL.createObjectURL(file));
              field.onChange(file);
            }
          };

          return (
            <>
              {/* Hidden input file */}
              <input
                type="file"
                accept="image/*"
                ref={inputRef}
                onChange={handleChange}
                className="hidden"
              />

              {/* Clickable image or placeholder */}
              <div
                onClick={() => inputRef.current?.click()}
                {...imageProps}
                className={`w-[220px] aspect-video relative border-2 border-dashed border-gray-300 rounded-md flex items-center justify-center cursor-pointer hover:border-blue-500 transition ${imageProps?.className}`}
              >
                {preview ? (
                  <img src={preview} alt="Preview" className="object-fill" />
                ) : (
                  <span className="text-gray-400 text-sm text-center px-2">Click để tải ảnh</span>
                )}
              </div>

              <p className="text-red-500 text-sm">{fieldState.error?.message}</p>
            </>
          );
        }}
      />
    </div>
  );
};

export default UploadImageControl;

UploadImageControl.propTypes = {
  label: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  control: PropTypes.object.isRequired,
  rules: PropTypes.object,
  imageProps: PropTypes.object,
};
