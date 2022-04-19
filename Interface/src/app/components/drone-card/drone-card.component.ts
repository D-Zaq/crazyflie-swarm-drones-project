import { outputAst } from '@angular/compiler';
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { MAX_REAL_RANGE, MAX_SIM_RANGE, REAL_DISTANCE_SCALE, SIM_DISTANCE_SCALE } from 'src/app/constants/constants';
import {Drone, DRONE_1, Command, CommandStruct, MapDrone} from 'src/app/objects/drones';
import { DronesService } from 'src/app/services/drones/drones.service';
import { Vec2 } from '../main-page/main-page.component';

@Component({
  selector: 'app-drone-card',
  templateUrl: './drone-card.component.html',
  styleUrls: ['./drone-card.component.scss']
})
export class DroneCardComponent implements OnInit {

  @Input() droneData: Drone = DRONE_1;
  simMapDrone = {} as MapDrone;
  realMapDrone = {} as MapDrone;
  id: any;

  constructor(public droneService:DronesService) { }

  ngOnInit(): void {
    this.updateMapDroneData();
  }

  ngOnDestroy() {
    if (this.id) {
      clearInterval(this.id);
    }
  }

  updateMapDroneData(): void{
    this.id = setInterval(() => {
      for (let i=0; this.droneService.mapSimDrones.length; i++){
        if(this.droneService.mapSimDrones[i].name == this.droneData.name){
          this.simMapDrone.xPosition = this.droneService.mapSimDrones[i].xPosition;
          this.simMapDrone.yPosition = this.droneService.mapSimDrones[i].yPosition;
          this.addSimPoint(this.droneService.mapSimDrones[i], i); 
        }
      }

      for (let i=0; this.droneService.mapRealDrones.length; i++){
        if(this.droneService.mapRealDrones[i].name == this.droneData.name){
          this.realMapDrone.xPosition = this.droneService.mapRealDrones[i].xPosition;
          this.realMapDrone.yPosition = this.droneService.mapRealDrones[i].yPosition;
          this.addRealPoint(this.droneService.mapRealDrones[i], i); 
        }
      }
      }, 250);
  }

  addSimPoint(mapDrone:MapDrone, i:number): void{
    if(mapDrone.frontDistance < MAX_SIM_RANGE) {
      const p = {} as Vec2;
      p.x = mapDrone.frontDistance * -SIM_DISTANCE_SCALE + mapDrone.yPosition;
      p.y = mapDrone.xPosition;
      this.droneService.simDronesPoints[i].push(p);
    }

    if(mapDrone.backDistance < MAX_SIM_RANGE) {
      const p = {} as Vec2;
      p.x = mapDrone.backDistance * SIM_DISTANCE_SCALE + mapDrone.yPosition;
      p.y = mapDrone.xPosition;
      this.droneService.simDronesPoints[i].push(p);
    }

    if(mapDrone.leftDistance < MAX_SIM_RANGE) {
      const p = {} as Vec2;
      p.x = mapDrone.yPosition;
      p.y = mapDrone.leftDistance * SIM_DISTANCE_SCALE + mapDrone.xPosition;
      this.droneService.simDronesPoints[i].push(p);
    }

    if(mapDrone.rightDistance < MAX_SIM_RANGE) {
      const p = {} as Vec2;
      p.x = mapDrone.yPosition;
      p.y = mapDrone.rightDistance * -SIM_DISTANCE_SCALE + mapDrone.xPosition;
      this.droneService.simDronesPoints[i].push(p);
    }
  }

  addRealPoint(mapDrone:MapDrone, i: number): void{
    if(mapDrone.frontDistance < MAX_REAL_RANGE) {
      const p = {} as Vec2;
      p.x = mapDrone.frontDistance * REAL_DISTANCE_SCALE + mapDrone.xPosition;
      p.y = mapDrone.yPosition;
      this.droneService.realDronesPoints[i].push(p);
    }

    if(mapDrone.backDistance < MAX_REAL_RANGE) {
      const p = {} as Vec2;
      p.x = mapDrone.backDistance * -REAL_DISTANCE_SCALE + mapDrone.xPosition;
      p.y = mapDrone.yPosition;
      this.droneService.realDronesPoints[i].push(p);
    }

    if(mapDrone.leftDistance < MAX_REAL_RANGE) {
      const p = {} as Vec2;
      p.x = mapDrone.xPosition;
      p.y = mapDrone.leftDistance * -REAL_DISTANCE_SCALE + mapDrone.yPosition;
      this.droneService.realDronesPoints[i].push(p);
    }

    if(mapDrone.rightDistance < MAX_REAL_RANGE) {
      const p = {} as Vec2;
      p.x = mapDrone.xPosition;
      p.y = mapDrone.rightDistance * REAL_DISTANCE_SCALE + mapDrone.yPosition;
      this.droneService.realDronesPoints[i].push(p);
    }
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
