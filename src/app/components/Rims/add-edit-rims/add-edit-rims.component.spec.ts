import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddEditRimsComponent } from './add-edit-rims.component';

describe('AddEditRimsComponent', () => {
  let component: AddEditRimsComponent;
  let fixture: ComponentFixture<AddEditRimsComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AddEditRimsComponent]
    });
    fixture = TestBed.createComponent(AddEditRimsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
