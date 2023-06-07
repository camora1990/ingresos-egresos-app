import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { AuthService } from 'src/app/services/auth.service';
import { AppState } from 'src/app/shared/redux/app.reducer';
import {
  isLoadingAction,
  stopLoadingAction,
} from 'src/app/shared/redux/uiredux/ui.actions';
import { FormvalidatorService } from 'src/app/shared/services/formvalidator.service';
import { SwalService } from 'src/app/shared/services/swal.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css'],
})
export class RegisterComponent implements OnInit {
  registerForm: FormGroup = this.$builder.group({
    userName: ['', [Validators.required]],
    email: ['', [Validators.required, this.$validator.validateEmail]],
    password: ['', [Validators.required, this.$validator.validatePassword]],
  });

  constructor(
    private $builder: FormBuilder,
    private $validator: FormvalidatorService,
    private $router: Router,
    private $auth: AuthService,
    private swal: SwalService,
    private store: Store<AppState>
  ) {}

  ngOnInit(): void {}

  isInvalid(fieldName: string) {
    return this.$validator.isInvalidField(fieldName, this.registerForm);
  }

  registerUser() {
    if (this.registerForm.invalid) {
      this.registerForm.markAllAsTouched();
      return;
    }
    this.store.dispatch(isLoadingAction());
    this.$auth.createUser(this.registerForm.value).subscribe({
      next: (_) => {
        this.$router.navigate(['/']);
        this.store.dispatch(stopLoadingAction());
      },
      error: (err) => {
        this.swal.SwalNotification(err.message);
      },
    });
  }
}
