import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, catchError, throwError } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class CategoryService {

  private apiUrl = environment.apiUrl;
  constructor(private http: HttpClient) { }

  getAllCategoriesAsync(): Observable<any> {
    return this.http.get<any[]>(`${this.apiUrl}/api/Category/GetAllCategoriesAsync`)
      .pipe(
        catchError(this.handleError)
      );
  }

  // POST request
  addCategoryAsync(data: any): Observable<any> {
    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    return this.http.post(`${this.apiUrl}/api/Category/AddCategoryAsync`, data, { headers })
      .pipe(
        catchError(this.handleError)
      );
  }

  getCategoryByIdAsync(id: number): Observable<any> {
    return this.http.get(`${this.apiUrl}/api/Category/GetCategoryByIdAsync?id=${id}`)
      .pipe(
        catchError(this.handleError)
      );
  }

  updateCategoryAsync(id: number, categoryDto: any): Observable<any> {
    return this.http.put(`${this.apiUrl}/api/Category/UpdateCategoryAsync?id=${id}`, categoryDto)
      .pipe(
        catchError(this.handleError)
      );
  }

  deleteCategoryAsync(id: any): Observable<any> {
    return this.http.delete(`${this.apiUrl}/api/Category/DeleteCategoryAsync?id=${id}`)
      .pipe(
        catchError(this.handleError)
      );
  }

  getCategoriesPagedAsync(pageNumber: number, pageSize: number): Observable<any> {
    return this.http.get(`${this.apiUrl}/api/Category/GetCategoriesPagedAsync`, {
      params: {
        pageNumber: pageNumber.toString(),
        pageSize: pageSize.toString()
      }
    }).pipe(
      catchError(this.handleError)
    );
  }
  

   // Handle errors
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
