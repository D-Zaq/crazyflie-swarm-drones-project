import { Component, OnInit } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { Mission } from 'src/app/objects/mission';
import { DronesService } from 'src/app/services/drones/drones.service';

@Component({
  selector: 'app-saved-missions-page',
  templateUrl: './saved-missions-page.component.html',
  styleUrls: ['./saved-missions-page.component.scss']
})
export class SavedMissionsPageComponent implements OnInit {

  missions: Mission[] =[];
  string = "nnnnnnnnnnnnnnnnnnnn";

  constructor(public droneService: DronesService, public angularFirestore: AngularFirestore) { }

  ngOnInit(): void {
    // missions = this.droneService.mission;
    this.angularFirestore.collection("crazyflieApp").get().subscribe((response)=>{
      response.forEach((data) => {
        this.missions.push(data.data() as unknown as Mission);
      })
    }, 
    (error) => {
      this.string = "saaaaaaaaaaaaaaaaaaaaaavvv errrrrrreeeeeeeur";
    }
    );

  }

}
