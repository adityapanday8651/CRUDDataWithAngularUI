import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';
import { ModalService } from 'src/app/services/modal.service';
import { ModalComponent } from '../modal/modal.component';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  @ViewChild(ModalComponent) modal: ModalComponent | any;
  public loginForm: FormGroup | any;

  constructor(
    public authService: AuthService,
    private router: Router,
    private fb: FormBuilder,
  ) {  }
  
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
          Swal.fire({
            position: "top-end",
            icon: "success",
            title: "Login Successfully",
            showConfirmButton: false,
            timer: 1500
          });
          this.loginForm.reset();
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

  openModal(): void {
    this.modal.open();
     }
}
