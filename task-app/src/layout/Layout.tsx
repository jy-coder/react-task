import React, { type ReactNode, useContext } from 'react';
import AppContext, { type IApp } from '../context/AppContext';
import UserContext from '../context/UserContext';
import { type User } from '../types';
import NavBar from '../components/styled/navbar/NavBar';
import { Auth } from 'aws-amplify';
import { useAuth } from '../hooks/useAuth';
import { useNavigate } from 'react-router-dom';

interface ILayoutProps {
  children: ReactNode;
}

const Layout: React.FC<ILayoutProps> = ({ children }) => {
  const [isAuth] = useAuth();
  const navigate = useNavigate();

  const logout = async () => {
    try {
      await Auth.signOut();
      navigate('/');
    } catch (error) {
      console.error('Error signing out: ', error);
    }
  };

  const authRoute = {
    left: [],
    right: [{ link: '', label: 'Logout', action: logout }]
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
