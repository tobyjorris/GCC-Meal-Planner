import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ShoppingListService {

  constructor() { }

  writeToStorage(array) {
    window.localStorage.setItem('shopping-list', JSON.stringify(array));
  }

  getFromStorage() {
    return JSON.parse(window.localStorage.getItem('shopping-list'));
  }

  clearShoppingList() {
    window.localStorage.clear();
  }

}
