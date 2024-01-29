import React from 'react';
import Footer from '../../components/Footer';
import NotificationMenu from '../../components/Notification';
import Header from './header';
import PublicRoutes, { PublicModalRoutes } from './routes';

const Mgt: React.FC = () => {
  return (
    <>
      <NotificationMenu />

      <Header/>

      <PublicModalRoutes />
      <div className="mainContainer topSpace">
        <PublicRoutes />
      </div>

      <Footer />
    </>
  );
};

export default Mgt;
