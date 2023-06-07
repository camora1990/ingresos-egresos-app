import { createAction, props } from '@ngrx/store';
import { LoginModel } from 'src/app/models/login.model';
import { UserModel } from 'src/app/models/user.model';

export const loginAction = createAction(
  '[Auth Component] login',
  props<{ payload: LoginModel }>()
);
export const setUserAction = createAction(
  '[Auth Component] set user',
  props<{ payload: UserModel }>()
);

export const unSetUserAction = createAction(
    '[Auth Component] unset user',
  );
