import { Component, Injectable, Input, OnDestroy, OnInit } from '@angular/core';
import { Fighter } from '../models/fighter.model';
import { Store } from '@ngrx/store';
import { Subscription } from 'rxjs';
import * as mainStore from '../../store/app.reducer'
import * as fightersActions from '../../all-fighters/store/fighters.actions'
import { ActivatedRoute, Router } from '@angular/router';

@Injectable()

@Component({
  selector: 'app-fighter-card',
  templateUrl: './fighter-card.component.html',
  styleUrls: ['./fighter-card.component.scss']
})
export class FighterCardComponent implements OnInit, OnDestroy {
  @Input() liveData: Fighter;
  @Input() id: number = -1;
  fighterToEdit: Fighter = null;
  fighterSub: Subscription;
  authSub: Subscription;

  eligibleToEdit: boolean = false;

  constructor(
    private store: Store<mainStore.AppState>,
    private router: Router,
    private route: ActivatedRoute
  ) { }

  ngOnInit(): void {

    this.authSub = this.store.select('auth').subscribe(
      (authRes) => {
        this.route.queryParams.subscribe(
          (res) => {
            if ((!res.lock) && (authRes.user?.email.includes(this.liveData?.userMail))) {
              this.eligibleToEdit = true;
            } else {
              this.eligibleToEdit = false;
            }
          }
        )
      }
    )
  }

  edit() {
    this.fighterSub = this.store.select('fighters').subscribe(
      (res) => {
        this.fighterToEdit = res.allFighters[this.id];
      }
    )
    this.store.dispatch(fightersActions.StartEdit({
      payload: {
        fighterToEdit: this.fighterToEdit,
        editId: this.id
      }
    }));
    // this.router.navigate(['add-fighter']);
  }

  delete() {
    this.store.dispatch(fightersActions.DeleteFighters({ payload: this.id }));
    this.store.dispatch(fightersActions.SaveFighters());
  }

  ngOnDestroy() {
    this.authSub.unsubscribe();
    if (this.fighterSub) {
      this.fighterSub.unsubscribe();
    }
  }

}
