import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SavedMissionsComponent } from './saved-missions.component';

describe('SavedMissionsComponent', () => {
  let component: SavedMissionsComponent;
  let fixture: ComponentFixture<SavedMissionsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SavedMissionsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SavedMissionsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
