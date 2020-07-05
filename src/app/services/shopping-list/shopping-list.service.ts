import { Injectable } from '@angular/core';
import {Subject} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ShoppingListService {
  distributedIngredient = new Subject<any>();
  returnedDistributedIngredient = new Subject<any>();

  constructor() { }

  writeToStorage(recipe) {
     const existingList = JSON.parse(window.localStorage.getItem('shopping-list'));
     if (existingList !== null) {
       existingList.push(recipe);
       window.localStorage.setItem('shopping-list', JSON.stringify(existingList));
     } else {
       window.localStorage.setItem('shopping-list', JSON.stringify([recipe]));
     }
  }

  getFromStorage() {
    return JSON.parse(window.localStorage.getItem('shopping-list'));
  }

  clearShoppingList() {
    window.localStorage.clear();
  }

  sendToDistribution(ingredient, source) {
    const distributedIngredient = {
      name: ingredient.name,
      quantity: ingredient.quantity,
      measurement: ingredient.measurement,
      source,
    };
    this.distributedIngredient.next(distributedIngredient);
  }

  undoDistribution(ingredient) {
    this.returnedDistributedIngredient.next(ingredient);
  }

}
