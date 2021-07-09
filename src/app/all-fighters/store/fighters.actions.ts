import { Action, createAction, props } from '@ngrx/store'
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


export const StartEdit = createAction(
    START_EDIT,
    props<{
        payload: {
            fighterToEdit: Fighter,
            editId: number
        }
    }>()
)

export const SetFighters = createAction(
    SET_FIGHTERS,
    props<{
        payload: Fighter[]
    }>()
)

export const GetFighters = createAction(
    GET_FIGHTERS
)

export const AddFighters = createAction(
    ADD_FIGHTERS,
    props<{
        payload: {
            payload: Fighter,
            userMail: string
        }
    }>()
)


export const EditFighters = createAction(
    EDIT_FIGHTERS,
    props<{
        payload: {
            index: number,
            updatedFighter: Fighter
        }
    }>()
)

export const DeleteFighters = createAction(
    DELETE_FIGHTERS,
    props<{
        payload: number
    }>()
)

export const SaveFighters = createAction(
    SAVE_FIGHTERS
)

export const SelectFighters = createAction(
    SELECT_FIGHTERS,
    props<{
        payload: string
    }>()
)

export const EndEdit = createAction(
    END_EDIT
)