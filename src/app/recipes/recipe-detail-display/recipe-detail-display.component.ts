import {Component, ElementRef, Inject, Input, OnChanges, OnInit, ViewChild} from '@angular/core';
import { Recipe } from '../../interfaces/recipe';
import { FirestormService } from '../../services/firestore/firebaseservice.service';
import { ShoppingListService } from '../../services/local-storage/localstorage-service.service';
import { MatDialog } from '@angular/material/dialog';
import { DialogComponent } from '../../dialog/dialog.component';
import { PrintModalComponent } from '../print/print-modal/print-modal.component';

@Component({
  selector: 'app-recipe-detail-display',
  templateUrl: './recipe-detail-display.component.html',
  styleUrls: ['./recipe-detail-display.component.css']
})

export class RecipeDetailDisplayComponent implements OnInit, OnChanges {
  @Input() recipe: Recipe;
  @ViewChild('quantityChange', {static: false}) quantityChangeRef: ElementRef;
  recipeCopy: Recipe;
  batchMultiDisplay: number;
  multiBatchMode = false;

  constructor(private db: FirestormService,
              private slService: ShoppingListService,
              public dialog: MatDialog,
  ) { }

  ngOnInit(): void {
    console.log(this.recipe);
    this.recipeCopy.multi = 1;
    this.recipeCopy.ingredients.map(ingredient => {
     return {...ingredient, quantity: Number(ingredient.quantity)};
    });
  }

  ngOnChanges() {
    this.recipeCopy = JSON.parse(JSON.stringify(this.recipe));
    // this.quantityChangeRef.nativeElement.value = ''; THIS LINE WAS GIVING ME TYPE ERROR: nativeElement undefined
    this.multiBatchMode = false;
  }

  updateQuantity() {
    function round(value, precision) {
      const multiplier = Math.pow(10, precision || 0);
      return Math.round(value * multiplier) / multiplier;
    }
    const qtyChangeInput = this.quantityChangeRef.nativeElement.value;
    console.log(qtyChangeInput);
    this.recipeCopy = JSON.parse(JSON.stringify(this.recipe));
    if (qtyChangeInput > 1) {
      for (const ingredient of this.recipeCopy.ingredients) {
        ingredient.quantity = round((ingredient.quantity * qtyChangeInput), 1);
      }
      this.multiBatchMode = true;
      this.batchMultiDisplay = qtyChangeInput;
      this.recipeCopy.multi = qtyChangeInput;
    } else if (qtyChangeInput === '1') {
      console.log('you entered 1');
      this.multiBatchMode = false;
      this.recipeCopy.multi = 1;
    } else if (isNaN(qtyChangeInput)) {
        alert('Please enter a number');
    } else if (qtyChangeInput < 1) {
        alert('Please enter a number greater than 1');
    }
  }

  resetBatch() {
    this.ngOnChanges();
  }

  addToShoppingList() {
    this.batchMultiDisplay = null;
    this.slService.writeToStorage(this.recipeCopy);
    this.dialog.open(DialogComponent, {data: this.recipeCopy});
  }

  onPrint() {
    this.dialog.open(PrintModalComponent, {data: this.recipeCopy});
  }

}
