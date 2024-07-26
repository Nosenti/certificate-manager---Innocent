import { RouterProvider } from 'react-router-dom';
import './App.css';
import router from './routes/Routes';
import { CertificateProvider } from './context/CertificateContext';

/**
 * App - component that serves as the main container of the entire application
 * Description - Renders the Layout component with content in respect to the route
 *
 */
const App = (): JSX.Element => {
  return (
    <CertificateProvider>
      <RouterProvider router={router} />
    </CertificateProvider>
  );
};

export default App;
