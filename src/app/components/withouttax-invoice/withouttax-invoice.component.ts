import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Location } from '@angular/common';
import * as html2pdf from 'html2pdf.js';
import { EmployeeService } from 'src/app/services/employee.service';
import { EmployeeEditAddComponent } from '../employee-edit-add/employee-edit-add.component';
import { CoreService } from 'src/app/core/core.service';

@Component({
  selector: 'app-withouttax-invoice',
  templateUrl: './withouttax-invoice.component.html',
  styleUrls: ['./withouttax-invoice.component.css']
})

export class WithouttaxInvoiceComponent {
  // getTotalAmount: 550;
  customerName = "";
  address:"";
  phoneNumber = "";
  currentDate = new Date();
  addionalMessage = "";
  invoiceData = {
    invoiceNumber: 'INV-001',
    date: '2023-01-01',
    customerName: 'John Doe',
  };
  productListing: any = [];
  includeOTS: boolean = false;
  ots = 4.5;
  totalItems=0;
  vehicleVIN:"";
  invoiceNumber = 1;

  constructor(private location:Location, 
    private employeeService: EmployeeService,
    public router:Router,
    private snackbar: CoreService,) {
  }

  taxRate: number = 0.13; // Example GST rate (5%)

  getSubtotal(): number {
    if(this.includeOTS){
      let tiresTotal =  this.productListing.items.tires.reduce((subtotal:any, item:any) => subtotal + item.number_of_items * item.price, 0);
      let rimsTotal = this.productListing.items.rims.reduce((subtotal:any, item:any) => subtotal + item.number_of_items * item.price, 0);
      let subTotal = tiresTotal + rimsTotal + this.getOTS();
      return subTotal;
    }else{
      let tiresTotal = this.productListing.items.tires.reduce((subtotal:any, item:any) => subtotal + item.number_of_items * item.price, 0);
      let rimsTotal = this.productListing.items.rims.reduce((subtotal:any, item:any) => subtotal + item.number_of_items * item.price, 0);
      let subtotal = tiresTotal + rimsTotal;
      return subtotal;
    }
  }

  getOTS(){
    this.totalItems =  this.productListing.items.tires.reduce((subtotal:any, item:any) => subtotal + item.number_of_items, 0);
    return this.totalItems * 4.5;
  }

  getTax(): number {
    return this.getSubtotal() * this.taxRate;
  }

  ngOnInit(){
    this.productListing = this.location.getState();

    console.log(this.productListing, "listing");
    this.getInvoiceNumber();
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
    this.productListing.items.tires.forEach( (element:any) => {
      console.log("this.productLiting", this.productListing);
      element.quantity = element.quantity - element.number_of_items;
      console.log("element", element);
      this.employeeService
      .updateTires(element)
      .subscribe({
        next: (value) => {
          // this.dialogRef.close(true);
          this.userEntry();
          this.router.navigateByUrl('product_screen');
        },
        error: (err) => {
          console.log(err);
        },
      });
    })
    };

    userEntry(){
      const userObject = {
        "customerName":this.customerName,
        "address":this.address,
        "phoneNumber": this.phoneNumber,
        "productListing": this.productListing,
        "additionalMessage": this.addionalMessage,
        "vehicleVIN": this.vehicleVIN,
        "totalOTS": this.getOTS(),
        "totalAmount": this.getSubtotal(),
        "invoiceNumber": this.invoiceNumber,
        "invoiceType": "withoutTax"
      }
      this.employeeService
      .addNewInvoice(userObject)
      .subscribe({
        next: (value) => {
          // this.dialogRef.close(true);
          this.router.navigateByUrl('product_screen');
        },
        error: (err) => {
          console.log(err);
        },
      });
    }

    onVINChange(event: any){
      this.vehicleVIN = event.target.value;
    }

    getInvoiceNumber(){
      this.employeeService
      .getInvoiceNumber()
      .subscribe({
        next: (value: any) => {
          if(value.data.length > 0){
            this.invoiceNumber = value.data[0].invoiceNumber; 
            this.invoiceNumber = this.invoiceNumber + 1;
          }
        },
        error: (err) => {
          console.log(err);
        },
      });
    }
}
