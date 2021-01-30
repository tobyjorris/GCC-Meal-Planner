import { Component, ElementRef, OnChanges, OnInit, ViewChild } from '@angular/core';
import { Recipe } from '../../interfaces/recipe';
import { FirestoreService } from '../../services/firestore/firestore.service';
import { ShoppingListService } from '../../services/shopping-list/shopping-list.service';
import { MatDialog } from '@angular/material/dialog';
import { DialogComponent } from '../../dialog/dialog.component';
import { FormControl, FormGroup } from '@angular/forms';
import { PrintService } from '../../services/print/print.service';
import { RecipesService } from '../../services/recipes/recipes.service';

@Component({
  selector: 'app-recipe-detail-display',
  templateUrl: './recipe-detail-display.component.html',
  styleUrls: ['./recipe-detail-display.component.scss']
})

export class RecipeDetailDisplayComponent implements OnInit {
  @ViewChild('quantityChange', {static: false}) quantityChangeRef: ElementRef;
  recipe: {};
  recipeCopy: Recipe;
  batchMultiDisplay = 1;
  multiBatchMode = false;
  quantitySelect: FormGroup;

  constructor(private db: FirestoreService,
              private slService: ShoppingListService,
              public dialog: MatDialog,
              private printService: PrintService,
              private recipesService: RecipesService) {
  }

  ngOnInit(): void {
    this.recipesService.recipeWasSelected.subscribe(recipe => {
      this.recipe = recipe;
      this.reinitialize();
      this.recipeCopy.ingredients.map(ingredient => {
        return {...ingredient, quantity: Number(ingredient.quantity)};
      });
    });
  }

  updateQuantity() {
    function round(value, precision) {
      const multiplier = Math.pow(10, precision || 0);
      return Math.round(value * multiplier) / multiplier;
    }
    const qtySelectForm = this.quantitySelect.value;
    const batchMulti = Number(qtySelectForm.quantity);
    this.recipeCopy = JSON.parse(JSON.stringify(this.recipe));
    if (batchMulti > 1) {
      for (const ingredient of this.recipeCopy.ingredients) {
        ingredient.quantity = round((ingredient.quantity * batchMulti), 1);
      }
      this.multiBatchMode = true;
      this.batchMultiDisplay = batchMulti;
      this.recipeCopy.multi = batchMulti;
    } else if (batchMulti === 1) {
      this.reinitialize();
    }
    console.log(this.recipeCopy.multi, this.recipe);
  }

  resetBatch() {
    this.reinitialize();
  }

  addToShoppingList() {
    this.slService.writeToStorage(this.recipeCopy);
    this.dialog.open(DialogComponent, {data: this.recipeCopy});
    this.reinitialize();
  }

  onPrint() {
    this.printService.printDocument('recipe-print', this.recipeCopy.title);
    this.printService.printedRecipe.next(this.recipeCopy);
  }

  reinitialize() {
    this.batchMultiDisplay = 1;
    this.multiBatchMode = false;
    this.recipeCopy = JSON.parse(JSON.stringify(this.recipe));
    this.recipeCopy.multi = 1;
    this.quantitySelect = new FormGroup({
      quantity: new FormControl([1])
    });
  }

}
