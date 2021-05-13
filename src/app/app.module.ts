import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http'

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { AddFighterComponent } from './add-fighter/add-fighter.component';
import { ReactiveFormsModule } from '@angular/forms';
import { FighterCardComponent } from './shared/fighter-card/fighter-card.component';
import { FormDataService } from './formData.service';
import { HeaderComponent } from './header/header.component';
import { AllFightersComponent } from './all-fighters/all-fighters.component';

@NgModule({
  declarations: [
    AppComponent,
    AddFighterComponent,
    FighterCardComponent,
    HeaderComponent,
    AllFightersComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    HttpClientModule
  ],
  providers: [FormDataService],
  bootstrap: [AppComponent]
})
export class AppModule { }
