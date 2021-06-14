import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Store } from '@ngrx/store';
import { Subscription } from 'rxjs';
import * as mainStore from '../../store/app.reducer'
import { LoginStart, SignupStart } from '../store/auth.actions';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.scss']
})
export class SignupComponent implements OnInit, OnDestroy {
  signupMode: boolean = false;
  loading: boolean = false;
  error: string = null;

  signupForm: FormGroup;
  loginForm: FormGroup;

  authSub: Subscription;

  modeSwitcher() {
    this.error = null;
    this.signupMode = !this.signupMode;
  }

  constructor(
    private store: Store<mainStore.AppState>
  ) { }

  ngOnInit(): void {
    this.signupForm = new FormGroup({
      'email': new FormControl('', Validators.required),
      'Password': new FormControl('', Validators.required),
    })

    this.loginForm = new FormGroup({
      'email': new FormControl('', Validators.required),
      'password': new FormControl('', Validators.required),
    })

    this.authSub = this.store.select('auth').subscribe(
      (authSlice) => {
        this.loading = authSlice.loading;
        this.error = authSlice.authError;
      }
    )
  }

  submitSignupForm() {
    this.loading = true;

    this.store.dispatch(
      new SignupStart({
        email: this.signupForm.value.email,
        password: this.signupForm.value.repeatPassword
      })
    )

    this.signupForm.reset();
    console.log(this.signupForm)
  }

  submitLoginForm() {

    this.loading = true;
    console.log(this.loginForm)

    this.store.dispatch(new LoginStart({
      email: this.loginForm.value.email,
      password: this.loginForm.value.password
    }));
  }

  ngOnDestroy() {
    this.authSub.unsubscribe();
  }
}
