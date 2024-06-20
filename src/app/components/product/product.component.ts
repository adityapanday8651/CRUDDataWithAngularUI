import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { CategoryService } from 'src/app/services/category.service';
import { ProductService } from 'src/app/services/product.service';

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.scss']
})
export class ProductComponent implements OnInit {


  productForm: FormGroup | any;
  // lstCategories: { id: number, name: string }[] = [
  //   { id: 1, name: 'Electronics' },
  //   { id: 2, name: 'Books' },
  //   { id: 3, name: 'Clothing' },
  //   { id: 4, name: 'Sports' }
  // ];

  lstAllCategories: any;

  constructor(private fb: FormBuilder, private productService: ProductService, private categoryService: CategoryService) {
    this.productForm = this.fb.group({
      name: ['', [Validators.required, Validators.minLength(3)]],
      price: [, [Validators.required, Validators.min(0.01)]],
      categoryId: ['', Validators.required]
    });
  }

  async ngOnInit() {

    await this.getAllProductsAsync();
    await this.getAllCategoriesAsync();
  }

  public async getAllProductsAsync() {
    await this.productService.getAllProductsAsync().subscribe((response => {
    }))
  }

  public async getAllCategoriesAsync() {
    await this.categoryService.getAllCategoriesAsync().subscribe(response => {
      this.lstAllCategories = response.data;
    },
      error => {
        console.error('Error fetching categories:', error);
      }
    )
  }

  isNameInvalid(): any {
    const control = this.productForm.get('name');
    return control?.touched && control?.invalid;
  }

  isPriceInvalid(): any {
    const control = this.productForm.get('price');
    return control?.touched && control?.invalid;
  }


  onSubmit(): void {
    if (this.productForm.valid) {
      console.log('Form Submitted', this.productForm.value);
    }
  }
}



