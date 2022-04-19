import { TestBed, inject, getTestBed, tick, fakeAsync } from '@angular/core/testing';

import { DronesService } from './drones.service';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';


describe('DronesService', () => {
  let injector: TestBed;
  let service: DronesService;
  let httpMock: HttpTestingController;
  let postSpy: jasmine.Spy<any>;


  beforeEach(() =>
  {
      TestBed.configureTestingModule({
          imports: [HttpClientTestingModule],
          providers: [DronesService]
      });

      injector = getTestBed();
      service = TestBed.inject(DronesService);
      httpMock = injector.get(HttpTestingController);
  });

  afterEach(() =>
  {
      httpMock.verify();
  });

  // beforeEach(() => {
  //   TestBed.configureTestingModule({});
  //   service = TestBed.inject(DronesService);
  //   //postSpy = spyOn(service, http.pos).and.callThrough();
  // });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  // it('should identify drone', () => {
  //   service.identifyDrone("radio://0/80/2M/E7E7E7E731");
  //   expect(service['http'].post).toHaveBeenCalled();
  // })

  // it('should start mission', () => {
  //   service.fly("s");
  //   expect(service['http'].post).toHaveBeenCalled();
  // })

  // it('should land', () => {
  //   service.startMission("c");
  //   expect(service['http'].post).toHaveBeenCalled();
  // })

  // it('should land', () => {
  //   service.landDrone("c");
  //   expect(service['http'].post).toHaveBeenCalled();
  // })
});
