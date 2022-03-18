import { ComponentFixture, TestBed } from '@angular/core/testing';
import { DronesService } from 'src/app/services/drones/drones.service';

import { DroneCardComponent } from './drone-card.component';

describe('DroneCardComponent', () => {
  let component: DroneCardComponent;
  let fixture: ComponentFixture<DroneCardComponent>;
  let droneServiceSpy: jasmine.SpyObj<DronesService>;

  beforeEach(async () => {
    droneServiceSpy = jasmine.createSpyObj('DronesService', ['identifyDrone', 'fly', 'landDrone', 'startMission']);
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
    expect(droneServiceSpy.identifyDrone).toHaveBeenCalled();
  });

  it('should identify', () => {
    expect(droneServiceSpy.fly).toHaveBeenCalled();
  });

  
  it('should land', () => {
    expect(droneServiceSpy.landDrone).toHaveBeenCalled();
  });
  
  it('should start mission', () => {
    expect(droneServiceSpy.startMission).toHaveBeenCalled();
  });
});
