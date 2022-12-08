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
  @Input() buildingType!: string; 
  
  //Gets building image from parent
  @Input() buildingName!: string;

  //Gets building cost from parent
  @Input() buildingCost!: number;

  //Gets building image from parent
  @Input() buildingIMG!: string;

  //Gets total score from parent
  @Input() TotalScore!: number;

  CPowerCost: number = 15;
  CPowerCostPre: number = 15;
  clickerPower: number = 1;

  //Use interface instead of two outputs, replace number type with interface type
  @Output() Output: EventEmitter<data> = new EventEmitter<data>();

  
  

  ClickerUp1 = () => {
    if (this.TotalScore >= this.CPowerCost) {
      this.TotalScore -= this.CPowerCost;
      this.clickerPower += 1;
      this.CPowerCost = Math.round(this.CPowerCostPre *= 1.3);

      const newData = <data>{};
      newData.TotalScoreOutput = this.TotalScore;
      newData.clickerPowerOutput = this.clickerPower;
      this.Output.emit(newData);
    }
  }


  ngOnInit(): void {
  }

}
