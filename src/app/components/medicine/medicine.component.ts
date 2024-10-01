import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { NgxSpinnerService } from 'ngx-spinner';
import { NotificationService } from 'src/app/services/notification.service';
import { ProductService } from 'src/app/services/product.service';

@Component({
  selector: 'app-medicine',
  templateUrl: './medicine.component.html',
  styleUrls: ['./medicine.component.scss']
})
export class MedicineComponent implements OnInit {

  public lstAllMedicines: any[] = [];
  public getAllIsActiveMedicines: any[] = [];
  public medicalDto: any;
  public medicalForm: FormBuilder | any;
  constructor(
    private fb: FormBuilder,
    private productService: ProductService,
    private notificationService: NotificationService,
    private spinner: NgxSpinnerService
  ) { }
  async ngOnInit() {
    this.validateMedicalForm();
    await this.getAllMedicinesAsync();
  }

  public validateMedicalForm() {
    this.medicalForm = this.fb.group({
      id: [],
      name: ['', Validators.required],
      category: ['', Validators.required],
      price: [null, Validators.required],
      manufacturer: ['', Validators.required],
      expiryDate: [null, Validators.required],
      imageUrl: [''],
      isActive: [true]
    });
  }


  formatDisplayDate(date: string | Date): string {
    const d = new Date(date);
    const options = { year: 'numeric', month: 'short', day: 'numeric' } as const;
    return d.toLocaleDateString('en-US', options);
  }


  public async getAllMedicinesAsync() {
    this.spinner.show();
    await this.productService.getAllMedicinesAsync().subscribe((response => {
      this.lstAllMedicines = response.data.medicines;
      this.spinner.hide();
    }))
  }

  public async getAllIsActiveMedicinesAsync() {
    await this.productService.getAllIsActiveMedicinesAsync().subscribe((response => {
      this.getAllIsActiveMedicines = response.data;
    }))
  }

  public async addMedicineAsync() {
    if (this.medicalForm.valid) {
      await this.productService.addMedicineAsync(this.medicalForm.value).subscribe(async response => {
        this.medicalForm.reset();
        await this.getAllMedicinesAsync();
        this.notificationService.showSuccess(response.message);
      },
        error => {
          console.error('Error save addProductAsync:', error);
        }
      );
    }
  }
  async editMedical(id: any) {
    await this.productService.getMedicineByIdAsync(id).subscribe(async response => {
      await this.patchValuesOfMedicine(response);
    },
      error => {
        console.error('Error openModal categories:', error);
      }
    )
  }

  public patchValuesOfMedicine(response: any) {
    const expiryDateISO = new Date(response.data.expiryDate).toISOString().substring(0, 10);
    this.medicalForm.patchValue({
      id: response.data.id,
      name: response.data.name,
      category: response.data.category,
      price: response.data.price,
      manufacturer: response.data.manufacturer,
      expiryDate: expiryDateISO,  // Use ISO Date Format (YYYY-MM-DD) for proper form handling
      imageUrl: response.data.imageUrl,
      isActive: response.data.isActive
    });
  }
  public async UpdateMedicineAsync() {
    if (this.medicalForm.valid) {
      const id = this.medicalForm.value.id;
      const medicalDto = this.medicalForm.value;
      this.productService.updateMedicineAsync(id, medicalDto).subscribe((async response => {
        this.medicalForm.reset();
        await this.getAllMedicinesAsync();
        this.notificationService.showSuccess(response.Message);
      }))
    }
  }
  public async deleteMedicineAndUpdateAsync(id: any) {
      this.productService.deleteMedicineAndUpdateAsync(id).subscribe((async response => {
        await this.getAllMedicinesAsync();
        this.notificationService.showSuccess(response.message);
      }))
  }

  open() {
    this.medicalForm.reset();
  }

  isFieldInvalid(fieldName: string): boolean {
    const field = this.medicalForm.get(fieldName);
    return field ? field.invalid && (field.dirty || field.touched) : false;
  }

}
