import { Component, OnInit } from '@angular/core';
import { ShoppingListService } from '../services/shopping-list/shopping-list.service';
import { MatDialog } from '@angular/material/dialog';
import { ConversionService } from '../services/conversion/conversion.service';
import { FormArray, FormControl, FormGroup } from '@angular/forms';

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

  constructor( private slService: ShoppingListService, public dialog: MatDialog, private convertService: ConversionService) {
  }

  ngOnInit(): void {
    this.shoppingList = this.slService.getFromStorage();
    if (this.shoppingList) {
      this.ingredientsArray = this.shoppingList.map(x => (x.ingredients)).flat();
      const convertedIngredientsArray = [];
      this.ingredientsArray.map(ingredient => convertedIngredientsArray.push(this.convertService.convert(ingredient)));
      const sortedIngredients = {};
      convertedIngredientsArray.map(ingredient => {
        if (sortedIngredients[ingredient.name]) {
          // tslint:disable-next-line:max-line-length
          sortedIngredients[ingredient.name][ingredient.measurement] = sortedIngredients[ingredient.name][ingredient.measurement] + Number(ingredient.quantity);
        } else {
          sortedIngredients[ingredient.name] = {[ingredient.measurement]: Number(ingredient.quantity)};
        }
      });
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
    // logic for compiling will live here, construct ANOTHER object {grocery: source}
    // another service to send that object to the actual lists
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
}
