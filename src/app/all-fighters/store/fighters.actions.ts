import { Action } from '@ngrx/store'
import { Fighter } from 'src/app/shared/models/fighter.model'

export const SET_FIGHTERS = '[Fighters] Set Fighters'
export const GET_FIGHTERS = '[Fighters] Get Fighters'
export const ADD_FIGHTERS = '[Fighters] Add Fighters'
export const EDIT_FIGHTERS = '[Fighters] Edit Fighters'
export const DELETE_FIGHTERS = '[Fighters] Delete Fighters'
export const SAVE_FIGHTERS = '[Fighters] Save Fighters'
export const SELECT_FIGHTERS = '[Fighters] Select Fighters'
export const SET_ID = '[Fighters] Set Id'
export const START_EDIT = '[Fighters] Start Edit'
export const END_EDIT = '[Fighters] End Edit'

export class StartEdit implements Action {
    readonly type = START_EDIT

    constructor(
        public fighterToEdit: Fighter,
        public editId: number
    ) { }
}

export class SetFighters implements Action {
    readonly type = SET_FIGHTERS

    constructor(public payload: Fighter[]) { }
}

export class GetFighters implements Action {
    readonly type = GET_FIGHTERS
}

export class AddFighters implements Action {
    readonly type = ADD_FIGHTERS

    // editing this 
    constructor(public payload: Fighter, public userMail: string) { }
}

export class EditFighters implements Action {
    readonly type = EDIT_FIGHTERS

    constructor(public index: number, public updatedFighter: Fighter) { }
}

export class DeleteFighters implements Action {
    readonly type = DELETE_FIGHTERS

    constructor(public payload: number) { }
}
export class SaveFighters implements Action {
    readonly type = SAVE_FIGHTERS
}

export class SelectFighters implements Action {
    readonly type = SELECT_FIGHTERS;

    constructor(public payload: string) { }
}

export class EndEdit implements Action {
    readonly type = END_EDIT
}




export type FightersActions =
    | SetFighters
    | GetFighters
    | AddFighters
    | EditFighters
    | DeleteFighters
    | SaveFighters
    | SelectFighters
    | StartEdit
    | EndEdit;