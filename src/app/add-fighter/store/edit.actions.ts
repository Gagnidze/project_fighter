// import { Action } from "@ngrx/store"
// import { Fighter } from "src/app/shared/models/fighter.model"

// export const GET_ID = '[Edit] Get Id'


// export class GetId implements Action {
//     readonly type = GET_ID

//     constructor(public desc: string, public allFighters: Fighter[]) { }
// }


// export type editActions = GetId


// import { Action } from "@ngrx/store";
// import { Fighter } from "src/app/shared/models/fighter.model";

// export const ADD_FIGHTER = '[AllFighters] ADD_FIGHTER';
// export const UPDATE_FIGHTER = '[AllFighters] UPDATE_FIGHTER';
// export const DELETE_FIGHTER = '[AllFighters] DELETE_FIGHTERR';
// export const START_EDIT = '[AllFighters] START_EDIT';
// export const STOP_EDIT = '[AllFighters] STOP_EDIT';


// export class AddFighter implements Action {
//     readonly type = ADD_FIGHTER;
//     // payload: Fighter;

//     constructor(public payload: Fighter) { }
// }

// export class UpdateFighter implements Action {
//     readonly type = UPDATE_FIGHTER;

//     constructor(public payload: Fighter) { }
// }

// export class DeleteFighter implements Action {
//     readonly type = DELETE_FIGHTER;

//     // constructor(public payload: number) { }
// }

// export class StartEditing implements Action {
//     readonly type = START_EDIT

//     constructor(public payload: number) { }
// }

// export class StopEditing implements Action {
//     readonly type = STOP_EDIT
// }

// // we add other actions with | pipe to this 
// export type AllFightersActions =
//     | AddFighter
//     | UpdateFighter
//     | DeleteFighter
//     | StartEditing
//     | StopEditing;