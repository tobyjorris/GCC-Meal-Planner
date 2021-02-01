import { Component, Inject } from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material/dialog';
import { ShoppingListService } from '../services/shopping-list/shopping-list.service';
import {FirestoreService} from '../services/firestore/firestore.service';

@Component({
  selector: 'app-dialog',
  templateUrl: './dialog.component.html',
  styleUrls: ['./dialog.component.scss']
})
export class DialogComponent {
  constructor(@Inject(MAT_DIALOG_DATA) public data,
              private slService: ShoppingListService,
              private db: FirestoreService,
              private dialogRef: MatDialogRef<DialogComponent>
  ) {}

  onClearShopping() {
    this.slService.clearShoppingList();
    this.slService.distClearStorage();
  }

  onDeleteRecipe() {
    this.db.deleteRecipe(this.data.recipeToDelete);
  }

  onCancelDeleteRecipe() {
    this.dialogRef.close('delete-cancelled');
  }

}
