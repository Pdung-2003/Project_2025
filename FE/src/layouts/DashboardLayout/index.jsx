import PropTypes from 'prop-types';

const DashboardLayout = ({ children }) => {
  return (
    <div>
      <div className="h-full w-full">{children}</div>
    </div>
  );
};

export default DashboardLayout;

DashboardLayout.propTypes = {
  children: PropTypes.node.isRequired,
};
