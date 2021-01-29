import { Component } from '@angular/core';
import { FirestoreService } from '../../services/firestore/firestore.service';
import { Observable } from 'rxjs';
import { Ingredient } from '../../interfaces/ingredient';
import { MatTableDataSource } from '@angular/material/table';

@Component({
  selector: 'app-ingredient-edit',
  templateUrl: './ingredient-edit.component.html',
  styleUrls: ['./ingredient-edit.component.scss'],
  providers: [FirestoreService]
})

export class IngredientEditComponent {
  ingredients: Observable<any[]>;
  ingredientData;
  data: Ingredient[];
  dataSource;
  displayedColumns: string[] = ['name', 'department'];

  constructor(private db: FirestoreService) {
    this.ingredients = this.db.ingredients;
    this.ingredients.subscribe(ingredients => {
      this.data = ingredients as Ingredient[];
      this.ingredientData = this.data.slice();
      this.dataSource = new MatTableDataSource(this.ingredientData);
    });
  }

  onEditIngredient(ingredient) {
    this.db.startedEditingIngredient.next(ingredient);
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }
}
