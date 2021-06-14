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

export function authReducer(
    state = initState,
    action: AuthActions.AuthActions
) {
    switch (action.type) {
        case AuthActions.AUTH_SUCCESS:
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
            };
        case AuthActions.LOGOUT:
            return {
                ...state,
                user: null
            };
        case AuthActions.LOGIN_START:
            return {
                ...state,
                authError: null,
                loading: true
            };
        case AuthActions.AUTH_FAIL:
            return {
                ...state,
                user: null,
                authError: action.payload,
                loading: false
            };
        default:
            return state;
    }
}