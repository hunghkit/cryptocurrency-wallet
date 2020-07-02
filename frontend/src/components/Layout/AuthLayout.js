import React, { Suspense } from 'react';
import {
  AppFooter,
  AppHeader,
  AppSidebar,
  AppSidebarForm,
  AppSidebarHeader,
  AppSidebarNav,
} from '@coreui/react';
import PropTypes from 'prop-types';

import navigation from '../../configs/nav';
import { Loading } from '../Loading';
import { useLocation } from 'react-router-dom';

const Footer = React.lazy(() => import('./Footer'));
const Header = React.lazy(() => import('./Header'));

const Content = ({ children }) => {
  const location = useLocation();

  return (
    <div className="app">
      <AppHeader fixed>
        <Suspense fallback={<Loading />}>
          <Header />
        </Suspense>
      </AppHeader>
      <div className="app-body">
        <AppSidebar fixed display="lg">
          <AppSidebarHeader />
          <AppSidebarForm />
          <Suspense>
            <AppSidebarNav navConfig={navigation} location={location} />
          </Suspense>
        </AppSidebar>
        <main className="main">{children}</main>
      </div>
      <AppFooter>
        <Suspense fallback={<Loading />}>
          <Footer />
        </Suspense>
      </AppFooter>
    </div>
  );
};

Content.propTypes = {
  children: PropTypes.any,
};

Content.defaultProps = {};

export default Content;
