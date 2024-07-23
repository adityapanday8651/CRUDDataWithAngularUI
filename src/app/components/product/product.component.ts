import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { CategoryService } from 'src/app/services/category.service';
import { ProductService } from 'src/app/services/product.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.scss']
})
export class ProductComponent implements OnInit {
  productForm: FormGroup | any;
  lstAllCategories: any[] = [];
  lstAllProducts: any[] = [];
  checkOperationStatus: boolean | any;
  updateProductModel:any;

  constructor(private fb: FormBuilder, private productService: ProductService, private categoryService: CategoryService) {
    this.productForm = this.fb.group({
      name: ['', [Validators.required, Validators.minLength(3)]],
      price: [, [Validators.required, Validators.min(0.01)]],
      categoryId: ['', Validators.required],
      categoryName: []
    });
  }

  async ngOnInit() {

    await this.getAllProductsAsync();
    await this.getAllCategoriesAsync();
  }

  public async getAllProductsAsync() {
    await this.productService.getAllProductsAsync().subscribe((response => {
      this.lstAllProducts = response.data;
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


  public async editOpen(id: any) {
    this.checkOperationStatus = false;
    await this.productService.getProductByIdAsync(id).subscribe(async response => {
      await this.patchValueForUpdateModelAsync(response);
      await this.updateModel(response);
    },
      error => {
        console.error('Error openModal categories:', error);
      }
    )
  }

  public async patchValueForUpdateModelAsync(response: any) {
    this.productForm.patchValue({
      id: response.data.id,
      name: response.data.name,
      price: response.data.price,
      categoryId: response.data.categoryId,
      categoryName: response.data.categoryName,
    });
  }

  public async addProductAsync() {
    if (this.productForm.valid) {
      await this.productService.addProductAsync(this.productForm.value).subscribe(response => {
      },
        error => {
          console.error('Error save categories:', error);
        }
      );
    }
  }
  public async updateProductAsync() {
    if (this.productForm.valid) {
      await this.productService.updateProductAsync(this.updateProductModel.id, this.updateProductModel).subscribe((response => {
      }))
    }
  }

  isNameInvalid(): any {
    const control = this.productForm.get('name');
    return control?.touched && control?.invalid;
  }

  isPriceInvalid(): any {
    const control = this.productForm.get('price');
    return control?.touched && control?.invalid;
  }

  open() {
    this.checkOperationStatus = true;
    this.productForm.reset();
  }


  updateModel(response:any): any {
    const product: Product = {
      id: response.data.id,
      name: response.data.name,
      price: response.data.price,
      categoryId: response.data.categoryId,
      categoryName: response.data.categoryName,
    };
    this.updateProductModel=product;
    return this.updateProductModel;
  }
  


  public async deleteProducrAsync(id: any) {
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
        this.productService.deleteProductAsync(id).subscribe(response => {
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


export interface Product {
  id: string;
  name: string;
  price: number;
  categoryId: string;
  categoryName: string;
}

