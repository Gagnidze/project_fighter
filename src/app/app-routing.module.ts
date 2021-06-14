import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AddFighterComponent } from './add-fighter/add-fighter.component';
import { AllFightersComponent } from './all-fighters/all-fighters.component';
import { AuthGuard } from './auth/auth.guard';
import { SignupComponent } from './auth/signup/signup.component';
import { FighterCardComponent } from './shared/fighter-card/fighter-card.component';
import { FormDeactivateGuard } from './shared/form-deactivate.guard';

const routes: Routes = [
  { path: '', redirectTo: 'all-fighters', pathMatch: 'full' },
  { path: 'add-fighter', component: AddFighterComponent, canDeactivate: [FormDeactivateGuard], canActivate: [AuthGuard] },
  { path: 'preview', component: FighterCardComponent },
  {
    path: 'all-fighters', component: AllFightersComponent,
    children: [
      { path: ':id', component: FighterCardComponent, canActivate: [AuthGuard] },
    ]
  },
  { path: 'signup', component: SignupComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }