import { createAction, props } from "@ngrx/store";
import { Fighter } from "src/app/shared/models/fighter.model";

export const SET_USERS = '[classification] Set Users'
export const NAVIGATE = '[classification] Navigate'

export interface navigationObject {
    payload: string,
    type: string
}

export const setUsers = createAction(
    SET_USERS,
    props<{ payload: Fighter[] }>()
)

export const navigate = createAction(
    NAVIGATE,
    props<{ payload: string }>()
)