import { ComponentFixture, TestBed } from '@angular/core/testing';
import { DronesService } from 'src/app/services/drones/drones.service';

import { DroneCardComponent } from './drone-card.component';

describe('DroneCardComponent', () => {
  let component: DroneCardComponent;
  let fixture: ComponentFixture<DroneCardComponent>;
  let droneServiceSpy: jasmine.SpyObj<DronesService>;

  beforeEach(async () => {
    droneServiceSpy = jasmine.createSpyObj('DronesService', ['identifyDrone', 'sendCommand']);
    await TestBed.configureTestingModule({
      declarations: [ DroneCardComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DroneCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should identify', () => {
    component.identify();
    expect(droneServiceSpy.identifyDrone).toHaveBeenCalled();
  });

  it("should call droneService's sendCommand method", () => {
    component.fly();
    expect(droneServiceSpy.sendCommand).toHaveBeenCalled();
  });

  
  it('should land', () => {
    component.land();
    expect(droneServiceSpy.sendCommand).toHaveBeenCalled();
  });

  it('should start mission', () => {
    component.startMission();
    expect(droneServiceSpy.sendCommand).toHaveBeenCalled();
  });
});
