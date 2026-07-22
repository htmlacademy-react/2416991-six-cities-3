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

export const getMainElementModifications = (pathname: string, isEmpty: boolean): string => {
  let baseClass = '';

  switch (true) {
    case Boolean(matchPath(AppRoute.Root, pathname)):
      baseClass = 'page__main--index';
      break;
    case Boolean(matchPath(AppRoute.Login, pathname)):
      baseClass = 'page__main--login';
      break;
    case Boolean(matchPath(AppRoute.Favorites, pathname)):
      baseClass = 'page__main--favorites';
      break;
    case Boolean(matchPath(`${AppRoute.Offer}/:id`, pathname)):
      baseClass = 'page__main--offer';
      break;
    default:
      return '';
  }

  if (baseClass === 'page__main--index' && isEmpty) {
    return `${baseClass} page__main--index-empty`;
  }


  return baseClass;
};
