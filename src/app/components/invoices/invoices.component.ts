import { Component } from '@angular/core';
// import pdfMake from "pdfmake/build/pdfmake";
// import pdfFonts from "pdfmake/build/vfs_fonts";
// pdfMake.vfs = pdfFonts.pdfMake.vfs;

export interface Invoice {
  customerName :string ,
  address: string;
  contactNo: number;
  email: string;
  products: Product[];
  additionalDetails: string;
}

export interface  Product{
  name: string;
  price: number;
  qty: number;
}

@Component({
  selector: 'app-invoices',
  templateUrl: './invoices.component.html',
  styleUrls: ['./invoices.component.css']
})

export class InvoicesComponent {
  
}