import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  loginForm: FormGroup;

  constructor(private fb: FormBuilder,     public router:Router,
  ) {
    this.loginForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]]
    });
  }

  onSubmit() {
    if (this.loginForm.valid) {
      console.log('Form submitted:', this.loginForm.value);
       if(this.loginForm.value.email == "info@tiredoctorz.com" && this.loginForm.value.password == "Baban@12345"){
        this.router.navigateByUrl('dashboard');
       }else{
        alert("Invalid credentials")
        this.loginForm.reset();
       }
    } else {
      console.log('Form is invalid');
    }
  }
}
