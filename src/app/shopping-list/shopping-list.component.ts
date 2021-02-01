import { Component, OnInit } from '@angular/core';
import { ShoppingListService } from '../services/shopping-list/shopping-list.service';
import { UnitConversionService } from '../services/conversion/unit-conversion.service';
import { FormArray, FormControl, FormGroup } from '@angular/forms';
import { condenseIngredients } from '../helperMethods/shoppingList/condenseIngredients';
import { FirestoreService } from '../services/firestore/firestore.service';
import { MatDialog } from '@angular/material/dialog';
import { DialogComponent } from '../dialog/dialog.component';

@Component({
  selector: 'app-shopping-list',
  templateUrl: './shopping-list.component.html',
  styleUrls: ['./shopping-list.component.scss']
})
export class ShoppingListComponent implements OnInit {
  shoppingList;
  ingredientsArray;
  finalIngredientsArray = [];
  ingredientDistributionForm: FormGroup;

  constructor( private slService: ShoppingListService,
               private convertService: UnitConversionService,
               private db: FirestoreService,
               public dialog: MatDialog
  ) {}

  ngOnInit(): void {
    this.shoppingList = this.slService.getFromStorage();
    if (this.shoppingList) {
      this.ingredientsArray = this.shoppingList.map(recipe => (recipe.ingredients)).flat();
      const convertedIngredientsArray = [];
      this.ingredientsArray.map(ingredient => convertedIngredientsArray.push(this.convertService.convert(ingredient)));
      this.finalIngredientsArray = condenseIngredients(convertedIngredientsArray);
    }

    this.ingredientDistributionForm = new FormGroup({
      distributionForm: new FormArray([])
    });
    (this.ingredientDistributionForm.get('distributionForm') as FormArray).push(
      new FormGroup({
        source: new FormControl(null),
      })
    );

    this.slService.returnedDistributedIngredient.subscribe(ingredient => {
       this.finalIngredientsArray.push(ingredient);
    });
  }

  onDistribute(ingredient, source: string, i: number) {
    this.slService.sendToDistribution(ingredient, source);
    this.finalIngredientsArray.splice(i, 1);
  }

  getDistributionControls() {
    return (this.ingredientDistributionForm.get('distributionForm') as FormArray).controls;
  }

  onClearShoppingList() {
    const dialogData = {
      deleteShoppingMessage: 'Are you sure you want to delete you shopping list?'
    };
    this.dialog.open(DialogComponent, {data: dialogData});
  }

  onSaveShoppingList(e) {
    if (this.shoppingList === null) {
      e.preventDefault();
      const dialogData = {
        error: 'Sorry, looks like your list is empty. Please return to the recipes page to begin shopping.'
      };
      this.dialog.open(DialogComponent, {data: dialogData});
    } else {
      this.db.writeRecipesToHistory(this.shoppingList);
    }
  }
}
