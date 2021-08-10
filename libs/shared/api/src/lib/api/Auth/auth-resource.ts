import axiosStatic, { AxiosInstance, AxiosRequestConfig } from 'axios';
import {
  AddProductRequset,
  AdressAddRequest,
  ForgotPasswordRequest,
  OrderRequset,
  PurseAddRequest,
  ResetPasswordRequest,
  SellerBeginEditRequest,
  SellerBeginRequest,
  ShowcaseRequset
} from "@internship/shared/types";
import {
  OrderDetailResponse,
  ProductDetailResponse,
  PurseDetailResponse,
  SellerDetailResponse,
  ShoppingDetailResponse,
  ShowcaseDetailResponse,
  UserAdressDetailResponse,
  UserDetailResponse
} from "./types";

export class AuthResource {
  constructor(private axios: AxiosInstance = axiosStatic, private axiosRequestConfig: AxiosRequestConfig = {}) {}
  login = (data: any): Promise<any> => this.axios.post('authenticator/signin', data, this.axiosRequestConfig).then((r) => r.data);
  forgotPasswordMail = (data: ForgotPasswordRequest): Promise<any> => this.axios.post('authenticator/forgot-password', data, this.axiosRequestConfig).then((r) => r.data
    (window['UGLY_STORE'].dispatch({
      type: '@temp/SUCCESS_REQUIRED',
      payload:r.data.message,
    }))
  );
  resetPassword = (data: ResetPasswordRequest): Promise<any> =>
    this.axios.post('user/create-new-password', data, this.axiosRequestConfig).then((r) => r.data
      (window['UGLY_STORE'].dispatch({
        type: '@temp/SUCCESS_REQUIRED',
        payload:r.data.message,
      }))
    );

  register = (data: any): Promise<any> => this.axios.post('authenticator/sign-up', data, this.axiosRequestConfig).then((r) => r.data(window['UGLY_STORE'].dispatch({
        type: '@temp/SUCCESS_REQUIRED',
        payload:r.data.message,
      })));
  update = (data: any): Promise<any> => this.axios.put('user/edit', data, this.axiosRequestConfig).then((r) => r.data);
  userDetail = (): Promise<UserDetailResponse> => this.axios.get('user/detail', this.axiosRequestConfig).then((r) => r.data);
  adressAdd = (data: AdressAddRequest): Promise<any> => this.axios.post('user/adress', data, this.axiosRequestConfig).then((r) => r.data(window['UGLY_STORE'].dispatch({
        type: '@temp/SUCCESS_REQUIRED',
        payload:r.data.message,
      })));
  purseAdd = (data: PurseAddRequest): Promise<any> => this.axios.post('user/purse', data, this.axiosRequestConfig).then((r) => r.data(window['UGLY_STORE'].dispatch({
        type: '@temp/SUCCESS_REQUIRED',
        payload:r.data.message,
      })));
  userAdressDetail = (userId): Promise<UserAdressDetailResponse[]> => this.axios.get(`/user/adress/${userId}`, this.axiosRequestConfig).then((r) => r.data);
  sellerBegin = (data: SellerBeginRequest): Promise<any> => this.axios.post('/user/sellerBegin', data, this.axiosRequestConfig).then((r) => r.data);
  sellerBeginEdit = (data: SellerBeginEditRequest): Promise<any> => this.axios.put('/admin/edit', data, this.axiosRequestConfig).then((r) => r.data);
  sellerDetail=(): Promise<SellerDetailResponse[]> => this.axios.get(`/admin/detail`, this.axiosRequestConfig).then((r) => r.data);
  productsDetail=(): Promise<ProductDetailResponse[]> => this.axios.get(`/admin/product`, this.axiosRequestConfig).then((r) => r.data);
  productsView=(productId): Promise<ProductDetailResponse> => this.axios.get(`/admin/productView/${productId}`, this.axiosRequestConfig).then((r) => r.data);
  addProduct = (data: AddProductRequset): Promise<any> => this.axios.post('/product/add', data, this.axiosRequestConfig).then((r) => r.data(window['UGLY_STORE'].dispatch({
        type: '@temp/SUCCESS_REQUIRED',
        payload:r.data.message,
      })));
  productsEdit=(productId): Promise<any> => this.axios.put(`/admin/edit/product/${productId}`, this.axiosRequestConfig).then((r) => r.data);
  productsUserDetail=(): Promise<ProductDetailResponse[]> => this.axios.get(`/product/products`, this.axiosRequestConfig).then((r) => r.data);
  productsUserView=(userId): Promise<ProductDetailResponse[]> => this.axios.get(`/user/product/${userId}`, this.axiosRequestConfig).then((r) => r.data);
  purseDetail=(): Promise<PurseDetailResponse> => this.axios.get(`/user/purse/all`, this.axiosRequestConfig).then((r) => r.data);
  addShoppingProduct = (data: AddProductRequset): Promise<any> => this.axios.post('/store/add', data, this.axiosRequestConfig).then((r) => r.data(window['UGLY_STORE'].dispatch({
        type: '@temp/SUCCESS_REQUIRED',
        payload:r.data.message,
      })));
  shoppingDetail=(): Promise<ShoppingDetailResponse[]> => this.axios.get(`/store/storeDetail`, this.axiosRequestConfig).then((r) => r.data);
  totalPrice=(): Promise<any> => this.axios.get(`/store/totalPrice`, this.axiosRequestConfig).then((r) => r.data);
  deleteProduct=(storeId): Promise<any> => this.axios.delete(`/store/delete/${storeId}`, this.axiosRequestConfig).then((r) => r.data);
  orderAdd = (data: OrderRequset): Promise<any> => this.axios.post('/store/order', data, this.axiosRequestConfig).then((r) => r.data(window['UGLY_STORE'].dispatch({
        type: '@temp/SUCCESS_REQUIRED',
        payload:r.data.message,
      })));
  orderUserView=(): Promise<OrderDetailResponse[]> => this.axios.get(`/order/all`, this.axiosRequestConfig).then((r) => r.data);
  orderSellerView=(): Promise<OrderDetailResponse[]> => this.axios.get(`/user/order`, this.axiosRequestConfig).then((r) => r.data);
  editOrder = (orderId): Promise<any> => this.axios.put(`/order/edit/${orderId}`, this.axiosRequestConfig).then((r) => r.data);
  deleteOrder = (orderId): Promise<any> => this.axios.delete(`/order/delete/${orderId}`, this.axiosRequestConfig).then((r) => r.data);
  showcaseAdd = (data: ShowcaseRequset): Promise<any> => this.axios.post('/user/showcase', data, this.axiosRequestConfig).then((r) => r.data(window['UGLY_STORE'].dispatch({
      type: '@temp/SUCCESS_REQUIRED',
      payload:r.data.message,
    })));
  showcaseDetail=(): Promise<ShowcaseDetailResponse[]> => this.axios.get(`user/showcase/detail`, this.axiosRequestConfig).then((r) => r.data);

}
