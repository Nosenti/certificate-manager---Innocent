import { createBrowserRouter, RouterProvider, BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import './App.css';
import Layout from './components/layout/Layout';
import Start from './components/start/Start';

const router = createBrowserRouter([
  {
    element: <Layout />,
    children: [
      {
    path: '/',
    element: <Start/>
  }
    ]
  }
  
])
/**
 * App - component that serves as the main container of the entire application
 * Description - Renders the Layout component
 *
 */
const App = (): JSX.Element => {
  return (
    <Router>
      <Layout />
    </Router>
    );
};

export default App;
