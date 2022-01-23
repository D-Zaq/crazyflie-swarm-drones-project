import { Component, OnInit, OnDestroy } from '@angular/core';
import {Subscription} from 'rxjs/Subscription';
import {DronesService} from './services/drones/drones.service';
import {DroneC} from './objects/drones';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit, OnDestroy{
  // title = 'Interface';
  title = 'app'
  dronesListSubs: Subscription;
  dronesList: DroneC[] = [];

  constructor(private droneApi: DronesService) {
  }

  ngOnInit() {
    this.dronesListSubs = this.droneApi
      .getDrones()
      .subscribe((res: DroneC[]) => {
          this.dronesList = res;
        },
        console.error
      );
  }

  ngOnDestroy() {
    this.dronesListSubs.unsubscribe();
  }
}
