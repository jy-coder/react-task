import React, { type ReactNode, createContext, useState } from 'react';
import { User } from '../types';

export interface IApp {
  navBarHidden: boolean;
  setNavBarHidden: React.Dispatch<React.SetStateAction<boolean>>;
}

const initialAppValue: IApp = {
  navBarHidden: false,
  setNavBarHidden: () => {}
};

export const AppContext = createContext<IApp>(initialAppValue);

interface IAppContext {
  children: ReactNode;
}

export const AppContextProvider: React.FC<IAppContext> = ({ children }) => {
  const [navBarHidden, setNavBarHidden] = useState(false);

  const value = {
    navBarHidden,
    setNavBarHidden
  };

  return <AppContext.Provider value={value}> {children} </AppContext.Provider>;
};

export default AppContext;
