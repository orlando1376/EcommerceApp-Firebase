import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { from, Observable } from 'rxjs';
import { Store, select } from '@ngrx/store';

import { regex,regexErrors, markFormGroupTouched } from '@app/shared/utils';
import * as fromRoot from '@app/store';
import * as fromUser from '@app/store/user';

@Component({
  selector: 'app-registration',
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush // evita que la página se refresque constantemente
})
export class RegistrationComponent implements OnInit {

  form!: FormGroup;
  regexErrors = regexErrors;
  loading$!: Observable<boolean | null>;

  constructor(
    private fb: FormBuilder,
    private store: Store<fromRoot.State>
  ) { }

  ngOnInit(): void {
    this.loading$ = this.store.pipe(select(fromUser.getLoading));

    this.form = this.fb.group({
      email: [null, {
        updateOn: 'blur',
        validators: [
          Validators.required,
          Validators.maxLength(128),
          Validators.pattern(regex.email)
        ]
      }],
      password: [null, {
        updateOn: 'blur',
        validators: [
          Validators.required,
          Validators.minLength(8),
          Validators.maxLength(30),
          Validators.pattern(regex.password)
        ]
      }],
      passwordRepeat: [null, {
        updateOn: 'blur',
        validators: [
          Validators.required,
          Validators.minLength(8),
          Validators.maxLength(30),
          Validators.pattern(regex.password)
        ]
      }],
    },
    {validator: this.repeatPasswordValidator}) // validar que los dos password coincidan antes de enviar al servidor
  }

  private repeatPasswordValidator(group: FormGroup): {[key: string]: boolean} | null {
    const password = group.get('password');
    const passwordRepeat = group.get('passwordRepeat');

    return passwordRepeat?.value && password?.value !== passwordRepeat.value ? {repeat: true} : null;
  }

  onSubmit(): void {
    if (this.form.valid) {
      const value = this.form.value;
      const credentials: fromUser.EmailPasswordCredentials = {
        email: value.email,
        password: value.password
      }

      this.store.dispatch(new fromUser.SignUpEmail(credentials));
    } else {
      markFormGroupTouched(this.form)
    }
  }

}
