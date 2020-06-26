import { Component, OnInit } from '@angular/core';
import { ShoppingListService } from '../services/local-storage/localstorage-service.service';
import { MatDialog } from '@angular/material/dialog';
import { ShoppingPrintModalComponent } from './shopping-print-modal/shopping-print-modal.component';

@Component({
  selector: 'app-shopping-list',
  templateUrl: './shopping-list.component.html',
  styleUrls: ['./shopping-list.component.css']
})
export class ShoppingListComponent implements OnInit {
  shoppingList;
  ingredientsArray;
  finalIngredientsArray = [];

  constructor( private slService: ShoppingListService, public dialog: MatDialog, ) {
  }

  ngOnInit(): void {
    this.shoppingList = this.slService.getFromStorage();
    if (this.shoppingList) {
      this.ingredientsArray = this.shoppingList.map(x => (x.ingredients)).flat();
      const sortedIngredients = {};
      this.ingredientsArray.map(ingredient => {
        if (sortedIngredients[ingredient.name]) {
          if (sortedIngredients[ingredient.name][ingredient.measurement] === ingredient.measurement) {
            // tslint:disable-next-line:max-line-length
            sortedIngredients[ingredient.name][ingredient.measurement] = sortedIngredients[ingredient.name][ingredient.measurement] + Number(ingredient.quantity);
          } else {
            sortedIngredients[ingredient.name][ingredient.measurement] = Number(ingredient.quantity);
          }
        } else {
          sortedIngredients[ingredient.name] = {[ingredient.measurement]: Number(ingredient.quantity)};
        }
      });
      console.log('this.sortedIngredients', sortedIngredients); // *THIS IS WHERE THE PROBLEM IS*
      this.ingredientsArray = Object.entries(sortedIngredients);
      this.ingredientsArray.forEach(([name, details]) => {
        Object.entries(details).forEach(([key, value]) => {
          const tempObj = {
            name,
            quantity: value,
            measurement: key,
          };
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
    }
  }

  onPrint() {
    this.dialog.open(ShoppingPrintModalComponent, {data: this.finalIngredientsArray});
    this.shoppingList = [];
    this.finalIngredientsArray = [];
    this.slService.clearShoppingList();
  }
}
