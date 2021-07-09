import { createReducer, on } from "@ngrx/store";
import { User } from "src/app/shared/models/user.model";
import * as AuthActions from './auth.actions'

export interface StateHere {
    user: User,
    authError: string,
    loading: boolean,
    sessionTime: Date
}

const initState: StateHere = {
    user: null,
    authError: '',
    loading: false,
    sessionTime: null
}

export const authReducer = createReducer(
    initState,
    on(AuthActions.AuthSuccess, (state, action) => {
        const user = new User(
            action.payload.email,
            action.payload.id,
            action.payload.token,
            action.payload.tokenExpDate);
        return {
            ...state,
            user: user,
            authError: null,
            loading: false
        }
    }),
    on(AuthActions.Logout, (state, action) => {
        return {
            ...state,
            user: null
        };
    }),
    on(AuthActions.LoginStart, (state, action) => {
        return {
            ...state,
            authError: null,
            loading: true
        };
    }),
    on(AuthActions.AuthFail, (state, action) => {
        return {
            ...state,
            user: null,
            authError: action.payload,
            loading: false
        };
    })
)