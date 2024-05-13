import { Injectable } from '@angular/core';
import { Product } from '../_model/product.model';
import { ActivatedRouteSnapshot, MaybeAsync, Resolve, RouterStateSnapshot } from '@angular/router';
import { Observable, map } from 'rxjs';
import { ProductService } from './product.service';
import { ImageProcessingService } from './image-processing.service';

@Injectable({
  providedIn: 'root'
})
export class BuyProductResolveService implements Resolve<Product[]> {

  constructor(private productService: ProductService, private imageProcessingService: ImageProcessingService) { }
  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<Product[]> {

    const productId = route.paramMap.get("productId");
    const id: number = productId != null ? parseInt(productId) : 0;
    const isSingleCheckout = route.paramMap.get("isSingleCheckout");
    return this.productService.getProductDetails(id, Boolean(isSingleCheckout))
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
      );


  }

}
