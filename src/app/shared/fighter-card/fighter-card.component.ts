import { Component, Injectable, Input, OnInit } from '@angular/core';
import { Fighter } from '../fighter.model';

@Injectable()

@Component({
  selector: 'app-fighter-card',
  templateUrl: './fighter-card.component.html',
  styleUrls: ['./fighter-card.component.scss']
})
export class FighterCardComponent implements OnInit {
  @Input() liveData: Fighter;


  constructor() { }

  ngOnInit(): void { }

}
