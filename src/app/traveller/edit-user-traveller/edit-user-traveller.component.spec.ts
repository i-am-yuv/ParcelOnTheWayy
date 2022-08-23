import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditUserTravellerComponent } from './edit-user-traveller.component';

describe('EditUserTravellerComponent', () => {
  let component: EditUserTravellerComponent;
  let fixture: ComponentFixture<EditUserTravellerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EditUserTravellerComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EditUserTravellerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
