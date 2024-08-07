import { Component, OnInit } from '@angular/core';
import { ProductService } from 'src/app/services/product.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  lstAllProducts: any[] = [];

  constructor(private productService: ProductService,) { }
  async ngOnInit() {
    await this.getAllProductsAsync();
  }




  public async getAllProductsAsync() {
    await this.productService.getAllProductsAsync().subscribe((response => {
      this.lstAllProducts = response.data;
    }))
  }

}
