import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SavedMissionsPageComponent } from './saved-missions-page.component';

describe('SavedMissionsPageComponent', () => {
  let component: SavedMissionsPageComponent;
  let fixture: ComponentFixture<SavedMissionsPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SavedMissionsPageComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SavedMissionsPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
