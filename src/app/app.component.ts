import { Component, Input, OnInit, OnDestroy } from '@angular/core';
import setRandomInterval from 'set-random-interval';

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

  @Input('TotalScore') TotalScore: number = 0;
  clickTotalString: string = "";
  multNumb: number = 1;

  RedActive: boolean = false;

  CPowerCost: number = 15;
  CPowerCostPre: number = 15;
  clickerPower: number = 1;

  EmployeeCost: number = 100;
  EmployeeCostPre: number = 100;
  employees: number = 0;

  SworkshopCost: number = 1000
  SworkshopCostPre: number = 1000;
  Sworkshops: number = 0;

  LworkshopCost: number = 100000;
  LworkshopCostPre: number = 100000;
  Lworkshops: number = 0;

  ///////////////////Decs for Upgrades////////////////////////////////////////////////////////////////////////////////

  clickPowerModifier: number = 1;
  clickPower2Xactive: string = 'F';
  clickPower2xCost: number = 30000;


  EmployeeProdModifier: number = 2;
  EmployeeProd5xactive = 'F';
  EmployeeProd5xCost: number = 75000;

  SworkshopProdModifier: number = 5;
  SworkshopProd5xactive = 'F';
  SworkshopProd5xCost: number = 150000;

  LworkshopProdModifier: number = 30;
  LworkshopProd5xactive = 'F';
  LworkshopProd5xCost: number = 150000;



  /////////////////////FUNCTIONS///////////////////////////////////////////////////////////////////////////////////////////////

  numberCall = () => {
    this.clickTotalString = String(this.TotalScore);
    localStorage.setItem('clickNum', this.clickTotalString);
    this.TotalScore += Math.round((this.EmployeeProdModifier * this.employees) + (this.SworkshopProdModifier * this.Sworkshops) + (this.LworkshopProdModifier * this.Lworkshops));
  }

  clickAdd = () => {
    this.TotalScore += (this.clickerPower * this.clickPowerModifier);
  }

  ClickerUp1 = () => {
    if (this.TotalScore >= this.CPowerCost) {
      this.TotalScore -= this.CPowerCost;
      this.clickerPower += 1;
      this.CPowerCost = Math.round(this.CPowerCostPre *= 1.3);
    }

  }


  clickBuilding1 = () => {
    if (this.TotalScore >= this.EmployeeCost) {
      this.TotalScore -= this.EmployeeCost;
      this.employees += 1;
      this.EmployeeCost = Math.round(this.EmployeeCostPre *= 1.3);
    }

  }

  clickBuilding2 = () => {
    if (this.TotalScore >= this.SworkshopCost) {
      this.TotalScore -= this.SworkshopCost;
      this.Sworkshops += 1;
      this.SworkshopCost = Math.round(this.SworkshopCostPre *= 1.3);
    }

  }

  clickBuilding3 = () => {
    if (this.TotalScore >= this.LworkshopCost) {
      this.TotalScore -= this.LworkshopCost;
      this.Lworkshops += 1;
      this.LworkshopCost = Math.round(this.LworkshopCostPre *= 1.3);
    }
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

  UpgradeClickPower2x = () => {
    if (this.clickPower2Xactive == 'F' && this.TotalScore >= this.clickPower2xCost) {
      this.clickPower2Xactive = 'T';
      this.TotalScore -= this.clickPower2xCost;
      this.clickPowerModifier += 9;
    }
  }


  EmployeeProd5x = () => {
    if (this.EmployeeProd5xactive == 'F' && this.TotalScore >= this.EmployeeProd5xCost) {
      this.EmployeeProd5xactive = 'T';
      this.TotalScore -= this.EmployeeProd5xCost;
      this.clickPowerModifier *= 5;
    }
  }


  SworkshopProd5x = () => {
    if (this.SworkshopProd5xactive == 'F' && this.TotalScore >= this.SworkshopProd5xCost) {
      this.SworkshopProd5xactive = 'T';
      this.TotalScore -= this.SworkshopProd5xCost;
      this.clickPowerModifier *= 5;
    }
  }


  LworkshopProd5x = () => {
    if (this.LworkshopProd5xactive == 'F' && this.TotalScore >= this.LworkshopProd5xCost) {
      this.LworkshopProd5xactive = 'T';
      this.TotalScore -= this.LworkshopProd5xCost;
      this.clickPowerModifier *= 5;
    }
  }

  //////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

  ngOnInit() {
    this.numberCall();
    setInterval(() => {
      this.numberCall();
    }, 100);

    setRandomInterval(() => this.TurnOnRed(), 10000, 50000);
  }

}



