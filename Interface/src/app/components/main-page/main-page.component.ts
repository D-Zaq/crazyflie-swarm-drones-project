import { Component, OnInit } from '@angular/core';
import { interval, Subject } from 'rxjs';
import { startWith, switchMap, takeUntil } from 'rxjs/operators';
import { Drone, DRONE_1, DRONE_2 } from 'src/app/objects/drones';
import { DronesService } from 'src/app/services/drones/drones.service';

@Component({
  selector: 'app-main-page',
  templateUrl: './main-page.component.html',
  styleUrls: ['./main-page.component.scss']
})
export class MainPageComponent implements OnInit {

  drones: Drone[] = [DRONE_1, DRONE_2];
  private unsubscribe$ = (new Subject<void>());
  
  constructor(public droneService:DronesService) { }

  ngOnInit(): void {
    interval(10000)
      .pipe(
        startWith(0),
        takeUntil(this.unsubscribe$),
      )
      .subscribe(() => this.droneService.getData().subscribe(res => this.drones[1].battery = res));
  }

  ngOnDestroy(){
    this.unsubscribe$.next();
    this.unsubscribe$.complete();
  }

}
