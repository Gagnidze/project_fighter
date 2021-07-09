import { Action, createAction, props } from "@ngrx/store"

export const LOGIN_START = '[auth] Login Start';
export const AUTH_FAIL = '[auth] Login Fail';
export const AUTH_SUCCESS = '[Auth] Log In';
export const LOGOUT = '[Auth] Log Out';
export const SINGUP_START = '[Auth] Signup Start';
export const SIGNUP = '[Auth] Signup';
export const AUTO_LOGIN = '[Auth] Auto Login';
export const AUTO_LOGOUT = '[Auth] Auto Logout';



export const Logout = createAction(
    LOGOUT
)

export const LoginStart = createAction(
    LOGIN_START,
    props<{ payload: { email: string, password: string } }>()
)

export const AuthSuccess = createAction(
    AUTH_SUCCESS,
    props<{
        payload: {
            email: string,
            id: string,
            token: string,
            tokenExpDate: Date
        }
    }>()
)

export const AuthFail = createAction(
    AUTH_FAIL,
    props<{ payload: string }>()
)

export const SignupStart = createAction(
    SINGUP_START,
    props<{ payload: { email: string, password: string } }>()
)

export const AutoLogin = createAction(
    AUTO_LOGIN
)