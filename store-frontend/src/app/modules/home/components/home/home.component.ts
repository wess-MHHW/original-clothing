import { Component, ViewChild } from '@angular/core';
import { ProductComponent } from '../product/product.component';
import { Products } from '../../../../interfaces/products';
import { ProductsService } from '../../../../services/products.service';
import { Product } from '../../../../interfaces/product';
import { CommonModule } from '@angular/common';
import { ButtonModule } from 'primeng/button';
import { Paginator, PaginatorModule } from 'primeng/paginator';
import { DialogComponent } from '../dialog/dialog.component';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [
    ProductComponent,
    CommonModule,
    ButtonModule,
    PaginatorModule,
    DialogComponent,
  ],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css',
})
export class HomeComponent {
  constructor(private productsService: ProductsService) {}

  rows: number = 8;
  totalRecords: number = 0;
  @ViewChild('paginator') paginator: Paginator | undefined;
  selected: Product = {
    id: -1,
    name: '',
    image: '',
    price: '',
    rating: 0,
  };

  onPageChange(event: any) {
    this.fetchProducts(event.page, event.rows);
  }

  products: Array<Product> = [];

  display: boolean = false;
  title: string = '';

  toggleAddDialog() {
    this.selected = {
      id: -1,
      name: '',
      image: '',
      price: '',
      rating: 0,
    };
    this.display = true;
    this.title = 'Add Product';
  }

  toggleEditDialog(product: Product) {
    this.selected = product;
    this.display = true;
    this.title = 'Edit Product';
  }

  handleProduct(product: Product) {
    if (product.id === -1) {
      this.addProduct(product);
    } else {
      this.editProduct(product, product.id!);
    }
  }

  removeProduct(product: Product) {
    this.deleteProduct(product.id!);
  }

  resetPaginator() {
    this.paginator?.changePage(0);
  }

  fetchProducts(page: number, perPage: number) {
    this.productsService
      .getProducts('http://localhost:3000/clothes', { page, perPage })
      .subscribe({
        next: (products: Products) => {
          this.products = products.items;
          this.totalRecords = products.total;
        },
        error: (error) => {
          console.log(error);
        },
      });
  }

  addProduct(product: Product) {
    this.productsService
      .addProduct(`http://localhost:3000/clothes`, product)
      .subscribe({
        next: (data) => {
          console.log(data);
          this.fetchProducts(0, this.rows);
          this.resetPaginator();
        },
        error: (error) => {
          console.log(error);
        },
      });
  }

  editProduct(product: Product, id: number) {
    this.productsService
      .editProduct(`http://localhost:3000/clothes/${id}`, product)
      .subscribe({
        next: (data) => {
          console.log(data);
          this.fetchProducts(0, this.rows);
          this.resetPaginator();
        },
        error: (error) => {
          console.log(error);
        },
      });
  }

  deleteProduct(id: number) {
    this.productsService
      .deleteProduct(`http://localhost:3000/clothes/${id}`)
      .subscribe({
        next: (data) => {
          console.log(data);
          this.fetchProducts(0, this.rows);
          this.resetPaginator();
        },
        error: (error) => {
          console.log(error);
        },
      });
  }

  ngOnInit() {
    this.fetchProducts(0, this.rows);
  }
}
