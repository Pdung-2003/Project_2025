import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import './index.css';
import App from './App.jsx';
import { BrowserRouter } from 'react-router-dom';
import { AppProvider } from '@/AppProvider';
import 'react-responsive-carousel/lib/styles/carousel.min.css';
import { ToastContainer } from 'react-toastify';

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <AppProvider>
      <BrowserRouter>
        <ToastContainer limit={5} newestOnTop />
        <App />
      </BrowserRouter>
    </AppProvider>
  </StrictMode>
);
