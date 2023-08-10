import { AppShell, Header, Navbar } from '@mantine/core';
import React, { type ReactNode, useContext } from 'react';
import AppContext, { type IApp } from '../context/AppContext';
import UserContext from '../context/UserContext';
import { type User } from '../types';
import NavBar from '../components/styled/navbar/NavBar';

interface ILayoutProps {
  children: ReactNode;
}

const Layout: React.FC<ILayoutProps> = ({ children }) => {
  const { isAuth } = useContext<User>(UserContext);

  const authRoute = {
    left: [],
    right: [{ link: '/notification', label: 'Notification' }]
  };

  const noAuthRoute = {
    left: [],
    right: [
      { link: '/register', label: 'Sign Up' },
      { link: '/login', label: 'Login' }
    ]
  };

  return (
    <div>
      <NavBar navigation={isAuth ? authRoute : noAuthRoute} />
      <div>{children}</div>
    </div>
  );
};

export default Layout;
