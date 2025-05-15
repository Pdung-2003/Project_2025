import PropTypes from 'prop-types';
import { Controller, useWatch } from 'react-hook-form';
import { useEffect, useRef, useState } from 'react';

const UploadMultipleImagesControl = ({ label, name, control, rules, imageProps, ...props }) => {
  const files = useWatch({ control, name }); // this will be an array of File
  const [previews, setPreviews] = useState([]);
  const inputRef = useRef(null);

  // Cleanup blob URLs when unmounted or updated
  useEffect(() => {
    return () => {
      previews.forEach((p) => {
        if (p.url.startsWith('blob:')) {
          URL.revokeObjectURL(p.url);
        }
      });
    };
  }, [previews]);

  const handleFileChange = (fieldOnChange, currentFiles, e) => {
    const newFiles = Array.from(e.target.files);
    const allFiles = [...currentFiles, ...newFiles];

    const newPreviews = allFiles.map((file) => ({
      file,
      url: typeof file === 'string' ? file : URL.createObjectURL(file),
    }));

    setPreviews(newPreviews);
    fieldOnChange(allFiles);
  };

  const handleRemoveImage = (indexToRemove, fieldOnChange, currentFiles) => {
    const updatedFiles = currentFiles.filter((_, index) => index !== indexToRemove);
    const updatedPreviews = previews.filter((_, index) => index !== indexToRemove);

    setPreviews(updatedPreviews);
    fieldOnChange(updatedFiles);
  };

  useEffect(() => {
    if (Array.isArray(files)) {
      const initialPreviews = files.map((file) => ({
        file,
        url: typeof file === 'string' ? file : URL.createObjectURL(file),
      }));
      setPreviews(initialPreviews);
    }
  }, [files]);

  return (
    <div className="flex flex-col gap-2 bg-white" {...props}>
      {label && (
        <label className="mb-1 font-bold text-lg p-2 border-b border-gray-200">{label}</label>
      )}
      <Controller
        name={name}
        control={control}
        rules={rules}
        render={({ field, fieldState }) => (
          <div className="p-5">
            <input
              type="file"
              multiple
              accept="image/*"
              ref={inputRef}
              onChange={(e) => handleFileChange(field.onChange, field.value || [], e)}
              className="hidden"
            />

            {/* Upload Button */}
            <div
              onClick={() => inputRef.current?.click()}
              className="w-full py-2 px-4 mb-4 text-center text-blue-600 border border-blue-300 rounded cursor-pointer hover:bg-blue-50 transition"
            >
              Chọn ảnh
            </div>

            {/* Image Previews */}
            <div className="grid grid-cols-3 gap-3">
              {previews.map((preview, index) => (
                <div key={index} className="relative group">
                  <img
                    src={preview.url}
                    alt={`Preview ${index}`}
                    className="object-cover w-full h-32 rounded-md"
                    {...imageProps}
                  />
                  <button
                    type="button"
                    onClick={() => handleRemoveImage(index, field.onChange, field.value || [])}
                    className="absolute top-1 right-1 bg-red-600 text-white rounded-full w-6 h-6 text-xs flex items-center justify-center opacity-0 group-hover:opacity-100 transition"
                  >
                    ×
                  </button>
                </div>
              ))}
            </div>

            <p className="text-red-500 text-sm mt-2">{fieldState.error?.message}</p>
          </div>
        )}
      />
    </div>
  );
};

UploadMultipleImagesControl.propTypes = {
  label: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  control: PropTypes.object.isRequired,
  rules: PropTypes.object,
  imageProps: PropTypes.object,
};

export default UploadMultipleImagesControl;
