import { Component, OnInit } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { Product } from '../_model/product.model';
import { FormsModule, NgForm } from '@angular/forms';
import { ProductService } from '../services/product.service';
import { HttpErrorResponse } from '@angular/common/http';
import { DomSanitizer } from '@angular/platform-browser';
import { FileHandle } from '../_model/file-handle.model';
import {MatGridListModule} from '@angular/material/grid-list';
import { CommonModule } from '@angular/common';
import { DragDirective } from '../drag.directive';
import { ActivatedRoute } from '@angular/router';
import { PopupComponent } from '../popup/popup.component';
import { MatDialog } from '@angular/material/dialog';
import { EMPTY, Observable, catchError } from 'rxjs';

@Component({
  selector: 'app-add-new-product',
  standalone: true,
  imports: [FormsModule, MatFormFieldModule, MatInputModule, MatButtonModule, MatGridListModule, CommonModule, DragDirective],
  templateUrl: './add-new-product.component.html',
  styleUrl: './add-new-product.component.css'
})
export class AddNewProductComponent implements OnInit{

  isNewProduct: boolean = true;
  product: Product = {
    productId: 0,
    productName: "",
    productDescription: "",
    productDiscountedPrice: 0,
    productActualPrice: 0,
    productImages: []
  }

  constructor(private productService: ProductService, private sanitizer: DomSanitizer, private activatedRoute: ActivatedRoute
    , private popupDialog: MatDialog
  ) {}
  ngOnInit(): void {
    this.product = this.activatedRoute.snapshot.data['product'];
    if (this.product && this.product.productId > 0) {
      this.isNewProduct = false;
    }
  }

  addProduct(productForm: NgForm) {
    const productFormData = this.prepareFormData(this.product);
    this.productService.addProduct(productFormData).subscribe(
      (response: any) => {
        productForm.reset();
        this.product.productImages = [];
      },
      (error: HttpErrorResponse) => {
        console.log(error);
      }
    );
  }

  prepareFormData(product: Product) : FormData {
    const formData = new FormData();
    formData.append(
      'product', 
      new Blob(
        [JSON.stringify(product)],
        { type : "application/json"}
      )
    );

    for (var i = 0 ; i < product.productImages.length ; i++) {
      formData.append(
        'imageFile', 
        product.productImages[i].file,
        product.productImages[i].file.name
      );
    }
    return formData;
  }

  onFileSelected(event: any) {
    if (event.target.files) {
      const file = event.target.files[0];

      const fileHandle : FileHandle = {
        file: file,
        url: this.sanitizer.bypassSecurityTrustUrl(
          window.URL.createObjectURL(file)
        )
      }

      this.product.productImages.push(fileHandle);
    }
  }

  removeImage(idx: any) {
    this.product.productImages.splice(idx, 1);
  }

  fileDropped(event: any) {
    this.product.productImages.push(event);
  }

  reset(productForm: NgForm) {
    productForm.reset();
  }
}
