import {Component, ElementRef, Input, OnChanges, OnInit, ViewChild} from '@angular/core';
import {Recipe} from '../../../recipe';


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

  constructor() {
  }

  ngOnInit(): void {
  }

  ngOnChanges() {
    this.recipeCopy = JSON.parse(JSON.stringify(this.recipe));
    this.batchMultiDisplay = 1;
  }

  updateQuantity() {
    const qtyChangeInput = this.quantityChangeRef.nativeElement.value;
    if (qtyChangeInput >= 1) {
      for (const ingredient of this.recipeCopy.ingredients) {
        ingredient.quantity = (ingredient.quantity / this.prevMulti) * qtyChangeInput;
      }
      this.batchMultiDisplay = qtyChangeInput;
      this.prevMulti = qtyChangeInput;
    } else {
      if (isNaN(qtyChangeInput)) {
        alert('Please enter a number');
      } else {
        alert('Please enter a number greater than 0');
      }
    }
  }

  addToShoppingList() {
    const shoppingList = [];
    shoppingList.push(this.recipeCopy.ingredients);
    console.log(this.recipeCopy.ingredients)
    console.log(this.recipe.ingredients)
    alert('ingredients added to shopping list');
  }

}
