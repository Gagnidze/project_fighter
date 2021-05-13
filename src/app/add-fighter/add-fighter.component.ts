import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, RequiredValidator, Validators } from '@angular/forms';
import { FormDataService } from '../formData.service';
import { BackendService } from '../shared/backend.service';

@Component({
  selector: 'app-add-fighter',
  templateUrl: './add-fighter.component.html',
  styleUrls: ['./add-fighter.component.scss']
})
export class AddFighterComponent implements OnInit {

  liveData: FormData;
  fighterForm: FormGroup;

  constructor(private formDataService: FormDataService, private backend: BackendService) { }

  ngOnInit(): void {

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
      'desc': new FormControl('', Validators.required)
    })

    this.fighterForm.valueChanges.subscribe(
      (data: FormData) => {
        this.formDataService.notification.next(
          data
        )
      }
    )

    this.formDataService.notification.subscribe(
      (data: FormData) => {
        this.liveData = data;
      }
    )
  }

  submit() {
    this.formDataService.allFighters.push(this.fighterForm.value);
    this.backend.saveFighters();
    this.fighterForm.reset();
  }
}