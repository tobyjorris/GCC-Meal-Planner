import { Component, OnInit } from '@angular/core';
import { ShoppingListService } from '../../services/shopping-list/shopping-list.service';

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

  constructor(private slService: ShoppingListService) { }

  ngOnInit(): void {
    this.slService.distributedIngredient.subscribe(ingredient => {
      if (ingredient.source === 'costco') {
        this.costcoIngredients.push(ingredient);
      } else if (ingredient.source === 'grocery') {
        this.groceryIngredients.push(ingredient);
      } else if (ingredient.source === 'have') {
        this.haveIngredients.push(ingredient);
      } else if (ingredient.source === 'stockpile') {
        this.stockpileIngredients.push(ingredient);
      }
    });
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
