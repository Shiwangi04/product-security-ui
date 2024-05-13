import { Component, Injector, NgZone, OnInit } from '@angular/core';
import { FormsModule, NgForm } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { OrderDetails } from '../_model/order-details-model';
import { MatInputModule } from '@angular/material/input';
import { ActivatedRoute, Router } from '@angular/router';
import { Product } from '../_model/product.model';
import { ProductService } from '../services/product.service';
import { HttpErrorResponse } from '@angular/common/http';
import { CommonModule } from '@angular/common';

declare var Razorpay: any;
@Component({
  selector: 'app-buy-product',
  standalone: true,
  imports: [FormsModule, MatFormFieldModule, MatButtonModule, MatInputModule, CommonModule],
  templateUrl: './buy-product.component.html',
  styleUrl: './buy-product.component.css'
})
export class BuyProductComponent implements OnInit{

  productDetails : Product[] = [];
  orderDetails: OrderDetails = {
    fullName: "",
    fullAddress: "",
    contactNo: "",
    altContactNo: "",
    transactionId: "",
    productList: []
  }
  isSingleCheckout: any = "";

  constructor(private activatedRoute: ActivatedRoute, private productService: ProductService
    , private router: Router, private injector: Injector) {}

  ngOnInit(): void {
    this.productDetails = this.activatedRoute.snapshot.data['productDetails'];
    this.isSingleCheckout = this.activatedRoute.snapshot.paramMap.get('isSingleCheckout');
    
    this.productDetails.forEach(
      x => this.orderDetails.productList.push(
        {productId : x.productId, quantity: 1}
      )
    );
  }

  
  placeOrder(orderForm: NgForm) {
    this.productService.placeOrder(this.orderDetails, this.isSingleCheckout)
    .subscribe(
      (response) => {
        orderForm.reset();
        const ngZone = this.injector.get(NgZone);
        ngZone.run(
          () => {
            this.router.navigate(['/orderConfirm']);
          }
        );
        
      },
      (error: HttpErrorResponse) => {
        console.log(error);
      }
    );
  }

  getQuantityForProduct(productId:number) {
    const filteredProd = this.orderDetails.productList.filter(
      (prodQuantity) => prodQuantity.productId === productId
    );
    return filteredProd[0].quantity;
  }

  getCalculatedTotal(productId: number, productDiscountedPrice: number) {
    const quantity = this.getQuantityForProduct(productId);
    return quantity * productDiscountedPrice;
  }

  onQuantityChange(quant: string, productId: number) {
    this.orderDetails.productList.filter(
      (orderProduct) => orderProduct.productId === productId
    )[0].quantity = parseInt(quant);
  }

  getCalculatedGrandTotal() {
    let grandTotal = 0;
    this.orderDetails.productList.forEach(
      (prodQuant) => {
        const disPrice = this.productDetails.filter(
          (prod) => prod.productId === prodQuant.productId
        )[0].productDiscountedPrice
        grandTotal = grandTotal + disPrice * prodQuant.quantity
      }
    );
    return grandTotal;
  }

  createTransactionAndPlaceOrder(orderForm: NgForm) {
    this.productService.createTransaction(this.getCalculatedGrandTotal()).subscribe(
      (response: any) => {
        console.log(response);
        this.openTransactionModal(response, orderForm);
      },
      (error) => {
        console.log(error);
      }
    );
  }

  openTransactionModal(response: any, orderForm: NgForm) {
    var options = {
      order_id: response.orderId,
      key: response.key,
      amount: response.amount,
      currency: response.currency,
      name: 'Learn program yourself',
      description: 'Payment for shopping',
      image: 'https://t3.ftcdn.net/jpg/02/41/43/18/360_F_241431868_8DFQpCcmpEPVG0UvopdztOAd4a6Rqsoo.jpg',
      handler: (response: any) => {
        this.processResponse(response, orderForm);
      },
      prefill: {
        name: 'LPY',
        email: 'LPY@gmail.com',
        contact: '9089098'
      },
      notes: {
        address: 'Online Shopping'
      },
      theme: {
        color: '#F37254'
      }
    };
    var razorPay = new Razorpay(options);
    razorPay.open();
  }
  
  processResponse(response: any, orderForm: NgForm) {
    // for payment add card number as 4718 6091 0820 4366 other payments not working due to location blocked
    this.orderDetails.transactionId = response.razorpay_payment_id;
    this.placeOrder(orderForm);
  }
}
