import { ComponentFixture, TestBed, inject, getTestBed, tick, fakeAsync } from '@angular/core/testing';
import { DronesService } from 'src/app/services/drones/drones.service';

import { DroneCardComponent } from './drone-card.component';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';

describe('DroneCardComponent', () => {

  let injector: TestBed;
  let component: DroneCardComponent;
  let fixture: ComponentFixture<DroneCardComponent>;
  let droneServiceSpy: jasmine.SpyObj<DronesService>;
  let httpMock: HttpTestingController;


  beforeEach(async () => {
    droneServiceSpy = jasmine.createSpyObj('DronesService', ['identifyDrone', 'sendCommand']);
    await TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      declarations: [ DroneCardComponent ],
      providers: [
        { provide: DronesService, useValue: true }]
    })
    injector = getTestBed();
    fixture = TestBed.createComponent(DroneCardComponent);
    component = fixture.componentInstance;
    httpMock = injector.get(HttpTestingController);
  });

  afterEach(() =>
  {
      httpMock.verify();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  // it('should identify', () => {
  //   component.identify();
  //   expect(droneServiceSpy.identifyDrone).toHaveBeenCalled();
  // });

  // it("should call droneService's sendCommand method", () => {
  //   component.fly();
  //   expect(droneServiceSpy.sendCommand).toHaveBeenCalled();
  // });

  
  // it('should land', () => {
  //   component.land();
  //   expect(droneServiceSpy.sendCommand).toHaveBeenCalled();
  // });

  // it('should start mission', () => {
  //   component.startMission();
  //   expect(droneServiceSpy.sendCommand).toHaveBeenCalled();
  // });
});
