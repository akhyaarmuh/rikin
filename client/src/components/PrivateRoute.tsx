import { useLocation, Navigate } from 'react-router-dom';

import { useAppSelector } from '../redux/hooks';

export interface PrivateRouteProps {
  children: React.ReactNode;
}

const PrivateRoute: React.FC<PrivateRouteProps> = ({ children }) => {
  const location = useLocation();
  const userId = useAppSelector((state) => state.user.id);
  const shop = useAppSelector((state) => state.user.shop);
  const pathShops = location.pathname.split('/')[1];

  if (!userId) return <Navigate to="/sign-in" />;

  if (!shop && pathShops !== 'shops') return <Navigate to="/shops" />;

  return children;
};

export default PrivateRoute;
