import {Component } from '@angular/core';
import { FirestormService } from '../../services/firestore/firestore.service';
import { Observable } from 'rxjs';
import { Ingredient } from '../../interfaces/ingredient';
import {Sort} from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';

@Component({
  selector: 'app-ingredient-edit',
  templateUrl: './ingredient-edit.component.html',
  styleUrls: ['./ingredient-edit.component.css'],
  providers: [FirestormService]
})

export class IngredientEditComponent {
  ingredients: Observable<any[]>;
  ingredientData;
  data: Ingredient[];
  dataSource;
  displayedColumns: string[] = ['name', 'department', 'measurement'];

  constructor(private db: FirestormService) {
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
