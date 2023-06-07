import { Action, createReducer, on } from '@ngrx/store';
import { UserModel } from 'src/app/models/user.model';
import { setUserAction, unSetUserAction } from './auth.actions';

export interface State {
  user: UserModel;
}

export const initialState: State = {
  user: null,
};

const _authReducer = createReducer(
  initialState,
  on(setUserAction, (state, { payload }) => ({ ...state, user: payload })),
  on(unSetUserAction, (state) => ({ ...state, user: null }))
);

export function authReducer(state: State, action: Action) {
  return _authReducer(state, action);
}
