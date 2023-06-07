import { createAction, props } from '@ngrx/store';

export class SwalNotification {
  text: string;
  title: string = 'Ooops';
  icon: 'error' | 'info' | 'success' = 'error';
  show: boolean;

  constructor(
    text: string,
    title: string = 'Oopps',
    icon: 'error' | 'info' | 'success' = 'error'
  ) {
    (this.text = text), (this.icon = icon);
    this.title = title;
    this.show = false;
  }
}

export const isLoadingAction = createAction('[UI Component] is Loading Action');
export const stopLoadingAction = createAction(
  '[UI Component] stop loading action'
);

export const sendNotification = createAction(
  '[UI Component] send notification',
  props<{ payload: SwalNotification }>()
);

export const closeNotificationAction = createAction(
  '[UI Component] close notification'
);
