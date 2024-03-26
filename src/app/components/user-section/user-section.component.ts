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
import { MatTab, MatTabsModule } from '@angular/material/tabs';


@Component({
  selector: 'app-user-section',
  templateUrl: './user-section.component.html',
  styleUrls: ['./user-section.component.css'],
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
    FormsModule,
    MatTabsModule
  ],
  standalone: true,
})

export class UserSectionComponent {
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;
  productListing: any = {tires:[], rims:[]};
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
     this.route.params.subscribe(params => {
      console.log("params", params);
      this.id = params['userId'];
    })
      this.getUsersList();
    // }
  }

  displayedColumns: string[] = [
    'invoiceNumber',
    'customerName',
    'invoiceType',
    'totalAmount',
    'totalOTS',
    'button'
  ];

  dataSource!: MatTableDataSource<any>;

  getUsersList(): void {
     this.employeeService.getUsersInvoiceList().subscribe({
       next: (res:any) => {
        console.log("res", res);
       this.dataSource = new MatTableDataSource(res.data);
        this.dataSource.sort = this.sort;
        this.dataSource.paginator = this.paginator;
       },
       error: (err: any) => {},
     });
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  onButtonClick(row:any) {
    console.log("row", row);
    this.router.navigate(['users/invoiceDetails'], { state: { productListing: row } });

  }
}
