import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-protected',
  templateUrl: './protected.component.html',
  styleUrls: ['./protected.component.scss']
})
export class ProtectedComponent implements OnInit{

  message: string = '';

  constructor(private http: HttpClient) { }

  baseUrl=environment.apiUrl;
  ngOnInit(): void {
    this.http.get(`${this.baseUrl}/api/protected`, { responseType: 'text' })
      .subscribe(
        response => this.message = response,
        error => console.error('Error fetching protected data', error)
      );
  }

}
