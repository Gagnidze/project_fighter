import { Fighter } from "src/app/shared/models/fighter.model";
import * as classificationActions from './classification.actions'

export interface StateHere {
    allUsers: string[],
    individualUsers: string[]
}

const initState: StateHere = {
    allUsers: [],
    individualUsers: []
}

export function classificationReducer(
    state = initState,
    action: classificationActions.classificationActions
) {
    switch (action.type) {
        case classificationActions.SET_USERS:
            let allMails: string[] = [];
            let individualMails: string[] = [];
            action.payload.forEach(
                (fighter) => {
                    if (fighter.userMail) {
                        allMails.push(fighter.userMail);

                        let extractedString = fighter.userMail.substring(0, fighter.userMail.indexOf("@"))
                        individualMails.push(extractedString);

                        individualMails = [... new Set(individualMails)];
                    }
                }
            )
            return {
                ...state,
                allUsers: allMails,
                individualUsers: individualMails
            }
        default:
            return state
    }


}