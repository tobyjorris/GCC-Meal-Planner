import {Component } from '@angular/core';
import { FirestormService } from '../../services/firestore/firebaseservice.service';
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

  // sortData(sort: Sort) {
  //   this.ingredients.subscribe(ingredients => {
  //     this.data = ingredients as Ingredient[];
  //   });
  //   if (!sort.active || sort.direction === '') {
  //     this.sortedData = this.data;
  //     return;
  //   }

    // this.sortedData = this.data.sort((a, b) => {
    //   const isAsc = sort.direction === 'asc';
    //   switch (sort.active) {
    //     case 'name': return compare(a.name, b.name, isAsc);
    //     case 'department': return compare(a.department, b.department, isAsc);
    //     case 'measurement': return compare(a.measurement, b.measurement, isAsc);
    //     default: return 0;
    //   }
    // });

  //   function compare(a: number | string, b: number | string, isAsc: boolean) {
  //     return (a < b ? -1 : 1) * (isAsc ? 1 : -1);
  //   }
  // }

  onEditIngredient(ingredient) {
    this.db.startedEditingIngredient.next(ingredient);
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }
}
