import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { tap } from 'rxjs/operators';
import { AuthService } from 'src/app/services/auth.service';
import { AppState } from 'src/app/shared/redux/app.reducer';
import {
  SwalNotification,
  isLoadingAction,
  sendNotification,
  stopLoadingAction,
} from 'src/app/shared/redux/uiredux/ui.actions';
import { FormvalidatorService } from 'src/app/shared/services/formvalidator.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent implements OnInit {
  loginForm: FormGroup = this.$builder.group({
    email: [
      '',
      [Validators.required, this.$validator.validateEmail],
    ],
    password: ['', Validators.required],
  });
  constructor(
    private $builder: FormBuilder,
    private $validator: FormvalidatorService,
    private $auth: AuthService,
    private router: Router,

    private store: Store<AppState>
  ) {}

  ngOnInit(): void {}

  isInvalid(fieldName: string) {
    return this.$validator.isInvalidField(fieldName, this.loginForm);
  }

  login() {
    if (this.loginForm.invalid) {
      return;
    }
    this.store.dispatch(isLoadingAction());
    this.$auth
      .login(this.loginForm.value)
      .pipe(tap(() => this.router.navigate(['/'])))
      .subscribe({
        next: (_) => this.store.dispatch(stopLoadingAction()),
        error: (err) => {
          this.store.dispatch(
            sendNotification({ payload: new SwalNotification(err.message) })
          );
        },
      });
  }
}
