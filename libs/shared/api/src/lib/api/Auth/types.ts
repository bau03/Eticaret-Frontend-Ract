
export interface UserDetailResponse {
  id: string;
  email: string;
  name: string;
  lastName: string;
  username: string;
  age: string;
  phoneNumber: string;
  authorities:any;
}

export interface UserAdressDetailResponse {
  id: string;
  country: string;
  province: string;
  district: string;
  street: string;
  buildingNumber: string;
  adressType: string;
}

export interface SellerDetailResponse{
  id:string;
  content:string;
  timestap:string;
  user:any;
}
export interface ProductDetailResponse{
  id:string;
  productName:string;
  timestap:string;
  showcaseEnabled:any;
  explanation:string;
  productImage:string;
  price:string;
  stock:string;
  categorys:any;
  user:any;
  enabled:any;
}
export interface OrderDetailResponse{
  id:string;
  enabled:boolean;
  timestamp:string;
  totalPrice:string;
  user:any;
  adress:any;
  product:any;
}
export interface ShoppingDetailResponse{
  id:string;
  user:any;
  product:any;
  totalPrice:any;
}
export interface ShowcaseDetailResponse{
  id:string;
  user:any;
  product:any;
}
export interface PurseDetailResponse{
  balance:string;
  timestap:string;
}
