import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Actions, createEffect, Effect, ofType } from '@ngrx/effects';
import { of } from 'rxjs';
import { catchError, map, switchMap, tap } from 'rxjs/operators';
import { loginResponse, singupResponse } from 'src/app/shared/models/fighter.model';
import { User } from 'src/app/shared/models/user.model';
import * as AuthActions from './auth.actions';

const AuthUser = (
    expiresIn: number,
    email: string,
    localId: string,
    token: string
) => {
    const expirationDate = new Date(new Date().getTime() + expiresIn * 1000);

    const userToStore: User = new User(email, localId, token, expirationDate);
    localStorage.setItem('user', JSON.stringify(userToStore));

    // new AuthActions.AutoLogout({ time: expirationDate });

    // setAutoLogout(expirationDate);

    return new AuthActions.AuthSuccess({
        email: email,
        id: localId,
        token: token,
        tokenExpDate: new Date(expirationDate),
    });
};

// const setAutoLogout = (date: Date) => {
//     console.log('in the function')
//     console.log(date)
//     return new AuthActions.AutoLogout(date);
// }

// export class 

const errorHandling = (err) => {
    let errMsg = `Can i make this one appear?`;

    switch (err.error.error.message) {
        case 'EMAIL_EXISTS':
            errMsg = 'An account with this Email already exists';
            break;
        case 'INVALID_EMAIL':
            errMsg = 'Invalid or no Email';
            break;
        case 'MISSING_PASSWORD':
            errMsg = 'You forgot the password';
            break;
        case 'WEAK_PASSWORD':
            errMsg = 'No weak ass passwords below 6 characters allowed here !';
            break;
        case 'INVALID_PASSWORD':
            errMsg = 'Wrong Password';
            break;
        case 'TOO_MANY_ATTEMPTS_TRY_LATER':
            errMsg = 'Account temporarily disabled due to too many incorrect passwords, Please, try again later !';
            break;
        default:
            errMsg = 'Task Failed Successfully !';
    }
    return of(new AuthActions.AuthFail(errMsg));
};

@Injectable()

export class AuthEffects {
    @Effect({ dispatch: false })
    authLogout = this.actions$.pipe(
        ofType(AuthActions.LOGOUT), tap(
            () => {
                localStorage.removeItem('user');
            }
        )
    )

    // @Effect()
    // authAutoLogout = this.actions$.pipe(
    //     ofType(AuthActions.AUTO_LOGOUT),
    //     tap()
    // )

    // @Effect()
    // authAutoLogout = this.actions$.pipe(
    //     ofType(AuthActions.AUTO_LOGOUT),
    //     switchMap(
    //         (res) => {

    //         }
    //     )
    // )


    @Effect()
    autoLogin = this.actions$.pipe(
        ofType(AuthActions.AUTO_LOGIN),
        map(
            () => {
                // getting user stored in local storage parsed if it is there
                const localUser: {
                    email: string,
                    id: string,
                    token: string,
                    tokenExpDate: Date
                } = JSON.parse(localStorage.getItem('user'));
                if (!localUser) {
                    return { type: 'NOTHING' };
                }

                // creating new user instance from local storage
                const loadedUser: User = new User(
                    localUser.email,
                    localUser.id,
                    localUser.token,
                    new Date(localUser.tokenExpDate)
                );

                // If user has a valid token, we log the user in.
                if (localUser.token) {
                    return (new AuthActions.AuthSuccess(
                        {
                            email: loadedUser.email,
                            id: loadedUser.id,
                            token: loadedUser.getToken,
                            tokenExpDate: new Date(localUser.tokenExpDate)
                        }
                    ))
                    // calculate time left and log out by that

                    // this.autoLogout(
                    //     new Date(localUser.tokenExpDate).getTime() -
                    //     new Date().getTime());
                }
                return { type: 'NOTHING' };
            }
        )
    )


    @Effect()
    authLogin$ = this.actions$.pipe(
        ofType(AuthActions.LOGIN_START),
        switchMap((authData: AuthActions.LoginStart) => {
            return this.http.post<loginResponse>(
                'https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyAHoqTAcgSwOhAXHIR38SRXvgBziKDYCV8', {
                email: authData.payload.email,
                password: authData.payload.password,
                returnSecureToken: true
            }
            ).pipe(
                tap(
                    (resData) => {
                        // const time = new Date(resData.expiresIn);
                        // console.log(time);
                        // return setAutoLogout(time);
                        // return new AuthActions.AutoLogout({ time: time });
                    }
                ),
                map(resData => {
                    return AuthUser(
                        +resData.expiresIn,
                        resData.email,
                        resData.localId,
                        resData.idToken);
                }),
                catchError(err => {
                    return errorHandling(err);
                }))
        }),
    );

    @Effect({ dispatch: false })
    authSuccess = this.actions$.pipe(ofType(AuthActions.AUTH_SUCCESS), tap(() => {
        this.router.navigate(['/all-fighters']);
        // experiment
        // experiment
    }));

    @Effect()
    authSignup = this.actions$.pipe(
        ofType(AuthActions.SINGUP_START),
        switchMap((signupAction: AuthActions.SignupStart) => {
            return this.http.post<singupResponse>(
                'https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyAHoqTAcgSwOhAXHIR38SRXvgBziKDYCV8', {
                email: signupAction.payload.email,
                password: signupAction.payload.password,
                returnSecureToken: true
            }
            ).pipe(map((resData) => {
                return AuthUser(
                    +resData.expiresIn,
                    resData.email,
                    resData.localId,
                    resData.idToken
                )
            }),
                catchError((err) => {
                    return errorHandling(err);
                })
            )
        })
    )

    constructor(
        private actions$: Actions,
        private http: HttpClient,
        private router: Router,
        private activeRoute: ActivatedRoute
    ) {

    }
}