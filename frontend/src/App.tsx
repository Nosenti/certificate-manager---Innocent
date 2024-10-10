import { RouterProvider } from 'react-router-dom';
import './App.css';
import { CertificateProvider } from './context/CertificateContext';
import { NotificationProvider } from './context/NotificationContext';
import router from './routes/Routes';

/**
 * App - component that serves as the main container of the entire application
 * Description - Renders the Layout component with content in respect to the route
 *
 */
const App = (): JSX.Element => {
  return (
    <NotificationProvider>
      <CertificateProvider>
        <RouterProvider router={router} />
      </CertificateProvider>
    </NotificationProvider>
  );
};

export default App;
