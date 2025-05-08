import Footer from './Footer';
import PropTypes from 'prop-types';
import Header from './Header';

const MainLayout = ({ children }) => {
  return (
    <div className="h-full w-full">
      <Header />
      {children}
      <Footer />
    </div>
  );
};

export default MainLayout;

MainLayout.propTypes = {
  children: PropTypes.node.isRequired,
};
