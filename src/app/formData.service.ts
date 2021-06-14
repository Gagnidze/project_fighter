import { Injectable } from "@angular/core";
import { Subject } from "rxjs";
import { Fighter } from "./shared/models/fighter.model";

@Injectable()

export class FormDataService {
    notification = new Subject<FormData>();
    refreshFighters = new Subject<Fighter[]>();

    // allFighters: Fighter[] = [];

    // updateFighters(data) {
    // this.allFighters = [];
    // data.forEach(el => {
    //     if (el !== null) {
    //         this.allFighters.push(el);
    //     }
    // });

    // this.refreshFighters.next(this.allFighters)
    // }


}