import {Component, ElementRef, Input, OnChanges, OnInit, ViewChild} from '@angular/core';
import {Recipe} from '../../../recipe';
import {FirestormService} from '../../services/firestore-service/firebaseservice.service';
import {ShoppingListService} from '../../services/localstorage-service.service';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import {DialogComponent} from '../../dialog/dialog.component';


@Component({
  selector: 'app-recipe-detail-display',
  templateUrl: './recipe-detail-display.component.html',
  styleUrls: ['./recipe-detail-display.component.css']
})

export class RecipeDetailDisplayComponent implements OnInit, OnChanges {
  @Input() recipe: Recipe;
  @ViewChild('quantityChange', {static: false}) quantityChangeRef: ElementRef;
  recipeCopy: Recipe;
  prevMulti = 1;
  batchMultiDisplay: number;

  constructor(private db: FirestormService,
              private slService: ShoppingListService,
              public dialog: MatDialog) {
  }

  ngOnInit(): void {
    this.recipeCopy.multi = 1;
  }

  ngOnChanges() {
    this.recipeCopy = JSON.parse(JSON.stringify(this.recipe));
    this.batchMultiDisplay = null;
  }

  updateQuantity() {
    const qtyChangeInput = this.quantityChangeRef.nativeElement.value;
    if (qtyChangeInput >= 1) {
      for (const ingredient of this.recipeCopy.ingredients) {
        ingredient.quantity = (ingredient.quantity / this.prevMulti) * qtyChangeInput;
      }
      this.prevMulti = qtyChangeInput;
      this.batchMultiDisplay = qtyChangeInput;
      this.recipeCopy.multi = this.prevMulti;
    } else {
      if (isNaN(qtyChangeInput)) {
        alert('Please enter a number');
      } else {
        alert('Please enter a number greater than 0');
      }
    }
  }

  addToShoppingList() {
    this.prevMulti = 1;
    this.batchMultiDisplay = null;
    this.slService.writeToStorage(this.recipeCopy);
    this.dialog.open(DialogComponent);
  }

  onPrint() {
    window.print();
  }

}
