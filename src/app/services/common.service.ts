import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, catchError, throwError } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class CommonService {

  private apiUrl = environment.apiUrl;
  constructor(private http: HttpClient) { }


  getAllProjectsAsync(): Observable<any> {
    return this.http.get<any[]>(`${this.apiUrl}/api/Projects/GetAllProjectsAsync`)
      .pipe(
        catchError(this.handleError)
      );
  }

  addProjectsAsync(data: any): Observable<any> {
    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    return this.http.post(`${this.apiUrl}/api/Projects/AddProjectsAsync`, data, { headers })
      .pipe(
        catchError(this.handleError)
      );
  }

  getProjectsByIdAsync(projectId: number): Observable<any> {
    return this.http.get(`${this.apiUrl}/api/Projects/GetProjectsByIdAsync?projectId=${projectId}`)
      .pipe(
        catchError(this.handleError)
      );
  }

  updateProjectsAsync(projectId: number, projectsDto: any): Observable<any> {
    return this.http.put(`${this.apiUrl}/api/Projects/UpdateProjectsAsync?taskId=${projectId}`, projectsDto)
      .pipe(
        catchError(this.handleError)
      );
  }


  // Address API Calls

  getAllAddressAsync(): Observable<any> {
    return this.http.get<any[]>(`${this.apiUrl}/api/Address/GetAllAddressAsync`)
      .pipe(
        catchError(this.handleError)
      );
  }

  addAddressAsync(data: any): Observable<any> {
    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    return this.http.post(`${this.apiUrl}/api/Address/AddAddressAsync`, data, { headers })
      .pipe(
        catchError(this.handleError)
      );
  }

  // Tasks API Calls
  getAllTasksAsync(): Observable<any> {
    return this.http.get<any[]>(`${this.apiUrl}/api/Tasks/GetAllTasksAsync`)
      .pipe(
        catchError(this.handleError)
      );
  }
  addTasksAsync(data: any): Observable<any> {
    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    return this.http.post(`${this.apiUrl}/api/Tasks/AddTasksAsync`, data, { headers })
      .pipe(
        catchError(this.handleError)
      );
  }
  getTasksByIdAsync(taskId: number): Observable<any> {
    return this.http.get(`${this.apiUrl}/api/Tasks/GetTasksByIdAsync?taskId=${taskId}`)
      .pipe(
        catchError(this.handleError)
      );
  }
  updateTasksAsync(taskId: number, tasksDto: any): Observable<any> {
    return this.http.put(`${this.apiUrl}/api/Tasks/UpdateTasksAsync?taskId=${taskId}`, tasksDto)
      .pipe(
        catchError(this.handleError)
      );
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
