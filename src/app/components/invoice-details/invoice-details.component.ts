import { Component } from '@angular/core';
import { ActivatedRoute, Router, RouterState } from '@angular/router';

@Component({
  selector: 'app-invoice-details',
  templateUrl: './invoice-details.component.html',
  styleUrls: ['./invoice-details.component.css']
})
export class InvoiceDetailsComponent {
  productListing :any  = []

  constructor() {
  }

  ngOnInit() {
    console.log("history.state", history.state);
    this.productListing = history.state.productListing.items;
    console.log("this.productListing", this.productListing);
  }
}
