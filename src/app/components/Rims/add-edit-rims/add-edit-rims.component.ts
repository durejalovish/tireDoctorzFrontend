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
  selector: 'app-add-edit-rims',
  templateUrl: './add-edit-rims.component.html',
  styleUrls: ['./add-edit-rims.component.css'],
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
export class AddEditRimsComponent implements OnInit {

  tireForm: any = FormGroup;
  typeSelected = "";
  EducationList: string[] = [
    'Matric',
    'Diploma',
    'Intermediate',
    'Graduate',
    'Post Graduate',
  ];

  constructor(
    private fb: FormBuilder,
    private employeeService: EmployeeService,
    private dialogRef: MatDialogRef<AddEditRimsComponent>,
    private snackbar: CoreService,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) { }

  ngOnInit(): void {
    this.tireForm = this.fb.group({
      size: new FormControl(null, [Validators.required]),
      pattern: new FormControl(null, [Validators.required]),
      price: new FormControl(null, [Validators.required]),
      quantity: new FormControl(null, Validators.required),
    });

    this.tireForm.patchValue(this.data);
  }

  typeChange(event: any) {
    this.typeSelected = event.target.value
  }

  onFormSubmit() {
    console.log(this.data);
    if (this.tireForm.valid) {
      if (this.data) {
        this.tireForm.value["_id"] = this.data._id;
        console.log(this.tireForm.value, "biwbiewrgbeirugb");
        this.employeeService
          .updateRims(this.tireForm.value)
          .subscribe({
            next: (value) => {
              this.dialogRef.close(true);
            },
            error: (err) => {
              console.log(err);
            },
          });
      } else {
        this.employeeService.addRims(this.tireForm.value).subscribe({
          next: (val: any) => {
            this.snackbar.openSnackBar('Employee Added Successfully', 'done');

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
