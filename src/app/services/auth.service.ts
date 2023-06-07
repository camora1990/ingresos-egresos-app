import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { AngularFirestore } from '@angular/fire/firestore';
import { Store } from '@ngrx/store';
import { Observable, Subscription, from } from 'rxjs';
import { map, tap } from 'rxjs/operators';
import { CreateUserModel } from '../models/createUser.model';
import { LoginModel } from '../models/login.model';
import { UserModel } from '../models/user.model';
import { AppState } from '../shared/redux/app.reducer';
import {
  setUserAction,
  unSetUserAction,
} from '../shared/redux/authRedux/auth.actions';
import { unSetItemsActions } from '../shared/redux/income-expenseRedux/income-expense.actions';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  userSubscrition: Subscription;
  constructor(
    private $auth: AngularFireAuth,
    private firestore: AngularFirestore,
    private store: Store<AppState>
  ) {
    this.$auth.authState.subscribe((userAuth) => {
      if (userAuth) {
        this.userSubscrition = this.firestore
          .doc(`${userAuth.uid}/usuario`)
          .valueChanges()
          .subscribe((user: UserModel) =>
            this.store.dispatch(setUserAction({ payload: user }))
          );
      } else {
        this.userSubscrition && this.userSubscrition.unsubscribe();
        this.store.dispatch(unSetUserAction());
      }
    });
  }

  initAuthList() {
    return this.$auth.authState;
  }

  createUser(createUser: CreateUserModel) {
    return from(
      this.$auth.createUserWithEmailAndPassword(
        createUser.email,
        createUser.password
      )
    ).pipe(
      map(({ user: { uid, displayName, email } }) => {
        return from(
          this.firestore.doc(`${uid}/usuario`).set({
            uid,
            displayName: createUser.userName.trim().toUpperCase(),
            email,
            incomeExpenses: [],
          })
        );
      })
    );
  }

  login(credential: LoginModel) {
    return from(
      this.$auth.signInWithEmailAndPassword(
        credential.email,
        credential.password
      )
    );
  }

  logout() {
    return from(this.$auth.signOut()).pipe(
      tap((_) => this.store.dispatch(unSetUserAction())),
      tap(() => this.store.dispatch(unSetItemsActions()))
    );
  }

  isAuth(): Observable<boolean> {
    return this.initAuthList().pipe(map((resp) => resp != null));
  }
}
