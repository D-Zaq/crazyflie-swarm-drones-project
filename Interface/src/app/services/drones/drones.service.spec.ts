import { TestBed, inject, getTestBed, tick, fakeAsync } from '@angular/core/testing';

import { DronesService, ServerLog, ServerRealDrone, ServerSimDrone } from './drones.service';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import {CommandStruct, Command} from '../../objects/drones';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { defer, identity, throwError } from 'rxjs';

export function asyncError<T>(errorObject: any) {
  return defer(() => Promise.reject(errorObject));
}

describe('DronesService', () => {
  let injector: TestBed;
  let service: DronesService;
  let httpMock: HttpTestingController;
  let postSpy: jasmine.Spy<any>;
  let getSpy: jasmine.Spy<any>;
  let http: HttpClient;



  beforeEach(() =>
  {
      TestBed.configureTestingModule({
          imports: [HttpClientTestingModule],
          providers: [DronesService, 
            // { provide: HttpClient, useValue: true }
          ]
      });
      // injector = getTestBed();
      http = TestBed.inject(HttpClient);
      service = TestBed.inject(DronesService);
      httpMock = TestBed.inject(HttpTestingController);
      postSpy = spyOn(http, 'post').and.callThrough();
      getSpy = spyOn(http, 'get').and.callThrough();

  });

  afterEach(() =>
  {
      httpMock.verify();
  });


  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should identify drone', () => {
    const cmd: CommandStruct = {
      droneURI: "radio://0/80/2M/E7E7E7E731",
      command: Command.Identify
    }
    
    service.identifyDrone(cmd).subscribe();

    const req = httpMock
      .expectOne(service.crazyflieServerAddress);
    expect(req.request.method).toEqual('POST');
    expect(service['http'].post).toHaveBeenCalledWith(service.crazyflieServerAddress, cmd);
  })

  it('should start mission', () => {
    const cmd: CommandStruct = {
      droneURI: "radio://0/80/2M/E7E7E7E731",
      command: Command.StartMission
    }
    
    service.identifyDrone(cmd).subscribe();

    const req = httpMock
      .expectOne(service.crazyflieServerAddress);
    expect(req.request.method).toEqual('POST');
    expect(service['http'].post).toHaveBeenCalledWith(service.crazyflieServerAddress, cmd);
  })

  it('should land', () => {
    const cmd: CommandStruct = {
      droneURI: "radio://0/80/2M/E7E7E7E731",
      command: Command.Land
    }
    
    service.identifyDrone(cmd).subscribe();

    const req = httpMock
      .expectOne(service.crazyflieServerAddress);
    expect(req.request.method).toEqual('POST');
    expect(service['http'].post).toHaveBeenCalledWith(service.crazyflieServerAddress, cmd);
  })

  it('should land', () => {
    const cmd: CommandStruct = {
      droneURI: "radio://0/80/2M/E7E7E7E731",
      command: Command.Land
    }
    
    service.identifyDrone(cmd).subscribe();

    const req = httpMock
      .expectOne(service.crazyflieServerAddress);
    expect(req.request.method).toEqual('POST');
    expect(service['http'].post).toHaveBeenCalledWith(service.crazyflieServerAddress, cmd);
  })

  it('should fly', () => {
    const cmd: CommandStruct = {
      droneURI: "radio://0/80/2M/E7E7E7E731",
      command: Command.Fly
    }
    
    service.identifyDrone(cmd).subscribe();

    const req = httpMock
      .expectOne(service.crazyflieServerAddress);
    expect(req.request.method).toEqual('POST');
    expect(service['http'].post).toHaveBeenCalledWith(service.crazyflieServerAddress, cmd);
  })

  it('should return to base', () => {
    const cmd: CommandStruct = {
      droneURI: "radio://0/80/2M/E7E7E7E731",
      command: Command.Base
    }
    
    service.identifyDrone(cmd).subscribe();

    const req = httpMock
      .expectOne(service.crazyflieServerAddress);
    expect(req.request.method).toEqual('POST');
    expect(service['http'].post).toHaveBeenCalledWith(service.crazyflieServerAddress, cmd);
  })
  
  it('should not identify drone, throws 404 error', () => {
    const cmd: CommandStruct = {
      droneURI: "radio://0/80/2M/E7E7E7E731",
      command: Command.Identify
    }
    
    service.identifyDrone(cmd).subscribe( data => fail('Should have failed with 404 error'),
    (error: HttpErrorResponse) => {
      expect(error.message).toEqual('rxjs_Observable__WEBPACK_IMPORTED_MODULE_2__.Observable.throw is not a function');
    });

    const req = httpMock.expectOne(service.crazyflieServerAddress);
    req.flush('404 error', { status: 404, statusText: 'Not Found' });
  })

  it('should send command to sim', () => {
    const cmd: CommandStruct = {
      droneURI: "radio://0/80/2M/E7E7E7E731",
      command: Command.Base
    }
    service.isSimulation = true;
    
    service.sendCommand(cmd).subscribe();

    const req = httpMock
      .expectOne(service.argosServerAddress);
    expect(req.request.method).toEqual('POST');
    expect(service['http'].post).toHaveBeenCalledWith(service.argosServerAddress, cmd.command);
  })

  // it('should not send command to sim, throws 404 error', () => {
  //   const cmd: CommandStruct = {
  //     droneURI: "radio://0/80/2M/E7E7E7E731",
  //     command: Command.Identify
  //   }
  //   service.isSimulation = true;
  //   // spyOn(http, 'post').and.returnValue(asyncError(HttpErrorResponse));

    
  //   service.sendCommand(cmd).subscribe(data => fail());

  //   // const req = httpMock.expectOne(service.argosServerAddress);
  //   // req.flush('404 error', { status: 404, statusText: 'Not Found' });
  // })

  it('should send command to cf', () => {
    const cmd: CommandStruct = {
      droneURI: "radio://0/80/2M/E7E7E7E731",
      command: Command.Base
    }
    service.isSimulation = false;
    
    service.sendCommand(cmd).subscribe();

    const req = httpMock
      .expectOne(service.crazyflieServerAddress);
    expect(req.request.method).toEqual('POST');
    expect(service['http'].post).toHaveBeenCalledWith(service.crazyflieServerAddress, cmd);
  })

  it('should get data from sim', () => {
    const simDrone: ServerSimDrone[] = []
    
    service.getData().subscribe(data => expect(data).toEqual(simDrone));

    const req = httpMock
      .expectOne(service.argosDataAddress);
    expect(req.request.method).toEqual('GET');
    expect(service['http'].get).toHaveBeenCalledWith(service.argosDataAddress);
  })

  it('should get data from cf', () => {
    const realDrone: ServerRealDrone[] = []
    
    service.getCFData().subscribe(data => expect(data).toEqual(realDrone));

    const req = httpMock
      .expectOne(service.cfDataServerAdress);
    expect(req.request.method).toEqual('GET');
    expect(service['http'].get).toHaveBeenCalledWith(service.cfDataServerAdress);
  })

  it('should get logs', () => {
    const logs: ServerLog[] = []
    
    service.getLogs().subscribe(data => expect(data).toEqual(logs));

    const req = httpMock
      .expectOne(service.logsAddress);
    expect(req.request.method).toEqual('GET');
    expect(service['http'].get).toHaveBeenCalledWith(service.logsAddress);
  })

  it('should get data sim for map', () => {
    const simDrone: ServerSimDrone[] = []
    
    service.getSimMapData().subscribe(data => expect(data).toEqual(simDrone));

    const req = httpMock
      .expectOne(service.simMapDataAddress);
    expect(req.request.method).toEqual('GET');
    expect(service['http'].get).toHaveBeenCalledWith(service.simMapDataAddress);
  })

  it('should get data cf for map', () => {
    const realDrone: ServerRealDrone[] = []
    
    service.getRealMapData().subscribe(data => expect(data).toEqual(realDrone));

    const req = httpMock
      .expectOne(service.realMapDataAddress);
    expect(req.request.method).toEqual('GET');
    expect(service['http'].get).toHaveBeenCalledWith(service.realMapDataAddress);
  })
});
