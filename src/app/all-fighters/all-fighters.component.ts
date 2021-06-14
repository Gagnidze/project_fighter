import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Params, Router, RoutesRecognized } from '@angular/router';
import { Store } from '@ngrx/store';
import { Subscription } from 'rxjs';
import { FormDataService } from '../formData.service';
import { Fighter } from '../shared/models/fighter.model';
// import * as allFightersReducer from '../add-fighter/store/all-fighters.reducer'
import * as mainStore from '../store/app.reducer'
import { GetFighters, SelectFighters } from './store/fighters.actions';
import * as classificationActions from '../header/store/classification.actions'

@Component({
  selector: 'app-all-fighters',
  templateUrl: './all-fighters.component.html',
  styleUrls: ['./all-fighters.component.scss']
})
export class AllFightersComponent implements OnInit, OnDestroy {

  loadedFighters: Fighter[];
  id: string;

  contributorsArr: string[] = [];

  totalFighters: number;
  totalContributors: number;


  loggedIn: boolean = false;

  activeRouteSub: Subscription;
  authSub: Subscription;
  classSub: Subscription;
  fighterSub: Subscription;
  classSubSecond: Subscription;
  fighterSubSecond: Subscription;


  edit: boolean;

  constructor(
    private formDataService: FormDataService,
    private store: Store<mainStore.AppState>,
    private route: ActivatedRoute,
    private router: Router
  ) { }

  disableEdit() {
    this.edit = false;
  }

  showAll() {
    this.store.dispatch(new GetFighters())
    this.store.select('fighters').subscribe(
      (res) => {
        this.loadedFighters = res.allFighters
      }
    )
    this.router.navigate(['all-fighters']);
  }

  ngOnInit(): void {
    // this.store.dispatch(new GetFighters())
    this.authSub = this.store.select('auth').subscribe(
      (res) => {
        if (res.user) {
          this.loggedIn = true;
        } else {
          this.loggedIn = false;
        }
      }
    )

    this.showAll();

    this.classSub = this.store.select('classification').subscribe(
      (res) => {
        this.contributorsArr = res.individualUsers;
      }
    )

    this.fighterSub = this.store.select('fighters').subscribe(
      (res) => {
        this.totalFighters = res.allFighters.length;

        this.store.dispatch(new classificationActions.setUsers(res.allFighters))

        this.classSubSecond = this.store.select('classification').subscribe(
          (resClass) => {
            this.totalContributors = resClass.individualUsers.length;
          }
        )
      }
    )

    this.activeRouteSub = this.router.events.subscribe(
      (routerRes) => {
        if (routerRes instanceof RoutesRecognized) {

          this.id = routerRes.url.slice(14, [...routerRes.url].indexOf('?'));
          this.store.dispatch(new SelectFighters(this.id));

          this.fighterSubSecond = this.store.select('fighters').subscribe(
            (res) => {
              this.loadedFighters = res.selectedUserFighters;
            }
          )
        }
      }
    )



  }

  ngOnDestroy() {
    this.activeRouteSub.unsubscribe();
    this.authSub.unsubscribe();
    this.classSub.unsubscribe();
    this.fighterSub.unsubscribe();
    this.classSubSecond.unsubscribe();
  }
}