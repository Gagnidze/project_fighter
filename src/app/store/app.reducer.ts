import { ActionReducerMap } from '@ngrx/store'
// import * as allFighters from '../add-fighter/store/all-fighters.reducer'
import * as auth from '../auth/store/auth.reducer'
import * as fighters from '../all-fighters/store/fighters.reducer'
import * as classification from '../header/store/classification.reducer'
// import * as edit from '../add-fighter/store/edit.reducer'

export interface AppState {
    // allFighters: allFighters.StateHere;
    auth: auth.StateHere,
    fighters: fighters.stateHere,
    classification: classification.StateHere,
    // edit: edit.stateHere
}

export const appReducer: ActionReducerMap<AppState> = {
    // allFighters: allFighters.allFightersReducer,
    auth: auth.authReducer,
    fighters: fighters.fightersReducer,
    classification: classification.classificationReducer,
    // edit: edit.editReducer
};