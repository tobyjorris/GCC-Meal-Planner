import { Component, ElementRef, Inject, Input, OnChanges, OnInit, ViewChild} from '@angular/core';
import { Recipe } from '../../interfaces/recipe';
import { FirestoreService } from '../../services/firestore/firestore.service';
import { ShoppingListService } from '../../services/shopping-list/shopping-list.service';
import { MatDialog } from '@angular/material/dialog';
import { DialogComponent } from '../../dialog/dialog.component';
import { FormControl, FormGroup } from '@angular/forms';
import { PrintService } from '../../services/print/print.service';

@Component({
  selector: 'app-recipe-detail-display',
  templateUrl: './recipe-detail-display.component.html',
  styleUrls: ['./recipe-detail-display.component.css']
})

export class RecipeDetailDisplayComponent implements OnInit, OnChanges {
  @Input() recipe: Recipe;
  @ViewChild('quantityChange', {static: false}) quantityChangeRef: ElementRef;
  recipeCopy: Recipe;
  batchMultiDisplay: number;
  multiBatchMode = false;
  quantitySelect: FormGroup;

  constructor(private db: FirestoreService,
              private slService: ShoppingListService,
              public dialog: MatDialog,
              private printService: PrintService
  ) { }

  ngOnInit(): void {
    this.recipeCopy.multi = 1;
    this.recipeCopy.ingredients.map(ingredient => {
     return {...ingredient, quantity: Number(ingredient.quantity)};
    });

    this.quantitySelect = new FormGroup({
      quantity: new FormControl([1])
    });
  }

  ngOnChanges() {
    this.recipeCopy = JSON.parse(JSON.stringify(this.recipe));
    this.recipeCopy.multi = 1;
    this.multiBatchMode = false;
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
      this.multiBatchMode = false;
      this.recipeCopy.multi = 1;
    }
  }

  resetBatch() {
    this.ngOnChanges();
    this.quantitySelect = new FormGroup({
      quantity: new FormControl([])
    });
  }

  addToShoppingList() {
    this.multiBatchMode = false;
    this.batchMultiDisplay = null;
    this.slService.writeToStorage(this.recipeCopy);
    this.dialog.open(DialogComponent, {data: this.recipeCopy});
  }

  onPrint() {
    this.printService.printDocument('recipe-print', this.recipeCopy.title);
    this.printService.printedRecipe.next(this.recipeCopy);
  }

}
