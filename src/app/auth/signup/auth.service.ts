// import { HttpClient, HttpErrorResponse } from "@angular/common/http";
// import { Injectable } from "@angular/core";
// import { loginResponse, singupResponse } from "src/app/shared/models/fighter.model";
// import { catchError, tap } from 'rxjs/operators';
// import { BehaviorSubject, Subject, throwError } from 'rxjs';
// import { User } from "src/app/shared/models/user.model";
// import { Router } from "@angular/router";
// import { Store } from "@ngrx/store";
// import * as mainStore from "../../store/app.reducer"
// import * as AuthActions from '../store/auth.actions'

// @Injectable({ providedIn: 'root' })

// export class AuthService {

    // userSubject = new BehaviorSubject<User>(null);

    // private expTimer;

    // constructor(
    //     private http: HttpClient,
    //     private router: Router,
    //     private store: Store<mainStore.AppState>
    // ) { }

    // signup(
    //     email: string,
    //     password: string) {
    //     // return this.http.post<singupResponse>(
    //     //     'https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyAHoqTAcgSwOhAXHIR38SRXvgBziKDYCV8', {
    //     //     email: email,
    //     //     password: password,
    //     //     returnSecureToken: true
    //     // }
    //     // ).pipe(catchError(
    //     //     (err) => {
    //     //         return this.handleError(err);
    //     //     }
    //     // ), tap(
    //     //     // here we will log user in as the acc is created 
    //     //     (res) => {
    //     //         this.saveUser(res);
    //     //     }
    //     // ));
    // }

    // login(email: string, password: string) {
    //     // return this.http.post<loginResponse>(
    //     //     'https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyAHoqTAcgSwOhAXHIR38SRXvgBziKDYCV8', {
    //     //     email: email,
    //     //     password: password,
    //     //     returnSecureToken: true
    //     // }
    //     // ).pipe(catchError(
    //     //     (err) => {
    //     //         return this.handleError(err);
    //     //     }
    //     // ), tap(
    //     //     (res) => {
    //     //         this.saveUser(res);
    //     //     }
    //     // ))
    // }

    // logout() {
    // this.userSubject.next(null);
    // this.store.dispatch(new AuthActions.Logout())
    // this.router.navigate(['/signup']);
    // // destroy user in local storage on logout
    // // localStorage.removeItem('user');
    // // We clear timer if there is one
    // if (this.expTimer) {
    //     clearTimeout(this.expTimer)
    // }
    // this.expTimer = null;
    // }

    // private saveUser(res) {
    //     // tokenExpDate = current date + time firebase gives us to determine when to log user out 
    //     // const tokenExpDate = new Date(new Date().getTime() + +res.expiresIn * 1000);
    //     // const user = new User(
    //     //     res.email,
    //     //     res.localId,
    //     //     res.idToken,
    //     //     tokenExpDate)

    //     // // this.userSubject.next(user);
    //     // this.store.dispatch(new AuthActions.AuthSuccess({
    //     //     email: res.email,
    //     //     id: res.id,
    //     //     token: res.token,
    //     //     tokenExpDate: tokenExpDate

    //     // }))
    //     // // localStorage.setItem('user', JSON.stringify(user));
    //     // let time = +tokenExpDate;
    //     // console.log(time);
    //     // this.autoLogout(time / 100000);
    // }

    // keepLoggedIn() {
    // // getting user stored in local storage parsed if it is there
    // const localUser: {
    //     email: string,
    //     id: string,
    //     token: string,
    //     tokenExpDate: Date
    // } = JSON.parse(localStorage.getItem('user'));
    // if (!localUser) {
    //     return;
    // }

    // // creating new user instance from local storage
    // const loadedUser = new User(
    //     localUser.email,
    //     localUser.id,
    //     localUser.token,
    //     new Date(localUser.tokenExpDate)
    // );

    // // If user has a valid token, we log the user in.
    // if (localUser.token) {
    //     // this.userSubject.next(loadedUser);
    //     this.store.dispatch(new AuthActions.AuthSuccess(
    //         {
    //             email: loadedUser.email,
    //             id: loadedUser.id,
    //             token: loadedUser.getToken,
    //             tokenExpDate: new Date(localUser.tokenExpDate)
    //         }
    //     ))
    //     // calculate time left and log out by that
    //     this.autoLogout(
    //         new Date(localUser.tokenExpDate).getTime() -
    //         new Date().getTime());
    // }

    // }




    // autoLogout(expDate: number) {
    //     // this.expTimer = setTimeout(() => {
    //     //     this.logout();
    //     // }, expDate)
    // }


    // private handleError(err: HttpErrorResponse) {
    //     // console.log(err.error.error.message);
    //     // let errMsg = `Can i make this one appear?`;
    //     // switch (err.error.error.message) {
    //     //     case 'EMAIL_EXISTS':
    //     //         errMsg = 'An account with this Email already exists';
    //     //         break;
    //     //     case 'INVALID_EMAIL':
    //     //         errMsg = 'Invalid or no Email';
    //     //         break;
    //     //     case 'MISSING_PASSWORD':
    //     //         errMsg = 'You forgot the password';
    //     //         break;
    //     //     case 'WEAK_PASSWORD':
    //     //         errMsg = 'No weak ass passwords below 6 characters allowed here !';
    //     //         break;
    //     //     case 'INVALID_PASSWORD':
    //     //         errMsg = 'Wrong Password';
    //     //         break;
    //     //     case 'TOO_MANY_ATTEMPTS_TRY_LATER':
    //     //         errMsg = 'Account temporarily disabled due to too many incorrect passwords, Please, try again later !';
    //     //         break;
    //     //     default:
    //     //         errMsg = 'Task Failed Successfully !';
    //     // }
    //     // return throwError(errMsg);
    // }
// }