import { Injectable } from '@angular/core';
import {HttpClient, HttpErrorResponse} from '@angular/common/http';
import {Observable} from 'rxjs/Observable';
import 'rxjs/add/operator/catch';
import { CommandStruct } from 'src/app/objects/drones';
import {API_URL} from '../../env';
// import {IDrone} from '../../objects/drones';

@Injectable({
  providedIn: 'root'
})
export class DronesService {

  // constructor() { }

  serverAddress = "http://localhost:5000";
  crazyflieServerAddress = "http://localhost:5000/crazyflie";
  argosServerAddress = "http://localhost:5000/argos";

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
    // this calls the communication service method with the needed parameters for request
    // const messageStr = JSON.stringify(uri);
    // console.log(messageStr);
    return this.http
      .post(
        this.crazyflieServerAddress,
        command
        )
      .catch(DronesService._handleError)
  }

  startMission(command: CommandStruct){
    // this calls the communication service method with the needed parameters for request
    return this.http
      .post(
        this.crazyflieServerAddress,
        command
        )
      .catch(DronesService._handleError)
    // return this.http
    //   .post(
    //     this.argosServerAddress,
    //     letter
    //     )
    //   .catch(DronesService._handleError)
  }

  landDrone(command: CommandStruct){
    // this calls the communication service method with the needed parameters for request
    return this.http
      .post(
        this.crazyflieServerAddress,
        command
        )
      .catch(DronesService._handleError)
    // return this.http
    //   .post(
    //     this.argosServerAddress,
    //     letter
    //     )
    //   .catch(DronesService._handleError)
  }
}
