import { motion } from 'motion/react';
import PropTypes from 'prop-types';

const AppModal = ({ open, onClose, title, content }) => {
  if (!open) return null;

  return (
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
        {title && <h2 className="text-xl font-semibold mb-4 text-center">{title}</h2>}
        <div>{content}</div>
      </motion.div>
    </div>
  );
};

export default AppModal;

AppModal.propTypes = {
  open: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
  title: PropTypes.string,
  content: PropTypes.node.isRequired,
};
