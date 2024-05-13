import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import {MatButtonModule} from '@angular/material/button';
import {MatGridListModule} from '@angular/material/grid-list';
import { ActivatedRoute, Router } from '@angular/router';
import { ProductService } from '../services/product.service';
import { MatDialog } from '@angular/material/dialog';
import { PopupComponent } from '../popup/popup.component';

@Component({
  selector: 'app-product-view-details',
  standalone: true,
  imports: [MatButtonModule, MatGridListModule, CommonModule],
  templateUrl: './product-view-details.component.html',
  styleUrl: './product-view-details.component.css'
})
export class ProductViewDetailsComponent implements OnInit{

  selectedProductIdx = 0;
  product: any;
  constructor(private activatedRoute: ActivatedRoute, private router: Router, private productService: ProductService, public popupDialog: MatDialog){}
  ngOnInit(): void {
    this.product = this.activatedRoute.snapshot.data['product'];
  }

  changeIdx(idx: number) {
    this.selectedProductIdx = idx;
  }
  buyProduct(productId: number) {
    this.router.navigate(['/buyProduct', {
      productId: productId,
      isSingleCheckout: true
    }]);
  }

  addToCart(productId: number) {
    this.productService.addToCart(productId).subscribe(
      (resp: any) => {
        console.log(resp.cart);
        if (resp.message !== null) {
          // add popup
          this.popupDialog.open(PopupComponent, {
            data: {
              message: resp.message
            },
            height: '180px',
            width: '400px'
          });
        } else {
          this.popupDialog.open(PopupComponent, {
            data: {
              message: "Item successfully added. Go to cart for checkout!"
            },
            height: '180px',
            width: '400px'
          });
        }
      },
      (error) => {
        console.log(error);
      }
    );
  }
}
