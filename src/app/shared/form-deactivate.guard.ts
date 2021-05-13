import { Injectable } from "@angular/core";
import { CanDeactivate } from "@angular/router";
import { AddFighterComponent } from "../add-fighter/add-fighter.component";

@Injectable({ providedIn: 'root' })

export class FormDeactivateGuard implements CanDeactivate<AddFighterComponent> {
    canDeactivate(component: AddFighterComponent): boolean {
        if (component.fighterForm.dirty) {
            return confirm("You have not submitted your fighter, data will be lost");
        }
        return true;
    }
}