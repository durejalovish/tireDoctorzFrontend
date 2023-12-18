import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Location } from '@angular/common';
import * as html2pdf from 'html2pdf.js';
import { EmployeeService } from 'src/app/services/employee.service';
import { EmployeeEditAddComponent } from '../employee-edit-add/employee-edit-add.component';
import { CoreService } from 'src/app/core/core.service';


@Component({
  selector: 'app-checkout',
  templateUrl: './checkout.component.html',
  styleUrls: ['./checkout.component.css']
})
export class CheckoutComponent {
  // getTotalAmount: 550;
  customerName = "";
  address:"";
  phoneNumber = "";
  addionalMessage = "";
  ots = 4.5;
  totalItems=0;
  currentDate = new Date();
  invoiceData = {
    invoiceNumber: 'INV-001',
    date: '2023-01-01',
    customerName: 'John Doe',
  };
  productListing: any = [];
  constructor(private location:Location, 
    private employeeService: EmployeeService,
    private snackbar: CoreService,) {
  }
  taxRate: number = 0.13; // Example GST rate (5%)

  getSubtotal(): number {
    let total =  this.productListing.items.reduce((subtotal:any, item:any) => subtotal + item.number_of_items * item.price, 0);
    let subTotal = total + this.getOTS();
    return subTotal;
  }

  getOTS(){
    this.totalItems =  this.productListing.items.reduce((subtotal:any, item:any) => subtotal + item.number_of_items, 0);
    return this.totalItems * 4.5;
  }

  getTax(): number {
    return this.getSubtotal() * this.taxRate;
  }

  ngOnInit(){
    this.productListing = this.location.getState();
    console.log(this.location.getState());
  }

  generatePDF() {
    const element = document.getElementById('invoice-container');
    html2pdf(element);
    this.updateTires();
  }

  getTotalAmount(): number {
    return this.getSubtotal() + this.getTax();
  }

  onNameChange(event: any){
    this.customerName = event.target.value;
  }

  onAddressChange(event: any){
    this.address = event.target.value;
  }

  onPhoneChange(event: any){
    this.phoneNumber = event.target.value;
  }
  
  onMessageChange(event: any){
    this.addionalMessage = event.target.value;
  }

  updateTires(){
    this.productListing.items.forEach( (element:any) => {
      element.quantity = element.quantity - element.number_of_items;
      console.log("element", element);
      this.employeeService
      .updateTires(element)
      .subscribe({
        next: (value) => {
          // this.dialogRef.close(true);
        },
        error: (err) => {
          console.log(err);
        },
      });
    })
    };
}
