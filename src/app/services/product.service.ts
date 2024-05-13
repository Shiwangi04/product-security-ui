import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Product } from '../_model/product.model';
import { Observable } from 'rxjs';
import { OrderDetails } from '../_model/order-details-model';
import { Order } from '../_model/order.model';

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  PATH_OF_API = "http://localhost:9090";
  constructor(private httpClient: HttpClient) { }

  public addProduct(product: FormData){
    return this.httpClient.post(this.PATH_OF_API + "/product/add" , product);
  }

  public findAll(pageNumber: number, searchKey: string = "") : Observable<Product[]> {
    return this.httpClient.get<Product[]>(this.PATH_OF_API + "/product/findAll?pageNumber="+pageNumber+"&searchKey="+searchKey);
  }

  public deleteProduct(productId: number) {
    return this.httpClient.delete(this.PATH_OF_API+ "/product/delete/" + productId);
  }

  public getProductById(productId: number) : Observable<Product>{
    return this.httpClient.get<Product>(this.PATH_OF_API+ "/product/" + productId);
  }

  public getAllProducts(pageNumber: number, searchKey: string = "") : Observable<Product[]> {
    return this.httpClient.get<Product[]>(this.PATH_OF_API + "/product/getAll?pageNumber="+pageNumber+"&searchKey="+searchKey);
  }

  public getProductDetails(productId: number, isSingleCheckout: boolean) : Observable<Product[]> {
    return this.httpClient.get<Product[]>(this.PATH_OF_API+ "/getProduct/"+ isSingleCheckout +"/"+ productId);
  }

  public placeOrder(orderDetails: OrderDetails, isSingleCheckout:boolean) {
    return this.httpClient.post(this.PATH_OF_API + "/placeOrder/"+ isSingleCheckout, orderDetails);
  }

  public addToCart(productId: number) {
    return this.httpClient.get(this.PATH_OF_API +"/addToCart/"+productId);
  }

  public getCartDetails() {
    return this.httpClient.get(this.PATH_OF_API + "/getCartDetails");
  }

  public deleteCartItem(cartId: number) {
    return this.httpClient.delete(this.PATH_OF_API + "/deleteCartItem/"+cartId);
  }

  public getOrderDetails() : Observable<Order[]> {
    return this.httpClient.get<Order[]>(this.PATH_OF_API+ "/getOrderDetails");
  }
  public deleteOrder(orderId: number) {
    return this.httpClient.delete(this.PATH_OF_API + "/deleteOrder/"+ orderId);
  }

  public getAllOrders(status: string) : Observable<Order[]>{
    return this.httpClient.get<Order[]>(this.PATH_OF_API+"/getAllOrders/"+status);
  }

  public markOrderStatus(orderId: number) {
    return this.httpClient.get(this.PATH_OF_API+"/markOrderStatus/"+orderId);
  }

  public createTransaction(amount: number) {
    return this.httpClient.get(this.PATH_OF_API + "/createTransaction/"+amount);
  }
}
