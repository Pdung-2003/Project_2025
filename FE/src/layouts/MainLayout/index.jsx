import Header from './Header';
import Footer from './Footer';
import PropTypes from 'prop-types';

const MainLayout = ({ children }) => {
  return (
    <div>
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
