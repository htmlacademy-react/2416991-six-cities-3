import { AuthorizationStatus } from '../const/infrastructure';

// const authorizationStatus = Math.random() > 0.5 ? AuthorizationStatus.Auth : AuthorizationStatus.NoAuth;
const authorizationStatus = AuthorizationStatus.NoAuth;

export const getAuthStatus = (): (typeof AuthorizationStatus[keyof typeof AuthorizationStatus]) => authorizationStatus;
