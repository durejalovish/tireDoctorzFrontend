import { CommonModule } from '@angular/common';
import { Component, OnInit, ViewChild } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
import { MatSort, MatSortModule } from '@angular/material/sort';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { MatToolbarModule } from '@angular/material/toolbar';
import { EmployeeService } from 'src/app/services/employee.service';
import { AddEditBrandComponent } from '../add-edit-brand/add-edit-brand.component';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { CoreService } from 'src/app/core/core.service';
import {RouterModule} from '@angular/router';


@Component({
  selector: 'app-brand',
  templateUrl: './brand.component.html',
  styleUrls: ['./brand.component.css'],
  standalone: true, 
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
    MatButtonModule,
    MatSnackBarModule,
  ],
})
export class BrandComponent {
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;
  constructor(
    private dialog: MatDialog,
    private employeeService: EmployeeService,
    private snackbar: CoreService
  ) {}

  ngOnInit(): void {
    this.getBrandList();
  }

  addEmployeeForm(): void {
    const dialogRef = this.dialog.open(AddEditBrandComponent);

    dialogRef.afterClosed().subscribe({
      next: (value) => {
        if (value) {
          this.getBrandList();
        }
      },
    });
  }

  displayedColumns: string[] = [
    'brandName', 
    'description',
    'edit',
    'delete',
  ];

  dataSource!: MatTableDataSource<any>;

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  getBrandList(): void {
     this.employeeService.getBrands().subscribe({
       next: (res) => {
       this.dataSource = new MatTableDataSource(res.data);
        this.dataSource.sort = this.sort;
        this.dataSource.paginator = this.paginator;
       },
       error: (err: any) => {},
     });
  }

  deleteEmployee(id: number) {
    console.log(id, "id");
    this.employeeService.deleteBrand(id).subscribe({
      next: (res) => {
        this.snackbar.openSnackBar('Tires Deleted', 'done');
        this.getBrandList();
      },
      error: (err) => {
        console.log(err);
      },
    });
  }

  editEmployeeForm(data: any): void {
    const dialogRef = this.dialog.open(AddEditBrandComponent, {
      data,
    });
    dialogRef.afterClosed().subscribe({
      next: (value) => {
        if (value) {
          this.getBrandList();
        }
      },
    });
  }
}
