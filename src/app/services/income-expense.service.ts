import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { Store } from '@ngrx/store';
import { from, of } from 'rxjs';
import { filter, flatMap, tap } from 'rxjs/operators';
import { IncomeExpenseModel } from '../models/incomeExpense.model';
import { UserModel } from '../models/user.model';
import { AppState } from '../shared/redux/app.reducer';
import { setItemsAction } from '../shared/redux/income-expenseRedux/income-expense.actions';

@Injectable({
  providedIn: 'root',
})
export class IncomeExpenseService {
  currentUser: UserModel;
  constructor(
    private firestore: AngularFirestore,
    private store: Store<AppState>
  ) {
    this.store
      .select('auth')
      .pipe(filter(({ user }) => user != null))
      .subscribe(({ user }) => (this.currentUser = user));
  }

  createIncomeExpensive(incomeExpenses: IncomeExpenseModel) {
    return from(
      this.firestore
        .doc(`${this.currentUser.uid}/incomeExpenses`)
        .collection('items')
        .add(incomeExpenses)
    );
  }

  getIncomeExpenses(uid: string) {
    return this.firestore
      .collection(`${uid}/incomeExpenses/items`)
      .snapshotChanges()
      .pipe(
        flatMap((snapshot) =>
          of(
            snapshot.map((doc) => ({
              uid: doc.payload.doc.id,
              ...(doc.payload.doc.data() as IncomeExpenseModel),
            }))
          )
        ),
        tap((resp: IncomeExpenseModel[]) => {
          this.store.dispatch(setItemsAction({ payload: resp }));
        })
      );
  }

  delete(item: IncomeExpenseModel) {
    return from(
      this.firestore
        .doc(`${this.currentUser.uid}/incomeExpenses/items/${item.uid}`)
        .delete()
    );
  }
}
