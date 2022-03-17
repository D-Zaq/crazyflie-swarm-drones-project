import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { interval, Subject } from 'rxjs';
import { startWith, switchMap, takeUntil } from 'rxjs/operators';
import {Drone, DRONE_1, DRONE_2, SIM_DRONE_1, SIM_DRONE_2 } from 'src/app/objects/drones';
import { DronesService } from 'src/app/services/drones/drones.service';

@Component({
  selector: 'app-main-page',
  templateUrl: './main-page.component.html',
  styleUrls: ['./main-page.component.scss']
})
export class MainPageComponent implements OnInit {
  
  realDrones: Drone[] = [DRONE_1, DRONE_2];
  simDrones: Drone[] = [SIM_DRONE_1, SIM_DRONE_2];
  private unsubscribe$ = (new Subject<void>());
  isSimulation = true;
  
  constructor(public droneService:DronesService) {
    
  }

  ngOnInit(): void {
    interval(10000)
      .pipe(
        startWith(0),
        takeUntil(this.unsubscribe$),
      )
      .subscribe(() => this.droneService.getData().subscribe(res => {
        if(res.name == this.simDrones[0].identifier){
          this.simDrones[0].speed = res.speed;
          this.simDrones[0].battery = res.battery;
          this.simDrones[0].xPosition = res.xPosition;
          this.simDrones[0].yPosition = res.yPosition;
          this.simDrones[0].zPosition = res.zPosition;
          this.simDrones[0].angle = res.angle;
        }
        else if(res.name == this.simDrones[1].identifier){
          this.simDrones[1].speed = res.speed;
          this.simDrones[1].battery = res.battery;
          this.simDrones[1].xPosition = res.xPosition;
          this.simDrones[1].yPosition = res.yPosition;
          this.simDrones[1].zPosition = res.zPosition;
          this.simDrones[1].angle = res.angle;
        } 
      }));
  }

  ngOnDestroy(){
    this.unsubscribe$.next();
    this.unsubscribe$.complete();
  }

  onSliderClick(){
    this.droneService.isSimulation = this.isSimulation;
  }

}
