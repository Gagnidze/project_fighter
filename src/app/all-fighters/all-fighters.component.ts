import { Component, OnInit } from '@angular/core';
import { FormDataService } from '../formData.service';
import { BackendService } from '../shared/backend.service';
import { Fighter } from '../shared/fighter.model';

@Component({
  selector: 'app-all-fighters',
  templateUrl: './all-fighters.component.html',
  styleUrls: ['./all-fighters.component.scss']
})
export class AllFightersComponent implements OnInit {
  loadedFighters: Fighter[];

  constructor(private backend: BackendService, private formDataService: FormDataService) { }

  ngOnInit(): void {
    this.backend.loadFighters();
    this.loadedFighters = this.formDataService.allFighters;
    this.formDataService.refreshFighters.subscribe(
      (fighters: Fighter[]) => {
        this.loadedFighters = fighters;
      }
    )
  }
}