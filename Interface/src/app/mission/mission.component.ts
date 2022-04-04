import { Component, OnInit, ViewChild } from '@angular/core';
import { interval, Subject } from 'rxjs';
import { startWith, takeUntil } from 'rxjs/operators';
import { Drone, DRONE_1, DRONE_2, mapDrone, MAX_SIM_RANGE } from '../objects/drones';
import { DronesService } from '../services/drones/drones.service';


export interface Vec2 {
  x: number;
  y: number;
}

export interface Point {
  point: Vec2;
}

@Component({
  selector: 'app-mission',
  templateUrl: './mission.component.html',
  styleUrls: ['./mission.component.scss']
})
export class MissionComponent implements OnInit {
  // @ViewChild('svg', {
  //   static: false,
  // })
  // svgRef: ElementRef<SVGSVGElement>;

  mapDrones: mapDrone[] = [];
  private unsubscribe$ = (new Subject<void>());
  points: Vec2[]= [];
  
  constructor(public droneService:DronesService) {
    
  }

  ngOnInit(): void {
    interval(233)
      .pipe(
        startWith(0),
        takeUntil(this.unsubscribe$),
      )
      .subscribe(() => this.droneService.getMapData().subscribe(res => {
        for(let i=0; res.length; i++){

          const droneIndex = this.mapDrones.findIndex((r) => r.name === res[i].name);
          if (droneIndex === -1) {
            const drone= {} as mapDrone;
            drone.name = res[i].name;
            drone.xPosition = res[i].xPosition;
            drone.yPosition = res[i].yPosition;
            drone.angle = res[i].angle;
            drone.frontDistance = res[i].frontDistance;
            drone.backDistance = res[i].backDistance;
            drone.rightDistance = res[i].rightDistance;
            drone.leftDistance = res[i].leftDistance;
            this.mapDrones.push(drone);
          } else {
            const drone= {} as mapDrone;
            drone.name = res[i].name;
            drone.xPosition = res[i].xPosition;
            drone.yPosition = res[i].yPosition;
            drone.angle = res[i].angle;
            drone.frontDistance = res[i].frontDistance;
            drone.backDistance = res[i].backDistance;
            drone.rightDistance = res[i].rightDistance;
            drone.leftDistance = res[i].leftDistance;
            Object.assign(this.mapDrones[droneIndex], drone);
          }
          this.addPoint(this.mapDrones[i]);  
        }
      }));
  }

  ngOnDestroy(){
    this.unsubscribe$.next();
    this.unsubscribe$.complete();
  }

  addPoint(mapDrone:mapDrone): void{
    if(mapDrone.frontDistance < MAX_SIM_RANGE) {
      const p = {} as Vec2;
      p.x = mapDrone.frontDistance * -0.01 + mapDrone.yPosition;
      p.y = mapDrone.xPosition;
      this.points.push(p);
    }

    if(mapDrone.backDistance < MAX_SIM_RANGE) {
      const p = {} as Vec2;
      p.x = mapDrone.backDistance * 0.01 + mapDrone.yPosition;
      p.y = mapDrone.xPosition;
      this.points.push(p);
    }

    if(mapDrone.leftDistance < MAX_SIM_RANGE) {
      const p = {} as Vec2;
      p.x = mapDrone.yPosition;
      p.y = mapDrone.leftDistance * 0.01 + mapDrone.xPosition;
      this.points.push(p);
    }

    if(mapDrone.rightDistance < MAX_SIM_RANGE) {
      const p = {} as Vec2;
      p.x = mapDrone.yPosition;
      p.y = mapDrone.rightDistance * -0.01 + mapDrone.xPosition;
      this.points.push(p);
    }
  }
}
