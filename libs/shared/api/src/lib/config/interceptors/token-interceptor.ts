import { AxiosRequestConfig } from 'axios';
import { getAccessToken } from '@internship/shared/utils';

export const tokenInterceptor = (config: AxiosRequestConfig) => {
  const accessToken = getAccessToken();

  if (accessToken) {
    config.headers['Authorization'] = `Bearer ${accessToken}`;
  }
  return config;
};
