import { AxiosError } from 'axios';
const err = {
  'authenticator/signin': {
    '400': 'Kullanıcı bilgileriniz hatalı !',
    '401': 'Hatlı Kod Mail adresinizi tekrar kontrol ediniz.',
    '402': 'Geçersiz Kod Mail adresinizi tekrar kontrol ediniz.',
  },
  'authenticator/sign-up': {
    '400': 'Kullanıcı adı zaten alınmış!',
    '401': 'E-posta zaten kullanımda!',
  },
  'authenticator/forgot-password': {
    '401': 'Belirtilen e-postaya sahip kullanıcı bulunamadı.',
  },
};
///
export const errorInterceptor = (error: AxiosError) => {
  let errorMessage = null;
/* console.log('error url'+error.config.url);
 console.log('error data'+error.response?.data?.message);
  //authenticator/forgot-password
  //User with given email could not found*/
  if (error.response?.data?.message.toString()=== 'Username and password should be provided') {
    errorMessage = err[error.config?.url?.toString()]['400'];
  } else if(error.response?.data?.message.toString()=== 'Username is already taken!') {
    errorMessage = err[error.config?.url?.toString()]['400'];
  } else if(error.response?.data?.message.toString()=== 'Email is already in use!') {
    errorMessage = err[error.config?.url?.toString()]['401'];
  } else if(error.response?.data?.message.toString()=== 'User with given email could not found') {
    errorMessage = err[error.config?.url?.toString()]['401'];
  }
  window['UGLY_STORE'].dispatch({
    type: '@temp/ERROR_REQUIRED',
    payload: errorMessage,
  });
  throw error;
};
