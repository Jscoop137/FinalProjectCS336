import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-upgrade',
  templateUrl: './upgrade.component.html',
  styleUrls: ['./upgrade.component.scss']
})
export class UpgradeComponent implements OnInit {

  constructor() { }

  //Gets the upgrade name from the parent
  @Input() name!: string;

  //Gets the upgrade cost from the parent
  @Input() cost!: number;

  ngOnInit(): void {
  }

}
