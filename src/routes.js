import { Navigate, useRoutes } from 'react-router-dom';
// layouts
import DashboardLayout from './layouts/dashboard';
import SimpleLayout from './layouts/simple';
//
import Page404 from './pages/Page404';
import DashboardAppPage from './pages/DashboardAppPage';
import QuotesPage from './pages/QuotePage';
import AddQuotePage from './pages/AddQuotePage';
import AboutPage from './pages/AboutPage';

// ----------------------------------------------------------------------

export default function Router() {
  const routes = useRoutes([
    {
      element: <DashboardLayout />,
      children: [
        { element: <Navigate to="/dashboard" />, index: true },
        { path: 'dashboard', element: <DashboardAppPage /> },
        { path: 'quotes', element: <QuotesPage /> },
        { path: 'addquotes', element: <AddQuotePage /> },
        { path: 'about', element: <AboutPage /> },
      ],
    },
    {
      element: <SimpleLayout />,
      children: [
        { element: <Navigate to="/dashboard" />, index: true },
        { path: '404', element: <Page404 /> },
        { path: '*', element: <Navigate to="/404" /> },
      ],
    },
    {
      path: '*',
      element: <Navigate to="/404" replace />,
    },
  ]);

  return routes;
}
