import axiosStatic, { AxiosRequestConfig } from 'axios';
import {
  loginInterceptor,
  tokenInterceptor,
  captchaRequiredInterceptor,
  captchaInterceptor,
  errorInterceptor,
} from './interceptors';


const baseUrl = 'http://localhost:8080';

const defaultConfig: AxiosRequestConfig = {
  baseURL: `${baseUrl}/ecommerce/`,
};

export function createAxios(baseConfig: AxiosRequestConfig) {
  const instance = axiosStatic.create(baseConfig);

  // Request Interceptors
  instance.interceptors.request.use(tokenInterceptor);
  instance.interceptors.request.use(captchaInterceptor);

  // Response Interceptors
  instance.interceptors.response.use(loginInterceptor);

  instance.interceptors.response.use((c) =>c, captchaRequiredInterceptor);
  instance.interceptors.response.use((c) =>c, errorInterceptor);
  return instance;
}

export default createAxios(defaultConfig);
