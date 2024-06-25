import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';
import { ModalService } from 'src/app/services/modal.service';
import { ModalComponent } from '../modal/modal.component';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  @ViewChild(ModalComponent) modal: ModalComponent | any;
  public loginForm: FormGroup | any;
  public registerForm: FormGroup | any;

  constructor(
    public authService: AuthService,
    private router: Router,
    private fb: FormBuilder,
  ) {
    // this.loginForm = this.fb.group({
    //   username: ['', [Validators.required]],
    //   password: ['', [Validators.required, Validators.minLength(6)]]
    // });


  }
  ngOnInit(): void {
   this.loginReactiveForms();
  }

  isUserNameInvalid(): boolean {
    const control = this.loginForm.get('username');
    return control && control.invalid && (control.dirty || control.touched);
  }
  isPasswordInvalid(): boolean {
    const control = this.loginForm.get('password');
    return control && control.invalid && (control.dirty || control.touched);
  }

 

  public async loginReactiveForms() {
    this.loginForm = this.fb.group({
      username: ['', [Validators.required]],
      password: ['', [Validators.required, Validators.minLength(6)]]
    });

  }

  onLogin(): void {
    if (this.loginForm.valid) {
      this.authService.login(this.loginForm.value).subscribe(
        () => {
          this.router.navigate(['/home']);
        },
        error => {
          console.error('Login failed', error);
          alert("User Unauthorized");
        }
      );
    }
  }

  onRegister() {
    if (this.registerForm.valid) {
      console.log(this.registerForm.value);
      // Handle the registration logic here, e.g., call an API
    }
  }

  openModal(): void {
    this.modal.open();
  }
}
