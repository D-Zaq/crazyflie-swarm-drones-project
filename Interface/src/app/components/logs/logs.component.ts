import { Component, OnInit } from '@angular/core';
import { interval, Subject} from 'rxjs';
import { startWith, takeUntil } from 'rxjs/operators';
import { DronesService } from 'src/app/services/drones/drones.service';



@Component({
  selector: 'app-logs',
  templateUrl: './logs.component.html',
  styleUrls: ['./logs.component.scss']
})
export class LogsComponent implements OnInit {

  
  private unsubscribe = (new Subject<void>());

  constructor(public droneService: DronesService) { }

  ngOnInit(): void {
    interval(1000)
      .pipe(
        startWith(0),
        takeUntil(this.unsubscribe),
      )
      .subscribe(()=>this.droneService.getLogs().subscribe(res => {
        this.droneService.logs = [];
        for(let i=0; res.length; i++){
          this.droneService.logs.unshift({
            date: new Date(res[i].timestamp * 1000).toString(),
            message: res[i].log,
          });
        }
      }));
  }

  ngOnDestroy(){
    this.unsubscribe.next();
    this.unsubscribe.complete();
  }

}
