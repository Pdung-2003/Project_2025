import Footer from './Footer';
import PropTypes from 'prop-types';
import { useAuthActions } from '@/hooks/useAuthActions';
import { useEffect } from 'react';

const MainLayout = ({ children }) => {
  const { fetchProfile } = useAuthActions();

  useEffect(() => {
    fetchProfile();
  }, []);

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
