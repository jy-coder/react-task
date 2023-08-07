/** @jest-environment jsdom */

import React from 'react';
import {
  act,
  getByTestId,
  render,
  screen,
  waitFor
} from '@testing-library/react';
import '@testing-library/jest-dom';

import userEvent from '@testing-library/user-event';
import { LoginForm } from './forms/LoginForm';
import { MemoryRouter } from 'react-router-dom';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

it('login form is properly rendered', async () => {
  const queryClient = new QueryClient();

  const emailInput = 'me@gmail.com';
  const passwordInput = 'please';

  const dom = render(
    <QueryClientProvider client={queryClient}>
      <MemoryRouter>
        <LoginForm />
      </MemoryRouter>
    </QueryClientProvider>
  );
  let email, password, login;
  await act(() => {
    email = getByTestId(dom.container, 'email');
    password = getByTestId(dom.container, 'password');
    login = getByTestId(dom.container, 'login');
    userEvent.type(email, emailInput);
    userEvent.type(password, passwordInput);
  });

  expect(email).toBeInTheDocument();
  expect(password).toBeInTheDocument();
  expect(login).toBeInTheDocument();
});
