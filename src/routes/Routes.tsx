import { createBrowserRouter } from 'react-router-dom';
import Layout from '../components/layout/Layout';
import Start from '../components/start/Start';
import Example from '../components/certificate-table/CertificatesTable';
import Example2 from '../components/example2/Example2';
import Example3 from '../components/example3/Example3';
import NotFound from '../components/not-found/NotFound';
import FormPage from '../components/certificate-form/CertificateForm';

const router = createBrowserRouter([
  {
    element: <Layout />,
    children: [
      {
        path: '/',
        element: <Start />,
      },
      {
        path: '/example1',
        element: <Example />,
      },
      {
        path: '/example2',
        element: <Example2 />,
      },
      {
        path: '/example3',
        element: <Example3 />,
      },
      {
        path: '/certificates/new',
        element: <FormPage />,
      },
      {
        path: '/certificates/new',
        element: <FormPage />,
      },
      {
        path: '/certificates/new',
        element: <FormPage />
      },
      {
        path: '*',
        element: <NotFound />,
      },
    ],
  },
]);

export default router;
