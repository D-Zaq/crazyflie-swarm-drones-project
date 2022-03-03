import { Component, OnInit } from '@angular/core';
import { SideBarComponent } from '../side-bar/side-bar.component';
import { Log } from 'src/app/objects/logs';

@Component({
  selector: 'app-log-page',
  templateUrl: './log-page.component.html',
  styleUrls: ['./log-page.component.scss']
})
export class LogPageComponent {
  sideBarComponent: SideBarComponent = new SideBarComponent();
  log: Log;
  logArray: Log[];

  constructor() {
      this.sideBarComponent.hideSidebar();
      this.log = {
        StartTime: "start time",
        EndTime: "end time",
        X: 0,
        Y: 0,
        Z: 0,
        Battery: 0,
        Speed: 0,
        RotationAngle: 0
      }
      this.logArray = [this.log, {
        StartTime: "start time 2",
        EndTime: "end time 2",
        X: 1,
        Y: 1,
        Z: 0,
        Battery: 0,
        Speed: 0,
        RotationAngle: 0
      }
      ];
      
   }

  ngOnInit(): void {
  }

}
