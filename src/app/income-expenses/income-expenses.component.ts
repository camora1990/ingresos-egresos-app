import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Store } from '@ngrx/store';
import {
  IncomeExpenseModel,
  TypeRegister,
} from '../models/incomeExpense.model';
import { IncomeExpenseService } from '../services/income-expense.service';
import { AppState } from '../shared/redux/app.reducer';
import {
  SwalNotification,
  isLoadingAction,
  sendNotification,
} from '../shared/redux/uiredux/ui.actions';
import { FormvalidatorService } from '../shared/services/formvalidator.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-income-expenses',
  templateUrl: './income-expenses.component.html',
  styleUrls: ['./income-expenses.component.css'],
})
export class IncomeExpensesComponent implements OnInit, OnDestroy {
  subscriptions: Subscription[] = [];
  incomeExpenseForm: FormGroup = this.$builder.group({
    description: ['', [Validators.required]],
    amount: ['', [Validators.min(1), Validators.required]],
    type: [false, [Validators.required]],
  });
  constructor(
    private $builder: FormBuilder,
    private validator: FormvalidatorService,
    private $incomeExpenses: IncomeExpenseService,
    private store: Store<AppState>
  ) {}
  ngOnDestroy(): void {
    this.subscriptions.forEach((s) => s.unsubscribe());
  }

  ngOnInit(): void {}

  submit() {
    if (this.incomeExpenseForm.invalid) {
      this.incomeExpenseForm.markAllAsTouched();
      return;
    }
    this.store.dispatch(isLoadingAction());
    const object: IncomeExpenseModel = {
      ...this.incomeExpenseForm.value,
      type:
        this.incomeExpenseForm.value.type == false
          ? TypeRegister.INGRESO
          : TypeRegister.EGRESO,
    };
    this.subscriptions.push(
      this.$incomeExpenses.createIncomeExpensive(object).subscribe({
        next: (resp) => {
          this.store.dispatch(
            sendNotification({
              payload: new SwalNotification(
                'Ingreso - egreso creado exitosamente',
                'Creación',
                'success'
              ),
            })
          );
          this.incomeExpenseForm.reset();
        },
        error: (err) =>
          this.store.dispatch(
            sendNotification({ payload: new SwalNotification(err.message) })
          ),
      })
    );
  }

  invalidField(field: string) {
    return (
      this.validator.isInvalidField(field, this.incomeExpenseForm) &&
      this.incomeExpenseForm.controls[field].touched
    );
  }
}
