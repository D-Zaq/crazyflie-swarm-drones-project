import { ComponentFixture, TestBed, inject, getTestBed, tick, fakeAsync } from '@angular/core/testing';

import { LogsComponent } from './logs.component';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';


describe('LogsComponent', () => {

  let injector: TestBed;
  let component: LogsComponent;
  let fixture: ComponentFixture<LogsComponent>;
  let httpMock: HttpTestingController;


  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      declarations: [ LogsComponent ]
    })
    injector = getTestBed();
    fixture = TestBed.createComponent(LogsComponent);
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
