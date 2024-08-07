import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'app-medicine',
  templateUrl: './medicine.component.html',
  styleUrls: ['./medicine.component.scss']
})
export class MedicineComponent implements OnInit {

  public listMedicinesData:any = [
    { name: 'Aspirin', category: 'Painkiller', price: 10, manufacturer: 'Company A', expiryDate: new Date(), imageUrl: 'https://via.placeholder.com/100' }
  ];
  public medicalForm: FormBuilder | any;
  constructor(private fb: FormBuilder) { }
  ngOnInit() {
    this.validateMedicalForm();
    this.listMedicinesData;
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

  addMedical() {
    if (this.medicalForm.valid) {
      console.log("Medicals Submit Values : ", this.medicalForm.value);
      // this.medicalForm.reset();
      // Close modal programmatically

    }
  }
  editMedical(medical: any) {
    //this.selectedMedical = medical;
    this.medicalForm.patchValue(medical);
    console.log("This is editMedical Values : ", this.medicalForm);
  }

  public updateMedicalAsync(){
    

  }

  open() {
    this.medicalForm.reset();
  }


  public addMedicalAsync(){

  }
    

  isFieldInvalid(fieldName: string): boolean {
    const field = this.medicalForm.get(fieldName);
    return field ? field.invalid && (field.dirty || field.touched) : false;
  }

}
