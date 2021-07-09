import { Injectable } from '@angular/core'
import { Actions, createEffect, Effect, ofType } from '@ngrx/effects'
import { Store } from '@ngrx/store'
import { map, switchMap, tap, withLatestFrom } from 'rxjs/operators'
import * as FightersActions from './fighters.actions'
import * as mainStore from '../../store/app.reducer'
import { Router } from '@angular/router'
import { dataRequests } from '../dataRequests.service'

@Injectable()

export class FighterEffects {

    getFighters = createEffect(
        () =>
            this.actions$.pipe(
                ofType(FightersActions.GET_FIGHTERS),
                switchMap(
                    () => {
                        return this.requests.sendGetReq();
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
                        return FightersActions.SetFighters({ payload: filteredArr });
                    }
                )
            )
    )

    saveFighters = createEffect(
        () =>
            this.actions$.pipe(
                ofType(FightersActions.SAVE_FIGHTERS),
                withLatestFrom(
                    this.store.select('fighters'),
                    this.store.select('auth')),
                switchMap(
                    ([someNeverResponseIDoNotNeedBro, fighterState, authState]) => {
                        return this.requests.sentEditReq(authState.user.getToken, fighterState.allFighters)
                    }
                )
            ), { dispatch: false }
    )

    editFighter = createEffect(
        () =>
            this.actions$.pipe(
                ofType(FightersActions.START_EDIT),
                tap(() => {
                    this.router.navigate(['add-fighter']);
                })
            ), { dispatch: false }
    )


    constructor(
        private actions$: Actions,
        private store: Store<mainStore.AppState>,
        private router: Router,
        private requests: dataRequests
    ) {
    }
}