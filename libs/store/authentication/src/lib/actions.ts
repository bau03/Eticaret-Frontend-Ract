import { createAction, createAsyncAction } from 'typesafe-actions';
import { LoginRequest, RegisterRequest, UpdateRequest } from './types';
import { AxiosError } from 'axios';
import {
  AddProductRequset,
  AddShoppingProductRequset,
  AdressAddRequest,
  ForgotPasswordRequest,
  OrderRequset,
  PurseAddRequest,
  ResetPasswordRequest,
  SellerBeginEditRequest,
  SellerBeginRequest,
  ShowcaseRequset
} from "@internship/shared/types";

export const loginAsync = createAsyncAction('@Authentication/LOGIN_REQUEST', '@Authentication/LOGIN_SUCCESS', '@Authentication/LOGIN_FAILURE')<
  LoginRequest,
  any,
  AxiosError
>();

export const registerAsync = createAsyncAction(
  '@Authentication/REGISTER_REQUEST',
  '@Authentication/REGISTER_SUCCESS',
  '@Authentication/REGISTER_FAILURE'
)<RegisterRequest, any, AxiosError>();

export const updateAsync = createAsyncAction('@Authentication/UPDATE_REQUEST', '@Authentication/UPDATE_SUCCESS', '@Authentication/UPDATE_FAILURE')<
  UpdateRequest,
  any,
  AxiosError
>();

export const adressAddAsync = createAsyncAction(
  '@Authentication/ADRESSADD_REQUEST',
  '@Authentication/ADRESSADD_SUCCESS',
  '@Authentication/ADRESSADD_FAILURE'
)<AdressAddRequest, any, AxiosError>();

export const purseAddAsync = createAsyncAction(
  '@Authentication/PURSEADD_REQUEST',
  '@Authentication/PURSEADD_SUCCESS',
  '@Authentication/PURSEADD_FAILURE'
)<PurseAddRequest, any, AxiosError>();

export const sellerBeginAsync = createAsyncAction(
  '@Authentication/SELLERBEGIN_REQUEST',
  '@Authentication/SELLERBEGIN_SUCCESS',
  '@Authentication/SELLERBEGIN_FAILURE'
)<SellerBeginRequest, any, AxiosError>();

export const sellerBeginEditAsync = createAsyncAction(
  '@Authentication/SELLERBEGINEDİT_REQUEST',
  '@Authentication/SELLERBEGINEDİT_SUCCESS',
  '@Authentication/SELLERBEGINEDİT_FAILURE'
)<SellerBeginEditRequest, any, AxiosError>();

export const addProductAsync = createAsyncAction(
  '@Authentication/ADDPRODUCT_REQUEST',
  '@Authentication/ADDPRODUCT_SUCCESS',
  '@Authentication/ADDPRODUCT_FAILURE'
)<AddProductRequset, any, AxiosError>();


export const addShoppingProductAsync = createAsyncAction(
  '@Authentication/ADDSHOPPINGPRODUCT_REQUEST',
  '@Authentication/ADDSHOPPINGPRODUCT_SUCCESS',
  '@Authentication/ADDSHOPPINGPRODUCT_FAILURE'
)<AddShoppingProductRequset, any, AxiosError>();

export const orderAsync = createAsyncAction(
  '@Authentication/ORDER_REQUEST',
  '@Authentication/ORDER_SUCCESS',
  '@Authentication/ORDER_FAILURE'
)<OrderRequset, any, AxiosError>();

export const forgotpasswordAsync = createAsyncAction(
  '@Authentication/FORGOTPASSWORD_REQUEST',
  '@Authentication/FORGOTPASSWORD_SUCCESS',
  '@Authentication/FORGOTPASSWORD_FAILURE'
)<ForgotPasswordRequest, any, AxiosError>();

export const showcaseAsync = createAsyncAction(
  '@Authentication/SHOWCASE_REQUEST',
  '@Authentication/SHOWCASE_SUCCESS',
  '@Authentication/SHOWCASE_FAILURE'
)<ShowcaseRequset, any, AxiosError>();
export const resetpasswordAsync = createAsyncAction(
  '@Authentication/RESETPASSWORD_REQUEST',
  '@Authentication/RESETPASSWORD_SUCCESS',
  '@Authentication/RESETPASSWORD_FAILURE'
)<ResetPasswordRequest, any, AxiosError>();


export const logout = createAction('@Authentication/LOGOUT')();
export const googleLogin = createAction('@Authentication/GOOGLELOGIN')();
