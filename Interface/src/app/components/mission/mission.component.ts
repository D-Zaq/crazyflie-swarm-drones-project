import { Component, OnInit, ViewChild } from '@angular/core';
import { interval, Subject } from 'rxjs';
import { startWith, takeUntil } from 'rxjs/operators';
import { MAX_REAL_RANGE, MAX_SIM_RANGE, REAL_DISTANCE_SCALE, SIM_DISTANCE_SCALE } from 'src/app/constants/constants';
import { Drone, DRONE_1, DRONE_2, MapDrone } from 'src/app/objects/drones';
import { Vec2 } from 'src/app/objects/vec2';
import { DronesService } from 'src/app/services/drones/drones.service';


// export interface Vec2 {
//   x: number;
//   y: number;
// }


@Component({
  selector: 'app-mission',
  templateUrl: './mission.component.html',
  styleUrls: ['./mission.component.scss']
})
export class MissionComponent implements OnInit {

  // mapSimDrones: MapDrone[] = [];
  private unsubscribe$ = (new Subject<void>());
  // simPoints: Vec2[]= [];
  realPoints: Vec2[]= [];
  
  constructor(public droneService:DronesService) {
    
  }

  ngOnInit(): void {
      interval(233)
      .pipe(
        startWith(0),
        takeUntil(this.unsubscribe$),
      )
      .subscribe(() => {
        if(this.droneService.isSimulation){
          this.droneService.getSimMapData().subscribe(res => {
          for(let i=0; res.length; i++){
            const drone= {} as MapDrone;
            drone.name = res[i].name;
            drone.xPosition = res[i].xPosition;
            drone.yPosition = res[i].yPosition;
            drone.angle = res[i].angle;
            drone.frontDistance = res[i].frontDistance;
            drone.backDistance = res[i].backDistance;
            drone.rightDistance = res[i].rightDistance;
            drone.leftDistance = res[i].leftDistance;
            drone.state = res[i].state;
            drone.id = res[i].id;

            const droneIndex = this.droneService.mapSimDrones.findIndex((r) => r.name === res[i].name);
            if (droneIndex === -1) {
              this.droneService.mapSimDrones.push(drone);
            } else {
              Object.assign(this.droneService.mapSimDrones[droneIndex], drone);
            }

            this.addSimPoint(this.droneService.mapSimDrones[i]);  
          }
          },
          (error)=>{})
        }  
      });

      interval(53)
      .pipe(
        startWith(0),
        takeUntil(this.unsubscribe$),
      )
      .subscribe(() => {
        if(!this.droneService.isSimulation){
            this.droneService.getRealMapData().subscribe(res => {
              const drone= {} as MapDrone;
              drone.xPosition = res.xPosition;
              drone.yPosition = -res.yPosition / 2;
              drone.angle = res.angle;
              drone.frontDistance = res.frontDistance;
              drone.backDistance = res.backDistance;
              drone.leftDistance = res.leftDistance;
              drone.rightDistance = res.rightDistance;
              drone.state = res.state;

              if (res.name == this.droneService.mapRealDrones[0].name) {
                Object.assign(this.droneService.mapRealDrones[0], drone);
                this.addRealPoint(this.droneService.mapRealDrones[0]);  
              } else {
                Object.assign(this.droneService.mapRealDrones[1], drone);
                this.addRealPoint(this.droneService.mapRealDrones[1]); 
              }
            },
            (error)=>{

            })
        }
      });
  }

  ngOnDestroy(){
    this.unsubscribe$.next();
    this.unsubscribe$.complete();
  }

  addSimPoint(MapDrone:MapDrone): void{
    if(MapDrone.frontDistance < MAX_SIM_RANGE) {
      const p = {} as Vec2;
      p.x = MapDrone.frontDistance * -SIM_DISTANCE_SCALE + MapDrone.yPosition;
      p.y = MapDrone.xPosition;
      this.droneService.simPoints.push(p);
    }

    if(MapDrone.backDistance < MAX_SIM_RANGE) {
      const p = {} as Vec2;
      p.x = MapDrone.backDistance * SIM_DISTANCE_SCALE + MapDrone.yPosition;
      p.y = MapDrone.xPosition;
      this.droneService.simPoints.push(p);
    }

    if(MapDrone.leftDistance < MAX_SIM_RANGE) {
      const p = {} as Vec2;
      p.x = MapDrone.yPosition;
      p.y = MapDrone.leftDistance * SIM_DISTANCE_SCALE + MapDrone.xPosition;
      this.droneService.simPoints.push(p);
    }

    if(MapDrone.rightDistance < MAX_SIM_RANGE) {
      const p = {} as Vec2;
      p.x = MapDrone.yPosition;
      p.y = MapDrone.rightDistance * -SIM_DISTANCE_SCALE + MapDrone.xPosition;
      this.droneService.simPoints.push(p);
    }
  }

  addRealPoint(MapDrone:MapDrone): void{
    if(MapDrone.frontDistance < MAX_REAL_RANGE) {
      const p = {} as Vec2;
      p.x = MapDrone.frontDistance * REAL_DISTANCE_SCALE + MapDrone.yPosition;
      p.y = MapDrone.xPosition;
      this.realPoints.push(p);
    }

    if(MapDrone.backDistance < MAX_REAL_RANGE) {
      const p = {} as Vec2;
      p.x = MapDrone.backDistance * -REAL_DISTANCE_SCALE + MapDrone.yPosition;
      p.y = MapDrone.xPosition;
      this.realPoints.push(p);
    }

    if(MapDrone.leftDistance < MAX_REAL_RANGE) {
      const p = {} as Vec2;
      p.x = MapDrone.yPosition;
      p.y = MapDrone.leftDistance * -REAL_DISTANCE_SCALE + MapDrone.xPosition;
      this.realPoints.push(p);
    }

    if(MapDrone.rightDistance < MAX_REAL_RANGE) {
      const p = {} as Vec2;
      p.x = MapDrone.yPosition;
      p.y = MapDrone.rightDistance * REAL_DISTANCE_SCALE + MapDrone.xPosition;
      this.realPoints.push(p);
    }
  }
}
