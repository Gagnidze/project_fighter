// keep this cause why not

// import { HttpClient } from "@angular/common/http";
// import { Injectable } from "@angular/core";
// import { Store } from "@ngrx/store";
// import { exhaustMap, map, take } from "rxjs/operators";
// import { AuthService } from "../auth/signup/auth.service";
// import { FormDataService } from "../formData.service";
// import { Fighter } from "./models/fighter.model";
// import * as mainStore from '../store/app.reducer';
// import * as fightersActions from '../all-fighters/store/fighters.actions';

// @Injectable({ providedIn: 'root' })

// export class BackendService {
//     constructor(
//         private backend: HttpClient,
//         private formDataService: FormDataService,
//         private auth: AuthService,
//         private store: Store<mainStore.AppState>
//     ) { }

    // saveFighters() {
    //     // const fighters = this.formDataService.allFighters;
    //     // this.store.select('auth')
    //     //     .pipe(
    //     //         take(1),
    //     //         map(authState => {
    //     //             return authState.user
    //     //         }), exhaustMap(user => {
    //     //             if (user) {
    //     //                 return this.backend.put('https://ng-project-fighter-default-rtdb.firebaseio.com/fighters.json?auth=' + user.getToken, fighters)
    //     //             } else {
    //     //                 return [fighters];
    //     //             }
    //     //         })).subscribe(
    //     //             (res) => {
    //     //                 console.log(res);
    //     //             }
    //     //         );
    // }

    /////////////////////////////////////////////////
    // saveFighters() {
    //     const fighters = this.formDataService.allFighters;
    //     this.backend.put('https://ng-project-fighter-default-rtdb.firebaseio.com/fighters.json', fighters).subscribe(
    //         (res: Fighter[]) => {
    //             console.log(res);
    //         }
    //     );
    // }
    /////////////////////////////////////////////////

    // loadFighters() {
    //     // this.backend.get('https://ng-project-fighter-default-rtdb.firebaseio.com/fighters.json').subscribe(
    //     //     (res: Fighter[]) => {
    //     //         console.log(res);

    //     //         this.formDataService.updateFighters(res);

    //     //         this.store.dispatch(new fightersActions.SetFighters(res));
    //     //     }
    //     // )
    // }
// }