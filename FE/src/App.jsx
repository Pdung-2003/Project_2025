import './App.css';
import { Route, Routes } from 'react-router-dom';
import MainLayout from './layouts/MainLayout';
import HomePage from './pages/Home';
import Dashboard from './pages/Dashboard';
import UserManager from './pages/Dashboard/UserManager';
import DashboardLayout from './layouts/DashboardLayout';
import Profile from '@/pages/Profile';
import Tour from '@/pages/Tour';

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
      {ADMIN_ROUTES.map((route) => (
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
    path: '/profile',
    element: Profile,
  },
  {
    path: '/tour',
    element: Tour,
  },
];

const ADMIN_ROUTES = [
  {
    path: '/dashboard',
    element: Dashboard,
  },
  {
    path: '/user-manager',
    element: UserManager,
  },
];
