import { Component, OnInit } from '@angular/core';
import {ShoppingListService} from '../services/localstorage-service.service';
import * as fraction from 'fraction.js';
import Fraction from 'fraction.js/fraction';

@Component({
  selector: 'app-shopping-list',
  templateUrl: './shopping-list.component.html',
  styleUrls: ['./shopping-list.component.css']
})
export class ShoppingListComponent implements OnInit {
  shoppingList;
  ingredientsArray;
  finalIngredientsArray = [];

  constructor( private slService: ShoppingListService ) {
  }

  ngOnInit(): void {
    this.shoppingList = this.slService.getFromStorage();
    if (this.shoppingList) {
      this.ingredientsArray = this.shoppingList.map(x => (x.ingredients)).flat();
      const sortedIngredients = {};
      this.ingredientsArray.map(ingredient => {
        if (sortedIngredients[ingredient.name]) {
          // tslint:disable-next-line:max-line-length
          sortedIngredients[ingredient.name][ingredient.measurement] = sortedIngredients[ingredient.name][ingredient.measurement] + Number(ingredient.quantity);
        } else {
          sortedIngredients[ingredient.name] = {[ingredient.measurement]: Number(ingredient.quantity)};
        }
      });
      this.ingredientsArray = Object.entries(sortedIngredients);
      this.ingredientsArray.forEach(([name, details]) => {
        Object.entries(details).forEach(([key, value]) => {
          const tempObj = {
            name,
            quantity: value,
            measurement: key,
          };
          // tempObj.quantity = new Fraction(tempObj.quantity as Fraction);
          // tempObj.quantity = tempObj.quantity.toFraction(true);
          this.finalIngredientsArray.push(tempObj);
          this.finalIngredientsArray.sort((a, b) => {
            const bandA = a.name.toUpperCase();
            const bandB = b.name.toUpperCase();

            let comparison = 0;
            if (bandA > bandB) {
              comparison = 1;
            } else if (bandA < bandB) {
              comparison = -1;
            }
            return comparison;
          });
        });
      });
      console.log(this.finalIngredientsArray);
    }
  }

  onPrint() {
    this.shoppingList = [];
    this.finalIngredientsArray = [];
    this.slService.clearShoppingList();
  }
}
