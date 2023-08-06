export interface Task {
  id: number
  name: string
}

export interface User {
  isAuth: boolean
  token?: string | null
  userInfo: any
  setUserInfo: any
  setIsAuth: any
}
