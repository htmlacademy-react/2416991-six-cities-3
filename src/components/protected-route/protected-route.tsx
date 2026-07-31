import { Location, Navigate, useLocation } from "react-router-dom";
import { useAppSelector } from "../../hooks";
import { AppRoute } from "../../const/infrastructure";
import { PropsWithChildren} from "react";

type ProtectedRouteProps = {
  onlyNoAuth?: boolean;
};

type FromState = {
  from?: Location;
}

function ProtectedRoute({children, onlyNoAuth = false}: PropsWithChildren<ProtectedRouteProps>) {
  const location: Location<FromState> = useLocation() as Location<FromState>;

  const user = useAppSelector((state) => state.userInfo);
  console.log('user', user);
  console.log('onlyNoAuth', onlyNoAuth)

  if (onlyNoAuth && user) {
    const from = location.state?.from || { pathname: AppRoute.Root};
    return <Navigate to={from} replace/>
  }

  if (!onlyNoAuth && !user) {
    return <Navigate state={{ from: location }} to={AppRoute.Login} replace/>;
  }

  return children;
}

export default ProtectedRoute;
