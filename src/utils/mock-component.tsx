import { ReactElement } from 'react';
import { MemoryRouter } from 'react-router-dom';
import { HelmetProvider } from 'react-helmet-async';
import { MockStore, configureMockStore } from '@jedmao/redux-mock-store';
import MockAdapter from 'axios-mock-adapter';
import { Provider } from 'react-redux';
import { Action } from 'redux';
import thunk from 'redux-thunk';
import { createAPI } from '../services/api';
import { State } from '../types/state';
import { AppThunkDispatch } from './mocks';

export function withHistory(
  component: ReactElement,
  initialEntries: string[] = ['/'],
) {
  return (
    <MemoryRouter initialEntries={initialEntries}>
      <HelmetProvider>{component}</HelmetProvider>
    </MemoryRouter>
  );
}

type ComponentWithMockStore = {
  withStoreComponent: ReactElement;
  mockStore: MockStore;
  mockAxiosAdapter: MockAdapter;
};

export function withStore(
  component: ReactElement,
  initialState: Partial<State> = {},
): ComponentWithMockStore {
  const axios = createAPI();
  const mockAxiosAdapter = new MockAdapter(axios);
  const middleware = [thunk.withExtraArgument(axios)];
  const mockStoreCreator = configureMockStore<
    State,
    Action<string>,
    AppThunkDispatch
  >(middleware);
  const mockStore = mockStoreCreator(initialState);

  return {
    withStoreComponent: <Provider store={mockStore}>{component}</Provider>,
    mockStore,
    mockAxiosAdapter,
  };
}
