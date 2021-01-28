import {Component, EventEmitter, Input, Output} from '@angular/core';
import { Recipe } from '../../interfaces/recipe';
import { FirestoreService } from '../../services/firestore/firestore.service';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-recipe-list',
  templateUrl: './recipe-list.component.html',
  styleUrls: ['./recipe-list.component.css'],
})

export class RecipeListComponent {
  @Output() recipeWasSelected = new EventEmitter<Recipe>();
  recipes: Observable<any[]>;
  term: string;
  searchText: string;
  constructor(private db: FirestoreService ) {
    this.recipes = this.db.recipes;
    console.log(typeof location);
  }

  onRecipeSelected(recipe: Recipe) {
    this.recipeWasSelected.emit(recipe);
  }
}
