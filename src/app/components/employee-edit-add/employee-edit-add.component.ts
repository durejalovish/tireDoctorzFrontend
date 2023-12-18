import { CommonModule } from '@angular/common';
import { Component, Inject, OnInit, ViewChild } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import {
  MAT_DIALOG_DATA,
  MatDialogModule,
  MatDialogRef,
} from '@angular/material/dialog';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { FormBuilder } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatRadioModule } from '@angular/material/radio';
import { EmployeeService } from 'src/app/services/employee.service';
import { DialogRef } from '@angular/cdk/dialog';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { CoreService } from 'src/app/core/core.service';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';

@Component({
  selector: 'app-employee-edit-add',
  standalone: true,
  imports: [
    CommonModule,
    MatDialogModule,
    MatButtonModule,
    ReactiveFormsModule,
    MatRadioModule,
    MatSnackBarModule,
    MatFormFieldModule,
  ],
  templateUrl: './employee-edit-add.component.html',
  styleUrls: ['./employee-edit-add.component.css'],
})
export class EmployeeEditAddComponent implements OnInit {
   @ViewChild(MatPaginator) paginator!: MatPaginator;
   @ViewChild(MatSort) sort!: MatSort;
  tireForm: any = FormGroup;
  typeSelected = "";
  brandList:any  = [];

  constructor(
    private fb: FormBuilder,
    private employeeService: EmployeeService,
    private dialogRef: MatDialogRef<EmployeeEditAddComponent>,
    private snackbar: CoreService,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {}

  ngOnInit(): void {
    this.tireForm = this.fb.group({
      brandName: new FormControl("", [Validators.required]),
      size: new FormControl(null, [Validators.required]),
      pattern: new FormControl(null, [Validators.required]),
      price: new FormControl(null, [Validators.required]),
      quantity: new FormControl(null, Validators.required),
    });

    this.tireForm.patchValue(this.data);
    this.getBrandList();
  }

  typeChange(event:any){
    this.typeSelected =  event.target.value
  }

  
  getBrandList(): void {
    this.employeeService.getBrands().subscribe({
      next: (res) => {
      this.brandList = res.data;
      },
      error: (err: any) => {},
    });
 }

  onFormSubmit() {
    console.log(this.data);
    if (this.tireForm.valid) {
      this.tireForm.value["size"] = this.tireForm.value.size.trim();
      console.log(this.tireForm.value);
      if (this.data) {
        this.tireForm.value["_id"] = this.data._id;
        console.log(this.tireForm.value, "biwbiewrgbeirugb");
        this.employeeService
          .updateTires(this.tireForm.value)
          .subscribe({
            next: (value) => {
              this.dialogRef.close(true);
            },
            error: (err) => {
              console.log(err);
            },
          });
      } else {
        this.employeeService.addTires(this.tireForm.value).subscribe({
          next: (val: any) => {
            this.snackbar.openSnackBar('Tires Added Successfully', 'done');

            this.dialogRef.close(true);
          },
          error: (err: any) => {
            this.snackbar.openSnackBar(err.error.message, 'done');
            console.log(err);
          },
        });
      }
    }
  }
}
