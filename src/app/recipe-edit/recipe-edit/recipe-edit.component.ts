import { Component } from '@angular/core';
import { FirestoreService } from '../../services/firestore/firestore.service';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-recipe-edit',
  templateUrl: './recipe-edit.component.html',
  styleUrls: ['./recipe-edit.component.css'],
  providers: [FirestoreService]
})

export class RecipeEditComponent {
  searchText: string;
  recipes: Observable<any[]>;
  constructor(private db: FirestoreService) {
    this.recipes = this.db.recipes;
  }

  onEditRecipe(recipe) {
    this.db.startedEditingRecipe.next(recipe);
  }
}
