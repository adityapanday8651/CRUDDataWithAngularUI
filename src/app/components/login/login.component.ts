import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent {
  public loginForm: FormGroup | any;
  public registerForm: FormGroup | any;
  isLoginMode = true;

  constructor(public authService: AuthService, private router: Router, private fb: FormBuilder) { 
    this.loginForm = this.fb.group({
      username: ['', [Validators.required]],
      password: ['', [Validators.required, Validators.minLength(6)]]
    });
  }
  isUserNameInvalid(): boolean {
    const control = this.loginForm.get('username');
    return control && control.invalid && (control.dirty || control.touched);
  }
  isPasswordInvalid(): boolean {
    const control = this.loginForm.get('password');
    return control && control.invalid && (control.dirty || control.touched);
  }

  onLogin(): void {
    if (this.loginForm.valid) {
      this.authService.login(this.loginForm.value).subscribe(
        () => {
          this.router.navigate(['/home']);
        },
        error => {
          console.error('Login failed', error);
        }
      );
    }
  }

  onRegister() {
    if (this.registerForm.valid) {
      // Handle registration logic here
    }
  }
}
