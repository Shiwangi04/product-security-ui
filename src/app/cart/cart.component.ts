import { Component, OnInit } from '@angular/core';
import { ProductService } from '../services/product.service';
import { HttpErrorResponse } from '@angular/common/http';
import { MatTableModule } from '@angular/material/table';
import { MatButtonModule } from '@angular/material/button';
import { subscribe } from 'diagnostics_channel';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { response } from 'express';

@Component({
  selector: 'app-cart',
  standalone: true,
  imports: [MatTableModule, MatButtonModule, CommonModule],
  templateUrl: './cart.component.html',
  styleUrl: './cart.component.css'
})
export class CartComponent implements OnInit{

  displayedColumns: string[] = ['Name', 'Description', 'Price', 'Discounted Price', 'Action'];

  cartDetails : any[] = [];
  showCheckout: boolean = false;
  constructor(private productService: ProductService, private router: Router) {}
  ngOnInit(): void {
    this.getCartDetails();
  }

  getCartDetails() {
    this.productService.getCartDetails().subscribe(
      (response: any) => {
        console.log(response);
        this.cartDetails = response;
        if (this.cartDetails.length > 0) {
          this.showCheckout = true;
        } else {
          this.showCheckout = false;
        }
        
      },
      (error: HttpErrorResponse) => {
        console.log(error);
      }
    );
  }
  checkout() {
    this.router.navigate(['/buyProduct', {
      productId: 0,
      isSingleCheckout: false
    }]);
  }

  delete(cartId: number) {
    this.productService.deleteCartItem(cartId).subscribe(
      (response) => {
        this.getCartDetails();
      },
      (error) => {
        console.log(error);
      }
    );
  }
}
