import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RimsListingComponent } from './rims-listing.component';

describe('RimsListingComponent', () => {
  let component: RimsListingComponent;
  let fixture: ComponentFixture<RimsListingComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [RimsListingComponent]
    });
    fixture = TestBed.createComponent(RimsListingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
