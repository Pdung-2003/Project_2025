import PropTypes from 'prop-types';
import Sidebar from './Sidebar';
import TopBar from './TopBar';

const DashboardLayout = ({ children }) => {
  return (
    <div className="flex h-screen">
      <Sidebar />
      <div className="flex flex-col flex-1">
        <TopBar />
        <div className="h-full w-full">{children}</div>
      </div>
    </div>
  );
};

export default DashboardLayout;

DashboardLayout.propTypes = {
  children: PropTypes.node.isRequired,
};
