import { Component, Input, OnInit, OnDestroy, Output, EventEmitter } from '@angular/core';
import setRandomInterval from 'set-random-interval';
import { BuildingComponent } from './building/building.component';
import { data } from './building/building.component';

//Creates interface for our building component
interface Building {
  name: string,
  desc: string,
  cost: number,
  production: number,
  quantity: number,
  img: string,
}

//Creates interface for our upgrade component
interface Upgrade {
  name: string,
  desc?: string,
  cost: number,
  multiplier: number,
  target: number,
  purchased: boolean,
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

  TotalScore: number = 100000000000;
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

  //Building Array
  buildings: Building[] = [
  { name: "Clicker", cost: 15, production: 1, quantity: 1, img: "../assets/img/ArrowImg.png", desc: "Buy more to click harder"},
  { name: "Employee", cost: 100, production: 1, quantity: 0, img: "../assets/img/EmployeeImg.png", desc: "Hire more employees to do your bidding"},
  { name: "Small Workshop", cost: 1000, production: 12, quantity: 0, img: "../assets/img/SmallWorkshopImg.png", desc: "Introduces the assembly line to your gizmo production" },
  { name: "Large Workshop", cost: 10000, production: 123, quantity: 0, img: "../assets/img/LargeWorkshopImg.png", desc: "Make assembly lines for your assembly lines"},
  { name: "Factory", cost: 1000000, production: 1234, quantity: 0, img: "../assets/img/FactoryImg.png", desc: "Use vertical integration to fully control the gizmo manufacturing process"},
  { name: "Company Town", cost: 10000000, production: 12345, quantity: 0, img: "../assets/img/CompanyTownImg.png", desc: "Employees live closer to work, increasing production"},
  { name: "Business Tower", cost: 100000000, production: 123456, quantity: 0, img: "../assets/img/BusinessTowerImg.png", desc: "The Wall Street of gizmo making"}
  ,
  ];

  //Upgrade Array
  upgrades: Upgrade[] = [
  { name: "MegaClicker", cost: 10000, multiplier: 10, target: 0, purchased: false },
  { name: "Overtime", cost: 50000, multiplier: 5, target: 1, purchased: false },
  { name: "Coal Power", cost: 100000, multiplier: 5, target: 2, purchased: false },
  { name: "Child Labor", cost: 300000, multiplier: 5, target: 3, purchased: false },
  { name: "Tax Cuts", cost: 1000000, multiplier: 5, target: 4, purchased: false },
  { name: "Mortgage Hike", cost: 60000000, multiplier: 5, target: 5, purchased: false},
  { name: "Lobbying", cost: 900000000, multiplier: 5, target: 6, purchased: false},
  ];

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

  buyBuilding = (building: Building) => {
    if (this.TotalScore >= building.cost) {
      this.TotalScore -= building.cost;
      building.quantity += 1;
      building.cost = Math.round(building.cost *= 1.3);
    }
  }

  buyUpgrade = (upgrade: Upgrade) => {
    if (this.TotalScore >= upgrade.cost) {
      this.TotalScore -= upgrade.cost;
      upgrade.purchased = true;
      this.buildings[upgrade.target].production *= upgrade.multiplier;
    }
  }

  numberCall = () => {
    this.clickTotalString = String(this.TotalScore);
    localStorage.setItem('clickNum', this.clickTotalString);
    this.increaseRate = 0;
    for (let i = 1; i < this.buildings.length; i++) {
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
      this.TotalScore += Math.round(this.getRandomArbitrary(this.increaseRate * 60, this.increaseRate * 180));
      document.documentElement.style.setProperty('--RedButCol', 'White');
      this.RedActive = false;
    }
  }

  TurnOnRed = () => {
    document.documentElement.style.setProperty('--RedButCol', 'Red');
    this.RedActive = true;
  }

  //////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

  ngOnInit() {
    this.numberCall();
    setInterval(() => {
      this.numberCall();
      this.displayScore = this.calcWithSuffix(this.TotalScore);
      this.displayIncrease = this.calcWithSuffix(this.increaseRate * 10);
    }, 100);


    setRandomInterval(() => this.TurnOnRed(), 10000, 50000);
  }

}



