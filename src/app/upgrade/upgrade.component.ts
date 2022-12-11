import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-upgrade',
  templateUrl: './upgrade.component.html',
  styleUrls: ['./upgrade.component.scss']
})
export class UpgradeComponent implements OnInit {

  constructor() { }

  @Input() name!: string;

  @Input() cost!: number;

  ngOnInit(): void {
  }

}
