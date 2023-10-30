import { Base_Action, Base_Context } from './global.types';

export type Auth_Context_Action =
  | Base_Action
  | { type: 'SET_QUERY'; payload: { redirectTo: string; cookieDomain: string } };

export interface Auth_Context extends Base_Context<Auth_Context_Action> {
  redirectTo: string;
  cookieDomain: string;
}
