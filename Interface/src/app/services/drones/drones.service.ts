import { Injectable } from '@angular/core';
import {HttpClient, HttpErrorResponse} from '@angular/common/http';
import {Observable} from 'rxjs/Observable';
import 'rxjs/add/operator/catch';
import {CommandStruct} from '../../objects/drones';
import {API_URL} from '../../env';
// import {IDrone} from '../../objects/drones';

type ServerLog = { 
  log: string; 
  timestamp: number;
};

type ServerDrone = { 
  name: string;
  speed: string;
  battery: string;
  xPosition: string;
  yPosition: string;
  zPosition: string;
  angle: string;
  frontDistance: string;
  backDistance: string;
  leftDistance: string;
  rightDistance: string;
  state:string;
};

@Injectable({
  providedIn: 'root'
})
export class DronesService {

  // constructor() { }
  public isSimulation = true;

  serverAddress = "http://localhost:5000";
  crazyflieServerAddress = "http://localhost:5000/crazyflie";
  cfDataServerAdress = "http://localhost:5000/crazyflieData";
  argosServerAddress = "http://localhost:5000/argos";
  argosDataAddress = "http://localhost:5000/argosData";
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
    return this.http.get<ServerDrone>(this.argosDataAddress)
      .catch(DronesService._handleError);
  }

  getCFData() {
    return this.http.get<ServerDrone>(this.cfDataServerAdress)
      .catch(DronesService._handleError);
  }

  getLogs() {
    return this.http.get<ServerLog[]>(this.logsAddress)
      .catch(DronesService._handleError);
  }
}
