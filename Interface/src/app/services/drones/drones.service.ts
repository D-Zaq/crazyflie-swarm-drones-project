import { Injectable } from '@angular/core';
import {HttpClient, HttpErrorResponse} from '@angular/common/http';
import {Observable} from 'rxjs/Observable';
import 'rxjs/add/operator/catch';
import {CommandStruct, Drone, MapDrone, MAP_DRONE_1, MAP_DRONE_2} from '../../objects/drones';
import {API_URL} from '../../env';
import { Vec2 } from 'src/app/objects/vec2';
import { Mission} from 'src/app/objects/mission';
import { catchError } from 'rxjs/operators';
import { of } from 'rxjs';
// import {IDrone} from '../../objects/drones';

export type ServerLog = { 
  log: string; 
  timestamp: number;
};

export type ServerSimDrone = { 
  id: string;
  name: string;
  speed: string;
  battery: string;
  xPosition: number;
  yPosition: number;
  zPosition: string;
  angle: string;
  frontDistance: string;
  backDistance: string;
  leftDistance: string;
  rightDistance: string;
  state:string;
};

export type ServerRealDrone = { 
  name: string;
  speed: string;
  battery: string;
  xPosition: number;
  yPosition: number;
  zPosition: number;
  angle: string;
  frontDistance: string;
  backDistance: string;
  leftDistance: string;
  rightDistance: string;
  state:string;
};


export type InterfaceLog = {
  date: string;
  message: string;
};

@Injectable({
  providedIn: 'root'
})
export class DronesService {
  //TODO : add return types to methods

  // constructor() { }
  public isSimulation = true;
  mapSimDrones: MapDrone[] = [];
  mapRealDrones: MapDrone[] = [MAP_DRONE_1, MAP_DRONE_2];
  simDronesPoints: Vec2[][] = [[{x:0,y:0}],[{x:0,y:0}], [{x:0,y:0}],[{x:0,y:0}], [{x:0,y:0}],[{x:0,y:0}], [{x:0,y:0}],[{x:0,y:0}], [{x:0,y:0}],[{x:0,y:0}]];
  realDronesPoints: Vec2[][] = [[{x:0,y:0}],[{x:0,y:0}]];
  simPoints: Vec2[]= [];
  realPoints: Vec2[] = [];
  mission = {} as Mission;
  startMissionTime: any; 
  logs: InterfaceLog[] = [];
  savedMissionLogs: any = [];
  missionSaved: boolean = false;
  missionCanceled: boolean = false;

  serverAddress = "http://localhost:5000";
  crazyflieServerAddress = "http://localhost:5000/crazyflie";
  cfDataServerAdress = "http://localhost:5000/crazyflieData";
  argosServerAddress = "http://localhost:5000/argos";
  argosDataAddress = "http://localhost:5000/argosData";
  simMapDataAddress = "http://localhost:5000/simMapData";
  realMapDataAddress = "http://localhost:5000/realMapData";
  logsAddress = "http://localhost:5000/logs";

  constructor(private http: HttpClient) {
  }

  private static _handleError(err: HttpErrorResponse | any) {
    return Observable.throw(err.message || 'Error: Unable to complete request.');
  }

  // GET list of public, future events
  // getDrones(): Observable<any> {
  //   return this.http
  //     .get(`${API_URL}/drones`)
  //     .catch(DronesService._handleError);
  // }

  identifyDrone(command: CommandStruct): Observable<Object>{
    return this.http
      .post(
        this.crazyflieServerAddress,
        command
        )
      .catch(DronesService._handleError)
  }

  sendCommand(command: CommandStruct): Observable<number | Object>{
    // this calls the communication service method with the needed parameters for request
    return this.isSimulation ? this.http.post(this.argosServerAddress,command.command)
    .pipe(
      catchError((error: HttpErrorResponse) => {
          return of(error.status);
      }),
  ): 
    this.http.post(this.crazyflieServerAddress,command)
    .pipe(
      catchError((error: HttpErrorResponse) => {
          return of(error.status);
      }),
  );
  }

  getData(): Observable<ServerSimDrone[]> {
    return this.http.get<ServerSimDrone[]>(this.argosDataAddress);
  }

  getCFData(): Observable<ServerRealDrone[]> {
    return this.http.get<ServerRealDrone[]>(this.cfDataServerAdress);
  }

  getLogs(): Observable<ServerLog[]> {
    return this.http.get<ServerLog[]>(this.logsAddress);
  }

  getSimMapData(): Observable<ServerSimDrone[]> {
    return this.http.get<ServerSimDrone[]>(this.simMapDataAddress);
  }

  getRealMapData(): Observable<ServerRealDrone[]> {
    return this.http.get<ServerRealDrone[]>(this.realMapDataAddress);
  }

  
}
