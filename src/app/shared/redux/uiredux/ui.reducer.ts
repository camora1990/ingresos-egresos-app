import { Action, createReducer, on } from '@ngrx/store';
import {
  SwalNotification,
  closeNotificationAction,
  isLoadingAction,
  sendNotification,
  stopLoadingAction,
} from './ui.actions';

export interface State {
  isloading: boolean;
  notification: SwalNotification;
}

export const initialState: State = {
  isloading: false,
  notification: new SwalNotification(''),
};

const _uiReducer = createReducer(
  initialState,
  on(isLoadingAction, (state) => ({
    ...state,
    notification: { ...state.notification, show: false },
    isloading: true,
  })),
  on(stopLoadingAction, (state) => ({
    ...state,
    notification: { ...state.notification, show: false },
    isloading: false,
  })),
  on(sendNotification, (state, { payload }) => ({
    isloading: false,
    notification: { ...payload, show: true },
  })),
  on(closeNotificationAction, (state) => ({
    isloading: false,
    notification: { ...state.notification, show: false },
  }))
);

export function uiReducer(state: State, action: Action) {
  return _uiReducer(state, action);
}
