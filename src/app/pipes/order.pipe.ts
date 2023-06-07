
import { Pipe, PipeTransform } from '@angular/core';
import { IncomeExpenseModel } from '../models/incomeExpense.model';

@Pipe({
  name: 'order',
})
export class OrdeByPipe implements PipeTransform {
  transform(
    [...value]: IncomeExpenseModel[],
    type: 'asc' | 'desc' = 'asc'
  ): IncomeExpenseModel[] {
    if (type === 'asc') {
      return value.sort((a, b) => a.description.localeCompare(b.description));
    }
    if (type === 'desc') {
      return value.sort((a, b) => b.description.localeCompare(a.description));
    }
    return value; // Agrega un valor de retorno por defecto si no se cumplen las condiciones anteriores
  }
}
