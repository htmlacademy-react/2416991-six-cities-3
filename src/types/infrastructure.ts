import { AppRoute, AuthorizationStatus } from '../const/infrastructure';

export type Route = (typeof AppRoute)[keyof typeof AppRoute];

export type AuthStatus =
  (typeof AuthorizationStatus)[keyof typeof AuthorizationStatus];
