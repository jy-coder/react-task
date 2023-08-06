// export const authApi = axios.create({
//   baseURL: BASE_URL,
//   withCredentials: true,
// });

import { AxiosRequest } from '../interceptor/http'

export interface LoginInput {
  username: string
  password: string
}

export interface RegisterInput {
  email: string
  password: string
}

interface Response {
  data: any
  status: number
}

export interface GenericResponse {
  response: Response
}
const authApi = new AxiosRequest('http://localhost:8085/api/v1')

export const signUpUserFn = async (user: RegisterInput) => {
  const response = await authApi.post<GenericResponse>('auth/register', user)
  return response.data
}

export const loginUserFn = async (user: LoginInput) => {
  const response = await authApi.post<GenericResponse>('auth/token', user)
  return response.data
}
