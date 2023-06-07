import { Component, OnDestroy, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Subscription } from 'rxjs';
import { AppState } from '../shared/redux/app.reducer';
import { filter, flatMap } from 'rxjs/operators';
import { IncomeExpenseService } from '../services/income-expense.service';
import {
  isLoadingAction,
  stopLoadingAction,
} from '../shared/redux/uiredux/ui.actions';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css'],
})
export class DashboardComponent implements OnInit, OnDestroy {
  subscriptions: Subscription[] = [];

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
      this.store
        .select('auth')
        .pipe(
          filter(({ user }) => user != null),
          flatMap(({ user: { uid } }) =>
            this.$incomeExpense.getIncomeExpenses(uid)
          )
        )
        .subscribe((_) => this.store.dispatch(stopLoadingAction()))
    );
  }
}
