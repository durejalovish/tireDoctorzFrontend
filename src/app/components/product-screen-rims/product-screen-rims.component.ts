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
import { ActivatedRoute, Router } from '@angular/router';
import {RouterModule} from '@angular/router';

@Component({
  selector: 'app-product-screen-rims',
  templateUrl: './product-screen-rims.component.html',
  styleUrls: ['./product-screen-rims.component.css'],
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
export class ProductScreenRimsComponent {

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;
  productListing: any = [];
  productForm: any = FormGroup;
  private sub: PushSubscription; 
  id:string;

  constructor(
    private dialog: MatDialog,
    private fb: FormBuilder,
    private router: Router,
    private employeeService: EmployeeService,
    private snackbar: CoreService,
    private route: ActivatedRoute
    // @Inject(MAT_DIALOG_DATA) public data: any
  ) {}

  ngOnInit(): void {
      this.getRimsList();
  }

  routeWithoutTaxInvoice(): void {
    this.router.navigateByUrl('withoutTaxRims', { state: {items: this.productListing }});
  }

  routeToTaxInvoiced(): void {
    this.router.navigateByUrl('taxedRims', { state: {items: this.productListing }});
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

  getRimsList(): void {
     this.employeeService.getAllRims().subscribe({
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
          this.getRimsList();
        }
      },
    });
  }
}
