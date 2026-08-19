import { describe, it, expect } from 'vitest';
import { AppRoute, AuthorizationStatus } from '../../const/infrastructure';
import { getContainerModifications, getMainElementModifications } from './utils';

describe('Layout Utils', () => {
  describe('getContainerModifications', () => {
    it('should return empty string when authorizationStatus is Unknown', () => {
      const result = getContainerModifications(
        AppRoute.Root,
        AuthorizationStatus.Unknown,
        false,
      );

      expect(result).toBe('');
    });

    it('should return "page--gray page--main" for Root route', () => {
      const result = getContainerModifications(
        AppRoute.Root,
        AuthorizationStatus.Auth,
        false,
      );

      expect(result).toBe('page--gray page--main');
    });

    it('should return "page--gray page--login" for Login route', () => {
      const result = getContainerModifications(
        AppRoute.Login,
        AuthorizationStatus.NoAuth,
        false,
      );

      expect(result).toBe('page--gray page--login');
    });

    it('should return "page--favorites-empty" for Favorites route when isEmpty is true', () => {
      const result = getContainerModifications(
        AppRoute.Favorites,
        AuthorizationStatus.Auth,
        true,
      );

      expect(result).toBe('page--favorites-empty');
    });

    it('should return empty string for Favorites route when isEmpty is false', () => {
      const result = getContainerModifications(
        AppRoute.Favorites,
        AuthorizationStatus.Auth,
        false,
      );

      expect(result).toBe('');
    });

    it('should return empty string for unknown/other routes', () => {
      const result = getContainerModifications(
        '/unknown-route',
        AuthorizationStatus.Auth,
        false,
      );

      expect(result).toBe('');
    });
  });

  describe('getMainElementModifications', () => {
    describe('Root Route', () => {
      it('should return "page__main--index" when isEmpty is false', () => {
        const result = getMainElementModifications(AppRoute.Root, false);

        expect(result).toBe('page__main--index');
      });

      it('should return "page__main--index page__main--index-empty" when isEmpty is true', () => {
        const result = getMainElementModifications(AppRoute.Root, true);

        expect(result).toBe('page__main--index page__main--index-empty');
      });
    });

    describe('Login Route', () => {
      it('should return "page__main--login" regardless of isEmpty value', () => {
        const resultWithFalse = getMainElementModifications(AppRoute.Login, false);
        const resultWithTrue = getMainElementModifications(AppRoute.Login, true);

        expect(resultWithFalse).toBe('page__main--login');
        expect(resultWithTrue).toBe('page__main--login');
      });
    });

    describe('Favorites Route', () => {
      it('should return "page__main--favorites" when isEmpty is false', () => {
        const result = getMainElementModifications(AppRoute.Favorites, false);

        expect(result).toBe('page__main--favorites');
      });

      it('should return "page__main--favorites page__main--favorites-empty" when isEmpty is true', () => {
        const result = getMainElementModifications(AppRoute.Favorites, true);

        expect(result).toBe('page__main--favorites page__main--favorites-empty');
      });
    });

    describe('Offer Route', () => {
      it('should return "page__main--offer" for offer page with parameter ID', () => {
        const result = getMainElementModifications(`${AppRoute.Offer}/123`, false);

        expect(result).toBe('page__main--offer');
      });
    });

    describe('Unknown Route', () => {
      it('should return empty string for unmatched routes', () => {
        const result = getMainElementModifications('/non-existent-page', false);

        expect(result).toBe('');
      });
    });
  });
});
