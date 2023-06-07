import { Injectable } from '@angular/core';
import { AbstractControl, FormGroup, ValidationErrors } from '@angular/forms';

@Injectable({
  providedIn: 'root'
})
export class FormvalidatorService {

  validateEmail(control: AbstractControl): ValidationErrors | null {
    const regex = new RegExp('^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$');
    return regex.test(control.value)
      ? null
      : { customError: 'Email es invalido' };
  }

  validatePassword(control: AbstractControl): ValidationErrors | null {
    const regex = new RegExp(
      '^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}$'
    );
    return regex.test(control.value)
      ? null
      : {
          customError:
            'Mínimo 8 caracteres, Mayúscula, minúscula y carácter especial',
        };
  }

  isInvalidField(controlName: string, form: FormGroup): boolean {
    return (
      form.controls[controlName].invalid
    );
  }

  public getErrorMessage(field: string, form: AbstractControl): string {
    const errors = form.get(field);
    if (errors?.getError('required')) {
      return `Requierido`;
    }
    if (errors?.getError('customError')) {
      return errors.getError('customError');
    }

    if (errors?.getError('min')) {
      return `El minimo requerido es ${errors?.getError('min')?.min}`;
    }

    if (errors?.getError('minlength')) {
      return `El minimo requerido es ${errors.getError('minlength')?.requiredLength}`;
    }
    return '';
  }
}
