import { outputAst } from '@angular/compiler';
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import {Drone, DRONE_1} from 'src/app/objects/drones';
import { DronesService } from 'src/app/services/drones/drones.service';

@Component({
  selector: 'app-drone-card',
  templateUrl: './drone-card.component.html',
  styleUrls: ['./drone-card.component.scss']
})
export class DroneCardComponent implements OnInit {

  @Input() droneData: Drone = DRONE_1;
  constructor(public droneService:DronesService) { }

  ngOnInit(): void {
  }

  identify(): void {
    console.log(this.droneData.name);
    this.droneService.identifyDrone(this.droneData.name).subscribe();
  }

  fly(): void {
    let fly: string;
    fly = "s";
    this.droneService.fly(fly).subscribe();
  }

  land(): void {
    let land: string;
    land = "c";
    this.droneService.landDrone(land).subscribe();
  }

  startMission(): void {
    let startMissionLetter: string;
    startMissionLetter = "e";
    this.droneService.startMission(startMissionLetter).subscribe();
  }


}
