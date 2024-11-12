import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HeaderComponent } from './components/header/header.component';
import { RimsListingComponent } from './components/Rims/rims-listing/rims-listing.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { InvoicesComponent } from './components/invoices/invoices.component';
import { BrandComponent } from './components/brands/brand/brand.component';
import { ProductListingComponent } from './components/product-listing/product-listing.component';
import { CheckoutComponent } from './components/checkout/checkout.component';
import { WithouttaxInvoiceComponent } from './components/withouttax-invoice/withouttax-invoice.component';
import { ProductScreenRimsComponent } from './components/product-screen-rims/product-screen-rims.component';
import { UserSectionComponent } from './components/user-section/user-section.component';
import { InvoiceDetailsComponent } from './components/invoice-details/invoice-details.component';
import { LoginComponent } from './components/login/login.component';

const routes: Routes = [
  { path: '', component: LoginComponent },
  { path: 'dashboard', component: DashboardComponent },
  { path: 'dashboard/tires', component: HeaderComponent },
  { path: 'dashboard/rims', component: RimsListingComponent }, 
  { path: 'dashboard/brand', component: BrandComponent }, 
  { path: 'dashboard/invoices', component: InvoicesComponent },
  { path: 'dashboard/product_screen', component: ProductListingComponent },
  { path: 'dashboard/invoices/product_screen_rims', component: ProductScreenRimsComponent },
  { path: 'checkout', component: CheckoutComponent },
  { path: 'dashboard/withoutTax', component: WithouttaxInvoiceComponent },
  { path: 'dashboard/users', component: UserSectionComponent },
  { path: 'users/invoiceDetails', component: InvoiceDetailsComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
