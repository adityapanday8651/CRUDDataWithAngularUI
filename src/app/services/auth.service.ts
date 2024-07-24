import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { JwtHelperService } from '@auth0/angular-jwt';
import { Observable, catchError, tap, throwError } from 'rxjs';
import { User } from '../models/user.model';
import { environment } from 'src/environments/environment';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private apiUrl = environment.apiUrl;
  private readonly TOKEN_KEY = 'token';
  private readonly REFRESH_TOKEN_KEY = 'refresh-token';
  constructor(private http: HttpClient, private jwtHelper: JwtHelperService, private router: Router) { }


  getAllRolesAsync(): Observable<any> {
    return this.http.get(`${this.apiUrl}/api/auth/GetAllRolesAsync`)
      .pipe(catchError(this.handleError));
  }

  AddRegisterAsync(registerModel: User): Observable<any> {
    return this.http.post(`${this.apiUrl}/api/auth/AddRegisterAsync`, registerModel).pipe(
      tap((response: any) => {
        this.storeTokens(response.token, response.refreshToken);
      }),
      catchError(this.handleError)
    );
  }

  login(user: User): Observable<any> {
    return this.http.post(`${this.apiUrl}/api/auth/login`, user).pipe(
      tap((response: any) => {
        this.storeTokens(response.token, response.refreshToken);
      }),
      catchError(this.handleError)
    );
  }

  refreshToken(): Observable<any> {
    const refreshToken = this.getRefreshToken();
    return this.http.post(`${this.apiUrl}/api/auth/refresh`, { refreshToken }).pipe(
      tap((response: any) => {
        this.storeTokens(response.token, response.refreshToken);
      }),
      catchError(this.handleError)
    );
  }

  logoutAPICalls(): void {
    const refreshToken = this.getRefreshToken();
    localStorage.removeItem(this.TOKEN_KEY);
    localStorage.removeItem(this.REFRESH_TOKEN_KEY);
    this.http.post(`${this.apiUrl}/api/auth/logout`, { refreshToken }).subscribe(
      () => {
        this.router.navigate(['/login']);
      },
      error => {
        console.error('Error notifying server about logout', error);
        this.router.navigate(['/login']);
      }
    );
  }

  isAuthenticated(): boolean {
    const token = this.getToken();
    if (token && !this.jwtHelper.isTokenExpired(token)) {
      return true;
    } else if (this.getRefreshToken()) {
      this.refreshToken().subscribe();
      return true;
    }
    return false;
  }

  getToken(): string | null {
    return localStorage.getItem(this.TOKEN_KEY);
  }

  getRefreshToken(): string | null {
    return localStorage.getItem(this.REFRESH_TOKEN_KEY);
  }

  private storeTokens(token: string, refreshToken: string): void {
    localStorage.setItem(this.TOKEN_KEY, token);
    localStorage.setItem(this.REFRESH_TOKEN_KEY, refreshToken);
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
