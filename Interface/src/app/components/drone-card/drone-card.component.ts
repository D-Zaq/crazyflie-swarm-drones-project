import { outputAst } from '@angular/compiler';
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { CommandStruct, Drone, DRONE_1, Command } from 'src/app/objects/drones';
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
    let identifyCommand = {
      droneURI: this.droneData.name,
      command: Command.Identify
      };
    this.droneService.identifyDrone(identifyCommand).subscribe();
  }

  startMission(): void {
    // TODO: Disable button if drone is already flying or if drone battery is low (<30%)
    let startMissionLetter: string;
    startMissionLetter = "s";
    let startMissionCommand = {
      droneURI: this.droneData.name,
      command: Command.StartMission
      };
    this.droneService.startMission(startMissionCommand).subscribe();
  }

  land(): void {
    let landMissionLetter: string;
    landMissionLetter = "s";
    let landMissionCommand = {
      droneURI: this.droneData.name,
      command: Command.StartMission
      };
    this.droneService.landDrone(landMissionCommand).subscribe();
  }


}
