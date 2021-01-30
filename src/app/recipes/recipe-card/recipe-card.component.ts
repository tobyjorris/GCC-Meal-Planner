import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Recipe } from '../../interfaces/recipe';
import { FirestoreService } from '../../services/firestore/firestore.service';
import {RecipesService} from "../../services/recipes/recipes.service";

@Component({
  selector: 'app-recipe-card',
  templateUrl: './recipe-card.component.html',
  styleUrls: ['./recipe-card.component.scss']
})

export class RecipeCardComponent {
  @Input() renderLocation: string;
  @Input() recipe: Recipe;

  constructor(private db: FirestoreService, private recipesService: RecipesService) {}

  onViewRecipe(recipe) {
    // this.viewRecipe.emit();
    this.recipesService.recipeWasSelected.next(recipe);
  }

  onEditRecipe(recipe) {
    this.recipesService.startedEditingRecipe.next(recipe);
  }

  throwClickError() {
    throw Error;
  }

}
