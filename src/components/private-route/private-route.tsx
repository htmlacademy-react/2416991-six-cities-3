import { Navigate } from 'react-router-dom';
import { AppRoute } from '../../const/infrastructure';

type PrivateRouteProps = {
  children: JSX.Element;
};

function PrivateRoute({ children }: PrivateRouteProps): JSX.Element {
  const hasAccess = false;

  return hasAccess ? children : <Navigate to={AppRoute.Login} />;
}

export default PrivateRoute;
