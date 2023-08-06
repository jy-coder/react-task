import React, { ReactNode, createContext, useState } from "react";
import { User } from "../../types";

export interface IApp {
  navBarHidden: boolean;
  setNavBarHidden: React.Dispatch<React.SetStateAction<boolean>>;
}

export const AppContext = createContext<IApp>({} as IApp);

interface IAppContext {
  children: ReactNode;
}

export const AppContextProvider: React.FC<IAppContext> = ({ children }) => {
  const [navBarHidden, setNavBarHidden] = useState(false);

  const value = {
    navBarHidden,
    setNavBarHidden,
  };

  return <AppContext.Provider value={value}> {children} </AppContext.Provider>;
};

export default AppContext;
