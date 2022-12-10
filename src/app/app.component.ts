import { Component, Input, OnInit, OnDestroy, Output, EventEmitter } from '@angular/core';
import setRandomInterval from 'set-random-interval';
import { BuildingComponent } from './building/building.component';
import { data } from './building/building.component';

interface Building {
  name: string,
  desc?: string,
  cost: number,
  production: number,
  quantity: number,
  img: string,
}

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']

})
export class AppComponent {
  constructor() {
    document.documentElement.style.setProperty('--RedButCol', 'white');
  }
  title = 'cs336-FinalApp1';

  //SCORE UNITS

  TotalScore: number = 0;
  unitSymbols = ["", "thousand", "million", "billion", "trillion", "quadrillion", "quintillion"];
  displayScore = "0";

  //Gizmos / second calc
  increaseRate = 0;
  displayIncrease = "";

  clickTotalString: string = "";
  multNumb: number = 1;

  RedActive: boolean = false;

  //Source of the pictures that clicking will cycle through
  gizmoClick = ["../assets/img/CenterGear-1.png", "../assets/img/CenterGear-2.png", "../assets/img/CenterGear-3.png", "../assets/img/CenterGear-4.png"];
  gearIndex = 0;

  //CPowerCost: number = 15;
  //CPowerCostPre: number = 15;

  //get value from building component

  buyBuilding = (building: Building) => {
    if (this.TotalScore >= building.cost) {
      this.TotalScore -= building.cost;
      building.quantity += 1;
      building.cost = Math.round(building.cost *= 1.3);
    }
  }

  //Building Arrays
  buildings: Building[] = [{name: "Clicker", cost: 15, production: 1, quantity: 1, img: "../assets/img/ArrowImg.png"},
                           {name: "Employee", cost: 100, production: 2, quantity: 0, img: "../assets/img/EmployeeImg.png"},
                           {name: "Small Workshop", cost: 1000, production: 5, quantity: 0, img: "../assets/img/SmallWorkshopImg.png"},
                           {name: "Large Workshop", cost: 10000, production: 30, quantity: 0, img: "../assets/img/LargeWorkshopImg.png"},
                           {name: "Factory", cost: 1000000, production: 100, quantity: 0, img: "../assets/img/FactoryImg.png"}];

  /////////////////////FUNCTIONS///////////////////////////////////////////////////////////////////////////////////////////////

  calcWithSuffix = (num: number) => {
    let tier = Math.floor(Math.log10(num) / 3) | 0;
    if (tier === 0) {
      return num.toString();
    } else {
      let suffix = this.unitSymbols[tier];
      let scale = Math.pow(10, tier * 3);
      let scaled = num / scale;
      return scaled.toFixed(3) + " " + suffix;
    }
  }


  numberCall = () => {
    this.clickTotalString = String(this.TotalScore);
    localStorage.setItem('clickNum', this.clickTotalString);
    this.increaseRate = 0;
    for(let i = 1; i < this.buildings.length; i++) {
      this.increaseRate += this.buildings[i].production * this.buildings[i].quantity;
    }
    this.TotalScore += this.increaseRate;
  }

  clickAdd = () => {
    this.TotalScore += (this.buildings[0].quantity * this.buildings[0].production);
    this.gearIndex = (this.gearIndex + 1) % 4;
  }

  getRandomArbitrary = (min: number, max: number) => {
    return Math.random() * (max - min) + min;
  }


  RedButtonClick = () => {
    if (this.RedActive === true) {
      this.TotalScore += Math.round(this.TotalScore / 10);
      document.documentElement.style.setProperty('--RedButCol', 'White');
      this.RedActive = false;
    }
  }

  TurnOnRed = () => {
    document.documentElement.style.setProperty('--RedButCol', 'Red');
    this.RedActive = true;
  }

  /////////////////////////////////Upgrades///////////////////////////////////////////////////////////////////////////////////

  //////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

  ngOnInit() {
    this.numberCall();
    setInterval(() => {
      this.numberCall();
      this.displayScore = this.calcWithSuffix(this.TotalScore);
      this.displayIncrease = this.calcWithSuffix(this.increaseRate);
    }, 100);


    setRandomInterval(() => this.TurnOnRed(), 10000, 50000);
  }

}



