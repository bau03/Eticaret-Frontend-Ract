import { useSelector } from 'react-redux';

export function useTemporary() {
  const isCaptchaRequired = useSelector((store) => store.temp?.captchaRequired);
  const isErrorRequired = useSelector((store) => store.temp?.errorRequired);
  const isSuccessRequired = useSelector((store) => store.temp?.successRequired);
  return {
    isCaptchaRequired,
    isErrorRequired,
    isSuccessRequired,
  };
}
