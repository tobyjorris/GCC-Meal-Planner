import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { Recipe } from '../../interfaces/recipe';
import { FirestormService } from '../../services/firestore/firebaseservice.service';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-recipe-list',
  templateUrl: './recipe-list.component.html',
  styleUrls: ['./recipe-list.component.css'],
})
export class RecipeListComponent implements OnInit {
  @Output() recipeWasSelected = new EventEmitter<Recipe>();
  recipes: Observable<any[]>;
  term: string;
  searchText: string;
  constructor(private db: FirestormService ) {
    this.recipes = this.db.recipes;
  }

  ngOnInit(): void {
  }

  onRecipeSelected(recipe: Recipe) {
    this.recipeWasSelected.emit(recipe);
  }

}
