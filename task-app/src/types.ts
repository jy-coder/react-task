import { StringLiteral } from 'typescript';

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
  status: string;
  taskId?: string;
}

export interface Task {
  // need id for draggable
  id: string;
  name: string;
  taskId: string;
  description: string;
  status: string;
  createDate?: string;
}

export interface TaskResponse {
  [taskId: string]: Task[];
}

export type HashMap = { [key: string]: string };
