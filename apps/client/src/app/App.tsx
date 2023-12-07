import { Navigate, Route, Routes } from 'react-router-dom';
import { withAuthenticationRequired } from '@auth0/auth0-react';

import { useAuth } from 'hooks';

import Loading from 'components/Loading';
import AuthPage from './auth/AuthPage';
import CallbackPage from './CallbackPage';
import DashboardPage from './dashboard/DashboardPage';
import ProductPage from './dashboard/products/ProductPage';
import ProductReportPage from './dashboard/productReport/ProductReportPage';

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const ProtectedRoute = ({ component }: any) => {
  const Component = withAuthenticationRequired(component, {
    onRedirecting: Loading,
  });

  return <Component />;
};

const App = () => {
  const { isLoading } = useAuth();

  if (isLoading) {
    return <Loading />;
  }

  return (
    <Routes>
      <Route path="/w" element={<ProtectedRoute component={DashboardPage} />}>
        <Route path="" element={<ProductPage />} />
        <Route path=":productId/reports" element={<ProductReportPage />} />
      </Route>
      <Route path="/callback" element={<CallbackPage />} />
      <Route path="/" element={<AuthPage />} />
      <Route path="*" element={<Navigate to="/w" replace />} />
    </Routes>
  );
};

export default App;
