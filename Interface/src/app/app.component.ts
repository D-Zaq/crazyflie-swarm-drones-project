import { Component, OnInit, OnDestroy } from '@angular/core';
import {Subscription} from 'rxjs/Subscription';
import {DronesService} from './services/drones/drones.service';
import {IDrone} from './objects/drones';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'Interface';
  // title = 'app'
  // dronesListSubs: Subscription = new Subscription;
  // dronesList: IDrone[] = [];

  // constructor(private droneApi: DronesService) {
  // }

  // ngOnInit() {
  //   this.dronesListSubs = this.droneApi
  //     .getDrones()
  //     .subscribe((res: IDrone[]) => {
  //         this.dronesList = res;
  //       },
  //       console.error
  //     );
  // }

  // ngOnDestroy() {
  //   this.dronesListSubs.unsubscribe();
  // }
}
