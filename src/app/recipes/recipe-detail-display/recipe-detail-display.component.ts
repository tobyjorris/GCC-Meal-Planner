import {Component, ElementRef, Input, OnInit, ViewChild} from '@angular/core';
import {Recipe} from '../../../recipe';

@Component({
  selector: 'app-recipe-detail-display',
  templateUrl: './recipe-detail-display.component.html',
  styleUrls: ['./recipe-detail-display.component.css']
})

export class RecipeDetailDisplayComponent implements OnInit {
  @Input() recipe: Recipe;
  @ViewChild('quantityChange', {static: false}) quantityChangeRef: ElementRef;
  batchMulti = 1;

  constructor() {

  }

  ngOnInit(): void {
  }

  updateQuantity() {
    const qtyChangeInput = this.quantityChangeRef.nativeElement.value;


    if (qtyChangeInput >= 1) {
      for (const ingredient of this.recipe.ingredients) {
        this.batchMulti = qtyChangeInput;
      }
    } else if (isNaN(qtyChangeInput)){
      alert('Please enter a number');
    } else {
      alert('Please enter a number greater than 0');
    }
  }

  addedToShoppingList() {
    const shoppingList = [];
    shoppingList.push(this.recipe.ingredients);
    console.log(this.recipe.ingredients);
    alert('ingredients added to shopping list');
  }

}
