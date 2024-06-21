import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { JwtHelperService } from '@auth0/angular-jwt';
import { Observable, tap } from 'rxjs';
import { User } from '../models/user.model';
import { environment } from 'src/environments/environment';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private apiUrl = environment.apiUrl;
  constructor(private http: HttpClient, private jwtHelper: JwtHelperService, private router:Router) { }

  login(user: User): Observable<any> {
    return this.http.post(`${this.apiUrl}/api/auth/login`, user).pipe(
      tap((response: any) => {
        localStorage.setItem('token', response.token);
      })
    );
  }

   logoutAPICalls(): void {
    localStorage.removeItem('token');
    this.http.post(`${this.apiUrl}/api/auth/logout`, {}).subscribe(
      () => {
      },
      error => {
        console.error('Error notifying server about logout', error);
      }
    );
    this.router.navigate(['/login']);
  }

  isAuthenticated(): boolean {
    const token = localStorage.getItem('token');
    return !this.jwtHelper.isTokenExpired(token);
  }

  getToken(): string | null {
    return localStorage.getItem('token');
  }

}
