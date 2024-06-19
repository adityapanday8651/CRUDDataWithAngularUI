import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { CategoryService } from 'src/app/services/category.service';

@Component({
  selector: 'app-category',
  templateUrl: './category.component.html',
  styleUrls: ['./category.component.scss']
})
export class CategoryComponent implements OnInit {

  public categoryForm: FormGroup | any;

  constructor(
    private categoryService: CategoryService,
    private fb: FormBuilder
  ) { }

  async ngOnInit() {
    await this.getValidateForm();
    await this.getAllCategoriesAsync();

  }

  public async getValidateForm() {
    this.categoryForm = this.fb.group({
      name: ['', [Validators.required, Validators.minLength(3)]]
    });
  }

  public async getAllCategoriesAsync() {
    await this.categoryService.getAllCategoriesAsync().subscribe((response => {
      console.log("getAllCategoriesAsync : ", response);
    }))
  }

  onSubmit(): void {
    if (this.categoryForm.valid) {
      console.log(this.categoryForm.value);

      console.log("This is Category model : ", this.categoryForm.value);
    }
  }


  get name() {
    return this.categoryForm.get('name');
  }

  isNameInvalid(): boolean {
    const control = this.categoryForm.get('name');
    return control && control.invalid && (control.dirty || control.touched);
  }

  public async addCategoryAsync() {
    if (this.categoryForm.valid) {
      await this.categoryService.addCategoryAsync(this.categoryForm.value).subscribe((response => {
        console.log("Saved");
      }))
    }
  }

}
