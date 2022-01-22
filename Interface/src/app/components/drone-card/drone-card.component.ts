import { outputAst } from '@angular/compiler';
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Drone, DRONE_1 } from 'src/app/objects/drones';
import { DronesService } from 'src/app/services/drones/drones.service';

@Component({
  selector: 'app-drone-card',
  templateUrl: './drone-card.component.html',
  styleUrls: ['./drone-card.component.scss']
})
export class DroneCardComponent implements OnInit {

  @Input() droneData: Drone = DRONE_1;

  constructor(public drones:DronesService) { }

  ngOnInit(): void {
  }

  identify(): void {
    this.drones.identifyDrone();
  }

  startMission(): void {
    this.drones.startMission();
  }

  land(): void {
    this.drones.landDrone();
  }


}
