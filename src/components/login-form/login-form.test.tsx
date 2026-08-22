import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { describe, expect, it, vi } from 'vitest';
import { toast } from 'react-toastify';

import LoginForm from './login-form';
import { withStore } from '../../utils/mock-component';
import { loginAction } from '../../store/api-actions';
import {
  extractActionsTypes,
  makeFakeStore,
} from '../../utils/mocks';

vi.mock('react-toastify', () => ({
  toast: {
    warn: vi.fn(),
  },
}));

describe('Component: LoginForm', () => {
  it('should render form fields and submit button', () => {
    const { withStoreComponent } = withStore(
      <LoginForm />,
      makeFakeStore(),
    );

    render(withStoreComponent);

    expect(
      screen.getByPlaceholderText('Email'),
    ).toBeInTheDocument();

    expect(
      screen.getByPlaceholderText('Password'),
    ).toBeInTheDocument();

    expect(
      screen.getByRole('button', { name: 'Sign in' }),
    ).toBeInTheDocument();
  });

  it('should dispatch login action with valid data', async () => {
    const { withStoreComponent, mockStore } = withStore(
      <LoginForm />,
      makeFakeStore(),
    );

    render(withStoreComponent);

    const user = userEvent.setup();

    await user.type(
      screen.getByPlaceholderText('Email'),
      'test@test.com',
    );

    await user.type(
      screen.getByPlaceholderText('Password'),
      'password123',
    );

    await user.click(
      screen.getByRole('button', { name: 'Sign in' }),
    );

    expect(extractActionsTypes(mockStore.getActions())).toContain(
      loginAction.pending.type,
    );
  });

  it('should not dispatch login action with invalid email', async () => {
    const { withStoreComponent, mockStore } = withStore(
      <LoginForm />,
      makeFakeStore(),
    );

    render(withStoreComponent);

    const user = userEvent.setup();

    await user.type(
      screen.getByPlaceholderText('Email'),
      'invalid@email',
    );

    await user.type(
      screen.getByPlaceholderText('Password'),
      'password123',
    );

    await user.click(
      screen.getByRole('button', { name: 'Sign in' }),
    );

    expect(toast.warn).toHaveBeenCalledWith('Please enter a valid email address');
    expect(extractActionsTypes(mockStore.getActions())).not.toContain(
      loginAction.pending.type,
    );
  });

  it('should not dispatch login action with invalid password', async () => {
    const { withStoreComponent, mockStore } = withStore(
      <LoginForm />,
      makeFakeStore(),
    );

    render(withStoreComponent);

    const user = userEvent.setup();

    await user.type(
      screen.getByPlaceholderText('Email'),
      'test@test.com',
    );

    await user.type(
      screen.getByPlaceholderText('Password'),
      'password',
    );

    await user.click(
      screen.getByRole('button', { name: 'Sign in' }),
    );

    expect(toast.warn).toHaveBeenCalledWith(
      'Password must contain at least one letter and one number',
    );
    expect(extractActionsTypes(mockStore.getActions())).not.toContain(
      loginAction.pending.type,
    );
  });
});
