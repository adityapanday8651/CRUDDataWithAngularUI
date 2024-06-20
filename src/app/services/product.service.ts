import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, catchError, throwError } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ProductService {
 private apiUrl = environment.apiUrl;
  constructor(private http: HttpClient) { }


  getAllProductsAsync(): Observable<any> {
    return this.http.get(`${this.apiUrl}/api/Products/GetAllProductsAsync`)
      .pipe(
        catchError(this.handleError)
      );
  }

  // POST request
  addProductAsync(data: any): Observable<any> {
    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    return this.http.post(`${this.apiUrl}/api/Products/AddProductAsync`, data, { headers })
      .pipe(
        catchError(this.handleError)
      );
  }
   // GET request to get data by ID
   getProductByIdAsync(id: number): Observable<any> {
    return this.http.get(`${this.apiUrl}/api/Products/${id}`)
      .pipe(
        catchError(this.handleError)
      );
  }


  getAllCategoriesAsync(): Observable<any> {
    return this.http.get(`${this.apiUrl}/api/Category/GetAllCategoriesAsync`)
      .pipe(
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
