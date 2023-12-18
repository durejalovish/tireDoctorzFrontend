import { ComponentFixture, TestBed } from '@angular/core/testing';

import { WithouttaxInvoiceComponent } from './withouttax-invoice.component';

describe('WithouttaxInvoiceComponent', () => {
  let component: WithouttaxInvoiceComponent;
  let fixture: ComponentFixture<WithouttaxInvoiceComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [WithouttaxInvoiceComponent]
    });
    fixture = TestBed.createComponent(WithouttaxInvoiceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
