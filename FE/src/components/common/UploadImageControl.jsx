import PropTypes from 'prop-types';
import { Controller, useWatch } from 'react-hook-form';
import { useEffect, useRef, useState } from 'react';

const UploadImageControl = ({ label, name, control, rules, imageProps, ...props }) => {
  const banner = useWatch({ control, name: 'banner' });
  const [preview, setPreview] = useState(null);
  const inputRef = useRef(null);

  useEffect(() => {
    return () => {
      if (preview) {
        URL.revokeObjectURL(preview);
      }
    };
  }, [preview]);

  useEffect(() => {
    if (banner && typeof banner === 'string') {
      setPreview(banner);
    }
  }, [banner]);

  return (
    <div className="flex flex-col gap-2 bg-white" {...props}>
      <label className="mb-1 font-bold text-lg p-2 border-b border-gray-200">{label}</label>

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
            <div className="p-5">
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
                className={`h-[150px] overflow-hidden aspect-[3/2] relative border-2 border-dashed border-gray-300 rounded-md flex items-center justify-center cursor-pointer hover:border-blue-500 transition ${imageProps?.className}`}
              >
                {preview ? (
                  <img src={preview} alt="Preview" className="object-cover h-full" />
                ) : (
                  <span className="text-gray-400 text-sm text-center px-2">Click để tải ảnh</span>
                )}
              </div>

              <p className="text-red-500 text-sm">{fieldState.error?.message}</p>
            </div>
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
