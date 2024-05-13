import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatTableModule } from '@angular/material/table';
import { Order } from '../_model/order.model';
import { ProductService } from '../services/product.service';
import { HttpErrorResponse } from '@angular/common/http';
import {MatButtonToggleModule} from '@angular/material/button-toggle';

@Component({
  selector: 'app-order-details',
  standalone: true,
  imports: [MatTableModule, MatButtonModule, CommonModule, MatButtonToggleModule],
  templateUrl: './order-details.component.html',
  styleUrl: './order-details.component.css'
})
export class OrderDetailsComponent implements OnInit{

  displayedColumns: string[] = ['Id', 'Product Name', 'Name', 'Address', 'Contact No.', 'Status', 'Actions'];
  orderDetails: Order[] = [];
  status: string = "All";
  constructor(private productService: ProductService) {}

  ngOnInit(): void {
    this.getAllOrders(this.status);
  }

  getAllOrders(status: string) {
    this.productService.getAllOrders(status).subscribe(
      (resp: Order[]) => {
        console.log(resp);
        this.orderDetails = resp;
      },
      (error: HttpErrorResponse) => {
        console.log(error);
      }
    );
  }

  markOrderStatus(orderId: number) {
    this.productService.markOrderStatus(orderId).subscribe(
      (response) => {
        console.log(response);
        this.getAllOrders(this.status);
      },
      (error) => {
        console.log(error);
      }
    );
  }
}
