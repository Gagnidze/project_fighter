import { Actions } from "@ngrx/effects";
import { Store } from "@ngrx/store";
import * as mainStore from '../../store/app.reducer'

export class classificationEffects {
    constructor(
        private actions$: Actions,
        private store: Store<mainStore.AppState>
    ) { }
}