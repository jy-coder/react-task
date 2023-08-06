import React, { ReactNode, createContext, useState } from "react";
import { User } from "../../types";

export const UserContext = createContext<User>({} as User);

export interface IUserContext {
  children: ReactNode;
}

export const UserContextProvider: React.FC<IUserContext> = ({ children }) => {
  const [userInfo, setUserInfo] = useState(null);
  const [isAuth, setIsAuth] = useState(false);

  const value = {
    userInfo,
    setUserInfo,
    isAuth,
    setIsAuth,
  };

  return (
    <UserContext.Provider value={value}> {children} </UserContext.Provider>
  );
};

export default UserContext;
