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
  orderOption: string = "Date (descendant)";
  options: string[] = ['Date (descendant)', 'Date (ascendant)','Id (ascendant)', 'Id (descendant)', 'Simulation missions', 'Real missions', 'Travel time (ascendant)', 'Travel time (descendant)', 'Number of drones (ascendant)', 'Number of drones (descendant)'];

  constructor(public droneService: DronesService, public angularFirestore: AngularFirestore) { }

  ngOnInit(): void {
    // missions = this.droneService.mission;
    this.angularFirestore.collection("crazyflieApp", ref => ref.orderBy("date", "desc")).get().subscribe((response)=>{
      response.forEach((data) => {
        this.missions.push(data.data() as unknown as Mission);
      })
    }, 
    (error) => {
    }
    );
  }

  deleteAllMissions(): void{
    this.angularFirestore.collection("crazyflieApp").get().subscribe((response)=>{
      response.forEach((data) => {
        data.ref.delete();
      })
    }, 
    (error) => {
    }
    );
  }

  onOrder(value: string): void{
    if(value != this.orderOption){

      if(value === 'Date (descendant)'){
        this.order("date", "desc");
      }else if(value === 'Date (ascendant)'){
        this.order("date", "asc");
      }else if(value=== 'Id (ascendant)'){
        this.order("id", "asc");
      }else if(value === 'Id (descendant)'){
        this.order("id", "desc");
      }else if(value=== 'Simulation missions'){
        this.missions.length = 0;
        this.angularFirestore.collection("crazyflieApp", ref => ref.where("type","==", "simulation")).get().subscribe((response)=>{
          response.forEach((data) => {
            this.missions.push(data.data() as unknown as Mission);
          })
        }, 
        (error) => {
        }
        );
      }else if(value=== 'Real missions'){
        this.missions.length = 0;
        this.angularFirestore.collection("crazyflieApp", ref => ref.where("type","==", "real")).get().subscribe((response)=>{
          response.forEach((data) => {
            this.missions.push(data.data() as unknown as Mission);
          })
        }, 
        (error) => {
        }
        );
      }else if(value=== 'Number of drones (ascendant)'){
        this.order("nDrones", "asc");
      }else if(value=== 'Number of drones (descendant)'){
        this.order("nDrones", "desc");
      }else if(value=== 'Travel time (ascendant)'){
        this.order("travelTime", "asc");
      }else if(value=== 'Travel time (descendant)'){
        this.order("travelTime", "desc");
      }
    }
  }

  order(field: string, query:any): void{
    this.missions.length = 0;
    this.angularFirestore.collection("crazyflieApp", ref => ref.orderBy(field, query)).get().subscribe((response)=>{
      response.forEach((data) => {
        this.missions.push(data.data() as unknown as Mission);
      })
    }, 
    (error) => {
    }
    );
  }

}
