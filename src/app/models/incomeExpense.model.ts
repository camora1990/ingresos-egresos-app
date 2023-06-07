export interface IncomeExpenseModel {
  description: string;
  amount: number;
  type: TypeRegister;
  uid?: string;
}

export enum TypeRegister {
  INGRESO = 'INGRESO',
  EGRESO = 'EGRESO',
}
