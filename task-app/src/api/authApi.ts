import { AxiosRequest } from '../interceptor/http';

export interface LoginInput {
  username: string;
  password: string;
}

export interface GenericResponse {
  response: Response;
}
export interface RegisterInput {
  username: string;
  password: string;
  confirmPassword: string;
}

export interface RegisterRequest {
  username: string;
  password: string;
}

const authApi = new AxiosRequest('http://localhost:8085/api/v1');

export const signUpUserFn = async (user: RegisterRequest) => {
  const response = await authApi.post<GenericResponse>('auth/register', user);
  return response;
};

export const loginUserFn = async (user: LoginInput) => {
  const response = await authApi.post<GenericResponse>('auth/token', user);
  return response;
};
