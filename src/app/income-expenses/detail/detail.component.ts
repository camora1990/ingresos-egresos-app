import { Component, OnDestroy, OnInit } from '@angular/core';
import { AppState } from '../../shared/redux/app.reducer';
import { Store } from '@ngrx/store';
import { Subscription } from 'rxjs';
import { IncomeExpenseModel } from 'src/app/models/incomeExpense.model';
import { IncomeExpenseService } from 'src/app/services/income-expense.service';
import {
  SwalNotification,
  isLoadingAction,
  sendNotification,
  stopLoadingAction,
} from 'src/app/shared/redux/uiredux/ui.actions';

@Component({
  selector: 'app-detail',
  templateUrl: './detail.component.html',
  styleUrls: ['./detail.component.css'],
})
export class DetailComponent implements OnInit, OnDestroy {
  private subscriptions: Subscription[] = [];

  incomeExpenses: IncomeExpenseModel[] = [];
  constructor(
    private store: Store<AppState>,
    private $incomeExpense: IncomeExpenseService
  ) {}
  ngOnDestroy(): void {
    this.subscriptions.forEach((s) => s.unsubscribe());
  }

  ngOnInit(): void {
    this.store.dispatch(isLoadingAction());
    this.subscriptions.push(
      this.store.select('incomeExpense').subscribe(({ items }) => {
        this.incomeExpenses = items;
        setTimeout(() => {
          this.store.dispatch(stopLoadingAction());
        }, 1000);
      })
    );
  }

  delete(item: IncomeExpenseModel) {
    this.store.dispatch(isLoadingAction());
    this.subscriptions.push(
      this.$incomeExpense.delete(item).subscribe({
        next: (_) =>
          this.store.dispatch(
            sendNotification({
              payload: new SwalNotification(
                `el ${item.type.toLocaleLowerCase()} fue eliminado`,
                'Eliminación',
                'success'
              ),
            })
          ),
        error: (err) =>
          this.store.dispatch(
            sendNotification({ payload: new SwalNotification(err.message) })
          ),
      })
    );
  }
}
