import React, { Suspense, useEffect, useState } from 'react';
import { Provider, useSelector } from 'react-redux';
import { ToastContainer } from 'react-toastify';
import { ApolloProvider } from '@apollo/react-hooks';
import {
  Switch,
  Route,
  Redirect,
  BrowserRouter as Router,
} from 'react-router-dom';
import Cookie from 'js-cookie';
import { Container } from 'reactstrap';
import { AppBreadcrumb } from '@coreui/react';

import { useAuth } from '../Auth/useAuth';
import store from './services/createStore';
import { getAuthenticated } from './selector';
import { client } from './services/apollo-client';
import { authRoutes, unauthRoutes } from '../../routes';
import { AuthLayout, UnauthLayout, Loading } from '../../components';

export const AuthRoute = () => (
  <AuthLayout>
    <AppBreadcrumb appRoutes={authRoutes} />
    <Container fluid>
      <Suspense fallback={<Loading />}>
        <Switch>
          {authRoutes.map(
            (route, idx) =>
              !!route.component && (
                <Route
                  key={idx}
                  path={route.path}
                  exact={route.exact}
                  name={route.name}
                  component={route.component}
                />
              ),
          )}
          <Redirect from="/wallets" to="/wallets/usdt" />
          <Redirect from="/" to="/dashboard" />
        </Switch>
      </Suspense>
    </Container>
  </AuthLayout>
);

export const UnAuthRoute = () => (
  <UnauthLayout>
    <Container fluid>
      <Suspense fallback={<Loading />}>
        <Switch>
          {unauthRoutes.map(
            (route, idx) =>
              !!route.component && (
                <Route
                  key={idx}
                  path={route.path}
                  exact={route.exact}
                  name={route.name}
                  component={route.component}
                />
              ),
          )}
          <Redirect from="/" to="/sign-in" />
        </Switch>
      </Suspense>
    </Container>
  </UnauthLayout>
);

export const Root = () => {
  const { onProfile } = useAuth();
  const [loaded, setLoad] = useState();
  const isAuth = useSelector(getAuthenticated);

  useEffect(() => {
    if (!loaded) {
      if (!!Cookie.get('token')) {
        onProfile().finally(() => setLoad(true));
      } else {
        setLoad(true);
      }
    }
  }, [onProfile, loaded]);

  if (!loaded) {
    return (
      <Container className="text-center">
        <Loading />
        Loading...
      </Container>
    );
  }

  return isAuth ? <AuthRoute /> : <UnAuthRoute />;
};

export const App = () => (
  <Router>
    <ApolloProvider client={client}>
      <Provider store={store}>
        <Root />
        <ToastContainer />
      </Provider>
    </ApolloProvider>
  </Router>
);
