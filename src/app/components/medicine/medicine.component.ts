import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { ProductService } from 'src/app/services/product.service';

@Component({
  selector: 'app-medicine',
  templateUrl: './medicine.component.html',
  styleUrls: ['./medicine.component.scss']
})
export class MedicineComponent implements OnInit {

  public lstAllMedicines: any[] = [];
  public listMedicinesData: any = [
    { name: 'Aspirin', category: 'Painkiller', price: 10, manufacturer: 'Company A', expiryDate: new Date(), imageUrl: 'https://fakestoreapi.com/img/81fPKd-2AYL._AC_SL1500_.jpg' }
  ];
  public medicalForm: FormBuilder | any;
  constructor(
    private fb: FormBuilder,
    private productService: ProductService
  ) { }
  async ngOnInit() {
    this.validateMedicalForm();
    this.listMedicinesData;
    await this.getAllMedicinesAsync();
  }

  public validateMedicalForm() {
    this.medicalForm = this.fb.group({
      name: ['', Validators.required],
      category: ['', Validators.required],
      price: [null, Validators.required],
      manufacturer: ['', Validators.required],
      expiryDate: [null, Validators.required],
      imageUrl: ['']
    });
  }


  formatDisplayDate(date: string | Date): string {
    const d = new Date(date);
    const options = { year: 'numeric', month: 'short', day: 'numeric' } as const;
    return d.toLocaleDateString('en-US', options);
  }


  public async getAllMedicinesAsync() {
    await this.productService.getAllMedicinesAsync().subscribe((response => {
      this.lstAllMedicines = response.data;
    }))
  }

  addMedical() {
    if (this.medicalForm.valid) {
      // this.medicalForm.reset();
      // Close modal programmatically

    }
  }
  editMedical(medical: any) {
    const expiryDateISO = new Date(medical.expiryDate).toISOString().substring(0, 10); // Convert to YYYY-MM-DD
    this.medicalForm.patchValue({
      name: medical.name,
      category: medical.category,
      price: medical.price,
      manufacturer: medical.manufacturer,
      expiryDate: expiryDateISO, // Use YYYY-MM-DD format
      imageUrl: medical.imageUrl
    });
  }



  public updateMedicalAsync() {


  }

  open() {
    this.medicalForm.reset();
  }


  public addMedicalAsync() {

  }


  isFieldInvalid(fieldName: string): boolean {
    const field = this.medicalForm.get(fieldName);
    return field ? field.invalid && (field.dirty || field.touched) : false;
  }

}
