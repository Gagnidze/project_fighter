import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import * as mainStore from '../../store/app.reducer'
import { LoginStart, SignupStart } from '../store/auth.actions';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.scss']
})
export class SignupComponent implements OnInit {
  signupMode: boolean = false;
  loading: boolean = false;
  error: string = null;

  signupForm: FormGroup;
  loginForm: FormGroup;

  modeSwitcher() {
    this.error = null;
    this.signupMode = !this.signupMode;
  }

  constructor(
    private router: Router,
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

    this.store.select('auth').subscribe(
      (authSlice) => {
        this.loading = authSlice.loading;
        this.error = authSlice.authError;
      }
    )
  }

  submitSignupForm() {
    // this.error = null;
    // 

    this.loading = true;
    // 

    // this.auth.signup(
    //   this.signupForm.value.email,
    //   this.signupForm.value.repeatPassword
    // ).subscribe(
    //   (response) => {
    //     console.log(response)
    //     this.loading = false;
    //   }, (err) => {
    //     // here we get the full error response object, which contains an error code
    //     console.log(err);
    //     this.error = err;
    //     this.loading = false;
    //   }
    // )

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
    // this.error = null; 
    // 

    this.loading = true;
    console.log(this.loginForm)

    // this.auth.login(
    //   this.loginForm.value.email,
    //   this.loginForm.value.password
    // )
    this.store.dispatch(new LoginStart({
      email: this.loginForm.value.email,
      password: this.loginForm.value.password
    }));
    //   .subscribe(
    //   (res) => {
    //     console.log(res);
    //     this.loading = false;
    //     // Redirecting user after logging in
    //     this.router.navigate(['/all-fighters'])
    //   }, (err) => {
    //     console.log(err);
    //     this.error = err;
    //     this.loading = false;
    //   }
    // )
  }
}
