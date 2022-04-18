import { Component, Input, OnInit } from '@angular/core';
import { Mission } from 'src/app/objects/mission';
import { DronesService } from 'src/app/services/drones/drones.service';

@Component({
  selector: 'app-saved-missions',
  templateUrl: './saved-missions.component.html',
  styleUrls: ['./saved-missions.component.scss']
})
export class SavedMissionsComponent implements OnInit {

  isExpanded:boolean = false;
  @Input() mission = {} as Mission;
  // timeInMinutes: any;
  timeInSecondes: any;
  constructor(public droneService:DronesService) { }

  ngOnInit(): void {
    this.mission.dronesPoints = JSON.parse(this.mission.dronesPoints);
    // this.timeInMinutes = this.mission.travelTime.minutes;
  }

  onExpand(){
    this.isExpanded = !this.isExpanded;
  }
}
