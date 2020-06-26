import { Component, OnInit } from '@angular/core';
import { ShoppingListService } from '../services/local-storage/localstorage-service.service';
import { MatDialog } from '@angular/material/dialog';
import { ShoppingPrintModalComponent } from './shopping-print-modal/shopping-print-modal.component';
import {ConversionService} from '../services/conversion/conversion.service';


@Component({
  selector: 'app-shopping-list',
  templateUrl: './shopping-list.component.html',
  styleUrls: ['./shopping-list.component.css']
})
export class ShoppingListComponent implements OnInit {
  shoppingList;
  ingredientsArray;
  finalIngredientsArray = [];

  constructor( private slService: ShoppingListService, public dialog: MatDialog, private convertService: ConversionService) {
  }

  ngOnInit(): void {
    this.shoppingList = this.slService.getFromStorage();
    if (this.shoppingList) {
      this.ingredientsArray = this.shoppingList.map(x => (x.ingredients)).flat();
      const convertedArray = [];
      this.ingredientsArray.map(ingredient => convertedArray.push(this.convertService.convert(ingredient)));
      console.log(convertedArray);
      const sortedIngredients = {};
      convertedArray.map(ingredient => {
        if (sortedIngredients[ingredient.name]) {
          // tslint:disable-next-line:max-line-length
          sortedIngredients[ingredient.name][ingredient.measurement] = sortedIngredients[ingredient.name][ingredient.measurement] + Number(ingredient.quantity);
        } else {
          sortedIngredients[ingredient.name] = {[ingredient.measurement]: Number(ingredient.quantity)};
        }
      });
      console.log('this.sortedIngredients', sortedIngredients);
      // this.ingredientsArray = Object.entries(sortedIngredients);
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

  onConvert() {
    // console.log(convertUnits(3).from('fl-oz').to('cup'));
    // console.log(convertUnits().from('tsp').possibilities());
    const testObj = {
      name: 'Black Beans',
      quantity: 2,
      measurement: 'Tbs'
    };
    console.log(this.convertService.convert(testObj));
  }
}
