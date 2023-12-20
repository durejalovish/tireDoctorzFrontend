import { ComponentFixture, TestBed } from '@angular/core/testing';

import { WithoutTaxInvoiceRimsComponent } from './without-tax-invoice-rims.component';

describe('WithoutTaxInvoiceRimsComponent', () => {
  let component: WithoutTaxInvoiceRimsComponent;
  let fixture: ComponentFixture<WithoutTaxInvoiceRimsComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [WithoutTaxInvoiceRimsComponent]
    });
    fixture = TestBed.createComponent(WithoutTaxInvoiceRimsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
