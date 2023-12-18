import { CommonModule } from '@angular/common';
import { Component, Inject, OnInit } from '@angular/core';
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


@Component({
  selector: 'app-add-edit-brand',
  templateUrl: './add-edit-brand.component.html',
  styleUrls: ['./add-edit-brand.component.css'],
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
})
export class AddEditBrandComponent {
  brandForm: any = FormGroup;
  typeSelected = "";

  constructor(
    private fb: FormBuilder,
    private employeeService: EmployeeService,
    private dialogRef: MatDialogRef<AddEditBrandComponent>,
    private snackbar: CoreService,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {}

  ngOnInit(): void {
    this.brandForm = this.fb.group({
      brandName: new FormControl(null, [Validators.required]),
      description: new FormControl(""),
    });
    this.brandForm.patchValue(this.data);
  }

  typeChange(event:any){
    this.typeSelected =  event.target.value
  }

  onFormSubmit() {
    console.log(this.data);
    if (this.brandForm.valid) {
      if (this.data) {
        this.brandForm.value["_id"] = this.data._id;
        this.employeeService
          .updateBrand(this.brandForm.value)
          .subscribe({
            next: (value) => {
              this.dialogRef.close(true);
            },
            error: (err) => {
              console.log(err);
            },
          });
      } else {
        this.employeeService.addBrand(this.brandForm.value).subscribe({
          next: (val: any) => {
            this.snackbar.openSnackBar('Brand Added Successfully', 'done');
            this.dialogRef.close(true);
          },
          error: (err: any) => {
            console.log(err);
          },
        });
      }
    }
  }
}
