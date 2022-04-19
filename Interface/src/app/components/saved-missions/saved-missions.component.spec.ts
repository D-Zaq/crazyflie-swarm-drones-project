import { ComponentFixture, TestBed , inject, getTestBed, tick, fakeAsync } from '@angular/core/testing';

import { SavedMissionsComponent } from './saved-missions.component';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';


describe('SavedMissionsComponent', () => {
  let injector: TestBed;
  let component: SavedMissionsComponent;
  let fixture: ComponentFixture<SavedMissionsComponent>;
  let httpMock: HttpTestingController;


  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      declarations: [ SavedMissionsComponent ]
    })
    injector = getTestBed();
    fixture = TestBed.createComponent(SavedMissionsComponent);
    component = fixture.componentInstance;
    httpMock = injector.get(HttpTestingController);
    // fixture.detectChanges();

  });


  afterEach(() =>
  {
      httpMock.verify();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
