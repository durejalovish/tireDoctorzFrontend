import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HeaderComponent } from './components/header/header.component';
import { HttpClientModule } from '@angular/common/http';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { RimsListingComponent } from './components/Rims/rims-listing/rims-listing.component';
import { AddEditRimsComponent } from './components/Rims/add-edit-rims/add-edit-rims.component';
import { BrandComponent } from './components/brands/brand/brand.component';
import { InvoicesComponent } from './components/invoices/invoices.component';
import { AddEditBrandComponent } from './components/brands/add-edit-brand/add-edit-brand.component';
import { CreateInvoiceComponent } from './components/create-invoice/create-invoice.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ToastrModule } from 'ngx-toastr';
import { ProductListingComponent } from './components/product-listing/product-listing.component';
import { CheckoutComponent } from './components/checkout/checkout.component';
import {RouterModule} from '@angular/router';
import { WithouttaxInvoiceComponent } from './components/withouttax-invoice/withouttax-invoice.component';
import { MatToolbarModule } from '@angular/material/toolbar';



@NgModule({
  declarations: [AppComponent, DashboardComponent , InvoicesComponent, CreateInvoiceComponent, CheckoutComponent, WithouttaxInvoiceComponent],
  imports: [
    MatToolbarModule,
    RouterModule,
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    HeaderComponent,
    HttpClientModule,
    FormsModule,
      ReactiveFormsModule,
      ToastrModule.forRoot(),
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
