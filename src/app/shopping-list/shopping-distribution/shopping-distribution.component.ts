import { Component, OnInit } from '@angular/core';
import { ShoppingListService } from '../../services/shopping-list/shopping-list.service';
import { FirestormService } from '../../services/firestore/firestore.service';
import {Observable} from "rxjs";
import {Ingredient} from "../../interfaces/ingredient";
import {flatMap} from "rxjs/operators";

@Component({
  selector: 'app-shopping-distribution',
  templateUrl: './shopping-distribution.component.html',
  styleUrls: ['./shopping-distribution.component.css']
})
export class ShoppingDistributionComponent implements OnInit {
  costcoIngredients = [];
  groceryIngredients = [];
  haveIngredients = [];
  stockpileIngredients = [];
  costcoToggleStatus = false;
  groceryToggleStatus = false;
  haveToggleStatus = false;
  stockpileToggleStatus = false;
  ingredients: Observable<any[]>;
  ingredientData;
  data: Ingredient[];

  constructor(private slService: ShoppingListService, private db: FirestormService) {
    this.ingredients = this.db.ingredients;
    this.ingredients.subscribe(ingredients => {
      this.data = ingredients as Ingredient[];
      this.ingredientData = this.data.slice();
    });
    this.slService.distributedIngredient.subscribe(distIngredient => {
      this.ingredientData.find(ing => {
        if (ing.name === distIngredient.name) {
          distIngredient.department = ing.department;
        }
      });
      if (distIngredient.source === 'costco') {
        this.costcoIngredients.push(distIngredient);
      } else if (distIngredient.source === 'grocery') {
        this.groceryIngredients.push(distIngredient);
      } else if (distIngredient.source === 'have') {
        this.haveIngredients.push(distIngredient);
      } else if (distIngredient.source === 'stockpile') {
        this.stockpileIngredients.push(distIngredient);
      }
    });
  }

  ngOnInit(): void {
  }

  onClick(ingredient, i: number, source: string) {
    if (source === 'costco') {
      this.costcoIngredients.splice(i, 1);
    } else if (source === 'grocery') {
      this.groceryIngredients.splice(i, 1);
    } else if (source === 'have') {
      this.haveIngredients.splice(i, 1);
    } else if (source === 'stockpile') {
      this.stockpileIngredients.splice(i, 1);
    }
    this.slService.undoDistribution(ingredient);
  }

  toggleCostcoList() {
    this.costcoToggleStatus = !this.costcoToggleStatus;
  }

  toggleGroceryList() {
    this.groceryToggleStatus = !this.groceryToggleStatus;
  }

  toggleHaveList() {
    this.haveToggleStatus = !this.haveToggleStatus;
  }

  toggleStockpileList() {
    this.stockpileToggleStatus = !this.stockpileToggleStatus;
  }

  shoppingPrint() {
    alert('printing shopping list');
  }

}
