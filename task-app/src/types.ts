export interface Task {
  id: number;
  name: string;
}

export interface User {
  isAuth: boolean;
  token?: string | null;
  userInfo: UserInfo | null;
  setUserInfo: React.Dispatch<React.SetStateAction<UserInfo | null>>;
  setIsAuth: React.Dispatch<React.SetStateAction<boolean>>;
}

export interface UserInfo {
  id: number;
  username: string;
  email: string;
}
export interface TaskInput {
  name: string;
  description: string;
}
