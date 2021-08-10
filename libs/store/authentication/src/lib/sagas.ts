import {
  addProductAsync,
  addShoppingProductAsync,
  adressAddAsync, forgotpasswordAsync,
  loginAsync,
  logout, orderAsync, purseAddAsync,
  registerAsync, resetpasswordAsync,
  sellerBeginAsync,
  sellerBeginEditAsync, showcaseAsync,
  updateAsync
} from "./actions";
import { all, call, fork, put, takeLatest } from "redux-saga/effects";
import { api } from "@internship/shared/api";
import { removeAccessToken, removeRefreshToken } from '@internship/shared/utils';

function* doLogin({ payload }) {
  try {
    const data = yield call(api.auth.login, payload);
    if (data?.accessToken) localStorage.setItem('cloud_users', JSON.stringify(data));
    yield put(loginAsync.success({}));
  } catch (e) {
    console.error(e);
    yield put(loginAsync.failure(e));
  }
}
function* doAdressAdd({ payload }) {
  try {
    yield call(api.auth.adressAdd, payload);
    yield put(adressAddAsync.success({}));
  } catch (e) {
    console.error(e);
    yield put(adressAddAsync.failure(e));
  }
}
function* doPurseAdd({ payload }) {
  try {
    yield call(api.auth.purseAdd, payload);
    yield put(purseAddAsync.success({}));
  } catch (e) {
    console.error(e);
    yield put(purseAddAsync.failure(e));
  }
}
function doLogout() {
  if (localStorage.getItem('access_token')) {
    localStorage.removeItem('cloud_users');
    removeAccessToken();
    removeRefreshToken();
  }
}
function* doRegister({ payload }) {
  try {
    yield call(api.auth.register, payload);
    yield put(registerAsync.success({}));
  } catch (e) {
    console.error(e);
    yield put(registerAsync.failure(e));
  }
}
function* doUpdate({ payload }) {
  try {
    let requestData = {};
    Object.entries(payload).forEach(([key, value]) => (value !== '' ? (requestData = { ...requestData, [key]: value }) : null));

    yield call(api.auth.update, requestData);
    yield put(updateAsync.success({}));
  } catch (e) {
    console.error(e);
    yield put(updateAsync.failure(e));
  }
}
function* doSellerBegin({ payload }) {
  try {
    yield call(api.auth.sellerBegin, payload);
    yield put(sellerBeginAsync.success({}));
  } catch (e) {
    console.error(e);
    yield put(sellerBeginAsync.failure(e));
  }
}
function* doSellerBeginEdit({ payload }) {
  try {
    yield call(api.auth.sellerBeginEdit, payload);
    yield put(sellerBeginEditAsync.success({}));
  } catch (e) {
    console.error(e);
    yield put(sellerBeginEditAsync.failure(e));
  }
}
function* doAddProduct({ payload }) {
  try {
    yield call(api.auth.addProduct, payload);
    yield put(addProductAsync.success({}));
  } catch (e) {
    console.error(e);
    yield put(addProductAsync.failure(e));
  }
}
function* doAddShoppingProduct({ payload }) {
  try {
    yield call(api.auth.addShoppingProduct, payload);
    yield put(addShoppingProductAsync.success({}));
  } catch (e) {
    console.error(e);
    yield put(addShoppingProductAsync.failure(e));
  }
}
function* doOrder({ payload }) {
  try {
    yield call(api.auth.orderAdd, payload);
    yield put(orderAsync.success({}));
  } catch (e) {
    console.error(e);
    yield put(orderAsync.failure(e));
  }
}
function* doShowcase({ payload }) {
  try {
    yield call(api.auth.showcaseAdd, payload);
    yield put(showcaseAsync.success({}));
  } catch (e) {
    console.error(e);
    yield put(showcaseAsync.failure(e));
  }
}
function* doForgotPassword({ payload }) {
  try {
    yield call(api.auth.forgotPasswordMail, payload);
    yield put(forgotpasswordAsync.success({}));
  } catch (e) {
    console.error(e);
    yield put(forgotpasswordAsync.failure(e));
  }
}
function* doResetPassword({ payload }) {
  try {
    yield call(api.auth.resetPassword, payload);
    yield put(resetpasswordAsync.success({}));
  } catch (e) {
    console.error(e);
    yield put(resetpasswordAsync.failure(e));
  }
}

function* watchLogin() {
  yield takeLatest(loginAsync.request, doLogin);
}
function* watchLogout() {
  yield takeLatest(logout, doLogout);
}
function* watchRegister() {
  yield takeLatest(registerAsync.request, doRegister);
}
function* watchUpdate() {
  yield takeLatest(updateAsync.request, doUpdate);
}
function* watchAdressAdd() {
  yield takeLatest(adressAddAsync.request, doAdressAdd);
}
function* watchPurseAdd() {
  yield takeLatest(purseAddAsync.request, doPurseAdd);
}
function* watchSellerBegin() {
  yield takeLatest(sellerBeginAsync.request, doSellerBegin);
}
function* watchSellerBeginEdit() {
  yield takeLatest(sellerBeginEditAsync.request, doSellerBeginEdit);
}
function* watchAddProduct() {
  yield takeLatest(addProductAsync.request, doAddProduct);
}
function* watchAddShoppingProduct() {
  yield takeLatest(addShoppingProductAsync.request, doAddShoppingProduct);
}
function* watchOrder() {
  yield takeLatest(orderAsync.request, doOrder);
}
function* watchShowcase() {
  yield takeLatest(showcaseAsync.request, doShowcase);
}
function* watchForgotPassword() {
  yield takeLatest(forgotpasswordAsync.request, doForgotPassword);
}
function* watchResetPassword() {
  yield takeLatest(resetpasswordAsync.request, doResetPassword);
}


export function* authenticationSaga() {
  yield all([
    fork(watchLogin),
    fork(watchRegister),
    fork(watchLogout),
    fork(watchUpdate),
    fork(watchAdressAdd),
    fork(watchSellerBegin),
    fork(watchSellerBeginEdit),
    fork(watchAddProduct),
    fork(watchPurseAdd),
    fork(watchAddShoppingProduct),
    fork(watchOrder),
    fork(watchShowcase),
    fork(watchForgotPassword),
    fork(watchResetPassword)
  ]);
}
