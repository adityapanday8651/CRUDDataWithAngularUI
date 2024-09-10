import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { NgxSpinnerService } from 'ngx-spinner';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-protected',
  templateUrl: './protected.component.html',
  styleUrls: ['./protected.component.scss']
})
export class ProtectedComponent implements OnInit {

  message: string = '';

  constructor(
    private http: HttpClient,
    private spinner: NgxSpinnerService

  ) { }

  baseUrl = environment.apiUrl;
  async ngOnInit() {
    await this.spinnerStart();
  }
  public async spinnerStart() {
    this.spinner.show();
    setTimeout(() => {
      this.spinner.hide();
    }, 500);
  }
}

