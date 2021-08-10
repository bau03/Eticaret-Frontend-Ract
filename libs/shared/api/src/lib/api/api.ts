import { AuthResource } from './Auth/auth-resource';
import axios from '../config/axios';

export const api = {
  auth: new AuthResource(axios),
};
