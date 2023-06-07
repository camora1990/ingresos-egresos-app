import { ActionReducerMap } from '@ngrx/store';
import * as ui from './uiredux/ui.reducer';
import * as auth from './authRedux/auth.reducer';
import * as incomeExpense from './income-expenseRedux/income-expense.reducer';

// aca van todos los reducer (states)
export interface AppState {
  ui: ui.State;
  auth: auth.State;

  incomeExpense: incomeExpense.State;
}

//Se exporta el reducer
export const appReducers: ActionReducerMap<AppState> = {
  ui: ui.uiReducer,
  auth: auth.authReducer,
  incomeExpense: incomeExpense.incomeExpenseReducer,
};
