import { AnimatePresence, motion } from 'motion/react';
import PropTypes from 'prop-types';

const AppModal = ({ open, onClose, title, content, titleProps, paperProps, action }) => {
  return (
    <AnimatePresence>
      {open && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-8">
          <motion.div
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.8, opacity: 0 }}
            {...paperProps}
            className={`relative bg-white rounded-sm shadow-xl w-full max-h-full overflow-hidden ${paperProps?.className}`}
          >
            <button
              onClick={onClose}
              type="button"
              className="absolute top-4 right-4 text-gray-500 hover:text-gray-700"
            >
              ✕
            </button>
            {title && (
              <h2
                {...titleProps}
                className={`text-xl font-semibold mb-4 px-[12px] pt-[12px] ${titleProps?.className}`}
              >
                {title}
              </h2>
            )}
            {content && (
              <div className="bg-[#EFF1F6] p-[12px] overflow-y-auto max-h-[calc(100vh-200px)] space-y-4">
                {content}
              </div>
            )}
            {action && (
              <div className="flex justify-end bg-white border-t border-gray-200 p-4 gap-2">
                {action}
              </div>
            )}
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
};

export default AppModal;

AppModal.propTypes = {
  open: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
  title: PropTypes.string,
  content: PropTypes.node,
  titleProps: PropTypes.object,
  paperProps: PropTypes.object,
  action: PropTypes.node,
};
