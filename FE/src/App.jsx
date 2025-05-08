import './App.css';
import { Route, Routes } from 'react-router-dom';
import MainLayout from './layouts/MainLayout';
import HomePage from './pages/Home';
import Dashboard from './pages/Dashboard';
import UserManager from './pages/Dashboard/UserManager';
import DashboardLayout from './layouts/DashboardLayout';
import Profile from '@/pages/Profile';
import Tour from '@/pages/Tour';
import TourManager from '@/pages/TourManager';
import Authentication from './Authentication';

function App() {
  return (
    <Routes>
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
      <Route element={<Authentication />}>
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

const PUBLIC_ROUTES = [
  {
    path: '/',
    element: HomePage,
  },
  {
    path: '/tours',
    element: Tour,
  },
  {
    path: '/tour-manager',
    element: TourManager,
  },
];

const PRIVATE_ROUTES = [
  {
    path: '/dashboard',
    element: Dashboard,
  },
  {
    path: '/profile',
    element: Profile,
  },
  {
    path: '/user-manager',
    element: UserManager,
  },
];
