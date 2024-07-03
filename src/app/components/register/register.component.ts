import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent {


  registerForm: FormGroup | any;

  constructor(
    private fb: FormBuilder,
    private router: Router
  ) {
    this.registerForm = this.fb.group({
      username: ['', [Validators.required]],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]]
    });
  }

  ngOnInit(): void { }

  onRegister() {
    if (this.registerForm.valid) {
      console.log(this.registerForm.value);
      // Handle the registration logic here, e.g., call an API
    }else {
      this.registerForm.markAllAsTouched();
    }
  }

  isFieldInvalid(field: string) {
    return this.registerForm.get(field).invalid && this.registerForm.get(field).touched;
  }


  isUserNameInvalid(): boolean {
    return this.isControlInvalid('username');
  }
  
  isPasswordInvalid(): boolean {
    return this.isControlInvalid('password');
  }

  isEmailInvalid():boolean{
    return this.isControlInvalid('email');
  }
  goBackToLogin(): void {
    this.router.navigate(['/login']);  // Navigate to login page
  }
  

  isControlInvalid(controlName: string): boolean {
    const control = this.registerForm.get(controlName);
    return control && control.invalid && (control.dirty || control.touched);
  }
  


}
