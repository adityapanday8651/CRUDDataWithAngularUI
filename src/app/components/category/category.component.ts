import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { CATEGORY_SEED_DATA } from 'src/app/models/allseeddata';
import { CategoryService } from 'src/app/services/category.service';
import Swal from 'sweetalert2';


@Component({
  selector: 'app-category',
  templateUrl: './category.component.html',
  styleUrls: ['./category.component.scss']
})
export class CategoryComponent implements OnInit {

  public categoryForm: FormGroup | any;
  public lstAllCategories: any[] = [];

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
      id: [''],
      name: ['', [Validators.required, Validators.minLength(3)]]
    });
  }

  public async getAllCategoriesAsync() {
    await this.categoryService.getAllCategoriesAsync().subscribe(response => {
      this.lstAllCategories = response.data.categories;
    },
      error => {
        console.error('Error fetching categories:', error);
      }
    )
  }

  get name() {
    return this.categoryForm.get('name');
  }

  open() {
    this.categoryForm.reset();
  }

  public async editOpen(id: any) {
    await this.categoryService.getCategoryByIdAsync(id).subscribe(async response => {
      await this.patchValueForUpdateModelAsync(response);
    },
      error => {
        console.error('Error openModal categories:', error);
      }
    )
  }

  public async patchValueForUpdateModelAsync(response: any) {
    this.categoryForm.patchValue({
      id: response.data.id,
      name: response.data.name
    });
  }

  isNameInvalid(): boolean {
    const control = this.categoryForm.get('name');
    return control && control.invalid && (control.dirty || control.touched);
  }

  public async addCategoryAsync() {
    if (this.categoryForm.valid) {
      await this.categoryService.addCategoryAsync(this.categoryForm.value).subscribe(response => {
        this.categoryForm.reset();
      },
        error => {
          console.error('Error save categories:', error);
        }
      );
    }
  }

  public async updateCategoryAsync() {
    if (this.categoryForm.valid) {
      const id = this.categoryForm.value.id;
      const categoryDto = this.categoryForm.value;
      await this.categoryService.updateCategoryAsync(id, categoryDto).subscribe((response => {
        this.categoryForm.reset();
      }))
    }
  }

  public async deleteCategoryAsync(id: any) {
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!"
    }).then((result) => {
      if (result.isConfirmed) {
        this.categoryService.deleteCategoryAsync(id).subscribe(response => {
          Swal.fire({
            title: "Deleted!",
            text: "Your file has been deleted.",
            icon: "success"
          });
        },
          error => {
            console.error('Error delete categories:', error);
          }
        )
      }
    });
  }

}
