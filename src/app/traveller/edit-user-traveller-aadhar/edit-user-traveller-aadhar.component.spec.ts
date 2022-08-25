import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditUserTravellerAadharComponent } from './edit-user-traveller-aadhar.component';

describe('EditUserTravellerAadharComponent', () => {
  let component: EditUserTravellerAadharComponent;
  let fixture: ComponentFixture<EditUserTravellerAadharComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EditUserTravellerAadharComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EditUserTravellerAadharComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
