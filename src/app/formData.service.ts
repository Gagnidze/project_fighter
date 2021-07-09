import { Injectable } from "@angular/core";
import { Subject } from "rxjs";
import { Fighter } from "./shared/models/fighter.model";

@Injectable()

export class FormDataService {
    notification = new Subject<FormData>();
    refreshFighters = new Subject<Fighter[]>();
}