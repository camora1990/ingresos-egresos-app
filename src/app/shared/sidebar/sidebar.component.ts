import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { Subscription } from 'rxjs';
import { tap } from 'rxjs/operators';
import { UserModel } from 'src/app/models/user.model';
import { AuthService } from 'src/app/services/auth.service';
import { AppState } from '../redux/app.reducer';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css'],
})
export class SidebarComponent implements OnInit {

  currentUser: UserModel | null;
  subscriptions: Subscription[] = [];
  constructor(
    private $auth: AuthService,
    private router: Router,
    private store: Store<AppState>

  ) {}

  

  logout() {

    this.subscriptions.push(this.$auth.logout().subscribe((_) => {
      this.router.navigate(['/login']);

    }));
  }

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
