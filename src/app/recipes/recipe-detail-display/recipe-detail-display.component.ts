import {Component, ElementRef, Input, OnInit, ViewChild} from '@angular/core';
import { Recipe } from '../../../recipe';

@Component({
  selector: 'app-recipe-detail-display',
  templateUrl: './recipe-detail-display.component.html',
  styleUrls: ['./recipe-detail-display.component.css']
})
export class RecipeDetailDisplayComponent implements OnInit {
  @Input() recipe: Recipe;
  @ViewChild('quantityChange', {static: false})quantityChangeRef: ElementRef;

  constructor() { }

  ngOnInit(): void {
  }

  updateQuantity() {
    const qtyChange = this.quantityChangeRef.nativeElement.value;
    const ingQty = [];

    for (const ingredient of this.recipe.ingredients) {
      ingQty.push(ingredient.quantity * qtyChange);
    }
    console.log(ingQty);

  }

}
