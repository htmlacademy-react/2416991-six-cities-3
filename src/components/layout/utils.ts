import { matchPath } from 'react-router-dom';
import { AppRoute, AuthorizationStatus } from '../../const/infrastructure';
import { AuthStatus } from '../../types/infrastructure';

export const getContainerModifications = (pathname: string, authorizationStatus: AuthStatus): string => {
  if (authorizationStatus === AuthorizationStatus.Unknown) {
    return '';
  }

  if (matchPath(AppRoute.Root, pathname)) {
    return 'page--gray page--main';
  }
  if (matchPath(AppRoute.Login, pathname)) {
    return 'page--gray page--login';
  }
  return '';
};

export const getMainElementModifications = (pathname: string): string => {
  if (matchPath(AppRoute.Root, pathname)) {
    return 'page__main--index';
  }
  if (matchPath(AppRoute.Login, pathname)) {
    return 'page__main--login';
  }
  if (matchPath(AppRoute.Favorites, pathname)) {
    return 'page__main--favorites';
  }
  if (matchPath(`${AppRoute.Offer}/:id`, pathname)) {
    return 'page__main--offer';
  }
  return '';
};
