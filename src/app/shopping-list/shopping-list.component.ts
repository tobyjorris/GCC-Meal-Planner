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
        const ingredientObj = {
          name: '',
          quantity: '',
          measurement: '',
        };
        ingredientObj.name = name;
        Object.entries(details).forEach(([key, value]) => {
          const tempObj = {
            name,
            quantity: value,
            measurement: key,
          };
          this.finalIngredientsArray.push(tempObj);
        });
      });
    }
  }

  onPrint() {
    this.shoppingList = [];
    this.finalIngredientsArray = [];
    this.slService.clearShoppingList();
  }
}
