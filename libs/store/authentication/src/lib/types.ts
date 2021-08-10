import { ActionType } from 'typesafe-actions';
import * as actions from './actions';

export interface AuthenticationStore {
  authenticated: boolean;
}

export type AuthenticationActions = ActionType<typeof actions>;

export interface LoginRequest {
  username: string;
  password: string;
  captcha?: string;
}

export interface RegisterRequest {
  username: string;
  email: string;
  password: string;
}

export interface UpdateRequest {
  username: string;
  email?: string;
  name?: string;
  lastname?: string;
  phone?: string;
  age?: string;
  password?: string;
}
