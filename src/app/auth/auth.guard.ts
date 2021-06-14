import { Injectable } from "@angular/core";
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from "@angular/router";
import { Store } from "@ngrx/store";
import { Observable } from "rxjs";
import { map, take } from "rxjs/operators";
import * as mainStore from '../store/app.reducer'
import { state } from "@angular/animations";

@Injectable({ providedIn: 'root' })
export class AuthGuard implements CanActivate {
    constructor(
        private router: Router,
        private store: Store<mainStore.AppState>
    ) { }

    canActivate(
        route: ActivatedRouteSnapshot,
        router: RouterStateSnapshot): Observable<boolean | UrlTree> |
        Promise<boolean | UrlTree> |
        boolean |
        UrlTree {
        return this.store.select('auth').pipe(
            take(1),
            map(authState => {
                return authState.user;
            }),
            map(
                user => {
                    // This !! thing returns a boolean based if the user is truish or falshish
                    // This means that this guard will protect routes and redirect when user is falseish which means session is not authorised
                    const loggedIn = !!user;
                    if (loggedIn) {
                        return true;
                    } else {
                        return this.router.createUrlTree(['/signup'])
                    }
                }
            ));
    }
}