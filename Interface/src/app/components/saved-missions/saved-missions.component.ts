import { Component, OnInit } from '@angular/core';
import { DronesService } from 'src/app/services/drones/drones.service';

@Component({
  selector: 'app-saved-missions',
  templateUrl: './saved-missions.component.html',
  styleUrls: ['./saved-missions.component.scss']
})
export class SavedMissionsComponent implements OnInit {

  isExpanded:boolean = false;
  constructor(public droneService:DronesService) { }

  ngOnInit(): void {
  }

  onExpand(){
    this.isExpanded = !this.isExpanded;
  }

}
