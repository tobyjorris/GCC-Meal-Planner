import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ShoppingListService {

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

}
