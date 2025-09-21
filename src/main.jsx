import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import './index.css';
import App from './App.jsx';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import CreateTrip from './routes/create-trip/index.jsx';
import Header from './components/custom/Header.jsx';
import { Toaster } from './components/ui/sonner';
import { GoogleOAuthProvider } from '@react-oauth/google';
import ViewTrip from './routes/view-trip/[tripId]';
import MyTrips from './routes/my-trips';

// Layout component that includes the Header
function Layout({ children }) {
  return (
    <div className='font-geist'>
      <Header />
      <main>{children}</main>
    </div>
  );
}

// Define your router structure
const router = createBrowserRouter([
  {
    path: '/',
    element: <Layout><App /></Layout>,  // Render App inside Layout with Header
  },
  {
    path: '/create-trip',
    element: <Layout><CreateTrip /></Layout>,  // Render CreateTrip inside Layout
  },
  {
    path: '/view-trip/:tripId',
    element: <Layout><ViewTrip /></Layout>,  // Render ViewTrip inside Layout
  },
  {
    path: '/my-trips',
    element: <Layout><MyTrips /></Layout>,  // Render My Trips inside Layout
  }
]);

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <GoogleOAuthProvider clientId={import.meta.env.VITE_GOOGLE_AUTH_CLIENT_ID}>
      <Toaster />
      <RouterProvider router={router} />
    </GoogleOAuthProvider>
  </StrictMode>
);
