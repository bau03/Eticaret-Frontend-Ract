import React from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';

import {
  About,
  Contact,
  Login,
  MailErrorPage,
  MailSuccesPage,
  MainPage,
  OAuth2RedirectHandler,
  Register,
  ProfilPage,
  SellerBegin,
  SellerDetailPage,
  AddProductPage,
  ProductDetailPage,
  ProductView,
  BasketPage,
  OrderCheckPage,
  SellerOrderDetailPage,
  ShowcaseDetailPage,
  ForgotPasswordPage,
} from './pages';
import {ResetPassword} from "./pages/ForgorPassword/ResetPassword";

export const Routes = ({ children, ...props }) => {
  return (
    <Router {...props}>
      {children}
      <Route exact path="/" component={MainPage} />
      <Route path="/about" component={About} />
      <Route path="/contact" component={Contact} />
      <Route path="/profile" component={ProfilPage} />
      <Route path="/auth" component={OAuth2RedirectHandler} />
      <Route path="/mailsuccess" component={MailSuccesPage} />
      <Route path="/mailerror" component={MailErrorPage} />
      <Route path="/login" component={Login} />
      <Route path="/register" component={Register} />
      <Route path="/seller" component={SellerBegin} />
      <Route path="/sellerDetail" component={SellerDetailPage} />
      <Route path="/addProduct" component={AddProductPage} />
      <Route path="/productDetail" component={ProductDetailPage} />
      <Route path="/sepet" component={BasketPage} />
      <Route path="/vitrin" component={ShowcaseDetailPage} />
      <Route path="/siparisler" component={SellerOrderDetailPage} />
      <Route path="/siparis" component={OrderCheckPage} />
      <Route path="/forgotpassword" component={ForgotPasswordPage} />
      <Route path="/resetpassword" component={ResetPassword} />
      <Route path={'/productView/:productId'} component={ProductView}/>
    </Router>
  );
};
