import { Component, OnDestroy, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { UserModel } from 'src/app/models/user.model';
import { AuthService } from 'src/app/services/auth.service';
import { AppState } from '../redux/app.reducer';
import { tap } from 'rxjs/operators';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css'],
})
export class NavbarComponent implements OnInit, OnDestroy {
  currentUser: UserModel | null;
  subscriptions: Subscription[] = [];
  constructor(private store: Store<AppState>) {}
  ngOnDestroy(): void {
    this.subscriptions.forEach((s) => s.unsubscribe());
  }

  ngOnInit(): void {
    this.subscriptions.push(
      this.store
        .select('auth')
        .pipe(tap(({ user }) => (this.currentUser = user)))
        .subscribe()
    );
  }
}
