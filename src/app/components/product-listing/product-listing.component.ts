import { CommonModule } from '@angular/common';
import { Component, OnInit, ViewChild, Inject } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MAT_DIALOG_DATA, MatDialog, MatDialogModule } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
import { MatSort, MatSortModule } from '@angular/material/sort';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { MatToolbarModule } from '@angular/material/toolbar';
import { EmployeeService } from 'src/app/services/employee.service';
import { EmployeeEditAddComponent } from '../employee-edit-add/employee-edit-add.component';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { CoreService } from 'src/app/core/core.service';
import { FormBuilder, FormControl, FormGroup, FormsModule, Validators, ReactiveFormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import {RouterModule} from '@angular/router';


@Component({
  selector: 'app-product-listing',
  templateUrl: './product-listing.component.html',
  styleUrls: ['./product-listing.component.css'],
  imports: [
    RouterModule,
    CommonModule,
    MatToolbarModule,
    MatButtonModule,
    MatIconModule,
    MatDialogModule,
    MatTableModule,
    MatSortModule,
    MatFormFieldModule,
    MatInputModule,
    MatPaginatorModule,
    MatIconModule,
    ReactiveFormsModule,
    MatButtonModule,
    MatSnackBarModule,
    FormsModule      
  ],
  standalone: true,
})
export class ProductListingComponent {
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;
  productListing: any = [];
  productForm: any = FormGroup;

  constructor(
    private dialog: MatDialog,
    private fb: FormBuilder,
    private router: Router,
    private employeeService: EmployeeService,
    private snackbar: CoreService,
    // @Inject(MAT_DIALOG_DATA) public data: any
  ) {}

  ngOnInit(): void {
    // let productData:any = localStorage.getItem("productListing");
    // console.log("productData", productData);
    // if(productData?.length !== 0 && productData !==null){
    //   this.dataSource = new MatTableDataSource(productData);
    //     this.dataSource.sort = this.sort;
    //     this.dataSource.paginator = this.paginator;
    // }else{
      this.getTiresList();
    // }
    
    
  }

  routeWithoutTaxInvoice(): void {
    this.router.navigateByUrl('withoutTax', { state: {items: this.productListing }});
  }

  routeToTaxInvoiced(): void {
    this.router.navigateByUrl('checkout', { state: {items: this.productListing }});
  }

  displayedColumns: string[] = [
    'brandName',
    'size',
    'pattern',
    'price',
    'inStock',
    'number_of_items',
    'add_to_order',
  ];

  dataSource!: MatTableDataSource<any>;

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  getTiresList(): void {
     this.employeeService.getTiresDetails().subscribe({
       next: (res) => {
       this.dataSource = new MatTableDataSource(res.data);
        this.dataSource.sort = this.sort;
        this.dataSource.paginator = this.paginator;
       },
       error: (err: any) => {},
     });
  }

  addToOrder(row:any) {
     console.log(row, "row");
    if(row.quantity < row.number_of_items){
      this.snackbar.openSnackBar('Number of items should always be less than or equals to Quantity', 'Done');
    }else if(row.number_of_items <= 0 || row.number_of_items == null){
      this.snackbar.openSnackBar('Please input right number of items', 'Done');
    }else{  
      localStorage.clear();
      const index = this.productListing.findIndex((element:any) => element._id == row._id);
      if (index !== -1) {
        this.productListing.splice(index, 1);
      }
      this.productListing.push(row);
      this.snackbar.openSnackBar('Products has been added', 'Done');
      console.log("products listing", this.productListing);

    }
  }

  editEmployeeForm(data: any): void {
    const dialogRef = this.dialog.open(EmployeeEditAddComponent, {
      data,
    });
    dialogRef.afterClosed().subscribe({
      next: (value) => {
        if (value) {
          this.getTiresList();
        }
      },
    });
  }
}
