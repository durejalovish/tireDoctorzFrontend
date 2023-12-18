import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddEditBrandComponent } from './add-edit-brand.component';

describe('AddEditBrandComponent', () => {
  let component: AddEditBrandComponent;
  let fixture: ComponentFixture<AddEditBrandComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AddEditBrandComponent]
    });
    fixture = TestBed.createComponent(AddEditBrandComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
