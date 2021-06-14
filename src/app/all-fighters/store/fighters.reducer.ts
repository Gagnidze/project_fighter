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


export function fightersReducer(state = initState, action: FightersActions.FightersActions) {

    switch (action.type) {
        case FightersActions.SET_FIGHTERS:
            return {
                ...state,
                allFighters: [...action.payload]
            };
        case FightersActions.ADD_FIGHTERS:
            let arrLength = state.allFighters.length;
            let newId = state.allFighters[arrLength - 1].id + 1
            let card = {
                ...action.payload,
                userMail: action.userMail,
                id: newId
            }

            return {
                ...state,
                allFighters: [...state.allFighters, card]
            }
        case FightersActions.EDIT_FIGHTERS:
            const editedFighter = {
                ...state.allFighters[action.index],
                ...action.updatedFighter
            };

            const updatedFightersArr = [...state.allFighters];
            updatedFightersArr[action.index] = editedFighter;

            return {
                ...state,
                allFighters: updatedFightersArr
            };
        case FightersActions.DELETE_FIGHTERS:
            return {
                ...state,
                allFighters: state.allFighters.filter((fighter, index) => {
                    return index !== action.payload;
                })
            };
        case FightersActions.SELECT_FIGHTERS:
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
        case FightersActions.START_EDIT:
            const fighterToEdit = action.fighterToEdit
            const idToEdit = action.editId

            return {
                ...state,
                fighterToEdit: fighterToEdit,
                editId: idToEdit
            }
        case FightersActions.END_EDIT:
            return {
                ...state,
                fighterToEdit: null,
                editId: -1
            }
        default:
            return state;
    }

}