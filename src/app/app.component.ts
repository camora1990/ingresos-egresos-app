import { Component, OnDestroy, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Subscription } from 'rxjs';
import { IncomeExpenseService } from './services/income-expense.service';
import { AppState } from './shared/redux/app.reducer';
import { SwalService } from './shared/services/swal.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent implements OnInit, OnDestroy {
  title = 'ingresos-egresos-app';
  subscriptions: Subscription[] = [];
  constructor(
    private store: Store<AppState>,
    private $swal: SwalService,
    private $incomeExpense: IncomeExpenseService
  ) {}
  ngOnDestroy(): void {
    this.subscriptions.forEach((s) => s.unsubscribe());
  }
  ngOnInit(): void {
    this.subscriptions.push(
      this.store
        .select('ui')
        .subscribe(({ isloading, notification: { show, ...rest } }) => {
          isloading ? this.$swal.loading() : this.$swal.close();
          show && this.$swal.SwalNotification(rest.text, rest.title, rest.icon);
        })
    );
    
  }
}
