import React from 'react';
import { fireEvent, render, waitFor } from '@testing-library/react';
import Signin from '../../pages/Signin';

const mockedHistoryPush = jest.fn();
const mockedSignIn = jest.fn();
const mockedAddToast = jest.fn();

jest.mock('react-router-dom', () => {
  return {
    useHistory: () => ({
      push: mockedHistoryPush,
    }),
    Link: ({ children }: { children: React.ReactNode }) => children,
  };
});

jest.mock('../../hooks/auth', () => ({
  useAuth: () => ({
    signIn: mockedSignIn,
  }),
}));

jest.mock('../../hooks/toast', () => ({
  useToast: () => ({
    addToast: mockedAddToast,
  }),
}));

describe('Signin', () => {
  beforeEach(() => {
    mockedHistoryPush.mockClear();
  });

  it('should be able to signin', async () => {
    const { getByPlaceholderText, getByText } = render(<Signin />);

    const emailField = getByPlaceholderText('E-Mail');
    const passwordField = getByPlaceholderText('Senha');
    const buttomEllement = getByText('Entrar');

    fireEvent.change(emailField, {
      target: { value: 'johndoe@example.com' },
    });
    fireEvent.change(passwordField, {
      target: { value: '123123' },
    });

    fireEvent.click(buttomEllement);

    await waitFor(() => {
      expect(mockedHistoryPush).toHaveBeenCalledWith('/dashboard');
    });
  });

  it('should not be able to signin with invalid credentials', async () => {
    const { getByPlaceholderText, getByText } = render(<Signin />);

    const emailField = getByPlaceholderText('E-Mail');
    const passwordField = getByPlaceholderText('Senha');
    const buttomEllement = getByText('Entrar');

    fireEvent.change(emailField, {
      target: { value: 'not-valid-email' },
    });
    fireEvent.change(passwordField, {
      target: { value: 'not-valid-password' },
    });

    fireEvent.click(buttomEllement);

    await waitFor(() => {
      expect(mockedHistoryPush).not.toHaveBeenCalled;
    });
  });

  it('should display an error if login fails', async () => {
    mockedSignIn.mockImplementation(() => {
      throw Error();
    });

    const { getByPlaceholderText, getByText } = render(<Signin />);

    const emailField = getByPlaceholderText('E-Mail');
    const passwordField = getByPlaceholderText('Senha');
    const buttomEllement = getByText('Entrar');

    fireEvent.change(emailField, {
      target: { value: 'johndoe@example.com' },
    });
    fireEvent.change(passwordField, {
      target: { value: '123123' },
    });

    fireEvent.click(buttomEllement);

    await waitFor(() => {
      expect(mockedAddToast).toHaveBeenCalledWith(
        expect.objectContaining({ type: 'error' }),
      );
    });
  });
});
