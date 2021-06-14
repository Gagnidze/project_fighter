// import * as editActions from './edit.actions'


// export interface stateHere {
//     id: string
// }

// const initState: stateHere = {
//     id: ''
// }


// export function editReducer(
//     state = initState,
//     action: editActions.editActions
// ) {
//     switch (action.type) {
//         case editActions.GET_ID:
//             const desc = action.desc;
//             const allFighters = action.allFighters
//             // console.log(desc)
//             // console.log(allFighters[0].desc)
//             // if (allFighters[0].desc === desc) {
//             //     console.log('yep')
//             // }
//             allFighters.forEach(el => {
//                 if (el.desc == action.desc) {
//                     console.log(el);
//                 }
//             });
//             console.log(allFighters);



//             return {
//                 ...state,
//                 id: action.desc
//             }
//         default:
//             return state;
//     }
// }



// import { Fighter } from "../../shared/models/fighter.model";
// import * as allFightersActions from './all-fighters.actions'

// // export interface WholeState {
// //     allFighters: StateHere;
// // }

// export interface StateHere {
//     allFighters: Fighter[],
//     selectedFighter: Fighter,
//     selectedFighterIndex: number
// }

// const initState: StateHere = {
//     allFighters: [
//         new Fighter(
//             {
//                 imageURL: 'https://wallpapercave.com/wp/wp1930444.jpg',
//                 name: 'Jon',
//                 nickname: 'bones',
//                 surname: 'Jones'
//             },
//             {
//                 age: 33,
//                 height: 193,
//                 reach: 214.63,
//                 weight: 93,
//             },
//             'One of the greatest and THE Greatest Of All Time (G.O.A.T) for some people, including the author of this super cool Angular App. The only recorded loss for Jonny Bones is not actually a loss, but a disqualification because of illegal "12-6" strike in a fight he was winning anyway',
//             {
//                 draw: 0,
//                 loses: 1,
//                 wins: 26,
//             }
//         )
//     ],
//     selectedFighter: null,
//     selectedFighterIndex: -1
// }

// export function allFightersReducer(
//     state: StateHere = initState,
//     action: allFightersActions.AllFightersActions
// ) {
//     switch (action.type) {
//         case allFightersActions.ADD_FIGHTER:
//             return {
//                 ...state,
//                 allFighters: [
//                     ...state.allFighters,
//                     action.payload
//                 ]
//             };
//         case allFightersActions.UPDATE_FIGHTER:

//             // first we get the old fighter at the provided index
//             const fighter = state.allFighters[state.selectedFighterIndex];
//             // then, we edit that old fighter with new data
//             const newFighter = {
//                 ...fighter,
//                 ...action.payload
//             };
//             // then we copy the fighters array from previous state
//             const newFighterArr = [...state.allFighters];
//             // finally, we swap old fighter with the new fighter on provided index
//             newFighterArr[state.selectedFighterIndex] = newFighter;

//             return {
//                 // copy the whole state
//                 ...state,
//                 // replace the allFighters array with the updated one 
//                 allFighters: newFighterArr,
//                 // reverting editing values after finishing
//                 selectedFighterIndex: -1,
//                 SelectedFighter: null

//             };
//         case allFightersActions.DELETE_FIGHTER:
//             return {
//                 ...state,
//                 allFighters: state.allFighters.filter((fighter, index) => {
//                     // we just return everything except the one with the provided index
//                     return index !== state.selectedFighterIndex
//                 }),
//                 // reverting editing values after finishing
//                 selectedFighterIndex: -1,
//                 SelectedFighter: null
//             };

//         case allFightersActions.START_EDIT:
//             return {
//                 ...state,
//                 selectedFighterIndex: action.payload,
//                 // So this syntax copies the state and does not mutate the original
//                 selectedFighter: { ...state.allFighters[action.payload] }
//             }

//         case allFightersActions.STOP_EDIT:
//             return {
//                 ...state,
//                 selectedFighter: null,
//                 selectedFighterIndex: -1
//             }
//         default:
//             return state;
//     }
// }