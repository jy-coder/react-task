import axios, {
  type AxiosError,
  type AxiosInstance,
  type AxiosResponse
} from 'axios';
import { toast } from 'react-toastify';

export class AxiosRequest {
  private readonly axiosInstance: AxiosInstance;

  constructor(baseUrl: string) {
    this.axiosInstance = axios.create({
      baseURL: baseUrl
    });

    this.axiosInstance.interceptors.response.use(
      (response: AxiosResponse) => {
        return response;
      },
      async (error: AxiosError) => {
        if (error.response != null) {
          if (error.response.status === 401) {
            toast.error('Unauthorized');
          }
        }

        return await Promise.reject(error);
      }
    );
  }

  public setAuthToken(token: string) {
    this.axiosInstance.defaults.headers.common.Authorization = '';
    delete this.axiosInstance.defaults.headers.common.Authorization;

    if (token) {
      this.axiosInstance.defaults.headers.common.Authorization = `${token}`;
    }
  }

  public async post<T>(url: string, data?: any): Promise<T> {
    const response: AxiosResponse<T> = await this.axiosInstance.post<T>(
      url,
      data
    );
    return response.data;
  }

  public async get<T>(url: string, data?: any): Promise<T> {
    const response: AxiosResponse<T> = await this.axiosInstance.get<T>(
      url,
      data
    );
    return response.data;
  }
}
