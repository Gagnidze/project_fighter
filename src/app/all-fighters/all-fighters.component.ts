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

  activeRouteSub: Subscription;

  loggedIn: boolean = false;

  authSub: Subscription;

  edit: boolean;

  constructor(
    private formDataService: FormDataService,
    private store: Store<mainStore.AppState>,
    private route: ActivatedRoute,
    private router: Router
  ) { }

  disableEdit() {
    // this.route.url.subscribe(
    //   (res) => {
    //     if (res[0].path === 'all-fighters') {
    //       this.eligibleToEdit = true;
    //     }
    //   }
    // )
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

    this.store.select('classification').subscribe(
      (res) => {
        this.contributorsArr = res.individualUsers;
      }
    )

    this.store.select('fighters').subscribe(
      (res) => {
        this.totalFighters = res.allFighters.length;

        this.store.dispatch(new classificationActions.setUsers(res.allFighters))

        this.store.select('classification').subscribe(
          (res) => {
            this.totalContributors = res.individualUsers.length;
          }
        )
      }
    )
    // due to change
    // this.loadedFighters = this.formDataService.allFighters;
    // this.formDataService.refreshFighters.subscribe(
    //   (fighters: Fighter[]) => {
    //     // this.loadedFighters = fighters;
    //   }
    // )
    // const id = this.route.snapshot.params['id'];

    // this.route.queryParams.subscribe(
    //   (res: Params) => {
    //     this.id = res['id'];
    //     // console.log(this.id);
    //     // console.log(res);
    //   }
    // )

    this.activeRouteSub = this.router.events.subscribe(
      (res) => {
        if (res instanceof RoutesRecognized) {

          this.id = res.url.slice(14, [...res.url].indexOf('?'));
          this.store.dispatch(new SelectFighters(this.id));

          this.store.select('fighters').subscribe(
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
  }
}