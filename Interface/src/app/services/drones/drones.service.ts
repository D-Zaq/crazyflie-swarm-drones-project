import { Injectable } from '@angular/core';
import {HttpClient, HttpErrorResponse} from '@angular/common/http';
import {Observable} from 'rxjs/Observable';
import 'rxjs/add/operator/catch';
import {API_URL} from '../../env';
// import {IDrone} from '../../objects/drones';

@Injectable({
  providedIn: 'root'
})
export class DronesService {

  // constructor() { }

  constructor(private http: HttpClient) {
  }

  private static _handleError(err: HttpErrorResponse | any) {
    return Observable.throw(err.message || 'Error: Unable to complete request.');
  }

  // GET list of public, future events
  getDrones(): Observable<any> {
    return this.http
      .get(`${API_URL}/drones`)
      .catch(DronesService._handleError);
  }

  identifyDrone(): void{
    // this calls the communication service method with the needed parameters for request
  }

  startMission(): void{
    // this calls the communication service method with the needed parameters for request
  }

  landDrone(): void{
    // this calls the communication service method with the needed parameters for request
  }
}
