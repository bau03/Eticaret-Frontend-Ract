import { AxiosResponse } from 'axios';
import { setAccessToken, setRefreshToken } from '@internship/shared/utils';

export const loginInterceptor = (res: AxiosResponse) => {
  if (res.config.url.endsWith('authenticator/signin')) {
    console.log("geldim");
    const accessToken = res.data?.accessToken;
    const refreshToken = res.data?.refreshToken;
    if (res.status === 200 && accessToken) {
      if(refreshToken){
        setRefreshToken(refreshToken);
      }
      setAccessToken(accessToken);
    }
  }

  return res;
};
