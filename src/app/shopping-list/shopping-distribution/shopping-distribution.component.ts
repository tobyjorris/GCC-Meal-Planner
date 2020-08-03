import { Component, OnInit } from '@angular/core';
import { ShoppingListService } from '../../services/shopping-list/shopping-list.service';
import { FirestormService } from '../../services/firestore/firestore.service';
import { Observable } from 'rxjs';
import { Ingredient } from '../../interfaces/ingredient';
import { PrintService } from '../../services/print.service';

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
  ingredientsRef: Observable<any[]>;
  ingredientRefData: any[];
  data: Ingredient[];
  distributedIngredientsArray = [];

  constructor(private slService: ShoppingListService,
              private db: FirestormService,
              private printService: PrintService
  ) {
    this.ingredientsRef = this.db.ingredients;
    this.ingredientsRef.subscribe(ingredients => {
      this.data = ingredients as Ingredient[];
      this.ingredientRefData = this.data.slice();
    });

    this.slService.distributedIngredient.subscribe(distIngredient => {
      this.ingredientRefData.find(ingRef => {
        if (ingRef.name === distIngredient.name) {
          distIngredient.department = ingRef.department;
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
    this.distributedIngredientsArray = this.slService.distGetFromStorage();
  }

  onDistIngredientSelect(ingredient, i: number, source: string) {
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

  costcoPrint() {
    this.printService.printDocument('shopping-print', 'Costco List');
    this.printService.printedList.next(this.costcoIngredients);
  }

  groceryPrint() {
    this.printService.printedList.next(this.groceryIngredients);
    this.printService.printDocument('shopping-print', 'Grocery List');
  }

  havePrint() {
    this.printService.printedList.next(this.haveIngredients);
    this.printService.printDocument('shopping-print', 'Already Have List');
  }

  stockpilePrint() {
    this.printService.printedList.next(this.stockpileIngredients);
    this.printService.printDocument('shopping-print', 'Stockpile List');
  }

}


