import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {

  public lstAllRoles: any
  registerForm: FormGroup | any;

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private authService: AuthService
  ) {
    this.registerForm = this.fb.group({
      username: ['', [Validators.required]],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]],
      roleId: [Validators.required]
    });
  }

  ngOnInit() {
    this.getAllRolesAsync();
  }

  async onRegister() {
    if (this.registerForm.valid) {
      await this.authService.AddRegisterAsync(this.registerForm.value).subscribe((response => {
        console.log("Register Response : ", response);
        if (response.status) {
          Swal.fire({
            position: "top",
            icon: "success",
            title: "Your work has been saved",
            showConfirmButton: false,
            timer: 1500
          });
          this.registerForm.reset();
        }
      }))
    } else {
      this.registerForm.markAllAsTouched();
    }
  }


  onRegdister(): void {
    if (this.registerForm.valid) {
      this.authService.login(this.registerForm.value).subscribe(
        () => {
          Swal.fire({
            position: "top-end",
            icon: "success",
            title: "Login Successfully",
            showConfirmButton: false,
            timer: 1500
          });

          this.router.navigate(['/home']);
        },
        error => {
          console.error('Login failed', error);
          Swal.fire({
            position: "top-end",
            icon: "error",
            title: "User Unauthorized",
            showConfirmButton: false,
            timer: 1500
          });
        }
      );
    }
  }


  public async getAllRolesAsync() {
    await this.authService.getAllRolesAsync().subscribe(response => {
      this.lstAllRoles = response.data;
    },
      error => {
        console.error('Error fetching categories:', error);
      }
    )
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

  isEmailInvalid(): boolean {
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
