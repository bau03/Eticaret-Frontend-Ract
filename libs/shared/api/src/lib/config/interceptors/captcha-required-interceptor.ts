import { AxiosError } from 'axios';

export const captchaRequiredInterceptor = (error: AxiosError) => {
  if (error.config?.url?.endsWith('/signin')) {
    if (error.response.status === 417) {
      //TODO find a better usage to remove this ugly implementation
      window['UGLY_STORE'].dispatch({ type: '@temp/CAPTCHA_REQUIRED', payload: true });
    } else {
      window['UGLY_STORE'].dispatch({ type: '@temp/CAPTCHA_REQUIRED', payload: false });
    }
  }

  throw error;
};
