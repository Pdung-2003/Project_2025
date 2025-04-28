import { AnimatePresence, motion } from 'motion/react';
import PropTypes from 'prop-types';

const AppModal = ({ open, onClose, title, content, titleProps }) => {
  return (
    <AnimatePresence>
      {open && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50">
          <motion.div
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.8, opacity: 0 }}
            className="bg-white rounded-2xl shadow-xl w-full max-w-lg p-6 relative"
          >
            <button
              onClick={onClose}
              className="absolute top-4 right-4 text-gray-500 hover:text-gray-700"
            >
              ✕
            </button>
            {title && (
              <h2 {...titleProps} className={`text-xl font-semibold mb-4 ${titleProps?.className}`}>
                {title}
              </h2>
            )}
            {content && <div>{content}</div>}
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
};
