import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Store } from '@ngrx/store';
import { FormDataService } from '../formData.service';
import * as mainStore from '../store/app.reducer'
import { SaveFighters } from '../all-fighters/store/fighters.actions';
import * as fightersActions from '../all-fighters/store/fighters.actions'
import { Fighter } from '../shared/models/fighter.model';
import { Subscription } from 'rxjs';
// import { Router } from '@angular/router';


@Component({
  selector: 'app-add-fighter',
  templateUrl: './add-fighter.component.html',
  styleUrls: ['./add-fighter.component.scss']
})
export class AddFighterComponent implements OnInit, OnDestroy {

  liveData: FormData | Fighter;
  fighterForm: FormGroup;
  userMail: string = '';

  fighterSub: Subscription;
  authSub: Subscription;
  valuesSub: Subscription;
  notificationSub: Subscription;

  @Input() editMode: boolean = false;

  editId: number;
  fighterToEdit: Fighter;

  constructor(
    private formDataService: FormDataService,
    private store: Store<mainStore.AppState>,
    // private router: Router
  ) { }

  ngOnInit(): void {
    this.store.dispatch(fightersActions.GetFighters());

    this.fighterForm = new FormGroup({
      'basicData': new FormGroup({
        'name': new FormControl('', Validators.required),
        'surname': new FormControl('', Validators.required),
        'nickname': new FormControl('', Validators.required),
        'imageURL': new FormControl('', Validators.required),
      }),
      'bodyData': new FormGroup({
        'weight': new FormControl('', Validators.required),
        'height': new FormControl('', Validators.required),
        'reach': new FormControl('', Validators.required),
        'age': new FormControl('', Validators.required),
      }),
      'record': new FormGroup({
        'wins': new FormControl('', Validators.required),
        'loses': new FormControl('', Validators.required),
        'draw': new FormControl('', Validators.required)
      }, Validators.required),
      'desc': new FormControl('', Validators.required,),
      'id': new FormControl(''),
      'userMail': new FormControl('')
    })

    this.valuesSub = this.fighterForm.valueChanges.subscribe(
      (data: FormData) => {
        this.formDataService.notification.next(
          data
        )
      }
    )

    this.notificationSub = this.formDataService.notification.subscribe(
      (data: FormData) => {
        this.liveData = data;
      }
    )


    this.authSub = this.store.select('auth')
      .subscribe(
        (res) => {
          if (res.user) {
            this.userMail = res.user.email;
            console.log(this.userMail);
          }
        }
      );

    this.fighterSub = this.store.select('fighters').subscribe(
      (res) => {
        if (res.editId > -1) {
          this.editMode = true;
          this.fighterForm.setValue(res.fighterToEdit);
        }
      }
    )
  }

  submit() {
    console.log(this.userMail);
    this.store.dispatch(fightersActions.AddFighters({
      payload: {
        payload: this.fighterForm.value,
        userMail: this.userMail
      }
    }));

    this.store.dispatch(SaveFighters());

    this.fighterForm.reset();
    // Check if this is needed
    // this.router.navigate(['all-fighters']);
  }

  update() {
    this.store.select('fighters').subscribe(
      (res) => {
        this.editId = res.editId
      }
    )
    this.store.dispatch(fightersActions.EditFighters({
      payload: {
        index: this.editId,
        updatedFighter: this.fighterForm.value
      }
    }));
    this.store.dispatch(fightersActions.SaveFighters());
    this.store.dispatch(fightersActions.EndEdit());
    this.fighterForm.reset();
    // Check if this is needed
    // this.router.navigate(['all-fighters']);
  }

  ngOnDestroy() {
    this.authSub.unsubscribe();
    this.fighterSub.unsubscribe();
    this.valuesSub.unsubscribe();
    this.notificationSub.unsubscribe();
  }
}