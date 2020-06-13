import {Component, Inject, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA} from '@angular/material/dialog';
import {Ingredient} from '../../../ingredient';

@Component({
  selector: 'app-shopping-print-modal',
  templateUrl: './shopping-print-modal.component.html',
  styleUrls: ['./shopping-print-modal.component.css']
})
export class ShoppingPrintModalComponent implements OnInit {

  constructor(@Inject(MAT_DIALOG_DATA) public data: Ingredient) { }

  ngOnInit(): void {
    console.log(this.data);
  }

}
