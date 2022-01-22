import { Component, OnInit } from '@angular/core';
import { Drone, DRONE_1, DRONE_2 } from 'src/app/objects/drones';

@Component({
  selector: 'app-main-page',
  templateUrl: './main-page.component.html',
  styleUrls: ['./main-page.component.scss']
})
export class MainPageComponent implements OnInit {

  drones: Drone[] = [DRONE_1, DRONE_2];

  constructor() { }

  ngOnInit(): void {
  }

}
