import { ActionReducerMap } from '@ngrx/store'
import * as auth from '../auth/store/auth.reducer'
import * as fighters from '../all-fighters/store/fighters.reducer'
import * as classification from '../header/store/classification.reducer'

export interface AppState {
    auth: auth.StateHere,
    fighters: fighters.stateHere,
    classification: classification.StateHere,
}

export const appReducer: ActionReducerMap<AppState> = {
    auth: auth.authReducer,
    fighters: fighters.fightersReducer,
    classification: classification.classificationReducer,
};