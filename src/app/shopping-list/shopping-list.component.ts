import {Component, OnChanges, OnInit, SimpleChanges} from '@angular/core';
import {FirestormService} from '../services/firestore-service/firebaseservice.service';
import {ShoppingListService} from '../services/localstorage-service.service';

@Component({
  selector: 'app-shopping-list',
  templateUrl: './shopping-list.component.html',
  styleUrls: ['./shopping-list.component.css']
})
export class ShoppingListComponent implements OnInit {
  shoppingList;
  ingredientsArray;
  finalIngredientsArray = [];

  constructor( private slService: ShoppingListService) {
  }

  ngOnInit(): void {
    this.shoppingList = this.slService.getFromStorage();
    if (this.shoppingList) {
      this.ingredientsArray = this.shoppingList.map(x => (x.ingredients)).flat();
    }
    const sortedIngredients = {};
    this.ingredientsArray.map(ingredient => {
      if (sortedIngredients[ingredient.name]) {
        sortedIngredients[ingredient.name] = sortedIngredients[ingredient.name] + Number(ingredient.quantity);
      } else {
        sortedIngredients[ingredient.name] = Number(ingredient.quantity);
      }
    });
    console.log(sortedIngredients);
    this.ingredientsArray = Object.entries(sortedIngredients);
    this.ingredientsArray.forEach(([name, quantity, measurement]) => {
      const ingredientObj = {
        name: '',
        quantity: '',
        measurement: '',
      };
      ingredientObj.name = name;
      ingredientObj.quantity = quantity;
      ingredientObj.measurement = measurement;
      this.finalIngredientsArray.push(ingredientObj);
    });
    console.log(this.finalIngredientsArray);
  }

  onPrint() {
    this.shoppingList = [];
    this.slService.clearShoppingList();
  }

}
