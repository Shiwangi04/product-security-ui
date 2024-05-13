import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Order } from '../_model/order.model';
import { ProductService } from '../services/product.service';
import { MatTableModule } from '@angular/material/table';
import { CommonModule } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'app-my-orders',
  standalone: true,
  imports: [MatTableModule, CommonModule, MatButtonModule, MatIconModule],
  templateUrl: './my-orders.component.html',
  styleUrl: './my-orders.component.css'
})
export class MyOrdersComponent implements OnInit{
  displayedColumns: string[] = ['Name', 'Address', 'Contact No.', 'Amount', 'Status', 'Actions'];
  myOrderDetails: Order[] = [];


  constructor(private productService: ProductService) {}

  ngOnInit(): void {
    this.getOrderDetails();
   }
  getOrderDetails() {
    this.productService.getOrderDetails().subscribe(
      (response: Order[]) => {
        this.myOrderDetails = response;
      },
      (error: HttpErrorResponse) => {
        console.log(error);
      }
    );
  }
  deleteOrder(orderId: number) {
    this.productService.deleteOrder(orderId).subscribe(
      (resp) => {
        console.log(resp);
        this.getOrderDetails();
      },
      (err) => {
        console.log(err);
      }
    );
  }
}
