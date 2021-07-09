import { Injectable } from "@angular/core";
import { Router } from "@angular/router";
import { Actions, createEffect, Effect, ofType } from "@ngrx/effects";
import { Store } from "@ngrx/store";
import { dispatch } from "rxjs/internal/observable/pairs";
import { tap } from "rxjs/operators";
import * as mainStore from '../../store/app.reducer'
import * as classificationsActions from './classification.actions'

@Injectable()

export class classificationEffects {

    navigate = createEffect(
        () => this.actions$.pipe(
            ofType(classificationsActions.NAVIGATE),
            tap(
                (res: { payload: string, type: string }) => {
                    console.log(res);
                    this.router.navigate([res.payload]);
                }
            )
        ), { dispatch: false }
    )

    constructor(
        private actions$: Actions,
        private store: Store<mainStore.AppState>,
        private router: Router
    ) { }
}