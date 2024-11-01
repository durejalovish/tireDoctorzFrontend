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
  includeOTS: boolean = true;
  paymentCreditCard: boolean = false;
  vehicleVIN:"";
  invoiceNumber = 1;
  invoiceData = {
    invoiceNumber: 'INV-001',
    date: '2023-01-01',
    customerName: 'John Doe',
  };
  productListing: any = [];
  constructor(private location:Location, 
    private employeeService: EmployeeService,
    private router: Router,
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
    this.getInvoiceNumber();
  }

  generatePDF() {
    const element = document.getElementById('invoice-container');
    html2pdf(element);
    this.updateTires();
  }

  getTotalAmount(): number {
    if(this.paymentCreditCard){
      let creditCardCharges = ((this.getSubtotal() + + this.getTax()) * 2.6) / 100;
      return this.getSubtotal() + this.getTax() + creditCardCharges;
    }else{
      return this.getSubtotal() + this.getTax();
    }
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
    //console.log(this.productListing.items.tires, "tires");
    this.productListing.items.tires.forEach( (element:any) => {
      element.quantity =element.quantity - element.number_of_items;
      this.employeeService
      .updateTires(element)
      .subscribe({
        next: (value) => {
          this.userEntry();
          // this.dialogRef.close(true);
        },
        error: (err) => {
          console.log(err);
        },
      });
    })
    console.log(this.productListing, "print the product listing here");
    this.productListing.items.rims.forEach( (element:any) => {
      element.quantity = element.quantity - element.number_of_items;
      this.employeeService
      .updateRims(element)
      .subscribe({
        next: (value) => {
          // this.dialogRef.close(true);
          this.userEntry();
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
        "invoiceType": "Taxed Invoice"
      }
     // console.log(userObject, "userObject");
      this.employeeService
      .addNewInvoice(userObject)
      .subscribe({
        next: (value) => {
          // this.dialogRef.close(true);
          this.router.navigateByUrl('');
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

    onCreditCardChanges(value:any){
      console.log(value, "value");
      this.paymentCreditCard = value;
    }
    
    includeChangeOTS(value:any){
      console.log(value, "value");
      this.includeOTS = value
    }
}
