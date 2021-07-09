import { createReducer, on } from "@ngrx/store";
import { Fighter } from "src/app/shared/models/fighter.model";
import * as FightersActions from '../store/fighters.actions'



export interface stateHere {
    allFighters: Fighter[],
    selectedUserFighters: Fighter[],
    fighterToEdit: Fighter,
    editId: number
}

const initState: stateHere = {
    allFighters: [],
    selectedUserFighters: [],
    fighterToEdit: null,
    editId: -1
}


export const fightersReducer = createReducer(
    initState,
    on(FightersActions.SetFighters, (state, action) => {
        return {
            ...state,
            allFighters: [...action.payload]
        }
    }),

    // Find a way not to use "any" here
    on(FightersActions.AddFighters, (state, action) => {
        let arrLength = state.allFighters.length;
        let newId = state.allFighters[arrLength - 1].id + 1
        let card = {
            ...action.payload.payload,
            userMail: action.payload.userMail,
            id: newId
        }

        return {
            ...state,
            allFighters: [...state.allFighters, card]
        }
    }),

    on(FightersActions.EditFighters, (state, action) => {
        const editedFighter = {
            ...state.allFighters[action.payload.index],
            ...action.payload.updatedFighter
        };

        const updatedFightersArr = [...state.allFighters];
        updatedFightersArr[action.payload.index] = editedFighter;

        return {
            ...state,
            allFighters: updatedFightersArr
        };
    }),
    on(FightersActions.DeleteFighters, (state, action) => {
        return {
            ...state,
            allFighters: state.allFighters.filter((fighter, index) => {
                return index !== action.payload;
            })
        };
    }),
    on(FightersActions.SelectFighters, (state, action) => {
        const allFightersCopy = state.allFighters;
        const selectedFighters: Fighter[] = [];
        const id: string = action.payload

        allFightersCopy.forEach(
            (fighter: Fighter) => {
                if (fighter.userMail?.includes(id)) {
                    selectedFighters.push(fighter);
                }
            }
        )

        return {
            ...state,
            selectedUserFighters: selectedFighters

        }
    }),
    on(FightersActions.StartEdit, (state, action) => {
        const fighterToEdit = action.payload.fighterToEdit
        const idToEdit = action.payload.editId

        return {
            ...state,
            fighterToEdit: fighterToEdit,
            editId: idToEdit
        }
    }),
    on(FightersActions.EndEdit, (state, action) => {
        return {
            ...state,
            fighterToEdit: null,
            editId: -1
        }
    }),
)