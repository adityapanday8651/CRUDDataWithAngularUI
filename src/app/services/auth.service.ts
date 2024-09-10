import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { JwtHelperService } from '@auth0/angular-jwt';
import { Observable, catchError, tap, throwError } from 'rxjs';
import { User } from '../models/user.model';
import { environment } from 'src/environments/environment';
import { Router } from '@angular/router';
import { NotificationService } from './notification.service';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private apiUrl = environment.apiUrl;
  private readonly TOKEN_KEY = 'token';

  constructor(
    private http: HttpClient,
     private jwtHelper: JwtHelperService,
      private router: Router,
      private notificationService : NotificationService
    ) { }

  getAllRolesAsync(): Observable<any> {
    return this.http.get(`${this.apiUrl}/api/auth/GetAllRolesAsync`)
      .pipe(catchError(this.handleError));
  }

  AddRegisterAsync(registerModel: User): Observable<any> {
    return this.http.post(`${this.apiUrl}/api/auth/AddRegisterAsync`, registerModel).pipe(
      tap((response: any) => {
        this.storeToken(response.token);
      }),
      catchError(this.handleError)
    );
  }

  login(user: User): Observable<any> {
    return this.http.post(`${this.apiUrl}/api/auth/login`, user).pipe(
      tap((response: any) => {
        this.storeToken(response.token);
      }),
      catchError(this.handleError)
    );
  }

  logoutAPICalls(): void {
    localStorage.removeItem(this.TOKEN_KEY);
    this.http.post(`${this.apiUrl}/api/auth/logout`, {}).subscribe(
      () => {
        this.router.navigate(['/login']);
        this.notificationService.showSuccess("Logout Successfully");
      },
      error => {
        console.error('Error notifying server about logout', error);
        this.router.navigate(['/login']);
      }
    );
  }

  isAuthenticated(): any {
    const token = this.getToken();
    return token && !this.jwtHelper.isTokenExpired(token);
  }

  getToken(): string | null {
    return localStorage.getItem(this.TOKEN_KEY);
  }

  private storeToken(token: string): void {
    localStorage.setItem(this.TOKEN_KEY, token);
  }

  private handleError(error: HttpErrorResponse) {
    let errorMessage = 'An unknown error occurred!';
    if (error.error instanceof ErrorEvent) {
      // Client-side errors
      errorMessage = `Error: ${error.error.message}`;
    } else {
      // Server-side errors
      errorMessage = `Error Code: ${error.status}\nMessage: ${error.message}`;
    }
    return throwError(errorMessage);
  }
}

