import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HeaderComponent } from './components/header/header.component';
import { RimsListingComponent } from './components/Rims/rims-listing/rims-listing.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { InvoicesComponent } from './components/invoices/invoices.component';
import { BrandComponent } from './components/brands/brand/brand.component';
import { CreateInvoiceComponent } from './components/create-invoice/create-invoice.component';
import { ProductListingComponent } from './components/product-listing/product-listing.component';
import { CheckoutComponent } from './components/checkout/checkout.component';
import { WithouttaxInvoiceComponent } from './components/withouttax-invoice/withouttax-invoice.component';

const routes: Routes = [
  { path: '', component: DashboardComponent },
  { path: 'tires', component: HeaderComponent },
  { path: 'rims', component: RimsListingComponent }, 
  { path: 'brand', component: BrandComponent }, 
  { path: 'invoices', component: CreateInvoiceComponent },
  { path: 'product_screen', component: ProductListingComponent },
  { path: 'checkout', component: CheckoutComponent },
  { path: 'withoutTax', component: WithouttaxInvoiceComponent },

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
