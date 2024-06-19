import { Component, OnInit } from '@angular/core';
import { ProductService } from 'src/app/services/product.service';

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.scss']
})
export class ProductComponent implements OnInit {

  constructor(private productService: ProductService) { }

  async ngOnInit() {

    await this.getAllProductsAsync();
  }

  public async getAllProductsAsync() {
    await this.productService.getAllProductsAsync().subscribe((response => {
      console.log("getAllProductsAsync : ", response);
    }))
  }
}
