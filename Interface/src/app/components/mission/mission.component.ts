import { Component, OnInit, ViewChild } from '@angular/core';
import { interval, Subject } from 'rxjs';
import { startWith, takeUntil } from 'rxjs/operators';
import { MAX_REAL_RANGE, MAX_SIM_RANGE, REAL_DISTANCE_SCALE, SIM_DISTANCE_SCALE } from 'src/app/constants/constants';
import { Drone, DRONE_1, DRONE_2, MapDrone } from 'src/app/objects/drones';
import { Vec2 } from 'src/app/objects/vec2';
import { DronesService } from 'src/app/services/drones/drones.service';


@Component({
  selector: 'app-mission',
  templateUrl: './mission.component.html',
  styleUrls: ['./mission.component.scss']
})
export class MissionComponent implements OnInit {

  private unsubscribe$ = (new Subject<void>());
  
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

      interval(243)
      .pipe(
        startWith(0),
        takeUntil(this.unsubscribe$),
      )
      .subscribe(() => {
        if(!this.droneService.isSimulation){  
          this.droneService.getRealMapData().subscribe(res => {
            for(let i=0; res.length; i++){
              const drone= {} as MapDrone;
              drone.xPosition = res[i].xPosition;
              drone.yPosition = -res[i].yPosition / 2;
              drone.angle = res[i].angle;
              drone.frontDistance = res[i].frontDistance;
              drone.backDistance = res[i].backDistance;
              drone.leftDistance = res[i].leftDistance;
              drone.rightDistance = res[i].rightDistance;
              drone.state = res[i].state;

              const droneIndex = this.droneService.mapRealDrones.findIndex((r) => r.name === res[i].name);
            if (droneIndex === -1) {
              this.droneService.mapRealDrones.push(drone);
            } else {
              Object.assign(this.droneService.mapRealDrones[droneIndex], drone);
            }

            this.addRealPoint(this.droneService.mapRealDrones[i]); 
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
      p.x = MapDrone.frontDistance * REAL_DISTANCE_SCALE + MapDrone.xPosition;
      p.y = MapDrone.yPosition;
      this.droneService.realPoints.push(p);
    }

    if(MapDrone.backDistance < MAX_REAL_RANGE) {
      const p = {} as Vec2;
      p.x = MapDrone.backDistance * -REAL_DISTANCE_SCALE + MapDrone.xPosition;
      p.y = MapDrone.yPosition;
      this.droneService.realPoints.push(p);
    }

    if(MapDrone.leftDistance < MAX_REAL_RANGE) {
      const p = {} as Vec2;
      p.x = MapDrone.xPosition;
      p.y = MapDrone.leftDistance * -REAL_DISTANCE_SCALE + MapDrone.yPosition;
      this.droneService.realPoints.push(p);
    }

    if(MapDrone.rightDistance < MAX_REAL_RANGE) {
      const p = {} as Vec2;
      p.x = MapDrone.xPosition;
      p.y = MapDrone.rightDistance * REAL_DISTANCE_SCALE + MapDrone.yPosition;
      this.droneService.realPoints.push(p);
    }
  }
}
