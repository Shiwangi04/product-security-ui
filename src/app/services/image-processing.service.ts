import { Injectable } from '@angular/core';
import { Product } from '../_model/product.model';
import { FileHandle } from '../_model/file-handle.model';
import { DomSanitizer } from '@angular/platform-browser';

@Injectable({
  providedIn: 'root'
})
export class ImageProcessingService {

  constructor(private sanitizer: DomSanitizer) { }

  public createImages(product: Product) {
    const productImages: any[] = product.productImages;

    const prodImagesToFileHandle: FileHandle[] = [];

    for (let i = 0 ; i < productImages.length; i++) {
      const productFileData = productImages[i];
      const imageBlob = this.dataUriToBlob(productFileData.picByte, productFileData.type);
      const imageFile = new File([imageBlob], productFileData.name, { type : productFileData.type});

      const finalFileHandle : FileHandle = {
        file: imageFile,
        url: this.sanitizer.bypassSecurityTrustUrl(window.URL.createObjectURL(imageFile))
      };
      prodImagesToFileHandle.push(finalFileHandle);
    }
    product.productImages = prodImagesToFileHandle;
  }

  public dataUriToBlob(picBytes: any, imgType: any) {
    const byteString = window.atob(picBytes);
    const arrBuffer = new ArrayBuffer(byteString.length);
    const int8Array = new Uint8Array(arrBuffer);

    for (let i = 0 ; i < byteString.length ; i++) {
      int8Array[i] = byteString.charCodeAt(i);
    }
    const blob = new Blob([int8Array], {type : imgType});
    return blob;
  }
}
