import { INT_TYPE } from '@angular/compiler/src/output/output_ast';
import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { interval, Subject } from 'rxjs';
import { startWith, switchMap, takeUntil } from 'rxjs/operators';
import {Command, CommandStruct, Drone, DRONE_1, DRONE_2, SIM_DRONE_1, SIM_DRONE_10, SIM_DRONE_2, SIM_DRONE_3, SIM_DRONE_4, SIM_DRONE_5, SIM_DRONE_6, SIM_DRONE_7, SIM_DRONE_8, SIM_DRONE_9 } from 'src/app/objects/drones';
import { Mission } from 'src/app/objects/mission';
import { DronesService, ServerSimDrone } from 'src/app/services/drones/drones.service';

declare var require: any

export interface Vec2 {
  x: number;
  y: number;
}

export interface Point {
  point: Vec2;
}

@Component({
  selector: 'app-main-page',
  templateUrl: './main-page.component.html',
  styleUrls: ['./main-page.component.scss']
})
export class MainPageComponent implements OnInit {

  realDrones: Drone[] = [DRONE_1, DRONE_2];
  simDrones: Drone[] = [];
  private unsubscribe$ = (new Subject<void>());
  isSimulation = true;
  points: Vec2[]= [];
  missionEnded: boolean = false;
  travelTime: number = 0;
  constructor(public droneService:DronesService, public angularFirestore: AngularFirestore, private snackBar: MatSnackBar) {
    
  }

  ngOnInit(): void {
    this.droneService.isSimulation = true;
    interval(1000)
      .pipe(
        startWith(0),
        takeUntil(this.unsubscribe$),
      )
      .subscribe(() => {
        if(this.isSimulation){
          this.droneService.getData().subscribe((res: ServerSimDrone[]) => {
            for(let i=0; res.length; i++){
              const droneIndex = this.simDrones.findIndex((r) => r.name === res[i].name);
              if (droneIndex === -1) {
                this.simDrones.push(res[i] as Drone);
              } else {
                Object.assign(this.simDrones[droneIndex], res[i]);
              }
            }
          },
          (error: number)=>{
            
          },
          )
          this.missionEnded = this.checkMissionEnd(this.simDrones);
        }

        this.droneService.getLogs().subscribe(res => {
          this.droneService.logs = [];
          for(let i=0; res.length; i++){
            this.droneService.logs.unshift({
              date: new Date(res[i].timestamp * 1000).toString(),
              message: res[i].log,
            });
          }
        })  
      });
      interval(900)
      .pipe(
        startWith(0),
        takeUntil(this.unsubscribe$),
      )
      .subscribe(() => {
        if(!this.isSimulation){
          this.droneService.getCFData().subscribe(res => {
            for(let i=0; res.length; i++){
              const droneIndex = this.realDrones.findIndex((r) => r.name === res[i].name);
              if (droneIndex === -1) {
                this.realDrones.push(res[i] as Drone);
              } else {
              Object.assign(this.realDrones[droneIndex], res[i]);
            }
            }
        },
        (error)=>{

        })
        this.missionEnded = this.checkRealMissionEnd(this.realDrones);
      }
    });
  }

  ngOnDestroy(): void{
    this.unsubscribe$.next();
    this.unsubscribe$.complete();
  }

  onSliderClick(): void{
    this.droneService.isSimulation = !this.isSimulation;
  }

  checkMissionEnd(simDrones: Drone[]): boolean{
    if(this.simDrones.length === 0) {
      return false;
    }

    for(let i=0; i< simDrones.length; i++){
      if(simDrones[i].state != 'landed'){
        return false;
      }
    }
    this.saveMission();
    return true;
  }

  checkRealMissionEnd(realDrones: Drone[]): boolean{

    for(let i=0; i< realDrones.length; i++){
      if(realDrones[i].state != 'landed'){
          return false;
      }
    }
    this.missionEnded =true;
    this.saveMission();
    return true;
  }

  startMission(): void {
    if(this.isSimulation) this.simDrones[0].state = "not_landed";
    this.droneService.missionSaved = false;
    this.droneService.missionCanceled =false;
    this.missionEnded = false;
    let startMissionCommand = {} as CommandStruct;
    if(this.isSimulation) {
      startMissionCommand = {
        droneURI: "this.droneData.name",
        command: Command.StartMission
      };
      this.droneService.sendCommand(startMissionCommand).subscribe();
    }else{
      let startMissionCommand1 = {} as CommandStruct;
      let startMissionCommand2 = {} as CommandStruct;
      startMissionCommand1 = {
        droneURI: this.droneService.mapRealDrones[0].name,
        command: Command.StartMission
      };
      startMissionCommand2 = {
        droneURI: this.droneService.mapRealDrones[1].name,
        command: Command.StartMission
      };
      this.droneService.sendCommand(startMissionCommand1).subscribe();
      this.droneService.sendCommand(startMissionCommand2).subscribe();
    }
    this.droneService.startMissionTime = new Date();
  }

  cancelMission(): void {
    this.droneService.missionCanceled = true;
    let landMissionCommand  = {} as CommandStruct;
    if(this.isSimulation) {
      landMissionCommand = {
        droneURI: "this.droneData.name",
        command: Command.Land
        };
        this.droneService.sendCommand(landMissionCommand).subscribe();
    }else{
      let landMissionCommand1  = {} as CommandStruct;
      let landMissionCommand2 = {} as CommandStruct;
      landMissionCommand1 = {
        droneURI: this.droneService.mapRealDrones[0].name,
        command: Command.Land
        };

        landMissionCommand2 = {
          droneURI: this.droneService.mapRealDrones[1].name,
          command: Command.Land
          };
          this.droneService.sendCommand(landMissionCommand1).subscribe();
          this.droneService.sendCommand(landMissionCommand2).subscribe();
    }
  }

  returnToBase(): void{
    if(this.isSimulation) {
      let baseCommand = {} as CommandStruct;
      baseCommand= {
        droneURI: "this.droneData.name",
        command: Command.Base
      };
      this.droneService.sendCommand(baseCommand).subscribe();
    }else {
      let baseCommand1 = {} as CommandStruct;
      let baseCommand2 = {} as CommandStruct;
      baseCommand1= {
        droneURI: this.droneService.mapRealDrones[0].name,
        command: Command.Base
      };
      baseCommand2= {
        droneURI: this.droneService.mapRealDrones[1].name,
        command: Command.Base
      };
      this.droneService.sendCommand(baseCommand1).subscribe();
      this.droneService.sendCommand(baseCommand2).subscribe();
    }
  }
  
  saveMission(): void {
    if(!this.isSimulation) this.missionEnded = true;
    if(this.droneService.missionSaved === false && this.missionEnded && !this.droneService.missionCanceled){
      this.droneService.missionSaved = true;
      const dateNow: Date = new Date();
      let Duration = require("duration");
      this.travelTime = new Duration(this.droneService.startMissionTime, dateNow).seconds;
      let mission = {} as Mission;
      
      if(this.isSimulation === true){
        mission = {
          id: Math.round(Math.random() + dateNow.valueOf()),
          drones: this.droneService.mapSimDrones,
          allPoints: this.droneService.simPoints,
          dronesPoints: JSON.stringify(this.droneService.simDronesPoints),
          type: "simulation",
          date: dateNow.toUTCString(),
          nDrones: this.droneService.mapSimDrones.length,
          travelTime: this.travelTime,
          logs: this.droneService.logs
        };

      }else{
        mission = {
          id: Math.round(Math.random() + dateNow.valueOf()),
          drones: this.droneService.mapRealDrones,
          allPoints: this.droneService.realPoints,
          dronesPoints: JSON.stringify(this.droneService.realDronesPoints),
          type: "real",
          date: dateNow.toUTCString(),
          nDrones: this.droneService.mapRealDrones.length,
          travelTime: this.travelTime,
          logs: this.droneService.logs
        };
      }
      this.angularFirestore.collection('crazyflieApp').add(mission).then((response)=>{
        this.openSnackBar('La mission a été sauvegardé avec succès', 'Fermer', 'green-snackbar');
      }).catch((error)=>{
        this.openSnackBar('la base de données est actuellement indisponible', 'Fermer', 'red-snackbar');
      });
    }
  }

  openSnackBar(message: string, action: string, type: string): void {
    this.snackBar.open(message, action, {
        duration: 4000,
        verticalPosition: 'bottom',
        panelClass: [type],
    });
}
}
