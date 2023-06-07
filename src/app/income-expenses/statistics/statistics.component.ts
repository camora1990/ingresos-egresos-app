import { Component, OnDestroy, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Label, MultiDataSet } from 'ng2-charts';
import { Subscription } from 'rxjs';
import {
  IncomeExpenseModel,
  TypeRegister,
} from 'src/app/models/incomeExpense.model';
import { AppState } from 'src/app/shared/redux/app.reducer';
import {
  isLoadingAction,
  stopLoadingAction,
} from 'src/app/shared/redux/uiredux/ui.actions';

interface Statistics {
  incomen: number;
  expense: number;
  total: number;
}

@Component({
  selector: 'app-statistics',
  templateUrl: './statistics.component.html',
  styleUrls: ['./statistics.component.css'],
})
export class StatisticsComponent implements OnInit, OnDestroy {
  private subscriptions: Subscription[] = [];
  statistics: Statistics = {
    incomen: 0,
    expense: 0,
    total: 0,
  };
  public doughnutChartLabels: Label[] = ['Egreso', 'Ingreso'];
  public doughnutChartData: MultiDataSet = [[]];
  constructor(private store: Store<AppState>) {}
  ngOnDestroy(): void {
    this.subscriptions.forEach((s) => s.unsubscribe());
  }

  ngOnInit(): void {
    this.store.dispatch(isLoadingAction());
    this.subscriptions.push(
      this.store
        .select('incomeExpense')
        .subscribe(({ items }) => this.generateStatistics(items))
    );
  }
  generateStatistics(items: IncomeExpenseModel[]): void {
    this.statistics = {
      expense: 0,
      incomen: 0,
      total: 0,
    };
    this.statistics = items.reduce(
      (back: Statistics, current: IncomeExpenseModel) => {
        if (current.type == TypeRegister.INGRESO) {
          back.incomen += current.amount;
        } else {
          back.expense += current.amount;
        }
        back.total += current.amount;
        return back;
      },
      this.statistics
    );
    this.doughnutChartData[0] = [
      this.statistics.expense,
      this.statistics.incomen,
    ];
    setTimeout(() => {
      this.store.dispatch(stopLoadingAction());
    }, 1000);
  }
}
