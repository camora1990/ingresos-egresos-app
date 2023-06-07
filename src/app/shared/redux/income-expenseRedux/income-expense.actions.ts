import { createAction, props } from '@ngrx/store';
import { IncomeExpenseModel } from 'src/app/models/incomeExpense.model';

export const setItemsAction = createAction(
  '[Income-expenses component] set Items',
  props<{ payload: IncomeExpenseModel[] }>()
);
export const unSetItemsActions = createAction(
  '[Income-expenses component] clear items'
);
