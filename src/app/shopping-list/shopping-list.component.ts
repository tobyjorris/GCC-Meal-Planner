import { Component, OnInit } from '@angular/core';
import { ShoppingListService } from '../services/shopping-list/shopping-list.service';
import { UnitConversionService } from '../services/conversion/unit-conversion.service';
import { FormArray, FormControl, FormGroup } from '@angular/forms';
import { condenseIngredients } from '../helperMethods/shoppingList/condenseIngredients';
import { FirestoreService } from '../services/firestore/firestore.service';

@Component({
  selector: 'app-shopping-list',
  templateUrl: './shopping-list.component.html',
  styleUrls: ['./shopping-list.component.css']
})
export class ShoppingListComponent implements OnInit {
  shoppingList;
  ingredientsArray;
  finalIngredientsArray = [];
  ingredientDistributionForm: FormGroup;

  constructor( private slService: ShoppingListService, private convertService: UnitConversionService, private db: FirestoreService) {
  }

  ngOnInit(): void {
    this.shoppingList = this.slService.getFromStorage();
    // this.db.writeRecipesToHistory(this.shoppingList);
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

  onSubmit() {
    const formValue = this.ingredientDistributionForm.value;
    console.log(formValue);
  }

  onDistribute(ingredient, source: string, i: number) {
    this.slService.sendToDistribution(ingredient, source);
    this.finalIngredientsArray.splice(i, 1);
  }

  getDistributionControls() {
    return (this.ingredientDistributionForm.get('distributionForm') as FormArray).controls;
  }

  onClearShoppingList() {
    this.slService.clearShoppingList();
    this.slService.distClearStorage();
  }
}
