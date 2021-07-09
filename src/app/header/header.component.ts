import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { Subscription } from 'rxjs';
import { map } from 'rxjs/operators';
import { Logout } from '../auth/store/auth.actions';
import * as mainStore from '../store/app.reducer';
import * as classificationActions from '../header/store/classification.actions';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit, OnDestroy {
  private userSub: Subscription;
  userLoggedIn: boolean = false;
  activatedRoute: ActivatedRoute;

  activatedLanguage: string;

  constructor(
    private router: Router,
    private store: Store<mainStore.AppState>
  ) { }

  changeLanguage(language: HTMLElement) {
    localStorage.setItem('language', language.innerText);
    window.location.reload();
  }

  ngOnInit(): void {
    this.activatedLanguage = localStorage.getItem('language') || 'eng';

    this.userSub = this.store.select('auth').
      pipe(map(authState => {
        return authState.user;
      })).subscribe((user) => {
        // As the user subject is created on login, this shows wether we are logged in or not.
        if (user) {
          this.userLoggedIn = true;
        } else {
          this.userLoggedIn = false;
        }
      });
  }

  toggleSignup() {
    // this.router.navigate(['signup'])
    this.store.dispatch(classificationActions.navigate({ payload: 'signup' }));
  }

  logout() {
    this.store.dispatch(Logout())
    window.location.reload();
  }

  ngOnDestroy() {
    this.userSub.unsubscribe();
  }

}
