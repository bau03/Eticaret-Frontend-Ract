export const ACCESS_TOKEN = 'access_token';
export const REFRESH_TOKEN = 'refresh_token';
export const CAPTCHA_TOKEN = 'captcha_token';

export interface AdressAddRequest {
  counrty: string;
  province: string;
  district: string;
  street: string;
  buildingNumber: string;
  adressType: string;
}
export interface PurseAddRequest {
  balance:string;
}
export interface SellerBeginRequest{
  content:string;
}
export interface AddProductRequset{
  productName:string;
  explanation:string;
  price:string;
  productImage:string;
  stock:string;
  productCategory:string;
}
export interface AddShoppingProductRequset{
  productId:string;
}
export interface SellerBeginEditRequest{
  userid:string;
  id:string;
}
export interface OrderRequset{
  price:string;
  adress:string;
}
export interface ShowcaseRequset{
  productId:string;
  endTime:Date;
  price:string;
}
export interface ForgotPasswordRequest {
  email: string;
}
export interface ResetPasswordRequest {
  token: string;
  newPassword: string;
  newPasswordConfirmation: string;
}
