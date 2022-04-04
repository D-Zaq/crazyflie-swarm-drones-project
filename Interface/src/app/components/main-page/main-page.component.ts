import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { interval, Subject } from 'rxjs';
import { startWith, switchMap, takeUntil } from 'rxjs/operators';
import {Drone, DRONE_1, DRONE_2, SIM_DRONE_1, SIM_DRONE_10, SIM_DRONE_2, SIM_DRONE_3, SIM_DRONE_4, SIM_DRONE_5, SIM_DRONE_6, SIM_DRONE_7, SIM_DRONE_8, SIM_DRONE_9 } from 'src/app/objects/drones';
import { DronesService } from 'src/app/services/drones/drones.service';

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
  // @ViewChild('svg', {
  //   static: false,
  // })
  // svgRef: ElementRef<SVGSVGElement>;

  realDrones: Drone[] = [DRONE_1, DRONE_2];
  simDrones: Drone[] = [];
  private unsubscribe$ = (new Subject<void>());
  isSimulation = true;
  points: Vec2[]= [];
  
  constructor(public droneService:DronesService) {
    
  }

  ngOnInit(): void {
    interval(1000)
      .pipe(
        startWith(0),
        takeUntil(this.unsubscribe$),
      )
      .subscribe(() => this.droneService.getData().subscribe(res => {
        for(let i=0; res.length; i++){
          const droneIndex = this.simDrones.findIndex((r) => r.name === res[i].name);
          if (droneIndex === -1) {
            this.simDrones.push(res[i] as Drone);
          } else {
            Object.assign(this.simDrones[droneIndex], res[i]);
          }
          // this.addPoint(this.simDrones[i]);  
        }
      }));
      interval(800)
      .pipe(
        startWith(0),
        takeUntil(this.unsubscribe$),
      )
      .subscribe(() => this.droneService.getCFData().subscribe(res => {
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
      }));
  }

  ngOnDestroy(){
    this.unsubscribe$.next();
    this.unsubscribe$.complete();
  }

  onSliderClick(): void{
    this.droneService.isSimulation = !this.droneService.isSimulation;
  }

  // addPoint(simDrone:Drone): void{
  //   if(simDrone.frontDistance < 65510) {
  //     const p = {} as Vec2;
  //     p.x = simDrone.frontDistance * -0.01 + simDrone.yPosition;
  //     p.y = simDrone.xPosition;
  //     this.points.push(p);
  //   }

  //   if(simDrone.backDistance < 65510) {
  //     const p = {} as Vec2;
  //     p.x = simDrone.backDistance * 0.01 + simDrone.yPosition;
  //     p.y = simDrone.xPosition;
  //     this.points.push(p);
  //   }

  //   if(simDrone.leftDistance < 65510) {
  //     const p = {} as Vec2;
  //     p.x = simDrone.yPosition;
  //     p.y = simDrone.leftDistance * 0.01 + simDrone.xPosition;
  //     this.points.push(p);
  //   }

  //   if(simDrone.rightDistance < 65510) {
  //     const p = {} as Vec2;
  //     p.x = simDrone.yPosition;
  //     p.y = simDrone.rightDistance * -0.01 + simDrone.xPosition;
  //     this.points.push(p);
  //   }
  // }
}
