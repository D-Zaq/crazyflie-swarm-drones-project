import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DroneCardComponent } from './drone-card.component';

describe('DroneCardComponent', () => {
  let component: DroneCardComponent;
  let fixture: ComponentFixture<DroneCardComponent>;

  beforeEach(async () => {
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
});
