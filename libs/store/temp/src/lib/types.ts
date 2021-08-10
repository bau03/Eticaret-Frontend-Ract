import { ActionType } from 'typesafe-actions';
import * as actions from './actions';

export interface TempStore {
  captchaRequired?: boolean;
  errorRequired: string;
  successRequired: string;
}

export type tempActions = ActionType<typeof actions>;
