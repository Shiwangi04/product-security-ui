import { Component, OnInit } from '@angular/core';
import {MatTableModule} from '@angular/material/table';
import { ProductService } from '../services/product.service';
import { Product } from '../_model/product.model';
import { HttpErrorResponse } from '@angular/common/http';
import {MatIconModule} from '@angular/material/icon';
import {MatButtonModule} from '@angular/material/button';
import { UserAuthService } from '../services/user-auth.service';
import { CommonModule } from '@angular/common';
import {MatDialog, MatDialogModule} from '@angular/material/dialog';
import { ShowProductmagesDialogComponent } from '../show-productmages-dialog/show-productmages-dialog.component';
import { ImageProcessingService } from '../services/image-processing.service';
import { map } from 'rxjs/operators';
import { Router } from '@angular/router';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';

@Component({
  selector: 'app-show-product-details',
  standalone: true,
  imports: [MatTableModule, MatIconModule, MatButtonModule, CommonModule, MatDialogModule,  MatFormFieldModule, MatInputModule],
  templateUrl: './show-product-details.component.html',
  styleUrl: './show-product-details.component.css'
})
export class ShowProductDetailsComponent implements OnInit{
  displayedColumns: string[] = ['Id', 'Product Name', 'description', 'Discounted Price', 'Actual Price', 'Actions'];
  productDetails: Product[] = [];
  pageNumber: number = 0;
  showLoadButton : boolean = false;
  showTable: boolean = false;
  constructor(private productService: ProductService, 
    private userAuthService : UserAuthService, 
    public imagesDialog: MatDialog,
    private imageProcessingService: ImageProcessingService,
    private router: Router
  ) {}
  ngOnInit(): void {
    this.findAllProducts();
  }

  public findAllProducts(searchKeyword: string = "") {
    this.showTable = false;
    this.productService.findAll(this.pageNumber, searchKeyword)
    .pipe(
      map((x: Product[], i) => {
        x.map((product: Product) => this.imageProcessingService.createImages(product))
        return x;
      }

    ))
    .subscribe(
      (response: Product[]) => {
        if (response.length == 10) {
          this.showLoadButton = true;
        } else {
          this.showLoadButton = false;
        }
        response.forEach(
          (r) => this.productDetails.push(r)
        );
        this.showTable = true;
      },
      (error: HttpErrorResponse) => {
        console.log(error);
      }
    );
  }

  deleteProduct(productId: number) {
    this.productService.deleteProduct(productId).subscribe(
      (response) => {
        this.findAllProducts();
      },
      (error: HttpErrorResponse) => {
        console.log(error);
      }
    );
  }

  showImages(product: Product) {
    this.imagesDialog.open(ShowProductmagesDialogComponent, {
      data: {
        images: product.productImages
      },
      height: '500px',
      width: '800px'
    });
  }

  editProductDetail(productId: number) {
    this.router.navigate(['/addProduct', {productId: productId}]);
  }

  loadMoreProduct(searchKeyword: string) {
    this.pageNumber = this.pageNumber + 1;
    this.findAllProducts(searchKeyword);
  }

  searchByKeyword(searchKeyword: string) {
    console.log(searchKeyword);
    this.pageNumber = 0;
    this.productDetails = [];
    this.findAllProducts(searchKeyword);
  }

  public isAdmin() {
    return this.userAuthService.isAdmin();
  }
  public isUser() {
    return this.userAuthService.isUser();
  }
}
