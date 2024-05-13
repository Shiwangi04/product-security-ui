import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import {MatGridListModule} from '@angular/material/grid-list';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-show-productmages-dialog',
  standalone: true,
  imports: [MatGridListModule, CommonModule],
  templateUrl: './show-productmages-dialog.component.html',
  styleUrl: './show-productmages-dialog.component.css'
})
export class ShowProductmagesDialogComponent implements OnInit{

  constructor(@Inject(MAT_DIALOG_DATA) public data: any) {}
  ngOnInit(): void {
    this.receiveImages();
  }

  receiveImages() {
    console.log(this.data);
  }
}
