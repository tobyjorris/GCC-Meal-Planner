import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})

export class RecipesService {
  startedEditingRecipe = new Subject<object>();
  recipeWasSelected = new Subject<object>();

  startedEditingIngredient = new Subject<object>();

  constructor() { }
}
