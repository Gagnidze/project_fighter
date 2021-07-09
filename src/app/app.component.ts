import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { TranslateService } from '@ngx-translate/core';
import { tap } from 'rxjs/operators';
import { GetFighters } from './all-fighters/store/fighters.actions';
// import { AuthService } from './auth/signup/auth.service';
import { AutoLogin } from './auth/store/auth.actions';
import * as mainStore from './store/app.reducer'

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  title = 'project-fighter';

  constructor(
    private store: Store<mainStore.AppState>,
    private translateService: TranslateService
  ) {
    this.translateService.setDefaultLang('eng')
    this.translateService.use(localStorage.getItem('language'));
  }

  ngOnInit() {
    // Get fighters ASAP
    this.store.dispatch(GetFighters());
    // calling this here, oninit so as soon as app is initialised, we log in if it is possible
    this.store.dispatch(AutoLogin());
    // this.store.select('auth').subscribe(
    //   (authState) => {
    //     console.log('update')
    //     console.log(authState.sessionTime)
    //   }
    // )

  }

}