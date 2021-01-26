import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

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
    window.localStorage.removeItem('shopping-list');
  }

  sendToDistribution(ingredient, source) {
    const distributedIngredient = {
      name: ingredient.name,
      measurements: ingredient.measurements,
      source,
    };
    this.distributedIngredient.next(distributedIngredient);
    this.distWriteToStorage(ingredient);
  }

  undoDistribution(ingredient) {
    this.returnedDistributedIngredient.next(ingredient);
  }

  distWriteToStorage(ingredient) {
    const existingDistList = JSON.parse(window.localStorage.getItem('dist-list'));
    if (existingDistList !== null) {
      existingDistList.push(ingredient);
      window.localStorage.setItem('dist-list', JSON.stringify(existingDistList));
    } else {
      window.localStorage.setItem('dist-list', JSON.stringify([ingredient]));
    }
  }

  distGetFromStorage() {
    return JSON.parse(window.localStorage.getItem('dist-list'));
  }

  distClearStorage() {
    window.localStorage.removeItem('dist-list');
  }

}
