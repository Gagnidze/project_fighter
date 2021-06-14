import { Action } from "@ngrx/store";
import { Fighter } from "src/app/shared/models/fighter.model";

export const SET_USERS = '[classification] Set Users'

export class setUsers implements Action {
    readonly type = SET_USERS;

    constructor(public payload: Fighter[]) { }
}

export type classificationActions = setUsers;
//