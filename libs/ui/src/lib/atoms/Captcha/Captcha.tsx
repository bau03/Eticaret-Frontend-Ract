import React, { useState } from 'react';
import ReCAPTCHA from 'react-google-recaptcha';

type CaptchaProps = JSX.IntrinsicElements['input'];

export const Captcha: React.FC<CaptchaProps> = React.forwardRef((props, ref) => {
  const { onChange, name } = props;
  const [captchaValue, setCaptchaValue] = useState('');
  const onChangeHandler = (value) => {
    onChange && onChange(value);
    setCaptchaValue(value);
  };
  return (
    <>
      <ReCAPTCHA sitekey="6LcQ1tIZAAAAAGNUDStvqDuRoUT4JosqNHUXQg_y" {...props} onChange={onChangeHandler} />
      <input type="hidden" defaultValue={captchaValue} name={name} ref={ref} />
    </>
  );
});
