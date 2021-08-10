import { AxiosRequestConfig } from 'axios';

export const captchaInterceptor = (config: AxiosRequestConfig) => {
  if (config.data?.captcha) {
    const data = config.data.captcha;
    config.headers['captcha-response'] = `${data}`;
  } else {
    return config;
  }

  return config;
};
