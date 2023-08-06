import { Navigate } from 'react-router-dom'

import * as React from 'react'
import { type User } from '../types'
import UserContext from '../components/context/UserContext'
import { useContext } from 'react'

interface IProtectedRouteProps {
  redirectPath?: string
  children: JSX.Element
}

const ProtectedRoute: React.FC<IProtectedRouteProps> = ({
  redirectPath = '/login',
  children
}) => {
  const { isAuth } = useContext<User>(UserContext)
  if (!isAuth) {
    return <Navigate to={redirectPath} replace />
  }

  return children
}

export default ProtectedRoute
