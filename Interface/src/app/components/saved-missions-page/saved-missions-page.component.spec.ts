import { ComponentFixture, TestBed, inject, getTestBed, tick, fakeAsync } from '@angular/core/testing';

import { SavedMissionsPageComponent } from './saved-missions-page.component';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { DronesService } from 'src/app/services/drones/drones.service';
import { AngularFirestore } from '@angular/fire/compat/firestore';

describe('SavedMissionsPageComponent', () => {

  let injector: TestBed;
  let component: SavedMissionsPageComponent;
  let fixture: ComponentFixture<SavedMissionsPageComponent>;
  let httpMock: HttpTestingController;


  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      declarations: [ SavedMissionsPageComponent ],
      providers: [
        { provide: DronesService, useValue: true }, { provide: AngularFirestore, useValue: true }]
    })
    injector = getTestBed();
    fixture = TestBed.createComponent(SavedMissionsPageComponent);
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
