import { ComponentFixture, TestBed, inject, getTestBed, tick, fakeAsync } from '@angular/core/testing';

import { MissionComponent } from './mission.component';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';


describe('MissionComponent', () => {

  let injector: TestBed;
  let component: MissionComponent;
  let fixture: ComponentFixture<MissionComponent>;
  let httpMock: HttpTestingController;


  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      declarations: [ MissionComponent ]
      // providers: [
        //       { provide: DronesService, useValue: true }, { provide: AngularFirestore, useValue: true }]
    })
    injector = getTestBed();
    fixture = TestBed.createComponent(MissionComponent);
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
});
