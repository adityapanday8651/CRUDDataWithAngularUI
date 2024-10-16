import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { NgxSpinnerService } from 'ngx-spinner';
import { CommonService } from 'src/app/services/common.service';

@Component({
  selector: 'app-address',
  templateUrl: './address.component.html',
  styleUrls: ['./address.component.scss']
})
export class AddressComponent implements OnInit {

  public lstAllAddress: any[] = [];
  public adrressForms: FormGroup | any;

  constructor(
    private commonService: CommonService,
    private fb: FormBuilder,
    private spinner: NgxSpinnerService
  ) { }
  
 async ngOnInit() {
  await this.getAllAddressAsync();
    
  }

  public async getAllAddressAsync() {
    this.spinner.show();
    await this.commonService.getAllAddressAsync().subscribe(response => {
      this.lstAllAddress = response.data;
      console.log("lstAllAddress: ", this.lstAllAddress)
      this.spinner.hide();
    },
      error => {
        console.error('Error fetching categories:', error);
      }
    )
  }
}
