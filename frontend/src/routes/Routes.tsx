import { createBrowserRouter } from 'react-router-dom';
import Layout from '../components/layout/Layout';
import Start from '../components/start/Start';
import Example from '../components/certificate-table/CertificatesTable';
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
        path: '/certificates',
        element: <Example />,
      },
      {
        path: '/new-certificate',
        element: <FormPage />,
      },
      {
        path: '/certificates/edit/:handle',
        element: <FormPage />,
      },
      {
        path: '*',
        element: <NotFound />,
      },
    ],
  },
]);

export default router;
