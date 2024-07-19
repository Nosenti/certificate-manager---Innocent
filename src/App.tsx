import {
  createBrowserRouter,
  RouterProvider,
  BrowserRouter as Router,
  Route,
  Routes,
} from 'react-router-dom';
import './App.css';
import Layout from './components/layout/Layout';
import Start from './components/start/Start';
import Example from './components/example/Example';

const router = createBrowserRouter([
  {
    element: <Layout />,
    children: [
      {
        path: '/',
        element: <Start />,
      },
      {
        path: '/start',
        element: <Start />,
      },
      {
        path: '/example1',
        element: <Example />,
      },
      {
        path: '/example2',
        element: <Example />,
      },
      {
        path: '/example3',
        element: <Example />,
      },
    ],
  },
]);
/**
 * App - component that serves as the main container of the entire application
 * Description - Renders the Layout component with content in respect to the route
 *
 */
const App = (): JSX.Element => {
  return <RouterProvider router={router}/>
};

export default App;
