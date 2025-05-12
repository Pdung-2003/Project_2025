import './App.css';
import { Route, Routes } from 'react-router-dom';
import MainLayout from './layouts/MainLayout';
import HomePage from './pages/Home';
import Dashboard from './pages/Dashboard';
import UserManager from './pages/Dashboard/UserManager';
import DashboardLayout from './layouts/DashboardLayout';
import Profile from '@/pages/Profile';
import Tour from '@/pages/Tour';
import TourManager from '@/pages/Dashboard/TourManager';
import Authentication from './Authentication';
import PublicAuthentication from './PublicAuthentication';
import TourDetails from './pages/TourDetails';
import AdminAuthentication from './AdminAuthentication';

function App() {
  return (
    <Routes>
      <Route element={<AdminAuthentication />}>
        <Route element={<PublicAuthentication />}>
          {PUBLIC_ROUTES.map((route) => (
            <Route
              key={route.path}
              path={route.path}
              element={
                <MainLayout>
                  <route.element />
                </MainLayout>
              }
            />
          ))}
        </Route>
        <Route element={<Authentication />}>
          {USER_PRIVATE_ROUTES.map((route) => (
            <Route
              key={route.path}
              path={route.path}
              element={
                <MainLayout>
                  <route.element />
                </MainLayout>
              }
            />
          ))}
        </Route>
        {PRIVATE_ROUTES.map((route) => (
          <Route
            key={route.path}
            path={route.path}
            element={
              <DashboardLayout>
                <route.element />
              </DashboardLayout>
            }
          />
        ))}
      </Route>
    </Routes>
  );
}

export default App;

export const PUBLIC_ROUTES = [
  {
    path: '/',
    element: HomePage,
  },
  {
    path: '/tours',
    element: Tour,
  },
  {
    path: '/tour-details/:id',
    element: TourDetails,
  },
];

export const USER_PRIVATE_ROUTES = [
  {
    path: '/profile',
    element: Profile,
  },
];

export const PRIVATE_ROUTES = [
  {
    path: '/dashboard',
    element: Dashboard,
  },
  {
    path: '/user-manager',
    element: UserManager,
  },
  {
    path: '/tour-manager',
    element: TourManager,
  },
];
