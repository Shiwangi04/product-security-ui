import { Component, OnInit } from '@angular/core';
import {MatGridListModule} from '@angular/material/grid-list';
import { ProductService } from '../services/product.service';
import { map } from 'rxjs';
import { Product } from '../_model/product.model';
import { ImageProcessingService } from '../services/image-processing.service';
import { HttpErrorResponse } from '@angular/common/http';
import { CommonModule } from '@angular/common';
import {MatButtonModule} from '@angular/material/button';
import { Router } from '@angular/router';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import {BreakpointObserver, Breakpoints} from '@angular/cdk/layout';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [MatGridListModule, CommonModule, MatButtonModule, MatFormFieldModule, MatInputModule],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent implements OnInit{

  public isMobile: boolean = false;
  pageNumber: number = 0;
  productDetails: Product[] = [];

  showLoadButton : boolean = false;
  constructor(private productService: ProductService,
     private imageProcessingService: ImageProcessingService,
    private router: Router,
    breakpointObserver: BreakpointObserver) {
      breakpointObserver.observe([
        Breakpoints.Handset
      ]).subscribe(result => {
        this.isMobile = result.matches;
      });
    }
  ngOnInit(): void {
    this.getAllProducts(this.pageNumber);
  }

  public getAllProducts(pageNumber: number, searchKey: string = "") {
    this.productService.getAllProducts(this.pageNumber, searchKey)
    .pipe(
      map(
        (x: Product[], i) => {
          x.map((product: Product) => {
            this.imageProcessingService.createImages(product)
            return product;
          })
          return x;
        }
      )
    )
    .subscribe(
      (response: Product[]) => {
        console.log(response);
        if (response.length == 10) {
          this.showLoadButton = true
        } else {
          this.showLoadButton = false;
        }
        response.forEach(
          (p) => this.productDetails.push(p)
        );
      },
      (error: HttpErrorResponse) => {
        console.log(error);
      }
    );
  }

  showProductDetails(productId: number) {
    this.router.navigate(['/productViewDetails', {productId: productId}])
  }

  loadMoreProduct(searchKeyword: string) {
    this.pageNumber = this.pageNumber + 1;
    this.getAllProducts(this.pageNumber, searchKeyword);
  }

  searchByKeyword(searchKeyword: string) {
    console.log(searchKeyword);
    this.pageNumber = 0;
    this.productDetails = [];
    this.getAllProducts(this.pageNumber, searchKeyword);
  }
}
