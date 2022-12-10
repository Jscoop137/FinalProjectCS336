import { Component, Input, OnInit, Output, EventEmitter } from '@angular/core';

export interface data {
  TotalScoreOutput: number;
  clickerPowerOutput: number;
}

@Component({
  selector: 'app-building',
  templateUrl: './building.component.html',
  styleUrls: ['./building.component.scss']
})
export class BuildingComponent implements OnInit {

  constructor() { }

  //Gets building name from parent
  @Input() name!: string; 
  
  //Gets building image from parent
  @Input() quantity!: number;

  //Gets building cost from parent
  @Input() cost!: number;

  //Gets building image from parent
  @Input() img!: string;

  //Use interface instead of two outputs, replace number type with interface type
  @Output() Output: EventEmitter<data> = new EventEmitter<data>();

  ngOnInit(): void {
  }

}
