import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AddFighterComponent } from './add-fighter/add-fighter.component';
import { AllFightersComponent } from './all-fighters/all-fighters.component';
import { FighterCardComponent } from './shared/fighter-card/fighter-card.component';
import { FormDeactivateGuard } from './shared/form-deactivate.guard';

const routes: Routes = [
  { path: '', redirectTo: 'add-fighter', pathMatch: 'full' },
  { path: 'add-fighter', component: AddFighterComponent, canDeactivate: [FormDeactivateGuard] },
  { path: 'preview', component: FighterCardComponent },
  { path: 'all-fighters', component: AllFightersComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {

}
