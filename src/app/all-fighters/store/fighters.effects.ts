import { HttpClient } from '@angular/common/http'
import { Injectable } from '@angular/core'
import { Actions, Effect, ofType } from '@ngrx/effects'
import { Store } from '@ngrx/store'
import { map, switchMap, withLatestFrom } from 'rxjs/operators'
import { Fighter } from 'src/app/shared/models/fighter.model'
import * as FightersActions from './fighters.actions'
import * as mainStore from '../../store/app.reducer'

@Injectable()

export class FighterEffects {
    @Effect()
    getFighters = this.actions$.pipe(
        ofType(FightersActions.GET_FIGHTERS),
        switchMap(
            () => {
                return this.backend.get<Fighter[]>('https://ng-project-fighter-default-rtdb.firebaseio.com/fighters.json')
            }
        ), map(
            (res) => {
                const filteredArr = []
                res.forEach(
                    (el) => {
                        if (el !== null) {
                            filteredArr.push(el);
                        }
                    }
                )
                return new FightersActions.SetFighters(filteredArr);
            }
        )
    )

    @Effect({ dispatch: false })
    saveFighters = this.actions$.pipe(
        ofType(FightersActions.SAVE_FIGHTERS),
        withLatestFrom(
            this.store.select('fighters'),
            this.store.select('auth')),
        switchMap(
            ([someNeverResponseIDoNotNeedBro, fighterState, authState]) => {
                return this.backend.put('https://ng-project-fighter-default-rtdb.firebaseio.com/fighters.json?auth=' + authState.user.getToken, fighterState.allFighters)
            }
        )
    )


    constructor(
        private actions$: Actions,
        private backend: HttpClient,
        private store: Store<mainStore.AppState>
    ) {
    }
}