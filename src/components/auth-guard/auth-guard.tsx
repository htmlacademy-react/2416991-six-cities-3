import { PropsWithChildren, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { AppRoute, AuthorizationStatus } from '../../const/infrastructure';
import { getAuthStatus } from '../../mocks/mock';
import Spinner from '../spinner/spinner';

type AuthGuardProps = {
  expectedStatus: Omit<typeof AuthorizationStatus[keyof typeof AuthorizationStatus], typeof AuthorizationStatus.Unknown>;
  redirectTo: typeof AppRoute[keyof typeof AppRoute];
};

function AuthGuard({ expectedStatus, redirectTo, children }: PropsWithChildren<AuthGuardProps>) {
  const navigate = useNavigate();
  const authorizationStatus = getAuthStatus();

  useEffect(() => {
    if (
      authorizationStatus !== expectedStatus && authorizationStatus !== AuthorizationStatus.Unknown
    ) {
      navigate(redirectTo, { replace: true });
    }
  }, [authorizationStatus, expectedStatus, redirectTo, navigate]);

  if (authorizationStatus === AuthorizationStatus.Unknown) {
    return <Spinner />;
  }

  if (authorizationStatus === expectedStatus) {
    return children;
  }

  return null;
}

export default AuthGuard;
