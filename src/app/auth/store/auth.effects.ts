import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Actions, createEffect, Effect, ofType } from '@ngrx/effects';
import { of } from 'rxjs';
import { catchError, map, switchMap, tap } from 'rxjs/operators';
import { User } from 'src/app/shared/models/user.model';
import { requestService } from 'src/app/auth/requests.service';
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

    return AuthActions.AuthSuccess({
        payload: {
            email: email,
            id: localId,
            token: token,
            tokenExpDate: new Date(expirationDate)
        },
    });
};

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
    return of(AuthActions.AuthFail({ payload: errMsg }));
};

@Injectable()

export class AuthEffects {

    authLogout = createEffect(
        () =>
            this.actions$.pipe(
                ofType(AuthActions.LOGOUT), tap(
                    () => {
                        localStorage.removeItem('user');
                    }
                )
            ), { dispatch: false }
    )

    autoLogin = createEffect(
        () => this.actions$.pipe(
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
                        return (AuthActions.AuthSuccess(
                            {
                                payload: {
                                    email: loadedUser.email,
                                    id: loadedUser.id,
                                    token: loadedUser.getToken,
                                    tokenExpDate: new Date(localUser.tokenExpDate)
                                }
                            }
                        ))
                    }
                    return { type: 'NOTHING' };
                }
            )
        )

    )

    authLogin$ = createEffect(
        () =>
            this.actions$.pipe(
                ofType(AuthActions.LoginStart),
                switchMap((authData) => {
                    return this.reqService.loginReq(
                        authData.payload.email,
                        authData.payload.password,
                        true)
                        .pipe(
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
            )
    )

    authSuccess = createEffect(
        () =>
            this.actions$.pipe(ofType(AuthActions.AUTH_SUCCESS), tap(() => {
                this.router.navigate(['/all-fighters']);
            })), { dispatch: false }
    )

    authSignup = createEffect(
        () =>
            this.actions$.pipe(
                ofType(AuthActions.SignupStart),
                switchMap((signupAction) => {
                    return this.reqService.signupReq(
                        signupAction.payload.email,
                        signupAction.payload.password,
                        true)
                        .pipe(map((resData) => {
                            return AuthUser(
                                +resData.expiresIn,
                                resData.email,
                                resData.localId,
                                resData.idToken
                            )
                        }),
                            catchError((err) => {
                                console.error(err);
                                return errorHandling(err);
                            })
                        )
                })
            )
    )

    constructor(
        private actions$: Actions,
        private router: Router,
        private reqService: requestService
    ) {

    }
}