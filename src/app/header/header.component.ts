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
  signupMode: boolean = false;
  userLoggedIn: boolean = false;
  activatedRoute: ActivatedRoute;

  activatedLanguage: string;

  // 
  // totalFighters: number;
  // totalContributors: number;

  // 
  // contributorsArr: string[] = [];

  constructor(
    private router: Router,
    private store: Store<mainStore.AppState>
  ) { }

  changeLanguage(language: HTMLElement) {
    console.log(language.innerText)
    localStorage.setItem('language', language.innerText);
    window.location.reload();
  }

  ngOnInit(): void {
    this.activatedLanguage = localStorage.getItem('language') || 'eng';


    // 
    // this.store.select('classification').subscribe(
    //   (res) => {
    //     this.contributorsArr = res.individualUsers;
    //   }
    // )


    // 
    // this.store.select('fighters').subscribe(
    //   (res) => {
    //     this.totalFighters = res.allFighters.length;

    //     this.store.dispatch(new classificationActions.setUsers(res.allFighters))

    //     this.store.select('classification').subscribe(
    //       (res) => {
    //         this.totalContributors = res.individualUsers.length;
    //       }
    //     )
    //   }
    // )

    console.log(this.router.isActive('/all-fighters', true));



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

    // this.doSomething('vaxo53@gmail.com');
  }

  // doSomething(userIdentifier) {
  //   this.store.select('fighters').subscribe(
  //     (res) => {
  //       this.fighterArr = [...res.allFighters];
  //       this.fightersOfThisUser = [];
  //       console.log(this.fighterArr)
  //       res.allFighters.forEach(el => {
  //         if (el.userMail === userIdentifier) {
  //           this.fightersOfThisUser.push(el);
  //         }
  //       });
  //       console.log(this.fightersOfThisUser);
  //     }
  //   )
  // }

  ngOnDestroy() {
    this.userSub.unsubscribe();
  }

  // need a better name for this method
  toggleSignup() {
    console.log(this.signupMode)
    this.router.navigate(['signup'])
  }

  logout() {
    // this.auth.logout();
    this.store.dispatch(new Logout())
  }

}
