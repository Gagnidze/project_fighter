import { Component, Injectable, Input, OnDestroy, OnInit } from '@angular/core';
import { Fighter } from '../models/fighter.model';
// import * as allFightersActions from '../../add-fighter/store/all-fighters.actions'
// import * as allFightersReducer from '../../add-fighter/store/all-fighters.reducer'
import { Store } from '@ngrx/store';
import { Subscription } from 'rxjs';
import * as mainStore from '../../store/app.reducer'
// import * as editActions from '../../add-fighter/store/edit.actions'
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
  // editMode: boolean = false;
  fighterToEdit: Fighter = null;
  sub: Subscription;

  eligibleToEdit: boolean = false;

  constructor(
    private store: Store<mainStore.AppState>,
    private router: Router,
    private route: ActivatedRoute
  ) { }

  ngOnInit(): void {

    // if (this.route.snapshot.queryParams.edit === undefined) {
    //   this.eligibleToEdit = true;
    //   console.log('treeee')
    // } else if (this.route.snapshot.queryParams.edit === false) {
    //   this.eligibleToEdit = false;
    //   console.log('falseeee')
    // }


    this.store.select('auth').subscribe(
      (authRes) => {
        // this.route.queryParams.subscribe(
        //   (res) => {
        //     if(res.lock && res.user.email.includes(this.liveData.userMail)) {

        //     }
        //   }
        // )
        this.route.queryParams.subscribe(
          (res) => {
            if ((!res.lock) && (authRes.user.email?.includes(this.liveData.userMail))) {
              this.eligibleToEdit = true;
            } else {
              this.eligibleToEdit = false;
            }
          }
        )


        // this.eligibleToEdit = false;
      }
    )


    // this.sub = this.store.select('fighters').subscribe(
    //   data => {
    //     if (data.editId > -1) {
    //       this.editMode = true;
    //       this.fighterToEdit = data.fighterToEdit;
    //     } else {
    //       this.editMode = false;
    //     }
    //   }
    // )
  }

  edit(data: string) {
    // this.editMode = true;
    const descText = data;
    // data.parentElement.lastElementChild.lastChild.textContent.slice(1);
    this.store.select('fighters').subscribe(
      (res) => {
        this.fighterToEdit = res.allFighters[this.id];
      }
    )
    this.store.dispatch(new fightersActions.StartEdit(this.fighterToEdit, this.id));
    this.router.navigate(['add-fighter']);
  }

  delete() {
    this.store.dispatch(new fightersActions.DeleteFighters(this.id));
    this.store.dispatch(new fightersActions.SaveFighters());
  }

  ngOnDestroy() {
    // this.sub.unsubscribe();
  }

}
