import { Component } from '@angular/core';
import { FirestoreService } from '../services/firestore/firestore.service';
import { Observable } from 'rxjs';
import {RecipesService} from "../services/recipes/recipes.service";

@Component({
  selector: 'app-recipe-edit',
  templateUrl: './recipe-edit.component.html',
  styleUrls: ['./recipe-edit.component.scss'],
  providers: [FirestoreService]
})

export class RecipeEditComponent {
  searchText: string;
  recipes: Observable<any[]>;
  constructor(private db: FirestoreService, private recipesService: RecipesService) {
    this.recipes = this.db.recipes;
  }

  onEditRecipe(recipe) {
    // this.db.startedEditingRecipe.next(recipe);

    // this.recipesService.startedEditingRecipe.next(recipe);
  }
}
