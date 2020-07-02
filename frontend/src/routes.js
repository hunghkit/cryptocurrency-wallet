import { lazy } from 'react';

const Dashboard = lazy(() => import('./modules/Dashboard'));

const Login = lazy(() => import('./modules/Login'));
const Register = lazy(() => import('./modules/Register'));

export const authRoutes = [
  { path: '/dashboard', exact: true, name: 'Dashboard', component: Dashboard },
];

export const unauthRoutes = [
  { path: '/sign-in', exact: true, name: 'Sign In', component: Login },
  { path: '/sign-up', exact: true, name: 'Sign Up', component: Register },
];
