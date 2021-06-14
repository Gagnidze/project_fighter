import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { AddFighterComponent } from './add-fighter/add-fighter.component';
import { ReactiveFormsModule } from '@angular/forms';
import { FighterCardComponent } from './shared/fighter-card/fighter-card.component';
import { FormDataService } from './formData.service';
import { HeaderComponent } from './header/header.component';
import { AllFightersComponent } from './all-fighters/all-fighters.component';
import { SignupComponent } from './auth/signup/signup.component';
import { LoadingSpinnerComponent } from './shared/loading-spinner/loading.spinner.component';
import { StoreModule } from '@ngrx/store';
import * as mainStore from './store/app.reducer'
import { EffectsModule } from '@ngrx/effects';
import { AuthEffects } from './auth/store/auth.effects';

import { StoreDevtoolsModule } from '@ngrx/store-devtools'
import { environment } from '../environments/environment';
import { FighterEffects } from './all-fighters/store/fighters.effects';

import { HttpClientModule, HttpClient } from '@angular/common/http';
import { TranslateModule, TranslateLoader } from '@ngx-translate/core';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';

export function HttpLoaderFactory(http: HttpClient) {
  return new TranslateHttpLoader(http, "assets/i18n/", ".json")
}

@NgModule({
  declarations: [
    AppComponent,
    AddFighterComponent,
    FighterCardComponent,
    HeaderComponent,
    AllFightersComponent,
    SignupComponent,
    LoadingSpinnerComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    HttpClientModule,
    StoreModule.forRoot(mainStore.appReducer),
    StoreDevtoolsModule.instrument({ logOnly: environment.production }),
    EffectsModule.forRoot([AuthEffects, FighterEffects]),
    TranslateModule.forRoot({
      loader: {
        provide: TranslateLoader,
        useFactory: HttpLoaderFactory,
        deps: [HttpClient]
      }
    })
  ],
  providers: [FormDataService, HttpClient],
  bootstrap: [AppComponent]
})
export class AppModule { }
