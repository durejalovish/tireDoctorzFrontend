import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProductScreenRimsComponent } from './product-screen-rims.component';

describe('ProductScreenRimsComponent', () => {
  let component: ProductScreenRimsComponent;
  let fixture: ComponentFixture<ProductScreenRimsComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ProductScreenRimsComponent]
    });
    fixture = TestBed.createComponent(ProductScreenRimsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
