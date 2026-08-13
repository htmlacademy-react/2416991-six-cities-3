import { describe, it, expect } from 'vitest';
import faker from 'faker';
import { userSlice } from './user.slice';
import { AuthorizationStatus } from '../../../const/infrastructure';
import { checkAuthAction, loginAction, logoutAction } from '../../api-actions';
import { UserData } from '../../../types/user-data';

const createMockUserData = (): UserData => ({
  name: faker.name.firstName(),
  avatarUrl: faker.image.avatar(),
  isPro: faker.datatype.boolean(),
  email: faker.internet.email(),
  token: faker.datatype.uuid(),
});

describe('User Slice Reducer', () => {
  const initialState = {
    authorizationStatus: AuthorizationStatus.Unknown,
    userInfo: null,
  };

  const requestId = 'test-request-id';

  it('should return initial state with empty action', () => {
    const emptyAction = { type: '' };
    const result = userSlice.reducer(undefined, emptyAction);

    expect(result).toEqual(initialState);
  });

  describe('extraReducers - checkAuthAction', () => {
    it('should set authorizationStatus to "Auth" and set userInfo on "checkAuthAction.fulfilled"', () => {
      const mockUserData = createMockUserData();

      const action = checkAuthAction.fulfilled(mockUserData, requestId, undefined);
      const result = userSlice.reducer(initialState, action);

      expect(result.authorizationStatus).toBe(AuthorizationStatus.Auth);
      expect(result.userInfo).toEqual(mockUserData);
    });

    it('should set authorizationStatus to "NoAuth" and userInfo to null on "checkAuthAction.rejected"', () => {
      const stateWithAuth = {
        authorizationStatus: AuthorizationStatus.Auth,
        userInfo: createMockUserData(),
      };

      const action = checkAuthAction.rejected(null, requestId, undefined);
      const result = userSlice.reducer(stateWithAuth, action);

      expect(result.authorizationStatus).toBe(AuthorizationStatus.NoAuth);
      expect(result.userInfo).toBeNull();
    });
  });

  describe('extraReducers - loginAction', () => {

    it('should set authorizationStatus to "Auth" and set userInfo on "loginAction.fulfilled"', () => {
      const mockUserData = createMockUserData();
      const loginAuthData = {
        email: mockUserData.email,
        password: 'password123',
      };

      const action = loginAction.fulfilled(mockUserData, requestId, loginAuthData);
      const result = userSlice.reducer(initialState, action);

      expect(result.authorizationStatus).toBe(AuthorizationStatus.Auth);
      expect(result.userInfo).toEqual(mockUserData);
    });

    it('should set authorizationStatus to "NoAuth" and userInfo to null on "loginAction.rejected"', () => {
      const loginAuthData = {
        email: 'test@example.com',
        password: 'wrongpassword',
      };

      const action = loginAction.rejected(null, requestId, loginAuthData);
      const result = userSlice.reducer(initialState, action);

      expect(result.authorizationStatus).toBe(AuthorizationStatus.NoAuth);
      expect(result.userInfo).toBeNull();
    });
  });

  describe('extraReducers - logoutAction', () => {
    it('should set authorizationStatus to "NoAuth" and userInfo to null on "logoutAction.fulfilled"', () => {
      const stateWithAuth = {
        authorizationStatus: AuthorizationStatus.Auth,
        userInfo: createMockUserData(),
      };

      const action = logoutAction.fulfilled(undefined, requestId, undefined);
      const result = userSlice.reducer(stateWithAuth, action);

      expect(result.authorizationStatus).toBe(AuthorizationStatus.NoAuth);
      expect(result.userInfo).toBeNull();
    });
  });
});
