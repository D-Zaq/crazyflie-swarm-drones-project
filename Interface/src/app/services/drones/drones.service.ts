import { Injectable } from '@angular/core';
import {HttpClient, HttpErrorResponse} from '@angular/common/http';
import {Observable} from 'rxjs/Observable';
import 'rxjs/add/operator/catch';
import {CommandStruct, Drone, MapDrone, MAP_DRONE_1, MAP_DRONE_2} from '../../objects/drones';
import {API_URL} from '../../env';
import { Vec2 } from 'src/app/objects/vec2';
// import {IDrone} from '../../objects/drones';

type ServerLog = { 
  log: string; 
  timestamp: number;
};

type ServerSimDrone = { 
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

type ServerRealDrone = { 
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

interface Mission {
  id: number;
  drones: MapDrone[];
  allPoints: Vec2[];
  dronesPoints: Vec2[][];
  type: string;
  date: string;
}

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

  identifyDrone(command: CommandStruct){
    return this.http
      .post(
        this.crazyflieServerAddress,
        command
        )
      .catch(DronesService._handleError)
  }

  sendCommand(command: CommandStruct){
    // this calls the communication service method with the needed parameters for request
    return this.isSimulation ? this.http.post(this.argosServerAddress,command.command)
    .catch(DronesService._handleError): 
    this.http.post(this.crazyflieServerAddress,command)
    .catch(DronesService._handleError)
  }

  getData() {
    return this.http.get<ServerSimDrone[]>(this.argosDataAddress)
      .catch(DronesService._handleError);
  }

  getCFData() {
    return this.http.get<ServerRealDrone>(this.cfDataServerAdress)
      .catch(DronesService._handleError);
  }

  getLogs() {
    return this.http.get<ServerLog[]>(this.logsAddress)
      .catch(DronesService._handleError);
  }

  getSimMapData() {
    return this.http.get<ServerSimDrone[]>(this.simMapDataAddress)
      .catch(DronesService._handleError);
  }

  getRealMapData() {
    return this.http.get<ServerRealDrone>(this.realMapDataAddress)
      .catch(DronesService._handleError);
  }

  saveMission(): void {
    const dateNow: Date = new Date();
    if(this.isSimulation === true)
      this.mission = {
        id: Math.random(),
        drones: this.mapSimDrones,
        allPoints: this.simPoints,
        dronesPoints: this.simDronesPoints,
        type: "simulation",
        date: dateNow.toUTCString()
      };
    else{
      this.mission = {
        id: Math.random(),
        drones: this.mapRealDrones,
        allPoints: this.realPoints,
        dronesPoints: this.realDronesPoints,
        type: "real",
        date: dateNow.toUTCString()
      };
    }
  }
}
