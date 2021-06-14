import { Action } from "@ngrx/store"

export const LOGIN_START = '[auth] Login Start';
export const AUTH_FAIL = '[auth] Login Fail';
export const AUTH_SUCCESS = '[Auth] Log In';
export const LOGOUT = '[Auth] Log Out';
export const SINGUP_START = '[Auth] Signup Start';
export const SIGNUP = '[Auth] Signup';
export const AUTO_LOGIN = '[Auth] Auto Login';
export const AUTO_LOGOUT = '[Auth] Auto Logout';

export class Logout implements Action {
    readonly type = LOGOUT;
}

export class LoginStart implements Action {
    readonly type = LOGIN_START

    constructor(public payload: { email: string, password: string }) { }
}

export class AuthSuccess implements Action {
    readonly type = AUTH_SUCCESS;

    constructor(public payload: {
        email: string,
        id: string,
        token: string,
        tokenExpDate: Date
    }) { }
}

export class AuthFail implements Action {
    readonly type = AUTH_FAIL;

    constructor(public payload: string) { };
}

export class SignupStart implements Action {
    readonly type = SINGUP_START;

    constructor(public payload: { email: string, password: string }) { }
}

export class AutoLogin implements Action {
    readonly type = AUTO_LOGIN;
}

export type AuthActions =
    | AuthSuccess
    | Logout
    | LoginStart
    | AuthFail
    | SignupStart
    | AutoLogin;