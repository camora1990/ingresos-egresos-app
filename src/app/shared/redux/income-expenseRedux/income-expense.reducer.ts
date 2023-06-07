import { Action, createReducer, on } from '@ngrx/store';
import { setItemsAction, unSetItemsActions } from './income-expense.actions';
import { IncomeExpenseModel } from 'src/app/models/incomeExpense.model';

export interface State {
  items: IncomeExpenseModel[];
}

export const initialState: State = {
  items: [],
};

const _incomeExpenseReducer = createReducer(
  initialState,
  on(setItemsAction, (state, { payload }) => ({
    ...state,
    items: [...payload],
  })),
  on(unSetItemsActions, (state) => ({ ...state, items: [] }))
);

export function incomeExpenseReducer(state: State, action: Action) {
  return _incomeExpenseReducer(state, action);
}
