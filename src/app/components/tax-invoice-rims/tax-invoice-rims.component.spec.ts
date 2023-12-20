import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TaxInvoiceRimsComponent } from './tax-invoice-rims.component';

describe('TaxInvoiceRimsComponent', () => {
  let component: TaxInvoiceRimsComponent;
  let fixture: ComponentFixture<TaxInvoiceRimsComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [TaxInvoiceRimsComponent]
    });
    fixture = TestBed.createComponent(TaxInvoiceRimsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
