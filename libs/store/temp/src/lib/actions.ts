import { createAction } from "typesafe-actions";

export const captchaRequired = createAction('@temp/CAPTCHA_REQUIRED')<boolean>()
export const errorRequired = createAction('@temp/ERROR_REQUIRED')<string>();
export const successRequired = createAction('@temp/SUCCESS_REQUIRED')<string>();
