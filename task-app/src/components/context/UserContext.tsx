import React, { type ReactNode, createContext, useState } from 'react'
import { type UserInfo, type User } from '../../types'

const initialAppValue: User = {
  isAuth: false,
  token: null,
  userInfo: null,
  setUserInfo: () => {},
  setIsAuth: () => {}
}

export const UserContext = createContext<User>(initialAppValue)

export interface IUserContext {
  children: ReactNode
}

export const UserContextProvider: React.FC<IUserContext> = ({ children }) => {
  const [userInfo, setUserInfo] = useState<UserInfo | null>(null)
  const [isAuth, setIsAuth] = useState(false)

  const value = {
    userInfo,
    setUserInfo,
    isAuth,
    setIsAuth
  }

  return (
    <UserContext.Provider value={value}> {children} </UserContext.Provider>
  )
}

export default UserContext
