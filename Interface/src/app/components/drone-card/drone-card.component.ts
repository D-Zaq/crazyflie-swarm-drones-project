import { outputAst } from '@angular/compiler';
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import {Drone, DRONE_1, Command, CommandStruct} from 'src/app/objects/drones';
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
    let startMissionCommand = {
      droneURI: this.droneData.name,
      command: Command.StartMission
      };
    this.droneService.sendCommand(startMissionCommand).subscribe();
  }

  land(): void {
    let landMissionCommand = {
      droneURI: this.droneData.name,
      command: Command.Land
      };
    this.droneService.sendCommand(landMissionCommand).subscribe();
  }

  fly(): void {
    let flyCommand = {
      droneURI: this.droneData.name,
      command: Command.Fly
      };
    this.droneService.sendCommand(flyCommand).subscribe();
  }

  base(): void {
    let baseCommand = {
      droneURI: this.droneData.name,
      command: Command.Base
      };
    this.droneService.sendCommand(baseCommand).subscribe();
  }


}
