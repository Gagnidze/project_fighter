import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Fighter } from "../shared/fighter.model";

@Injectable({ providedIn: 'root' })

export class dataRequests {
    sendGetReq() {
        return this.http.get<Fighter[]>('https://ng-project-fighter-default-rtdb.firebaseio.com/fighters.json')
    }

    sentEditReq(
        token: string, fighters: Fighter[]
    ) {
        return this.http.put('https://ng-project-fighter-default-rtdb.firebaseio.com/fighters.json?auth=' + token, fighters)
    }

    constructor(private http: HttpClient) { }
}