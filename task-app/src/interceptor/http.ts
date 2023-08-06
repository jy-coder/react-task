import axios, { AxiosError, AxiosInstance, AxiosResponse } from "axios";
import { toast } from "react-toastify";

export class AxiosRequest {
  private axiosInstance: AxiosInstance;

  constructor(baseUrl: string) {
    this.axiosInstance = axios.create({
      baseURL: baseUrl,
    });

    this.axiosInstance.interceptors.response.use(
      (response: AxiosResponse) => {
        return response.data;
      },
      (error: AxiosError) => {
        if (error.response) {
          if (error.response.status === 401) {
            toast.error("Unauthorized");
          }
        }

        return Promise.reject(error);
      }
    );
  }
  public setAuthToken(token: string) {
    this.axiosInstance.defaults.headers.common.Authorization = "";
    delete this.axiosInstance.defaults.headers.common.Authorization;

    if (token) {
      this.axiosInstance.defaults.headers.common.Authorization = `${token}`;
    }
  }

  public post<T>(url: string, data?: any) {
    return this.axiosInstance.post<T>(url, data);
  }
}
