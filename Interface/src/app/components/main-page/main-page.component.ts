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
  missionEnded: boolean = true;
  travelTime: number | any= 0;
  constructor(public droneService:DronesService, public angularFirestore: AngularFirestore, private snackBar: MatSnackBar) {
    
  }

  ngOnInit(): void {
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
          this.missionEnded = this.checkMissionEnd();
        }
      });
      interval(900)
      .pipe(
        startWith(0),
        takeUntil(this.unsubscribe$),
      )
      .subscribe(() => {
        if(!this.isSimulation){
          this.droneService.getCFData().subscribe(res => {
          if(res.name == this.realDrones[0].name){
            this.realDrones[0].speed = res.speed;
            this.realDrones[0].battery = res.battery;
            this.realDrones[0].xPosition = res.xPosition;
            this.realDrones[0].yPosition = res.yPosition;
            this.realDrones[0].zPosition = res.zPosition;
            this.realDrones[0].angle = res.angle;
            this.realDrones[0].frontDistance = res.frontDistance;
            this.realDrones[0].backDistance = res.backDistance;
            this.realDrones[0].leftDistance = res.leftDistance;
            this.realDrones[0].rightDistance = res.rightDistance;
            this.realDrones[0].state = res.state;
          }
          else if(res.name == this.realDrones[1].name){
            this.realDrones[1].speed = res.speed;
            this.realDrones[1].battery = res.battery;
            this.realDrones[1].xPosition = res.xPosition;
            this.realDrones[1].yPosition = res.yPosition;
            this.realDrones[1].zPosition = res.zPosition;
            this.realDrones[1].angle = res.angle;
            this.realDrones[1].frontDistance = res.frontDistance;
            this.realDrones[1].backDistance = res.backDistance;
            this.realDrones[1].leftDistance = res.leftDistance;
            this.realDrones[1].rightDistance = res.rightDistance;
            this.realDrones[1].state = res.state;
          }
        },
        (error)=>{

        })
      }
    });
  }

  ngOnDestroy(): void{
    this.unsubscribe$.next();
    this.unsubscribe$.complete();
  }

  onSliderClick(): void{
    this.droneService.isSimulation = !this.droneService.isSimulation;
  }

  checkMissionEnd(): boolean{
    // if(this.droneService.mapSimDrones.length === 0) {
    //   return false;
    // }

    // for(let i=0; this.droneService.mapSimDrones.length; i++){
    //   if(this.droneService.mapSimDrones[i].state != 'on_the_ground'){
    //     return false;
    //   }
    // }
    // this.droneService.saveMission();
    return true;
  }

  startMission(): void {
    let startMissionCommand = {} as CommandStruct;
    if(this.isSimulation) {
      startMissionCommand = {
        droneURI: "this.droneData.name",
        command: Command.StartMission
      };
    }
    this.droneService.sendCommand(startMissionCommand).subscribe();
    this.droneService.startMissionTime = new Date();
  }

  cancelMission(): void {
    let landMissionCommand  = {} as CommandStruct;
    if(this.isSimulation) {
      landMissionCommand = {
        droneURI: "this.droneData.name",
        command: Command.Land
        };
    }
    this.droneService.sendCommand(landMissionCommand).subscribe();
  }

  returnToBase(): void{
    let baseCommand = {} as CommandStruct;
    if(this.isSimulation) {
      baseCommand= {
        droneURI: "this.droneData.name",
        command: Command.Base
      };
    }
    this.droneService.sendCommand(baseCommand).subscribe();
  }
  
  saveMission(): void {
    const dateNow: Date = new Date();
    var Duration = require("duration");
    // this.travelTime = new Duration(this.droneService.startMissionTime, dateNow);
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
        // travelTime: this.travelTime
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
        // travelTime: this.travelTime
      };
    }
    this.angularFirestore.collection('crazyflieApp').add(mission).then((response)=>{
      this.openSnackBar('La mission a été sauvegardé avec succès', 'Fermer', 'green-snackbar');
    }).catch((error)=>{
      this.openSnackBar('la base de données est actuellement indisponible', 'Fermer', 'red-snackbar');
    });
  }

  openSnackBar(message: string, action: string, type: string): void {
    this.snackBar.open(message, action, {
        duration: 4000,
        verticalPosition: 'bottom',
        panelClass: [type],
    });
}
}
