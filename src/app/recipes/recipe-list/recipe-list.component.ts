import {Component, EventEmitter, OnInit, Output } from '@angular/core';
import {Recipe} from '../../../recipe';
import {RECIPES} from '../../mock-recipes';
import { FirestormService } from '../../services/firebaseservice.service';
import {Observable} from 'rxjs';

@Component({
  selector: 'app-recipe-list',
  templateUrl: './recipe-list.component.html',
  styleUrls: ['./recipe-list.component.css']
})
export class RecipeListComponent implements OnInit {
  @Output() recipeWasSelected = new EventEmitter<Recipe>();

  // recipes = RECIPES;
  recipes: Observable<any[]>;
  term: string;
  searchText: string;
  constructor(private db: FirestormService ) {
    this.recipes = this.db.items;
  }

  ngOnInit(): void {
  }

  onRecipeSelected(recipe: Recipe) {
    this.recipeWasSelected.emit(recipe);
  }

}
