import { ComponentFixture, TestBed, inject, getTestBed, tick, fakeAsync } from '@angular/core/testing';

import { MainPageComponent } from './main-page.component';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { DronesService } from 'src/app/services/drones/drones.service';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { MatSnackBar } from '@angular/material/snack-bar';




describe('MainPageComponent', () => {

  let injector: TestBed;
  let component: MainPageComponent;
  let fixture: ComponentFixture<MainPageComponent>;
  let httpMock: HttpTestingController;


  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      declarations: [ MainPageComponent ],
      providers: [
        { provide: DronesService, useValue: true }, { provide: AngularFirestore, useValue: true }, { provide: MatSnackBar, useValue: true }]
    })
    injector = getTestBed();
    fixture = TestBed.createComponent(MainPageComponent);
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
