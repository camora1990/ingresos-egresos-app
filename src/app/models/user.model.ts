import { IncomeExpenseModel } from './incomeExpense.model';

export interface UserModel {
  uid: string;
  displayName: string;
  email: string;
  photoURL?: string;

  incomeExpenses?: IncomeExpenseModel[];
}
